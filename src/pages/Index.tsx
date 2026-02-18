import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import RecentListings from "@/components/RecentListings";
import EcosystemSites from "@/components/EcosystemSites";
import CTASection from "@/components/CTASection";
import TrustIndicators from "@/components/TrustIndicators";
import TongassNewsAd from "@/components/TongassNewsAd";
import BetaBanner from "@/components/BetaBanner";
import RegionsSection from "@/components/RegionsSection";
import CategoriesSection from "@/components/CategoriesSection";
import EmpireNetwork from "@/components/EmpireNetwork";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <BetaBanner />
      <Header />
      <main>
        <HeroSection />
        <TrustIndicators />
        <RegionsSection />
        <CategoriesSection />
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-5xl">
            <TongassNewsAd />
          </div>
        </section>
        <EcosystemSites />
        <RecentListings />
        <CTASection />
        <EmpireNetwork currentSite="tongass-listings" />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
