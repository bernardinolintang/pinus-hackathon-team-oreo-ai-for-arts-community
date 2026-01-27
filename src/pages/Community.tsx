import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users,
  Shield,
  MessageCircle,
  Sparkles,
  Award,
  Heart,
  ArrowRight,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { artists } from "@/data/artists";

const featuredEndorsements = artists.flatMap((a) =>
  a.endorsements.slice(0, 2).map((e) => ({
    artist: a.name,
    artistId: a.id,
    from: e.fromArtist.name,
    message: e.message,
    avatar: e.fromArtist.avatar,
  }))
).slice(0, 6);

const principles = [
  {
    icon: Shield,
    title: "Trust over popularity",
    description: "Recommendations come from your network and verified curators, not opaque engagement metrics.",
  },
  {
    icon: MessageCircle,
    title: "Peer learning",
    description: "Artists endorse each other. Discover work through genuine appreciation and shared practice.",
  },
  {
    icon: Sparkles,
    title: "Explainable signals",
    description: "We show why an artist or artwork is suggested—linked to people you follow and trust.",
  },
];

export default function Community() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="py-16 md:py-24 border-b border-border">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              <div className="flex items-center gap-2 text-primary mb-3">
                <Users className="w-5 h-5" />
                <span className="text-sm font-medium">Community</span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
                Built on trust, not likes
              </h1>
              <p className="text-lg text-muted-foreground">
                Atelier is a community-driven art platform. Discovery is shaped by
                your network, peer endorsements, and transparent reputation—not
                engagement-maximizing algorithms.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Principles */}
        <section className="py-16 md:py-20 bg-card/50">
          <div className="container mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-2xl md:text-3xl font-semibold mb-10"
            >
              How we work
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {principles.map((principle, i) => {
                const Icon = principle.icon;
                return (
                  <motion.div
                    key={principle.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold">{principle.title}</h3>
                    <p className="text-muted-foreground">{principle.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Peer voices */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10"
            >
              <div>
                <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-2">
                  Peer endorsements
                </h2>
                <p className="text-muted-foreground max-w-xl">
                  Artists recommend each other. Here’s what the community is saying.
                </p>
              </div>
              <Link to="/artists">
                <Button variant="outline" className="gap-2">
                  Browse artists <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredEndorsements.map((e, i) => (
                <motion.div
                  key={`${e.artist}-${e.from}-${i}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card rounded-2xl p-6 border border-border shadow-card hover:shadow-hover transition-shadow"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <img
                      src={e.avatar}
                      alt={e.from}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium">{e.from}</p>
                      <p className="text-sm text-muted-foreground">
                        on{" "}
                        <Link
                          to={`/artists/${e.artistId}`}
                          className="text-primary hover:underline"
                        >
                          {e.artist}
                        </Link>
                      </p>
                    </div>
                    <Award className="w-4 h-4 text-primary shrink-0 mt-1 ml-auto" />
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed italic">
                    &ldquo;{e.message}&rdquo;
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-primary/5 border-t border-border">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Heart className="w-10 h-10 text-primary mx-auto mb-4" />
              <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-3">
                Join the community
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-6">
                Follow artists, explore trusted recommendations, and discover work
                through people you admire.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/discover">
                  <Button className="gap-2">
                    Discover art <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/artists">
                  <Button variant="outline">View artists</Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
