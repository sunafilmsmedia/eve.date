import type { Metadata } from "next";
import { BusinessLanding } from "@/components/BusinessLanding";

export const metadata: Metadata = {
  title: "Pour les commerces · Eve AI",
  description:
    "Fais-toi recommander aux gens qui cherchent quoi faire. 10 $/mois + 1-3 $ par réservation, paiement direct chez toi.",
};

export default function BusinessPage() {
  return <BusinessLanding />;
}
