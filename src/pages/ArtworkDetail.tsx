import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, MessageCircle, Users, Star, Share2, Bookmark, Send, Trash2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { getArtistById } from "@/data/artists";
import { userApi, type Comment } from "@/lib/api";
import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";

// Mock artwork data - in real app, this would come from API
const getArtworkById = (artworkId: string) => {
  const allArtworks = [
    {
      artworkId: "urban-solitude-1",
      artistId: "elena-vance",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200",
      title: "Urban Solitude",
      artist: "Elena Vance",
      artistAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      peerLikes: 12,
      totalLikes: 234,
      totalViews: 1250,
      trustScore: "high" as const,
      peerNote: "The emotional depth here reminds me of early Hopper work",
      keywords: ["urban", "solitude", "contemporary", "cityscape"],
      description: "A contemplative exploration of urban isolation, capturing the quiet moments between the chaos of city life. This piece invites viewers to reflect on the spaces we inhabit and the emotions they evoke.",
      year: 2023,
      medium: "Oil on Canvas",
      dimensions: "36 × 48 inches",
    },
    {
      artworkId: "morning-light-3",
      artistId: "marcus-chen",
      image: "https://images.unsplash.com/photo-1549887534-1541e9326642?w=1200",
      title: "Morning Light Series III",
      artist: "Marcus Chen",
      artistAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      peerLikes: 8,
      totalLikes: 156,
      totalViews: 890,
      trustScore: "medium" as const,
      keywords: ["light", "abstract", "minimalism", "series"],
      description: "Part of an ongoing series exploring the interplay between light and geometric forms. This piece captures the delicate balance of morning illumination through abstract composition.",
      year: 2024,
      medium: "Acrylic on Canvas",
      dimensions: "24 × 30 inches",
    },
    {
      artworkId: "fragments-memory",
      artistId: "yuki-tanaka",
      image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=1200",
      title: "Fragments of Memory",
      artist: "Yuki Tanaka",
      artistAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
      peerLikes: 5,
      totalLikes: 89,
      totalViews: 450,
      trustScore: "emerging" as const,
      peerNote: "A fresh perspective on traditional Japanese aesthetics",
      keywords: ["memory", "japanese", "mixed media", "cultural"],
      description: "Drawing from Japanese heritage, this mixed media work explores the fragile nature of memory and the beauty of impermanence through layered textures and cultural symbolism.",
      year: 2024,
      medium: "Mixed Media",
      dimensions: "20 × 28 inches",
    },
    {
      artworkId: "digital-botanica",
      artistId: "sarah-williams",
      image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=1200",
      title: "Digital Botanica",
      artist: "Sarah Williams",
      artistAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
      peerLikes: 15,
      totalLikes: 312,
      totalViews: 2100,
      trustScore: "high" as const,
      keywords: ["digital", "nature", "futurism", "botanical"],
      description: "A digital exploration of botanical forms through a contemporary lens, questioning our relationship with nature in an increasingly digital age.",
      year: 2023,
      medium: "Digital Art",
      dimensions: "3000 × 4000 pixels",
    },
  ];

  return allArtworks.find((art) => art.artworkId === artworkId);
};

