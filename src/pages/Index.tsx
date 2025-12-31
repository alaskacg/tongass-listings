import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import RecentListings from "@/components/RecentListings";
import EcosystemSites from "@/components/EcosystemSites";
import CTASection from "@/components/CTASection";
import TrustIndicators from "@/components/TrustIndicators";
import TongassNewsAd from "@/components/TongassNewsAd";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <TrustIndicators />
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-5xl">
            <TongassNewsAd />
          </div>
        </section>
        <EcosystemSites />
        <RecentListings />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
