"use client";

import { useState } from "react";
import Link from "next/link";
import { Script } from "./Script";

const HOW_IT_WORKS = [
  {
    icon: "1",
    title: "L'utilisateur réserve via Eve",
    desc: "Une notification arrive sur ton tableau de bord business avec les détails de la réservation : date, heure, nombre de personnes.",
  },
  {
    icon: "2",
    title: "Il vient chez toi et paie sur place",
    desc: "Tu accueilles le client comme n'importe quel autre. Le paiement se fait directement chez toi, à ton tarif normal, par les méthodes que tu acceptes déjà.",
  },
  {
    icon: "3",
    title: "Tu verses 1–3 $ à Eve",
    desc: "Frais fixe par réservation confirmée. Facturé mensuellement en fin de mois. Aucun pourcentage, aucune commission cachée.",
  },
];

const ADVANTAGES = [
  {
    title: "Visibilité ciblée",
    desc: "Eve recommande ton commerce à des utilisateurs activement à la recherche d'une sortie. Pas de spam, pas de scroll passif.",
  },
  {
    title: "Aucun paiement traité par Eve",
    desc: "Pas de frais Stripe, pas de délai de versement, pas de complications fiscales. Le client paie direct chez toi.",
  },
  {
    title: "Frais clairs et prévisibles",
    desc: "1 à 3 $ fixe par réservation. Tu sais combien tu dois exactement, sans calcul de pourcentage.",
  },
  {
    title: "Recommandations dans 4 contextes",
    desc: "Couple, casual dating, double dates, sorties entre amis — ton commerce apparaît selon ta clientèle idéale.",
  },
  {
    title: "Profil enrichi automatiquement",
    desc: "Uploade ton PDF de menu ou ta liste de services. Eve l'analyse et génère une fiche prête à l'emploi.",
  },
  {
    title: "Pas de contrat à long terme",
    desc: "Abonnement mensuel ou annuel — tu peux annuler en tout temps. Les réservations existantes restent honorées.",
  },
];

const SPONSOR_EXAMPLES = [
  "2 pour 1 sur les cocktails",
  "Verre offert à la réservation",
  "Dessert gratuit pour 2",
  "20 % sur le menu dégustation",
  "Surclassement gratuit en spa",
  "Activité bonus offerte",
];

const FAQ = [
  {
    q: "Combien ça coûte au total ?",
    a: "10 $/mois (ou 78 $/an) pour ton abonnement, plus 1-3 $ par réservation confirmée. Aucun frais de paiement, aucun pourcentage. Le sponsoring d'offre spéciale est optionnel (40 $/mois en plus).",
  },
  {
    q: "Comment fonctionne le sponsoring d'offre ?",
    a: "Tu crées une offre spéciale (2 pour 1, dessert offert, % de réduction, etc.) et tu paies 40 $/mois supplémentaires. Cette offre est mise en avant auprès des membres Édén : visibilité prioritaire dans les recommandations, badge spécial, mention dans le chat avec Eve.",
  },
  {
    q: "Quelles offres sont autorisées au sponsoring ?",
    a: "Tout ce qui apporte une vraie valeur ajoutée : promo limitée, item bonus, surclassement, % de réduction, expérience exclusive. Eve approuve chaque offre avant publication pour éviter les pièges marketing.",
  },
  {
    q: "Comment je reçois mon argent ?",
    a: "Tu encaisses directement les paiements chez toi, à ton tarif normal. Eve ne traite aucune transaction client. Tu verses les frais à Eve à la fin de chaque mois.",
  },
  {
    q: "Que se passe-t-il si un client annule ?",
    a: "Il te rembourse selon ta politique d'annulation. Eve ne prélève rien si la réservation n'est pas complétée. C'est ta politique, pas la nôtre.",
  },
  {
    q: "Et si moi j'annule une réservation ?",
    a: "Tu verses 3 $ à Eve pour couvrir l'expérience perdue du client. C'est dissuasif — l'idée est de protéger l'utilisateur.",
  },
  {
    q: "Comment mes prix sont affichés ?",
    a: "Tu nous envoies ton menu / liste de services (PDF accepté). Si tu as plusieurs prix, Eve affiche une fourchette (ex. 100-150 $/pers.). Pour un prix fixe (cinéma, escape room), c'est le prix moyen qui apparaît.",
  },
  {
    q: "Combien de temps pour être en ligne ?",
    a: "La vérification prend 24 à 48 heures ouvrables après réception des documents. Tu apparais ensuite dans les recommandations Eve en moins de 24h.",
  },
  {
    q: "Y a-t-il un engagement minimum ?",
    a: "Non. Tu peux annuler ton abonnement mensuel en tout temps. Les réservations confirmées sont honorées même après annulation.",
  },
  {
    q: "Eve garantit-il un nombre de réservations ?",
    a: "Non. Ton volume dépend de plusieurs facteurs : qualité de ton offre, ratings utilisateurs, ville, saison. Eve t'expose à des utilisateurs qualifiés, mais pas de garantie.",
  },
];

