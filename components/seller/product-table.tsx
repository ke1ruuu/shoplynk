"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  ExternalLink,
  Package,
  Clock,
  CheckCircle2,
  EyeOff,
  AlertTriangle,
  Archive,
  Plus,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toggleProductStatusAction } from "@/app/actions/seller";
import type { CategoryOption, ProductToEdit } from "./product-form-modal";

export interface SellerProductItem {
  id: string;
  store_id: string;
  category_id: string;
  title: string;
  slug: string;
  description: string | null;
  price: number;
  stock: number;
  status: "ACTIVE" | "DRAFT" | "OUT_OF_STOCK" | "ARCHIVED";
  prep_time_minutes: number;
  created_at: string;
  category?: {
    id?: string;
    name: string;
    slug: string;
    icon?: string | null;
  } | null;
  images?: {
    image_url: string;
    display_order: number;
  }[];
}

interface ProductTableProps {
  products: SellerProductItem[];
  categories: CategoryOption[];
  onEditProduct: (product: ProductToEdit) => void;
  onDeleteProduct: (product: { id: string; title: string }) => void;
  onAddNew: () => void;
}

export function ProductTable({
  products,
  categories,
  onEditProduct,
  onDeleteProduct,
  onAddNew,
}: ProductTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [isPending, startTransition] = useTransition();

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      searchQuery.trim() === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === "ALL" || p.category_id === selectedCategory;

    const matchesStatus =
      selectedStatus === "ALL" ||
      (selectedStatus === "ACTIVE" && p.status === "ACTIVE") ||
      (selectedStatus === "DRAFT" && p.status === "DRAFT") ||
      (selectedStatus === "OUT_OF_STOCK" && (p.status === "OUT_OF_STOCK" || p.stock === 0)) ||
      (selectedStatus === "ARCHIVED" && p.status === "ARCHIVED");

    return matchesSearch && matchesCategory && matchesStatus;
  });

  function handleStatusToggle(
    productId: string,
    newStatus: "ACTIVE" | "DRAFT" | "OUT_OF_STOCK" | "ARCHIVED"
  ) {
    startTransition(async () => {
      await toggleProductStatusAction(productId, newStatus);
    });
  }

  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-line bg-surface p-6 shadow-flyer">
      {/* Header Controls (Search, Filters, Counter) */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search your inventory listings…"
            className="h-10 w-full rounded-xl border border-line bg-paper pl-10 pr-4 text-sm text-ink placeholder:text-muted focus:border-kita-green focus:bg-surface focus:outline-none"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Category Filter */}
          <div className="flex items-center gap-1.5">
            <Filter className="h-4 w-4 text-muted hidden sm:block" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-10 rounded-xl border border-line bg-paper px-3 text-xs font-semibold text-ink focus:border-kita-green focus:outline-none"
            >
              <option value="ALL">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="h-10 rounded-xl border border-line bg-paper px-3 text-xs font-semibold text-ink focus:border-kita-green focus:outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active (Live)</option>
            <option value="DRAFT">Drafts (Hidden)</option>
            <option value="OUT_OF_STOCK">Out of Stock</option>
            <option value="ARCHIVED">Archived</option>
          </select>

          {/* Add Product Shortcut */}
          <button
            type="button"
            onClick={onAddNew}
            className="inline-flex items-center gap-1.5 rounded-xl bg-kita-green px-4 py-2 text-xs font-bold text-white shadow-flyer hover:bg-kita-green-deep active:scale-95 transition-all"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>New Item</span>
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto rounded-2xl border border-line">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-line bg-paper/60 text-[11px] font-bold uppercase tracking-wider text-muted">
            <tr>
              <th className="px-5 py-3.5">Product</th>
              <th className="px-4 py-3.5">Category</th>
              <th className="px-4 py-3.5">Price</th>
              <th className="px-4 py-3.5">Stock</th>
              <th className="px-4 py-3.5">Visibility</th>
              <th className="px-4 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line bg-surface">
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-12 text-center">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-paper-deep text-muted">
                      <Package className="h-6 w-6" />
                    </span>
                    <div className="flex flex-col gap-1">
                      <p className="font-display text-base font-bold text-ink">
                        No product listings found
                      </p>
                      <p className="text-xs text-muted max-w-sm">
                        {searchQuery || selectedCategory !== "ALL" || selectedStatus !== "ALL"
                          ? "Try adjusting your search filters or category selections."
                          : "You haven't added any products to your storefront yet. Create your first listing now!"}
                      </p>
                    </div>
                    {filteredProducts.length === 0 && searchQuery === "" && (
                      <button
                        type="button"
                        onClick={onAddNew}
                        className="mt-2 inline-flex items-center gap-2 rounded-xl bg-kita-green px-4 py-2 text-xs font-semibold text-white shadow-flyer hover:bg-kita-green-deep transition-colors"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        <span>Add First Product</span>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              filteredProducts.map((p) => {
                const categoryName = p.category?.name || "General";
                const categoryIcon = p.category?.icon || "🏷️";
                const primaryImage =
                  p.images?.[0]?.image_url ||
                  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80";

                const isLowStock = p.stock > 0 && p.stock <= 5;
                const isOutOfStock = p.stock === 0 || p.status === "OUT_OF_STOCK";

                return (
                  <tr
                    key={p.id}
                    className="group hover:bg-paper/40 transition-colors"
                  >
                    {/* Product Image + Title */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3.5">
                        <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl border border-line bg-paper-deep shadow-sm">
                          <Image
                            src={primaryImage}
                            alt={p.title}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                        <div className="flex flex-col truncate max-w-xs sm:max-w-sm">
                          <span className="font-display font-bold text-sm text-ink truncate group-hover:text-kita-green transition-colors">
                            {p.title}
                          </span>
                          <div className="flex items-center gap-2 text-xs text-muted">
                            {p.prep_time_minutes > 0 ? (
                              <span className="flex items-center gap-0.5">
                                <Clock className="h-3 w-3" />
                                <span>{p.prep_time_minutes}m lead</span>
                              </span>
                            ) : (
                              <span>Instant pickup</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-4 py-3.5">
                      <span className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-paper px-2.5 py-1 text-xs font-semibold text-ink">
                        <span>{categoryIcon}</span>
                        <span>{categoryName}</span>
                      </span>
                    </td>

                    {/* Price */}
                    <td className="px-4 py-3.5 font-display font-extrabold text-sm text-ink">
                      ₱{Number(p.price).toFixed(2)}
                    </td>

                    {/* Stock Status */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                            isOutOfStock
                              ? "bg-destructive/15 text-destructive"
                              : isLowStock
                              ? "bg-spark-soft text-spark-ink"
                              : "bg-kita-green-soft text-kita-green"
                          }`}
                        >
                          {isOutOfStock ? (
                            "0 in stock"
                          ) : isLowStock ? (
                            <>
                              <AlertTriangle className="h-3 w-3" />
                              {p.stock} left
                            </>
                          ) : (
                            `${p.stock} in stock`
                          )}
                        </span>
                      </div>
                    </td>

                    {/* Visibility / Status */}
                    <td className="px-4 py-3.5">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center gap-1.5 rounded-lg border border-line bg-paper px-2.5 py-1 text-xs font-bold transition-colors hover:bg-paper-deep focus-visible:outline-kita-green">
                          {p.status === "ACTIVE" ? (
                            <span className="flex items-center gap-1 text-kita-green">
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              Active
                            </span>
                          ) : p.status === "DRAFT" ? (
                            <span className="flex items-center gap-1 text-muted">
                              <EyeOff className="h-3.5 w-3.5" />
                              Draft
                            </span>
                          ) : p.status === "OUT_OF_STOCK" ? (
                            <span className="flex items-center gap-1 text-destructive">
                              <AlertTriangle className="h-3.5 w-3.5" />
                              Out of Stock
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-muted">
                              <Archive className="h-3.5 w-3.5" />
                              Archived
                            </span>
                          )}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-40 rounded-xl p-1.5 shadow-flyer">
                          <DropdownMenuItem
                            onClick={() => handleStatusToggle(p.id, "ACTIVE")}
                            className="cursor-pointer gap-2 rounded-lg text-xs font-semibold text-kita-green"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            <span>Active (Live)</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleStatusToggle(p.id, "DRAFT")}
                            className="cursor-pointer gap-2 rounded-lg text-xs font-semibold text-muted"
                          >
                            <EyeOff className="h-3.5 w-3.5" />
                            <span>Draft (Hidden)</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleStatusToggle(p.id, "OUT_OF_STOCK")}
                            className="cursor-pointer gap-2 rounded-lg text-xs font-semibold text-destructive"
                          >
                            <AlertTriangle className="h-3.5 w-3.5" />
                            <span>Out of Stock</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleStatusToggle(p.id, "ARCHIVED")}
                            className="cursor-pointer gap-2 rounded-lg text-xs font-semibold text-muted"
                          >
                            <Archive className="h-3.5 w-3.5" />
                            <span>Archive</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() =>
                            onEditProduct({
                              id: p.id,
                              title: p.title,
                              category_id: p.category_id,
                              price: p.price,
                              stock: p.stock,
                              prep_time_minutes: p.prep_time_minutes,
                              status: p.status,
                              description: p.description,
                              image_url: p.images?.[0]?.image_url,
                            })
                          }
                          title="Edit product"
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-paper hover:text-ink transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </button>

                        <Link
                          href={`/protected/marketplace/product/${p.slug}`}
                          target="_blank"
                          title="View on marketplace"
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-paper hover:text-kita-green transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Link>

                        <button
                          type="button"
                          onClick={() =>
                            onDeleteProduct({
                              id: p.id,
                              title: p.title,
                            })
                          }
                          title="Delete product"
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-destructive/10 hover:text-destructive transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
