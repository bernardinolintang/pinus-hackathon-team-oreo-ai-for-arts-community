import { motion } from "framer-motion";
import { Heart, Users, Shield, Sparkles, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const About = () => {
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
              Our Mission
            </h1>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              Atelier is a community-driven art platform built on trust, transparency, and genuine appreciation. 
              We believe art discovery should be guided by human connections, not opaque algorithms.
            </p>

            {/* Mission Statement */}
            <section className="mb-16">
              <div className="bg-card rounded-2xl p-8 border border-border shadow-card">
                <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-6">What We Stand For</h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Atelier was born from a simple observation: the art world has become increasingly disconnected, 
                    with algorithms and popularity metrics replacing genuine human appreciation and peer validation. 
                    We set out to create a platform where art discovery happens through meaningful relationships 
                    and trusted connections.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Our mission is to empower artists and art lovers by creating a transparent, ethical, and 
                    community-first ecosystem. We believe that when you can see how your peers—people you trust 
                    and respect—interact with art, you make better discoveries. When artists are verified by 
                    human moderators rather than automated systems, authenticity thrives.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Every feature we build, every decision we make, is guided by one principle: 
                    <strong className="text-foreground"> trust through transparency, not through opacity.</strong>
                  </p>
                </div>
              </div>
            </section>

            {/* Core Values */}
            <section className="mb-16">
              <h2 className="font-serif text-3xl font-semibold mb-8">Our Core Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-card rounded-xl p-6 border border-border"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-3">Community First</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We prioritize the needs and voices of our community over growth metrics. Every feature is 
                    designed to strengthen connections between artists and art lovers, fostering genuine appreciation 
                    and meaningful relationships.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-card rounded-xl p-6 border border-border"
                >
                  <div className="w-12 h-12 rounded-full bg-trust/10 flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-trust" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-3">Transparency & Trust</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We believe trust is built through transparency, not hidden algorithms. You can see why artworks 
                    are recommended, how peer validation works, and how moderation decisions are made. Nothing is 
                    hidden behind black-box systems.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-card rounded-xl p-6 border border-border"
                >
                  <div className="w-12 h-12 rounded-full bg-peer/10 flex items-center justify-center mb-4">
                    <Heart className="w-6 h-6 text-peer" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-3">Genuine Appreciation</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We celebrate authentic artistic expression and meaningful engagement. Our platform rewards 
                    genuine appreciation over viral content, helping artists build sustainable careers based on 
                    real connections with their audience.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-card rounded-xl p-6 border border-border"
                >
                  <div className="w-12 h-12 rounded-full bg-organic/10 flex items-center justify-center mb-4">
                    <Sparkles className="w-6 h-6 text-organic" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-3">Ethical Technology</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We use technology to enhance human connections, not replace them. Our moderation is human-led, 
                    our recommendations are explainable, and our algorithms serve the community, not the other way around.
                  </p>
                </motion.div>
              </div>
            </section>

            {/* How We're Different */}
            <section className="mb-16">
              <h2 className="font-serif text-3xl font-semibold mb-8">How We're Different</h2>
              <div className="space-y-6">
                <div className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="font-serif text-xl font-semibold mb-3">Peer Validation, Not Popularity Contests</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Instead of showing you what's trending globally, we show you what people in your network 
                    appreciate. When you see "67% of your peers liked this," you know it's based on real relationships 
                    and shared values, not just raw numbers.
                  </p>
                </div>

                <div className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="font-serif text-xl font-semibold mb-3">Human Verification, Not Automated Systems</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Every artist on Atelier is verified by our human moderation team. We review portfolios, check 
                    authenticity, and ensure quality before artists can publish. This means you're discovering 
                    real art from real artists, not AI-generated content or stolen work.
                  </p>
                </div>

                <div className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="font-serif text-xl font-semibold mb-3">Explainable Recommendations</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    When we recommend an artwork, we tell you why. You'll see peer notes, trust scores, and 
                    relationship-based context. No mysterious algorithms deciding what you should see—just 
                    transparent, understandable recommendations.
                  </p>
                </div>

                <div className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="font-serif text-xl font-semibold mb-3">Community-Driven Moderation</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Our moderation process is transparent and community-focused. Decisions are made by real people 
                    who understand context, culture, and artistic expression. We publish our principles, explain 
                    our decisions, and provide appeal processes.
                  </p>
                </div>
              </div>
            </section>

            {/* Call to Action */}
            <section className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-border text-center">
              <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-4">
                Join Our Community
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Whether you're an artist looking to share your work or an art lover seeking authentic discoveries, 
                Atelier is built for you. Experience art discovery the way it should be—through trust, transparency, 
                and genuine connections.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="gradient-trust text-primary-foreground">
                  <Link to="/signup">Get Started</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/principles">Learn More</Link>
                </Button>
              </div>
            </section>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;


