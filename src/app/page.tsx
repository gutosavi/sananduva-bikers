import { AboutSection } from "@/components/home/about-section";
import { GallerySection } from "@/components/home/gallery-section";
import { HeroSection } from "@/components/home/hero-section";
import { RoutesSection } from "@/components/home/routes-section";
import { SponsorSection } from "@/components/home/sponsor-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteNavBar } from "@/components/site-navbar";

export default function Home() {
  return (
    <div>
      <SiteNavBar />
      <main>
        <HeroSection />
        <AboutSection />
        <RoutesSection />
        <SponsorSection />
        <GallerySection />
      </main>
      <SiteFooter />
    </div>
  );
}
