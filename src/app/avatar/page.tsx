import type { Metadata } from "next";
import { AvatarForm } from "@/components/AvatarForm";

export const metadata: Metadata = {
  title: "Créer l'avatar · Eve AI",
};

export default function AvatarPage() {
  return <AvatarForm />;
}
