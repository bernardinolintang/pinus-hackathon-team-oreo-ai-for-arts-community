import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Users, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen gradient-hero flex items-center justify-center overflow-hidden pt-16">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-trust/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="trust-badge">
              <Sparkles className="w-3.5 h-3.5" />
              Community-Driven Discovery
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-5xl md:text-7xl font-semibold leading-tight mb-6"
          >
            Discover Art Through
            <br />
            <span className="text-primary">Trusted Connections</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            A community where art appreciation emerges from genuine peer relationships, 
            not algorithms. Understand why artworks resonate with people like you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" className="gradient-trust text-primary-foreground px-8 shadow-card hover:shadow-hover transition-shadow">
              Start Exploring
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              Learn More
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-card shadow-soft">
              <div className="w-12 h-12 rounded-full bg-trust/10 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-trust" />
              </div>
              <h3 className="font-serif text-lg font-semibold mb-2">Verified Artists</h3>
              <p className="text-sm text-muted-foreground">Human moderators ensure authenticity before artists can publish</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-card shadow-soft">
              <div className="w-12 h-12 rounded-full bg-peer/10 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-peer" />
              </div>
              <h3 className="font-serif text-lg font-semibold mb-2">Peer Validation</h3>
              <p className="text-sm text-muted-foreground">See what trusted connections appreciate, not just popularity counts</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-card shadow-soft">
              <div className="w-12 h-12 rounded-full bg-organic/10 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-organic" />
              </div>
              <h3 className="font-serif text-lg font-semibold mb-2">Organic Discovery</h3>
              <p className="text-sm text-muted-foreground">Recommendations explained by relationships, not opaque scores</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
