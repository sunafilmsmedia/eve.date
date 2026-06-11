import { SectionHeader, Script } from "./SectionHeader";

const STEPS = [
  {
    icon: "💳",
    title: "Abonne-toi à Édén",
    desc: "9 $/mois ou 69 $/an. Annulable en tout temps.",
  },
  {
    icon: "📅",
    title: "Réserve tes sorties via Eve",
    desc: "Couple, casual, double ou amis — toutes les réservations comptent.",
  },
  {
    icon: "🎁",
    title: "Reçois 100 $ à la 10ème date",
    desc: "Crédit Eve appliqué directement à ta 10ème sortie admissible.",
  },
];

const CONDITIONS = [
  "Abonnement Édén actif tout au long de la période",
  "10 réservations confirmées et complétées via Eve",
  "Au moins 2 réservations par mois",
  "Minimum 4 mois d'abonnement actif",
  "Les réservations annulées ou non complétées ne comptent pas",
  "1 récompense par cycle de 10 réservations",
  "Crédit non échangeable contre de l'argent",
  "Crédit non transférable",
  "Crédit valide 90 jours après le déblocage",
];

export function EdenReward() {
  return (
    <section className="px-6 py-[120px] bg-gradient-to-b from-warm-white to-cream">
      <SectionHeader
        label="Récompense Édén"
        title={
          <>
            Ta fidélité est{" "}
            <Script className="text-rose text-[48px] sm:text-[64px] md:text-[80px] inline-block leading-[0.9] my-1">
              récompensée
            </Script>
          </>
        }
        desc="100 $ en crédit Eve à ta 10ème date réservée via Édén."
      />

      <div className="max-w-[1000px] mx-auto">
        {/* Hero claim */}
        <div className="fade-in bg-gradient-to-br from-charcoal to-[#2a221d] rounded-[28px] p-10 sm:p-14 mb-7 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, rgba(201, 169, 110, 0.45) 0%, transparent 55%), radial-gradient(circle at 80% 70%, rgba(200, 114, 90, 0.3) 0%, transparent 50%)",
            }}
          />
          <div className="relative">
            <p className="text-[10px] font-bold tracking-[0.32em] text-gold mb-6">
              À ta 10ème date réservée via Eve
            </p>
            <div className="flex items-baseline justify-center gap-3 mb-4">
              <span className="font-script text-[40px] sm:text-[56px] text-cream/80 leading-none">
                reçois
              </span>
              <span className="text-[88px] sm:text-[124px] font-extrabold text-gold leading-none">
                100$
              </span>
            </div>
            <p className="text-[12px] tracking-[0.18em] text-cream/70 leading-[1.7] max-w-md mx-auto normal-case">
              en crédit Eve appliqué directement sur ta 10ème sortie.
            </p>
          </div>
        </div>

        {/* 3 steps */}
        <div className="fade-in mb-7">
          <p className="text-[10px] font-bold tracking-[0.32em] text-rose mb-5 text-center">
            Comment ça marche
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {STEPS.map((step, i) => (
              <div
                key={step.title}
                className="bg-warm-white border border-rose/15 rounded-[20px] p-7 text-center"
              >
                <div className="text-[32px] mb-3 leading-none">{step.icon}</div>
                <p className="text-[9px] font-bold tracking-[0.22em] text-rose mb-3">
                  Étape {["un", "deux", "trois"][i]}
                </p>
                <h3 className="text-[12px] font-bold tracking-[0.14em] text-charcoal mb-2.5">
                  {step.title}
                </h3>
                <p className="text-[10px] tracking-[0.1em] text-muted leading-[1.7] normal-case">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Conditions */}
        <div className="fade-in bg-warm-white border border-rose/15 rounded-[22px] p-8">
          <p className="text-[10px] font-bold tracking-[0.32em] text-rose mb-5">
            Conditions d&apos;admissibilité
          </p>
          <ul className="list-none grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {CONDITIONS.map((c) => (
              <li
                key={c}
                className="flex items-start gap-3 text-[10px] font-medium tracking-[0.1em] text-charcoal/80 leading-[1.7] normal-case"
              >
                <span className="text-rose font-bold flex-shrink-0 mt-0.5">○</span>
                {c}
              </li>
            ))}
          </ul>
          <p className="text-[9px] tracking-[0.16em] text-muted mt-6 pt-5 border-t border-rose/10 leading-[1.7] normal-case">
            La récompense est créditée automatiquement à ta 10ème sortie une fois toutes les conditions remplies.
          </p>
        </div>
      </div>
    </section>
  );
}
