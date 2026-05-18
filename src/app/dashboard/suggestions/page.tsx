import { ComingSoon } from "@/components/ComingSoon";

export default function SuggestionsPage() {
  return (
    <ComingSoon
      title="Suggestions"
      emoji="💡"
      description="Approuve ou rejette les idées de dates soumises par la communauté."
      tasks={[
        "Créer la table 'suggestions' dans Supabase",
        "Connecter le formulaire de la landing page",
        "Vue en cards : nom, ville, étapes, email du soumetteur",
        "Boutons Approuver (convertit en date) / Rejeter / Demander plus d'infos",
        "Notification email au soumetteur quand acceptée",
      ]}
    />
  );
}
