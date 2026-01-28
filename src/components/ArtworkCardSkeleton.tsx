import { motion } from "framer-motion";

const ArtworkCardSkeleton = ({ delay = 0 }: { delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-card rounded-2xl overflow-hidden shadow-card"
    >
      {/* Image skeleton */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted animate-pulse">
        <div className="w-full h-full bg-gradient-to-r from-muted via-muted/50 to-muted" />
      </div>

      {/* Content skeleton */}
      <div className="p-5 space-y-4">
        <div className="h-6 bg-muted rounded w-3/4 animate-pulse" />
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-muted animate-pulse" />
          <div className="h-4 bg-muted rounded w-24 animate-pulse" />
        </div>
        <div className="flex gap-2">
          <div className="h-5 bg-muted rounded w-16 animate-pulse" />
          <div className="h-5 bg-muted rounded w-20 animate-pulse" />
          <div className="h-5 bg-muted rounded w-14 animate-pulse" />
        </div>
        <div className="flex items-center justify-between">
          <div className="h-4 bg-muted rounded w-32 animate-pulse" />
          <div className="h-4 bg-muted rounded w-12 animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
};

export default ArtworkCardSkeleton;

