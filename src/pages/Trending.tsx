import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { TrendingUp, Clock, Sparkles, Users, Hash } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrendingArtworkCard from "@/components/TrendingArtworkCard";
import TrendingArtistCard from "@/components/TrendingArtistCard";
import TrendingKeywordCard from "@/components/TrendingKeywordCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  trendingArtworks,
  trendingArtists,
  trendingKeywords,
} from "@/data/trending";

type Timeframe = "today" | "week" | "month";

const timeframeOptions: { value: Timeframe; label: string; icon: React.ReactNode }[] = [
  { value: "today", label: "Today", icon: <Clock className="w-4 h-4" /> },
  { value: "week", label: "This Week", icon: <TrendingUp className="w-4 h-4" /> },
  { value: "month", label: "This Month", icon: <Sparkles className="w-4 h-4" /> },
];

const Trending = () => {
  useDocumentTitle("Trending");
  const [timeframe, setTimeframe] = useState<Timeframe>("week");
  const [activeTab, setActiveTab] = useState("artworks");

  const filteredArtworks = useMemo(() => {
    if (timeframe === "week") return trendingArtworks;
    return trendingArtworks.filter((a) => a.timeframe === timeframe);
  }, [timeframe]);

  const filteredArtists = useMemo(() => {
    if (timeframe === "week") return trendingArtists;
    return trendingArtists.filter((a) => a.timeframe === timeframe);
  }, [timeframe]);

  const filteredKeywords = useMemo(() => {
    if (timeframe === "week") return trendingKeywords;
    return trendingKeywords.filter((k) => k.timeframe === timeframe);
  }, [timeframe]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content" className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mb-10"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-semibold">
                Trending
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              See what the community is engaging with the most. Unlike viral content elsewhere,
              these trends are based on <span className="text-foreground font-medium">peer validation</span> and{" "}
              <span className="text-foreground font-medium">trusted endorsements</span>, not just raw popularity.
            </p>
          </motion.div>

          {/* Timeframe Selector */}
          <div className="flex flex-wrap gap-2 mb-8">
            {timeframeOptions.map((option) => (
              <Button
                key={option.value}
                variant={timeframe === option.value ? "default" : "outline"}
                onClick={() => setTimeframe(option.value)}
                className="gap-2"
              >
                {option.icon}
                {option.label}
              </Button>
            ))}
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="bg-muted/50">
              <TabsTrigger value="artworks" className="gap-2">
                <Sparkles className="w-4 h-4" />
                Artworks
              </TabsTrigger>
              <TabsTrigger value="artists" className="gap-2">
                <Users className="w-4 h-4" />
                Artists
              </TabsTrigger>
              <TabsTrigger value="keywords" className="gap-2">
                <Hash className="w-4 h-4" />
                Keywords
              </TabsTrigger>
            </TabsList>

            {/* Artworks Tab */}
            <TabsContent value="artworks" className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {filteredArtworks.length} trending artwork{filteredArtworks.length !== 1 ? "s" : ""}
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="hidden sm:inline">Ranked by peer appreciation & trust signals</span>
                </div>
              </div>

              {filteredArtworks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredArtworks.map((artwork, index) => (
                    <TrendingArtworkCard
                      key={artwork.id}
                      artwork={artwork}
                      index={index}
                      rank={index + 1}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-lg text-muted-foreground">
                    No trending artworks for this timeframe yet.
                  </p>
                </div>
              )}
            </TabsContent>

            {/* Artists Tab */}
            <TabsContent value="artists" className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {filteredArtists.length} trending artist{filteredArtists.length !== 1 ? "s" : ""}
                </p>
              </div>

              {filteredArtists.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {filteredArtists.map((artist, index) => (
                    <TrendingArtistCard key={artist.id} artist={artist} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-lg text-muted-foreground">
                    No trending artists for this timeframe yet.
                  </p>
                </div>
              )}
            </TabsContent>

            {/* Keywords Tab */}
            <TabsContent value="keywords" className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {filteredKeywords.length} trending keyword{filteredKeywords.length !== 1 ? "s" : ""}
                </p>
              </div>

              {filteredKeywords.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredKeywords.map((keyword, index) => (
                    <TrendingKeywordCard key={keyword.id} keyword={keyword} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-lg text-muted-foreground">
                    No trending keywords for this timeframe yet.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Trust Explanation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-16 p-6 bg-muted/30 rounded-2xl border border-border"
          >
            <h2 className="font-serif text-xl font-semibold mb-3">
              How Trending Works
            </h2>
            <p className="text-muted-foreground mb-4">
              Our trending algorithm prioritizes quality over virality. Instead of simply counting likes,
              we weight engagement based on:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-trust mt-2 flex-shrink-0" />
                <span><strong className="text-foreground">Peer validation:</strong> Appreciation from verified artists and long-term community members carries more weight.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-trust mt-2 flex-shrink-0" />
                <span><strong className="text-foreground">Curator endorsements:</strong> Works featured in peer-curated collections signal trusted quality.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-trust mt-2 flex-shrink-0" />
                <span><strong className="text-foreground">Organic growth:</strong> Steady, sustained engagement is valued over sudden spikes that may indicate manipulation.</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Trending;
