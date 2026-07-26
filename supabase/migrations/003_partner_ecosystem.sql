-- Partner ecosystem: businesses, zones, offers, bookings, clicks, reviews,
-- offer_credits, featured_slots, score_snapshots.
--
-- Implements spec "EveAI — Offres, Populaires & Monétisation Partenaires v1.0"
-- (24 juillet 2026). Values that are business-configurable live in constants
-- on the app side (src/lib/partners.ts), not hardcoded in SQL, so the CEO can
-- tune pricing/weights without a migration.
--
-- Depends on: 001 (business_signups), 002 (user_data / user_favorites reuse).

-- ---------------------------------------------------------------------------
-- Extensions
-- ---------------------------------------------------------------------------
create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Reference: zones (quartiers) — Populaires ranks per zone, not per city.
-- ---------------------------------------------------------------------------
create table if not exists public.zones (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  name         text not null,
  city         text not null check (city in ('Montréal','Laval','Brossard','Magog')),
  created_at   timestamptz not null default now()
);

alter table public.zones enable row level security;

drop policy if exists "zones public read" on public.zones;
create policy "zones public read"
  on public.zones for select
  using (true);

-- Seed initial zones covering the 4 supported cities.
insert into public.zones (slug, name, city) values
  ('mtl-plateau-mile-end',   'Plateau / Mile End',         'Montréal'),
  ('mtl-vieux-montreal',     'Vieux-Montréal',             'Montréal'),
  ('mtl-centre-ville',       'Centre-ville',               'Montréal'),
  ('mtl-rosemont-villeray',  'Rosemont / Villeray',        'Montréal'),
  ('mtl-verdun-sud-ouest',   'Verdun / Sud-Ouest',         'Montréal'),
  ('lav-centropolis',        'Centropolis',                'Laval'),
  ('lav-carrefour',          'Carrefour Laval',            'Laval'),
  ('lav-sainte-rose',        'Sainte-Rose',                'Laval'),
  ('brs-dix30',              'Quartier DIX30',             'Brossard'),
  ('mag-centre',              'Magog centre',              'Magog')
on conflict (slug) do nothing;

-- ---------------------------------------------------------------------------
-- businesses — approved partners. Distinct from business_signups (waitlist).
-- ---------------------------------------------------------------------------
create table if not exists public.businesses (
  id                   uuid primary key default gen_random_uuid(),
  signup_id            uuid references public.business_signups(id) on delete set null,
  owner_user_id        uuid references auth.users(id) on delete set null,
  name                 text not null,
  slug                 text not null unique,
  category             text not null check (category in ('resto','spa','activite','bar','autre')),
  zone_id              uuid references public.zones(id) on delete restrict,
  address              text,
  latitude             double precision,
  longitude            double precision,
  phone                text,
  website              text,
  description          text,
  logo_url             text,
  tier                 text not null default 'genesis' check (tier in ('genesis','utopia','paradise')),
  status               text not null default 'pending_verification'
                         check (status in ('pending_verification','active','suspended','churned')),
  stripe_customer_id   text,
  stripe_subscription_id text,
  billing_cycle_anchor timestamptz,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);

create index if not exists businesses_zone_idx     on public.businesses(zone_id);
create index if not exists businesses_category_idx on public.businesses(category);
create index if not exists businesses_status_idx   on public.businesses(status);
create index if not exists businesses_owner_idx    on public.businesses(owner_user_id);

alter table public.businesses enable row level security;

drop policy if exists "businesses public read active" on public.businesses;
create policy "businesses public read active"
  on public.businesses for select
  using (status = 'active');

drop policy if exists "businesses owner read own" on public.businesses;
create policy "businesses owner read own"
  on public.businesses for select
  using (auth.uid() = owner_user_id);

drop policy if exists "businesses owner update own" on public.businesses;
create policy "businesses owner update own"
  on public.businesses for update
  using (auth.uid() = owner_user_id)
  with check (auth.uid() = owner_user_id);

