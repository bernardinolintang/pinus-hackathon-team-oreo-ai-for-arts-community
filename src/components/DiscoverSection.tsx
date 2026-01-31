import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import ArtworkCard from "./ArtworkCard";

const artworks = [
  {
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
    keywords: ["urban", "solitude", "contemporary"],
  },
  {
    artworkId: "morning-light-3",
    artistId: "marcus-chen",
    image: "https://images.unsplash.com/photo-1549887534-1541e9326642?w=800",
    title: "Morning Light Series III",
    artist: "Marcus Chen",
    artistAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    peerLikes: 8,
    totalLikes: 156,
    trustScore: "medium" as const,
    keywords: ["light", "abstract", "minimalism"],
  },
  {
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
    keywords: ["memory", "japanese", "mixed media"],
  },
  {
    artworkId: "digital-botanica",
    artistId: "sarah-williams",
    image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800",
    title: "Digital Botanica",
    artist: "Sarah Williams",
    artistAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
    peerLikes: 15,
    totalLikes: 312,
    trustScore: "high" as const,
    keywords: ["digital", "nature", "futurism"],
  },
  {
    artworkId: "color-study-47",
    artistId: "james-rivera",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800",
    title: "Color Study No. 47",
    artist: "James Rivera",
    artistAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    peerLikes: 7,
    totalLikes: 178,
    trustScore: "medium" as const,
    keywords: ["color", "study", "expressionism"],
  },
  {
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
    keywords: ["motion", "sculpture", "minimalism"],
  },
];

const DiscoverSection = () => {
  const { t } = useTranslation();
  return (
    <section id="home-discover-section" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-12"
        >
          <h2 className="font-serif text-4xl font-semibold mb-4">
            {t("discover.sectionTitle")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("discover.description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artworks.map((artwork, index) => (
            <ArtworkCard key={index} {...artwork} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiscoverSection;
