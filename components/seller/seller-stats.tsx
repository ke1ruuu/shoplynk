"use client";

import React from "react";
import { Package, CheckCircle2, AlertTriangle, PhilippinePeso } from "lucide-react";

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
  const totalProducts = products.length;
  const activeProducts = products.filter((p) => p.status === "ACTIVE").length;
  const lowStockProducts = products.filter(
    (p) => p.stock <= 5 || p.status === "OUT_OF_STOCK"
  ).length;

  const totalInventoryValue = products.reduce(
    (acc, p) => acc + Number(p.price || 0) * Number(p.stock || 0),
    0
  );

  const stats = [
    {
      label: "Total Products",
      value: totalProducts.toString(),
      subtext: "Items in catalog",
      icon: Package,
      color: "text-ink",
      bgColor: "bg-paper-deep",
    },
    {
      label: "Active Listings",
      value: activeProducts.toString(),
      subtext: "Live on marketplace",
      icon: CheckCircle2,
      color: "text-kita-green",
      bgColor: "bg-kita-green-soft",
    },
    {
      label: "Low or Out of Stock",
      value: lowStockProducts.toString(),
      subtext: lowStockProducts > 0 ? "Needs restock attention" : "Inventory healthy",
      icon: AlertTriangle,
      color: lowStockProducts > 0 ? "text-spark-ink" : "text-muted",
      bgColor: lowStockProducts > 0 ? "bg-spark-soft" : "bg-paper-deep",
    },
    {
      label: "Total Inventory Value",
      value: `₱${totalInventoryValue.toLocaleString("en-PH", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      subtext: "Retail catalog worth",
      icon: PhilippinePeso,
      color: "text-kita-green",
      bgColor: "bg-kita-green-soft",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="flex flex-col justify-between gap-3 rounded-2xl border border-line bg-surface p-5 shadow-flyer"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted">{stat.label}</span>
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-xl ${stat.bgColor} ${stat.color}`}
              >
                <Icon className="h-4 w-4" />
              </span>
            </div>

            <div className="flex flex-col gap-0.5">
              <span className={`font-display text-2xl font-extrabold ${stat.color}`}>
                {stat.value}
              </span>
              <span className="text-[11px] text-muted">{stat.subtext}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
