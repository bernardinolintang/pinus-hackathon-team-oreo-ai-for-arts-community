import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Shield, Award, Users, Eye, Lock, FileCheck, GitBranch } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const sectionKeys = [
  { icon: GitBranch, titleKey: "trustPage.socialGraphs", contentKey: "trustPage.socialGraphsContent" },
  { icon: Shield, titleKey: "trustPage.peerTrust", contentKey: "trustPage.peerTrustContent" },
  { icon: Award, titleKey: "trustPage.reputation", contentKey: "trustPage.reputationContent" },
  { icon: Users, titleKey: "trustPage.expertEndorsement", contentKey: "trustPage.expertEndorsementContent" },
  { icon: Eye, titleKey: "trustPage.transparency", contentKey: "trustPage.transparencyContent" },
  { icon: Lock, titleKey: "trustPage.safetyRespect", contentKey: "trustPage.safetyRespectContent" },
  { icon: FileCheck, titleKey: "trustPage.ethicalModeration", contentKey: "trustPage.ethicalModerationContent" },
];

const Trust = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content" className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
              {t("trustPage.title")}
            </h1>
            <p className="text-muted-foreground mb-10">
              {t("trustPage.intro")}
            </p>

            <div className="space-y-8">
              {sectionKeys.map((section, i) => {
                const Icon = section.icon;
                return (
                  <motion.div
                    key={section.titleKey}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex gap-4"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="font-serif text-xl font-semibold mb-2">{t(section.titleKey)}</h2>
                      <p className="text-muted-foreground leading-relaxed">{t(section.contentKey)}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-12 p-6 rounded-2xl bg-card border border-border">
              <p className="text-sm text-muted-foreground mb-4">
                {t("trustPage.participateIntro")}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/community">
                  <span className="text-primary font-medium hover:underline">{t("footer.community")}</span>
                </Link>
                <span className="text-muted-foreground">·</span>
                <Link to="/guidelines">
                  <span className="text-primary font-medium hover:underline">{t("footer.guidelines")}</span>
                </Link>
                <span className="text-muted-foreground">·</span>
                <Link to="/moderation">
                  <span className="text-primary font-medium hover:underline">{t("footer.moderation")}</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Trust;
