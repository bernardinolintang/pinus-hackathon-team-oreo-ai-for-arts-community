import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation();

  useDocumentTitle(t("notFound.heading"));

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content" className="pt-20 sm:pt-24 pb-12 md:pb-16">
        <div className="container mx-auto px-4 sm:px-6 flex min-h-[60vh] items-center justify-center">
          <div className="text-center max-w-md">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-2">{t("notFound.title")}</h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-4 sm:mb-6">{t("notFound.heading")}</p>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
              {t("notFound.description")}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button size="lg" asChild>
                <Link to="/">{t("notFound.home")}</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/discover">{t("notFound.discover")}</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/artists">{t("notFound.artists")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
