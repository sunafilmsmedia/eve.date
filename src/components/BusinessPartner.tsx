import Link from "next/link";
import { SectionHeader, Script } from "./SectionHeader";

const TIERS = [
  {
    name: "Genesis",
    price: "$10",
    period: "/mois",
    hint: "+ 2 $ / réservation",
  },
  {
    name: "Utopia",
    price: "$99",
    period: "/mois",
    hint: "100 résas incluses",
    featured: true,
  },
  {
    name: "Paradise",
    price: "$299",
    period: "/mois",
    hint: "Illimité + 2 offres/mois",
  },
];

export function BusinessPartner() {
  return (
    <section
      id="partners"
      className="px-6 py-[120px] bg-gradient-to-b from-cream to-warm-white"
    >
      <SectionHeader
        label="Adam · Le côté partenaires"
        title={
          <>
            Restaurants, spas, expériences —{" "}
            <Script className="text-rose text-[48px] sm:text-[64px] md:text-[80px] inline-block leading-[0.9] my-1">
              rejoins Adam
            </Script>
          </>
        }
        desc="Adam, c'est le côté business d'Eve AI. Fais-toi recommander aux couples, célibataires et groupes en quête de vraies sorties. Trois forfaits — dès 10 $/mois. Aucun pourcentage sur tes ventes."
      />

      <div className="max-w-[1000px] mx-auto">
        {/* 3-tier teaser */}
        <div className="fade-in grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-[22px] p-7 text-center ${
                tier.featured
                  ? "bg-charcoal text-cream shadow-lg md:-translate-y-2"
                  : "bg-warm-white border border-rose/15 text-charcoal"
              }`}
            >
              <p
                className={`text-[10px] font-bold tracking-[0.28em] mb-3 ${
                  tier.featured ? "text-gold" : "text-rose"
                }`}
              >
                {tier.name}
              </p>
              <div className="flex items-baseline justify-center gap-1 mb-2">
                <span
                  className={`text-[38px] font-extrabold leading-none ${
                    tier.featured ? "text-cream" : "text-charcoal"
                  }`}
                >
                  {tier.price}
                </span>
                <span
                  className={`text-[11px] font-semibold tracking-[0.1em] ${
                    tier.featured ? "text-cream/60" : "text-muted"
                  }`}
                >
                  {tier.period}
                </span>
              </div>
              <p
                className={`text-[10px] tracking-[0.1em] leading-[1.6] normal-case ${
                  tier.featured ? "text-cream/70" : "text-muted"
                }`}
              >
                {tier.hint}
              </p>
            </div>
          ))}
        </div>

        {/* Key advantage banner */}
        <div className="fade-in bg-light-gold/40 border border-gold/30 rounded-[20px] p-6 mb-10 text-center">
          <p className="font-script text-[28px] text-deep-rose leading-none mb-2">
            Aucun paiement traité par Eve
          </p>
          <p className="text-[10px] tracking-[0.14em] text-muted leading-[1.7] max-w-xl mx-auto normal-case">
            Le client te paie directement sur place. Pas de frais de processeur, pas de délai de versement, pas de complications fiscales pour toi.
          </p>
        </div>

        {/* CTA */}
        <div className="fade-in text-center">
          <Link
            href="/business"
            className="inline-block bg-rose text-white px-10 py-[18px] rounded-full text-[11px] font-bold tracking-[0.22em] hover:bg-deep-rose hover:-translate-y-0.5 transition-all"
          >
            Découvrir Adam →
          </Link>
          <p className="text-[9px] tracking-[0.22em] text-muted mt-5">
            Détails complets, FAQ, formulaire d&apos;inscription
          </p>
        </div>
      </div>
    </section>
  );
}
