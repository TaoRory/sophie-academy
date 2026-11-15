import { FloatingCta } from "@/components/FloatingCta";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { CatCompanion } from "@/components/cat/CatCompanion";
import { LeadProvider } from "@/components/LeadContext";
import { Comparison } from "@/sections/Comparison";
import { Estimator } from "@/sections/Estimator";
import { Faq } from "@/sections/Faq";
import { Feedback } from "@/sections/Feedback";
import { FinalCta } from "@/sections/FinalCta";
import { Hero } from "@/sections/Hero";
import { HowOnline } from "@/sections/HowOnline";
import { PainPoints } from "@/sections/PainPoints";
import { ResultStrip } from "@/sections/ResultStrip";
import { Results } from "@/sections/Results";
import { Roadmap } from "@/sections/Roadmap";
import { Teachers } from "@/sections/Teachers";

export default function Home() {
  return (
    <LeadProvider>
      <Header />
      <main>
        <Hero />
        <ResultStrip />
        <PainPoints />
        <Comparison />
        <Roadmap />
        <Estimator />
        <Teachers />
        <Results />
        <Feedback />
        <HowOnline />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <FloatingCta />
      <CatCompanion />
    </LeadProvider>
  );
}
