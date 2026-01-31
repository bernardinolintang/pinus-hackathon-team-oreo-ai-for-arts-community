import { motion } from "framer-motion";
import { Hash, TrendingUp } from "lucide-react";
import type { TrendingKeyword } from "@/data/trending";
import type { TFunction } from "i18next";

interface TrendingKeywordCardProps {
  keyword: TrendingKeyword;
  index: number;
  t: TFunction;
}

const TrendingKeywordCard = ({ keyword, index, t }: TrendingKeywordCardProps) => {
  const { keyword: tag, artworkCount, changePercent } = keyword;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <div className="bg-card rounded-xl p-4 shadow-card hover:shadow-hover transition-all duration-300 group cursor-default">
        <div className="flex items-center gap-2 mb-2">
          <Hash className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium text-foreground group-hover:text-primary transition-colors">
            {tag}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{artworkCount} {t("trending.artworksUnit")}</span>
          <span className="flex items-center gap-1 text-emerald-600 font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            +{changePercent}%
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default TrendingKeywordCard;
