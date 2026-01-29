import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How does discovery work on Atelier?",
    a: "Discovery is community-driven: we surface art based on your network, peer endorsements, and transparent reputation—not opaque engagement metrics. Artists are verified by human moderators before publishing. You see why something is recommended (e.g. who endorsed it, who liked it).",
  },
  {
    q: "What are keyboard shortcuts?",
    a: "Use Ctrl+K (or Cmd+K on Mac) to open search. Use Ctrl+Shift+H (or Cmd+Shift+H on Mac) to go to the home page.",
  },
  {
    q: "How do I report content or behaviour?",
    a: "Use the Report button on artwork and artist profile pages. Choose a reason (e.g. harassment, hate speech, misrepresentation) and add details. Reports are reviewed by our team. See the Moderation page for more.",
  },
  {
    q: "How do I appeal a moderation decision?",
    a: "Go to the Moderation page and use the “Submit an appeal” form. We will re-review the case and respond.",
  },
];

const FAQ = () => {
  useDocumentTitle("FAQ");
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content" className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground mb-8">
            Answers to common questions about using Atelier. We build trust through community-driven discovery and ethical moderation.
          </p>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;


