import { useState, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { Search, SlidersHorizontal, X, ChevronDown, Heart, Bookmark, MessageCircle } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArtworkCard from "@/components/ArtworkCard";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// Helper to get artist ID from name
const getArtistId = (name: string): string => {
  return name.toLowerCase().replace(/\s+/g, "-");
};

// Extended artwork data for the discover page
const allArtworks = [
  {
    id: 1,
    artworkId: "urban-solitude-1",
    artistId: "elena-vance",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800",
    title: "Urban Solitude",
    artist: "Elena Vance",
    artistAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    peerLikes: 12,
    totalLikes: 234,
    trustScore: "high" as const,
    peerNote: "The emotional depth here reminds me of early Hopper work",
    keywords: ["urban", "solitude", "contemporary", "cityscape"],
  },
  {
    id: 2,
    artworkId: "morning-light-3",
    artistId: "marcus-chen",
    image: "https://images.unsplash.com/photo-1549887534-1541e9326642?w=800",
    title: "Morning Light Series III",
    artist: "Marcus Chen",
    artistAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    peerLikes: 8,
    totalLikes: 156,
    trustScore: "medium" as const,
    keywords: ["light", "abstract", "minimalism", "series"],
  },
  {
    id: 3,
    artworkId: "fragments-memory",
    artistId: "yuki-tanaka",
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800",
    title: "Fragments of Memory",
    artist: "Yuki Tanaka",
    artistAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    peerLikes: 5,
    totalLikes: 89,
    trustScore: "emerging" as const,
    peerNote: "A fresh perspective on traditional Japanese aesthetics",
    keywords: ["memory", "japanese", "mixed media", "cultural"],
  },
  {
    id: 4,
    artworkId: "digital-botanica",
    artistId: "sarah-williams",
    image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800",
    title: "Digital Botanica",
    artist: "Sarah Williams",
    artistAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
    peerLikes: 15,
    totalLikes: 312,
    trustScore: "high" as const,
    keywords: ["digital", "nature", "futurism", "botanical"],
  },
  {
    id: 5,
    artworkId: "color-study-47",
    artistId: "james-rivera",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800",
    title: "Color Study No. 47",
    artist: "James Rivera",
    artistAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    peerLikes: 7,
    totalLikes: 178,
    trustScore: "medium" as const,
    keywords: ["color", "study", "expressionism", "abstract"],
  },
  {
    id: 6,
    artworkId: "stillness-motion",
    artistId: "anna-kowalski",
    image: "https://images.unsplash.com/photo-1569172122301-bc5008bc09c5?w=800",
    title: "Stillness in Motion",
    artist: "Anna Kowalski",
    artistAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
    peerLikes: 3,
    totalLikes: 67,
    trustScore: "emerging" as const,
    peerNote: "Remarkable control of negative space",
    keywords: ["motion", "sculpture", "minimalism", "kinetic"],
  },
  {
    id: 7,
    artworkId: "whispers-autumn",
    artistId: "thomas-berg",
    image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800",
    title: "Whispers of Autumn",
    artist: "Thomas Berg",
    artistAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    peerLikes: 18,
    totalLikes: 456,
    trustScore: "high" as const,
    peerNote: "Masterful use of warm tones and texture",
    keywords: ["autumn", "landscape", "nature", "impressionism"],
  },
  {
    id: 8,
    artworkId: "geometric-dreams",
    artistId: "lisa-park",
    image: "https://images.unsplash.com/photo-1515405295579-ba7b45403062?w=800",
    title: "Geometric Dreams",
    artist: "Lisa Park",
    artistAvatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100",
    peerLikes: 11,
    totalLikes: 234,
    trustScore: "medium" as const,
    keywords: ["geometric", "abstract", "modern", "pattern"],
  },
  {
    id: 9,
    artworkId: "ocean-depths",
    artistId: "michael-torres",
    image: "https://images.unsplash.com/photo-1482160549825-59d1b23cb208?w=800",
    title: "Ocean Depths",
    artist: "Michael Torres",
    artistAvatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100",
    peerLikes: 6,
    totalLikes: 123,
    trustScore: "emerging" as const,
    keywords: ["ocean", "blue", "abstract", "nature"],
  },
  {
    id: 10,
    artworkId: "urban-rhythms",
    artistId: "david-kim",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
    title: "Urban Rhythms",
    artist: "David Kim",
    artistAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100",
    peerLikes: 14,
    totalLikes: 289,
    trustScore: "high" as const,
    peerNote: "Captures the pulse of city life beautifully",
    keywords: ["urban", "city", "contemporary", "street"],
  },
  {
    id: 11,
    artworkId: "neon-nights",
    artistId: "sophie-anderson",
    image: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=800",
    title: "Neon Nights",
    artist: "Sophie Anderson",
    artistAvatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100",
    peerLikes: 9,
    totalLikes: 198,
    trustScore: "medium" as const,
    keywords: ["neon", "night", "urban", "digital"],
  },
  {
    id: 12,
    artworkId: "serene-passage",
    artistId: "emily-wright",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800",
    title: "Serene Passage",
    artist: "Emily Wright",
    artistAvatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100",
    peerLikes: 4,
    totalLikes: 76,
    trustScore: "emerging" as const,
    peerNote: "A promising new voice in landscape art",
    keywords: ["landscape", "serene", "nature", "peaceful"],
  },
];

// Extract all unique keywords
const allKeywords = Array.from(
  new Set(allArtworks.flatMap((artwork) => artwork.keywords))
).sort();

type SortOption = "relevance" | "peer-likes" | "total-likes" | "newest";
type TrustLevel = "high" | "medium" | "emerging";

const Discover = () => {
  useDocumentTitle("Discover");
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [selectedTrustLevels, setSelectedTrustLevels] = useState<TrustLevel[]>([]);
  const [minPeerLikes, setMinPeerLikes] = useState<number>(0);
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { t } = useTranslation();

  // Read search query from URL on mount
  useEffect(() => {
    const queryParam = searchParams.get("q");
    if (queryParam) {
      setSearchQuery(queryParam);
    }
  }, [searchParams]);

  const toggleKeyword = (keyword: string) => {
    setSelectedKeywords((prev) =>
      prev.includes(keyword)
        ? prev.filter((k) => k !== keyword)
        : [...prev, keyword]
    );
  };

  const toggleTrustLevel = (level: TrustLevel) => {
    setSelectedTrustLevels((prev) =>
      prev.includes(level)
        ? prev.filter((l) => l !== level)
        : [...prev, level]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedKeywords([]);
    setSelectedTrustLevels([]);
    setMinPeerLikes(0);
    setSortBy("relevance");
  };

  const activeFilterCount =
    selectedKeywords.length +
    selectedTrustLevels.length +
    (minPeerLikes > 0 ? 1 : 0);

  const filteredAndSortedArtworks = useMemo(() => {
    let results = [...allArtworks];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (artwork) =>
          artwork.title.toLowerCase().includes(query) ||
          artwork.artist.toLowerCase().includes(query) ||
          artwork.keywords.some((k) => k.toLowerCase().includes(query))
      );
    }

    // Keyword filter
    if (selectedKeywords.length > 0) {
      results = results.filter((artwork) =>
        selectedKeywords.some((keyword) => artwork.keywords.includes(keyword))
      );
    }

    // Trust level filter
    if (selectedTrustLevels.length > 0) {
      results = results.filter((artwork) =>
        selectedTrustLevels.includes(artwork.trustScore)
      );
    }

    // Peer likes filter
    if (minPeerLikes > 0) {
      results = results.filter((artwork) => artwork.peerLikes >= minPeerLikes);
    }

    // Sorting
    switch (sortBy) {
      case "peer-likes":
        results.sort((a, b) => b.peerLikes - a.peerLikes);
        break;
      case "total-likes":
        results.sort((a, b) => b.totalLikes - a.totalLikes);
        break;
      case "newest":
        results.sort((a, b) => b.id - a.id);
        break;
      case "relevance":
      default:
        // Relevance: prioritize high trust + peer likes
        results.sort((a, b) => {
          const trustWeight = { high: 3, medium: 2, emerging: 1 };
          const scoreA = trustWeight[a.trustScore] * 10 + a.peerLikes;
          const scoreB = trustWeight[b.trustScore] * 10 + b.peerLikes;
          return scoreB - scoreA;
        });
    }

    return results;
  }, [searchQuery, selectedKeywords, selectedTrustLevels, minPeerLikes, sortBy]);

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Trust Level */}
      <div>
        <h4 className="font-medium mb-3">Trust Level</h4>
        <div className="space-y-2">
          {[
            { value: "high" as TrustLevel, label: "Highly Trusted", color: "trust-badge" },
            { value: "medium" as TrustLevel, label: "Peer Validated", color: "peer-badge" },
            { value: "emerging" as TrustLevel, label: "Emerging Voice", color: "organic-badge" },
          ].map((level) => (
            <div key={level.value} className="flex items-center space-x-2">
              <Checkbox
                id={`trust-${level.value}`}
                checked={selectedTrustLevels.includes(level.value)}
                onCheckedChange={() => toggleTrustLevel(level.value)}
              />
              <Label
                htmlFor={`trust-${level.value}`}
                className="text-sm cursor-pointer flex items-center gap-2"
              >
                <span className={`w-2 h-2 rounded-full ${
                  level.value === "high" ? "bg-trust" :
                  level.value === "medium" ? "bg-peer" : "bg-organic"
                }`} />
                {level.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Peer Validation */}
      <div>
        <h4 className="font-medium mb-3">Minimum Peer Appreciation</h4>
        <div className="space-y-2">
          {[
            { value: 0, label: "Any" },
            { value: 5, label: "5+ peers" },
            { value: 10, label: "10+ peers" },
            { value: 15, label: "15+ peers" },
          ].map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`peers-${option.value}`}
                checked={minPeerLikes === option.value}
                onCheckedChange={() => setMinPeerLikes(option.value)}
              />
              <Label
                htmlFor={`peers-${option.value}`}
                className="text-sm cursor-pointer"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Keywords */}
      <div>
        <h4 className="font-medium mb-3">Keywords</h4>
        <div className="flex flex-wrap gap-2">
          {allKeywords.map((keyword) => (
            <Badge
              key={keyword}
              variant={selectedKeywords.includes(keyword) ? "default" : "outline"}
              className={`cursor-pointer transition-colors ${
                selectedKeywords.includes(keyword)
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
              onClick={() => toggleKeyword(keyword)}
            >
              {keyword}
            </Badge>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {activeFilterCount > 0 && (
        <Button
          variant="outline"
          className="w-full"
          onClick={clearAllFilters}
        >
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main id="main-content" className="pt-20 sm:pt-24 pb-12 md:pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mb-6 sm:mb-8"
          >
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold mb-3 sm:mb-4">
              {t("discover.title")}
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground">
              {t("discover.subtitle")}
            </p>
          </motion.div>

          {/* Search and Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col md:flex-row gap-4 mb-8"
          >
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search artworks, artists, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
              <SelectTrigger className="w-full md:w-48 h-12">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Most Relevant</SelectItem>
                <SelectItem value="peer-likes">Peer Appreciation</SelectItem>
                <SelectItem value="total-likes">Total Likes</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>

            {/* Mobile Filter Button */}
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="h-12 md:hidden">
                  <SlidersHorizontal className="w-5 h-5 mr-2" />
                  Filters
                  {activeFilterCount > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {activeFilterCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
          </motion.div>

          {/* Active Filters Display */}
          {(selectedKeywords.length > 0 || selectedTrustLevels.length > 0 || minPeerLikes > 0) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="flex flex-wrap gap-2 mb-6"
            >
              {selectedTrustLevels.map((level) => (
                <Badge
                  key={level}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => toggleTrustLevel(level)}
                >
                  {level === "high" ? "Highly Trusted" : level === "medium" ? "Peer Validated" : "Emerging Voice"}
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}
              {minPeerLikes > 0 && (
                <Badge
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => setMinPeerLikes(0)}
                >
                  {minPeerLikes}+ peer appreciation
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              )}
              {selectedKeywords.map((keyword) => (
                <Badge
                  key={keyword}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => toggleKeyword(keyword)}
                >
                  {keyword}
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                Clear all
              </Button>
            </motion.div>
          )}

          {/* Sign-in Banner for logged-out users */}
          {!user && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bookmark className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Sign in to interact with artworks</p>
                  <p className="text-sm text-muted-foreground">
                    Like, save, and comment on your favorite pieces
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </div>
            </motion.div>
          )}

          {/* Main Content */}
          <div className="flex gap-8">
            {/* Desktop Sidebar Filters */}
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden md:block w-64 shrink-0"
            >
              <div className="sticky top-24 bg-card rounded-xl p-6 border border-border">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold">Filters</h3>
                  {activeFilterCount > 0 && (
                    <Badge variant="secondary">{activeFilterCount}</Badge>
                  )}
                </div>
                <FilterContent />
              </div>
            </motion.aside>

            {/* Artwork Grid */}
            <div className="flex-1">
              {/* Results Count */}
              <div className="mb-6 text-sm text-muted-foreground">
                Showing {filteredAndSortedArtworks.length} of {allArtworks.length} artworks
              </div>

              {filteredAndSortedArtworks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAndSortedArtworks.map((artwork, index) => (
                    <ArtworkCard
                      key={artwork.id}
                      {...artwork}
                      delay={index * 0.05}
                    />
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                    <Search className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl font-semibold mb-2">{t("discover.noResults")}</h3>
                  <p className="text-muted-foreground mb-4 text-sm sm:text-base">
                    {t("discover.noResultsHint")}
                  </p>
                  <Button variant="outline" onClick={clearAllFilters}>
                    {t("discover.clearAllFilters")}
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Discover;
