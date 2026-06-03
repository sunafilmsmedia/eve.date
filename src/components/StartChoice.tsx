"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SINGLE_PHRASES = [
  "J'ai pas encore trouvé ma douce moitié",
  "Solo mais pas désespéré",
  "Mon âme sœur a pris la mauvaise sortie",
  "Mon cœur est sur réservation",
  "Single & curieux·se",
  "Le seul couple stable, c'est moi et mon café",
  "Toujours en mission cœur à prendre",
  "Cupidon a raté son tir",
  "Cherche moitié pour fondue",
  "Disponible (jusqu'à preuve du contraire)",
  "Mon ex c'est mon ombre",
  "Cœur en attente d'une notification",
];

const COUPLE_PHRASES = [
  "Je suis en couple",
  "Mon cœur est déjà pris",
  "J'ai trouvé mon élu·e",
  "On est deux dans la danse",
  "Cœur signé, scellé, livré",
];

export function StartChoice() {
  const router = useRouter();
  const [singlePhrase, setSinglePhrase] = useState(SINGLE_PHRASES[0]);
  const [couplePhrase, setCouplePhrase] = useState(COUPLE_PHRASES[0]);

  useEffect(() => {
    setSinglePhrase(
      SINGLE_PHRASES[Math.floor(Math.random() * SINGLE_PHRASES.length)]
    );
    setCouplePhrase(
      COUPLE_PHRASES[Math.floor(Math.random() * COUPLE_PHRASES.length)]
    );
  }, []);

  const choose = (status: "single" | "couple") => {
    if (typeof window !== "undefined") {
      localStorage.setItem("eve_status", status);
    }
    router.push(status === "couple" ? "/avatar" : "/dates");
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-[640px] text-center">
        <Link
          href="/"
          className="inline-block font-script text-[42px] text-charcoal leading-none hover:text-rose transition-colors"
        >
          Eve
          <span className="font-sans text-[10px] font-bold text-rose tracking-[0.3em] uppercase align-middle ml-1.5">
            AI
          </span>
        </Link>

        <h1 className="font-sans text-[20px] sm:text-[26px] font-extrabold tracking-[0.02em] text-charcoal mt-12 mb-3 leading-[1.15]">
          Avant de commencer
        </h1>
        <p className="font-script text-[44px] sm:text-[60px] text-rose mb-14 leading-[0.9]">
          dis-moi tout
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => choose("couple")}
            className="group bg-warm-white border-[1.5px] border-rose/20 rounded-[22px] p-7 sm:p-8 text-left hover:border-rose hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(200,114,90,0.12)] transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-[10px] font-bold tracking-[0.22em] text-rose mb-2">
                  Option 01
                </p>
                <p className="text-[13px] sm:text-[14px] font-bold tracking-[0.12em] text-charcoal leading-[1.4]">
                  {couplePhrase}
                </p>
              </div>
              <span className="text-rose text-[28px] group-hover:translate-x-1 transition-transform shrink-0">
                →
              </span>
            </div>
          </button>

          <button
            onClick={() => choose("single")}
            className="group bg-warm-white border-[1.5px] border-rose/20 rounded-[22px] p-7 sm:p-8 text-left hover:border-rose hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(200,114,90,0.12)] transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-[10px] font-bold tracking-[0.22em] text-rose mb-2">
                  Option 02
                </p>
                <p className="text-[13px] sm:text-[14px] font-bold tracking-[0.12em] text-charcoal leading-[1.4]">
                  {singlePhrase}
                </p>
              </div>
              <span className="text-rose text-[28px] group-hover:translate-x-1 transition-transform shrink-0">
                →
              </span>
            </div>
          </button>
        </div>

        <p className="mt-12 text-[9px] tracking-[0.22em] text-muted">
          On adapte les idées selon ta situation
        </p>
      </div>
    </main>
  );
}
