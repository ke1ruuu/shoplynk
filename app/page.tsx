import { Navbar } from "@/components/landing/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { MarketplaceSection } from "@/components/landing/marketplace-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { AboutSection } from "@/components/landing/about-section";
import { ForSellersSection } from "@/components/landing/for-sellers-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { CTASection } from "@/components/landing/cta-section";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <MarketplaceSection />
        <HowItWorksSection />
        <ForSellersSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