const ArtworkDetail = () => {
  const { id } = useParams<{ id: string }>();
  const artwork = getArtworkById(id || "");
  const { user, isFavorite, toggleFavorite, isFollowing, toggleFollow, isLiked, toggleLike, addComment, deleteComment } = useAuth();
  const artist = artwork ? getArtistById(artwork.artistId) : null;
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState("");
  const [loadingComments, setLoadingComments] = useState(false);
  const [submittingComment, setSubmittingComment] = useState(false);
  const [likeCount, setLikeCount] = useState(artwork?.totalLikes || 0);
  const liked = artwork ? isLiked(artwork.artworkId) : false;

  if (!artwork) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-6 text-center py-16">
            <h1 className="font-serif text-3xl font-semibold mb-4">Artwork Not Found</h1>
            <p className="text-muted-foreground mb-6">The artwork you're looking for doesn't exist.</p>
            <Link to="/discover">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Discover
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Load comments on mount
  useEffect(() => {
    if (artwork) {
      loadComments();
    }
  }, [artwork?.artworkId]);

  const loadComments = async () => {
    if (!artwork) return;
    setLoadingComments(true);
    try {
      const fetchedComments = await userApi.getComments(artwork.artworkId);
      setComments(fetchedComments);
    } catch (error) {
      console.error("Failed to load comments:", error);
      // For demo purposes, use empty array if API fails
      setComments([]);
    } finally {
      setLoadingComments(false);
    }
  };

  const isFav = artwork ? isFavorite(artwork.artworkId) : false;
  const isFollowingArtist = artist && artwork ? isFollowing(artwork.artistId) : false;
  
  // Calculate peer percentage (mock calculation - in real app, this would come from API)
  const totalPeerConnections = 18; // Mock: total peers in user's network
  const peerPercentage = artwork && totalPeerConnections > 0 
    ? Math.round((artwork.peerLikes / totalPeerConnections) * 100) 
    : 0;

  const trustColors = {
    high: "trust-badge",
    medium: "peer-badge",
    emerging: "organic-badge",
  };

  const trustLabels = {
    high: "Highly Trusted",
    medium: "Peer Validated",
    emerging: "Emerging Voice",
  };

  const handleFavoriteClick = async () => {
    if (!user) {
      toast.error("Please sign in to save favorites");
      return;
    }

    try {
      await toggleFavorite(artwork.artworkId, artwork.artistId);
      toast.success(isFav ? "Removed from favorites" : "Saved to favorites");
    } catch (error) {
      toast.error("Failed to update favorite");
    }
  };

  const handleFollowClick = async () => {
    if (!user) {
      toast.error("Please sign in to follow artists");
      return;
    }

    if (!artist || !artwork) return;

    try {
      await toggleFollow(artwork.artistId);
      toast.success(isFollowingArtist ? "Unfollowed artist" : "Following artist");
    } catch (error) {
      toast.error("Failed to update follow status");
    }
  };

  const handleLikeClick = async () => {
    if (!user) {
      toast.error("Please sign in to like artworks");
      return;
    }

    if (!artwork) return;

    try {
      await toggleLike(artwork.artworkId);
      setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
      toast.success(liked ? "Removed like" : "Liked artwork");
    } catch (error) {
      toast.error("Failed to update like");
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please sign in to comment");
      return;
    }

    if (!artwork || !commentText.trim()) return;

    setSubmittingComment(true);
    try {
      const newComment = await addComment(artwork.artworkId, commentText.trim());
      setComments((prev) => [newComment, ...prev]);
      setCommentText("");
      toast.success("Comment added");
    } catch (error) {
      toast.error("Failed to add comment");
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!artwork) return;
    
    try {
      await deleteComment(artwork.artworkId, commentId);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
      toast.success("Comment deleted");
    } catch (error) {
      toast.error("Failed to delete comment");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Back Button */}
          <Link
            to="/discover"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Discover
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="sticky top-24"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted shadow-card">
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.onerror = null;
                    target.src = "/placeholder.svg";
                  }}
                />
                <div className="absolute top-4 left-4">
                  <span className={trustColors[artwork.trustScore]}>
                    <Star className="w-3 h-3" />
                    {trustLabels[artwork.trustScore]}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Content Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Title and Actions */}
              <div>
                <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4">{artwork.title}</h1>
                
                {/* Artist Info */}
                <div className="flex items-center gap-4 mb-6">
                  <Link to={`/artists/${artwork.artistId}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={artwork.artistAvatar} alt={artwork.artist} />
                      <AvatarFallback>{artwork.artist[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{artwork.artist}</p>
                      <p className="text-sm text-muted-foreground">Artist</p>
                    </div>
                  </Link>
                  {user && artist && (
                    <Button
                      variant={isFollowingArtist ? "outline" : "default"}
                      size="sm"
                      onClick={handleFollowClick}
                    >
                      {isFollowingArtist ? "Following" : "Follow"}
                    </Button>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 mb-6">
                  {user ? (
                    <>
                      <Button
                        variant={liked ? "default" : "outline"}
                        onClick={handleLikeClick}
                        className="flex-1"
                      >
                        <Heart className={`w-4 h-4 mr-2 ${liked ? "fill-current" : ""}`} />
                        {liked ? "Liked" : "Like"} ({likeCount})
                      </Button>
                      <Button
                        variant={isFav ? "default" : "outline"}
                        onClick={handleFavoriteClick}
                        className="flex-1"
                      >
                        <Heart className={`w-4 h-4 mr-2 ${isFav ? "fill-current" : ""}`} />
                        {isFav ? "Saved" : "Save"}
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </>
                  ) : (
                    <div className="w-full p-4 bg-muted rounded-lg text-center">
                      <p className="text-sm text-muted-foreground mb-2">
                        Sign in to like, save, and comment on artworks
                      </p>
                      <Link to="/login">
                        <Button size="sm">Sign In</Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Peer Interaction Stats */}
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Peer Interaction
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Peers who liked this</span>
                      <span className="font-semibold text-lg">{peerPercentage}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-500"
                        style={{ width: `${peerPercentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {artwork.peerLikes} out of {totalPeerConnections} peers in your network
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                    <div className="text-center">
                      <div className="font-serif text-2xl font-semibold">{artwork.peerLikes}</div>
                      <div className="text-xs text-muted-foreground">Peer Likes</div>
                    </div>
                    <div className="text-center">
                      <div className="font-serif text-2xl font-semibold">{likeCount}</div>
                      <div className="text-xs text-muted-foreground">Total Likes</div>
                    </div>
                    <div className="text-center">
                      <div className="font-serif text-2xl font-semibold">{artwork.totalViews}</div>
                      <div className="text-xs text-muted-foreground">Views</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-semibold mb-3">About this artwork</h3>
                <p className="text-muted-foreground leading-relaxed">{artwork.description}</p>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Year</p>
                  <p className="font-medium">{artwork.year}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Medium</p>
                  <p className="font-medium">{artwork.medium}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground mb-1">Dimensions</p>
                  <p className="font-medium">{artwork.dimensions}</p>
                </div>
              </div>

              {/* Keywords */}
              <div>
                <h3 className="font-semibold mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {artwork.keywords.map((keyword) => (
                    <Badge key={keyword} variant="secondary">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Peer Note */}
              {artwork.peerNote && (
                <div className="bg-secondary/50 rounded-xl p-4 border border-border">
                  <p className="text-sm text-muted-foreground mb-2">Peer Note</p>
                  <p className="italic">"{artwork.peerNote}"</p>
                </div>
              )}

              {/* Comments Section */}
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Comments ({comments.length})
                </h3>

                {/* Comment Form - Only for logged-in users */}
                {user ? (
                  <form onSubmit={handleCommentSubmit} className="mb-6">
                    <div className="flex gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Textarea
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          placeholder="Add a comment..."
                          rows={3}
                          className="mb-2"
                          disabled={submittingComment}
                        />
                        <Button
                          type="submit"
                          size="sm"
                          disabled={!commentText.trim() || submittingComment}
                        >
                          <Send className="w-4 h-4 mr-2" />
                          {submittingComment ? "Posting..." : "Post Comment"}
                        </Button>
                      </div>
                    </div>
                  </form>
                ) : (
                  <div className="mb-6 p-4 bg-muted rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-2">
                      Sign in to join the conversation
                    </p>
                    <Link to="/login">
                      <Button size="sm">Sign In</Button>
                    </Link>
                  </div>
                )}

                {/* Comments List */}
                {loadingComments ? (
                  <div className="text-center py-8 text-muted-foreground">Loading comments...</div>
                ) : comments.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No comments yet. Be the first to comment!
                  </div>
                ) : (
                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <div key={comment.id} className="flex gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={comment.userAvatar} alt={comment.userName} />
                          <AvatarFallback>{comment.userName[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-1">
                            <div>
                              <p className="font-medium text-sm">{comment.userName}</p>
                              <p className="text-xs text-muted-foreground">
                                {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                              </p>
                            </div>
                            {user && user.id === comment.userId && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteComment(comment.id)}
                                className="h-8 w-8 p-0"
                              >
                                <Trash2 className="w-4 h-4 text-muted-foreground" />
                              </Button>
                            )}
                          </div>
                          <p className="text-sm">{comment.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ArtworkDetail;

