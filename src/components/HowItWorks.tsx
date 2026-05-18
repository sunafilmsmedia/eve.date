import { SectionHeader, Script } from "./SectionHeader";

const STEPS = [
  {
    icon: "✨",
    number: "Étape un",
    title: "Eve te propose",
    desc: "Choisis ta catégorie et Eve génère une date complète adaptée à l'occasion.",
  },
  {
    icon: "🗓️",
    number: "Étape deux",
    title: "Tu vis la date",
    desc: "En version Pro, accède aux adresses exactes, budgets et réserve directement.",
  },
  {
    icon: "⭐",
    number: "Étape trois",
    title: "Tu notes",
    desc: "Après ta sortie, donne ta note. Tes avis aident la communauté.",
  },
  {
    icon: "🔥",
    number: "Étape quatre",
    title: "Les tops remontent",
    desc: "Les meilleures dates s'accumulent dans la liste des plus populaires.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="px-6 py-[120px]">
      <SectionHeader
        label="Comment ça marche"
        title={
          <>
            Simple. <Script className="text-rose text-[48px] sm:text-[64px] md:text-[80px] inline-block leading-[0.9] my-1">Mémorable.</Script> Parfait.
          </>
        }
        desc="Eve s'occupe de tout — toi, tu vis le moment."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 max-w-[1000px] mx-auto">
        {STEPS.map((step) => (
          <div
            key={step.number}
            className="fade-in text-center px-7 py-11 bg-warm-white rounded-[20px] border border-rose/12 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(200,114,90,0.12)] transition-all"
          >
            <span className="block text-4xl mb-5">{step.icon}</span>
            <div className="font-script text-[30px] text-rose mb-2 leading-none">
              {step.number}
            </div>
            <h3 className="text-[13px] font-bold tracking-[0.18em] text-charcoal mb-3.5">
              {step.title}
            </h3>
            <p className="text-[11px] tracking-[0.14em] text-muted leading-[1.8]">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
