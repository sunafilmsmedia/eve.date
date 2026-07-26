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
    title: "Tu payes selon ton forfait",
    desc: "Genesis = 2 $ par réservation. Utopia = 100 réservations incluses. Paradise = illimité. Aucun pourcentage, aucune commission cachée.",
  },
];

const TIERS = [
  {
    key: "genesis",
    label: "Genesis",
    tagline: "Tu testes Adam",
    price: "$10",
    period: "/mois",
    features: [
      "+ 2 $ par réservation confirmée",
      "Fiche business dans les recommandations",
      "Accès au tableau de bord",
      "Aucun engagement — annule quand tu veux",
    ],
    cta: "Commencer avec Genesis",
    highlighted: false,
  },
  {
    key: "utopia",
    label: "Utopia",
    tagline: "Le choix de la plupart des partenaires",
    price: "$99",
    period: "/mois",
    features: [
      "100 réservations incluses / mois",
      "+ 2 $ par réservation au-delà de 100",
      "Priorité dans les recommandations",
      "Stats de performance détaillées",
    ],
    cta: "Choisir Utopia",
    highlighted: true,
  },
  {
    key: "paradise",
    label: "Paradise",
    tagline: "Volume élevé + offres incluses",
    price: "$299",
    period: "/mois",
    features: [
      "Réservations illimitées",
      "2 publications d'offre gratuites / mois",
      "Placement prioritaire toute l'année",
      "Support dédié",
    ],
    cta: "Passer à Paradise",
    highlighted: false,
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
    desc: "Forfait fixe + 2 $ par réservation seulement. Tu sais combien tu dois exactement, sans calcul de pourcentage.",
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

const EVE_OFFER_EXAMPLES = [
  "2 pour 1 sur les cocktails mardi et mercredi",
  "Menu dégustation à -20 % le dimanche soir",
  "Bouteille offerte pour 4 personnes+",
  "Massage 90 min au prix du 60 min",
  "Dessert offert avec 2 plats principaux",
  "Formule brunch 2 pour 1 en semaine",
];

const FAQ = [
  {
    q: "Quels sont les 3 forfaits Adam ?",
    a: "Genesis (10 $/mois + 2 $ par réservation) pour tester Adam. Utopia (99 $/mois avec 100 réservations incluses) pour la plupart des partenaires. Paradise (299 $/mois, réservations illimitées + 2 publications d'offres gratuites) pour les gros volumes.",
  },
  {
    q: "C'est quoi une « offre » et comment Eve me la suggère ?",
    a: "Eve analyse ton menu, tes services et ton historique pour te proposer des offres qui vont attirer plus de clients (ex : « 2 pour 1 cocktails les mardis », « menu dégustation à -20 % le dimanche »). Tu approuves ou tu passes. Tu ne paies rien tant que tu ne publies pas.",
  },
  {
    q: "Combien coûte la mise en ligne d'une offre ?",
    a: "15 $/semaine ou 40 $/mois par offre publiée, peu importe ton forfait. Paradise inclut 2 publications gratuites par mois. Tu peux modifier ou retirer l'offre à tout moment.",
  },
  {
    q: "Pourquoi « Adam » ?",
    a: "Eve, c'est le côté utilisateur — la personne qui cherche une sortie. Adam, c'est le côté partenaire — le commerce qui l'accueille. Deux plateformes, une seule mission : aider les gens à savoir quoi faire ce soir.",
  },
  {
    q: "Comment je reçois mon argent ?",
    a: "Tu encaisses directement les paiements chez toi, à ton tarif normal. Eve ne traite aucune transaction client. Tu es facturé pour ton forfait + réservations + publications d'offres à la fin de chaque mois.",
  },
  {
    q: "Que se passe-t-il si un client annule ?",
    a: "Il te rembourse selon ta politique d'annulation. Eve ne prélève rien si la réservation n'est pas complétée. C'est ta politique, pas la nôtre.",
  },
  {
    q: "Et si moi j'annule une réservation ?",
    a: "Tu verses 3 $ de crédit au client via Eve pour couvrir sa soirée gâchée. C'est dissuasif — l'idée est de protéger l'utilisateur.",
  },
  {
    q: "Comment mes prix sont affichés ?",
    a: "Tu nous envoies ton menu / liste de services (PDF accepté). Si tu as plusieurs prix, Eve affiche une fourchette (ex. 100-150 $/pers.). Pour un prix fixe (cinéma, escape room), c'est le prix moyen qui apparaît.",
  },
  {
    q: "Combien de temps pour être en ligne ?",
    a: "La vérification prend 24 à 48 heures ouvrables après réception des documents. Tu apparais ensuite dans les recommandations Eve en moins de 24 h.",
  },
  {
    q: "Y a-t-il un engagement minimum ?",
    a: "Non. Tu peux annuler ton abonnement mensuel en tout temps, ou changer de forfait à la hausse ou à la baisse. Les réservations confirmées sont honorées même après annulation.",
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
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setErrorMsg(null);
    setSubmitting(true);

    const fd = new FormData(e.currentTarget);
    const payload = {
      business_name: String(fd.get("businessName") ?? "").trim(),
      business_type: String(fd.get("businessType") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim() || undefined,
      website: String(fd.get("website") ?? "").trim(),
      tax_number: String(fd.get("taxNumber") ?? "").trim(),
      billing_address: String(fd.get("billingAddress") ?? "").trim(),
      description: String(fd.get("description") ?? "").trim() || undefined,
      tier: String(fd.get("tier") ?? "").trim() || undefined,
      interested_in_sponsoring: fd.get("interestedInSponsoring") === "on",
      sponsored_offer:
        String(fd.get("sponsoredOffer") ?? "").trim() || undefined,
    };

    try {
      const res = await fetch("/api/business/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { success?: boolean; error?: string };
      if (!res.ok || !data.success) {
        throw new Error(data.error ?? "Erreur lors de l'envoi");
      }
      setSubmitted(true);
    } catch (err) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Erreur lors de l'envoi. Réessaye dans un moment."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-charcoal text-cream">
      {/* Ambient gold glow — subtle, persistent */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none opacity-40 -z-10"
        style={{
          background:
            "radial-gradient(circle at 20% 10%, rgba(201, 169, 110, 0.18) 0%, transparent 45%), radial-gradient(circle at 85% 90%, rgba(200, 114, 90, 0.14) 0%, transparent 40%)",
        }}
      />

      {/* Top nav */}
      <nav className="px-6 py-5 border-b border-gold/15 bg-charcoal/85 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-[1100px] mx-auto flex items-center justify-between flex-wrap gap-4">
          <Link
            href="/business"
            className="inline-block leading-none hover:opacity-80 transition-opacity"
          >
            <span className="font-script text-[32px] text-gold leading-none">
              Adam
            </span>
            <span className="font-sans text-[9px] font-bold text-cream/50 tracking-[0.3em] uppercase align-middle ml-2">
              by Eve AI
            </span>
          </Link>
          <div className="flex items-center gap-5">
            <Link
              href="/"
              className="text-[10px] font-bold tracking-[0.18em] text-cream/60 hover:text-gold transition-colors"
            >
              ← Côté Eve
            </Link>
            <a
              href="#inscription"
              className="bg-gold text-charcoal px-5 py-2.5 rounded-full text-[10px] font-bold tracking-[0.22em] hover:bg-cream transition-colors"
            >
              S&apos;inscrire
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative px-6 py-[110px] overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(201, 169, 110, 0.22) 0%, transparent 55%)",
          }}
        />
        <div className="max-w-[860px] mx-auto text-center relative">
          <p className="text-[10px] font-bold tracking-[0.32em] text-rose mb-5">
            Adam · Le côté partenaires
          </p>
          <h1 className="font-sans text-[36px] sm:text-[52px] md:text-[64px] font-extrabold tracking-[0.01em] text-cream mb-3 leading-[1.1]">
            Fais-toi recommander aux gens qui{" "}
            <Script className="text-gold text-[60px] sm:text-[84px] md:text-[104px] inline-block leading-[0.9]">
              cherchent
            </Script>{" "}
            quoi faire
          </h1>
          <p className="text-[12px] sm:text-[14px] tracking-[0.16em] text-cream/65 mt-8 mb-10 leading-[1.85] max-w-[640px] mx-auto normal-case">
            Eve oriente couples, amis et groupes vers ton commerce selon leur budget, leur ville, leur ambiance recherchée. Trois forfaits — <b className="text-gold">Genesis</b>, <b className="text-gold">Utopia</b>, <b className="text-gold">Paradise</b> — dès 10 $/mois. Aucun pourcentage sur tes ventes.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <a
              href="#forfaits"
              className="inline-block bg-gold text-charcoal px-8 py-4 rounded-full text-[11px] font-bold tracking-[0.22em] hover:bg-cream hover:-translate-y-0.5 transition-all"
            >
              Voir les forfaits →
            </a>
            <a
              href="#inscription"
              className="inline-block bg-transparent text-cream border-2 border-cream/25 px-8 py-4 rounded-full text-[11px] font-bold tracking-[0.22em] hover:border-rose hover:text-rose transition-all"
            >
              S&apos;inscrire
            </a>
          </div>
        </div>
      </section>

      {/* Pricing — 3 tiers */}
      <section id="forfaits" className="px-6 py-[90px] border-t border-gold/10">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-[10px] font-bold tracking-[0.32em] text-rose mb-5 text-center">
            Nos forfaits
          </p>
          <h2 className="font-sans text-[28px] sm:text-[36px] font-extrabold tracking-[0.02em] text-cream mb-4 text-center leading-[1.2]">
            Choisis ton{" "}
            <Script className="text-gold text-[44px] sm:text-[56px] inline-block leading-[0.9]">
              forfait
            </Script>
          </h2>
          <p className="text-center text-[11px] tracking-[0.14em] text-cream/55 mb-14 leading-[1.85] max-w-[620px] mx-auto normal-case">
            Tu changes de forfait à la hausse ou à la baisse en un clic. Aucun engagement.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
            {TIERS.map((tier) => {
              const highlighted = tier.highlighted;
              return (
                <div
                  key={tier.key}
                  className={`relative rounded-[24px] p-8 sm:p-9 flex flex-col overflow-hidden ${
                    highlighted
                      ? "bg-gradient-to-br from-gold to-[#a88a52] text-charcoal md:-translate-y-3 shadow-[0_30px_60px_-25px_rgba(201,169,110,0.5)]"
                      : "bg-[#221c17] border border-gold/15 text-cream"
                  }`}
                >
                  {!highlighted && (
                    <div
                      className="absolute inset-0 opacity-40 pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(circle at 80% 0%, rgba(201, 169, 110, 0.25) 0%, transparent 60%)",
                      }}
                    />
                  )}
                  {highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-charcoal text-gold text-[9px] font-bold tracking-[0.22em] uppercase px-4 py-1.5 rounded-full whitespace-nowrap border border-gold/40">
                      ★ Populaire
                    </div>
                  )}
                  <div className="relative flex flex-col flex-1">
                    <p
                      className={`text-[10px] font-bold tracking-[0.32em] mb-2 ${
                        highlighted ? "text-charcoal" : "text-gold"
                      }`}
                    >
                      {tier.label}
                    </p>
                    <p
                      className={`text-[10px] tracking-[0.12em] mb-6 leading-[1.5] normal-case ${
                        highlighted ? "text-charcoal/70" : "text-rose"
                      }`}
                    >
                      {tier.tagline}
                    </p>
                    <div className="flex items-baseline gap-1.5 mb-8">
                      <span
                        className={`text-[54px] font-extrabold leading-none ${
                          highlighted ? "text-charcoal" : "text-cream"
                        }`}
                      >
                        {tier.price}
                      </span>
                      <span
                        className={`text-[13px] font-semibold tracking-[0.1em] ${
                          highlighted ? "text-charcoal/70" : "text-cream/55"
                        }`}
                      >
                        {tier.period}
                      </span>
                    </div>
                    <ul className="list-none space-y-3 mb-8 flex-1">
                      {tier.features.map((f) => (
                        <li
                          key={f}
                          className={`flex items-start gap-3 text-[10.5px] tracking-[0.08em] leading-[1.6] normal-case ${
                            highlighted ? "text-charcoal/85" : "text-cream/85"
                          }`}
                        >
                          <span
                            className={`shrink-0 mt-0.5 font-bold ${
                              highlighted ? "text-charcoal" : "text-gold"
                            }`}
                          >
                            ✓
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="#inscription"
                      className={`block text-center py-3.5 rounded-full text-[10px] font-bold tracking-[0.22em] transition-all ${
                        highlighted
                          ? "bg-charcoal text-gold hover:bg-black"
                          : "bg-gold text-charcoal hover:bg-cream"
                      }`}
                    >
                      {tier.cta} →
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-center text-[10px] tracking-[0.14em] text-cream/50 mt-10 leading-[1.85] max-w-[720px] mx-auto normal-case">
            Facturation en fin de mois. Tu encaisses les paiements clients directement — Eve ne prend jamais de pourcentage sur les ventes.
          </p>
        </div>
      </section>

      {/* Eve suggests offers based on your menu */}
      <section className="px-6 py-[90px] border-t border-gold/10">
        <div className="max-w-[1100px] mx-auto">
          <p className="text-[10px] font-bold tracking-[0.32em] text-rose mb-5 text-center">
            Bonus · Offres suggérées par Eve AI
          </p>
          <h2 className="font-sans text-[28px] sm:text-[36px] font-extrabold tracking-[0.02em] text-cream mb-3 text-center leading-[1.2]">
            Eve analyse ton menu et te propose des{" "}
            <Script className="text-gold text-[44px] sm:text-[56px] inline-block leading-[0.9]">
              offres qui marchent
            </Script>
          </h2>
          <p className="text-center text-[11px] tracking-[0.14em] text-cream/55 mb-12 leading-[1.85] max-w-[680px] mx-auto normal-case">
            Tu approuves les suggestions qui t&apos;intéressent. Tu ne paies rien tant que tu ne publies pas.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr,1fr] gap-6 items-stretch">
            {/* Left: How it works — 3 steps */}
            <div className="bg-[#221c17] border border-gold/15 rounded-[28px] p-7 sm:p-9 relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 100% 0%, rgba(200, 114, 90, 0.35) 0%, transparent 55%)",
                }}
              />
              <div className="relative">
                <p className="text-[10px] font-bold tracking-[0.32em] text-rose mb-6">
                  Comment ça marche
                </p>
                <ol className="list-none space-y-5">
                  {[
                    {
                      n: "1",
                      t: "Tu uploades ton menu / liste de services",
                      d: "PDF ou photo. Eve extrait automatiquement plats, prix et créneaux.",
                    },
                    {
                      n: "2",
                      t: "Eve te propose des offres personnalisées",
                      d: "Basées sur tes prix, tes créneaux creux, et ce qui marche déjà dans ta zone.",
                    },
                    {
                      n: "3",
                      t: "Tu approuves et tu publies",
                      d: "15 $/semaine ou 40 $/mois par offre publiée. Modifiable et retirable à tout moment.",
                    },
                  ].map((step) => (
                    <li key={step.n} className="flex items-start gap-4">
                      <span className="w-8 h-8 rounded-full bg-gold text-charcoal flex items-center justify-center text-[13px] font-extrabold shrink-0">
                        {step.n}
                      </span>
                      <div>
                        <p className="text-[12px] font-bold tracking-[0.08em] text-cream leading-[1.4] mb-1.5 normal-case">
                          {step.t}
                        </p>
                        <p className="text-[10px] tracking-[0.1em] text-cream/60 leading-[1.7] normal-case">
                          {step.d}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Right: Pricing card */}
            <div className="bg-gradient-to-br from-gold to-[#a88a52] rounded-[28px] p-8 sm:p-10 relative overflow-hidden flex flex-col shadow-[0_30px_60px_-25px_rgba(201,169,110,0.5)]">
              <div className="relative flex-1 flex flex-col text-charcoal">
                <p className="text-[10px] font-bold tracking-[0.32em] text-charcoal/70 mb-6">
                  Publier une offre
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-charcoal/10 border border-charcoal/15 rounded-2xl p-5">
                    <p className="text-[9px] font-bold tracking-[0.22em] text-charcoal/60 mb-2">
                      Semaine
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-[36px] font-extrabold text-charcoal leading-none">
                        $15
                      </span>
                      <span className="text-[11px] tracking-[0.1em] text-charcoal/60">
                        /sem
                      </span>
                    </div>
                  </div>
                  <div className="bg-charcoal border border-charcoal rounded-2xl p-5">
                    <p className="text-[9px] font-bold tracking-[0.22em] text-gold mb-2">
                      Mois
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-[36px] font-extrabold text-cream leading-none">
                        $40
                      </span>
                      <span className="text-[11px] tracking-[0.1em] text-cream/60">
                        /mois
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-[10px] tracking-[0.14em] text-charcoal/75 leading-[1.75] mb-5 normal-case">
                  Par offre publiée, peu importe ton forfait. Le forfait <b className="text-charcoal">Paradise</b> inclut <b className="text-charcoal">2 publications gratuites/mois</b>.
                </p>
                <div className="bg-charcoal/10 rounded-xl p-4 mt-auto">
                  <p className="text-[9px] font-bold tracking-[0.22em] text-charcoal/50 mb-3">
                    Exemples d&apos;offres proposées
                  </p>
                  <ul className="list-none space-y-2">
                    {EVE_OFFER_EXAMPLES.slice(0, 3).map((ex) => (
                      <li
                        key={ex}
                        className="text-[10px] tracking-[0.06em] text-charcoal/85 leading-[1.6] normal-case flex items-start gap-2"
                      >
                        <span className="text-rose shrink-0 mt-0.5">→</span>
                        {ex}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-[90px] border-t border-gold/10">
        <div className="max-w-[1000px] mx-auto">
          <p className="text-[10px] font-bold tracking-[0.32em] text-rose mb-5 text-center">
            Comment ça marche
          </p>
          <h2 className="font-sans text-[28px] sm:text-[36px] font-extrabold tracking-[0.02em] text-cream mb-12 text-center leading-[1.2]">
            Trois{" "}
            <Script className="text-gold text-[44px] sm:text-[56px] inline-block leading-[0.9]">
              étapes
            </Script>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {HOW_IT_WORKS.map((step) => (
              <div
                key={step.title}
                className="bg-[#221c17] border border-gold/15 rounded-[20px] p-7 relative overflow-hidden"
              >
                <div
                  className="absolute inset-0 opacity-25 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at 100% 0%, rgba(201, 169, 110, 0.4) 0%, transparent 55%)",
                  }}
                />
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gold text-charcoal flex items-center justify-center font-extrabold text-[16px] mb-5">
                    {step.icon}
                  </div>
                  <h3 className="text-[12px] font-bold tracking-[0.14em] text-cream mb-3 leading-[1.4]">
                    {step.title}
                  </h3>
                  <p className="text-[10px] tracking-[0.1em] text-cream/60 leading-[1.85] normal-case">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="px-6 py-[90px] border-t border-gold/10">
        <div className="max-w-[1000px] mx-auto">
          <p className="text-[10px] font-bold tracking-[0.32em] text-rose mb-5 text-center">
            Avantages
          </p>
          <h2 className="font-sans text-[28px] sm:text-[36px] font-extrabold tracking-[0.02em] text-cream mb-12 text-center leading-[1.2]">
            Ce que tu{" "}
            <Script className="text-gold text-[44px] sm:text-[56px] inline-block leading-[0.9]">
              gagnes
            </Script>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {ADVANTAGES.map((adv) => (
              <div
                key={adv.title}
                className="bg-[#221c17] border border-gold/15 rounded-[20px] p-7"
              >
                <h3 className="text-[12px] font-bold tracking-[0.14em] text-cream mb-3">
                  <span className="text-gold mr-2">✓</span>
                  {adv.title}
                </h3>
                <p className="text-[10px] tracking-[0.1em] text-cream/60 leading-[1.8] normal-case">
                  {adv.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-[90px] border-t border-gold/10">
        <div className="max-w-[820px] mx-auto">
          <p className="text-[10px] font-bold tracking-[0.32em] text-rose mb-5 text-center">
            Questions fréquentes
          </p>
          <h2 className="font-sans text-[28px] sm:text-[36px] font-extrabold tracking-[0.02em] text-cream mb-12 text-center leading-[1.2]">
            On répond à{" "}
            <Script className="text-gold text-[44px] sm:text-[56px] inline-block leading-[0.9]">
              tout
            </Script>
          </h2>
          <div className="space-y-4">
            {FAQ.map((item) => (
              <details
                key={item.q}
                className="group bg-[#221c17] border border-gold/15 rounded-[18px] overflow-hidden hover:border-gold/30 transition-colors"
              >
                <summary className="cursor-pointer px-6 py-5 flex items-center justify-between gap-4 list-none">
                  <span className="text-[12px] font-bold tracking-[0.1em] text-cream leading-[1.5] normal-case">
                    {item.q}
                  </span>
                  <span className="text-gold text-[18px] shrink-0 group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-5 -mt-1 text-[10px] tracking-[0.08em] text-cream/60 leading-[1.9] normal-case">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Inscription form */}
      <section id="inscription" className="px-6 py-[110px] border-t border-gold/10 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-60"
          style={{
            background:
              "radial-gradient(ellipse at 50% 100%, rgba(201, 169, 110, 0.16) 0%, transparent 60%)",
          }}
        />
        <div className="max-w-[680px] mx-auto relative">
          <p className="text-[10px] font-bold tracking-[0.32em] text-rose mb-5 text-center">
            Inscription
          </p>
          <h2 className="font-sans text-[28px] sm:text-[36px] font-extrabold tracking-[0.02em] text-cream mb-3 text-center leading-[1.2]">
            Rejoins la{" "}
            <Script className="text-gold text-[44px] sm:text-[56px] inline-block leading-[0.9]">
              liste d&apos;attente
            </Script>
          </h2>
          <p className="text-center text-[11px] tracking-[0.14em] text-cream/55 mb-10 leading-[1.85] normal-case">
            Lancement aux businesses prévu dans les prochaines semaines. Soumets ton commerce maintenant pour passer en priorité.
          </p>

          {submitted ? (
            <div className="bg-[#221c17] border border-gold/25 rounded-[24px] p-10 sm:p-12 text-center">
              <p className="font-script text-[48px] sm:text-[60px] text-gold mb-3 leading-none">
                merci ✨
              </p>
              <p className="text-[11px] tracking-[0.14em] text-cream mb-2 leading-[1.7]">
                Ta demande a été reçue.
              </p>
              <p className="text-[10px] tracking-[0.12em] text-cream/60 leading-[1.8] normal-case max-w-md mx-auto">
                On revient vers toi dans les 24-48 heures ouvrables avec les prochaines étapes (vérification + activation du compte).
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-[#221c17] border border-gold/20 rounded-[24px] p-7 sm:p-10 space-y-6"
            >
              <FormField label="Nom du commerce *">
                <input
                  type="text"
                  name="businessName"
                  required
                  placeholder="Ex : Vignoble du Lac"
                  className={INPUT_CLASS}
                />
              </FormField>

              <FormField label="Type d'établissement *">
                <select
                  name="businessType"
                  required
                  defaultValue=""
                  className={INPUT_CLASS}
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
                    className={INPUT_CLASS}
                  />
                </FormField>

                <FormField label="Téléphone">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+1 514 555-0100"
                    className={INPUT_CLASS}
                  />
                </FormField>
              </div>

              <FormField label="Site web ou réseaux sociaux *">
                <input
                  type="url"
                  name="website"
                  required
                  placeholder="https://"
                  className={INPUT_CLASS}
                />
              </FormField>

              <FormField label="Numéro de TPS/TVQ *">
                <input
                  type="text"
                  name="taxNumber"
                  required
                  placeholder="123456789RT0001"
                  className={INPUT_CLASS}
                />
              </FormField>

              <FormField label="Adresse de facturation *">
                <textarea
                  name="billingAddress"
                  required
                  rows={2}
                  placeholder="Rue, ville, code postal"
                  className={`${INPUT_CLASS} resize-none`}
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
                  className={`${INPUT_CLASS} resize-none`}
                />
              </FormField>

              <FormField label="Forfait qui t'intéresse *">
                <select
                  name="tier"
                  required
                  defaultValue=""
                  className={INPUT_CLASS}
                >
                  <option value="" disabled>
                    Choisis un forfait
                  </option>
                  <option value="genesis">Genesis — 10 $/mois + 2 $/réservation</option>
                  <option value="utopia">Utopia — 99 $/mois (100 résas incluses)</option>
                  <option value="paradise">Paradise — 299 $/mois (illimité + 2 offres)</option>
                  <option value="pas_sur">Je ne sais pas encore</option>
                </select>
              </FormField>

              <div className="bg-gold/10 border border-gold/25 rounded-[16px] p-5">
                <label className="flex items-start gap-3 cursor-pointer mb-4">
                  <input
                    type="checkbox"
                    name="interestedInSponsoring"
                    className="mt-1 w-4 h-4 accent-gold cursor-pointer"
                  />
                  <span className="text-[11px] font-bold tracking-[0.12em] text-cream leading-[1.5] normal-case">
                    Je veux qu&apos;Eve me suggère des offres à publier (15 $/sem ou 40 $/mois par offre)
                  </span>
                </label>
                <FormField label="Une offre à laquelle tu penses déjà" hint="(optionnel)">
                  <textarea
                    name="sponsoredOffer"
                    rows={2}
                    placeholder="Ex : 2 pour 1 sur les cocktails, menu dégustation -20 %, dessert offert..."
                    className={`${INPUT_CLASS} resize-none`}
                  />
                </FormField>
              </div>

              {errorMsg && (
                <div className="bg-rose/15 border border-rose/40 text-rose text-[10px] font-semibold tracking-[0.12em] px-4 py-3 rounded-lg leading-[1.6] normal-case">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className={`w-full py-4 rounded-full text-[11px] font-bold tracking-[0.22em] transition-all cursor-pointer mt-2 ${
                  submitting
                    ? "bg-gold/40 text-charcoal/50 cursor-not-allowed"
                    : "bg-gold text-charcoal hover:bg-cream hover:-translate-y-0.5"
                }`}
              >
                {submitting ? "Envoi en cours..." : "Envoyer ma demande →"}
              </button>

              <p className="text-center text-[9px] tracking-[0.18em] text-cream/50 mt-3 leading-[1.7] normal-case">
                On revient vers toi dans 24-48 heures ouvrables. Aucune carte requise pour s&apos;inscrire à la liste.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* Footer link */}
      <footer className="px-6 py-12 border-t border-gold/15 text-center">
        <Link
          href="/"
          className="font-script text-[24px] text-cream hover:text-gold transition-colors"
        >
          ← Retour côté Eve
        </Link>
      </footer>
    </main>
  );
}

const INPUT_CLASS =
  "w-full px-5 py-3.5 border-[1.5px] border-gold/25 rounded-xl text-[12px] font-medium tracking-[0.1em] text-cream bg-charcoal/60 outline-none focus:border-gold transition-colors placeholder:text-cream/30";

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
      <label className="block text-[10px] font-bold tracking-[0.22em] text-gold/85 mb-3">
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
