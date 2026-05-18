import Link from "next/link";
import { Script } from "./Script";

type ComingSoonProps = {
  title: string;
  emoji: string;
  description: string;
  tasks: string[];
};

export function ComingSoon({ title, emoji, description, tasks }: ComingSoonProps) {
  return (
    <>
      <h1 className="font-sans text-[28px] sm:text-[36px] font-extrabold tracking-[0.02em] text-charcoal mb-3 leading-[1.15]">
        {title}
      </h1>
      <p className="text-[11px] tracking-[0.18em] text-muted mb-12 leading-[1.7] max-w-xl">
        {description}
      </p>

      <div className="bg-warm-white border border-rose/15 rounded-[24px] p-12 text-center">
        <div className="text-[64px] mb-4">{emoji}</div>
        <p className="font-script text-[42px] text-rose mb-3 leading-none">
          Bientôt
        </p>
        <p className="text-[10px] tracking-[0.18em] text-muted mb-8 leading-[1.7]">
          Cette section est en cours de construction.
        </p>

        <h2 className="text-[10px] font-bold tracking-[0.32em] text-rose mb-4">
          À implémenter
        </h2>
        <ul className="inline-flex flex-col gap-2 text-left text-[10px] tracking-[0.12em] text-muted leading-[1.7]">
          {tasks.map((t) => (
            <li key={t} className="flex items-start gap-2">
              <span className="text-rose mt-0.5">○</span>
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <Link
            href="/dashboard"
            className="inline-block text-[10px] font-bold tracking-[0.22em] text-rose hover:text-deep-rose transition-colors"
          >
            ← <Script className="text-[20px] align-middle ml-1">Retour</Script>
          </Link>
        </div>
      </div>
    </>
  );
}
