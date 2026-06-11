"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { loadOutingType, type OutingType } from "@/lib/profile";
import { CoupleForm } from "./CoupleForm";
import { CasualForm } from "./CasualForm";
import { DoubleForm } from "./DoubleForm";
import { FriendsForm } from "./FriendsForm";

const TYPE_LABELS: Record<OutingType, string> = {
  couple: "Couple",
  casual_dating: "Casual dating",
  double_date: "Double date",
  friends: "Sorties entre amis",
};

export function SetupDispatcher() {
  const router = useRouter();
  const [type, setType] = useState<OutingType | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Auth gate
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      setReady(true);
      // Check outing type
      const t = loadOutingType();
      if (!t) {
        router.replace("/start");
        return;
      }
      setType(t);
      return;
    }
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.replace("/login?next=/avatar");
        return;
      }
      const t = loadOutingType();
      if (!t) {
        router.replace("/start");
        return;
      }
      setType(t);
      setReady(true);
    });
  }, [router]);

  if (!ready || !type) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="font-script text-rose text-[28px]">un instant</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-20">
      <div className="max-w-[680px] mx-auto">
        <Link
          href="/"
          className="inline-block font-script text-[34px] text-charcoal leading-none hover:text-rose transition-colors"
        >
          Eve
          <span className="font-sans text-[10px] font-bold text-rose tracking-[0.3em] uppercase align-middle ml-1.5">
            AI
          </span>
        </Link>
        <p className="text-[10px] tracking-[0.22em] text-muted mt-3 mb-10">
          Type de sortie · {TYPE_LABELS[type]}
        </p>

        {type === "couple" && <CoupleForm />}
        {type === "casual_dating" && <CasualForm />}
        {type === "double_date" && <DoubleForm />}
        {type === "friends" && <FriendsForm />}

        <p className="text-center mt-6 text-[9px] tracking-[0.2em] text-muted">
          <Link href="/start" className="hover:text-rose transition-colors">
            ← Changer le type de sortie
          </Link>
        </p>
      </div>
    </main>
  );
}
