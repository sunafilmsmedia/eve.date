import Link from "next/link";
import { SectionHeader, Script } from "./SectionHeader";

const HOW_IT_WORKS = [
  {
    icon: "1",
    title: "L'utilisateur réserve via Eve",
    desc: "Une demande arrive sur ton compte business.",
  },
  {
    icon: "2",
    title: "Il vient chez toi",
    desc: "Il paie directement sur place, comme d'habitude.",
  },
  {
    icon: "3",
    title: "Tu donnes 1–3 $ à Eve",
    desc: "Frais fixe par réservation confirmée. Pas de % à calculer.",
  },
];

const CANCELLATION = [
  {
    title: "Si le client annule",
    desc: "Il te rembourse selon ta politique. Eve ne prélève rien.",
  },
  {
    title: "Si tu annules une réservation",
    desc: "Tu verses 3 $ à Eve pour compenser le client.",
  },
];

const PRICE_DISPLAY = [
  {
    title: "Soumets ta liste",
    desc: "Tu peux uploader directement un PDF ou un menu existant.",
  },
  {
    title: "Eve l'analyse automatiquement",
    desc: "Pas besoin de saisir manuellement chaque ligne.",
  },
  {
    title: "Affichage clair pour l'utilisateur",
    desc: "Plusieurs choix → fourchette (~100–150 $/pers.). Prix fixe → prix moyen.",
  },
];

const REQUIREMENTS = [
  "Numéro de taxe (TPS/TVQ ou équivalent)",
  "Adresse de facturation valide",
  "Entreprise enregistrée légalement",
  "Site web ou présence sur les réseaux sociaux",
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
        desc="Restaurants, spas, vignobles, expériences uniques — rejoins Eve et fais découvrir ton offre à des couples, célibataires et groupes en quête de vraies sorties."
      />

      <div className="max-w-[1000px] mx-auto">
        {/* Pricing — subscription + flat fee per reservation */}
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
                Abonnement business
              </p>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-[64px] font-extrabold text-cream leading-none">
                  $10
                </span>
                <span className="text-[14px] font-semibold tracking-[0.1em] text-cream/60">
                  /mois
                </span>
              </div>
              <p className="text-[10px] font-semibold tracking-[0.18em] text-gold mb-4">
                ou $78/an · économise 42 $
              </p>
              <p className="text-[10px] tracking-[0.16em] text-cream/60 leading-[1.8]">
                Activer ton compte business, gérer tes services et apparaître dans les recommandations Eve.
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-[0.32em] text-gold mb-4">
                Par réservation
              </p>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-[64px] font-extrabold text-cream leading-none">
                  $1–3
                </span>
                <span className="font-script text-[28px] text-gold leading-none">
                  fixe
                </span>
              </div>
              <p className="text-[10px] tracking-[0.16em] text-cream/60 leading-[1.8]">
                Frais fixe par réservation confirmée. Aucun pourcentage, aucune surprise.
              </p>
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="fade-in mb-7">
          <p className="text-[10px] font-bold tracking-[0.32em] text-rose mb-5 text-center">
            Comment ça marche
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {HOW_IT_WORKS.map((step) => (
              <div
                key={step.title}
                className="bg-warm-white border border-rose/15 rounded-[20px] p-6"
              >
                <div className="w-9 h-9 rounded-full bg-rose text-white flex items-center justify-center font-extrabold text-[14px] mb-4">
                  {step.icon}
                </div>
                <h3 className="text-[11px] font-bold tracking-[0.16em] text-charcoal mb-2">
                  {step.title}
                </h3>
                <p className="text-[10px] tracking-[0.12em] text-muted leading-[1.7] normal-case">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Key advantage banner */}
        <div className="fade-in bg-light-gold/40 border border-gold/30 rounded-[20px] p-6 mb-7 text-center">
          <p className="font-script text-[28px] text-deep-rose leading-none mb-2">
            Aucun paiement traité par Eve
          </p>
          <p className="text-[10px] tracking-[0.14em] text-muted leading-[1.7] max-w-xl mx-auto normal-case">
            Le client te paie directement sur place. Pas de frais de processeur, pas de délai de versement, pas de complications fiscales pour toi.
          </p>
        </div>

        {/* Two columns: cancellation + price display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-7">
          <div className="fade-in bg-warm-white border border-rose/15 rounded-[22px] p-8">
            <p className="text-[10px] font-bold tracking-[0.32em] text-rose mb-5">
              En cas d&apos;annulation
            </p>
            <ul className="list-none space-y-4">
              {CANCELLATION.map((c) => (
                <li key={c.title}>
                  <p className="text-[11px] font-bold tracking-[0.12em] text-charcoal mb-1.5">
                    {c.title}
                  </p>
                  <p className="text-[10px] tracking-[0.1em] text-muted leading-[1.7] normal-case">
                    {c.desc}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="fade-in bg-warm-white border border-rose/15 rounded-[22px] p-8">
            <p className="text-[10px] font-bold tracking-[0.32em] text-rose mb-5">
              Tes prix sont affichés automatiquement
            </p>
            <ul className="list-none space-y-4">
              {PRICE_DISPLAY.map((p) => (
                <li key={p.title}>
                  <p className="text-[11px] font-bold tracking-[0.12em] text-charcoal mb-1.5">
                    {p.title}
                  </p>
                  <p className="text-[10px] tracking-[0.1em] text-muted leading-[1.7] normal-case">
                    {p.desc}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Requirements */}
        <div className="fade-in bg-warm-white border border-rose/15 rounded-[22px] p-8 mb-10">
          <p className="text-[10px] font-bold tracking-[0.32em] text-rose mb-5">
            Ce qu&apos;il te faut pour t&apos;inscrire
          </p>
          <ul className="list-none grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {REQUIREMENTS.map((req) => (
              <li
                key={req}
                className="flex items-start gap-3 text-[11px] font-medium tracking-[0.1em] text-charcoal leading-[1.7] normal-case"
              >
                <span className="text-rose font-bold flex-shrink-0 mt-0.5">○</span>
                {req}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="fade-in text-center">
          <Link
            href="/business"
            className="inline-block bg-rose text-white px-10 py-[18px] rounded-full text-[11px] font-bold tracking-[0.22em] hover:bg-deep-rose hover:-translate-y-0.5 transition-all"
          >
            Voir les détails & s&apos;inscrire →
          </Link>
          <p className="text-[9px] tracking-[0.22em] text-muted mt-5">
            FAQ complète, conditions et formulaire d&apos;inscription
          </p>
        </div>
      </div>
    </section>
  );
}
