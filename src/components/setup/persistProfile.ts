"use client";

import { createClient } from "@/utils/supabase/client";
import { saveProfile, saveProfileToSupabase, type Profile } from "@/lib/profile";

/**
 * Persist profile to BOTH localStorage (immediate) and Supabase (if user is authed).
 * localStorage always succeeds. Supabase failure is logged but not surfaced — the
 * user can continue to use the app.
 */
export async function persistProfile(profile: Profile): Promise<void> {
  // Always save locally first (immediate, no network)
  saveProfile(profile);

  // Then sync to Supabase if env vars + user are present
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return;
  }

  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    const { error } = await saveProfileToSupabase(supabase, user.id, profile);
    if (error) {
      console.error("[persistProfile] supabase error:", error);
    }
  } catch (err) {
    console.error("[persistProfile] unexpected error:", err);
  }
}
