"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
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
import {
  Package,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Image as ImageIcon,
  Clock,
  PhilippinePeso,
  Layers,
  Loader2,
} from "lucide-react";
import { createProductAction, updateProductAction, ActionState } from "@/app/actions/seller";

export interface CategoryOption {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
}

export interface ProductToEdit {
  id: string;
  title: string;
  category_id: string;
  price: number;
  stock: number;
  prep_time_minutes: number;
  status: "ACTIVE" | "DRAFT" | "OUT_OF_STOCK" | "ARCHIVED";
  description: string | null;
  image_url?: string | null;
}

interface ProductFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: CategoryOption[];
  productToEdit?: ProductToEdit | null;
  onSaved?: () => void;
}

const PRESET_PRODUCT_IMAGES = [
  {
    label: "Fresh Baked Cookies",
    url: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80",
  },
  {
    label: "Iced Caramel Coffee",
    url: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80",
  },
  {
    label: "Handmade Beaded Charms",
    url: "https://images.unsplash.com/photo-1611591475152-4770281b3799?auto=format&fit=crop&w=600&q=80",
  },
  {
    label: "Handcrafted Tote Bag",
    url: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
  },
  {
    label: "Vinyl Campus Stickers",
    url: "https://images.unsplash.com/photo-1572375992501-4b0892d50c69?auto=format&fit=crop&w=600&q=80",
  },
  {
    label: "Study Reviewer Binder",
    url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
  },
  {
    label: "School Club Merchandise",
    url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
  },
  {
    label: "Artisan Match Stick Bento",
    url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
  },
];

