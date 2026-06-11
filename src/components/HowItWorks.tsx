import { SectionHeader, Script } from "./SectionHeader";

const STEPS = [
  {
    icon: "🎯",
    number: "Étape un",
    title: "Choisis ton type de sortie",
    desc: "Couple, casual dating, double date ou amis.",
  },
  {
    icon: "💬",
    number: "Étape deux",
    title: "Réponds à quelques questions",
    desc: "Eve comprend le contexte, les goûts, le budget et l'ambiance recherchée.",
  },
  {
    icon: "✨",
    number: "Étape trois",
    title: "Reçois un plan personnalisé",
    desc: "Eve propose une idée claire avec les détails importants.",
  },
  {
    icon: "💾",
    number: "Étape quatre",
    title: "Sauvegarde tes préférences",
    desc: "Ton compte permet à Eve de mieux te recommander des sorties avec le temps.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="px-6 py-[120px]">
      <SectionHeader
        label="Comment ça marche"
        title={
          <>
            Simple. <Script className="text-rose text-[48px] sm:text-[64px] md:text-[80px] inline-block leading-[0.9] my-1">Adapté.</Script> À toi.
          </>
        }
        desc="Eve apprend ton contexte et propose des sorties qui matchent vraiment."
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
