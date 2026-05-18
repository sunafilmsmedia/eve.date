import { ComingSoon } from "@/components/ComingSoon";

export default function NewDatePage() {
  return (
    <ComingSoon
      title="Nouvelle date"
      emoji="✨"
      description="Crée une nouvelle idée de date pour Eve."
      tasks={[
        "Form multi-étapes : infos générales, étapes, budget, transport",
        "Sélection de la ville (Montréal, Laval, Brossard, Magog)",
        "Sélection de la catégorie",
        "Champs Pro : adresses exactes, liens de réservation, conseils",
        "Aperçu en temps réel de la carte",
      ]}
    />
  );
}
