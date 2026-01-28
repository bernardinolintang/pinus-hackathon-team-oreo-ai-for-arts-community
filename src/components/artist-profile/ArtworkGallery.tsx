import { useState, useCallback, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { Heart, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ArtistProfileArtwork } from "@/types/artist";

const PAGE_SIZE = 12;

export interface ArtworkGalleryProps {
  artistId: number;
  artworks: ArtistProfileArtwork[];
  paginate?: boolean;
  className?: string;
}

export function ArtworkGallery({
  artistId,
  artworks,
  paginate = true,
  className,
}: ArtworkGalleryProps) {
  const [displayed, setDisplayed] = useState<ArtistProfileArtwork[]>(
    paginate ? artworks.slice(0, PAGE_SIZE) : artworks
  );
  const [hasMore, setHasMore] = useState(
    paginate && artworks.length > PAGE_SIZE
  );
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(loadMoreRef, { once: false, margin: "100px" });

  useEffect(() => {
    setDisplayed(paginate ? artworks.slice(0, PAGE_SIZE) : artworks);
    setHasMore(paginate && artworks.length > PAGE_SIZE);
  }, [artistId, artworks, paginate]);

  const loadMore = useCallback(() => {
    setDisplayed((prev) => {
      const next = artworks.slice(0, prev.length + PAGE_SIZE);
      setHasMore(next.length < artworks.length);
      return next;
    });
  }, [artworks]);

  useEffect(() => {
    if (!paginate || !hasMore || !isInView) return;
    loadMore();
  }, [isInView, hasMore, loadMore, paginate]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className={cn("space-y-6", className)}
    >
      <h2 className="font-serif text-lg font-semibold">
        Artworks ({artworks.length})
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayed.map((artwork, index) => (
          <motion.div
            key={artwork.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.03 }}
          >
            <Link
              to={`/artworks/${artwork.id}`}
              className="group block rounded-xl overflow-hidden bg-card border border-border shadow-card hover:shadow-hover transition-all duration-300"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={artwork.thumbnailUrl}
                  alt={artwork.title ?? `Artwork ${artwork.id}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {artwork.socialIndicator && (
                  <div className="absolute top-2 left-2">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-primary/90 text-primary-foreground">
                      <Heart className="w-3 h-3" />
                      {artwork.socialIndicator}
                    </span>
                  </div>
                )}
              </div>
              {artwork.title && (
                <p className="p-3 text-sm font-medium truncate border-t border-border">
                  {artwork.title}
                </p>
              )}
            </Link>
          </motion.div>
        ))}
      </div>

      {paginate && hasMore && (
        <div ref={loadMoreRef} className="flex justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      )}
    </motion.section>
  );
}
