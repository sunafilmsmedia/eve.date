import { SectionHeader, Script } from "./SectionHeader";

const FREE_FEATURES = [
  { text: "Idées de sorties personnalisées", locked: false },
  { text: "Recommandations selon ton budget", locked: false },
  { text: "Catégories curées par ambiance", locked: false },
  { text: "Suggestions pour couple, casual dating et amis", locked: false },
  { text: "Chat Eve avec limite raisonnable", locked: false },
  { text: "Quelques favoris pour garder tes idées", locked: false },
  { text: "Plans complets étape par étape", locked: true },
  { text: "Adresses et conseils pratiques", locked: true },
  { text: "Réductions partenaires", locked: true },
  { text: "Annulation sans frais", locked: true },
  { text: "Expériences premium", locked: true },
  { text: "Récompense fidélité", locked: true },
];

const EDEN_FEATURES = [
  "Tout le plan gratuit",
  "Plans complets prêts à vivre",
  "Adresses exactes, horaires, transport, conseils",
  "Tarifs réduits chez certains partenaires",
  "Zéro frais d'annulation sur sorties admissibles",
  "Accès aux expériences premium",
  "Accès anticipé aux nouveautés",
  "Support prioritaire",
  "Récompense fidélité de 100 $ à la 10ème date",
];

export function Pricing() {
  return (
    <section id="pricing" className="px-6 py-[120px]">
      <SectionHeader
        label="Tarifs"
        title={
          <>
            Découvre{" "}
            <Script className="text-rose text-[48px] sm:text-[64px] md:text-[80px] inline-block leading-[0.9] my-1">
              Édén
            </Script>
          </>
        }
        desc="Gratuit t'inspire. Édén te dit exactement quoi faire."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 max-w-[820px] mx-auto">
        {/* Gratuit */}
        <div className="fade-in bg-warm-white border-[1.5px] border-rose/15 rounded-[24px] p-10 sm:p-12 relative hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(200,114,90,0.15)] transition-all">
          <div className="font-script text-[36px] text-rose mb-1.5 leading-none">
            Gratuit
          </div>
          <div className="text-[64px] font-extrabold tracking-[0.01em] text-charcoal leading-none mb-1.5">
            $0
          </div>
          <div className="text-[10px] font-semibold tracking-[0.18em] text-muted mb-8">
            Pour trouver l&apos;inspiration
          </div>
          <ul className="list-none mb-9">
            {FREE_FEATURES.map((f) => (
              <li
                key={f.text}
                className={`flex items-start gap-3 text-[10px] font-medium tracking-[0.14em] py-2 border-b border-rose/8 leading-[1.6] ${
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
            Commencer gratuitement
          </button>
        </div>

        {/* Édén */}
        <div className="fade-in bg-charcoal border-[1.5px] border-rose rounded-[24px] p-10 sm:p-12 relative hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(200,114,90,0.15)] transition-all">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-rose text-white text-[9px] font-extrabold tracking-[0.22em] px-[18px] py-1.5 rounded-full whitespace-nowrap">
            Plus populaire
          </div>
          <div className="font-script text-[56px] text-gold leading-none mb-1.5">
            Édén
          </div>
          <div className="flex items-baseline gap-2 mb-1.5">
            <span className="text-[64px] font-extrabold tracking-[0.01em] text-cream leading-none">
              $9
            </span>
            <span className="text-[14px] font-semibold tracking-[0.1em] text-cream/60">
              /mois
            </span>
          </div>
          <div className="text-[10px] font-semibold tracking-[0.18em] text-gold mb-1">
            ou $69/an · économise 39 $
          </div>
          <div className="text-[10px] font-semibold tracking-[0.18em] text-cream/50 mb-7">
            Annulable en tout temps
          </div>
          <p className="text-[10px] tracking-[0.14em] text-cream/75 leading-[1.7] mb-7 normal-case">
            Pour ceux qui veulent arrêter de chercher quoi faire et planifier des sorties prêtes à vivre.
          </p>
          <ul className="list-none mb-9">
            {EDEN_FEATURES.map((f) => (
              <li
                key={f}
                className="flex items-start gap-3 text-[10px] font-medium tracking-[0.14em] py-2 border-b border-white/6 leading-[1.6] text-cream/85"
              >
                <span className="text-gold font-bold flex-shrink-0 mt-px">✓</span>
                {f}
              </li>
            ))}
          </ul>
          <button className="w-full bg-rose border-none text-white py-4 rounded-full text-[11px] font-bold tracking-[0.22em] hover:bg-deep-rose transition-colors cursor-pointer">
            Rejoindre Édén
          </button>
        </div>
      </div>

      <p className="text-center text-[10px] tracking-[0.18em] text-muted mt-10 max-w-xl mx-auto leading-[1.8]">
        Toutes les réservations passent par Eve. Le paiement se fait directement au commerce. Édén = tarif préférentiel + plans complets + récompense fidélité.
      </p>
    </section>
  );
}
