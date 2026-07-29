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
            "radial-gradient(ellipse at 50% 25%, rgba(200, 114, 90, 0.14) 0%, transparent 55%), radial-gradient(ellipse at 20% 90%, rgba(201, 169, 110, 0.10) 0%, transparent 50%)",
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

      {/* Promise + CTA — top hero */}
      <section className="relative px-6 pt-[70px] pb-[60px] md:pt-[100px] md:pb-[80px]">
        <div className="max-w-[820px] mx-auto text-center">
          <p className="text-[10px] font-bold tracking-[0.32em] text-rose mb-6">
            La promesse
          </p>

          <h1 className="font-sans text-[30px] sm:text-[42px] md:text-[52px] font-extrabold tracking-[0.01em] text-charcoal mb-3 leading-[1.15]">
            En moins de{" "}
            <Script className="text-rose text-[58px] sm:text-[78px] md:text-[100px] inline-block leading-[0.85]">
              2 minutes
            </Script>
            ,
          </h1>
          <h2 className="font-sans text-[30px] sm:text-[42px] md:text-[52px] font-extrabold tracking-[0.01em] text-charcoal mb-8 leading-[1.15]">
            <Script className="text-rose text-[58px] sm:text-[78px] md:text-[100px] inline-block leading-[0.85] mr-2">
              Eve
            </Script>
            te propose un plan.
          </h2>

          <p className="text-[12px] sm:text-[14px] tracking-[0.1em] text-muted mb-10 leading-[1.9] normal-case max-w-[560px] mx-auto">
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

      {/* Divider */}
      <div className="relative max-w-[420px] mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-rose/25 to-transparent" />
      </div>

      {/* The moment — story below */}
      <section className="relative px-6 py-[70px] md:py-[90px]">
        <div className="max-w-[720px] mx-auto text-center">
          <p className="text-[10px] font-bold tracking-[0.32em] text-rose mb-8">
            Le moment qu&apos;on connaît tous
          </p>

          <p className="text-[14px] sm:text-[16px] font-medium tracking-[0.06em] text-charcoal mb-3 leading-[1.7] normal-case">
            Vendredi 17 h. Ta moitié te demande :
          </p>
          <p className="font-script text-[42px] sm:text-[60px] md:text-[74px] text-rose mb-9 leading-[0.95]">
            « t&apos;as réservé ? »
          </p>

          <p className="text-[12px] sm:text-[14px] tracking-[0.08em] text-charcoal/80 mb-2 leading-[1.9] normal-case max-w-[520px] mx-auto">
            Tu ouvres TikTok. Puis Google. Puis Maps. Puis ChatGPT.
          </p>
          <p className="text-[12px] sm:text-[14px] tracking-[0.08em] text-muted mb-8 leading-[1.9] normal-case max-w-[520px] mx-auto">
            45 minutes plus tard, rien n&apos;est décidé.
          </p>

          <p className="font-script text-[36px] sm:text-[48px] text-charcoal leading-[0.9]">
            Eve règle ça.
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
