import { motion } from "framer-motion";
import { Heart, MessageCircle, Users, Star } from "lucide-react";

interface ArtworkCardProps {
  image: string;
  title: string;
  artist: string;
  artistAvatar: string;
  peerLikes: number;
  totalLikes: number;
  trustScore: "high" | "medium" | "emerging";
  peerNote?: string;
  keywords: string[];
  delay?: number;
}

const ArtworkCard = ({
  image,
  title,
  artist,
  artistAvatar,
  peerLikes,
  totalLikes,
  trustScore,
  peerNote,
  keywords,
  delay = 0,
}: ArtworkCardProps) => {
  const trustColors = {
    high: "trust-badge",
    medium: "peer-badge",
    emerging: "organic-badge",
  };

  const trustLabels = {
    high: "Highly Trusted",
    medium: "Peer Validated",
    emerging: "Emerging Voice",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Trust badge */}
        <div className="absolute top-4 left-4">
          <span className={trustColors[trustScore]}>
            <Star className="w-3 h-3" />
            {trustLabels[trustScore]}
          </span>
        </div>

        {/* Quick actions */}
        <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors">
            <Heart className="w-5 h-5 text-primary" />
          </button>
          <button className="w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors">
            <MessageCircle className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-serif text-xl font-semibold mb-1 line-clamp-1">{title}</h3>
        
        {/* Artist info */}
        <div className="flex items-center gap-2 mb-4">
          <img
            src={artistAvatar}
            alt={artist}
            className="w-6 h-6 rounded-full object-cover"
          />
          <span className="text-sm text-muted-foreground">{artist}</span>
        </div>

        {/* Peer validation */}
        {peerNote && (
          <div className="bg-secondary/50 rounded-lg p-3 mb-4">
            <p className="text-xs text-muted-foreground italic">"{peerNote}"</p>
          </div>
        )}

        {/* Keywords */}
        <div className="flex flex-wrap gap-2 mb-4">
          {keywords.slice(0, 3).map((keyword) => (
            <span
              key={keyword}
              className="text-xs px-2 py-1 bg-muted rounded-md text-muted-foreground"
            >
              {keyword}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{peerLikes} peers appreciate</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            <span>{totalLikes}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ArtworkCard;
