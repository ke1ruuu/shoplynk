"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Edit,
  Trash2,
  ExternalLink,
  Package,
  ImageOff,
  Clock,
  ChevronDown,
  Check,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NativeSelect } from "@/components/ui/native-select";
import { toggleProductStatusAction } from "@/app/actions/seller";
import { categoryIcon } from "@/lib/category-icons";
import { peso } from "@/lib/format";
import { EmptyState } from "@/components/dashboard/empty-state";
import { Panel } from "@/components/dashboard/panel";
import { StatusPill, productStatus } from "@/components/dashboard/status-pill";
import { IconButton, IconLink } from "@/components/dashboard/icon-button";
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

type ProductStatus = SellerProductItem["status"];

interface ProductTableProps {
  products: SellerProductItem[];
  categories: CategoryOption[];
  onEditProduct?: (product: ProductToEdit) => void;
  onDeleteProduct: (product: { id: string; title: string }) => void;
  onAddNew?: () => void;
}

/** The four states a listing can be put into, in the order a seller reaches for them. */
const STATUS_CHOICES: { value: ProductStatus; label: string; hint: string }[] = [
  { value: "ACTIVE", label: "Live", hint: "Buyers can order it" },
  { value: "DRAFT", label: "Draft", hint: "Hidden from your storefront" },
  { value: "OUT_OF_STOCK", label: "Out of stock", hint: "Shown, but not orderable" },
  { value: "ARCHIVED", label: "Archived", hint: "Kept, off your storefront" },
];

