import { motion } from "framer-motion";
import { Shield, Eye, Heart, Users } from "lucide-react";

const principles = [
  {
    icon: Shield,
    title: "AI Supports, Never Replaces",
    description: "Our AI helps surface patterns and connections, but human judgement remains central. Trust emerges from real relationships.",
  },
  {
    icon: Eye,
    title: "Transparent by Design",
    description: "Every recommendation and trust signal comes with an explanation. No opaque algorithms—you always know why.",
  },
  {
    icon: Heart,
    title: "Appreciation Over Speculation",
    description: "We encourage learning and dialogue about art, not financial speculation. Value comes from meaning, not markets.",
  },
  {
    icon: Users,
    title: "Diverse Voices Matter",
    description: "Our system actively preserves emerging and minority artistic voices, preventing any single group from dominating visibility.",
  },
];

const PrinciplesSection = () => {
  return (
    <section className="py-24 bg-primary/5">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="font-serif text-4xl font-semibold mb-4">
            Our Ethical Principles
          </h2>
          <p className="text-lg text-muted-foreground">
            We believe art communities deserve better than engagement-maximizing algorithms. 
            Here's what guides us.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {principles.map((principle, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex gap-5"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <principle.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold mb-2">{principle.title}</h3>
                <p className="text-muted-foreground">{principle.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrinciplesSection;
