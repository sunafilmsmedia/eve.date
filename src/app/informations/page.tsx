import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Examples } from "@/components/Examples";
import { Categories } from "@/components/Categories";
import { FounderOffer } from "@/components/FounderOffer";
import { Pricing } from "@/components/Pricing";
import { EdenReward } from "@/components/EdenReward";
import { BusinessPartner } from "@/components/BusinessPartner";
import { Suggestions } from "@/components/Suggestions";
import { Waitlist } from "@/components/Waitlist";
import { Footer } from "@/components/Footer";
import { FadeInObserver } from "@/components/FadeInObserver";

export const metadata: Metadata = {
  title: "Informations · Eve AI",
  description:
    "Tout sur Eve AI : comment ça marche, catégories de dates, tarifs, récompense Édén, côté partenaires (Adam).",
};

export default function InformationsPage() {
  return (
    <>
      <Nav />
      <Hero />
      <HowItWorks />
      <Examples />
      <Categories />
      <FounderOffer />
      <Pricing />
      <EdenReward />
      <BusinessPartner />
      <Suggestions />
      <Waitlist />
      <Footer />
      <FadeInObserver />
    </>
  );
}
