"use client";

import React, { useActionState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, CheckCircle2, Store, CreditCard, MapPin, Clock } from "lucide-react";
import { updateStoreAction, ActionState } from "@/app/actions/seller";
import type { SellerStoreData } from "./seller-header";

interface StoreSettingsModalProps {
  store: SellerStoreData;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function StoreSettingsModal({
  store,
  open,
  onOpenChange,
}: StoreSettingsModalProps) {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    async (prev, formData) => {
      const result = await updateStoreAction(prev, formData);
      if (result.success) {
        setTimeout(() => onOpenChange(false), 800);
      }
      return result;
    },
    {}
  );

  const getFieldError = (field: string) => state.errors?.[field]?.[0];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8">
        <DialogHeader className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-kita-green">
            <Store className="h-5 w-5" />
            <span className="eyebrow">Store Configuration</span>
          </div>
          <DialogTitle className="font-display text-2xl font-extrabold text-ink">
            Storefront Settings
          </DialogTitle>
          <DialogDescription className="text-sm text-muted">
            Configure how your campus store appears to students and faculty.
          </DialogDescription>
        </DialogHeader>

        {state.message && (
          <div
            className={`flex items-center gap-2.5 rounded-xl border p-3.5 text-sm font-medium ${
              state.success
                ? "border-kita-green/30 bg-kita-green-soft text-kita-green"
                : "border-destructive/30 bg-destructive/10 text-destructive"
            }`}
          >
            {state.success ? (
              <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
            ) : (
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
            )}
            <span>{state.message}</span>
          </div>
        )}

        <form action={formAction} className="flex flex-col gap-4 mt-2">
          {/* Store Name */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="store-name">Store Name</Label>
            <Input
              id="store-name"
              name="name"
              defaultValue={store.name}
              placeholder="e.g. Maria's Homemade Treats"
              required
              className="h-11 rounded-xl"
            />
            {getFieldError("name") && (
              <p className="text-xs text-destructive">{getFieldError("name")}</p>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="store-desc">Store Bio / Description</Label>
            <Textarea
              id="store-desc"
              name="description"
              defaultValue={store.description || ""}
              placeholder="Tell buyers what you sell, fresh batch schedules, or custom requests…"
              rows={3}
              className="rounded-xl resize-none"
            />
          </div>

          {/* Pickup Locations */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="store-pickup" className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-kita-green" />
              <span>Campus Pickup Spots</span>
            </Label>
            <Input
              id="store-pickup"
              name="pickupLocations"
              defaultValue={store.pickup_locations || ""}
              placeholder="e.g. Building A 2nd Floor Lobby, Gazebo near Canteen"
              className="h-11 rounded-xl"
            />
          </div>

          {/* GCash Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="store-gcash-name" className="flex items-center gap-1.5">
                <CreditCard className="h-3.5 w-3.5 text-kita-green" />
                <span>GCash Name</span>
              </Label>
              <Input
                id="store-gcash-name"
                name="gcashName"
                defaultValue={store.gcash_name || ""}
                placeholder="M***A S."
                className="h-11 rounded-xl"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="store-gcash-num">GCash Mobile Number</Label>
              <Input
                id="store-gcash-num"
                name="gcashNumber"
                defaultValue={store.gcash_number || ""}
                placeholder="0917-XXX-XXXX"
                className="h-11 rounded-xl"
              />
            </div>
          </div>

          {/* Operating Hours */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="store-hours" className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-muted" />
              <span>Operating / Meetup Hours</span>
            </Label>
            <Input
              id="store-hours"
              name="operatingHours"
              defaultValue={store.operating_hours || ""}
              placeholder="e.g. Mon-Fri 10:00 AM - 4:30 PM"
              className="h-11 rounded-xl"
            />
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-line mt-2">
            <button
              type="button"
              disabled={isPending}
              onClick={() => onOpenChange(false)}
              className="rounded-xl border border-line bg-paper px-4 py-2.5 text-sm font-semibold text-muted hover:text-ink transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-2 rounded-xl bg-kita-green px-5 py-2.5 text-sm font-semibold text-white shadow-flyer transition-all hover:bg-kita-green-deep active:scale-95 disabled:opacity-50"
            >
              {isPending ? "Saving…" : "Save Store Details"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
