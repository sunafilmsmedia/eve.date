import type { Metadata } from "next";
import { BusinessLanding } from "@/components/BusinessLanding";

export const metadata: Metadata = {
  title: "Adam · Le côté partenaires d'Eve AI",
  description:
    "Fais-toi recommander aux gens qui cherchent quoi faire. 3 forfaits — Genesis, Utopia, Paradise — dès 10 $/mois. Paiement direct chez toi.",
};

export default function BusinessPage() {
  return <BusinessLanding />;
}
