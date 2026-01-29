import { useState } from "react";
import { Flag } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const REPORT_REASONS = [
  { value: "harassment", label: "Harassment" },
  { value: "hate_speech", label: "Hate speech" },
  { value: "misrepresentation", label: "Misrepresentation" },
  { value: "manipulation", label: "Manipulation" },
  { value: "other", label: "Other" },
] as const;

const STORAGE_KEY = "atelier_reports";

function saveReport(payload: { context: string; targetId: string; targetLabel: string; reason: string; description: string }) {
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    existing.push({ ...payload, at: new Date().toISOString() });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch {
    // ignore
  }
}

export interface ReportDialogProps {
  context: "artwork" | "profile";
  targetId: string;
  targetLabel: string;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ReportDialog({
  context,
  targetId,
  targetLabel,
  trigger,
  open: controlledOpen,
  onOpenChange,
}: ReportDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [reason, setReason] = useState<string>("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? (onOpenChange ?? (() => {})) : setInternalOpen;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason) {
      toast.error("Please select a reason");
      return;
    }
    setSubmitting(true);
    try {
      saveReport({
        context,
        targetId,
        targetLabel,
        reason: REPORT_REASONS.find((r) => r.value === reason)?.label ?? reason,
        description: description.trim(),
      });
      toast.success("Report submitted. Our team will review it and take action as needed.");
      setReason("");
      setDescription("");
      setOpen(false);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const contextLabel = context === "artwork" ? "this artwork" : "this profile";

  const content = (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Flag className="w-5 h-5" />
          Report {contextLabel}
        </DialogTitle>
        <DialogDescription>
          Reports are reviewed by our team. We consider context, intent, and impact. Your report helps keep the community safe.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="report-reason">Reason (required)</Label>
          <Select value={reason} onValueChange={setReason} required>
            <SelectTrigger id="report-reason">
              <SelectValue placeholder="Select a reason" />
            </SelectTrigger>
            <SelectContent>
              {REPORT_REASONS.map((r) => (
                <SelectItem key={r.value} value={r.value}>
                  {r.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="report-description">Additional details (optional)</Label>
          <Textarea
            id="report-description"
            placeholder="Provide a brief description so we can act appropriately."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="resize-none"
          />
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={submitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={submitting}>
            {submitting ? "Submitting…" : "Submit report"}
          </Button>
        </DialogFooter>
      </form>
    </>
  );

  const dialogContent = <DialogContent className="sm:max-w-md">{content}</DialogContent>;

  if (isControlled) {
    return (
      <Dialog open={controlledOpen} onOpenChange={onOpenChange}>
        {dialogContent}
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button variant="outline" size="sm">
            <Flag className="w-4 h-4 mr-2" />
            Report
          </Button>
        )}
      </DialogTrigger>
      {dialogContent}
    </Dialog>
  );
}
