import { motion } from "framer-motion";
import { Sparkles, Users, Shield, ChevronDown } from "lucide-react";

const Hero = () => {
  return (
    <section id="main-content" className="relative min-h-screen gradient-hero flex items-center justify-center overflow-hidden pt-28">
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
            not algorithms. Explore artworks in depth and see how peers interact with them.
          </motion.p>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
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

      {/* Scroll indicator to show there is more content below */}
      <button
        type="button"
        onClick={() => {
          const el = document.getElementById("home-discover-section");
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 inline-flex flex-col items-center text-xs text-muted-foreground hover:text-foreground focus:outline-none"
      >
        <span className="mb-1 tracking-wide uppercase">Scroll to explore</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </button>
    </section>
  );
};

export default Hero;
