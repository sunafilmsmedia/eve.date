import { SectionHeader, Script } from "./SectionHeader";

const REQUIREMENTS = [
  "Numéro de taxe (TPS/TVQ ou équivalent)",
  "Adresse de facturation valide",
  "Entreprise enregistrée légalement",
  "Site web ou présence sur les réseaux sociaux",
];

const BENEFITS = [
  "Visibilité auprès d'une communauté ciblée et engagée",
  "Réservations directes sans intermédiaire",
  "Dashboard pour gérer disponibilités et clients",
  "Système de ratings qui amplifie les meilleurs",
  "Paiements sécurisés gérés par Eve",
];

export function BusinessPartner() {
  return (
    <section
      id="partners"
      className="px-6 py-[120px] bg-gradient-to-b from-cream to-warm-white"
    >
      <SectionHeader
        label="Devenir partenaire"
        title={
          <>
            Pour les{" "}
            <Script className="text-rose text-[48px] sm:text-[64px] md:text-[80px] inline-block leading-[0.9] my-1">
              businesses
            </Script>
          </>
        }
        desc="Restaurants, spas, vignobles, expériences uniques — rejoins Eve et fais découvrir ton offre à des couples et célibataires en quête de vraies sorties."
      />

      <div className="max-w-[960px] mx-auto">
        {/* Pricing card */}
        <div className="fade-in bg-charcoal rounded-[28px] p-10 sm:p-14 mb-7 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(circle at 80% 20%, rgba(201, 169, 110, 0.4) 0%, transparent 50%)",
            }}
          />
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <p className="text-[10px] font-bold tracking-[0.32em] text-gold mb-4">
                Inscription
              </p>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-[64px] font-extrabold text-cream leading-none">
                  $20
                </span>
                <span className="font-script text-[28px] text-gold leading-none">
                  une fois
                </span>
              </div>
              <p className="text-[10px] tracking-[0.16em] text-cream/60 leading-[1.8]">
                Frais uniques pour activer ton compte business et passer la vérification.
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-[0.32em] text-gold mb-4">
                Par transaction
              </p>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-[64px] font-extrabold text-cream leading-none">
                  1–3<span className="text-[40px]">%</span>
                </span>
              </div>
              <p className="text-[10px] tracking-[0.16em] text-cream/60 leading-[1.8]">
                Commission sur chaque réservation confirmée. Le taux baisse avec le volume.
              </p>
            </div>
          </div>
        </div>

        {/* Two columns: requirements + benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="fade-in bg-warm-white border border-rose/15 rounded-[22px] p-8">
            <p className="text-[10px] font-bold tracking-[0.32em] text-rose mb-5">
              Ce qu&apos;il te faut
            </p>
            <ul className="list-none space-y-3.5">
              {REQUIREMENTS.map((req) => (
                <li
                  key={req}
                  className="flex items-start gap-3 text-[11px] font-medium tracking-[0.12em] text-charcoal leading-[1.7]"
                >
                  <span className="text-rose font-bold flex-shrink-0 mt-0.5">
                    ○
                  </span>
                  {req}
                </li>
              ))}
            </ul>
          </div>

          <div className="fade-in bg-warm-white border border-rose/15 rounded-[22px] p-8">
            <p className="text-[10px] font-bold tracking-[0.32em] text-rose mb-5">
              Ce que tu gagnes
            </p>
            <ul className="list-none space-y-3.5">
              {BENEFITS.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-3 text-[11px] font-medium tracking-[0.12em] text-charcoal leading-[1.7]"
                >
                  <span className="text-rose font-bold flex-shrink-0 mt-0.5">
                    ✓
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="fade-in text-center mt-12">
          <button
            disabled
            className="bg-rose/40 text-white px-10 py-[18px] rounded-full text-[11px] font-bold tracking-[0.22em] cursor-not-allowed"
          >
            Bientôt · Liste d&apos;attente partenaires ✨
          </button>
          <p className="text-[9px] tracking-[0.22em] text-muted mt-5">
            Lancement aux businesses prévu dans les prochaines semaines
          </p>
        </div>
      </div>
    </section>
  );
}
