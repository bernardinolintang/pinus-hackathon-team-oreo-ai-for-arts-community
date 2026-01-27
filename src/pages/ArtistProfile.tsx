import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Award,
  Users,
  Star,
  Calendar,
  MapPin,
  Globe,
  Heart,
  UserPlus,
  ExternalLink,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getArtistById, Artist, Endorsement, PortfolioItem } from "@/data/artists";

const reputationConfig = {
  established: {
    label: "Established Artist",
    badgeClass: "trust-badge",
    color: "bg-trust",
    description: "Recognized for consistent quality and significant peer recognition",
  },
  rising: {
    label: "Rising Voice",
    badgeClass: "peer-badge",
    color: "bg-peer",
    description: "Growing recognition from the community",
  },
  newcomer: {
    label: "New Talent",
    badgeClass: "organic-badge",
    color: "bg-organic",
    description: "Recently joined and building their presence",
  },
};

const trustScoreConfig = {
  high: { label: "Highly Trusted", class: "trust-badge" },
  medium: { label: "Peer Validated", class: "peer-badge" },
  emerging: { label: "Emerging", class: "organic-badge" },
};

const PortfolioCard = ({ item }: { item: PortfolioItem }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300"
  >
    <div className="relative aspect-[4/3] overflow-hidden">
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute top-3 left-3">
        <span className={trustScoreConfig[item.trustScore].class}>
          <Star className="w-3 h-3" />
          {trustScoreConfig[item.trustScore].label}
        </span>
      </div>
      <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className="w-9 h-9 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors">
          <Heart className="w-4 h-4 text-primary" />
        </button>
      </div>
    </div>
    <div className="p-4">
      <h4 className="font-serif text-lg font-semibold mb-2">{item.title}</h4>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {item.keywords.slice(0, 3).map((keyword) => (
          <span
            key={keyword}
            className="text-xs px-2 py-0.5 bg-muted rounded text-muted-foreground"
          >
            {keyword}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          <span>{item.peerLikes} peers</span>
        </div>
        <div className="flex items-center gap-1">
          <Heart className="w-4 h-4" />
          <span>{item.totalLikes}</span>
        </div>
      </div>
    </div>
  </motion.div>
);

const EndorsementCard = ({ endorsement }: { endorsement: Endorsement }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-card rounded-xl p-5 border border-border"
  >
    <div className="flex items-start gap-4">
      <img
        src={endorsement.fromArtist.avatar}
        alt={endorsement.fromArtist.name}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium">{endorsement.fromArtist.name}</span>
          <span
            className={
              reputationConfig[endorsement.fromArtist.reputation].badgeClass
            }
          >
            <Award className="w-3 h-3" />
            {reputationConfig[endorsement.fromArtist.reputation].label}
          </span>
        </div>
        <p className="text-muted-foreground text-sm mb-2">
          "{endorsement.message}"
        </p>
        <span className="text-xs text-muted-foreground">{endorsement.date}</span>
      </div>
    </div>
  </motion.div>
);

const ArtistProfile = () => {
  const { id } = useParams<{ id: string }>();
  const artist = getArtistById(id || "");

  if (!artist) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-6 text-center py-16">
            <h1 className="font-serif text-3xl font-semibold mb-4">
              Artist Not Found
            </h1>
            <p className="text-muted-foreground mb-6">
              The artist you're looking for doesn't exist.
            </p>
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

  const repConfig = reputationConfig[artist.reputation];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero / Cover Section */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={artist.coverImage}
          alt={`${artist.name}'s cover`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      <main className="relative -mt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Back Button */}
          <Link
            to="/discover"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Discover
          </Link>

          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-2xl p-6 md:p-8 shadow-card mb-8"
          >
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar */}
              <div className="shrink-0">
                <img
                  src={artist.avatar}
                  alt={artist.name}
                  className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-background object-cover shadow-soft"
                />
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="font-serif text-3xl md:text-4xl font-semibold">
                        {artist.name}
                      </h1>
                      <span className={repConfig.badgeClass}>
                        <Award className="w-3 h-3" />
                        {repConfig.label}
                      </span>
                    </div>
                    <p className="text-lg text-muted-foreground">
                      {artist.specialty}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Button>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Follow
                    </Button>
                    <Button variant="outline">Message</Button>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-muted-foreground mb-6 max-w-2xl">
                  {artist.bio}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    <span>{artist.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {artist.joinedDate}</span>
                  </div>
                  {artist.website && (
                    <a
                      href={`https://${artist.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                    >
                      <Globe className="w-4 h-4" />
                      <span>{artist.website}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-6">
                  <div className="text-center">
                    <div className="font-serif text-2xl font-semibold">
                      {artist.followers.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="font-serif text-2xl font-semibold">
                      {artist.following}
                    </div>
                    <div className="text-sm text-muted-foreground">Following</div>
                  </div>
                  <div className="text-center">
                    <div className="font-serif text-2xl font-semibold">
                      {artist.peerEndorsements}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Peer Endorsements
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-serif text-2xl font-semibold">
                      {artist.portfolio.length}
                    </div>
                    <div className="text-sm text-muted-foreground">Artworks</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Follower Avatars */}
            {artist.followerAvatars.length > 0 && (
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {artist.followerAvatars.slice(0, 5).map((avatar, index) => (
                      <img
                        key={index}
                        src={avatar}
                        alt="Follower"
                        className="w-8 h-8 rounded-full border-2 border-card object-cover"
                      />
                    ))}
                    {artist.followers > 5 && (
                      <div className="w-8 h-8 rounded-full border-2 border-card bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
                        +{(artist.followers - 5).toLocaleString()}
                      </div>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Followed by artists you may know
                  </span>
                </div>
              </div>
            )}
          </motion.div>

          {/* Tabs */}
          <Tabs defaultValue="portfolio" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="portfolio">
                Portfolio ({artist.portfolio.length})
              </TabsTrigger>
              <TabsTrigger value="endorsements">
                Endorsements ({artist.endorsements.length})
              </TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>

            <TabsContent value="portfolio">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {artist.portfolio.map((item, index) => (
                  <PortfolioCard key={item.id} item={item} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="endorsements">
              <div className="max-w-2xl space-y-4">
                {artist.endorsements.length > 0 ? (
                  artist.endorsements.map((endorsement, index) => (
                    <EndorsementCard key={endorsement.id} endorsement={endorsement} />
                  ))
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    No endorsements yet
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="about">
              <div className="max-w-2xl bg-card rounded-xl p-6 border border-border">
                <h3 className="font-serif text-xl font-semibold mb-4">
                  About {artist.name}
                </h3>
                <p className="text-muted-foreground mb-6">{artist.bio}</p>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Reputation Tier</h4>
                    <div className="flex items-center gap-3">
                      <span className={repConfig.badgeClass}>
                        <Award className="w-3 h-3" />
                        {repConfig.label}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {repConfig.description}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Specialty</h4>
                    <p className="text-muted-foreground">{artist.specialty}</p>
                  </div>

                  {artist.socialLinks && (
                    <div>
                      <h4 className="font-medium mb-2">Social Links</h4>
                      <div className="flex gap-3">
                        {artist.socialLinks.instagram && (
                          <a
                            href={`https://instagram.com/${artist.socialLinks.instagram}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            @{artist.socialLinks.instagram}
                          </a>
                        )}
                        {artist.socialLinks.twitter && (
                          <a
                            href={`https://twitter.com/${artist.socialLinks.twitter}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            @{artist.socialLinks.twitter}
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ArtistProfile;
