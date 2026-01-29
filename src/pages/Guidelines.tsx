import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Shield, AlertCircle, FileText } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const sections = [
  {
    icon: Heart,
    title: "Respectful interaction",
    content: "Treat artists, collectors, and curators with respect. Constructive feedback and genuine appreciation build the community. Harassment, hate speech, or personal attacks are not tolerated.",
  },
  {
    icon: MessageCircle,
    title: "Constructive engagement",
    content: "Comments and endorsements should be thoughtful and relevant. Share what you appreciate about the work or how it resonates with you. Peer learning thrives when conversations are substantive.",
  },
  {
    icon: Shield,
    title: "Trust and transparency",
    content: "We surface peer endorsements, reputation, and trust signals so you can make informed choices. Do not manipulate engagement, fake endorsements, or misrepresent your identity or work.",
  },
  {
    icon: AlertCircle,
    title: "Reporting and moderation",
    content: "If you see content or behaviour that violates these guidelines, report it. We review reports and take action to keep the community safe. See our Moderation and Trust & Safety pages for how we handle reports.",
  },
  {
    icon: FileText,
    title: "Art and authenticity",
    content: "We encourage participation without turning art into a purely speculative asset. Share and discover work you value. Community-driven trust and social validation matter more than raw popularity.",
  },
];

const Guidelines = () => {
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
              Community Guidelines
            </h1>
            <p className="text-muted-foreground mb-10">
              Learn how to participate respectfully and constructively in the Atelier community. These guidelines support social validation, peer learning, and community-driven trust.
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
                For how we enforce these guidelines and keep the platform safe, see:
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/trust">
                  <span className="text-primary font-medium hover:underline">Trust & Safety</span>
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

export default Guidelines;
