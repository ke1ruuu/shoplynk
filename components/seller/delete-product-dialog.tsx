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
      return;
    }

    onOpenChange(false);
    onDeleted?.();
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md rounded-lg p-5">
        <AlertDialogHeader className="flex flex-col gap-1.5 text-left">
          <AlertDialogTitle className="text-base font-semibold text-ink">
            Delete this product?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm leading-relaxed text-muted">
            <span className="font-semibold text-ink">{product.title}</span> and its photos come
            off your storefront for good. Buyers with it in a cart will no longer be able to
            order it. To take it down without losing it, set it to Draft instead.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {error && (
          <p
            role="alert"
            className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
          >
            {error}
          </p>
        )}

        <AlertDialogFooter className="mt-1 flex items-center justify-end gap-2">
          <AlertDialogCancel
            disabled={isPending}
            className="h-9 rounded-md border-line bg-surface px-3.5 text-sm font-semibold text-ink hover:bg-paper-deep"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            disabled={isPending}
            className="h-9 rounded-md bg-destructive px-3.5 text-sm font-semibold text-white hover:bg-destructive/90 disabled:opacity-50"
          >
            {isPending ? "Deleting…" : "Delete product"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
