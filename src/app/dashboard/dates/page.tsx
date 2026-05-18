import { ComingSoon } from "@/components/ComingSoon";

export default function DatesPage() {
  return (
    <ComingSoon
      title="Dates"
      emoji="🌹"
      description="Gère le catalogue d'idées de dates affichées dans Eve. Ajoute, modifie, archive — chaque date peut être assignée à une catégorie et une ville."
      tasks={[
        "Créer la table 'dates' dans Supabase (titre, description, étapes, ville, catégorie, budget, durée, transport)",
        "Form de création/édition d'une date",
        "Liste des dates avec recherche et filtres",
        "Upload d'images pour chaque date (Supabase Storage)",
        "Mode publié/brouillon",
      ]}
    />
  );
}
