import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Examples } from "@/components/Examples";
import { Categories } from "@/components/Categories";
import { Pricing } from "@/components/Pricing";
import { Suggestions } from "@/components/Suggestions";
import { Waitlist } from "@/components/Waitlist";
import { Footer } from "@/components/Footer";
import { FadeInObserver } from "@/components/FadeInObserver";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <HowItWorks />
      <Examples />
      <Categories />
      <Pricing />
      <Suggestions />
      <Waitlist />
      <Footer />
      <FadeInObserver />
    </>
  );
}
