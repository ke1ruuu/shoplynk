"use client";

import React from "react";
import { StatRow } from "@/components/dashboard/stat-row";
import { peso } from "@/lib/format";

export interface ProductStatItem {
  id: string;
  price: number;
  stock: number;
  status: "ACTIVE" | "DRAFT" | "OUT_OF_STOCK" | "ARCHIVED";
}

interface SellerStatsProps {
  products: ProductStatItem[];
}

export function SellerStats({ products }: SellerStatsProps) {
  const total = products.length;
  const active = products.filter((p) => p.status === "ACTIVE").length;
  const needsRestock = products.filter(
    (p) => p.stock <= 5 || p.status === "OUT_OF_STOCK"
  ).length;
  const inventoryValue = products.reduce(
    (sum, p) => sum + Number(p.price || 0) * Number(p.stock || 0),
    0
  );

  return (
    <StatRow
      stats={[
        { label: "Products", value: String(total), note: "In your catalog" },
        {
          label: "Live",
          value: String(active),
          note: active === total ? "Whole catalog visible" : `of ${total} visible to buyers`,
          tone: active > 0 ? "accent" : "default",
        },
        {
          label: "Needs restock",
          value: String(needsRestock),
          note: needsRestock > 0 ? "5 or fewer left" : "Stock levels healthy",
          tone: needsRestock > 0 ? "warn" : "default",
        },
        {
          label: "Inventory value",
          value: peso(inventoryValue),
          note: "Price × stock on hand",
        },
      ]}
    />
  );
}
