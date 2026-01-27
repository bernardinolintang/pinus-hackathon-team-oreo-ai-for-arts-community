import { motion } from "framer-motion";
import RecommendationCard from "./RecommendationCard";

const recommendations = [
  {
    title: "Based on Your Network",
    explanation: "Several artists you follow have engaged with similar abstract expressionist styles. These pieces share emotional qualities with works you've appreciated before.",
    artworks: [
      { image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400", title: "Urban Dreams" },
      { image: "https://images.unsplash.com/photo-1549887534-1541e9326642?w=400", title: "Light Study" },
      { image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=400", title: "Memory Lane" },
    ],
  },
  {
    title: "Peer Validated Discoveries",
    explanation: "Long-term community members with similar tastes have recently discovered these emerging artists. Their engagement suggests authentic appreciation.",
    artworks: [
      { image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=400", title: "Botanica" },
      { image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400", title: "Color Study" },
      { image: "https://images.unsplash.com/photo-1569172122301-bc5008bc09c5?w=400", title: "Stillness" },
    ],
  },
  {
    title: "Shared Themes: Minimalism",
    explanation: "Based on the 'minimalism' keyword in artworks you've liked, here are pieces that explore similar aesthetic principles from diverse perspectives.",
    artworks: [
      { image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400", title: "Void" },
      { image: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=400", title: "Essence" },
      { image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400", title: "Form" },
    ],
  },
];

const RecommendationSection = () => {
  return (
    <section className="py-24 gradient-warm">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-12"
        >
          <span className="trust-badge mb-4 inline-flex">
            Explainable Insights
          </span>
          <h2 className="font-serif text-4xl font-semibold mb-4">
            Why We Think You'll Appreciate These
          </h2>
          <p className="text-lg text-muted-foreground">
            Every recommendation comes with context. We believe you deserve to know 
            why something is suggested, not just what.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {recommendations.map((rec, index) => (
            <RecommendationCard key={index} {...rec} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendationSection;
