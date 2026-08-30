"use client";

import React, { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { deleteStorefrontAction } from "@/app/actions/seller";

interface DeleteStorefrontDialogProps {
  storeName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/** Everything the seller loses, stated plainly rather than tucked behind a warning box. */
const CONSEQUENCES = [
  "Your store profile and its campus listing address.",
  "Every product you have listed, live or draft, and their photos.",
  "Your seller role — the account goes back to browsing and buying only.",
];

export function DeleteStorefrontDialog({
  storeName,
  open,
  onOpenChange,
}: DeleteStorefrontDialogProps) {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function handleDelete() {
    setErrorMessage(null);
    startTransition(async () => {
      try {
        const res = await deleteStorefrontAction();
        if (res?.message) {
          setErrorMessage(res.message);
        }
      } catch (error) {
        // A successful delete redirects, and Next.js signals that by throwing a
        // control-flow error that must reach the framework. Anything else is a
        // real failure the seller needs to see.
        const digest = (error as { digest?: string })?.digest;
        if (typeof digest === "string" && digest.startsWith("NEXT_")) {
          throw error;
        }
        setErrorMessage("We couldn't delete the storefront. Please try again.");
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-lg p-5">
        <DialogHeader className="flex flex-col gap-1.5 text-left">
          <DialogTitle className="text-base font-semibold text-ink">
            Delete {storeName}?
          </DialogTitle>
          <DialogDescription className="text-sm leading-relaxed text-muted">
            This cannot be undone. To stop taking orders without losing anything, pause the
            storefront instead.
          </DialogDescription>
        </DialogHeader>

        <ul className="flex flex-col divide-y divide-line border-y border-line text-sm text-muted">
          {CONSEQUENCES.map((line) => (
            <li key={line} className="py-2 leading-relaxed">
              {line}
            </li>
          ))}
        </ul>

        {errorMessage && (
          <p
            role="alert"
            className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
          >
            {errorMessage}
          </p>
        )}

        <DialogFooter className="flex items-center justify-end gap-2">
          <button
            type="button"
            disabled={isPending}
            onClick={() => onOpenChange(false)}
            className="h-9 rounded-md border border-line bg-surface px-3.5 text-sm font-semibold text-ink transition-colors hover:bg-paper-deep disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={isPending}
            onClick={handleDelete}
            className="h-9 rounded-md bg-destructive px-3.5 text-sm font-semibold text-white transition-colors hover:bg-destructive/90 disabled:opacity-50"
          >
            {isPending ? "Deleting…" : "Delete storefront"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
