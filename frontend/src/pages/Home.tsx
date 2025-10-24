import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";
import PhilippinesMapSection from "@/components/home/PhilippinesMapSection";
import PrefabVsContainerSection from "@/components/home/PrefabVsContainerSection";
import PrefabVsConventionalSection from "@/components/home/PrefabVsConventionalSection";
import TechnicalDataSection from "@/components/home/TechnicalDataSection";
import ContainerUnitDetailsSection from "@/components/home/ContainerUnitDetailsSection";
import CreativeDesignsCarousel from "@/components/home/CreativeDesignsCarousel";
import Layout from "@/components/Layout";
import StatisticsSection from "@/components/home/StatisticsSection";
import Banner from "@/components/home/Banner";
import Collections from "@/components/home/Collections";
import Section from "@/components/home/ElegantFeatureSection";
import ElegantFeaturesSection from "@/components/home/ElegantFeatureSection";
import Featured from "@/components/home/Featured";

const Home = () => {
  return (
    <Layout>
      <div className="min-h-screen relative">
        {/* 1. HERO - First Impression & Value Proposition */}
        <div className="animate-fade-in">
          <HeroSection />
        </div>

        {/* 2. TRUST SIGNALS - Build Credibility Immediately */}
        <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <Banner />
        </div>

        <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <StatisticsSection />
        </div>

        {/* 3. FEATURED HIGHLIGHTS - What Makes You Special */}
        <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <Featured />
        </div>

        {/* 4. PRODUCT SHOWCASE - Main Offerings */}
        <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <Collections />
        </div>

        <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <CreativeDesignsCarousel />
        </div>

        {/* 5. KEY FEATURES - Benefits & Advantages */}
        <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <FeaturesSection />
        </div>

        <div className="animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <ElegantFeaturesSection />
        </div>

        {/* 6. TECHNICAL DETAILS - Deep Dive for Serious Buyers */}
        <div className="animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <TechnicalDataSection />
        </div>

        <div className="animate-fade-in" style={{ animationDelay: "0.7s" }}>
          <ContainerUnitDetailsSection />
        </div>

        {/* 7. COMPARISONS - Why Choose Us Over Alternatives */}
        <div className="animate-fade-in" style={{ animationDelay: "0.8s" }}>
          <PrefabVsContainerSection />
        </div>

        <div className="animate-fade-in" style={{ animationDelay: "0.9s" }}>
          <PrefabVsConventionalSection />
        </div>

        {/* 8. SOCIAL PROOF - Customer Validation */}
        <div className="animate-fade-in" style={{ animationDelay: "1.0s" }}>
          <TestimonialsSection />
        </div>

        {/* 9. LOCATION & REACH - Service Area */}
        <div className="animate-fade-in" style={{ animationDelay: "1.1s" }}>
          <PhilippinesMapSection />
        </div>

        {/* 10. FINAL CTA - Convert Visitors to Leads */}
        <div className="animate-fade-in" style={{ animationDelay: "1.2s" }}>
          <CTASection />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
