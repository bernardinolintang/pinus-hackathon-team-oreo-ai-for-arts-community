import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, Heart, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { TrendingArtwork } from "@/data/trending";

interface TrendingArtworkCardProps {
  artwork: TrendingArtwork;
  index: number;
  rank: number;
}

const TrendingArtworkCard = ({ artwork, index, rank }: TrendingArtworkCardProps) => {
  const {
    id,
    image,
    title,
    artistName,
    artistAvatar,
    endorsementReason,
    peersCount,
    heartsCount,
    trustLevel,
    changePercent,
  } = artwork;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link to={`/artworks/${id}`} className="block group">
        <div className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300">
          {/* Image with overlays */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            {/* Rank - red circle top-left */}
            <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-destructive flex items-center justify-center text-destructive-foreground text-sm font-semibold">
              {rank}
            </div>
            {/* Change % - green badge top-right */}
            <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-emerald-500/90 text-white text-xs font-medium">
              +{changePercent}%
            </div>
            {/* Trust badge - bottom-left */}
            <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-background/90 backdrop-blur text-xs font-medium">
              {trustLevel}
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="font-serif text-lg font-semibold mb-1 group-hover:text-primary transition-colors line-clamp-1">
              {title}
            </h3>
            <div className="flex items-center gap-2 mb-2">
              <Avatar className="h-5 w-5">
                <AvatarImage src={artistAvatar} alt={artistName} />
                <AvatarFallback className="text-[10px]">
                  {artistName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">{artistName}</span>
            </div>
            <p className="flex items-start gap-1.5 text-xs text-muted-foreground mb-3">
              <Sparkles className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
              <span className="line-clamp-2">{endorsementReason}</span>
            </p>
            {/* Metrics */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                <span>{peersCount} peers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="w-4 h-4" />
                <span>{heartsCount}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default TrendingArtworkCard;
