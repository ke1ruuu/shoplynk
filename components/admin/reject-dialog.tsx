"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AlertTriangle, Loader2 } from "lucide-react";
import { rejectVerificationAction } from "@/app/actions/verification";

interface RejectDialogProps {
  application: {
    id: string;
    applicantName: string;
    studentId: string;
  } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRejected?: () => void;
}

const REJECTION_PRESETS = [
  "Photo of school ID is blurry or unreadable. Please upload a clear photo.",
  "Student ID / LRN number does not match current enrollment records.",
  "Attached photo is not a valid LYFJSHS school ID.",
  "Year level / strand information requires correction.",
];

export function RejectDialog({
  application,
  open,
  onOpenChange,
  onRejected,
}: RejectDialogProps) {
  const [reason, setReason] = useState(REJECTION_PRESETS[0]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!application) return null;

  async function handleReject(e: React.FormEvent) {
    e.preventDefault();
    if (!application) return;

    setIsPending(true);
    setError(null);

    const res = await rejectVerificationAction(application.id, reason);
    setIsPending(false);

    if (!res.success) {
      setError(res.message);
    } else {
      onOpenChange(false);
      onRejected?.();
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-3xl p-6 sm:p-8">
        <DialogHeader className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            <span className="eyebrow">Verification Rejection</span>
          </div>
          <DialogTitle className="font-display text-xl font-extrabold text-ink">
            Reject Application
          </DialogTitle>
          <DialogDescription className="text-sm text-muted">
            Provide actionable feedback for{" "}
            <span className="font-semibold text-ink">
              {application.applicantName} ({application.studentId})
            </span>
            .
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive">
            {error}
          </div>
        )}

        <form onSubmit={handleReject} className="flex flex-col gap-4 mt-2">
          {/* Quick preset suggestions */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted">Quick feedback templates:</Label>
            <div className="flex flex-col gap-1.5">
              {REJECTION_PRESETS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setReason(preset)}
                  className={`rounded-xl border p-2 text-left text-xs transition-colors ${
                    reason === preset
                      ? "border-destructive bg-destructive/10 text-destructive font-semibold"
                      : "border-line bg-paper text-muted hover:text-ink"
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="custom-reason">Custom Feedback Message</Label>
            <Textarea
              id="custom-reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              required
              className="rounded-xl resize-none text-xs"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-line mt-2">
            <button
              type="button"
              disabled={isPending}
              onClick={() => onOpenChange(false)}
              className="rounded-xl border border-line px-4 py-2 text-xs font-semibold text-muted hover:text-ink"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-2 rounded-xl bg-destructive px-5 py-2 text-xs font-bold text-white shadow-flyer hover:bg-destructive/90 transition-colors disabled:opacity-50"
            >
              {isPending ? (
                <span className="flex items-center gap-1.5">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Saving…
                </span>
              ) : (
                "Confirm Rejection"
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
