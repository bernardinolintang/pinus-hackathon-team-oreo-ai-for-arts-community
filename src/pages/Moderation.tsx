import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Scale, Flag, Eye, RefreshCw, Mail, FileText, CheckCircle2, Palette, Check, X } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";
import { moderationApi, MODERATOR_EMAIL, type ArtistApplication } from "@/lib/api";
import { getUserMessage } from "@/lib/errors";

const sectionKeys = [
  { icon: Scale, titleKey: "moderationPage.ethicalModeration", contentKey: "moderationPage.ethicalModerationContent" },
  { icon: Eye, titleKey: "moderationPage.howReviewed", contentKey: "moderationPage.howReviewedContent" },
  { icon: Flag, titleKey: "moderationPage.howToReport", contentKey: "moderationPage.howToReportContent" },
  { icon: RefreshCw, titleKey: "moderationPage.appeals", contentKey: "moderationPage.appealsContent" },
  { icon: Mail, titleKey: "moderationPage.contact", contentKey: "moderationPage.contactContent" },
  { icon: FileText, titleKey: "moderationPage.alignmentTrust", contentKey: "moderationPage.alignmentTrustContent" },
];

const PRINCIPLE_KEYS = ["moderationPage.principle1", "moderationPage.principle2", "moderationPage.principle3"];

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
  const { t } = useTranslation();
  const { user } = useAuth();
  const [caseReference, setCaseReference] = useState("");
  const [appealDescription, setAppealDescription] = useState("");
  const [appealSubmitting, setAppealSubmitting] = useState(false);
  const [artistApplications, setArtistApplications] = useState<ArtistApplication[]>([]);
  const [applicationsLoading, setApplicationsLoading] = useState(false);
  const [applicationsError, setApplicationsError] = useState<string | null>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const isModerator = user?.email === MODERATOR_EMAIL;

  const fetchApplications = useCallback(() => {
    if (!isModerator) return;
    setApplicationsError(null);
    setApplicationsLoading(true);
    moderationApi
      .getArtistApplications()
      .then(setArtistApplications)
      .catch((e) => {
        const msg = getUserMessage(e, "moderation");
        setApplicationsError(msg);
        toast.error(msg);
      })
      .finally(() => setApplicationsLoading(false));
  }, [isModerator]);

  useEffect(() => {
    if (isModerator) fetchApplications();
  }, [isModerator, user?.id, fetchApplications]);

  const handleApprove = async (userId: string) => {
    setProcessingId(userId);
    try {
      await moderationApi.approveArtistApplication(userId);
      setArtistApplications((prev) => prev.filter((a) => a.userId !== userId));
      toast.success("Artist application approved.");
    } catch (e) {
      toast.error(getUserMessage(e, "approve"));
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (userId: string) => {
    setProcessingId(userId);
    try {
      await moderationApi.rejectArtistApplication(userId);
      setArtistApplications((prev) => prev.filter((a) => a.userId !== userId));
      toast.success("Artist application rejected.");
    } catch (e) {
      toast.error(getUserMessage(e, "reject"));
    } finally {
      setProcessingId(null);
    }
  };

  const handleAppealSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!appealDescription.trim()) {
      toast.error(t("moderationPage.toastAppealDesc"));
      return;
    }
    setAppealSubmitting(true);
    try {
      saveAppeal({ caseReference: caseReference.trim() || undefined, description: appealDescription.trim() });
      toast.success(t("moderationPage.toastAppealSuccess"));
      setCaseReference("");
      setAppealDescription("");
    } catch {
      toast.error(t("moderationPage.toastAppealFailed"));
    } finally {
      setAppealSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content" className="pt-20 sm:pt-24 pb-12 md:pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 sm:mb-4">
              {t("moderation.title")}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
              {t("moderation.description")}
            </p>

            {!isModerator && (
              <div className="mb-6 sm:mb-8 rounded-xl border border-primary/20 bg-primary/5 p-3 sm:p-4 text-sm">
                <p className="text-muted-foreground">
                  {t("moderation.demoBlock")} <Link to="/login" className="text-primary hover:underline font-medium">{t("moderation.signInModerator")}</Link>
                </p>
              </div>
            )}

            {/* Artist applications (moderator only) */}
            {isModerator && (
              <div className="mb-8 sm:mb-10 p-4 sm:p-6 rounded-2xl bg-card border border-border">
                <h2 className="font-serif text-lg sm:text-xl font-semibold mb-2 flex items-center gap-2">
                  <Palette className="w-5 h-5 text-primary shrink-0" />
                  {t("moderation.artistApplications")}
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  {t("moderation.artistApplicationsDesc")}
                </p>
                {applicationsLoading ? (
                  <ul className="space-y-3" role="status" aria-live="polite" aria-busy="true">
                    {[1, 2, 3].map((i) => (
                      <li key={i} className="flex items-center justify-between gap-4 p-3 rounded-lg border border-border bg-muted/30">
                        <div className="flex-1 min-w-0 space-y-2">
                          <Skeleton className="h-5 w-32" />
                          <Skeleton className="h-4 w-48" />
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <Skeleton className="h-9 w-20" />
                          <Skeleton className="h-9 w-16" />
                        </div>
                      </li>
                    ))}
                    <span className="sr-only">Loading artist applications</span>
                  </ul>
                ) : applicationsError ? (
                  <div className="text-center py-6">
                    <p className="text-sm text-muted-foreground mb-3">{applicationsError}</p>
                    <Button variant="outline" size="sm" onClick={fetchApplications}>
                      Try again
                    </Button>
                  </div>
                ) : artistApplications.length === 0 ? (
                  <p className="text-sm text-muted-foreground">{t("moderation.noPending")}</p>
                ) : (
                  <ul className="space-y-3">
                    {artistApplications.map((app) => (
                      <li key={app.userId} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 p-3 rounded-lg border border-border bg-muted/30">
                        <div className="min-w-0">
                          <p className="font-medium truncate">{app.name}</p>
                          <p className="text-sm text-muted-foreground truncate">{app.email}</p>
                        </div>
                        <div className="flex flex-wrap gap-2 shrink-0">
                          <Button
                            size="sm"
                            onClick={() => handleApprove(app.userId)}
                            disabled={processingId !== null}
                          >
                            <Check className="w-4 h-4 mr-1 shrink-0" />
                            {t("moderation.approve")}
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleReject(app.userId)}
                            disabled={processingId !== null}
                          >
                            <X className="w-4 h-4 mr-1 shrink-0" />
                            {t("moderation.reject")}
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

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
