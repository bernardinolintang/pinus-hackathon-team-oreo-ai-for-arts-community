import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Scale, Flag, Eye, RefreshCw, Mail, FileText, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const sections = [
  {
    icon: Scale,
    title: "Ethical moderation",
    content: "We moderate content to keep the community safe and respectful while preserving free expression. Our approach is consistent, transparent, and aligned with our Community Guidelines. We do not favour engagement over safety.",
  },
  {
    icon: Eye,
    title: "How content is reviewed",
    content: "Reports from the community are reviewed by our team. We consider context, intent, and impact. Action may include a warning, content removal, or account restrictions. We aim to be fair and proportionate.",
  },
  {
    icon: Flag,
    title: "How to report",
    content: "Use the Report button on artwork and artist profile pages. Choose a reason (harassment, hate speech, misrepresentation, manipulation, or other) and add a brief description so we can act appropriately. Reports are reviewed by our team.",
  },
  {
    icon: RefreshCw,
    title: "Appeals",
    content: "If you believe a decision was made in error, you can appeal. We will re-review the case and respond. Our goal is a community where artists and collectors can participate without abuse or manipulation.",
  },
  {
    icon: Mail,
    title: "Contact",
    content: "For urgent safety concerns or questions about moderation, contact us through the Contact page. We take safety seriously and aim to respond to reports in a timely manner.",
  },
  {
    icon: FileText,
    title: "Alignment with community trust",
    content: "Moderation supports social validation and community-driven trust. By addressing harmful behaviour, we protect the space for peer learning, endorsements, and genuine engagement. Art stays about appreciation, not speculation or abuse.",
  },
];

const PRINCIPLES = [
  "Consistent: same standards applied to everyone",
  "Transparent: we explain how we review and act",
  "Safety over engagement: we never favour engagement over safety",
];

const APPEALS_STORAGE_KEY = "atelier_appeals";

function saveAppeal(payload: { caseReference?: string; description: string }) {
  try {
    const existing = JSON.parse(localStorage.getItem(APPEALS_STORAGE_KEY) ?? "[]");
    existing.push({ ...payload, at: new Date().toISOString() });
    localStorage.setItem(APPEALS_STORAGE_KEY, JSON.stringify(existing));
  } catch {
    // ignore
  }
}

const Moderation = () => {
  const [caseReference, setCaseReference] = useState("");
  const [appealDescription, setAppealDescription] = useState("");
  const [appealSubmitting, setAppealSubmitting] = useState(false);

  const handleAppealSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!appealDescription.trim()) {
      toast.error("Please describe why you believe the decision was wrong.");
      return;
    }
    setAppealSubmitting(true);
    try {
      saveAppeal({ caseReference: caseReference.trim() || undefined, description: appealDescription.trim() });
      toast.success("Appeal submitted. We will re-review the case and respond.");
      setCaseReference("");
      setAppealDescription("");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setAppealSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
              Moderation
            </h1>
            <p className="text-muted-foreground mb-6">
              Learn how content is reviewed and how we handle reports from the community. Ethical moderation helps keep Atelier a place for meaningful interaction and trust.
            </p>

            {/* Our principles */}
            <div className="mb-10 p-6 rounded-2xl bg-card border border-border">
              <h2 className="font-serif text-lg font-semibold mb-4 flex items-center gap-2">
                <Scale className="w-5 h-5 text-primary" />
                Our principles
              </h2>
              <ul className="space-y-2">
                {PRINCIPLES.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

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

            {/* Submit an appeal */}
            <div className="mt-12 p-6 rounded-2xl bg-card border border-border">
              <h2 className="font-serif text-xl font-semibold mb-2 flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-primary" />
                Submit an appeal
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                If you believe a moderation decision was made in error, you can appeal. We will re-review the case and respond.
              </p>
              <form onSubmit={handleAppealSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="appeal-case">Case reference (optional)</Label>
                  <Input
                    id="appeal-case"
                    placeholder="e.g. ticket or email reference"
                    value={caseReference}
                    onChange={(e) => setCaseReference(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="appeal-desc">Why do you believe the decision was wrong? (required)</Label>
                  <Textarea
                    id="appeal-desc"
                    placeholder="Provide details so we can re-review fairly."
                    value={appealDescription}
                    onChange={(e) => setAppealDescription(e.target.value)}
                    rows={4}
                    required
                    className="resize-none"
                  />
                </div>
                <Button type="submit" disabled={appealSubmitting}>
                  {appealSubmitting ? "Submitting…" : "Submit appeal"}
                </Button>
              </form>
            </div>

            <div className="mt-12 p-6 rounded-2xl bg-card border border-border">
              <p className="text-sm text-muted-foreground mb-4">
                For community norms and how we build trust:
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/guidelines">
                  <span className="text-primary font-medium hover:underline">Community Guidelines</span>
                </Link>
                <span className="text-muted-foreground">·</span>
                <Link to="/trust">
                  <span className="text-primary font-medium hover:underline">Trust & Safety</span>
                </Link>
                <span className="text-muted-foreground">·</span>
                <Link to="/contact">
                  <span className="text-primary font-medium hover:underline">Contact</span>
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

export default Moderation;
