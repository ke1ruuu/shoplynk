"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { User, Shield, School, Mail, Calendar, Sparkles } from "lucide-react";

interface AccountSettingsDialogProps {
  user: {
    email?: string;
    user_metadata?: {
      full_name?: string;
    };
  };
  profile?: {
    full_name: string;
    role: "BUYER" | "SELLER" | "CAMPUS_ADMIN" | "PLATFORM_ADMIN";
    is_verified_seller: boolean;
  } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AccountSettingsDialog({
  user,
  profile,
  open,
  onOpenChange,
}: AccountSettingsDialogProps) {
  const name = profile?.full_name || user.user_metadata?.full_name || "Member";
  const email = user.email || "student@lyfjshs.edu.ph";
  const role = profile?.role || "BUYER";

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-3xl p-6 border border-line bg-surface shadow-flyer-lg">
        <DialogHeader className="flex flex-col gap-1 border-b border-line pb-4 text-left">
          <div className="flex items-center gap-2 text-kita-green">
            <User className="h-4 w-4" />
            <span className="eyebrow text-xs">Account Profile</span>
          </div>
          <DialogTitle className="font-display text-xl font-bold text-ink">
            Member Credentials
          </DialogTitle>
          <DialogDescription className="text-xs text-muted">
            Your registered student profile at Luis Y. Ferrer Jr. Senior High School.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-2">
          {/* Avatar & Identity Card */}
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-paper border border-line">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-kita-green text-sm font-extrabold text-white shadow-sm flex-shrink-0">
              {initials}
            </span>
            <div className="flex flex-col truncate">
              <span className="font-display font-bold text-base text-ink truncate">
                {name}
              </span>
              <span className="text-xs text-muted truncate">{email}</span>
            </div>
          </div>

          {/* Details Ledger */}
          <div className="flex flex-col divide-y divide-line rounded-2xl border border-line bg-surface text-xs">
            <div className="flex items-center justify-between p-3">
              <span className="flex items-center gap-2 text-muted">
                <Shield className="h-3.5 w-3.5 text-kita-green" />
                <span>Account Role</span>
              </span>
              <span className="font-bold text-kita-green">
                {role === "SELLER"
                  ? "Verified Seller"
                  : role === "CAMPUS_ADMIN"
                  ? "Campus Administrator"
                  : "Student Member"}
              </span>
            </div>

            <div className="flex items-center justify-between p-3">
              <span className="flex items-center gap-2 text-muted">
                <School className="h-3.5 w-3.5 text-muted" />
                <span>Campus</span>
              </span>
              <span className="font-medium text-ink truncate max-w-[200px]">
                Luis Y. Ferrer Jr. SHS
              </span>
            </div>

            <div className="flex items-center justify-between p-3">
              <span className="flex items-center gap-2 text-muted">
                <Mail className="h-3.5 w-3.5 text-muted" />
                <span>Account Status</span>
              </span>
              <span className="font-mono text-kita-green font-bold">Active</span>
            </div>
          </div>

          {/* Action button */}
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="mt-2 w-full rounded-xl bg-paper py-2.5 text-xs font-bold text-ink hover:bg-paper-deep transition-colors border border-line"
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
