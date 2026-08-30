"use client";

import React, { useState, useEffect, useCallback } from "react";
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
  CheckCircle2,
  AlertCircle,
  Clock,
  Loader2,
  Sparkles,
  Check,
  UploadCloud,
  ImagePlus,
  Trash2,
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

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileChange = (file: File) => {
    setUploadError(null);
    if (!file.type.startsWith("image/")) {
      setUploadError("Please upload a valid image file (PNG, JPG, WEBP).");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setUploadError("Image is too large. Maximum file size is 8MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImageUrl(reader.result);
      }
    };
    reader.onerror = () => {
      setUploadError("Failed to read image file.");
    };
    reader.readAsDataURL(file);
  };

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
      setImageUrl("");
    }
    setState({});
  }, [productToEdit, categories, open]);

  const handleSubmit = useCallback(
    async (e?: React.FormEvent<HTMLFormElement>) => {
      if (e) e.preventDefault();
      if (!title.trim() || !price || isPending) return;

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
        }, 500);
      }
    },
    [
      title,
      price,
      stock,
      prepTimeMinutes,
      status,
      description,
      imageUrl,
      isEditing,
      productToEdit,
      categoryId,
      categories,
      isPending,
      onOpenChange,
      onSaved,
    ]
  );

  // Keyboard shortcut: Cmd+Enter or Ctrl+Enter to quickly submit
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter" && open) {
        e.preventDefault();
        handleSubmit();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSubmit, open]);

  const getFieldError = (field: string) => state.errors?.[field]?.[0];
  const selectedCategory = categories.find((c) => c.id === categoryId) || categories[0];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto rounded-3xl p-6 sm:p-7 border border-line bg-surface shadow-flyer-lg">
        <DialogHeader className="flex flex-col gap-1 pb-1">
          <div className="flex items-center justify-between">
            <span className="eyebrow text-muted">
              {isEditing ? "Edit Listing" : "New Listing"}
            </span>

            {/* Visibility Toggle Pill */}
            <div className="inline-flex rounded-full border border-line bg-paper p-0.5">
              <button
                type="button"
                onClick={() => setStatus("ACTIVE")}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                  status === "ACTIVE"
                    ? "bg-kita-green text-white shadow-sm"
                    : "text-muted hover:text-ink"
                }`}
              >
                ● Live
              </button>
              <button
                type="button"
                onClick={() => setStatus("DRAFT")}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                  status === "DRAFT"
                    ? "bg-ink text-white shadow-sm"
                    : "text-muted hover:text-ink"
                }`}
              >
                Draft
              </button>
            </div>
          </div>

          <DialogTitle className="sr-only">
            {isEditing ? "Edit Product" : "Add Product"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Create or edit a product listing for your campus store.
          </DialogDescription>
        </DialogHeader>

        {state.message && (
          <div
            className={`flex items-center gap-2.5 rounded-2xl border p-3.5 text-xs font-semibold ${
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

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-1">
          {/* 1. Large Expressive Title Input */}
          <div className="flex flex-col gap-1">
            <input
              id="prod-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What are you selling? (e.g. Ube Cheese Pandesal)"
              required
              className="w-full font-display text-xl sm:text-2xl font-bold text-ink placeholder:text-muted/40 bg-transparent border-b border-line pb-2.5 focus:border-kita-green focus:outline-none transition-colors"
            />
            {getFieldError("title") && (
              <p className="text-xs text-destructive mt-1">{getFieldError("title")}</p>
            )}
          </div>

          {/* 2. Photo Upload & Preview */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-bold text-ink">
                Product Cover Photo
              </Label>
              {imageUrl && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-kita-green">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Photo attached</span>
                </span>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileChange(file);
              }}
            />

            {imageUrl ? (
              <div className="relative h-44 sm:h-52 w-full overflow-hidden rounded-2xl border border-line bg-paper-deep shadow-inner group">
                <Image
                  src={imageUrl}
                  alt="Product cover"
                  fill
                  className="object-cover"
                />

                {/* Tag overlay */}
                {selectedCategory && (
                  <div className="absolute top-3 left-3 rounded-xl bg-surface/90 px-3 py-1 text-xs font-bold text-ink shadow-sm backdrop-blur-md">
                    {selectedCategory.icon ? `${selectedCategory.icon} ` : ""}
                    {selectedCategory.name}
                  </div>
                )}

                {/* Change/Remove Action Buttons */}
                <div className="absolute bottom-3 right-3 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-surface/90 px-3 py-1.5 text-xs font-semibold text-ink shadow-sm backdrop-blur-md hover:bg-surface hover:text-kita-green transition-colors"
                  >
                    <ImagePlus className="h-3.5 w-3.5 text-kita-green" />
                    <span>Change</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageUrl("")}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-surface/90 px-3 py-1.5 text-xs font-semibold text-destructive shadow-sm backdrop-blur-md hover:bg-surface hover:text-destructive transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            ) : (
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDraggingFile(true);
                }}
                onDragLeave={() => setIsDraggingFile(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDraggingFile(false);
                  const file = e.dataTransfer.files?.[0];
                  if (file) handleFileChange(file);
                }}
                onClick={() => fileInputRef.current?.click()}
                className={`flex flex-col items-center justify-center gap-2 p-6 sm:p-7 rounded-2xl border-2 border-dashed transition-all cursor-pointer text-center ${
                  isDraggingFile
                    ? "border-kita-green bg-kita-green-soft scale-[0.99]"
                    : "border-line bg-paper/60 hover:bg-paper hover:border-kita-green/50"
                }`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface border border-line text-kita-green shadow-sm">
                  <UploadCloud className="h-5 w-5" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs sm:text-sm font-bold text-ink">
                    Click to upload photo or drag &amp; drop
                  </span>
                  <span className="text-[11px] text-muted">
                    PNG, JPG, or WEBP (Max 8MB)
                  </span>
                </div>
              </div>
            )}

            {uploadError && (
              <p className="text-xs text-destructive flex items-center gap-1 mt-0.5">
                <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                <span>{uploadError}</span>
              </p>
            )}
          </div>

          {/* 3. Core Numbers: Price, Stock, Category */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {/* Price */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="prod-price" className="text-xs font-bold text-ink">
                Price (PHP) <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-sm font-bold text-muted">
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
                  className="h-10 rounded-xl pl-8 font-mono text-sm font-bold bg-paper border-line"
                />
              </div>
              {getFieldError("price") && (
                <p className="text-xs text-destructive">{getFieldError("price")}</p>
              )}
            </div>

            {/* Stock */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="prod-stock" className="text-xs font-bold text-ink">
                Stock Count <span className="text-destructive">*</span>
              </Label>
              <Input
                id="prod-stock"
                type="number"
                min="0"
                step="1"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="10"
                required
                className="h-10 rounded-xl font-mono text-sm font-bold bg-paper border-line"
              />
              {getFieldError("stock") && (
                <p className="text-xs text-destructive">{getFieldError("stock")}</p>
              )}
            </div>

            {/* Category */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="prod-cat" className="text-xs font-bold text-ink">
                Category
              </Label>
              <select
                id="prod-cat"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="h-10 w-full rounded-xl border border-line bg-paper px-3 text-xs font-semibold text-ink focus:border-kita-green focus:bg-surface focus:outline-none"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.icon ? `${c.icon} ` : ""}{c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 4. Prep Time Chips */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-bold text-ink">
                Fulfillment / Lead Time
              </Label>
              <span className="text-xs text-muted">
                {prepTimeMinutes === 0
                  ? "Instant on-campus handoff"
                  : `${prepTimeMinutes} mins preparation`}
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
                  className={`rounded-xl py-2 text-xs transition-all border ${
                    prepTimeMinutes === opt.value
                      ? "border-kita-green bg-kita-green-soft text-kita-green font-bold shadow-sm"
                      : "border-line bg-paper text-muted hover:text-ink font-semibold"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Description */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="prod-desc" className="text-xs font-bold text-ink">
              Product Description
            </Label>
            <Textarea
              id="prod-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Highlight ingredients, flavor notes, sizes, material, or pickup instructions…"
              rows={2}
              className="rounded-xl resize-none text-xs bg-paper border-line"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-line">
            <span className="text-xs text-muted hidden sm:inline">
              Press <kbd className="font-mono rounded bg-paper-deep px-1.5 py-0.5 text-xs text-ink font-semibold">⌘ + Enter</kbd> to save
            </span>

            <div className="flex items-center gap-2.5 ml-auto">
              <button
                type="button"
                disabled={isPending}
                onClick={() => onOpenChange(false)}
                className="rounded-xl border border-line bg-paper px-4 py-2 text-xs font-semibold text-muted hover:text-ink transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending || !title.trim() || !price}
                className="inline-flex items-center gap-2 rounded-xl bg-kita-green px-6 py-2.5 text-xs font-bold text-white shadow-flyer transition-all hover:bg-kita-green-deep active:scale-95 disabled:opacity-50"
              >
                {isPending ? (
                  <span className="flex items-center gap-1.5">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Saving Listing…
                  </span>
                ) : isEditing ? (
                  "Update Listing"
                ) : (
                  "Publish Listing"
                )}
              </button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
