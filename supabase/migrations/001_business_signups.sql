-- Migration 001: business signup waitlist
-- Run this in Supabase Dashboard → SQL Editor

-- ============================================================
-- TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.business_signups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Core info (all required from the form)
  business_name TEXT NOT NULL,
  business_type TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  website TEXT NOT NULL,
  incorporation_name TEXT NOT NULL,
  billing_address TEXT NOT NULL,
  description TEXT,

  -- Which tier the business is interested in (chosen in signup form).
  -- Nullable + free text so "je ne sais pas encore" and future tiers work
  -- without a migration; app-side we constrain to genesis/utopia/paradise/pas_sur.
  tier TEXT,

  -- Interest in Eve-suggested offer publications (15$/wk or 40$/mo per offer).
  interested_in_sponsoring BOOLEAN NOT NULL DEFAULT FALSE,
  sponsored_offer TEXT,

  -- Lifecycle tracking
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'approved', 'rejected', 'active', 'archived')),
  reviewed_at TIMESTAMPTZ,
  review_notes TEXT
);

COMMENT ON TABLE public.business_signups IS
  'Waitlist + onboarding requests from /business inscription form';

-- Idempotent guards so re-running this migration reconciles older
-- versions of the schema without dropping data.
ALTER TABLE public.business_signups ADD COLUMN IF NOT EXISTS tier TEXT;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'business_signups'
      AND column_name = 'tax_number'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'business_signups'
      AND column_name = 'incorporation_name'
  ) THEN
    ALTER TABLE public.business_signups RENAME COLUMN tax_number TO incorporation_name;
  END IF;
END $$;

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_business_signups_email
  ON public.business_signups (email);

CREATE INDEX IF NOT EXISTS idx_business_signups_status
  ON public.business_signups (status);

CREATE INDEX IF NOT EXISTS idx_business_signups_created_at
  ON public.business_signups (created_at DESC);

-- ============================================================
-- updated_at trigger
-- ============================================================
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS business_signups_set_updated_at ON public.business_signups;

CREATE TRIGGER business_signups_set_updated_at
  BEFORE UPDATE ON public.business_signups
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
-- Anyone can submit (the /business form is public),
-- but no one (except via service-role or Supabase dashboard) can read.
-- Admins view signups via Supabase Table Editor for now.

ALTER TABLE public.business_signups ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can submit a business signup"
  ON public.business_signups;

CREATE POLICY "Public can submit a business signup"
  ON public.business_signups
  FOR INSERT
  TO public
  WITH CHECK (true);

-- No SELECT/UPDATE/DELETE policies = nobody can read or modify via anon/auth
-- (Supabase service_role + Dashboard bypass RLS, so admin still sees rows.)
