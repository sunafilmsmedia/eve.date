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
      <div className="relative max-w-[820px]">
        <div className="inline-flex items-center gap-2.5 bg-light-gold text-deep-rose text-[11px] font-bold tracking-[0.2em] px-[22px] py-[9px] rounded-full mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-rose animate-pulse-dot" />
          Bientôt disponible · Eve AI
        </div>

        <h1 className="font-sans text-[40px] sm:text-[56px] md:text-[78px] font-extrabold leading-[1.05] tracking-[0.02em] text-charcoal mb-3">
          Tes prochaines sorties
          <RotatingScript className="block text-[64px] sm:text-[96px] md:text-[132px] text-rose leading-[0.9] my-1.5" />
          Imaginées par Eve AI
        </h1>

        <p className="font-script text-[28px] sm:text-[36px] md:text-[42px] text-muted mb-8 leading-[1.1]">
          L&apos;art de sortir, réinventé.
        </p>

        <p className="text-[12px] tracking-[0.18em] text-muted leading-[1.9] max-w-[580px] mx-auto mb-14">
          Eve te propose des idées de dates inoubliables — premières rencontres, anniversaires, soirées spéciales. Testées, notées, approuvées par ta communauté.
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <a
            href="#waitlist"
            className="bg-rose text-white px-[38px] py-[18px] rounded-full text-[11px] font-bold tracking-[0.22em] hover:bg-deep-rose hover:-translate-y-0.5 transition-all"
          >
            Rejoindre la liste
          </a>
          <a
            href="#how-it-works"
            className="bg-transparent text-charcoal border-[1.5px] border-charcoal/20 px-[38px] py-[18px] rounded-full text-[11px] font-semibold tracking-[0.22em] hover:border-rose hover:text-rose transition-colors"
          >
            Comment ça marche
          </a>
        </div>

        <div className="mt-[72px] flex items-center justify-center gap-2.5 flex-wrap">
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