-- ---------------------------------------------------------------------------
-- offers — reservable/promotable items attached to a business.
-- ---------------------------------------------------------------------------
create table if not exists public.offers (
  id                   uuid primary key default gen_random_uuid(),
  business_id          uuid not null references public.businesses(id) on delete cascade,
  title                text not null,
  description          text,
  category             text not null check (category in ('resto','spa','activite','bar','autre')),
  price_original_cents integer,
  price_promo_cents    integer,
  discount_label       text,
  duration_minutes     integer,
  capacity_per_slot    integer,
  photo_url            text,
  created_via          text not null default 'manual' check (created_via in ('eve_ai','manual')),
  status               text not null default 'draft'
                         check (status in ('draft','active','paused','expired')),
  published_at         timestamptz,
  expires_at           timestamptz,
  new_boost_until      timestamptz,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);

create index if not exists offers_business_idx  on public.offers(business_id);
create index if not exists offers_status_idx    on public.offers(status);
create index if not exists offers_category_idx  on public.offers(category);
create index if not exists offers_expires_idx   on public.offers(expires_at);
create index if not exists offers_new_boost_idx on public.offers(new_boost_until);

alter table public.offers enable row level security;

drop policy if exists "offers public read active" on public.offers;
create policy "offers public read active"
  on public.offers for select
  using (status = 'active');

drop policy if exists "offers owner all" on public.offers;
create policy "offers owner all"
  on public.offers for all
  using (
    exists (
      select 1 from public.businesses b
      where b.id = offers.business_id and b.owner_user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.businesses b
      where b.id = offers.business_id and b.owner_user_id = auth.uid()
    )
  );

