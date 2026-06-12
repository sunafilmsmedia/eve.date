-- Migration 002: user-side tables (profile, reservations, favorites, rewards)
-- Run this in Supabase Dashboard → SQL Editor

-- ============================================================
-- USER PROFILES
-- ============================================================
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE
    REFERENCES auth.users(id) ON DELETE CASCADE,
  outing_type TEXT NOT NULL
    CHECK (outing_type IN ('couple','casual_dating','double_date','friends')),
  profile_data JSONB NOT NULL DEFAULT '{}',
  subscription_status TEXT NOT NULL DEFAULT 'free'
    CHECK (subscription_status IN ('free','eden_active','eden_cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.user_profiles IS
  'One row per user: outing type + type-specific profile data + subscription status';

CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id
  ON public.user_profiles (user_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_outing_type
  ON public.user_profiles (outing_type);

DROP TRIGGER IF EXISTS user_profiles_set_updated_at ON public.user_profiles;
CREATE TRIGGER user_profiles_set_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own profile" ON public.user_profiles;
CREATE POLICY "Users can view their own profile"
  ON public.user_profiles FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own profile" ON public.user_profiles;
CREATE POLICY "Users can insert their own profile"
  ON public.user_profiles FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.user_profiles;
CREATE POLICY "Users can update their own profile"
  ON public.user_profiles FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own profile" ON public.user_profiles;
CREATE POLICY "Users can delete their own profile"
  ON public.user_profiles FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- ============================================================
-- RESERVATIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL
    REFERENCES auth.users(id) ON DELETE CASCADE,
  date_idea_id TEXT NOT NULL,
  scheduled_for TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending','confirmed','completed','cancelled')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

COMMENT ON TABLE public.reservations IS
  'A planned/booked outing from the catalogue (or a custom one). Status lifecycle: pending → confirmed → completed (or cancelled)';

CREATE INDEX IF NOT EXISTS idx_reservations_user_id
  ON public.reservations (user_id);
CREATE INDEX IF NOT EXISTS idx_reservations_status
  ON public.reservations (status);
CREATE INDEX IF NOT EXISTS idx_reservations_scheduled_for
  ON public.reservations (scheduled_for);

DROP TRIGGER IF EXISTS reservations_set_updated_at ON public.reservations;
CREATE TRIGGER reservations_set_updated_at
  BEFORE UPDATE ON public.reservations
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own reservations" ON public.reservations;
CREATE POLICY "Users can view their own reservations"
  ON public.reservations FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own reservations" ON public.reservations;
CREATE POLICY "Users can insert their own reservations"
  ON public.reservations FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own reservations" ON public.reservations;
CREATE POLICY "Users can update their own reservations"
  ON public.reservations FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own reservations" ON public.reservations;
CREATE POLICY "Users can delete their own reservations"
  ON public.reservations FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- ============================================================
-- USER FAVORITES
-- ============================================================
CREATE TABLE IF NOT EXISTS public.user_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL
    REFERENCES auth.users(id) ON DELETE CASCADE,
  date_idea_id TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, date_idea_id)
);

CREATE INDEX IF NOT EXISTS idx_user_favorites_user_id
  ON public.user_favorites (user_id);

ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own favorites" ON public.user_favorites;
CREATE POLICY "Users can view their own favorites"
  ON public.user_favorites FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own favorites" ON public.user_favorites;
CREATE POLICY "Users can insert their own favorites"
  ON public.user_favorites FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own favorites" ON public.user_favorites;
CREATE POLICY "Users can delete their own favorites"
  ON public.user_favorites FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- ============================================================
-- EDEN REWARDS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.eden_rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL
    REFERENCES auth.users(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  credit_cents INTEGER NOT NULL DEFAULT 10000,
  credit_used BOOLEAN NOT NULL DEFAULT FALSE,
  credit_used_at TIMESTAMPTZ,
  credit_used_on_reservation_id UUID
    REFERENCES public.reservations(id) ON DELETE SET NULL,
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '90 days')
);

COMMENT ON TABLE public.eden_rewards IS
  'Tracks unlocked $100 Édén loyalty credits — one row per unlocked reward cycle';

CREATE INDEX IF NOT EXISTS idx_eden_rewards_user_id
  ON public.eden_rewards (user_id);
CREATE INDEX IF NOT EXISTS idx_eden_rewards_unused
  ON public.eden_rewards (user_id, credit_used)
  WHERE credit_used = FALSE;

ALTER TABLE public.eden_rewards ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own rewards" ON public.eden_rewards;
CREATE POLICY "Users can view their own rewards"
  ON public.eden_rewards FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can mark their own rewards used" ON public.eden_rewards;
CREATE POLICY "Users can mark their own rewards used"
  ON public.eden_rewards FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

-- NOTE: INSERT of rewards happens server-side (service role) when conditions
-- are met. Users cannot create rewards themselves.
