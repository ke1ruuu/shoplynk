"use client";

import React, { useActionState, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { updateStoreAction, ActionState } from "@/app/actions/seller";
import type { SellerStoreData } from "./seller-header";
import { DeleteStorefrontDialog } from "./delete-storefront-dialog";

interface StoreSettingsModalProps {
  store: SellerStoreData;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/** Long enough for the saved confirmation to register before the dialog closes. */
const CLOSE_AFTER_SAVE_MS = 900;

const FIELD = "h-9 rounded-md";

export function StoreSettingsModal({ store, open, onOpenChange }: StoreSettingsModalProps) {
  const [isActive, setIsActive] = useState<boolean>(store.is_active ?? true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    async (prev, formData) => {
      const result = await updateStoreAction(prev, formData);
      if (result.success) {
        setTimeout(() => onOpenChange(false), CLOSE_AFTER_SAVE_MS);
      }
      return result;
    },
    {}
  );

  const fieldError = (field: string) => state.errors?.[field]?.[0];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-xl overflow-y-auto rounded-lg p-5">
        <DialogHeader className="flex flex-col gap-1.5 text-left">
          <DialogTitle className="text-base font-semibold text-ink">Store settings</DialogTitle>
          <DialogDescription className="text-sm leading-relaxed text-muted">
            How your store appears to students and faculty browsing the campus marketplace.
          </DialogDescription>
        </DialogHeader>

        {state.message && (
          <p
            role="status"
            className={`flex items-start gap-2 rounded-md border px-3 py-2 text-sm ${
              state.success
                ? "border-kita-green/25 bg-kita-green-soft text-kita-green-deep"
                : "border-destructive/30 bg-destructive/10 text-destructive"
            }`}
          >
            {state.success ? (
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0" strokeWidth={2} aria-hidden="true" />
            ) : (
              <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" strokeWidth={2} aria-hidden="true" />
            )}
            <span>{state.message}</span>
          </p>
        )}

        <form action={formAction} className="flex flex-col">
          {/* Open / paused. One switch — it is one binary decision. */}
          <div className="flex items-start justify-between gap-4 border-b border-line py-3.5">
            <span className="flex flex-col gap-0.5">
              <Label htmlFor="store-active" className="text-sm font-semibold text-ink">
                Open for orders
              </Label>
              <span className="text-xs leading-relaxed text-muted">
                {isActive
                  ? "Your storefront and listings are visible to the campus."
                  : "Storefront and listings are hidden. Your catalog, inventory, and ratings stay saved."}
              </span>
            </span>
            <input type="hidden" name="isActive" value={isActive ? "true" : "false"} />
            <Switch
              id="store-active"
              checked={isActive}
              onCheckedChange={(checked) => setIsActive(checked)}
              className="mt-0.5 flex-shrink-0"
            />
          </div>

          <div className="flex flex-col gap-4 py-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="store-name">Store name</Label>
              <Input
                id="store-name"
                name="name"
                defaultValue={store.name}
                placeholder="Maria's Homemade Treats"
                required
                aria-invalid={Boolean(fieldError("name"))}
                className={FIELD}
              />
              {fieldError("name") && (
                <p className="text-xs text-destructive">{fieldError("name")}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="store-desc">What you sell</Label>
              <Textarea
                id="store-desc"
                name="description"
                defaultValue={store.description || ""}
                placeholder="Fresh-baked brownies, made to order. Batches ready every Tuesday and Thursday."
                rows={3}
                className="resize-none rounded-md"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="store-pickup">Campus pickup spots</Label>
              <Input
                id="store-pickup"
                name="pickupLocations"
                defaultValue={store.pickup_locations || ""}
                placeholder="Building A 2nd floor lobby, gazebo near the canteen"
                className={FIELD}
              />
              <p className="text-xs text-muted">
                Name a spot buyers can find without asking. Shown on every order.
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="store-hours">Pickup hours</Label>
              <Input
                id="store-hours"
                name="operatingHours"
                defaultValue={store.operating_hours || ""}
                placeholder="Mon–Fri, 10:00 AM – 4:30 PM"
                className={FIELD}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="store-gcash-name">GCash account name</Label>
                <Input
                  id="store-gcash-name"
                  name="gcashName"
                  defaultValue={store.gcash_name || ""}
                  placeholder="M***A S."
                  className={FIELD}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="store-gcash-num">GCash number</Label>
                <Input
                  id="store-gcash-num"
                  name="gcashNumber"
                  defaultValue={store.gcash_number || ""}
                  placeholder="0917 000 0000"
                  className={`${FIELD} tabular`}
                />
              </div>
            </div>
          </div>

          {/* Deleting the storefront lives behind a rule, not inside a tinted box. */}
          <div className="flex items-center justify-between gap-4 border-t border-line py-3.5">
            <span className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold text-ink">Delete this storefront</span>
              <span className="text-xs text-muted">
                Removes the store, its listings, and your seller role.
              </span>
            </span>
            <button
              type="button"
              onClick={() => setDeleteDialogOpen(true)}
              className="h-9 flex-shrink-0 rounded-md border border-destructive/30 bg-surface px-3 text-sm font-semibold text-destructive transition-colors hover:bg-destructive hover:text-white"
            >
              Delete
            </button>
          </div>

          <DialogFooter className="flex items-center justify-end gap-2 border-t border-line pt-4">
            <button
              type="button"
              disabled={isPending}
              onClick={() => onOpenChange(false)}
              className="h-9 rounded-md border border-line bg-surface px-3.5 text-sm font-semibold text-ink transition-colors hover:bg-paper-deep disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="h-9 rounded-md bg-kita-green px-3.5 text-sm font-semibold text-white transition-colors hover:bg-kita-green-deep disabled:opacity-50"
            >
              {isPending ? "Saving…" : "Save changes"}
            </button>
          </DialogFooter>
        </form>

        <DeleteStorefrontDialog
          storeName={store.name}
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
        />
      </DialogContent>
    </Dialog>
  );
}