-- ---------------------------------------------------------------------------
-- bookings — confirmed reservations against an offer. Distinct from
-- reservations (migration 002) which tracks catalog date-idea planning.
-- Only status='completed' triggers billing ($X per completed reservation
-- depending on tier).
-- ---------------------------------------------------------------------------
create table if not exists public.bookings (
  id                    uuid primary key default gen_random_uuid(),
  user_id               uuid not null references auth.users(id) on delete cascade,
  offer_id              uuid not null references public.offers(id) on delete restrict,
  business_id           uuid not null references public.businesses(id) on delete restrict,
  slot_datetime         timestamptz not null,
  party_size            integer not null default 2 check (party_size > 0),
  status                text not null default 'pending'
                          check (status in ('pending','confirmed','completed',
                                            'cancelled_user','cancelled_business','no_show')),
  price_snapshot_cents  integer,
  contact_name          text,
  contact_phone         text,
  notes                 text,
  confirmed_at          timestamptz,
  completed_at          timestamptz,
  cancelled_at          timestamptz,
  cancellation_reason   text,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

create index if not exists bookings_user_idx     on public.bookings(user_id);
create index if not exists bookings_offer_idx    on public.bookings(offer_id);
create index if not exists bookings_business_idx on public.bookings(business_id);
create index if not exists bookings_status_idx   on public.bookings(status);
create index if not exists bookings_slot_idx     on public.bookings(slot_datetime);

alter table public.bookings enable row level security;

drop policy if exists "bookings user read own" on public.bookings;
create policy "bookings user read own"
  on public.bookings for select
  using (auth.uid() = user_id);

drop policy if exists "bookings user insert own" on public.bookings;
create policy "bookings user insert own"
  on public.bookings for insert
  with check (auth.uid() = user_id);

drop policy if exists "bookings user cancel own" on public.bookings;
create policy "bookings user cancel own"
  on public.bookings for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "bookings business read own" on public.bookings;
create policy "bookings business read own"
  on public.bookings for select
  using (
    exists (
      select 1 from public.businesses b
      where b.id = bookings.business_id and b.owner_user_id = auth.uid()
    )
  );

drop policy if exists "bookings business update own" on public.bookings;
create policy "bookings business update own"
  on public.bookings for update
  using (
    exists (
      select 1 from public.businesses b
      where b.id = bookings.business_id and b.owner_user_id = auth.uid()
    )
  );

-- ---------------------------------------------------------------------------
-- clicks — outbound clicks on an offer (site/directions/phone). Used in Eve
-- Score at weight 1 with 24h de-dup per (user, offer). Anonymous clicks
-- (no user_id) are stored but excluded from unique-per-user math server-side.
-- ---------------------------------------------------------------------------
create table if not exists public.clicks (
  id           bigserial primary key,
  offer_id     uuid not null references public.offers(id) on delete cascade,
  business_id  uuid not null references public.businesses(id) on delete cascade,
  user_id      uuid references auth.users(id) on delete set null,
  session_id   text,
  target       text not null check (target in ('website','phone','directions','other')),
  ip_hash      text,
  ua_hash      text,
  created_at   timestamptz not null default now()
);

create index if not exists clicks_offer_idx      on public.clicks(offer_id, created_at desc);
create index if not exists clicks_business_idx   on public.clicks(business_id, created_at desc);
create index if not exists clicks_user_offer_day on public.clicks(user_id, offer_id, created_at desc);

alter table public.clicks enable row level security;

drop policy if exists "clicks anyone insert" on public.clicks;
create policy "clicks anyone insert"
  on public.clicks for insert
  with check (user_id is null or auth.uid() = user_id);

drop policy if exists "clicks business read own" on public.clicks;
create policy "clicks business read own"
  on public.clicks for select
  using (
    exists (
      select 1 from public.businesses b
      where b.id = clicks.business_id and b.owner_user_id = auth.uid()
    )
  );

-- ---------------------------------------------------------------------------
-- offer_favorites — separate from user_favorites (catalog). Weight 3 in Eve Score.
-- ---------------------------------------------------------------------------
create table if not exists public.offer_favorites (
  user_id     uuid not null references auth.users(id) on delete cascade,
  offer_id    uuid not null references public.offers(id) on delete cascade,
  business_id uuid not null references public.businesses(id) on delete cascade,
  created_at  timestamptz not null default now(),
  primary key (user_id, offer_id)
);

create index if not exists offer_favorites_business_idx on public.offer_favorites(business_id);
create index if not exists offer_favorites_created_idx  on public.offer_favorites(created_at desc);

alter table public.offer_favorites enable row level security;

drop policy if exists "offer_favorites own all" on public.offer_favorites;
create policy "offer_favorites own all"
  on public.offer_favorites for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "offer_favorites business read own" on public.offer_favorites;
create policy "offer_favorites business read own"
  on public.offer_favorites for select
  using (
    exists (
      select 1 from public.businesses b
      where b.id = offer_favorites.business_id and b.owner_user_id = auth.uid()
    )
  );

-- ---------------------------------------------------------------------------
-- reviews — post-booking user reviews. Only creatable if the user has a
-- 'completed' booking on that offer (enforced server-side).
-- ---------------------------------------------------------------------------
create table if not exists public.reviews (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  booking_id   uuid not null references public.bookings(id) on delete cascade,
  offer_id     uuid not null references public.offers(id) on delete cascade,
  business_id  uuid not null references public.businesses(id) on delete cascade,
  rating       integer not null check (rating between 1 and 5),
  comment      text,
  created_at   timestamptz not null default now(),
  unique (booking_id)
);

create index if not exists reviews_offer_idx    on public.reviews(offer_id);
create index if not exists reviews_business_idx on public.reviews(business_id);

alter table public.reviews enable row level security;

drop policy if exists "reviews public read" on public.reviews;
create policy "reviews public read"
  on public.reviews for select
  using (true);

drop policy if exists "reviews user insert own" on public.reviews;
create policy "reviews user insert own"
  on public.reviews for insert
  with check (auth.uid() = user_id);

drop policy if exists "reviews user update own" on public.reviews;
create policy "reviews user update own"
  on public.reviews for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- offer_credits — tracks per-cycle offer-slot allowance included in a tier.
-- Consumption is recorded here so we can detect the à-la-carte overage.
-- ---------------------------------------------------------------------------
create table if not exists public.offer_credits (
  id                  uuid primary key default gen_random_uuid(),
  business_id         uuid not null references public.businesses(id) on delete cascade,
  cycle_start         timestamptz not null,
  cycle_end           timestamptz not null,
  offers_included     integer not null,
  offers_consumed     integer not null default 0,
  extra_offers_charged integer not null default 0,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),
  unique (business_id, cycle_start)
);

alter table public.offer_credits enable row level security;

