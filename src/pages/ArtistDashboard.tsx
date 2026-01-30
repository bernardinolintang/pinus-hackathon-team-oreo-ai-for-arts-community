import { useState, useEffect, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { userApi, type MockArtistArtwork } from "@/lib/api";
import ProtectedRoute from "@/components/ProtectedRoute";
import ArtworkCardSkeleton from "@/components/ArtworkCardSkeleton";
import { Palette, Plus, ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { Navigate } from "react-router-dom";
import { getUserMessage } from "@/lib/errors";

const ArtistDashboard = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [artworks, setArtworks] = useState<MockArtistArtwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [postOpen, setPostOpen] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [postImageUrl, setPostImageUrl] = useState("");
  const [posting, setPosting] = useState(false);

  const fetchArtworks = useCallback(() => {
    if (user?.role !== "artist") return;
    setError(null);
    setLoading(true);
    userApi
      .getMyArtworks()
      .then(setArtworks)
      .catch((e) => {
        const msg = getUserMessage(e, "artworks");
        setError(msg);
        toast.error(msg);
      })
      .finally(() => setLoading(false));
  }, [user?.role]);

  useEffect(() => {
    if (user?.role === "artist") {
      setLoading(true);
      setError(null);
      userApi
        .getMyArtworks()
        .then(setArtworks)
        .catch((e) => {
          const msg = getUserMessage(e, "artworks");
          setError(msg);
          toast.error(msg);
        })
        .finally(() => setLoading(false));
    }
  }, [user?.role, user?.id]);

  // Open post dialog when coming from homepage plus button (?post=1)
  useEffect(() => {
    if (searchParams.get("post") === "1") {
      setPostOpen(true);
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  if (!user) return null;
  if (user.role !== "artist") {
    return <Navigate to="/profile" replace />;
  }

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postImageUrl.trim()) {
      toast.error("Image URL is required");
      return;
    }
    setPosting(true);
    try {
      const created = await userApi.createArtwork({
        title: postTitle.trim() || "Untitled",
        description: postDescription.trim(),
        imageUrl: postImageUrl.trim(),
      });
      setArtworks((prev) => [created, ...prev]);
      setPostOpen(false);
      setPostTitle("");
      setPostDescription("");
      setPostImageUrl("");
      toast.success("Artwork posted!");
    } catch (error) {
      toast.error(getUserMessage(error, "post"));
    } finally {
      setPosting(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        <Header />
        <div className="pt-24 pb-16 px-6">
          <div className="container mx-auto max-w-4xl">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl font-serif flex items-center gap-2">
                      <Palette className="w-6 h-6 text-primary" />
                      Artist dashboard
                    </CardTitle>
                    <CardDescription>Post and manage your artworks. See who liked and commented on your work.</CardDescription>
                  </div>
                  <Dialog open={postOpen} onOpenChange={setPostOpen}>
                    <DialogTrigger asChild>
                      <Button className="shrink-0">
                        <Plus className="w-4 h-4 mr-2" />
                        Post artwork
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Post artwork</DialogTitle>
                        <DialogDescription>Add a new artwork. Title and description are optional.</DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handlePost} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="post-title">Title (optional)</Label>
                          <Input
                            id="post-title"
                            value={postTitle}
                            onChange={(e) => setPostTitle(e.target.value)}
                            placeholder="Untitled"
                            disabled={posting}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="post-description">Description (optional)</Label>
                          <Textarea
                            id="post-description"
                            value={postDescription}
                            onChange={(e) => setPostDescription(e.target.value)}
                            placeholder="Describe your artwork..."
                            rows={3}
                            disabled={posting}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="post-image">Image URL (required)</Label>
                          <Input
                            id="post-image"
                            type="url"
                            value={postImageUrl}
                            onChange={(e) => setPostImageUrl(e.target.value)}
                            placeholder="https://..."
                            required
                            disabled={posting}
                          />
                        </div>
                        <DialogFooter>
                          <Button type="button" variant="outline" onClick={() => setPostOpen(false)} disabled={posting}>
                            Cancel
                          </Button>
                          <Button type="submit" disabled={posting}>
                            {posting ? "Posting…" : "Post artwork"}
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="status" aria-live="polite" aria-busy="true">
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <ArtworkCardSkeleton key={i} delay={i * 0.05} />
                    ))}
                    <span className="sr-only">Loading your artworks</span>
                  </div>
                ) : error ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">{error}</p>
                    <Button variant="outline" onClick={fetchArtworks}>
                      Try again
                    </Button>
                  </div>
                ) : artworks.length === 0 ? (
                  <div className="text-center py-12 rounded-lg border border-dashed border-border">
                    <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground mb-2">You haven&apos;t posted any artworks yet.</p>
                    <Button onClick={() => setPostOpen(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Post your first artwork
                    </Button>
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {artworks.map((art) => (
                      <Link key={art.id} to={`/artworks/${art.id}`} className="group block rounded-lg border border-border overflow-hidden hover:border-primary/50 transition-colors">
                        <div className="aspect-square bg-muted relative overflow-hidden">
                          <img
                            src={art.imageUrl}
                            alt={art.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://placehold.co/400x400?text=Artwork";
                            }}
                          />
                        </div>
                        <div className="p-3">
                          <p className="font-medium truncate">{art.title}</p>
                          {art.description && <p className="text-sm text-muted-foreground line-clamp-2">{art.description}</p>}
                        </div>
                      </Link>
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

export default ArtistDashboard;
