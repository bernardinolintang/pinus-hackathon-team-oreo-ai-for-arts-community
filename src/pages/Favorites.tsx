import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
                  <div className="text-center py-16">
                    <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4 opacity-50" />
                    <h3 className="font-serif text-xl font-semibold mb-2">No favorites yet</h3>
                    <p className="text-muted-foreground mb-6">
                      Start exploring and save artworks you love!
                    </p>
                    <Link to="/discover">
                      <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                        Discover Artworks
                      </button>
                    </Link>
                  </div>
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

