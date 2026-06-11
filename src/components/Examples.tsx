import { SectionHeader, Script } from "./SectionHeader";

type ExamplePlan = {
  tag: string;
  city: string;
  price: string;
  title: string;
  steps: string[];
  effort: number;
  variant: "rose" | "gold" | "dark" | "blush";
};

const PLANS: ExamplePlan[] = [
  {
    tag: "Première date · pas awkward",
    city: "Montréal",
    price: "45 $/pers.",
    title: "Café & marche au Mont-Royal",
    steps: [
      "Café spécialité dans le Mile End",
      "Marche jusqu'au belvédère du Mont-Royal",
      "Dessert léger pour finir",
    ],
    effort: 8,
    variant: "rose",
  },
  {
    tag: "Date night · cozy",
    city: "Laval",
    price: "90 $/couple",
    title: "Souper simple & spot tranquille",
    steps: [
      "Souper dans un petit resto cozy",
      "Activité calme à deux",
      "Spot tranquille pour conclure la soirée",
    ],
    effort: 9,
    variant: "gold",
  },
  {
    tag: "Double date · fun",
    city: "Brossard",
    price: "60 $/pers.",
    title: "Mini-golf, resto & bar à jeux",
    steps: [
      "Mini-golf au coucher du soleil",
      "Resto casual à partager",
      "Bar à jeux pour finir la soirée",
    ],
    effort: 7,
    variant: "blush",
  },
  {
    tag: "Sortie entre amis",
    city: "Montréal",
    price: "35 $/pers.",
    title: "Marché, food spots & activité",
    steps: [
      "Tour du Marché Jean-Talon",
      "Plusieurs food spots à partager",
      "Activité de groupe en plein air",
    ],
    effort: 6,
    variant: "dark",
  },
  {
    tag: "Dernière minute",
    city: "Montréal",
    price: "50 $/pers.",
    title: "Cocktails, marche & dessert",
    steps: [
      "Cocktails simples dans le Vieux-Mtl",
      "Marche au Vieux-Port",
      "Dessert pour terminer",
    ],
    effort: 8,
    variant: "rose",
  },
];

const VARIANTS: Record<ExamplePlan["variant"], string> = {
  rose: "bg-gradient-to-br from-rose to-deep-rose text-white",
  gold: "bg-gradient-to-br from-gold to-[#a07840] text-white",
  blush: "bg-gradient-to-br from-blush to-[#e0a08c] text-charcoal",
  dark: "bg-gradient-to-br from-[#3a2e28] to-charcoal text-cream",
};

const META_BG: Record<ExamplePlan["variant"], string> = {
  rose: "bg-white/20 text-white",
  gold: "bg-white/20 text-white",
  blush: "bg-charcoal/15 text-charcoal",
  dark: "bg-white/15 text-cream",
};

export function Examples() {
  return (
    <section className="px-6 py-[120px] bg-warm-white">
      <SectionHeader
        label="Exemples concrets"
        title={
          <>
            Des plans{" "}
            <Script className="text-rose text-[48px] sm:text-[64px] md:text-[80px] inline-block leading-[0.9] my-1">
              prêts à vivre
            </Script>
          </>
        }
        desc="Voici ce que Eve génère vraiment. Pas juste des idées vagues — des plans clairs, chiffrés et adaptés."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-[1100px] mx-auto">
        {PLANS.map((plan) => (
          <div
            key={plan.title}
            className={`fade-in rounded-[22px] p-7 ${VARIANTS[plan.variant]} hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(200,114,90,0.18)] transition-all flex flex-col`}
          >
            <span
              className={`inline-block ${META_BG[plan.variant]} text-[9px] font-bold tracking-[0.18em] uppercase px-3 py-1 rounded-full mb-4 self-start`}
            >
              {plan.tag}
            </span>
            <div className="flex items-baseline justify-between gap-3 mb-3">
              <span className="text-[10px] font-bold tracking-[0.18em] opacity-75">
                {plan.city}
              </span>
              <span className="text-[12px] font-extrabold tracking-[0.04em]">
                {plan.price}
              </span>
            </div>
            <h3 className="font-script text-[34px] leading-[0.95] mb-4">{plan.title}</h3>
            <ul className="list-none mb-5 flex-1">
              {plan.steps.map((s) => (
                <li
                  key={s}
                  className="flex items-start gap-2.5 text-[10px] tracking-[0.1em] py-1.5 opacity-90 normal-case leading-[1.6]"
                >
                  <span className="opacity-70 mt-0.5">→</span>
                  {s}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-3 pt-4 border-t border-current/20">
              <p className="text-[9px] font-bold tracking-[0.18em] uppercase opacity-80">
                Effort perçu
              </p>
              <p className="text-[14px] font-extrabold">{plan.effort}/10</p>
              <p className="font-script text-[18px] ml-auto opacity-85">
                plan prêt
              </p>
            </div>
          </div>
        ))}
      </div>
      <p className="text-center text-[10px] tracking-[0.16em] text-muted mt-12 leading-[1.8] max-w-md mx-auto normal-case">
        L&apos;effort ne se mesure pas au prix. Il se mesure à l&apos;attention.
      </p>
    </section>
  );
}
