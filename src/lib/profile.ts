export type OutingType = "couple" | "casual_dating" | "double_date" | "friends";

export const OUTING_TYPES: {
  value: OutingType;
  emoji: string;
  label: string;
  description: string;
}[] = [
  {
    value: "couple",
    emoji: "💕",
    label: "Couple",
    description:
      "Pour organiser une date romantique, une surprise, un anniversaire ou une sortie pour reconnecter.",
  },
  {
    value: "casual_dating",
    emoji: "💬",
    label: "Casual dating",
    description:
      "Pour un premier date, un deuxième date ou une sortie simple sans trop de pression.",
  },
  {
    value: "double_date",
    emoji: "👯",
    label: "Double dates",
    description:
      "Pour organiser une sortie à quatre avec une ambiance fun, sociale et naturelle.",
  },
  {
    value: "friends",
    emoji: "🍻",
    label: "Sorties entre amis",
    description:
      "Pour planifier une activité de groupe, une soirée, un brunch, un roadtrip ou une sortie spéciale.",
  },
];

// Common types
export type City = "Montréal" | "Laval" | "Brossard" | "Magog" | "Autre";

// Partner gender drives pronoun choice in copy ("elle adore" vs "il adore").
// "other" keeps the neutral "iel". Undefined = not chosen yet, fallback to "iel".
export type PartnerGender = "woman" | "man" | "other";

// Profile per outing type
export type CoupleProfile = {
  type: "couple";
  name: string;
  nicknames?: string[];
  partnerGender?: PartnerGender;
  interests: string[];
  temperament?: string;
  budget: number;
  relationshipStage?: string;
  vibe?: string;
  likes?: string[];
  dislikes?: string[];
  // Legacy single nickname — kept only so old localStorage/DB rows still
  // parse. Read via getDisplayName / normalized into nicknames on hydrate.
  nickname?: string;
};

export type CasualDatingProfile = {
  type: "casual_dating";
  conversationDuration?: string;
  datesCompleted: number;
  comfortLevel?: string;
  goal?: string;
  knownInterests: string[];
  budget: number;
  avoidActivities?: string[];
};

export type DoubleDateProfile = {
  type: "double_date";
  numberOfPeople: number;
  relationshipTypes?: string;
  budgetPerPerson: number;
  city?: City;
  maxDistance?: number;
  vibe?: string;
  energyLevel?: string;
  preferredActivities: string[];
  avoidActivities?: string[];
};

export type FriendsProfile = {
  type: "friends";
  numberOfPeople: number;
  occasion?: string;
  budgetPerPerson: number;
  city?: City;
  maxDistance?: number;
  time?: string;
  vibe?: string;
  energyLevel?: string;
  indoorOrOutdoor?: string;
  preferredActivities: string[];
  avoidActivities?: string[];
};

export type Profile =
  | CoupleProfile
  | CasualDatingProfile
  | DoubleDateProfile
  | FriendsProfile;

// localStorage keys
const OUTING_TYPE_KEY = "eve_outing_type";
const PROFILE_KEY = "eve_profile";

export function loadOutingType(): OutingType | null {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(OUTING_TYPE_KEY);
  if (v === "couple" || v === "casual_dating" || v === "double_date" || v === "friends") {
    return v;
  }
  return null;
}

export function saveOutingType(t: OutingType): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(OUTING_TYPE_KEY, t);
}

export function loadProfile(): Profile | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(PROFILE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Profile;
  } catch {
    return null;
  }
}

export function saveProfile(p: Profile): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
  localStorage.setItem(OUTING_TYPE_KEY, p.type);
}

export function clearOnboarding(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(OUTING_TYPE_KEY);
  localStorage.removeItem(PROFILE_KEY);
}

// UI helpers — what to call "the person/group" per type
export function getSubjectLabel(t: OutingType): string {
  switch (t) {
    case "couple":
      return "ta personne";
    case "casual_dating":
      return "ta date";
    case "double_date":
      return "le groupe";
    case "friends":
      return "ton groupe";
  }
}

export function getSubjectScript(t: OutingType): string {
  switch (t) {
    case "couple":
      return "ta moitié";
    case "casual_dating":
      return "ta nouvelle rencontre";
    case "double_date":
      return "votre quatuor";
    case "friends":
      return "ton équipe";
  }
}

// Get display name from any profile type (for /dates page header).
// For couples with multiple nicknames, returns them joined by ", ".
export function getDisplayName(profile: Profile | null): string | null {
  if (!profile) return null;
  if (profile.type === "couple") {
    const list = getCoupleNicknames(profile);
    if (list.length) return list.join(", ");
    return profile.name?.trim() || null;
  }
  return null;
}

// Normalize legacy `nickname` (string) into the new `nicknames` array,
// deduped and trimmed. Safe on freshly-created profiles too.
export function getCoupleNicknames(profile: CoupleProfile): string[] {
  const raw = profile.nicknames ?? [];
  const list: string[] = [];
  for (const n of raw) {
    const t = n.trim();
    if (t && !list.includes(t)) list.push(t);
  }
  if (profile.nickname) {
    const t = profile.nickname.trim();
    if (t && !list.includes(t)) list.push(t);
  }
  return list;
}

// Pronoun for adaptive copy ("ce qu'elle/il/iel adore").
export function getPartnerPronoun(gender: PartnerGender | undefined): "elle" | "il" | "iel" {
  if (gender === "woman") return "elle";
  if (gender === "man") return "il";
  return "iel";
}

// ============================================================
// SUPABASE INTEGRATION
// ============================================================

import type { SupabaseClient } from "@supabase/supabase-js";

export type ReservationRow = {
  id: string;
  user_id: string;
  date_idea_id: string;
  scheduled_for: string | null;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  notes: string | null;
  created_at: string;
  updated_at: string;
  completed_at: string | null;
};

export async function loadProfileFromSupabase(
  supabase: SupabaseClient,
  userId: string
): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("user_profiles")
    .select("outing_type, profile_data")
    .eq("user_id", userId)
    .maybeSingle();

  if (error || !data) return null;

  const profileData = (data.profile_data ?? {}) as Record<string, unknown>;
  return {
    ...profileData,
    type: data.outing_type as OutingType,
  } as unknown as Profile;
}

export async function saveProfileToSupabase(
  supabase: SupabaseClient,
  userId: string,
  profile: Profile
): Promise<{ error: string | null }> {
  const { type, ...rest } = profile as Profile & { type: OutingType };
  const profileData = rest as Record<string, unknown>;

  const { error } = await supabase.from("user_profiles").upsert(
    {
      user_id: userId,
      outing_type: type,
      profile_data: profileData,
    },
    { onConflict: "user_id" }
  );

  return { error: error?.message ?? null };
}

export async function countCompletedReservations(
  supabase: SupabaseClient,
  userId: string
): Promise<number> {
  const { count } = await supabase
    .from("reservations")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("status", "completed");
  return count ?? 0;
}

export async function loadReservations(
  supabase: SupabaseClient,
  userId: string,
  limit = 20
): Promise<ReservationRow[]> {
  const { data } = await supabase
    .from("reservations")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);
  return (data as ReservationRow[] | null) ?? [];
}

export async function createReservation(
  supabase: SupabaseClient,
  userId: string,
  dateIdeaId: string,
  scheduledFor?: string
): Promise<{ error: string | null }> {
  const { error } = await supabase.from("reservations").insert({
    user_id: userId,
    date_idea_id: dateIdeaId,
    scheduled_for: scheduledFor ?? null,
  });
  return { error: error?.message ?? null };
}
