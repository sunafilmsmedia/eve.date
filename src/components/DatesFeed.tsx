"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Script } from "./Script";
import { DATES, starsString, type DateIdea } from "@/lib/dates";

type Status = "single" | "couple";
type Partner = {
  name?: string;
  nickname?: string;
  interests?: string[];
  vibe?: string;
  budget?: number;
};

const HEADER_VARIANTS = {
  rose: "bg-gradient-to-br from-rose to-deep-rose",
  gold: "bg-gradient-to-br from-gold to-[#a07840]",
  dark: "bg-gradient-to-br from-[#3a2e28] to-charcoal",
};

const FILTERS: { v: string; label: string }[] = [
  { v: "all", label: "Tout" },
  { v: "first-date", label: "1ères dates" },
  { v: "anniversary", label: "Anniversaire" },
  { v: "nature", label: "Nature" },
  { v: "gastronomy", label: "Gastronomie" },
  { v: "winter", label: "Hiver" },
  { v: "adventure", label: "Aventure" },
  { v: "art-culture", label: "Art & Culture" },
];

export function DatesFeed() {
  const router = useRouter();
  const [status, setStatus] = useState<Status | null>(null);
  const [partner, setPartner] = useState<Partner | null>(null);
  const [filter, setFilter] = useState("all");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const s = localStorage.getItem("eve_status") as Status | null;
    if (!s) {
      router.push("/start");
      return;
    }
    const p = localStorage.getItem("eve_partner");
    if (s === "couple" && !p) {
      router.push("/avatar");
      return;
    }
    setStatus(s);
    if (p) {
      try {
        setPartner(JSON.parse(p) as Partner);
      } catch {
        /* corrupted — ignore */
      }
    }
    setReady(true);
  }, [router]);

  if (!ready) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="font-script text-rose text-[28px]">un instant</p>
      </main>
    );
  }

  const dates = DATES.filter((d) => {
    if (status === "single" && !d.forSingles) return false;
    if (status === "couple" && !d.forCouples) return false;
    if (filter !== "all" && d.category !== filter) return false;
    return true;
  });

  const displayName = partner?.nickname?.trim() || partner?.name?.trim();

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="max-w-[1100px] mx-auto">
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
          <div className="flex items-center gap-5">
            {status === "couple" && (
              <Link
                href="/avatar"
                className="text-[10px] font-bold tracking-[0.18em] text-muted hover:text-rose transition-colors"
              >
                Modifier l&apos;avatar
              </Link>
            )}
            <Link
              href="/start"
              className="text-[10px] font-bold tracking-[0.18em] text-muted hover:text-rose transition-colors"
            >
              Changer →
            </Link>
          </div>
        </div>

        <p className="text-[10px] font-bold tracking-[0.32em] text-rose mb-4">
          Sélection Eve
        </p>
        <h1 className="font-sans text-[28px] sm:text-[40px] font-extrabold tracking-[0.02em] text-charcoal mb-3 leading-[1.15]">
          {status === "couple" && displayName ? (
            <>
              Pour{" "}
              <Script className="text-rose text-[56px] sm:text-[80px] inline-block leading-[0.85]">
                {displayName}
              </Script>
            </>
          ) : (
            <>
              Découvre des{" "}
              <Script className="text-rose text-[56px] sm:text-[80px] inline-block leading-[0.85]">
                moments
              </Script>
            </>
          )}
        </h1>
        <p className="text-[11px] tracking-[0.16em] text-muted mb-10 leading-[1.7] max-w-xl">
          {status === "couple"
            ? "Sélection adaptée à vous deux. Tu peux aussi générer une date 100% personnalisée."
            : "Des idées pour vos premières rencontres et soirées spéciales à venir."}
        </p>

        {status === "couple" && displayName && (
          <div className="bg-gradient-to-br from-light-gold/50 to-blush/40 border border-gold/30 rounded-[22px] p-7 sm:p-8 mb-12 flex items-center justify-between gap-6 flex-wrap">
            <div className="flex-1 min-w-[240px]">
              <p className="text-[10px] font-bold tracking-[0.22em] text-deep-rose mb-1.5">
                ✨ Date sur mesure
              </p>
              <p className="font-script text-[30px] sm:text-[36px] text-charcoal leading-[1] mb-1.5">
                Génère une date pour {displayName}
              </p>
              <p className="text-[10px] tracking-[0.14em] text-muted leading-[1.7]">
                Eve crée une date 100% unique basée sur son avatar.
              </p>
            </div>
            <button
              disabled
              className="bg-rose/40 text-white px-7 py-3.5 rounded-full text-[11px] font-bold tracking-[0.22em] cursor-not-allowed shrink-0"
              title="Bientôt disponible"
            >
              Bientôt ✨
            </button>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-10">
          {FILTERS.map((f) => (
            <button
              key={f.v}
              onClick={() => setFilter(f.v)}
              className={`text-[10px] font-bold tracking-[0.16em] px-4 py-2.5 rounded-full border-[1.5px] transition-all ${
                filter === f.v
                  ? "bg-rose text-white border-rose"
                  : "bg-cream text-muted border-rose/15 hover:border-rose hover:text-rose"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {dates.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-script text-rose text-[40px] mb-2">vide pour l&apos;instant</p>
            <p className="text-[10px] tracking-[0.18em] text-muted">
              Pas de date dans cette catégorie. Essaye un autre filtre.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dates.map((d) => (
              <DateCard key={d.id} date={d} />
            ))}
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
          {date.tag} · {date.city}
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
