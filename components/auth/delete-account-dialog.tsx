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
import { AlertTriangle, Trash2, UserX } from "lucide-react";
import { deleteAccountAction } from "@/app/actions/auth";

interface DeleteAccountDialogProps {
  userEmail: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteAccountDialog({
  userEmail,
  open,
  onOpenChange,
}: DeleteAccountDialogProps) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      try {
        await deleteAccountAction();
      } catch (err) {
        // Next.js redirect exception is normal
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-3xl p-6 sm:p-7">
        <DialogHeader className="flex flex-col gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
            <UserX className="h-6 w-6" />
          </div>
          <DialogTitle className="font-display text-xl font-extrabold text-ink">
            Delete Project Kita Account
          </DialogTitle>
          <DialogDescription className="text-sm text-muted">
            Are you sure you want to permanently delete your account (
            <strong className="text-ink">{userEmail}</strong>)?
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 rounded-2xl border border-destructive/20 bg-destructive/5 p-4 text-xs text-destructive">
          <p className="font-semibold leading-relaxed">
            This action is irreversible. It will permanently:
          </p>
          <ul className="list-disc pl-4 space-y-1 text-[11px] leading-relaxed">
            <li>Erase your student profile, account credentials, and login session.</li>
            <li>If you have a registered store, delete all your products, storefront, and inventory.</li>
            <li>Remove your active cart items, reviews, student verification data, and notifications.</li>
          </ul>
        </div>

        <DialogFooter className="flex items-center justify-end gap-2.5 pt-2">
          <button
            type="button"
            disabled={isPending}
            onClick={() => onOpenChange(false)}
            className="rounded-xl border border-line bg-paper px-4 py-2.5 text-xs font-semibold text-muted hover:text-ink transition-colors"
          >
            Keep My Account
          </button>

          <button
            type="button"
            disabled={isPending}
            onClick={handleDelete}
            className="inline-flex items-center gap-2 rounded-xl bg-destructive px-4 py-2.5 text-xs font-bold text-white shadow-flyer hover:bg-destructive/90 active:scale-95 transition-all disabled:opacity-50"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>{isPending ? "Deleting Account…" : "Permanently Delete Account"}</span>
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
