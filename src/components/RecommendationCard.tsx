import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Lightbulb, ArrowRight } from "lucide-react";

interface RecommendationCardProps {
  title: string;
  explanation: string;
  artworks: {
    image: string;
    title: string;
  }[];
  delay?: number;
}

const RecommendationCard = ({
  title,
  explanation,
  artworks,
  delay = 0,
}: RecommendationCardProps) => {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="bg-card rounded-2xl p-6 shadow-card hover:shadow-hover transition-shadow"
    >
      <div className="flex items-start gap-4 mb-5">
        <div className="w-10 h-10 rounded-full bg-trust/10 flex items-center justify-center flex-shrink-0">
          <Lightbulb className="w-5 h-5 text-trust" />
        </div>
        <div>
          <h3 className="font-serif text-lg font-semibold mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{explanation}</p>
        </div>
      </div>

      <div className="flex gap-3 mb-4">
        {artworks.map((artwork, index) => (
          <div
            key={index}
            className="flex-1 aspect-square rounded-xl overflow-hidden"
          >
            <img
              src={artwork.image}
              alt={artwork.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>

      <button className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
        {t("recommendation.exploreCollection")}
        <ArrowRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

export default RecommendationCard;
