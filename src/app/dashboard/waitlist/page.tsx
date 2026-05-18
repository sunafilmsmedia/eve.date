import { ComingSoon } from "@/components/ComingSoon";

export default function WaitlistPage() {
  return (
    <ComingSoon
      title="Inscrits waitlist"
      emoji="📧"
      description="Liste des personnes inscrites pour l'accès anticipé à Eve."
      tasks={[
        "Créer la table 'waitlist' dans Supabase (email, date d'inscription, ville)",
        "Connecter le formulaire de la landing page",
        "Liste paginée des inscrits",
        "Export CSV",
        "Envoi d'emails groupés (Resend ou Supabase)",
      ]}
    />
  );
}
