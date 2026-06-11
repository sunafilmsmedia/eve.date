"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { loadOutingType, loadProfile, getDisplayName, type OutingType, type Profile } from "@/lib/profile";
import { EDEN_REWARD_RULES } from "@/lib/rewards";
import { Script } from "./Script";

type PastDate = {
  id: string;
  title: string;
  date: string;
  status: "completed" | "upcoming" | "cancelled";
};

const TYPE_LABELS: Record<OutingType, string> = {
  couple: "Couple",
  casual_dating: "Casual dating",
  double_date: "Double date",
  friends: "Sorties entre amis",
};

const COMPLETED_KEY = "eve_completed_dates";
const HISTORY_KEY = "eve_date_history";

function progressPhrase(completed: number): string {
  if (completed >= 10) return "L'Édén est à toi";
  if (completed >= 8) return "Proche du paradis";
  if (completed >= 6) return "Tu approches";
  if (completed >= 3) return "Bien parti";
  if (completed >= 1) return "Les premiers pas";
  return "Le voyage commence";
}

export function AccountDashboard() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [outingType, setOutingType] = useState<OutingType | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [completedDates, setCompletedDates] = useState(0);
  const [pastDates, setPastDates] = useState<PastDate[]>([]);

  useEffect(() => {
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      router.replace("/login?next=/account");
      return;
    }
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.replace("/login?next=/account");
        return;
      }
      setUserEmail(data.user.email ?? null);
      setOutingType(loadOutingType());
      setProfile(loadProfile());

      // Read mock progress data from localStorage (future: from Supabase)
      const raw = localStorage.getItem(COMPLETED_KEY);
      setCompletedDates(raw ? Math.max(0, parseInt(raw, 10) || 0) : 0);

      const histRaw = localStorage.getItem(HISTORY_KEY);
      if (histRaw) {
        try {
          setPastDates(JSON.parse(histRaw) as PastDate[]);
        } catch {}
      }

      setReady(true);
    });
  }, [router]);

  if (!ready) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="font-script text-rose text-[28px]">un instant</p>
      </main>
    );
  }

  const goal = EDEN_REWARD_RULES.requiredReservations;
  const remaining = Math.max(0, goal - completedDates);
  const progressPct = Math.min(100, Math.round((completedDates / goal) * 100));
  const phrase = progressPhrase(completedDates);
  const displayName = getDisplayName(profile);
  const username = userEmail?.split("@")[0] ?? "ami";

  const logout = async () => {
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
      return;
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="max-w-[1000px] mx-auto">
        {/* Top nav */}
        <div className="flex items-center justify-between mb-14 flex-wrap gap-4">
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
              href="/dates"
              className="text-[10px] font-bold tracking-[0.18em] text-muted hover:text-rose transition-colors"
            >
              Voir le catalogue
            </Link>
            <span className="text-[10px] tracking-[0.14em] text-muted pl-5 border-l border-rose/15">
              {username}
            </span>
            <button
              onClick={logout}
              className="text-[10px] font-bold tracking-[0.18em] text-muted hover:text-rose transition-colors cursor-pointer"
            >
              Déconnexion
            </button>
          </div>
        </div>

        {/* Welcome */}
        <p className="text-[10px] font-bold tracking-[0.32em] text-rose mb-3">
          Mon compte
        </p>
        <h1 className="font-sans text-[28px] sm:text-[40px] font-extrabold tracking-[0.02em] text-charcoal mb-2 leading-[1.15]">
          Salut{" "}
          <Script className="text-rose text-[56px] sm:text-[80px] inline-block leading-[0.85]">
            {username}
          </Script>
        </h1>
        <p className="text-[11px] tracking-[0.14em] text-muted mb-12 leading-[1.7]">
          Voici ta progression et tes sorties planifiées.
        </p>

        {/* Édén progress card */}
        <div className="bg-gradient-to-br from-charcoal to-[#2a221d] rounded-[28px] p-8 sm:p-12 mb-10 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, rgba(201, 169, 110, 0.45) 0%, transparent 55%), radial-gradient(circle at 80% 70%, rgba(200, 114, 90, 0.3) 0%, transparent 50%)",
            }}
          />
          <div className="relative">
            <p className="text-[10px] font-bold tracking-[0.32em] text-gold mb-4">
              Progression vers Édén
            </p>
            <div className="flex items-baseline gap-3 mb-6 flex-wrap">
              <span className="text-[64px] sm:text-[88px] font-extrabold text-cream leading-none">
                {completedDates}/{goal}
              </span>
              <span className="font-script text-[40px] sm:text-[56px] text-gold leading-none">
                {phrase}
              </span>
            </div>

            {/* Progress bar */}
            <div className="h-3 bg-white/10 rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-gradient-to-r from-gold to-rose rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progressPct}%` }}
              />
            </div>

            <p className="text-[10px] tracking-[0.16em] text-cream/65 leading-[1.7] normal-case">
              {completedDates >= goal
                ? "100 $ en crédit Eve débloqué — applique-le sur ta prochaine sortie."
                : `Plus que ${remaining} sortie${remaining > 1 ? "s" : ""} pour débloquer 100 $ en crédit Eve.`}
            </p>
          </div>
        </div>

        {/* Profile summary */}
        {outingType && (
          <div className="bg-warm-white border border-rose/15 rounded-[22px] p-7 mb-10">
            <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
              <div>
                <p className="text-[10px] font-bold tracking-[0.32em] text-rose mb-2">
                  Ton profil
                </p>
                <p className="font-script text-[34px] text-charcoal leading-none mb-1">
                  {displayName || TYPE_LABELS[outingType]}
                </p>
                <p className="text-[10px] tracking-[0.14em] text-muted">
                  Type · {TYPE_LABELS[outingType]}
                </p>
              </div>
              <div className="flex gap-3 flex-wrap">
                <Link
                  href="/avatar"
                  className="text-[10px] font-bold tracking-[0.18em] text-rose hover:text-deep-rose transition-colors px-4 py-2 border border-rose/30 rounded-full"
                >
                  Modifier
                </Link>
                <Link
                  href="/start"
                  className="text-[10px] font-bold tracking-[0.18em] text-muted hover:text-rose transition-colors px-4 py-2"
                >
                  Changer de type
                </Link>
              </div>
            </div>
          </div>
        )}

        {!outingType && (
          <div className="bg-light-gold/30 border border-gold/30 rounded-[22px] p-7 mb-10 text-center">
            <p className="font-script text-[34px] text-rose mb-2 leading-none">
              Configure ton profil
            </p>
            <p className="text-[10px] tracking-[0.14em] text-muted leading-[1.7] mb-5 normal-case">
              Choisis ton type de sortie pour qu&apos;Eve personnalise ses recommandations.
            </p>
            <Link
              href="/start"
              className="inline-block bg-rose text-white px-7 py-3 rounded-full text-[10px] font-bold tracking-[0.22em] hover:bg-deep-rose transition-colors"
            >
              Commencer →
            </Link>
          </div>
        )}

        {/* Past dates */}
        <div className="bg-warm-white border border-rose/15 rounded-[22px] p-7 mb-10">
          <p className="text-[10px] font-bold tracking-[0.32em] text-rose mb-5">
            Tes sorties planifiées
          </p>
          {pastDates.length === 0 ? (
            <div className="text-center py-10">
              <p className="font-script text-rose text-[40px] mb-2 leading-none">
                vide pour l&apos;instant
              </p>
              <p className="text-[10px] tracking-[0.14em] text-muted leading-[1.7] mb-6 normal-case max-w-md mx-auto">
                Tu n&apos;as pas encore planifié de sortie. Commence à explorer le catalogue ou demande à Eve.
              </p>
              <Link
                href="/dates"
                className="inline-block bg-rose text-white px-7 py-3 rounded-full text-[10px] font-bold tracking-[0.22em] hover:bg-deep-rose transition-colors"
              >
                Voir le catalogue
              </Link>
            </div>
          ) : (
            <ul className="list-none space-y-3">
              {pastDates.map((d) => (
                <li
                  key={d.id}
                  className="flex items-center justify-between gap-4 py-3 border-b border-rose/10 last:border-0"
                >
                  <div>
                    <p className="text-[12px] font-bold tracking-[0.08em] text-charcoal mb-1">
                      {d.title}
                    </p>
                    <p className="text-[9px] tracking-[0.18em] text-muted">{d.date}</p>
                  </div>
                  <span
                    className={`text-[9px] font-bold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full ${
                      d.status === "completed"
                        ? "bg-rose/10 text-rose"
                        : d.status === "upcoming"
                          ? "bg-gold/20 text-deep-rose"
                          : "bg-muted/20 text-muted"
                    }`}
                  >
                    {d.status === "completed"
                      ? "Complétée"
                      : d.status === "upcoming"
                        ? "À venir"
                        : "Annulée"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* CTA bottom */}
        <div className="text-center pb-12">
          <Link
            href="/dates"
            className="inline-block bg-charcoal text-cream px-10 py-4 rounded-full text-[11px] font-bold tracking-[0.22em] hover:bg-rose transition-colors"
          >
            Planifier une nouvelle sortie →
          </Link>
        </div>
      </div>
    </main>
  );
}
