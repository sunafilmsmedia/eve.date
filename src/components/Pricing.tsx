import { SectionHeader, Script } from "./SectionHeader";

const FREE_FEATURES = [
  { text: "Accès aux idées de dates", locked: false },
  { text: "Catégories curées", locked: false },
  { text: "Ratings & avis communauté", locked: false },
  { text: "Proposer des idées", locked: false },
  { text: "Adresses spécifiques", locked: true },
  { text: "Budget & conseils", locked: true },
  { text: "Réservation", locked: true },
  { text: "Transport recommandé", locked: true },
];

const PRO_FEATURES = [
  "Tout le plan gratuit",
  "Adresses & lieux spécifiques",
  "Budget exact & conseils",
  "Réservation intégrée",
  "Transport recommandé",
  "Accès prioritaire",
  "Support 7/7",
];

export function Pricing() {
  return (
    <section id="pricing" className="px-6 py-[120px]">
      <SectionHeader
        label="Tarifs"
        title={
          <>
            Commence <Script className="text-rose text-[48px] sm:text-[64px] md:text-[80px] inline-block leading-[0.9] my-1">gratuitement</Script>
          </>
        }
        desc="Accès libre aux idées, détails exclusifs avec Eve Pro."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 max-w-[800px] mx-auto">
        {/* Free */}
        <div className="fade-in bg-warm-white border-[1.5px] border-rose/15 rounded-[24px] p-12 relative hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(200,114,90,0.15)] transition-all">
          <div className="font-script text-[36px] text-rose mb-1.5 leading-none">
            Gratuit
          </div>
          <div className="text-[64px] font-extrabold tracking-[0.01em] text-charcoal leading-none mb-1.5">
            $0
          </div>
          <div className="text-[10px] font-semibold tracking-[0.18em] text-muted mb-8">
            Pour toujours
          </div>
          <ul className="list-none mb-9">
            {FREE_FEATURES.map((f) => (
              <li
                key={f.text}
                className={`flex items-start gap-3 text-[10px] font-medium tracking-[0.14em] py-2.5 border-b border-rose/8 leading-[1.6] ${
                  f.locked ? "opacity-40 line-through text-muted" : "text-muted"
                }`}
              >
                <span className={`font-bold flex-shrink-0 mt-px ${f.locked ? "text-muted" : "text-rose"}`}>
                  {f.locked ? "✗" : "✓"}
                </span>
                {f.text}
              </li>
            ))}
          </ul>
          <button className="w-full bg-transparent border-[1.5px] border-charcoal text-charcoal py-4 rounded-full text-[11px] font-bold tracking-[0.22em] hover:bg-charcoal hover:text-cream transition-colors cursor-pointer">
            Commencer
          </button>
        </div>

        {/* Pro */}
        <div className="fade-in bg-charcoal border-[1.5px] border-rose rounded-[24px] p-12 relative hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(200,114,90,0.15)] transition-all">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-rose text-white text-[9px] font-extrabold tracking-[0.22em] px-[18px] py-1.5 rounded-full whitespace-nowrap">
            Plus populaire
          </div>
          <div className="font-script text-[36px] text-gold mb-1.5 leading-none">
            Eve Pro
          </div>
          <div className="text-[64px] font-extrabold tracking-[0.01em] text-cream leading-none mb-1.5">
            $9
          </div>
          <div className="text-[10px] font-semibold tracking-[0.18em] text-cream/50 mb-8">
            / mois · Annulable
          </div>
          <ul className="list-none mb-9">
            {PRO_FEATURES.map((f) => (
              <li
                key={f}
                className="flex items-start gap-3 text-[10px] font-medium tracking-[0.14em] py-2.5 border-b border-white/6 leading-[1.6] text-cream/75"
              >
                <span className="text-gold font-bold flex-shrink-0 mt-px">✓</span>
                {f}
              </li>
            ))}
          </ul>
          <button className="w-full bg-rose border-none text-white py-4 rounded-full text-[11px] font-bold tracking-[0.22em] hover:bg-deep-rose transition-colors cursor-pointer">
            Essayer Eve Pro
          </button>
        </div>
      </div>
    </section>
  );
}
