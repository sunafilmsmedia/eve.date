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

// Profile per outing type
export type CoupleProfile = {
  type: "couple";
  name: string;
  nickname?: string;
  interests: string[];
  temperament?: string;
  budget: number;
  relationshipStage?: string;
  occasion?: string;
  vibe?: string;
  likes?: string[];
  dislikes?: string[];
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

// Get display name from any profile type (for /dates page header)
export function getDisplayName(profile: Profile | null): string | null {
  if (!profile) return null;
  if (profile.type === "couple") {
    return profile.nickname?.trim() || profile.name?.trim() || null;
  }
  return null; // Other types don't have a single "name"
}
