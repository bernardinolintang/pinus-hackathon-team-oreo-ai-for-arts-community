import { motion } from "framer-motion";
import { Heart, Bookmark, MessageCircle, Users, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ArtworkCardProps {
  artworkId: string;
  artistId: string;
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
  artworkId,
  artistId,
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
  const { user, isFavorite, toggleFavorite, isLiked, toggleLike } = useAuth();
  const isFav = isFavorite(artworkId);
  const liked = isLiked(artworkId);
  const [likeCount, setLikeCount] = useState(totalLikes);

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      toast.error("Please sign in to save favorites");
      return;
    }

    try {
      await toggleFavorite(artworkId, artistId);
      toast.success(isFav ? "Removed from favorites" : "Saved to favorites");
    } catch (error) {
      toast.error("Failed to update favorite");
    }
  };

  const handleLikeClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      toast.error("Please sign in to like artworks");
      return;
    }

    try {
      await toggleLike(artworkId);
      setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
    } catch (error) {
      toast.error("Failed to update like");
    }
  };
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
    <Link to={`/artworks/${artworkId}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        viewport={{ once: true }}
        className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 cursor-pointer"
      >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement;
            target.onerror = null;
            target.src = "/placeholder.svg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Trust badge */}
        <div className="absolute top-4 left-4">
          <span className={trustColors[trustScore]}>
            <Star className="w-3 h-3" />
            {trustLabels[trustScore]}
          </span>
        </div>

        {/* Quick actions - Only show for logged-in users */}
        {user && (
          <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleLikeClick}
                  className="w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-all hover:scale-110 active:scale-95"
                >
                  <Heart className={`w-5 h-5 transition-all ${liked ? "fill-red-500 text-red-500" : "text-foreground"}`} />
                </button>
              </TooltipTrigger>
              <TooltipContent>Like this artwork</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleFavoriteClick}
                  className={`w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-all hover:scale-110 active:scale-95 ${
                    isFav ? "opacity-100" : ""
                  }`}
                >
                  <Bookmark className={`w-5 h-5 transition-all ${isFav ? "fill-primary text-primary" : "text-primary"}`} />
                </button>
              </TooltipTrigger>
              <TooltipContent>{isFav ? "Remove from favorites" : "Save to favorites"}</TooltipContent>
            </Tooltip>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-serif text-xl font-semibold mb-1 line-clamp-1">{title}</h3>
        
        {/* Artist info */}
        <div className="flex items-center gap-2 mb-4">
          <img
            src={artistAvatar}
            alt={`${artist} avatar`}
            className="w-6 h-6 rounded-full object-cover"
            loading="lazy"
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
            <Heart className={`w-4 h-4 ${liked ? "fill-red-500 text-red-500" : ""}`} />
            <span>{likeCount}</span>
          </div>
        </div>
        
        {/* Login prompt for logged-out users */}
        {!user && (
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              <Link to="/login" className="text-primary hover:underline">
                Sign in
              </Link>{" "}
              to like and save artworks
            </p>
          </div>
        )}
      </div>
    </motion.div>
    </Link>
  );
};

export default ArtworkCard;

