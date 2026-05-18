import { ComingSoon } from "@/components/ComingSoon";

export default function SettingsPage() {
  return (
    <ComingSoon
      title="Paramètres"
      emoji="⚙️"
      description="Configuration de l'application Eve."
      tasks={[
        "Gestion des catégories (ajout, renommage, ordre d'affichage)",
        "Gestion des villes disponibles",
        "Tarif Eve Pro (mensuel/annuel)",
        "Configuration Stripe pour les paiements",
        "Configuration Resend pour les emails transactionnels",
        "Gestion des admins (ajouter d'autres emails admin)",
      ]}
    />
  );
}
