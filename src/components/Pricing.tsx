import { SectionHeader, Script } from "./SectionHeader";

const FREE_FEATURES = [
  { text: "Idées de dates illimitées", locked: false },
  { text: "Recommandations Eve AI personnalisées", locked: false },
  { text: "Catégories curées + ratings", locked: false },
  { text: "Réservation directe (frais standards)", locked: false },
  { text: "Proposer des idées", locked: false },
  { text: "Annulation sans frais", locked: true },
  { text: "Tarif réduit par réservation", locked: true },
  { text: "Accès anticipé aux nouveautés", locked: true },
];

const POMME_FEATURES = [
  "Tout le plan gratuit",
  "Tarif réduit sur chaque réservation",
  "Zéro frais d'annulation",
  "Accès anticipé aux nouvelles dates",
  "Détails complets : adresses, conseils, transport",
  "Support prioritaire 7/7",
];

function AppleIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 7c-2-3-5-3-7-1-2 2-2 6 0 9 2 3 5 4 7 3 2 1 5 0 7-3 2-3 2-7 0-9-2-2-5-2-7 1z" />
      <path d="M12 7c0-2 1-4 3-4" />
      <path d="M14 4c-.5-.5-1-1-2-1" />
    </svg>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="px-6 py-[120px]">
      <SectionHeader
        label="Tarifs"
        title={
          <>
            Croque la{" "}
            <Script className="text-rose text-[48px] sm:text-[64px] md:text-[80px] inline-block leading-[0.9] my-1">
              pomme
            </Script>
          </>
        }
        desc="Idées gratuites pour tous. Abonnement Pomme pour les avantages premium et le tarif préférentiel."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 max-w-[800px] mx-auto">
        {/* Gratuit */}
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
                <span
                  className={`font-bold flex-shrink-0 mt-px ${
                    f.locked ? "text-muted" : "text-rose"
                  }`}
                >
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

        {/* Pomme */}
        <div className="fade-in bg-charcoal border-[1.5px] border-rose rounded-[24px] p-12 relative hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(200,114,90,0.15)] transition-all">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-rose text-white text-[9px] font-extrabold tracking-[0.22em] px-[18px] py-1.5 rounded-full whitespace-nowrap">
            Plus populaire
          </div>
          <div className="flex items-center gap-3 mb-1.5">
            <AppleIcon className="w-8 h-8 text-gold" />
            <div className="font-script text-[44px] text-gold leading-none">
              Pomme
            </div>
          </div>
          <div className="text-[64px] font-extrabold tracking-[0.01em] text-cream leading-none mb-1.5">
            $9
          </div>
          <div className="text-[10px] font-semibold tracking-[0.18em] text-cream/50 mb-8">
            / mois · Annulable
          </div>
          <ul className="list-none mb-9">
            {POMME_FEATURES.map((f) => (
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
            Croquer la Pomme
          </button>
        </div>
      </div>

      <p className="text-center text-[10px] tracking-[0.18em] text-muted mt-10 max-w-xl mx-auto leading-[1.8]">
        Toutes les réservations passent par Eve. Frais standards pour le plan gratuit, tarif préférentiel pour les membres Pomme.
      </p>
    </section>
  );
}
