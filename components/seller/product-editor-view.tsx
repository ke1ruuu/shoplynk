"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Link as LinkIcon,
  Check,
  Eye,
  Sparkles,
  Zap,
  Clock,
  Layers,
  Store,
} from "lucide-react";
import { createProductAction, updateProductAction, ActionState } from "@/app/actions/seller";

export interface CategoryOption {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
}

export interface ProductInitialData {
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

interface ProductEditorViewProps {
  categories: CategoryOption[];
  productToEdit?: ProductInitialData | null;
  storeName?: string;
}

const PRESET_PRODUCT_IMAGES = [
  {
    label: "Pastries & Treats",
    url: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "Coffee & Drinks",
    url: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "Beaded Charms",
    url: "https://images.unsplash.com/photo-1611591475152-4770281b3799?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "Tote Bags",
    url: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "Stickers & Decals",
    url: "https://images.unsplash.com/photo-1572375992501-4b0892d50c69?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "Study Reviewers",
    url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "Club Apparel",
    url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "Bento Meals",
    url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
  },
];

export function ProductEditorView({
  categories,
  productToEdit,
  storeName,
}: ProductEditorViewProps) {
  const router = useRouter();
  const isEditing = !!productToEdit;

  const [title, setTitle] = useState(productToEdit?.title || "");
  const [categoryId, setCategoryId] = useState(
    productToEdit?.category_id || (categories[0]?.id ?? "")
  );
  const [price, setPrice] = useState(productToEdit?.price?.toString() || "");
  const [stock, setStock] = useState(productToEdit?.stock?.toString() || "10");
  const [prepTimeMinutes, setPrepTimeMinutes] = useState(
    productToEdit?.prep_time_minutes ?? 0
  );
  const [status, setStatus] = useState<"ACTIVE" | "DRAFT">(
    productToEdit?.status === "DRAFT" ? "DRAFT" : "ACTIVE"
  );
  const [description, setDescription] = useState(productToEdit?.description || "");
  const [imageUrl, setImageUrl] = useState(
    productToEdit?.image_url || PRESET_PRODUCT_IMAGES[0]?.url || ""
  );
  const [showCustomUrlInput, setShowCustomUrlInput] = useState(
    !PRESET_PRODUCT_IMAGES.some((p) => p.url === productToEdit?.image_url)
  );
  const [isPending, setIsPending] = useState(false);
  const [state, setState] = useState<ActionState>({});

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
          router.push("/seller");
          router.refresh();
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
      router,
    ]
  );

  // Keyboard shortcut: Cmd+Enter or Ctrl+Enter to quickly save/publish
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        handleSubmit();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSubmit]);

  const getFieldError = (field: string) => state.errors?.[field]?.[0];
  const selectedCategory = categories.find((c) => c.id === categoryId) || categories[0];

  return (
    <div className="min-h-screen bg-paper py-8 sm:py-10">
      <main className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Top Minimalist Inline Navigation (No Header Bar) */}
        <div className="flex items-center justify-between border-b border-line pb-4 mb-6">
          <Link
            href="/seller"
            className="group inline-flex items-center gap-2 text-xs font-bold text-muted hover:text-ink transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1 text-muted group-hover:text-ink" />
            <span>Back to Seller Studio</span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-muted">
            <span className="font-semibold text-ink">
              {isEditing ? "Editing Listing" : "New Campus Listing"}
            </span>
            <span>·</span>
            <span>LYFJSHS</span>
          </div>
        </div>

        {state.message && (
          <div
            className={`mb-6 flex items-center gap-2.5 rounded-xl border p-4 text-xs font-semibold ${
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

        {/* 2-Column Minimalist Canvas Layout */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (7 Cols): Document-Style Creator Canvas */}
          <div className="lg:col-span-7 flex flex-col border border-line bg-surface rounded-2xl overflow-hidden divide-y divide-line shadow-sm">
            
            {/* 1. Document Title & Description Block */}
            <div className="p-6 sm:p-7 flex flex-col gap-3 bg-surface">
              <div className="flex flex-col gap-1">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Listing title (e.g. Ube Cheese Pandesal)..."
                  required
                  className="w-full bg-transparent font-display text-xl sm:text-2xl font-bold text-ink placeholder:text-muted/40 focus:outline-none leading-tight"
                />
                {getFieldError("title") && (
                  <p className="text-xs text-destructive mt-1">{getFieldError("title")}</p>
                )}
              </div>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add brief notes on flavor, ingredients, materials, portion size, or pickup instructions for student buyers..."
                rows={3}
                className="w-full bg-transparent text-xs text-ink placeholder:text-muted/50 focus:outline-none resize-none leading-relaxed border-t border-line/60 pt-3 mt-1"
              />
            </div>

            {/* 2. Cover Photo Preset Rail */}
            <div className="p-5 sm:p-6 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="eyebrow text-xs text-muted">Cover Photo</span>
                <button
                  type="button"
                  onClick={() => setShowCustomUrlInput(!showCustomUrlInput)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-kita-green hover:underline"
                >
                  <LinkIcon className="h-3 w-3" />
                  <span>{showCustomUrlInput ? "Use Presets" : "Custom URL"}</span>
                </button>
              </div>

              {showCustomUrlInput ? (
                <Input
                  id="prod-image"
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="Paste image URL (https://...)"
                  className="h-9 rounded-xl text-xs bg-paper border-line"
                />
              ) : (
                <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none">
                  {PRESET_PRODUCT_IMAGES.map((preset) => {
                    const isSelected = imageUrl === preset.url;
                    return (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => {
                          setImageUrl(preset.url);
                          setShowCustomUrlInput(false);
                        }}
                        className={`group flex items-center gap-2 rounded-xl border px-2.5 py-1.5 flex-shrink-0 text-left transition-all ${
                          isSelected
                            ? "border-kita-green bg-kita-green-soft text-kita-green font-bold shadow-sm ring-1 ring-kita-green/40"
                            : "border-line bg-paper text-muted hover:text-ink hover:bg-paper-deep"
                        }`}
                      >
                        <div className="relative h-6 w-6 flex-shrink-0 overflow-hidden rounded-md bg-paper-deep">
                          <Image
                            src={preset.url}
                            alt={preset.label}
                            fill
                            className="object-cover"
                          />
                          {isSelected && (
                            <div className="absolute inset-0 bg-kita-green/40 flex items-center justify-center text-white">
                              <Check className="h-3 w-3" />
                            </div>
                          )}
                        </div>
                        <span className="text-xs whitespace-nowrap">{preset.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 3. Pricing, Stock & Category */}
            <div className="p-5 sm:p-6 flex flex-col gap-3">
              <span className="eyebrow text-xs text-muted">Pricing &amp; Inventory</span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Price */}
                <div className="flex flex-col gap-1">
                  <Label htmlFor="prod-price" className="text-xs font-semibold text-muted">
                    Price (PHP) <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs font-bold text-muted">
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
                      className="h-9 rounded-xl pl-7 font-mono text-xs font-bold bg-paper border-line"
                    />
                  </div>
                  {getFieldError("price") && (
                    <p className="text-xs text-destructive">{getFieldError("price")}</p>
                  )}
                </div>

                {/* Stock */}
                <div className="flex flex-col gap-1">
                  <Label htmlFor="prod-stock" className="text-xs font-semibold text-muted">
                    Available Stock <span className="text-destructive">*</span>
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
                    className="h-9 rounded-xl font-mono text-xs font-bold bg-paper border-line"
                  />
                  {getFieldError("stock") && (
                    <p className="text-xs text-destructive">{getFieldError("stock")}</p>
                  )}
                </div>

                {/* Category */}
                <div className="flex flex-col gap-1">
                  <Label htmlFor="prod-cat" className="text-xs font-semibold text-muted">
                    Category
                  </Label>
                  <select
                    id="prod-cat"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="h-9 w-full rounded-xl border border-line bg-paper px-3 text-xs font-semibold text-ink focus:border-kita-green focus:bg-surface focus:outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.icon ? `${c.icon} ` : ""}{c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* 4. Fulfillment Lead Time */}
            <div className="p-5 sm:p-6 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="eyebrow text-xs text-muted">Fulfillment &amp; Prep</span>
                <span className="text-xs text-muted">
                  {prepTimeMinutes === 0
                    ? "⚡ Instant pickup"
                    : `⏳ ${prepTimeMinutes}m prep`}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { label: "Instant (0m)", value: 0, desc: "Ready now" },
                  { label: "15 mins", value: 15, desc: "Quick prep" },
                  { label: "30 mins", value: 30, desc: "Standard bake" },
                  { label: "1 hour", value: 60, desc: "Custom make" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setPrepTimeMinutes(opt.value)}
                    className={`flex flex-col gap-0.5 rounded-xl p-2 text-left transition-all border ${
                      prepTimeMinutes === opt.value
                        ? "border-kita-green bg-kita-green-soft text-kita-green font-bold shadow-sm"
                        : "border-line bg-paper text-muted hover:text-ink hover:bg-paper-deep"
                    }`}
                  >
                    <span className="text-xs font-bold">{opt.label}</span>
                    <span className="text-xs opacity-75 font-normal">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Integrated Bottom Action Bar */}
            <div className="p-4 sm:p-5 bg-paper/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {/* Live / Draft Toggle */}
                <div className="inline-flex rounded-full border border-line bg-surface p-0.5">
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

                <Link
                  href="/seller"
                  className="text-xs font-semibold text-muted hover:text-ink transition-colors px-2"
                >
                  Discard
                </Link>
              </div>

              <button
                type="button"
                disabled={isPending || !title.trim() || !price}
                onClick={() => handleSubmit()}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-kita-green px-6 py-2.5 text-xs font-bold text-white shadow-flyer transition-all hover:bg-kita-green-deep active:scale-95 disabled:opacity-50"
              >
                {isPending ? (
                  <span className="flex items-center gap-1.5">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Saving…
                  </span>
                ) : isEditing ? (
                  "Save Changes"
                ) : (
                  `Publish Product ${price ? `— ₱${Number(price).toFixed(2)}` : ""}`
                )}
              </button>
            </div>
          </div>

          {/* Right Column (5 Cols): Sticky Live Marketplace Preview */}
          <div className="lg:col-span-5 flex flex-col gap-3 lg:sticky lg:top-8">
            <div className="flex items-center justify-between px-1">
              <span className="eyebrow text-xs text-muted">Buyer Card Preview</span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted">
                <Eye className="h-3 w-3 text-kita-green" />
                <span>Live Marketplace View</span>
              </span>
            </div>

            {/* Flatline Line-Ruled Preview Card */}
            <div className="flex flex-col bg-surface rounded-2xl border border-line overflow-hidden shadow-sm">
              {/* Product Photo Showcase */}
              <div className="relative w-full aspect-[4/3] bg-paper-deep overflow-hidden">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt="Card preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-muted">
                    No image preview
                  </div>
                )}

                {/* Category chip */}
                <div className="absolute top-2.5 left-2.5 rounded-md bg-surface/90 px-2 py-0.5 text-xs font-bold text-ink backdrop-blur-md shadow-sm">
                  {selectedCategory?.name || "General"}
                </div>

                {/* Live/Draft badge */}
                {status === "DRAFT" ? (
                  <div className="absolute top-2.5 right-2.5 rounded-md bg-ink/90 px-2 py-0.5 text-xs font-bold text-white backdrop-blur-md">
                    Draft (Hidden)
                  </div>
                ) : (
                  <div className="absolute top-2.5 right-2.5 rounded-md bg-kita-green/90 px-2 py-0.5 text-xs font-bold text-white backdrop-blur-md">
                    Live
                  </div>
                )}
              </div>

              {/* Card Meta & Typography */}
              <div className="flex flex-col p-4 gap-2">
                <div className="flex items-center justify-between text-xs text-muted">
                  <span className="font-semibold text-ink truncate">
                    {storeName || "Your Campus Store"}
                  </span>
                  <span className="flex-shrink-0 text-muted">
                    {prepTimeMinutes === 0 ? "⚡ Instant" : `⏳ ${prepTimeMinutes}m prep`}
                  </span>
                </div>

                <h3 className="font-display text-base font-bold text-ink line-clamp-1">
                  {title || "Untitled Product Listing"}
                </h3>

                <p className="text-xs text-muted line-clamp-2 leading-relaxed">
                  {description || "No description provided yet. Notes regarding flavor, sizing, or materials will appear here."}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-line mt-1">
                  <span className="font-mono text-lg font-bold text-kita-green">
                    ₱{price ? Number(price).toFixed(2) : "0.00"}
                  </span>
                  <span className="text-xs font-semibold text-muted">
                    {stock ? `${stock} available` : "Out of stock"}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Keyboard shortcut hint */}
            <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-paper border border-line text-xs text-muted">
              <span>Quick save shortcut</span>
              <kbd className="font-mono text-xs font-bold text-ink bg-surface px-2 py-0.5 rounded border border-line">
                ⌘ + Enter
              </kbd>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
