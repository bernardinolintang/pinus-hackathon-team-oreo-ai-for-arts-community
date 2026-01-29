import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Award, Users, Eye, Lock, FileCheck, GitBranch } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const sections = [
  {
    icon: GitBranch,
    title: "Social graphs and influence",
    content: "Recommendations are shaped by who you follow and who endorses what. We model influence and connections so discovery reflects your network and trusted peers—not raw engagement metrics.",
  },
  {
    icon: Shield,
    title: "Peer-driven trust",
    content: "We prioritise social validation and community-driven trust. Recommendations and visibility are shaped by your network, peer endorsements, and transparent reputation—not opaque engagement metrics.",
  },
  {
    icon: Award,
    title: "Reputation systems",
    content: "Artists and artworks carry trust signals: peer validation, endorsements from verified artists, and reputation (established, rising, newcomer). We show why something is suggested so you can decide what to explore.",
  },
  {
    icon: Users,
    title: "Expert and peer endorsement",
    content: "Artists endorse each other; curators create collections. Endorsement signals help you discover work through people you follow and trust. We encourage participation without reducing art to a purely speculative asset.",
  },
  {
    icon: Eye,
    title: "Transparency",
    content: "We explain why an artist or artwork appears in Discover or Trending—linked to peers who liked it, curators who featured it, or trust scores. You see the reasoning behind recommendations.",
  },
  {
    icon: Lock,
    title: "Safety and respect",
    content: "We keep Atelier safe and respectful for artists and collectors. Content and behaviour are moderated in line with our Community Guidelines. Reports are reviewed and action is taken to protect the community.",
  },
  {
    icon: FileCheck,
    title: "Ethical moderation",
    content: "Moderation is consistent, transparent, and aligned with our values. We balance free expression with safety and respect. See our Moderation page for how we review content and handle reports.",
  },
];

const Trust = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content" className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
              Trust & Safety
            </h1>
            <p className="text-muted-foreground mb-10">
              How we keep Atelier safe, transparent, and respectful for artists and collectors. Social trust and community-driven validation are at the core of what we do.
            </p>

            <div className="space-y-8">
              {sections.map((section, i) => {
                const Icon = section.icon;
                return (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex gap-4"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="font-serif text-xl font-semibold mb-2">{section.title}</h2>
                      <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-12 p-6 rounded-2xl bg-card border border-border">
              <p className="text-sm text-muted-foreground mb-4">
                To participate in the community and understand how we moderate content:
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/community">
                  <span className="text-primary font-medium hover:underline">Community</span>
                </Link>
                <span className="text-muted-foreground">·</span>
                <Link to="/guidelines">
                  <span className="text-primary font-medium hover:underline">Guidelines</span>
                </Link>
                <span className="text-muted-foreground">·</span>
                <Link to="/moderation">
                  <span className="text-primary font-medium hover:underline">Moderation</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Trust;
