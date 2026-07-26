// Partner ecosystem — types + config constants.
// Mirrors supabase/migrations/003_partner_ecosystem.sql.
//
// All pricing/weights are defined here (not hardcoded in SQL or UI) so they
// can be tweaked in one place. Later they can move to env vars or a runtime
// config table without changing consumer code — importers should keep using
// the exported constants rather than reading process.env directly.

// ---------------------------------------------------------------------------
// Enums / union types (must stay in sync with SQL check constraints)
// ---------------------------------------------------------------------------

export type OfferCategory = "resto" | "spa" | "activite" | "bar" | "autre";

export type BusinessTier = "genesis" | "utopia" | "paradise";

export type BusinessStatus =
  | "pending_verification"
  | "active"
  | "suspended"
  | "churned";

export type OfferStatus = "draft" | "active" | "paused" | "expired";

export type OfferCreatedVia = "eve_ai" | "manual";

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled_user"
  | "cancelled_business"
  | "no_show";

export type ClickTarget = "website" | "phone" | "directions" | "other";

export type FeaturedPlacement = "offres_page" | "search_top" | "plans_eve";

export type FeaturedPaidWith = "credit" | "a_la_carte" | "unlimited_tier";

export type FeaturedStatus = "scheduled" | "active" | "ended" | "cancelled";

export type PartnerCity = "Montréal" | "Laval" | "Brossard" | "Magog";

// ---------------------------------------------------------------------------
// Table row types
// ---------------------------------------------------------------------------

export type ZoneRow = {
  id: string;
  slug: string;
  name: string;
  city: PartnerCity;
  created_at: string;
};

export type BusinessRow = {
  id: string;
  signup_id: string | null;
  owner_user_id: string | null;
  name: string;
  slug: string;
  category: OfferCategory;
  zone_id: string | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  phone: string | null;
  website: string | null;
  description: string | null;
  logo_url: string | null;
  tier: BusinessTier;
  status: BusinessStatus;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  billing_cycle_anchor: string | null;
  created_at: string;
  updated_at: string;
};

export type OfferRow = {
  id: string;
  business_id: string;
  title: string;
  description: string | null;
  category: OfferCategory;
  price_original_cents: number | null;
  price_promo_cents: number | null;
  discount_label: string | null;
  duration_minutes: number | null;
  capacity_per_slot: number | null;
  photo_url: string | null;
  created_via: OfferCreatedVia;
  status: OfferStatus;
  published_at: string | null;
  expires_at: string | null;
  new_boost_until: string | null;
  created_at: string;
  updated_at: string;
};

export type BookingRow = {
  id: string;
  user_id: string;
  offer_id: string;
  business_id: string;
  slot_datetime: string;
  party_size: number;
  status: BookingStatus;
  price_snapshot_cents: number | null;
  contact_name: string | null;
  contact_phone: string | null;
  notes: string | null;
  confirmed_at: string | null;
  completed_at: string | null;
  cancelled_at: string | null;
  cancellation_reason: string | null;
  created_at: string;
  updated_at: string;
};

export type ClickRow = {
  id: number;
  offer_id: string;
  business_id: string;
  user_id: string | null;
  session_id: string | null;
  target: ClickTarget;
  ip_hash: string | null;
  ua_hash: string | null;
  created_at: string;
};

export type ScoreSnapshotRow = {
  id: string;
  business_id: string;
  zone_id: string | null;
  category: OfferCategory;
  snapshot_date: string;
  score: number;
  bookings_completed: number;
  bookings_confirmed: number;
  favorites_count: number;
  unique_clicks_count: number;
  meets_min_bookings: boolean;
  new_boost_active: boolean;
  created_at: string;
};

// ---------------------------------------------------------------------------
// Pricing tiers (§6.1 of spec)
// All amounts in cents (CAD).
// ---------------------------------------------------------------------------

export type TierConfig = {
  label: string;
  tagline: string;
  monthlyCents: number;
  reservationsIncluded: number | null; // null = illimité
  reservationExtraCents: number;
  publishedOffersIncluded: number; // publications d'offre gratuites / mois
};

export const PARTNER_TIERS: Record<BusinessTier, TierConfig> = {
  genesis: {
    label: "Genesis",
    tagline: "Tu testes Adam",
    monthlyCents: 1000,
    reservationsIncluded: 0,
    reservationExtraCents: 200,
    publishedOffersIncluded: 0,
  },
  utopia: {
    label: "Utopia",
    tagline: "Le forfait de la plupart des partenaires",
    monthlyCents: 9900,
    reservationsIncluded: 100,
    reservationExtraCents: 200,
    publishedOffersIncluded: 0,
  },
  paradise: {
    label: "Paradise",
    tagline: "Volume élevé + offres incluses",
    monthlyCents: 29900,
    reservationsIncluded: null,
    reservationExtraCents: 0,
    publishedOffersIncluded: 2,
  },
};

// Publication d'une offre suggérée par Eve — prix uniforme entre les tiers.
// Domination inclut 2 publications/mois gratuites (voir publishedOffersIncluded).
export const OFFER_PUBLICATION = {
  weeklyCents: 1500,
  monthlyCents: 4000,
} as const;

// ---------------------------------------------------------------------------
// Eve Score (§3 of spec)
// Weights are per-event over the sliding window; job aggregates & writes to
// score_snapshots daily.
// ---------------------------------------------------------------------------

export const SCORE_WEIGHTS = {
  bookingCompleted: 10,
  bookingConfirmedUpcoming: 6,
  favorite: 3,
  clickUnique: 1,
} as const;

export const SCORE_WINDOW_DAYS = 30;

// ---------------------------------------------------------------------------
// Populaires eligibility & boost (§4 of spec)
// ---------------------------------------------------------------------------

export const POPULAIRES_RULES = {
  // A business needs at least this many completed bookings in the window
  // before it can appear in Populaires (avoids brand-new listings dominating).
  minCompletedBookings: 5,
  // A zone × category bucket needs at least this many eligible businesses
  // before we render a Populaires list for it (avoids "top 1 of 1").
  minBusinessesPerBucket: 3,
  // Top-N per bucket displayed publicly.
  topN: 10,
} as const;

export const NEW_BOOST_DAYS = 7;

// ---------------------------------------------------------------------------
// Offer lifecycle (§7 of spec)
// ---------------------------------------------------------------------------

export const OFFER_LIFECYCLE = {
  defaultDurationDays: 30,
  expiryWarningDays: 5,
  autoCompleteBookingAfterHours: 24,
} as const;

// ---------------------------------------------------------------------------
// Anti-gaming (§8 of spec)
// ---------------------------------------------------------------------------

export const ANTI_GAMING = {
  // Clicks by the same (user, offer) within this window count once toward score.
  uniqueClickWindowHours: 24,
  // Compensation credited to the user when a business cancels a confirmed booking.
  businessCancelUserCreditCents: 300,
  // Business accounts (owners) don't count in their own click / favorite math.
  excludeBusinessOwners: true,
} as const;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function formatCadCents(cents: number): string {
  return `${(cents / 100).toFixed(cents % 100 === 0 ? 0 : 2)} $`;
}

export function tierLabel(tier: BusinessTier): string {
  return PARTNER_TIERS[tier].label;
}
