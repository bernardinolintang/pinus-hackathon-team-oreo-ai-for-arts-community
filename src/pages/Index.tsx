import Header from "@/components/Header";
import Hero from "@/components/Hero";
import DiscoverSection from "@/components/DiscoverSection";
import RecommendationSection from "@/components/RecommendationSection";
import ArtistsSection from "@/components/ArtistsSection";
import PrinciplesSection from "@/components/PrinciplesSection";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <DiscoverSection />
      <RecommendationSection />
      <ArtistsSection />
      <PrinciplesSection />
      {/* Bottom call-to-action so visitors see a clear next step after scrolling */}
      <section className="py-16 border-t border-border bg-background">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
            Loved what you see?
          </h2>
          <p className="text-muted-foreground mb  -6">
            Dive into the full marketplace to explore hundreds of pieces and
            follow the artists that inspire you most.
          </p>
          <Button asChild size="lg" className="mt-4 gradient-trust text-primary-foreground px-8 shadow-card hover:shadow-hover">
            <Link to="/discover">Start Exploring</Link>
          </Button>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Index;
