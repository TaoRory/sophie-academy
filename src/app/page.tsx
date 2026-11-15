import { FloatingCta } from "@/components/FloatingCta";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LeadProvider } from "@/components/LeadContext";
import { AnnouncementBar } from "@/sections/AnnouncementBar";
import { Estimator } from "@/sections/Estimator";
import { Faq } from "@/sections/Faq";
import { FixTheMistake } from "@/sections/FixTheMistake";
import { FinalCta } from "@/sections/FinalCta";
import { HallOfFame } from "@/sections/HallOfFame";
import { Hero } from "@/sections/Hero";
import { HowOnline } from "@/sections/HowOnline";
import { Journey } from "@/sections/Journey";
import { Reviews } from "@/sections/Reviews";
import { Statement } from "@/sections/Statement";
import { Teachers } from "@/sections/Teachers";
import { Values } from "@/sections/Values";

// Bố cục theo DOL English + chất riêng "Bút sửa bài" (spec: .claude/skills/sophie-section/sections/pen-identity.md).
export default function Home() {
  return (
    <LeadProvider>
      <AnnouncementBar />
      <Header />
      <main>
        <Hero />
        <HallOfFame />
        <Statement />
        <Values />
        <FixTheMistake />
        <Journey />
        <Teachers />
        <Reviews />
        <HowOnline />
        <Estimator />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <FloatingCta />
    </LeadProvider>
  );
}
