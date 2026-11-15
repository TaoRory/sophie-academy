import { FloatingCta } from "@/components/FloatingCta";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LeadProvider } from "@/components/LeadContext";
import { AnnouncementBar } from "@/sections/AnnouncementBar";
import { Estimator } from "@/sections/Estimator";
import { Faq } from "@/sections/Faq";
import { FinalCta } from "@/sections/FinalCta";
import { HallOfFame } from "@/sections/HallOfFame";
import { Hero } from "@/sections/Hero";
import { HowOnline } from "@/sections/HowOnline";
import { Journey } from "@/sections/Journey";
import { Reviews } from "@/sections/Reviews";
import { Teachers } from "@/sections/Teachers";
import { Values } from "@/sections/Values";

// Bố cục theo DOL English (owner yêu cầu 15/11/2026), màu và dữ kiện của Sophie.
export default function Home() {
  return (
    <LeadProvider>
      <AnnouncementBar />
      <Header />
      <main>
        <Hero />
        <HallOfFame />
        <Values />
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
