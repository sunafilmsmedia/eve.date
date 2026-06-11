import { SectionHeader, Script } from "./SectionHeader";

type OrganizeCard = {
  emoji: string;
  title: string;
  description: string;
  variant: "rose" | "gold" | "dark" | "blush";
};

const CARDS: OrganizeCard[] = [
  {
    emoji: "💕",
    title: "Couple",
    description:
      "Des dates romantiques, cozy, surprises ou spéciales pour entretenir la relation.",
    variant: "rose",
  },
  {
    emoji: "💬",
    title: "Casual dating",
    description:
      "Des idées simples, fun et bien dosées pour apprendre à connaître quelqu'un sans pression.",
    variant: "gold",
  },
  {
    emoji: "👯",
    title: "Double dates",
    description:
      "Des activités à quatre qui évitent les malaises et créent une bonne ambiance.",
    variant: "blush",
  },
  {
    emoji: "🍻",
    title: "Sorties entre amis",
    description:
      "Des plans de groupe adaptés au budget, à l'énergie et aux goûts de tout le monde.",
    variant: "dark",
  },
];

const VARIANTS: Record<OrganizeCard["variant"], string> = {
  rose: "bg-gradient-to-br from-rose to-deep-rose text-white",
  gold: "bg-gradient-to-br from-gold to-[#a07840] text-white",
  blush: "bg-gradient-to-br from-blush to-[#e0a08c] text-charcoal",
  dark: "bg-gradient-to-br from-[#3a2e28] to-charcoal text-cream",
};

export function Examples() {
  return (
    <section className="px-6 py-[120px] bg-warm-white">
      <SectionHeader
        label="Ce que Eve peut organiser"
        title={
          <>
            4 types de{" "}
            <Script className="text-rose text-[48px] sm:text-[64px] md:text-[80px] inline-block leading-[0.9] my-1">
              sorties
            </Script>
          </>
        }
        desc="Chaque contexte demande une approche différente. Eve s'adapte."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-[1100px] mx-auto">
        {CARDS.map((card) => (
          <div
            key={card.title}
            className={`fade-in rounded-[22px] p-7 ${VARIANTS[card.variant]} hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(200,114,90,0.18)] transition-all`}
          >
            <span className="block text-[40px] leading-none mb-5">{card.emoji}</span>
            <h3 className="font-script text-[36px] leading-none mb-3">{card.title}</h3>
            <p className="text-[11px] tracking-[0.12em] leading-[1.7] opacity-90 normal-case">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
