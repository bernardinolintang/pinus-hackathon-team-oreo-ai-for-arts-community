import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Shield, Eye, Heart, Users } from "lucide-react";

const principleKeys = [
  { icon: Shield, titleKey: "principles.card1Title", descKey: "principles.card1Desc" },
  { icon: Eye, titleKey: "principles.card2Title", descKey: "principles.card2Desc" },
  { icon: Heart, titleKey: "principles.card3Title", descKey: "principles.card3Desc" },
  { icon: Users, titleKey: "principles.card4Title", descKey: "principles.card4Desc" },
] as const;

const PrinciplesSection = () => {
  const { t } = useTranslation();
  return (
    <section className="py-24 bg-primary/5">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="font-serif text-4xl font-semibold mb-4">
            {t("principles.sectionTitle")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("principles.sectionDesc")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {principleKeys.map((principle, index) => {
            const Icon = principle.icon;
            return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex gap-5"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold mb-2">{t(principle.titleKey)}</h3>
                <p className="text-muted-foreground">{t(principle.descKey)}</p>
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PrinciplesSection;
