import type { Metadata } from "next";
import { StartChoice } from "@/components/StartChoice";

export const metadata: Metadata = {
  title: "Commencer · Eve AI",
};

export default function StartPage() {
  return <StartChoice />;
}
