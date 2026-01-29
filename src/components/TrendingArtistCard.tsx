import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, Award, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { TrendingArtist } from "@/data/trending";

interface TrendingArtistCardProps {
  artist: TrendingArtist;
  index: number;
}

const TrendingArtistCard = ({ artist, index }: TrendingArtistCardProps) => {
  const { id, name, avatar, specialty, trendReason, followersCount, endorsementsCount } = artist;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link to={`/artists/${id}`} className="block group">
        <div className="bg-card rounded-2xl p-5 shadow-card hover:shadow-hover transition-all duration-300 flex items-start gap-4">
          <Avatar className="h-14 w-14 flex-shrink-0">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback className="text-lg">
              {name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-serif text-xl font-semibold group-hover:text-primary transition-colors">
              {name}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">{specialty}</p>
            <p className="flex items-start gap-1.5 text-xs text-muted-foreground mb-3">
              <Sparkles className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
              <span>{trendReason}</span>
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                <span>{followersCount.toLocaleString()} followers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                <span>{endorsementsCount} endorsements</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default TrendingArtistCard;
