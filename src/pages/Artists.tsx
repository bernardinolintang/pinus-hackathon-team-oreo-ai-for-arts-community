import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { Search, BadgeCheck, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArtistCard from "@/components/ArtistCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
  const { t } = useTranslation();
  useDocumentTitle(t("artists.title"));
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

      <main id="main-content" className="pt-20 sm:pt-24 pb-12 md:pb-16">
        <section className="py-12 sm:py-16 md:py-20 border-b border-border">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              <div className="flex items-center gap-2 text-primary mb-3">
                <BadgeCheck className="w-5 h-5 shrink-0" />
                <span className="text-sm font-medium">{t("artists.humanVerified")}</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold mb-3 sm:mb-4">
                {t("artists.title")}
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground">
                {t("artists.subtitle")}
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-8 sm:py-12">
          <div className="container mx-auto px-4 sm:px-6">
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                  <Users className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-semibold mb-2">{t("artists.noMatch")}</h3>
                <p className="text-muted-foreground mb-6 max-w-sm mx-auto text-sm sm:text-base">
                  {t("artists.noMatchHint")}
                </p>
                <Button variant="outline" onClick={() => { setSearch(""); setReputationFilter("all"); }}>
                  {t("common.clearFilters")}
                </Button>
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
