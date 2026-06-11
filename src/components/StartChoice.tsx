"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { OUTING_TYPES, saveOutingType, type OutingType } from "@/lib/profile";

export function StartChoice() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Auth gate — account is now mandatory
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      setReady(true);
      return;
    }
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.replace("/login?next=/start");
        return;
      }
      setReady(true);
    });
  }, [router]);

  const choose = (type: OutingType) => {
    saveOutingType(type);
    router.push("/avatar");
  };

  if (!ready) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="font-script text-rose text-[28px]">un instant</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-[820px] text-center">
        <Link
          href="/"
          className="inline-block font-script text-[42px] text-charcoal leading-none hover:text-rose transition-colors"
        >
          Eve
          <span className="font-sans text-[10px] font-bold text-rose tracking-[0.3em] uppercase align-middle ml-1.5">
            AI
          </span>
        </Link>

        <h1 className="font-sans text-[20px] sm:text-[28px] font-extrabold tracking-[0.02em] text-charcoal mt-12 mb-3 leading-[1.2] max-w-xl mx-auto">
          Qu&apos;est-ce que tu veux{" "}
          <span className="font-script text-rose text-[40px] sm:text-[56px] inline-block leading-[0.9] normal-case tracking-normal">
            organiser
          </span>{" "}
          aujourd&apos;hui ?
        </h1>
        <p className="text-[11px] tracking-[0.16em] text-muted mb-12 leading-[1.8] max-w-lg mx-auto">
          Choisis le type de sortie que tu veux créer. Eve adaptera les questions et les recommandations selon ton contexte.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[680px] mx-auto">
          {OUTING_TYPES.map((opt) => (
            <button
              key={opt.value}
              onClick={() => choose(opt.value)}
              className="group bg-warm-white border-[1.5px] border-rose/20 rounded-[22px] p-7 text-left hover:border-rose hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(200,114,90,0.15)] transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <span className="text-[32px] leading-none">{opt.emoji}</span>
                <span className="text-rose text-[20px] group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
              <p className="text-[13px] font-bold tracking-[0.14em] text-charcoal mb-3">
                {opt.label}
              </p>
              <p className="text-[10px] tracking-[0.12em] text-muted leading-[1.7] normal-case">
                {opt.description}
              </p>
            </button>
          ))}
        </div>

        <p className="mt-12 text-[9px] tracking-[0.22em] text-muted">
          Tu peux changer de type ou ajouter d&apos;autres profils plus tard
        </p>
      </div>
    </main>
  );
}
