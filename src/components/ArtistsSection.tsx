import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ArtistCard from "./ArtistCard";

const artists = [
  {
    id: "elena-vance",
    name: "Elena Vance",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    specialty: "Contemporary Urban Landscapes",
    reputation: "established" as const,
    followers: 2340,
    peerEndorsements: 47,
    recentWork: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800",
  },
  {
    id: "marcus-chen",
    name: "Marcus Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    specialty: "Light & Abstract Forms",
    reputation: "rising" as const,
    followers: 890,
    peerEndorsements: 23,
    recentWork: "https://images.unsplash.com/photo-1549887534-1541e9326642?w=800",
  },
  {
    id: "yuki-tanaka",
    name: "Yuki Tanaka",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
    specialty: "Mixed Media & Memory",
    reputation: "newcomer" as const,
    followers: 234,
    peerEndorsements: 8,
    recentWork: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800",
  },
  {
    id: "sarah-williams",
    name: "Sarah Williams",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
    specialty: "Digital Naturalism",
    reputation: "established" as const,
    followers: 3120,
    peerEndorsements: 62,
    recentWork: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800",
  },
];

const ArtistsSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div className="max-w-2xl">
            <h2 className="font-serif text-4xl font-semibold mb-4">
              Verified Artists
            </h2>
            <p className="text-lg text-muted-foreground">
              Every artist is verified by human moderators before publishing. 
              Reputation builds through consistent quality and peer recognition.
            </p>
          </div>
          <Link 
            to="/artists" 
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors whitespace-nowrap"
          >
            View all artists →
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {artists.map((artist, index) => (
            <ArtistCard key={artist.id} {...artist} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArtistsSection;
