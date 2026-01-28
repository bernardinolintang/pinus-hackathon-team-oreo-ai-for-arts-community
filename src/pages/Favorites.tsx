import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { getArtistById } from "@/data/artists";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Favorites = () => {
  const { user } = useAuth();

  // In a real app, you'd fetch this from the API
  // For now, we'll show a placeholder
  const favorites: Array<{ artworkId: string; artistId: string; title: string; image: string; artistName: string }> = [];

  // This would be populated from the API response
  // For demo purposes, we'll show an empty state or fetch from artists data

  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        <Header />
        <div className="pt-24 pb-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-serif flex items-center gap-2">
                  <Heart className="w-6 h-6" />
                  My Favorites
                </CardTitle>
                <CardDescription>Artworks you've saved for later</CardDescription>
              </CardHeader>
              <CardContent>
                {favorites.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-20"
                  >
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                      <Heart className="w-12 h-12 text-primary/60" />
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
                    {favorites.map((favorite) => (
                      <motion.div
                        key={favorite.artworkId}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300"
                      >
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <img
                            src={favorite.image}
                            alt={favorite.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-serif text-lg font-semibold mb-1">{favorite.title}</h3>
                          <p className="text-sm text-muted-foreground">{favorite.artistName}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Favorites;

