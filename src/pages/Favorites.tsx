import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ArtworkCard from "@/components/ArtworkCard";
import ArtworkCardSkeleton from "@/components/ArtworkCardSkeleton";
import { Bookmark } from "lucide-react";
import { userApi } from "@/lib/api";
import { getArtworkById } from "@/data/artworks";
import type { ArtworkDetailItem } from "@/data/artworks";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { getUserMessage } from "@/lib/errors";

const Favorites = () => {
  const { user } = useAuth();
  const [artworks, setArtworks] = useState<ArtworkDetailItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useDocumentTitle("My Favorites");

  const fetchFavorites = useCallback(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    setError(null);
    setLoading(true);
    userApi
      .getFavoriteArtworks()
      .then((list) => {
        const resolved = list
          .map((f) => getArtworkById(f.artworkId))
          .filter((a): a is ArtworkDetailItem => a != null);
        setArtworks(resolved);
      })
      .catch((e) => setError(getUserMessage(e, "favorites")))
      .finally(() => setLoading(false));
  }, [user]);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    setError(null);
    setLoading(true);
    userApi
      .getFavoriteArtworks()
      .then((list) => {
        if (cancelled) return;
        const resolved = list
          .map((f) => getArtworkById(f.artworkId))
          .filter((a): a is ArtworkDetailItem => a != null);
        setArtworks(resolved);
      })
      .catch((e) => {
        if (!cancelled) setError(getUserMessage(e, "favorites"));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [user]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Header />
        <main id="main-content" className="pt-24 pb-16">
          <div className="container mx-auto px-6 max-w-6xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-serif flex items-center gap-2">
                  <Bookmark className="w-6 h-6" />
                  My Favorites
                </CardTitle>
                <CardDescription>Artworks you've saved for later</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="status" aria-live="polite" aria-busy="true">
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <ArtworkCardSkeleton key={i} delay={i * 0.05} />
                    ))}
                    <span className="sr-only">Loading your favorites</span>
                  </div>
                ) : error ? (
                  <div className="text-center py-20">
                    <p className="text-muted-foreground mb-4">{error}</p>
                    <Button variant="outline" onClick={fetchFavorites}>
                      Try again
                    </Button>
                  </div>
                ) : artworks.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-20"
                  >
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                      <Bookmark className="w-12 h-12 text-primary/60" />
                    </div>
                    <h3 className="font-serif text-2xl font-semibold mb-3">No favorites yet</h3>
                    <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                      Start exploring and save artworks you love! Your saved pieces will appear here.
                    </p>
                    <Link to="/discover">
                      <Button size="lg" className="px-8">
                        Discover Artworks
                      </Button>
                    </Link>
                  </motion.div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {artworks.map((artwork, index) => (
                      <ArtworkCard
                        key={artwork.artworkId}
                        artworkId={artwork.artworkId}
                        artistId={artwork.artistId}
                        image={artwork.image}
                        title={artwork.title}
                        artist={artwork.artist}
                        artistAvatar={artwork.artistAvatar}
                        peerLikes={artwork.peerLikes}
                        totalLikes={artwork.totalLikes}
                        trustScore={artwork.trustScore}
                        peerNote={artwork.peerNote}
                        keywords={artwork.keywords}
                        delay={index * 0.05}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default Favorites;
