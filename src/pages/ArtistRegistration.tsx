import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { userApi, type ArtistPortfolioSubmission } from "@/lib/api";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Palette, Plus, X, Upload, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ProtectedRoute from "@/components/ProtectedRoute";

interface PortfolioItem {
  title: string;
  imageUrl: string;
  description: string;
  year: string;
  medium: string;
}

const ArtistRegistration = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // Basic info
  const [specialty, setSpecialty] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  
  // Portfolio items
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([
    { title: "", imageUrl: "", description: "", year: "", medium: "" },
  ]);

  const addPortfolioItem = () => {
    setPortfolioItems([...portfolioItems, { title: "", imageUrl: "", description: "", year: "", medium: "" }]);
  };

  const removePortfolioItem = (index: number) => {
    if (portfolioItems.length > 1) {
      setPortfolioItems(portfolioItems.filter((_, i) => i !== index));
    }
  };

  const updatePortfolioItem = (index: number, field: keyof PortfolioItem, value: string) => {
    const updated = [...portfolioItems];
    updated[index] = { ...updated[index], [field]: value };
    setPortfolioItems(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!specialty.trim()) {
      toast.error("Please enter your artistic specialty");
      return;
    }

    if (!bio.trim() || bio.length < 50) {
      toast.error("Please provide a bio of at least 50 characters");
      return;
    }

    if (!location.trim()) {
      toast.error("Please enter your location");
      return;
    }

    // Validate portfolio items
    const validItems = portfolioItems.filter(
      (item) => item.title.trim() && item.imageUrl.trim()
    );

    if (validItems.length < 3) {
      toast.error("Please provide at least 3 portfolio pieces with title and image");
      return;
    }

    setLoading(true);

    try {
      const submission: ArtistPortfolioSubmission = {
        specialty: specialty.trim(),
        bio: bio.trim(),
        location: location.trim(),
        website: website.trim() || undefined,
        instagram: instagram.trim() || undefined,
        twitter: twitter.trim() || undefined,
        portfolioItems: validItems.map((item) => ({
          title: item.title.trim(),
          imageUrl: item.imageUrl.trim(),
          description: item.description.trim() || undefined,
          year: item.year.trim() || undefined,
          medium: item.medium.trim() || undefined,
        })),
      };

      await userApi.submitArtistPortfolio(submission);
      toast.success("Portfolio submitted successfully! Review typically takes 2-3 business days. Please check your email for updates.");
      navigate("/profile");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to submit portfolio");
    } finally {
      setLoading(false);
    }
  };

  // Check if user already has pending/approved application
  const hasApplication = user?.artistApplicationStatus === "pending" || user?.artistApplicationStatus === "approved";

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16 px-6">
          <div className="container mx-auto max-w-4xl">
            {hasApplication ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-serif flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                    Application Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg bg-muted">
                    <p className="font-medium mb-2">Your artist application status:</p>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        user.artistApplicationStatus === "approved"
                          ? "bg-green-100 text-green-800"
                          : user.artistApplicationStatus === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}>
                        {user.artistApplicationStatus === "approved" && "✓ Approved"}
                        {user.artistApplicationStatus === "pending" && "⏳ Pending Review"}
                        {user.artistApplicationStatus === "rejected" && "✗ Rejected"}
                      </span>
                    </div>
                    {user.artistApplicationStatus === "pending" && (
                      <div className="text-sm text-muted-foreground mt-2 space-y-1">
                        <p>Your portfolio is under review. We typically review applications within <strong>2 to 3 business days</strong>.</p>
                        <p>Please look out for an email notification once a decision has been made.</p>
                      </div>
                    )}
                    {user.artistApplicationStatus === "approved" && (
                      <p className="text-sm text-muted-foreground mt-2">
                        Congratulations! You can now post artworks and manage your artist profile.
                      </p>
                    )}
                  </div>
                  <Button onClick={() => navigate("/profile")} variant="outline">
                    Go to Profile
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Palette className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-3xl font-serif">Become an Artist</CardTitle>
                        <CardDescription className="mt-1">
                          Submit your portfolio to join our community of verified artists
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-8">
                      {/* Basic Information */}
                      <div className="space-y-6">
                        <h3 className="text-xl font-semibold border-b pb-2">Basic Information</h3>
                        
                        <div className="space-y-2">
                          <Label htmlFor="specialty">Artistic Specialty *</Label>
                          <Input
                            id="specialty"
                            placeholder="e.g., Contemporary Painting, Digital Art, Sculpture"
                            value={specialty}
                            onChange={(e) => setSpecialty(e.target.value)}
                            required
                            disabled={loading}
                          />
                          <p className="text-xs text-muted-foreground">
                            Describe your primary artistic medium or style
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="bio">Artist Bio *</Label>
                          <Textarea
                            id="bio"
                            placeholder="Tell us about yourself, your artistic journey, and what inspires your work..."
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            rows={5}
                            required
                            disabled={loading}
                            minLength={50}
                          />
                          <p className="text-xs text-muted-foreground">
                            Minimum 50 characters ({bio.length}/50)
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="location">Location *</Label>
                            <Input
                              id="location"
                              placeholder="City, Country"
                              value={location}
                              onChange={(e) => setLocation(e.target.value)}
                              required
                              disabled={loading}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="website">Website (Optional)</Label>
                            <Input
                              id="website"
                              type="url"
                              placeholder="https://yourwebsite.com"
                              value={website}
                              onChange={(e) => setWebsite(e.target.value)}
                              disabled={loading}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="instagram">Instagram (Optional)</Label>
                            <Input
                              id="instagram"
                              placeholder="@yourusername"
                              value={instagram}
                              onChange={(e) => setInstagram(e.target.value)}
                              disabled={loading}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="twitter">Twitter/X (Optional)</Label>
                            <Input
                              id="twitter"
                              placeholder="@yourusername"
                              value={twitter}
                              onChange={(e) => setTwitter(e.target.value)}
                              disabled={loading}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Portfolio Section */}
                      <div className="space-y-6">
                        <div className="flex items-center justify-between border-b pb-2">
                          <h3 className="text-xl font-semibold">Portfolio Pieces *</h3>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={addPortfolioItem}
                            disabled={loading}
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Piece
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Submit at least 3 portfolio pieces to demonstrate your artistic work
                        </p>

                        <AnimatePresence>
                          {portfolioItems.map((item, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="p-6 border rounded-xl bg-card space-y-4"
                            >
                              <div className="flex items-center justify-between mb-4">
                                <h4 className="font-semibold">Portfolio Piece {index + 1}</h4>
                                {portfolioItems.length > 1 && (
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removePortfolioItem(index)}
                                    disabled={loading}
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                )}
                              </div>

                              <div className="space-y-2">
                                <Label>Title *</Label>
                                <Input
                                  placeholder="Artwork title"
                                  value={item.title}
                                  onChange={(e) => updatePortfolioItem(index, "title", e.target.value)}
                                  required
                                  disabled={loading}
                                />
                              </div>

                              <div className="space-y-2">
                                <Label>Image URL *</Label>
                                <div className="flex gap-2">
                                  <Input
                                    placeholder="https://example.com/artwork.jpg"
                                    value={item.imageUrl}
                                    onChange={(e) => updatePortfolioItem(index, "imageUrl", e.target.value)}
                                    type="url"
                                    required
                                    disabled={loading}
                                  />
                                  {item.imageUrl && (
                                    <div className="w-20 h-20 rounded-lg overflow-hidden border flex-shrink-0">
                                      <img
                                        src={item.imageUrl}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                          const target = e.currentTarget as HTMLImageElement;
                                          target.style.display = "none";
                                        }}
                                      />
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label>Description (Optional)</Label>
                                <Textarea
                                  placeholder="Describe this piece, your inspiration, techniques used..."
                                  value={item.description}
                                  onChange={(e) => updatePortfolioItem(index, "description", e.target.value)}
                                  rows={3}
                                  disabled={loading}
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label>Year (Optional)</Label>
                                  <Input
                                    placeholder="2024"
                                    value={item.year}
                                    onChange={(e) => updatePortfolioItem(index, "year", e.target.value)}
                                    disabled={loading}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Medium (Optional)</Label>
                                  <Input
                                    placeholder="Oil on Canvas, Digital, etc."
                                    value={item.medium}
                                    onChange={(e) => updatePortfolioItem(index, "medium", e.target.value)}
                                    disabled={loading}
                                  />
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>

                      {/* Submit Button */}
                      <div className="flex items-center gap-4 pt-6 border-t">
                        <Button
                          type="submit"
                          size="lg"
                          disabled={loading}
                          className="flex-1"
                        >
                          {loading ? "Submitting..." : "Submit Portfolio for Review"}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => navigate("/profile")}
                          disabled={loading}
                        >
                          Cancel
                        </Button>
                      </div>

                      <p className="text-xs text-muted-foreground text-center">
                        By submitting, you agree that your portfolio will be reviewed by our moderation team. 
                        We typically review applications within 2-3 business days.
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default ArtistRegistration;

