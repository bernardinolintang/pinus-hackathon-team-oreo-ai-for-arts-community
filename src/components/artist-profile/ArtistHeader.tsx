import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BadgeCheck, UserPlus, Users, ImageIcon, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { ArtistProfileResponse } from "@/types/artist";

export interface ArtistHeaderProps {
  artist: ArtistProfileResponse;
  onFollowToggle?: (artistId: number) => void;
  showBackLink?: boolean;
}

export function ArtistHeader({
  artist,
  onFollowToggle,
  showBackLink = true,
}: ArtistHeaderProps) {
  const [isFollowed, setIsFollowed] = useState(artist.isFollowedByCurrentUser);
  const [followerCount, setFollowerCount] = useState(artist.followerCount);

  const handleFollowClick = () => {
    const next = !isFollowed;
    setIsFollowed(next);
    setFollowerCount((prev) => (next ? prev + 1 : Math.max(0, prev - 1)));
    onFollowToggle?.(artist.id);
  };

  const hasFollowers = (artist.followerPreview?.length ?? 0) > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border"
    >
      {showBackLink && (
        <Link
          to="/discover"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Discover
        </Link>
      )}

      <div className="flex flex-col sm:flex-row gap-6">
        <div className="shrink-0">
          <Avatar className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 rounded-full border-4 border-background shadow-soft">
            <AvatarImage src={artist.avatarUrl} alt={artist.name} />
            <AvatarFallback className="text-lg font-serif">
              {artist.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold">
              {artist.name}
            </h1>
            {artist.isVerified && (
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
                  "bg-primary/12 text-primary border border-primary/20"
                )}
                aria-label="Verified Artist — reviewed by moderators before publishing"
                title="Reviewed by moderators before publishing"
              >
                <BadgeCheck className="w-3.5 h-3.5" />
                Verified Artist
              </span>
            )}
          </div>
          {artist.isVerified && (
            <p className="text-xs text-muted-foreground mb-2">
              Reviewed by moderators before publishing
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-muted-foreground mb-4">
            {hasFollowers && artist.followerPreview ? (
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors cursor-pointer"
                  >
                    <Users className="w-4 h-4" />
                    <span>{followerCount.toLocaleString()} followers</span>
                  </button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-72 p-0">
                  <div className="p-3 border-b border-border">
                    <p className="text-sm font-medium">Followers</p>
                    <p className="text-xs text-muted-foreground">
                      People you follow first
                    </p>
                  </div>
                  <ScrollArea className="h-48">
                    <ul className="p-2 space-y-1">
                      {artist.followerPreview.map((f) => (
                        <li key={String(f.id)}>
                          <Link
                            to={`/artists/${f.id}`}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
                          >
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={f.avatarUrl} />
                              <AvatarFallback className="text-xs">
                                {f.name.slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm truncate">{f.name}</span>
                            {f.isFollowedByCurrentUser && (
                              <span className="text-xs text-muted-foreground ml-auto">
                                Following
                              </span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </ScrollArea>
                </PopoverContent>
              </Popover>
            ) : (
              <span className="inline-flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                {followerCount.toLocaleString()} followers
              </span>
            )}

            <span className="inline-flex items-center gap-1.5">
              <ImageIcon className="w-4 h-4" />
              {artist.artworkCount} artwork{artist.artworkCount !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              onClick={handleFollowClick}
              variant={isFollowed ? "outline" : "default"}
              size="default"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              {isFollowed ? "Unfollow" : "Follow"}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
