import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Sparkles, Users, Shield, ChevronDown } from "lucide-react";

const Hero = () => {
  const { t } = useTranslation();
  return (
    <section id="main-content" className="relative min-h-screen gradient-hero flex items-center justify-center overflow-hidden pt-20 sm:pt-24 md:pt-28">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-56 sm:w-72 md:w-80 h-56 sm:h-72 md:h-80 bg-trust/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 sm:mb-6"
          >
            <span className="trust-badge text-xs sm:text-sm">
              <Sparkles className="w-3.5 h-3.5" />
              {t("hero.badge")}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight mb-4 sm:mb-6"
          >
            {t("hero.title")}
            <br />
            <span className="text-primary">{t("hero.titleHighlight")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-10 px-1"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
          >
            <div className="flex flex-col items-center text-center p-4 sm:p-6 rounded-2xl bg-card shadow-soft">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-trust/10 flex items-center justify-center mb-3 sm:mb-4">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-trust" />
              </div>
              <h3 className="font-serif text-base sm:text-lg font-semibold mb-1 sm:mb-2">{t("hero.trust1Title")}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">{t("hero.trust1Desc")}</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 sm:p-6 rounded-2xl bg-card shadow-soft">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-peer/10 flex items-center justify-center mb-3 sm:mb-4">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-peer" />
              </div>
              <h3 className="font-serif text-base sm:text-lg font-semibold mb-1 sm:mb-2">{t("hero.trust2Title")}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">{t("hero.trust2Desc")}</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 sm:p-6 rounded-2xl bg-card shadow-soft">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-organic/10 flex items-center justify-center mb-3 sm:mb-4">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-organic" />
              </div>
              <h3 className="font-serif text-base sm:text-lg font-semibold mb-1 sm:mb-2">{t("hero.trust3Title")}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">{t("hero.trust3Desc")}</p>
            </div>
          </motion.div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          const el = document.getElementById("home-discover-section");
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
        className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 inline-flex flex-col items-center text-xs text-muted-foreground hover:text-foreground focus:outline-none"
      >
        <span className="mb-1 tracking-wide uppercase">{t("hero.scrollHint")}</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </button>
    </section>
  );
};

export default Hero;
