"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Script } from "./Script";
import { EveChat } from "./EveChat";
import { createClient } from "@/utils/supabase/client";
import {
  DATES,
  CATEGORIES,
  starsString,
  type DateIdea,
  type DateOccasion,
  type Season,
  type DateCategory,
} from "@/lib/dates";
import {
  loadOutingType,
  loadProfile,
  loadProfileFromSupabase,
  saveProfile,
  saveOutingType,
  getDisplayName,
  type OutingType,
  type Profile,
} from "@/lib/profile";

const HEADER_VARIANTS = {
  rose: "bg-gradient-to-br from-rose to-deep-rose",
  gold: "bg-gradient-to-br from-gold to-[#a07840]",
  dark: "bg-gradient-to-br from-[#3a2e28] to-charcoal",
};

const SEASONS: { value: Season | "all"; label: string; emoji: string }[] = [
  { value: "all", label: "Tout", emoji: "" },
  { value: "printemps", label: "Printemps", emoji: "🌸" },
  { value: "ete", label: "Été", emoji: "☀️" },
  { value: "automne", label: "Automne", emoji: "🍂" },
  { value: "hiver", label: "Hiver", emoji: "❄️" },
];

const SITUATIONS_PER_TYPE: Record<
  OutingType,
  { value: DateOccasion | "all"; label: string }[]
> = {
  couple: [
    { value: "all", label: "Tout" },
    { value: "date-night", label: "Date night" },
    { value: "anniversaire", label: "Anniversaire" },
    { value: "saint-valentin", label: "St-Valentin" },
    { value: "birthday", label: "Birthday" },
    { value: "weekend", label: "Weekend escape" },
  ],
  casual_dating: [
    { value: "all", label: "Tout" },
    { value: "1ere-date", label: "1ère date" },
    { value: "2eme-date", label: "2ème date" },
    { value: "3eme-date+", label: "3ème date +" },
    { value: "casual", label: "Sortie casual" },
  ],
  double_date: [
    { value: "all", label: "Tout" },
    { value: "date-night", label: "Sortie à 4" },
    { value: "weekend", label: "Weekend" },
    { value: "casual", label: "Casual" },
  ],
  friends: [
    { value: "all", label: "Tout" },
    { value: "casual", label: "Casual" },
    { value: "weekend", label: "Weekend" },
    { value: "birthday", label: "Anniversaire" },
  ],
};

const HERO_COPY: Record<
  OutingType,
  { label: string; scriptWord: string; desc: string }
> = {
  couple: {
    label: "Sélection couple",
    scriptWord: "moments",
    desc: "Filtre par saison et type de soirée. Demande à Eve si tu cherches une idée sur mesure autour d'un de ses surnoms.",
  },
  casual_dating: {
    label: "Casual dating",
    scriptWord: "moments",
    desc: "Filtre par saison et étape de votre rencontre. Eve évite les ambiances trop intimes au début.",
  },
  double_date: {
    label: "Double date",
    scriptWord: "moments",
    desc: "Sorties à quatre qui évitent les malaises. Demande à Eve pour des suggestions sur mesure.",
  },
  friends: {
    label: "Sortie entre amis",
    scriptWord: "moments",
    desc: "Idées de groupe filtrées par saison et énergie. Demande à Eve pour une activité précise.",
  },
};

