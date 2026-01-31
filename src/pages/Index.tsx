import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import DiscoverSection from "@/components/DiscoverSection";
import RecommendationSection from "@/components/RecommendationSection";
import ArtistsSection from "@/components/ArtistsSection";
import PrinciplesSection from "@/components/PrinciplesSection";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import AuthDialog from "@/components/AuthDialog";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [authDialogOpen, setAuthDialogOpen] = useState(false);

  const handleStartExploring = () => {
    if (user) {
      navigate("/discover");
    } else {
      setAuthDialogOpen(true);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      {/* Artist shortcut: add artwork */}
      {user?.role === "artist" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.25 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <Button
            asChild
            size="icon"
            className="h-14 w-14 rounded-full shadow-card hover:shadow-hover gradient-trust text-primary-foreground hover:opacity-95 transition-all"
            aria-label="Add artwork"
          >
            <Link to="/artist/dashboard?post=1">
              <Plus className="w-7 h-7" />
            </Link>
          </Button>
        </motion.div>
      )}
      <Hero />
      <DiscoverSection />
      <RecommendationSection />
      <ArtistsSection />
      <PrinciplesSection />
      <section className="py-12 sm:py-16 border-t border-border bg-background">
        <div className="container mx-auto px-4 sm:px-6 text-center max-w-3xl">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 sm:mb-4">
            {t("hero.ctaHeading")}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
            {t("hero.ctaSubtitle")}
          </p>
          <Button 
            onClick={handleStartExploring}
            size="lg" 
            className="mt-4 gradient-trust text-primary-foreground px-6 sm:px-8 shadow-card hover:shadow-hover"
          >
            {t("hero.cta")}
          </Button>
        </div>
      </section>
      <Footer />
      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} defaultTab="signup" />
    </div>
  );
};

export default Index;
