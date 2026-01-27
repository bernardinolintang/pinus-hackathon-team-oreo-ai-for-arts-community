import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ArtistProfileResponse } from "@/types/artist";

export interface TrustSignalsProps {
  signals: ArtistProfileResponse["trustSignals"];
  className?: string;
}

export function TrustSignals({ signals, className }: TrustSignalsProps) {
  if (!signals.length) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className={cn("space-y-3", className)}
    >
      <h2 className="font-serif text-lg font-semibold flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-primary" />
        Trust & reputation
      </h2>
      <ul className="space-y-2" role="list">
        {signals.map((text, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
            className="flex gap-3"
          >
            <span
              className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-primary"
              aria-hidden
            />
            <span className="text-sm text-muted-foreground leading-relaxed">
              {text}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.section>
  );
}