export function DatesFeed() {
  const router = useRouter();
  const [outingType, setOutingType] = useState<OutingType | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [season, setSeason] = useState<Season | "all">("all");
  const [occasion, setOccasion] = useState<DateOccasion | "all">("all");
  const [ready, setReady] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    // Auth gate — account is now mandatory
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      // No Supabase configured — local dev fallback, allow through
      const t = loadOutingType();
      if (!t) {
        router.push("/start");
        return;
      }
      setOutingType(t);
      setProfile(loadProfile());
      setReady(true);
      return;
    }

    const supabase = createClient();
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.replace("/login?next=/dates");
        return;
      }
      setUserEmail(data.user.email ?? null);

      // Prefer Supabase profile; fall back to localStorage
      const dbProfile = await loadProfileFromSupabase(supabase, data.user.id);
      if (dbProfile) {
        saveProfile(dbProfile);
        saveOutingType(dbProfile.type);
        setOutingType(dbProfile.type);
        setProfile(dbProfile);
        setReady(true);
        return;
      }

      const t = loadOutingType();
      if (!t) {
        router.push("/start");
        return;
      }
      const p = loadProfile();
      if (!p) {
        router.push("/avatar");
        return;
      }
      setOutingType(t);
      setProfile(p);
      setReady(true);
    })();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null);
    });
    return () => {
      sub.subscription.unsubscribe();
    };
  }, [router]);

  const hasAccount = userEmail !== null;

  const filteredDates = useMemo(() => {
    if (!outingType) return [];
    return DATES.filter((d) => {
      // Couple: show forCouples. Casual: show forSingles. Double/Friends: show all.
      if (outingType === "couple" && !d.forCouples) return false;
      if (outingType === "casual_dating" && !d.forSingles) return false;
      if (season !== "all" && !d.seasons.includes(season) && !d.seasons.includes("all"))
        return false;
      if (occasion !== "all" && !d.occasions.includes(occasion)) return false;
      return true;
    });
  }, [outingType, season, occasion]);

  const datesByCategory = useMemo(() => {
    const map = new Map<DateCategory, DateIdea[]>();
    for (const date of filteredDates) {
      const list = map.get(date.category) ?? [];
      list.push(date);
      map.set(date.category, list);
    }
    return map;
  }, [filteredDates]);

  if (!ready || !outingType) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="font-script text-rose text-[28px]">un instant</p>
      </main>
    );
  }

  const displayName = getDisplayName(profile);
  const situations = SITUATIONS_PER_TYPE[outingType];
  const hero = HERO_COPY[outingType];

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="max-w-[1100px] mx-auto">
        {/* Top nav */}
        <div className="flex items-center justify-between mb-12 flex-wrap gap-4">
          <Link
            href="/"
            className="inline-block font-script text-[34px] text-charcoal leading-none hover:text-rose transition-colors"
          >
            Eve
            <span className="font-sans text-[10px] font-bold text-rose tracking-[0.3em] uppercase align-middle ml-1.5">
              AI
            </span>
          </Link>
          <div className="flex items-center gap-5 flex-wrap">
            <Link
              href="/avatar"
              className="text-[10px] font-bold tracking-[0.18em] text-muted hover:text-rose transition-colors"
            >
              Modifier le profil
            </Link>
            <Link
              href="/start"
              className="text-[10px] font-bold tracking-[0.18em] text-muted hover:text-rose transition-colors"
            >
              Changer de type →
            </Link>
            {hasAccount && userEmail && (
              <div className="flex items-center gap-3 pl-5 border-l border-rose/15">
                <span className="text-[10px] tracking-[0.14em] text-muted">
                  {userEmail.split("@")[0]}
                </span>
                <button
                  onClick={async () => {
                    if (
                      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
                      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
                    )
                      return;
                    const supabase = createClient();
                    await supabase.auth.signOut();
                    router.push("/");
                  }}
                  className="text-[10px] font-bold tracking-[0.18em] text-muted hover:text-rose transition-colors cursor-pointer"
                >
                  Déconnexion
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Chat with Eve at the top */}
        <EveChat outingType={outingType} profile={profile} hasAccount={hasAccount} />

        {/* Catalogue section header */}
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px bg-rose/15 flex-1" />
          <p className="text-[10px] font-bold tracking-[0.32em] text-rose whitespace-nowrap">
            Ou explore le catalogue
          </p>
          <div className="h-px bg-rose/15 flex-1" />
        </div>

        <p className="text-[10px] font-bold tracking-[0.32em] text-rose mb-4 text-center">
          {hero.label}
        </p>
        <h1 className="font-sans text-[28px] sm:text-[40px] font-extrabold tracking-[0.02em] text-charcoal mb-3 leading-[1.15] text-center">
          {outingType === "couple" && displayName ? (
            <>
              Pour{" "}
              <Script className="text-rose text-[56px] sm:text-[80px] inline-block leading-[0.85]">
                {displayName}
              </Script>
            </>
          ) : (
            <>
              Des{" "}
              <Script className="text-rose text-[56px] sm:text-[80px] inline-block leading-[0.85]">
                {hero.scriptWord}
              </Script>{" "}
              à découvrir
            </>
          )}
        </h1>
        <p className="text-[11px] tracking-[0.16em] text-muted mb-10 leading-[1.7] max-w-xl mx-auto text-center">
          {hero.desc}
        </p>

        {/* Couple-only generate CTA */}
        {outingType === "couple" && displayName && (
          <div className="bg-gradient-to-br from-light-gold/50 to-blush/40 border border-gold/30 rounded-[22px] p-7 sm:p-8 mb-10 flex items-center justify-between gap-6 flex-wrap">
            <div className="flex-1 min-w-[240px]">
              <p className="text-[10px] font-bold tracking-[0.22em] text-deep-rose mb-1.5">
                ✨ Date sur mesure
              </p>
              <p className="font-script text-[30px] sm:text-[36px] text-charcoal leading-[1] mb-1.5">
                Génère une date pour {displayName}
              </p>
              <p className="text-[10px] tracking-[0.14em] text-muted leading-[1.7]">
                Eve crée une date 100% unique basée sur son profil.
              </p>
            </div>
            <button
              disabled
              className="bg-rose/40 text-white px-7 py-3.5 rounded-full text-[11px] font-bold tracking-[0.22em] cursor-not-allowed shrink-0"
            >
              Bientôt ✨
            </button>
          </div>
        )}

        {/* Top filters: Season */}
        <div className="mb-6">
          <p className="text-[9px] font-bold tracking-[0.32em] text-muted mb-3">Saison</p>
          <div className="flex flex-wrap gap-2">
            {SEASONS.map((s) => (
              <button
                key={s.value}
                onClick={() => setSeason(s.value as Season | "all")}
                className={`text-[10px] font-bold tracking-[0.16em] px-4 py-2.5 rounded-full border-[1.5px] transition-all ${
                  season === s.value
                    ? "bg-charcoal text-cream border-charcoal"
                    : "bg-cream text-muted border-rose/15 hover:border-charcoal hover:text-charcoal"
                }`}
              >
                {s.emoji && <span className="mr-1.5">{s.emoji}</span>}
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Top filters: Situation */}
        <div className="mb-10">
          <p className="text-[9px] font-bold tracking-[0.32em] text-muted mb-3">
            Situation
          </p>
          <div className="flex flex-wrap gap-2">
            {situations.map((s) => (
              <button
                key={s.value}
                onClick={() => setOccasion(s.value as DateOccasion | "all")}
                className={`text-[10px] font-bold tracking-[0.16em] px-4 py-2.5 rounded-full border-[1.5px] transition-all ${
                  occasion === s.value
                    ? "bg-rose text-white border-rose"
                    : "bg-cream text-muted border-rose/15 hover:border-rose hover:text-rose"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sections by category */}
        {filteredDates.length === 0 ? (
          <div className="text-center py-20 bg-warm-white border border-rose/15 rounded-[24px]">
            <p className="font-script text-rose text-[48px] mb-3">vide</p>
            <p className="text-[10px] tracking-[0.18em] text-muted leading-[1.8] max-w-md mx-auto">
              Aucune date pour ces filtres. Essaye une autre combinaison ou demande à Eve.
            </p>
          </div>
        ) : (
          <div className="space-y-14">
            {CATEGORIES.map((cat) => {
              const dates = datesByCategory.get(cat.value);
              if (!dates || dates.length === 0) return null;
              return (
                <section key={cat.value}>
                  <div className="flex items-baseline justify-between mb-6 pb-3 border-b border-rose/15">
                    <h2 className="font-sans text-[13px] font-extrabold tracking-[0.22em] text-charcoal">
                      <span className="mr-2">{cat.emoji}</span>
                      {cat.label}
                    </h2>
                    <span className="text-[9px] font-semibold tracking-[0.2em] text-muted">
                      {dates.length} {dates.length > 1 ? "idées" : "idée"}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dates.map((d) => (
                      <DateCard key={d.id} date={d} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

function DateCard({ date }: { date: DateIdea }) {
  return (
    <div className="rounded-[22px] overflow-hidden border border-rose/15 bg-cream hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(200,114,90,0.15)] transition-all">
      <div className={`${HEADER_VARIANTS[date.variant]} px-7 pt-[30px] pb-6`}>
        <div className="inline-block bg-white/20 text-white text-[9px] font-bold tracking-[0.2em] px-3 py-1 rounded-full mb-4">
          {date.city}
        </div>
        <div className="font-script text-[36px] text-white mb-3 leading-none">
          {date.title}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#ffd700] text-[13px] tracking-[0.05em]">
            {starsString(date.rating)}
          </span>
          <span className="text-[9px] font-semibold tracking-[0.18em] text-white/75">
            {date.rating} · {date.ratingCount} avis
          </span>
        </div>
      </div>
      <div className="px-7 py-[26px]">
        <ul className="list-none mb-[22px]">
          {date.steps.map((step) => (
            <li
              key={step}
              className="flex items-center gap-3 text-[10px] font-medium tracking-[0.16em] text-muted py-1.5 leading-[1.6]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose flex-shrink-0" />
              {step}
            </li>
          ))}
        </ul>
        <div className="flex gap-2.5 flex-wrap">
          <span className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.16em] text-muted bg-rose/10 px-3 py-1.5 rounded-full">
            🕐 {date.duration}
          </span>
          <span className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.16em] text-muted bg-rose/10 px-3 py-1.5 rounded-full">
            💰 {date.price}
          </span>
        </div>
      </div>
    </div>
  );
}
