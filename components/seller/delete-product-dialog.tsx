"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { AlertTriangle, Loader2 } from "lucide-react";
import { deleteProductAction } from "@/app/actions/seller";

interface DeleteProductDialogProps {
  product: { id: string; title: string } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleted?: () => void;
}

export function DeleteProductDialog({
  product,
  open,
  onOpenChange,
  onDeleted,
}: DeleteProductDialogProps) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!product) return null;

  async function handleDelete() {
    if (!product) return;
    setIsPending(true);
    setError(null);

    const res = await deleteProductAction(product.id);
    setIsPending(false);

    if (res.message && !res.success) {
      setError(res.message);
    } else {
      onOpenChange(false);
      onDeleted?.();
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="rounded-3xl p-6 sm:p-8 max-w-md">
        <AlertDialogHeader className="flex flex-col items-center text-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
            <AlertTriangle className="h-6 w-6" />
          </span>
          <AlertDialogTitle className="font-display text-2xl font-extrabold text-ink">
            Delete Product?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-muted">
            Are you sure you want to remove{" "}
            <span className="font-bold text-ink">&ldquo;{product.title}&rdquo;</span>? This will
            permanently remove the listing from the campus marketplace.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {error && (
          <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive text-center">
            {error}
          </div>
        )}

        <AlertDialogFooter className="mt-4 flex gap-2 sm:justify-center">
          <AlertDialogCancel
            disabled={isPending}
            className="rounded-xl border-line px-5 py-2.5 text-sm font-semibold"
          >
            Keep Listing
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            disabled={isPending}
            className="rounded-xl bg-destructive text-white hover:bg-destructive/90 px-5 py-2.5 text-sm font-semibold shadow-flyer"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Deleting…
              </span>
            ) : (
              "Yes, Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