drop policy if exists "offer_credits business read own" on public.offer_credits;
create policy "offer_credits business read own"
  on public.offer_credits for select
  using (
    exists (
      select 1 from public.businesses b
      where b.id = offer_credits.business_id and b.owner_user_id = auth.uid()
    )
  );

-- ---------------------------------------------------------------------------
-- featured_slots — paid "En vedette" placements (distinct from Populaires).
-- Populaires is merit-only and NEVER purchasable.
-- ---------------------------------------------------------------------------
create table if not exists public.featured_slots (
  id           uuid primary key default gen_random_uuid(),
  business_id  uuid not null references public.businesses(id) on delete cascade,
  offer_id     uuid references public.offers(id) on delete set null,
  placement    text not null check (placement in ('offres_page','search_top','plans_eve')),
  zone_id      uuid references public.zones(id) on delete set null,
  starts_at    timestamptz not null,
  ends_at      timestamptz not null,
  price_cents  integer not null,
  paid_with    text not null check (paid_with in ('credit','a_la_carte','unlimited_tier')),
  stripe_invoice_id text,
  status       text not null default 'scheduled' check (status in ('scheduled','active','ended','cancelled')),
  created_at   timestamptz not null default now()
);

create index if not exists featured_slots_placement_active on public.featured_slots(placement, starts_at, ends_at);
create index if not exists featured_slots_business_idx     on public.featured_slots(business_id);

alter table public.featured_slots enable row level security;

drop policy if exists "featured_slots public read active" on public.featured_slots;
create policy "featured_slots public read active"
  on public.featured_slots for select
  using (status = 'active');

drop policy if exists "featured_slots business read own" on public.featured_slots;
create policy "featured_slots business read own"
  on public.featured_slots for select
  using (
    exists (
      select 1 from public.businesses b
      where b.id = featured_slots.business_id and b.owner_user_id = auth.uid()
    )
  );

-- ---------------------------------------------------------------------------
-- score_snapshots — daily Eve Score per business (30-day sliding window).
-- Computed by a scheduled job; stored so /populaires renders in O(1) reads.
-- ---------------------------------------------------------------------------
create table if not exists public.score_snapshots (
  id                       uuid primary key default gen_random_uuid(),
  business_id              uuid not null references public.businesses(id) on delete cascade,
  zone_id                  uuid references public.zones(id) on delete set null,
  category                 text not null,
  snapshot_date            date not null,
  score                    numeric(10,2) not null default 0,
  bookings_completed       integer not null default 0,
  bookings_confirmed       integer not null default 0,
  favorites_count          integer not null default 0,
  unique_clicks_count      integer not null default 0,
  meets_min_bookings       boolean not null default false,
  new_boost_active         boolean not null default false,
  created_at               timestamptz not null default now(),
  unique (business_id, snapshot_date)
);

create index if not exists score_snapshots_rank_idx on public.score_snapshots(zone_id, category, snapshot_date desc, score desc);

alter table public.score_snapshots enable row level security;

drop policy if exists "score_snapshots public read" on public.score_snapshots;
create policy "score_snapshots public read"
  on public.score_snapshots for select
  using (true);

-- ---------------------------------------------------------------------------
-- updated_at triggers (reuses public.set_updated_at from migration 002).
-- ---------------------------------------------------------------------------
do $$
begin
  if not exists (select 1 from pg_proc where proname = 'set_updated_at' and pronamespace = 'public'::regnamespace) then
    create function public.set_updated_at() returns trigger language plpgsql as $fn$
    begin
      new.updated_at = now();
      return new;
    end;
    $fn$;
  end if;
end$$;

drop trigger if exists trg_businesses_updated_at on public.businesses;
create trigger trg_businesses_updated_at before update on public.businesses
  for each row execute function public.set_updated_at();

drop trigger if exists trg_offers_updated_at on public.offers;
create trigger trg_offers_updated_at before update on public.offers
  for each row execute function public.set_updated_at();

drop trigger if exists trg_bookings_updated_at on public.bookings;
create trigger trg_bookings_updated_at before update on public.bookings
  for each row execute function public.set_updated_at();

drop trigger if exists trg_offer_credits_updated_at on public.offer_credits;
create trigger trg_offer_credits_updated_at before update on public.offer_credits
  for each row execute function public.set_updated_at();
