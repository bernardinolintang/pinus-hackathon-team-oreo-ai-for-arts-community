import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { Search, SlidersHorizontal, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CollectionCard from "@/components/CollectionCard";
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
import { collections, themes, moods } from "@/data/collections";

const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "endorsed", label: "Most Endorsed" },
  { value: "newest", label: "Newest" },
  { value: "artworks", label: "Most Artworks" },
];

const Collections = () => {
  useDocumentTitle("Collections");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("All");
  const [selectedMood, setSelectedMood] = useState("All");
  const [sortBy, setSortBy] = useState("popular");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredCollections = useMemo(() => {
    let result = [...collections];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(query) ||
          c.description.toLowerCase().includes(query) ||
          c.curator.name.toLowerCase().includes(query)
      );
    }

    // Theme filter
    if (selectedTheme !== "All") {
      result = result.filter((c) => c.theme === selectedTheme);
    }

    // Mood filter
    if (selectedMood !== "All") {
      result = result.filter((c) => c.mood === selectedMood);
    }

    // Sorting
    switch (sortBy) {
      case "popular":
        result.sort((a, b) => b.followersCount - a.followersCount);
        break;
      case "endorsed":
        result.sort((a, b) => b.peerEndorsements - a.peerEndorsements);
        break;
      case "newest":
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "artworks":
        result.sort((a, b) => b.artworkCount - a.artworkCount);
        break;
    }

    return result;
  }, [searchQuery, selectedTheme, selectedMood, sortBy]);

  const activeFilters: { type: string; value: string }[] = [
    selectedTheme !== "All" && { type: "theme", value: selectedTheme },
    selectedMood !== "All" && { type: "mood", value: selectedMood },
  ].filter(Boolean) as { type: string; value: string }[];

  const clearFilter = (type: string) => {
    if (type === "theme") setSelectedTheme("All");
    if (type === "mood") setSelectedMood("All");
  };

  const clearAllFilters = () => {
    setSelectedTheme("All");
    setSelectedMood("All");
    setSearchQuery("");
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Theme Filter */}
      <div>
        <h3 className="font-medium mb-3">Theme</h3>
        <div className="flex flex-wrap gap-2">
          {["All", ...themes].map((theme) => (
            <Button
              key={theme}
              variant={selectedTheme === theme ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTheme(theme)}
              className="text-xs"
            >
              {theme}
            </Button>
          ))}
        </div>
      </div>

      {/* Mood Filter */}
      <div>
        <h3 className="font-medium mb-3">Mood</h3>
        <div className="flex flex-wrap gap-2">
          {["All", ...moods].map((mood) => (
            <Button
              key={mood}
              variant={selectedMood === mood ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedMood(mood)}
              className="text-xs"
            >
              {mood}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );

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
            <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
              Collections
            </h1>
            <p className="text-lg text-muted-foreground">
              Curated sets of artworks organized by themes, moods, and stories.
              Each collection is handpicked by verified community curators.
            </p>
          </motion.div>

          {/* Search and Filters Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search collections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex items-center gap-3">
              {/* Mobile Filter Button */}
              <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="outline" size="icon">
                    <SlidersHorizontal className="w-4 h-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Desktop Filters */}
              <div className="hidden md:flex items-center gap-3">
                <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    {themes.map((theme) => (
                      <SelectItem key={theme} value={theme}>
                        {theme}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedMood} onValueChange={setSelectedMood}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Mood" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    {moods.map((mood) => (
                      <SelectItem key={mood} value={mood}>
                        {mood}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="flex items-center gap-2 mb-6 flex-wrap">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {activeFilters.map((filter) => (
                <Badge
                  key={filter.type}
                  variant="secondary"
                  className="gap-1 cursor-pointer hover:bg-secondary/80"
                  onClick={() => clearFilter(filter.type)}
                >
                  {filter.value}
                  <X className="w-3 h-3" />
                </Badge>
              ))}
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                Clear all
              </Button>
            </div>
          )}

          {/* Results Count */}
          <p className="text-sm text-muted-foreground mb-6">
            Showing {filteredCollections.length} collection{filteredCollections.length !== 1 ? "s" : ""}
          </p>

          {/* Collections Grid */}
          {filteredCollections.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCollections.map((collection, index) => (
                <CollectionCard key={collection.id} collection={collection} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground mb-4">
                No collections found matching your criteria.
              </p>
              <Button variant="outline" onClick={clearAllFilters}>
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Collections;
