import { useState } from "react";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CONTACT_SUBJECTS = [
  { value: "general", label: "General inquiry" },
  { value: "safety_moderation", label: "Safety / Moderation" },
  { value: "appeal", label: "Appeal" },
  { value: "support", label: "Support" },
  { value: "other", label: "Other" },
] as const;

const CONTACT_STORAGE_KEY = "atelier_contact";

function saveContact(payload: { subject: string; email: string; message: string }) {
  try {
    const existing = JSON.parse(localStorage.getItem(CONTACT_STORAGE_KEY) ?? "[]");
    existing.push({ ...payload, at: new Date().toISOString() });
    localStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify(existing));
  } catch {
    // ignore
  }
}

const Contact = () => {
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error("Please enter your message.");
      return;
    }
    setSubmitting(true);
    try {
      saveContact({
        subject: subject ? (CONTACT_SUBJECTS.find((s) => s.value === subject)?.label ?? subject) : "General inquiry",
        email: email.trim(),
        message: message.trim(),
      });
      toast.success("Message sent. We aim to respond in a timely manner, especially for safety and moderation concerns.");
      setSubject("");
      setEmail("");
      setMessage("");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
            Contact
          </h1>
          <p className="text-muted-foreground mb-8">
            Get in touch with the Atelier team for questions, feedback, or support. For urgent safety concerns or questions about moderation, choose <strong>Safety / Moderation</strong>—we take safety seriously and aim to respond to reports in a timely manner.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="contact-subject">Subject</Label>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger id="contact-subject">
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  {CONTACT_SUBJECTS.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">Email</Label>
              <Input
                id="contact-email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-message">Message</Label>
              <Textarea
                id="contact-message"
                placeholder="Your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                required
                className="resize-none"
              />
            </div>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Sending…" : "Send message"}
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;