/** Same control styling for the search field and the two filter selects. */
const FIELD =
  "h-9 rounded-md border border-line bg-paper text-sm text-ink transition-colors focus:border-line-strong focus:bg-surface";

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
  const [, startTransition] = useTransition();
  /** Which row is mid-save, so only that row shows the pending treatment. */
  const [savingId, setSavingId] = useState<string | null>(null);

  const filteredProducts = products.filter((p) => {
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      q === "" ||
      p.title.toLowerCase().includes(q) ||
      (p.description ?? "").toLowerCase().includes(q);

    const matchesCategory = selectedCategory === "ALL" || p.category_id === selectedCategory;

    const matchesStatus =
      selectedStatus === "ALL" ||
      (selectedStatus === "OUT_OF_STOCK"
        ? p.status === "OUT_OF_STOCK" || p.stock === 0
        : p.status === selectedStatus);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Distinguishes "you have no products" from "your filters hid them".
  const isFiltered =
    searchQuery.trim() !== "" || selectedCategory !== "ALL" || selectedStatus !== "ALL";

  function clearFilters() {
    setSearchQuery("");
    setSelectedCategory("ALL");
    setSelectedStatus("ALL");
  }

  function handleStatusToggle(productId: string, newStatus: ProductStatus) {
    setSavingId(productId);
    startTransition(async () => {
      await toggleProductStatusAction(productId, newStatus);
      setSavingId(null);
    });
  }

  function editPayload(p: SellerProductItem): ProductToEdit {
    return {
      id: p.id,
      title: p.title,
      category_id: p.category_id,
      price: p.price,
      stock: p.stock,
      prep_time_minutes: p.prep_time_minutes,
      status: p.status,
      description: p.description,
      image_url: p.images?.[0]?.image_url,
    };
  }

  const clearButton = (
    <button
      type="button"
      onClick={clearFilters}
      className="inline-flex h-9 items-center rounded-md border border-line bg-surface px-3 text-sm font-semibold text-ink transition-colors hover:bg-paper-deep"
    >
      Clear filters
    </button>
  );

  const emptyBody = isFiltered ? (
    <EmptyState
      variant="filtered"
      icon={Package}
      title="No listings match those filters"
      body="Nothing in your catalog fits the current search, category, and status together."
      action={clearButton}
    />
  ) : (
    <EmptyState
      icon={Package}
      title="Your catalog is empty"
      body="Products you add here appear on your storefront for LYFJSHS members to browse, order, and pick up. Each one needs a photo, a price, and a stock count."
      action={
        <Link
          href="/seller/products/new"
          className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-kita-green px-3.5 text-sm font-semibold text-white shadow-flyer transition-colors hover:bg-kita-green-deep"
        >
          Add your first product
        </Link>
      }
    />
  );

  return (
    <Panel
      flush
      heading="Products"
      aside={
        products.length > 0 ? (
          <span className="text-xs text-muted">
            <span className="tabular font-semibold text-ink">{filteredProducts.length}</span>
            {filteredProducts.length !== products.length && (
              <> of <span className="tabular">{products.length}</span></>
            )}{" "}
            {products.length === 1 && filteredProducts.length === products.length
              ? "listing"
              : "listings"}
          </span>
        ) : null
      }
    >
      {/* Search and filters. One strip, ruled off from the listings below it. */}
      <div className="flex flex-col gap-2.5 border-b border-line p-4 sm:flex-row sm:items-center">
        <div className="relative sm:max-w-xs sm:flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            strokeWidth={1.75}
            aria-hidden="true"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search your listings"
            aria-label="Search your listings"
            className={`${FIELD} w-full pl-9 pr-3 placeholder:text-muted`}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:ml-auto">
          <NativeSelect
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            aria-label="Filter by category"
            className="[&>select]:h-9 [&>select]:rounded-md [&>select]:border-line [&>select]:bg-paper [&>select]:text-ink"
          >
            <option value="ALL">All categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </NativeSelect>

          <NativeSelect
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            aria-label="Filter by status"
            className="[&>select]:h-9 [&>select]:rounded-md [&>select]:border-line [&>select]:bg-paper [&>select]:text-ink"
          >
            <option value="ALL">All statuses</option>
            {STATUS_CHOICES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </NativeSelect>

          {isFiltered && clearButton}
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        emptyBody
      ) : (
        <>
          {/* Wide viewports: the full table. */}
          <div className="hidden md:block">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-line bg-paper/60 text-[0.6875rem] font-semibold uppercase tracking-[0.07em] text-muted">
                <tr>
                  <th scope="col" className="px-4 py-2.5 font-semibold">
                    Product
                  </th>
                  <th scope="col" className="px-4 py-2.5 font-semibold">
                    Category
                  </th>
                  <th scope="col" className="px-4 py-2.5 text-right font-semibold">
                    Price
                  </th>
                  <th scope="col" className="px-4 py-2.5 font-semibold">
                    Stock
                  </th>
                  <th scope="col" className="px-4 py-2.5 font-semibold">
                    Visibility
                  </th>
                  <th scope="col" className="px-4 py-2.5 text-right font-semibold">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {filteredProducts.map((p) => {
                  const saving = savingId === p.id;

                  return (
                    <tr
                      key={p.id}
                      aria-busy={saving}
                      className={`transition-colors hover:bg-paper/50 ${
                        saving ? "opacity-55" : ""
                      }`}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Thumb product={p} />
                          <div className="flex min-w-0 flex-col">
                            <Link
                              href={`/seller/products/${p.id}/edit`}
                              className="truncate text-left text-sm font-semibold text-ink transition-colors hover:text-kita-green"
                            >
                              {p.title}
                            </Link>
                            <LeadTime minutes={p.prep_time_minutes} />
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <CategoryTag category={p.category} />
                      </td>

                      <td className="px-4 py-3 text-right">
                        <span className="tabular text-sm font-semibold text-ink">
                          {peso(p.price)}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <StockCell stock={p.stock} status={p.status} />
                      </td>

                      <td className="px-4 py-3">
                        <StatusMenu
                          product={p}
                          saving={saving}
                          onSelect={(s) => handleStatusToggle(p.id, s)}
                        />
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-0.5">
                          <IconLink
                            icon={Edit}
                            label={`Edit ${p.title}`}
                            href={`/seller/products/${p.id}/edit`}
                          />
                          <IconLink
                            icon={ExternalLink}
                            label={`View ${p.title} on the marketplace`}
                            href={`/protected/marketplace/product/${p.slug}`}
                            target="_blank"
                          />
                          <IconButton
                            icon={Trash2}
                            tone="destructive"
                            label={`Delete ${p.title}`}
                            disabled={saving}
                            onClick={() => onDeleteProduct({ id: p.id, title: p.title })}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Narrow viewports: the same rows, stacked — never a sideways-scrolling table. */}
          <ul className="divide-y divide-line md:hidden">
            {filteredProducts.map((p) => {
              const saving = savingId === p.id;

              return (
                <li
                  key={p.id}
                  aria-busy={saving}
                  className={`flex flex-col gap-3 p-4 ${saving ? "opacity-55" : ""}`}
                >
                  <div className="flex items-start gap-3">
                    <Thumb product={p} />
                    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <Link
                        href={`/seller/products/${p.id}/edit`}
                        className="text-left text-sm font-semibold leading-snug text-ink hover:text-kita-green transition-colors"
                      >
                        {p.title}
                      </Link>
                      <span className="tabular text-sm font-semibold text-ink">
                        {peso(p.price)}
                      </span>
                      <LeadTime minutes={p.prep_time_minutes} />
                    </div>
                    <div className="flex flex-shrink-0 items-center gap-0.5">
                      <IconLink
                        icon={Edit}
                        label={`Edit ${p.title}`}
                        href={`/seller/products/${p.id}/edit`}
                      />
                      <IconLink
                        icon={ExternalLink}
                        label={`View ${p.title} on the marketplace`}
                        href={`/protected/marketplace/product/${p.slug}`}
                        target="_blank"
                      />
                      <IconButton
                        icon={Trash2}
                        tone="destructive"
                        label={`Delete ${p.title}`}
                        disabled={saving}
                        onClick={() => onDeleteProduct({ id: p.id, title: p.title })}
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <StatusMenu
                      product={p}
                      saving={saving}
                      onSelect={(s) => handleStatusToggle(p.id, s)}
                    />
                    <StockCell stock={p.stock} status={p.status} />
                    <CategoryTag category={p.category} />
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </Panel>
  );
}

/**
 * The listing photo. A product without one gets an explicit "no photo" tile —
 * never a stock image, which would misrepresent what the seller is selling.
 */
function Thumb({ product }: { product: SellerProductItem }) {
  const src = product.images?.[0]?.image_url;

  if (!src) {
    return (
      <span
        className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-md border border-dashed border-line-strong bg-paper text-muted"
        title="No photo yet"
      >
        <ImageOff className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
        <span className="sr-only">No photo yet</span>
      </span>
    );
  }

  return (
    <span className="relative block h-11 w-11 flex-shrink-0 overflow-hidden rounded-md border border-line bg-paper-deep">
      <Image src={src} alt="" fill sizes="44px" className="object-cover" />
    </span>
  );
}

function LeadTime({ minutes }: { minutes: number }) {
  if (minutes <= 0) {
    return <span className="text-xs text-muted">Ready immediately</span>;
  }

  return (
    <span className="flex items-center gap-1 text-xs text-muted">
      <Clock className="h-3 w-3" strokeWidth={1.75} aria-hidden="true" />
      <span className="tabular">{minutes}</span> min to prepare
    </span>
  );
}

function CategoryTag({ category }: { category: SellerProductItem["category"] }) {
  const Icon = categoryIcon(category?.slug);

  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-line bg-paper px-2 py-0.5 text-xs font-medium text-ink">
      <Icon className="h-3.5 w-3.5 text-muted" strokeWidth={1.75} aria-hidden="true" />
      {category?.name || "Uncategorised"}
    </span>
  );
}

/**
 * Stock reads as a plain count until it needs attention. Healthy stock is not
 * tinted — crimson is the primary action colour and would read as an alarm.
 */
function StockCell({ stock, status }: { stock: number; status: ProductStatus }) {
  if (stock === 0 || status === "OUT_OF_STOCK") {
    return <StatusPill intent="stopped">None left</StatusPill>;
  }

  if (stock <= 5) {
    return (
      <StatusPill intent="warn">
        <span className="tabular">{stock}</span> left
      </StatusPill>
    );
  }

  return (
    <span className="text-sm text-muted">
      <span className="tabular font-semibold text-ink">{stock}</span> in stock
    </span>
  );
}

/** The visibility control: shows the current state, and changes it in place. */
function StatusMenu({
  product,
  saving,
  onSelect,
}: {
  product: SellerProductItem;
  saving: boolean;
  onSelect: (status: ProductStatus) => void;
}) {
  const current = productStatus(product.status, product.stock);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        disabled={saving}
        aria-label={`Visibility: ${current.label}. Change it`}
        className="inline-flex items-center gap-1 rounded-md border border-line bg-surface pl-1 pr-1.5 py-0.5 transition-colors hover:bg-paper-deep disabled:pointer-events-none disabled:opacity-40"
      >
        <StatusPill intent={current.intent} bare>
          {saving ? "Saving…" : current.label}
        </StatusPill>
        <ChevronDown className="h-3.5 w-3.5 text-muted" strokeWidth={1.75} aria-hidden="true" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-60 rounded-md p-1">
        {STATUS_CHOICES.map((choice) => {
          const active = product.status === choice.value;

          return (
            <DropdownMenuItem
              key={choice.value}
              onClick={() => !active && onSelect(choice.value)}
              className="cursor-pointer gap-2.5 rounded-sm px-2 py-1.5"
            >
              <Check
                className={`mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-kita-green ${
                  active ? "" : "invisible"
                }`}
                strokeWidth={2.25}
                aria-hidden="true"
              />
              <span className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold text-ink">{choice.label}</span>
                <span className="text-xs text-muted">{choice.hint}</span>
              </span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
