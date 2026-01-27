import { useState } from "react";
import { motion } from "framer-motion";
import { Globe, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ArtistProfileResponse } from "@/types/artist";

const TRUNCATE_CHARS = 200;

export interface ArtistBioProps {
  artist: Pick<
    ArtistProfileResponse,
    "bio" | "websiteUrl" | "socialLinks"
  >;
  className?: string;
}

export function ArtistBio({ artist, className }: ArtistBioProps) {
  const [expanded, setExpanded] = useState(false);
  const needsTruncate = artist.bio.length > TRUNCATE_CHARS;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05 }}
      className={cn("bg-card rounded-2xl p-6 border border-border", className)}
    >
      <h2 className="font-serif text-lg font-semibold mb-3">About</h2>

      <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground">
        <div className={cn("whitespace-pre-wrap", !expanded && needsTruncate && "line-clamp-3")}>
          {artist.bio}
        </div>
        {needsTruncate && (
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="mt-2 text-sm font-medium text-primary hover:underline"
          >
            {expanded ? "Read Less" : "Read More"}
          </button>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-border space-y-2">
        {artist.websiteUrl && (
          <a
            href={
              artist.websiteUrl.startsWith("http")
                ? artist.websiteUrl
                : `https://${artist.websiteUrl}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Globe className="w-4 h-4 shrink-0" />
            <span className="truncate">{artist.websiteUrl.replace(/^https?:\/\//, "")}</span>
            <ExternalLink className="w-3 h-3 shrink-0" />
          </a>
        )}
        {artist.socialLinks?.map((link) => (
          <a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="capitalize">{link.platform}</span>
            <ExternalLink className="w-3 h-3 shrink-0" />
          </a>
        ))}
      </div>
    </motion.div>
  );
}
