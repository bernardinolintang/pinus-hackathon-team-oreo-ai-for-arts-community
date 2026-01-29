import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { Search, BadgeCheck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArtistCard from "@/components/ArtistCard";
import { Input } from "@/components/ui/input";
import { artists } from "@/data/artists";

type ReputationFilter = "all" | "established" | "rising" | "newcomer";

const artistCards = artists.map((a) => ({
  id: a.id,
  name: a.name,
  avatar: a.avatar,
  specialty: a.specialty,
  reputation: a.reputation,
  followers: a.followers,
  peerEndorsements: a.peerEndorsements,
  recentWork: a.portfolio[0]?.image ?? a.coverImage,
}));

export default function Artists() {
  useDocumentTitle("Artists");
  const [search, setSearch] = useState("");
  const [reputationFilter, setReputationFilter] = useState<ReputationFilter>("all");

  const filtered = useMemo(() => {
    let list = artistCards;
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.specialty.toLowerCase().includes(q)
      );
    }
    if (reputationFilter !== "all") {
      list = list.filter((a) => a.reputation === reputationFilter);
    }
    return list;
  }, [search, reputationFilter]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main id="main-content" className="pt-24 pb-16">
        <section className="py-16 md:py-20 border-b border-border">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              <div className="flex items-center gap-2 text-primary mb-3">
                <BadgeCheck className="w-5 h-5" />
                <span className="text-sm font-medium">Human-verified</span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
                Artists
              </h1>
              <p className="text-lg text-muted-foreground">
                Browse verified artists. Everyone here has been reviewed by moderators.
                Reputation grows through peer recognition and consistent quality.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or specialty..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    ["all", "All"],
                    ["established", "Established"],
                    ["rising", "Rising"],
                    ["newcomer", "Newcomer"],
                  ] as const
                ).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setReputationFilter(value)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      reputationFilter === value
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </motion.div>

            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 text-muted-foreground"
              >
                <p className="text-lg">No artists match your filters.</p>
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setReputationFilter("all");
                  }}
                  className="mt-3 text-sm font-medium text-primary hover:underline"
                >
                  Clear filters
                </button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filtered.map((artist, index) => (
                  <ArtistCard
                    key={artist.id}
                    {...artist}
                    delay={index * 0.05}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
