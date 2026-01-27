import Header from "@/components/Header";
import Hero from "@/components/Hero";
import DiscoverSection from "@/components/DiscoverSection";
import RecommendationSection from "@/components/RecommendationSection";
import ArtistsSection from "@/components/ArtistsSection";
import PrinciplesSection from "@/components/PrinciplesSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <DiscoverSection />
      <RecommendationSection />
      <ArtistsSection />
      <PrinciplesSection />
      <Footer />
    </div>
  );
};

export default Index;
