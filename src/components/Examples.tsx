import { SectionHeader, Script } from "./SectionHeader";

type Example = {
  tag: string;
  title: string;
  rating: string;
  ratingCount: string;
  steps: string[];
  duration: string;
  price: string;
  locked: string;
  variant: "rose" | "gold" | "dark";
};

const EXAMPLES: Example[] = [
  {
    tag: "1ère date · Montréal",
    title: "Vignoble & Spa",
    rating: "★★★★★",
    ratingCount: "4.8 · 312 avis",
    steps: [
      "Dégustation de vins en après-midi",
      "Balade dans les vignes",
      "Soirée spa & soupe chaude",
    ],
    duration: "🕐 5–6h",
    price: "💰 ~$120/pers.",
    locked: "🔒 Adresses exactes · Pro",
    variant: "rose",
  },
  {
    tag: "Anniversaire · Laval",
    title: "Coucher de soleil",
    rating: "★★★★★",
    ratingCount: "4.9 · 198 avis",
    steps: [
      "Bouquet surprise livré",
      "Point de vue panoramique",
      "Dîner gastronomique réservé",
    ],
    duration: "🕐 4–5h",
    price: "💰 ~$180/pers.",
    locked: "🔒 Réserver · Pro",
    variant: "gold",
  },
  {
    tag: "Aventure · Magog",
    title: "Lac & Chalet",
    rating: "★★★★☆",
    ratingCount: "4.6 · 87 avis",
    steps: [
      "Kayak sur le Memphrémagog",
      "Pique-nique au bord de l'eau",
      "Feu de camp & étoiles",
    ],
    duration: "🕐 Journée",
    price: "💰 ~$95/pers.",
    locked: "🔒 Transport · Pro",
    variant: "dark",
  },
];

const HEADER_VARIANTS = {
  rose: "bg-gradient-to-br from-rose to-deep-rose",
  gold: "bg-gradient-to-br from-gold to-[#a07840]",
  dark: "bg-gradient-to-br from-[#3a2e28] to-charcoal",
};

export function Examples() {
  return (
    <section className="px-6 py-[120px] bg-warm-white">
      <SectionHeader
        label="Exemples de dates"
        title={
          <>
            Ce qu&apos;Eve te <Script className="text-rose text-[48px] sm:text-[64px] md:text-[80px] inline-block leading-[0.9] my-1">propose</Script>
          </>
        }
        desc="Un aperçu en version gratuite et Pro."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1020px] mx-auto">
        {EXAMPLES.map((ex) => (
          <div
            key={ex.title}
            className="fade-in rounded-[22px] overflow-hidden border border-rose/15 bg-cream hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(200,114,90,0.15)] transition-all"
          >
            <div className={`${HEADER_VARIANTS[ex.variant]} px-7 pt-[30px] pb-6`}>
              <div className="inline-block bg-white/20 text-white text-[9px] font-bold tracking-[0.2em] px-3 py-1 rounded-full mb-4">
                {ex.tag}
              </div>
              <div className="font-script text-[36px] text-white mb-3 leading-none">
                {ex.title}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#ffd700] text-[13px] tracking-[0.05em]">
                  {ex.rating}
                </span>
                <span className="text-[9px] font-semibold tracking-[0.18em] text-white/75">
                  {ex.ratingCount}
                </span>
              </div>
            </div>
            <div className="px-7 py-[26px]">
              <ul className="list-none mb-[22px]">
                {ex.steps.map((step) => (
                  <li
                    key={step}
                    className="flex items-center gap-3 text-[10px] font-medium tracking-[0.16em] text-muted py-1.5 leading-[1.6]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-rose flex-shrink-0" />
                    {step}
                  </li>
                ))}
              </ul>
              <div className="flex gap-2.5 flex-wrap">
                <span className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.16em] text-muted bg-rose/8 px-3 py-1.5 rounded-full">
                  {ex.duration}
                </span>
                <span className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.16em] text-muted bg-rose/8 px-3 py-1.5 rounded-full">
                  {ex.price}
                </span>
              </div>
              <div className="bg-charcoal/6 border-[1.5px] border-dashed border-rose/30 rounded-[10px] px-4 py-3 flex items-center gap-2 text-[10px] font-semibold tracking-[0.18em] text-rose mt-[18px] cursor-pointer">
                {ex.locked}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
