import Link from "next/link";
import { Script } from "@/components/Script";

const STATS = [
  { label: "Dates publiées", value: "0", change: "—", href: "/dashboard/dates" },
  { label: "Inscrits waitlist", value: "0", change: "—", href: "/dashboard/waitlist" },
  { label: "Suggestions reçues", value: "0", change: "—", href: "/dashboard/suggestions" },
  { label: "Ratings moyens", value: "—", change: "—", href: "/dashboard/dates" },
];

const QUICK_ACTIONS = [
  {
    icon: "✨",
    title: "Ajouter une date",
    desc: "Crée une nouvelle idée de date pour la communauté.",
    href: "/dashboard/dates/new",
  },
  {
    icon: "📧",
    title: "Exporter les inscrits",
    desc: "Télécharge la liste des emails de la waitlist.",
    href: "/dashboard/waitlist",
  },
  {
    icon: "💡",
    title: "Revoir les suggestions",
    desc: "Approuve ou rejette les idées soumises par les utilisateurs.",
    href: "/dashboard/suggestions",
  },
  {
    icon: "⚙️",
    title: "Paramètres",
    desc: "Configurer l'application, Stripe, emails, etc.",
    href: "/dashboard/settings",
  },
];

export default function DashboardHome() {
  return (
    <>
      <h1 className="font-sans text-[28px] sm:text-[36px] font-extrabold tracking-[0.02em] text-charcoal mb-3 leading-[1.15]">
        Tableau de <Script className="text-rose text-[48px] sm:text-[60px] inline-block leading-[0.9]">bord</Script>
      </h1>
      <p className="text-[11px] tracking-[0.18em] text-muted mb-12 leading-[1.7] max-w-xl">
        Un aperçu rapide de l&apos;activité d&apos;Eve. Les fonctionnalités seront activées au fur et à mesure du développement.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
        {STATS.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="bg-warm-white border border-rose/12 rounded-[18px] p-6 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(200,114,90,0.12)] transition-all"
          >
            <p className="text-[9px] font-bold tracking-[0.22em] text-muted mb-3">
              {s.label}
            </p>
            <p className="font-sans text-[36px] font-extrabold text-charcoal leading-none mb-2">
              {s.value}
            </p>
            <p className="text-[9px] tracking-[0.2em] text-rose">{s.change}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <h2 className="text-[10px] font-bold tracking-[0.32em] text-rose mb-5">
        Actions rapides
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
        {QUICK_ACTIONS.map((a) => (
          <Link
            key={a.title}
            href={a.href}
            className="bg-warm-white border border-rose/12 rounded-[18px] p-7 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(200,114,90,0.12)] transition-all flex items-start gap-5"
          >
            <span className="text-[32px] leading-none mt-1">{a.icon}</span>
            <div>
              <h3 className="text-[12px] font-bold tracking-[0.18em] text-charcoal mb-2">
                {a.title}
              </h3>
              <p className="text-[10px] tracking-[0.14em] text-muted leading-[1.7]">
                {a.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Setup Status */}
      <div className="bg-light-gold/30 border border-gold/30 rounded-[18px] p-8">
        <h2 className="text-[10px] font-bold tracking-[0.32em] text-deep-rose mb-3">
          Prochaines étapes
        </h2>
        <p className="font-sans text-[16px] font-bold tracking-[0.08em] text-charcoal mb-4">
          Eve est en mode <Script className="text-rose text-[26px] inline-block">scaffold</Script>
        </p>
        <ul className="space-y-2 text-[10px] tracking-[0.14em] text-muted leading-[1.7]">
          <li>✓ Authentification configurée (Supabase)</li>
          <li>✓ Dashboard admin opérationnel</li>
          <li>○ Créer les tables Supabase (dates, ratings, waitlist, suggestions)</li>
          <li>○ Connecter le formulaire de waitlist à la base de données</li>
          <li>○ Page de gestion des dates (CRUD)</li>
          <li>○ Système de ratings + activités populaires</li>
          <li>○ Intégration Stripe pour Eve Pro</li>
        </ul>
      </div>
    </>
  );
}