const BUSINESS_TYPES = [
  "Restaurant",
  "Bar / Cocktails",
  "Spa / Bien-être",
  "Vignoble / Cidrerie",
  "Activité / Expérience",
  "Cours (cuisine, art, etc.)",
  "Hébergement / Chalet",
  "Autre",
];

export function BusinessLanding() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Future: POST to /api/business-waitlist
  };

  return (
    <main className="min-h-screen">
      {/* Top nav */}
      <nav className="px-6 py-5 border-b border-rose/10 bg-cream/85 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-[1100px] mx-auto flex items-center justify-between flex-wrap gap-4">
          <Link
            href="/"
            className="inline-block font-script text-[32px] text-charcoal leading-none hover:text-rose transition-colors"
          >
            Eve
            <span className="font-sans text-[10px] font-bold text-rose tracking-[0.3em] uppercase align-middle ml-1.5">
              AI
            </span>
          </Link>
          <div className="flex items-center gap-5">
            <Link
              href="/"
              className="text-[10px] font-bold tracking-[0.18em] text-muted hover:text-rose transition-colors"
            >
              ← Côté utilisateur
            </Link>
            <a
              href="#inscription"
              className="bg-rose text-white px-5 py-2.5 rounded-full text-[10px] font-bold tracking-[0.22em] hover:bg-deep-rose transition-colors"
            >
              S&apos;inscrire
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 py-[100px] bg-gradient-to-b from-cream to-warm-white">
        <div className="max-w-[860px] mx-auto text-center">
          <p className="text-[10px] font-bold tracking-[0.32em] text-rose mb-5">
            Côté commerces
          </p>
          <h1 className="font-sans text-[36px] sm:text-[52px] md:text-[64px] font-extrabold tracking-[0.01em] text-charcoal mb-3 leading-[1.1]">
            Fais-toi recommander aux gens qui{" "}
            <Script className="text-rose text-[60px] sm:text-[84px] md:text-[104px] inline-block leading-[0.9]">
              cherchent
            </Script>{" "}
            quoi faire
          </h1>
          <p className="text-[12px] sm:text-[14px] tracking-[0.16em] text-muted mt-8 mb-10 leading-[1.85] max-w-[640px] mx-auto normal-case">
            Eve oriente couples, amis et groupes vers ton commerce selon leur budget, leur ville, leur ambiance recherchée. Tu paies un petit forfait + 1-3 $ par réservation. C&apos;est tout.
          </p>
          <a
            href="#inscription"
            className="inline-block bg-rose text-white px-9 py-4 rounded-full text-[11px] font-bold tracking-[0.22em] hover:bg-deep-rose hover:-translate-y-0.5 transition-all"
          >
            Réserver ma place →
          </a>
        </div>
      </section>

      {/* Pricing block */}
      <section className="px-6 py-[80px]">
        <div className="max-w-[1000px] mx-auto">
          <p className="text-[10px] font-bold tracking-[0.32em] text-rose mb-5 text-center">
            Tarification
          </p>
          <h2 className="font-sans text-[28px] sm:text-[36px] font-extrabold tracking-[0.02em] text-charcoal mb-12 text-center leading-[1.2]">
            Simple, fixe,{" "}
            <Script className="text-rose text-[44px] sm:text-[56px] inline-block leading-[0.9]">
              prévisible
            </Script>
          </h2>

          <div className="bg-charcoal rounded-[28px] p-10 sm:p-14 relative overflow-hidden">
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
                  Pour activer ton compte, gérer tes services et apparaître dans les recommandations Eve.
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
                  Frais fixe par réservation confirmée. Facturé en fin de mois.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsor option */}
      <section className="px-6 py-[80px] bg-gradient-to-b from-cream to-warm-white">
        <div className="max-w-[1000px] mx-auto">
          <p className="text-[10px] font-bold tracking-[0.32em] text-rose mb-5 text-center">
            Option · Sponsoring
          </p>
          <h2 className="font-sans text-[28px] sm:text-[36px] font-extrabold tracking-[0.02em] text-charcoal mb-3 text-center leading-[1.2]">
            Booste une{" "}
            <Script className="text-rose text-[44px] sm:text-[56px] inline-block leading-[0.9]">
              offre spéciale
            </Script>
          </h2>
          <p className="text-center text-[11px] tracking-[0.14em] text-muted mb-12 leading-[1.85] max-w-[640px] mx-auto normal-case">
            Tu as une offre attractive ? Sponsorise-la pour qu&apos;elle soit mise en avant auprès des membres Édén — ceux qui réservent le plus.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr,1fr] gap-6">
            {/* Left: Pricing card */}
            <div className="bg-gradient-to-br from-charcoal to-[#2a221d] rounded-[28px] p-9 sm:p-12 relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-35"
                style={{
                  background:
                    "radial-gradient(circle at 80% 30%, rgba(201, 169, 110, 0.5) 0%, transparent 55%)",
                }}
              />
              <div className="relative">
                <div className="inline-block bg-gold/20 text-gold text-[9px] font-bold tracking-[0.22em] px-3 py-1.5 rounded-full mb-5">
                  Add-on
                </div>
                <p className="text-[10px] font-bold tracking-[0.32em] text-gold mb-3">
                  Sponsoring d&apos;offre
                </p>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-[64px] font-extrabold text-cream leading-none">
                    $40
                  </span>
                  <span className="text-[14px] font-semibold tracking-[0.1em] text-cream/60">
                    /mois
                  </span>
                </div>
                <p className="text-[10px] font-semibold tracking-[0.18em] text-gold mb-6">
                  En plus de ton abonnement business
                </p>

                <ul className="list-none space-y-3 mb-2">
                  {[
                    "Visibilité prioritaire dans les recommandations Édén",
                    "Badge spécial sur ta fiche",
                    "Mention par Eve dans le chat quand pertinent",
                    "Notification push aux membres ciblés",
                    "1 offre active à la fois — modifiable à volonté",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[10px] font-medium tracking-[0.1em] text-cream/85 leading-[1.7] normal-case"
                    >
                      <span className="text-gold font-bold flex-shrink-0 mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Examples */}
            <div className="bg-warm-white border border-rose/15 rounded-[28px] p-7 sm:p-9">
              <p className="text-[10px] font-bold tracking-[0.32em] text-rose mb-5">
                Exemples d&apos;offres
              </p>
              <ul className="list-none space-y-3.5 mb-6">
                {SPONSOR_EXAMPLES.map((ex) => (
                  <li
                    key={ex}
                    className="flex items-start gap-3 text-[11px] tracking-[0.08em] text-charcoal leading-[1.7] normal-case"
                  >
                    <span className="text-rose font-bold shrink-0 mt-0.5">→</span>
                    {ex}
                  </li>
                ))}
              </ul>
              <p className="text-[9px] tracking-[0.16em] text-muted leading-[1.8] pt-5 border-t border-rose/10 normal-case">
                Chaque offre est validée par Eve avant publication pour garantir une vraie valeur ajoutée aux membres.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-[80px] bg-warm-white">
        <div className="max-w-[1000px] mx-auto">
          <p className="text-[10px] font-bold tracking-[0.32em] text-rose mb-5 text-center">
            Comment ça marche
          </p>
          <h2 className="font-sans text-[28px] sm:text-[36px] font-extrabold tracking-[0.02em] text-charcoal mb-12 text-center leading-[1.2]">
            Trois{" "}
            <Script className="text-rose text-[44px] sm:text-[56px] inline-block leading-[0.9]">
              étapes
            </Script>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {HOW_IT_WORKS.map((step) => (
              <div
                key={step.title}
                className="bg-cream border border-rose/15 rounded-[20px] p-7"
              >
                <div className="w-10 h-10 rounded-full bg-rose text-white flex items-center justify-center font-extrabold text-[16px] mb-5">
                  {step.icon}
                </div>
                <h3 className="text-[12px] font-bold tracking-[0.14em] text-charcoal mb-3 leading-[1.4]">
                  {step.title}
                </h3>
                <p className="text-[10px] tracking-[0.1em] text-muted leading-[1.85] normal-case">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="px-6 py-[80px]">
        <div className="max-w-[1000px] mx-auto">
          <p className="text-[10px] font-bold tracking-[0.32em] text-rose mb-5 text-center">
            Avantages
          </p>
          <h2 className="font-sans text-[28px] sm:text-[36px] font-extrabold tracking-[0.02em] text-charcoal mb-12 text-center leading-[1.2]">
            Ce que tu{" "}
            <Script className="text-rose text-[44px] sm:text-[56px] inline-block leading-[0.9]">
              gagnes
            </Script>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {ADVANTAGES.map((adv) => (
              <div
                key={adv.title}
                className="bg-warm-white border border-rose/15 rounded-[20px] p-7"
              >
                <h3 className="text-[12px] font-bold tracking-[0.14em] text-charcoal mb-3">
                  ✓ {adv.title}
                </h3>
                <p className="text-[10px] tracking-[0.1em] text-muted leading-[1.8] normal-case">
                  {adv.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-[80px] bg-warm-white">
        <div className="max-w-[820px] mx-auto">
          <p className="text-[10px] font-bold tracking-[0.32em] text-rose mb-5 text-center">
            Questions fréquentes
          </p>
          <h2 className="font-sans text-[28px] sm:text-[36px] font-extrabold tracking-[0.02em] text-charcoal mb-12 text-center leading-[1.2]">
            On répond à{" "}
            <Script className="text-rose text-[44px] sm:text-[56px] inline-block leading-[0.9]">
              tout
            </Script>
          </h2>
          <div className="space-y-4">
            {FAQ.map((item) => (
              <details
                key={item.q}
                className="group bg-cream border border-rose/15 rounded-[18px] overflow-hidden"
              >
                <summary className="cursor-pointer px-6 py-5 flex items-center justify-between gap-4 list-none">
                  <span className="text-[12px] font-bold tracking-[0.1em] text-charcoal leading-[1.5] normal-case">
                    {item.q}
                  </span>
                  <span className="text-rose text-[18px] shrink-0 group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-5 -mt-1 text-[10px] tracking-[0.08em] text-muted leading-[1.9] normal-case">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Inscription form */}
      <section id="inscription" className="px-6 py-[100px] bg-gradient-to-b from-warm-white to-cream">
        <div className="max-w-[680px] mx-auto">
          <p className="text-[10px] font-bold tracking-[0.32em] text-rose mb-5 text-center">
            Inscription
          </p>
          <h2 className="font-sans text-[28px] sm:text-[36px] font-extrabold tracking-[0.02em] text-charcoal mb-3 text-center leading-[1.2]">
            Rejoins la{" "}
            <Script className="text-rose text-[44px] sm:text-[56px] inline-block leading-[0.9]">
              liste d&apos;attente
            </Script>
          </h2>
          <p className="text-center text-[11px] tracking-[0.14em] text-muted mb-10 leading-[1.85] normal-case">
            Lancement aux businesses prévu dans les prochaines semaines. Soumets ton commerce maintenant pour passer en priorité.
          </p>

          {submitted ? (
            <div className="bg-warm-white border border-rose/15 rounded-[24px] p-10 sm:p-12 text-center">
              <p className="font-script text-[48px] sm:text-[60px] text-rose mb-3 leading-none">
                merci ✨
              </p>
              <p className="text-[11px] tracking-[0.14em] text-charcoal mb-2 leading-[1.7]">
                Ta demande a été reçue.
              </p>
              <p className="text-[10px] tracking-[0.12em] text-muted leading-[1.8] normal-case max-w-md mx-auto">
                On revient vers toi dans les 24-48 heures ouvrables avec les prochaines étapes (vérification + activation du compte).
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-warm-white border border-rose/15 rounded-[24px] p-7 sm:p-10 space-y-6"
            >
              <FormField label="Nom du commerce *">
                <input
                  type="text"
                  name="businessName"
                  required
                  placeholder="Ex : Vignoble du Lac"
                  className="w-full px-5 py-3.5 border-[1.5px] border-rose/20 rounded-xl text-[12px] font-medium tracking-[0.1em] text-charcoal bg-cream outline-none focus:border-rose transition-colors placeholder:text-muted/40"
                />
              </FormField>

              <FormField label="Type d'établissement *">
                <select
                  name="businessType"
                  required
                  defaultValue=""
                  className="w-full px-5 py-3.5 border-[1.5px] border-rose/20 rounded-xl text-[12px] font-medium tracking-[0.1em] text-charcoal bg-cream outline-none focus:border-rose transition-colors"
                >
                  <option value="" disabled>
                    Choisis ton type
                  </option>
                  {BUSINESS_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </FormField>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField label="Email de contact *">
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="contact@business.com"
                    className="w-full px-5 py-3.5 border-[1.5px] border-rose/20 rounded-xl text-[12px] font-medium tracking-[0.1em] text-charcoal bg-cream outline-none focus:border-rose transition-colors placeholder:text-muted/40"
                  />
                </FormField>

                <FormField label="Téléphone">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+1 514 555-0100"
                    className="w-full px-5 py-3.5 border-[1.5px] border-rose/20 rounded-xl text-[12px] font-medium tracking-[0.1em] text-charcoal bg-cream outline-none focus:border-rose transition-colors placeholder:text-muted/40"
                  />
                </FormField>
              </div>

              <FormField label="Site web ou réseaux sociaux *">
                <input
                  type="url"
                  name="website"
                  required
                  placeholder="https://"
                  className="w-full px-5 py-3.5 border-[1.5px] border-rose/20 rounded-xl text-[12px] font-medium tracking-[0.1em] text-charcoal bg-cream outline-none focus:border-rose transition-colors placeholder:text-muted/40"
                />
              </FormField>

              <FormField label="Numéro de TPS/TVQ *">
                <input
                  type="text"
                  name="taxNumber"
                  required
                  placeholder="123456789RT0001"
                  className="w-full px-5 py-3.5 border-[1.5px] border-rose/20 rounded-xl text-[12px] font-medium tracking-[0.1em] text-charcoal bg-cream outline-none focus:border-rose transition-colors placeholder:text-muted/40"
                />
              </FormField>

              <FormField label="Adresse de facturation *">
                <textarea
                  name="billingAddress"
                  required
                  rows={2}
                  placeholder="Rue, ville, code postal"
                  className="w-full px-5 py-3.5 border-[1.5px] border-rose/20 rounded-xl text-[12px] font-medium tracking-[0.1em] text-charcoal bg-cream outline-none focus:border-rose transition-colors placeholder:text-muted/40 resize-none"
                />
              </FormField>

              <FormField
                label="Décris brièvement ton offre"
                hint="(optionnel)"
              >
                <textarea
                  name="description"
                  rows={3}
                  placeholder="Type d'expérience, points forts, ce qui te distingue..."
                  className="w-full px-5 py-3.5 border-[1.5px] border-rose/20 rounded-xl text-[12px] font-medium tracking-[0.1em] text-charcoal bg-cream outline-none focus:border-rose transition-colors placeholder:text-muted/40 resize-none"
                />
              </FormField>

              <div className="bg-light-gold/30 border border-gold/30 rounded-[16px] p-5">
                <label className="flex items-start gap-3 cursor-pointer mb-4">
                  <input
                    type="checkbox"
                    name="interestedInSponsoring"
                    className="mt-1 w-4 h-4 accent-rose cursor-pointer"
                  />
                  <span className="text-[11px] font-bold tracking-[0.12em] text-charcoal leading-[1.5] normal-case">
                    Je suis intéressé·e par le sponsoring d&apos;offre spéciale (40 $/mois en plus)
                  </span>
                </label>
                <FormField label="Offre que tu voudrais sponsoriser" hint="(optionnel)">
                  <textarea
                    name="sponsoredOffer"
                    rows={2}
                    placeholder="Ex : 2 pour 1 sur les cocktails, dessert offert, 20 % sur menu dégustation..."
                    className="w-full px-5 py-3 border-[1.5px] border-rose/20 rounded-xl text-[12px] font-medium tracking-[0.1em] text-charcoal bg-cream outline-none focus:border-rose transition-colors placeholder:text-muted/40 resize-none"
                  />
                </FormField>
              </div>

              <button
                type="submit"
                className="w-full bg-rose text-white py-4 rounded-full text-[11px] font-bold tracking-[0.22em] hover:bg-deep-rose hover:-translate-y-0.5 transition-all cursor-pointer mt-2"
              >
                Envoyer ma demande →
              </button>

              <p className="text-center text-[9px] tracking-[0.18em] text-muted mt-3 leading-[1.7] normal-case">
                On revient vers toi dans 24-48 heures ouvrables. Aucune carte requise pour s&apos;inscrire à la liste.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* Footer link */}
      <footer className="px-6 py-12 border-t border-rose/10 text-center">
        <Link
          href="/"
          className="font-script text-[24px] text-charcoal hover:text-rose transition-colors"
        >
          ← Retour côté utilisateur
        </Link>
      </footer>
    </main>
  );
}

function FormField({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-[10px] font-bold tracking-[0.22em] text-muted mb-3">
        {label}
        {hint && (
          <span className="text-rose ml-2 tracking-normal lowercase font-normal">
            {hint}
          </span>
        )}
      </label>
      {children}
    </div>
  );
}
