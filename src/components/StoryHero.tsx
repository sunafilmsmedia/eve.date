import Link from "next/link";
import { Script } from "./Script";

export function StoryHero() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-cream">
      {/* Ambient rose glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(200, 114, 90, 0.12) 0%, transparent 55%), radial-gradient(ellipse at 20% 90%, rgba(201, 169, 110, 0.10) 0%, transparent 50%)",
        }}
      />

      {/* Minimal top bar */}
      <nav className="relative flex items-center justify-between px-6 md:px-12 py-6">
        <span className="font-script text-[32px] md:text-[38px] text-charcoal leading-none">
          Eve
          <span className="font-sans text-[11px] font-bold text-rose tracking-[0.25em] uppercase align-middle ml-1.5">
            AI
          </span>
        </span>
        <div className="flex items-center gap-5">
          <Link
            href="/informations"
            className="text-[10px] font-bold tracking-[0.22em] text-muted hover:text-rose transition-colors"
          >
            Informations
          </Link>
          <Link
            href="/login"
            className="text-[10px] font-bold tracking-[0.22em] text-muted hover:text-rose transition-colors"
          >
            Connexion
          </Link>
        </div>
      </nav>

      {/* Story hero */}
      <section className="relative px-6 py-[80px] md:py-[110px]">
        <div className="max-w-[780px] mx-auto text-center">
          <p className="text-[10px] font-bold tracking-[0.32em] text-rose mb-8">
            Le moment qu&apos;on connaît tous
          </p>

          <p className="text-[15px] sm:text-[17px] font-medium tracking-[0.06em] text-charcoal mb-4 leading-[1.7] normal-case">
            Vendredi 17 h. Ta moitié te demande :
          </p>
          <p className="font-script text-[44px] sm:text-[64px] md:text-[80px] text-rose mb-10 leading-[0.95]">
            « t&apos;as réservé ? »
          </p>

          <p className="text-[13px] sm:text-[15px] tracking-[0.08em] text-charcoal/85 mb-3 leading-[1.85] normal-case max-w-[560px] mx-auto">
            Tu ouvres TikTok. Puis Google. Puis Maps. Puis ChatGPT.
          </p>
          <p className="text-[13px] sm:text-[15px] tracking-[0.08em] text-muted mb-14 leading-[1.85] normal-case max-w-[560px] mx-auto">
            45 minutes plus tard, rien n&apos;est décidé.
          </p>

          <p className="text-[11px] font-bold tracking-[0.32em] text-rose mb-3">
            Eve règle ça.
          </p>
          <h1 className="font-sans text-[28px] sm:text-[36px] md:text-[44px] font-extrabold tracking-[0.02em] text-charcoal mb-8 leading-[1.15]">
            En moins de{" "}
            <Script className="text-rose text-[54px] sm:text-[72px] md:text-[92px] inline-block leading-[0.85]">
              2 minutes
            </Script>
            ,<br />
            Eve te propose un plan.
          </h1>
          <p className="text-[12px] sm:text-[13px] tracking-[0.1em] text-muted mb-12 leading-[1.9] normal-case max-w-[540px] mx-auto">
            Adapté à ton budget, ta ville, la saison et les personnes avec qui tu sors.
          </p>

          <Link
            href="/dates"
            className="inline-block bg-rose text-white px-10 py-5 rounded-full text-[12px] font-bold tracking-[0.24em] hover:bg-deep-rose hover:-translate-y-0.5 transition-all shadow-[0_20px_40px_-15px_rgba(200,114,90,0.5)]"
          >
            Trouver un plan pour ce soir →
          </Link>

          <p className="text-[9px] tracking-[0.24em] text-muted mt-6 leading-[1.7]">
            1 question gratuite · Aucune carte requise
          </p>
        </div>
      </section>

      {/* Discreet secondary link */}
      <div className="relative text-center pb-14">
        <Link
          href="/informations"
          className="text-[10px] font-bold tracking-[0.22em] text-muted hover:text-rose transition-colors underline underline-offset-4 decoration-rose/30 hover:decoration-rose"
        >
          Voir toutes les infos sur Eve →
        </Link>
      </div>
    </main>
  );
}
