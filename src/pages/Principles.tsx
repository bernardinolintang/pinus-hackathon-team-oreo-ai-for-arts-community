import { motion } from "framer-motion";
import { Scale, Eye, Heart, Shield, Users, Sparkles, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Principles = () => {
  const principles = [
    {
      icon: Eye,
      title: "Transparency in Everything",
      description: "We believe trust is built through openness, not secrecy. Every recommendation, moderation decision, and platform feature is designed to be explainable and understandable.",
      details: [
        "Recommendations show why they were made (peer connections, trust scores, relationship context)",
        "Moderation decisions are explained with clear reasoning",
        "Platform algorithms are documented and their purposes are transparent",
        "Users can see how their data is used and have control over it"
      ]
    },
    {
      icon: Users,
      title: "Community Autonomy",
      description: "The community shapes the platform, not the other way around. We provide tools and frameworks, but the community decides what art matters.",
      details: [
        "Peer validation drives discovery, not centralized curation",
        "Community guidelines are co-created with user input",
        "Moderation appeals process gives community members a voice",
        "Feature development prioritizes community needs over growth metrics"
      ]
    },
    {
      icon: Shield,
      title: "Artist Rights & Fairness",
      description: "Artists deserve fair treatment, proper attribution, and sustainable opportunities. We protect their work and ensure they're compensated fairly.",
      details: [
        "All artists are verified by human moderators before publishing",
        "Intellectual property is protected and respected",
        "Fair revenue sharing models (when applicable)",
        "No hidden fees or exploitative practices",
        "Artists maintain full control over their work and pricing"
      ]
    },
    {
      icon: Eye,
      title: "Human-Centered Moderation",
      description: "Content moderation is done by real people who understand context, culture, and artistic expression. No automated censorship or opaque systems.",
      details: [
        "Human moderators review all artist applications",
        "Moderation decisions consider artistic context and intent",
        "Appeal processes allow for case-by-case review",
        "Community reporting helps identify issues, but humans make final decisions",
        "Moderation principles are public and consistently applied"
      ]
    },
    {
      icon: Heart,
      title: "Genuine Engagement Over Metrics",
      description: "We value meaningful connections and authentic appreciation over vanity metrics. Quality engagement matters more than quantity.",
      details: [
        "Peer validation shows real relationships, not just numbers",
        "Trust scores reflect community standing, not follower counts",
        "Recommendations prioritize quality connections over viral content",
        "We don't gamify engagement or create addictive patterns"
      ]
    },
    {
      icon: Sparkles,
      title: "Ethical Technology Use",
      description: "Technology should enhance human connections, not replace them. We use AI and algorithms to support, not supplant, human judgment.",
      details: [
        "Algorithms are tools, not decision-makers",
        "AI assists moderation but doesn't replace human judgment",
        "Recommendation systems are explainable and user-controlled",
        "We don't use manipulative design patterns or dark patterns",
        "User privacy and data protection are fundamental, not optional"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content" className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-6">
              Ethical Principles
            </h1>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              The values that guide how Atelier is built and how our community operates. 
              These principles aren't just words—they're the foundation of every decision we make.
            </p>

            {/* Introduction */}
            <section className="mb-16">
              <div className="bg-card rounded-2xl p-8 border border-border shadow-card">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Scale className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl font-semibold mb-3">Our Commitment</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Atelier was built on the belief that art platforms should serve artists and art lovers, 
                      not extract value from them. Our ethical principles guide every feature, every policy, 
                      and every interaction on the platform. We're committed to transparency, fairness, and 
                      putting the community first—always.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Principles List */}
            <section className="space-y-8 mb-16">
              {principles.map((principle, index) => {
                const Icon = principle.icon;
                return (
                  <motion.div
                    key={principle.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-card rounded-xl p-6 border border-border"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-serif text-xl font-semibold mb-2">{principle.title}</h3>
                        <p className="text-muted-foreground leading-relaxed mb-4">{principle.description}</p>
                        <ul className="space-y-2">
                          {principle.details.map((detail, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </section>

            {/* Implementation */}
            <section className="mb-16">
              <h2 className="font-serif text-3xl font-semibold mb-6">How We Implement These Principles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="font-serif text-lg font-semibold mb-3">In Our Technology</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>Explainable recommendation algorithms</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>Human-in-the-loop moderation systems</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>Transparent data usage and privacy controls</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>No dark patterns or manipulative design</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="font-serif text-lg font-semibold mb-3">In Our Policies</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>Public moderation guidelines</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>Fair artist verification process</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>Transparent appeal mechanisms</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>Community input in decision-making</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Accountability */}
            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="font-serif text-2xl font-semibold mb-4">Holding Ourselves Accountable</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                These principles aren't just aspirational—they're our commitment to you. We regularly review 
                our practices, seek community feedback, and adjust our approach when we fall short. If you 
                believe we're not living up to these principles, we want to hear from you.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our moderation team, product decisions, and community policies are all guided by these principles. 
                When in doubt, we choose transparency over convenience, community benefit over growth, and human 
                judgment over automated systems.
              </p>
            </section>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Principles;


