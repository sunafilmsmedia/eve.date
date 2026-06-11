import { RotatingScript } from "./RotatingScript";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-center px-6 pt-[140px] pb-[100px] overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 0%, rgba(242, 212, 200, 0.45) 0%, transparent 70%),
            radial-gradient(ellipse 50% 40% at 80% 80%, rgba(201, 169, 110, 0.2) 0%, transparent 60%)
          `,
        }}
      />
      <div className="relative max-w-[860px]">
        <div className="inline-flex items-center gap-2.5 bg-light-gold text-deep-rose text-[11px] font-bold tracking-[0.2em] px-[22px] py-[9px] rounded-full mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-rose animate-pulse-dot" />
          Couple · Casual dating · Double date · Amis
        </div>

        <h1 className="font-sans text-[36px] sm:text-[52px] md:text-[68px] font-extrabold leading-[1.08] tracking-[0.01em] text-charcoal mb-3">
          Des sorties
          <RotatingScript className="block text-[56px] sm:text-[80px] md:text-[108px] text-rose leading-[0.9] my-1.5" />
          avec les bonnes personnes
        </h1>

        <p className="font-script text-[24px] sm:text-[34px] md:text-[40px] text-muted mb-8 leading-[1.1]">
          Eve s&apos;adapte à ton contexte.
        </p>

        <p className="text-[12px] tracking-[0.18em] text-muted leading-[1.9] max-w-[640px] mx-auto mb-14 normal-case">
          EveAI t&apos;aide à créer des dates, double dates et sorties entre amis selon la personnalité, le budget, l&apos;occasion et l&apos;ambiance que tu veux créer.
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <a
            href="/login"
            className="bg-rose text-white px-[38px] py-[18px] rounded-full text-[11px] font-bold tracking-[0.22em] hover:bg-deep-rose hover:-translate-y-0.5 transition-all"
          >
            Créer mon compte ou me connecter
          </a>
        </div>

        <div className="mt-[64px] flex items-center justify-center gap-2.5 flex-wrap">
          <span className="text-[10px] font-semibold tracking-[0.22em] text-muted">
            Disponible à
          </span>
          {["Montréal", "Laval", "Brossard", "Magog"].map((city) => (
            <span
              key={city}
              className="bg-rose/10 text-rose text-[10px] font-bold tracking-[0.2em] px-4 py-1.5 rounded-full"
            >
              {city}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
