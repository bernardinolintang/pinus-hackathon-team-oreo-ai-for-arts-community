import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, Heart, BadgeCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Collection } from "@/data/collections";
import type { TFunction } from "i18next";

interface CollectionCardProps {
  collection: Collection;
  index: number;
  t: TFunction;
}

const CollectionCard = ({ collection, index, t }: CollectionCardProps) => {
  const { title, description, theme, mood, coverImage, artworkCount, curator, followersCount, peerEndorsements } = collection;
  const displayTitle = t(`collections.items.${collection.id}.title`, { defaultValue: title });
  const displayDescription = t(`collections.items.${collection.id}.description`, { defaultValue: description });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link to={`/collections/${collection.id}`} className="block group">
        <div className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300">
          {/* Cover image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={coverImage}
              alt={displayTitle}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            {/* Theme & mood badges */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-2">
              <span className="px-2.5 py-1 rounded-md bg-background/90 backdrop-blur text-xs font-medium">
                {t(`collections.themes.${theme}`, { defaultValue: theme })}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-background/90 backdrop-blur text-xs font-medium">
                {t(`collections.moods.${mood}`, { defaultValue: mood })}
              </span>
            </div>
            {/* Artwork count */}
            <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-background/90 backdrop-blur text-xs font-medium">
              {artworkCount} {t("collections.works")}
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="font-serif text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
              {displayTitle}
            </h3>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {displayDescription}
            </p>
            {/* Curator */}
            <div className="flex items-center gap-2 mb-4">
              <Avatar className="h-6 w-6">
                <AvatarImage src={curator.avatar} alt={curator.name} />
                <AvatarFallback className="text-xs">
                  {curator.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">
                {t("collections.by")} {curator.name}
                {curator.verified && (
                  <BadgeCheck className="inline-block w-3.5 h-3.5 ml-1 text-primary" />
                )}
              </span>
            </div>
            {/* Stats */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                <span>{followersCount.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="w-4 h-4" />
                <span>{peerEndorsements}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CollectionCard;
