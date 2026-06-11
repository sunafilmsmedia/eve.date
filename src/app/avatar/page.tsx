import type { Metadata } from "next";
import { SetupDispatcher } from "@/components/setup/SetupDispatcher";

export const metadata: Metadata = {
  title: "Configurer ta sortie · Eve AI",
};

export default function AvatarPage() {
  return <SetupDispatcher />;
}
