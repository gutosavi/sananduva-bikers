import { AboutSection } from "@/components/home/about-section";
import { EventRecapSection } from "@/components/home/event-recap-section";
import { EventSection } from "@/components/home/event-section";
import { FaqSection } from "@/components/home/faq-section";
import { HeroSection } from "@/components/home/hero-section";
import { SponsorSection } from "@/components/home/sponsor-section";
import { StatsSection } from "@/components/home/stats-section";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteNavBar } from "@/components/shared/site-navbar";

export default function Home() {
  return (
    <div className="min-h-screen">
      <SiteNavBar />
      <main>
        <HeroSection />
        <AboutSection />
        <StatsSection />
        <EventSection />
        <EventRecapSection />
        <FaqSection />
        <SponsorSection />
      </main>
      <SiteFooter />
    </div>
  );
}