export function ProductFormModal({
  open,
  onOpenChange,
  categories,
  productToEdit,
  onSaved,
}: ProductFormModalProps) {
  const isEditing = !!productToEdit;

  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [prepTimeMinutes, setPrepTimeMinutes] = useState(0);
  const [status, setStatus] = useState<"ACTIVE" | "DRAFT">("ACTIVE");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [state, setState] = useState<ActionState>({});

  useEffect(() => {
    if (productToEdit) {
      setTitle(productToEdit.title || "");
      setCategoryId(productToEdit.category_id || (categories[0]?.id ?? ""));
      setPrice(productToEdit.price?.toString() || "0");
      setStock(productToEdit.stock?.toString() || "0");
      setPrepTimeMinutes(productToEdit.prep_time_minutes || 0);
      setStatus(productToEdit.status === "DRAFT" ? "DRAFT" : "ACTIVE");
      setDescription(productToEdit.description || "");
      setImageUrl(productToEdit.image_url || "");
    } else {
      setTitle("");
      setCategoryId(categories[0]?.id || "");
      setPrice("");
      setStock("10");
      setPrepTimeMinutes(0);
      setStatus("ACTIVE");
      setDescription("");
      setImageUrl(PRESET_PRODUCT_IMAGES[0]?.url || "");
    }
    setState({});
  }, [productToEdit, categories, open]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    setState({});

    const formData = new FormData();
    formData.append("title", title);
    formData.append("categoryId", categoryId || categories[0]?.id || "");
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("prepTimeMinutes", prepTimeMinutes.toString());
    formData.append("status", status);
    formData.append("description", description);
    formData.append("imageUrl", imageUrl);

    let res: ActionState;
    if (isEditing && productToEdit) {
      res = await updateProductAction(productToEdit.id, {}, formData);
    } else {
      res = await createProductAction({}, formData);
    }

    setIsPending(false);
    setState(res);

    if (res.success) {
      setTimeout(() => {
        onOpenChange(false);
        onSaved?.();
      }, 700);
    }
  }

  const getFieldError = (field: string) => state.errors?.[field]?.[0];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl p-6 sm:p-8">
        <DialogHeader className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-kita-green">
            <Package className="h-5 w-5" />
            <span className="eyebrow">
              {isEditing ? "Modify Listing" : "Create New Product"}
            </span>
          </div>
          <DialogTitle className="font-display text-2xl font-extrabold text-ink">
            {isEditing ? "Edit Product Details" : "Add Product to Your Store"}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted">
            {isEditing
              ? "Update pricing, inventory levels, and images for this listing."
              : "List an item, snack, review material, or craft for campus buyers."}
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

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-2">
          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="prod-title">Product Title</Label>
            <Input
              id="prod-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Matcha White Chocolate Cookies (Box of 4)"
              required
              className="h-11 rounded-xl text-base"
            />
            {getFieldError("title") && (
              <p className="text-xs text-destructive">{getFieldError("title")}</p>
            )}
          </div>

          {/* Category & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="prod-cat" className="flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5 text-kita-green" />
                <span>Category</span>
              </Label>
              <select
                id="prod-cat"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="h-11 w-full rounded-xl border border-line bg-surface px-3 py-2 text-sm text-ink focus:border-kita-green focus:outline-none"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.icon ? `${c.icon} ` : ""}{c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="prod-status">Listing Visibility</Label>
              <div className="grid grid-cols-2 gap-2 h-11">
                <button
                  type="button"
                  onClick={() => setStatus("ACTIVE")}
                  className={`rounded-xl text-xs font-bold transition-all ${
                    status === "ACTIVE"
                      ? "bg-kita-green text-white shadow-flyer"
                      : "border border-line bg-paper text-muted hover:text-ink"
                  }`}
                >
                  Active (Live)
                </button>
                <button
                  type="button"
                  onClick={() => setStatus("DRAFT")}
                  className={`rounded-xl text-xs font-bold transition-all ${
                    status === "DRAFT"
                      ? "bg-ink text-white shadow-flyer"
                      : "border border-line bg-paper text-muted hover:text-ink"
                  }`}
                >
                  Draft (Hidden)
                </button>
              </div>
            </div>
          </div>

          {/* Price & Stock */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="prod-price" className="flex items-center gap-1.5">
                <PhilippinePeso className="h-3.5 w-3.5 text-kita-green" />
                <span>Price (PHP)</span>
              </Label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-muted">
                  ₱
                </span>
                <Input
                  id="prod-price"
                  type="number"
                  step="0.50"
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="85.00"
                  required
                  className="h-11 rounded-xl pl-8 text-base font-semibold"
                />
              </div>
              {getFieldError("price") && (
                <p className="text-xs text-destructive">{getFieldError("price")}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="prod-stock">Available Stock</Label>
              <Input
                id="prod-stock"
                type="number"
                min="0"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="15"
                required
                className="h-11 rounded-xl text-base"
              />
              {getFieldError("stock") && (
                <p className="text-xs text-destructive">{getFieldError("stock")}</p>
              )}
            </div>
          </div>

          {/* Lead / Prep Time Quick Selector */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="prod-prep" className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-muted" />
                <span>Preparation / Lead Time</span>
              </Label>
              <span className="text-xs text-muted">
                {prepTimeMinutes === 0
                  ? "Ready for instant handoff"
                  : `${prepTimeMinutes} minutes lead time`}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: "Instant (0m)", value: 0 },
                { label: "15 mins", value: 15 },
                { label: "30 mins", value: 30 },
                { label: "1 hour", value: 60 },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setPrepTimeMinutes(opt.value)}
                  className={`rounded-xl py-2 text-xs font-semibold transition-colors border ${
                    prepTimeMinutes === opt.value
                      ? "border-kita-green bg-kita-green-soft text-kita-green font-bold"
                      : "border-line bg-surface text-muted hover:bg-paper"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Image URL & Preset Selection */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="prod-image" className="flex items-center gap-1.5">
              <ImageIcon className="h-3.5 w-3.5 text-kita-green" />
              <span>Product Image URL</span>
            </Label>
            <Input
              id="prod-image"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="h-11 rounded-xl text-xs"
            />

            {/* Quick preset thumbnail pills */}
            <div className="flex flex-col gap-1.5 pt-1">
              <span className="eyebrow text-[0.65rem] text-muted">
                Or pick a preset sample photo:
              </span>
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {PRESET_PRODUCT_IMAGES.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setImageUrl(preset.url)}
                    className={`group relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                      imageUrl === preset.url
                        ? "border-kita-green ring-2 ring-kita-green/30 scale-105"
                        : "border-line opacity-70 hover:opacity-100"
                    }`}
                    title={preset.label}
                  >
                    <Image
                      src={preset.url}
                      alt={preset.label}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Live image preview */}
            {imageUrl && (
              <div className="relative mt-2 h-36 w-full overflow-hidden rounded-2xl border border-line bg-paper-deep shadow-inner">
                <Image
                  src={imageUrl}
                  alt="Product preview"
                  fill
                  className="object-cover"
                  onError={() => {}}
                />
                <div className="absolute bottom-2 left-2 rounded-lg bg-black/60 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
                  Live Preview
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="prod-desc">Product Description</Label>
            <Textarea
              id="prod-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Highlight ingredients, flavor notes, sizes, material, pickup instructions, or customized options…"
              rows={3}
              className="rounded-xl resize-none text-sm"
            />
          </div>

          {/* Modal Actions */}
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
              className="inline-flex items-center gap-2 rounded-xl bg-kita-green px-6 py-2.5 text-sm font-semibold text-white shadow-flyer transition-all hover:bg-kita-green-deep active:scale-95 disabled:opacity-50"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving Listing…
                </span>
              ) : isEditing ? (
                "Update Product"
              ) : (
                "Publish Product"
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
