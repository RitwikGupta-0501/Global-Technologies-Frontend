"use client";

import React from "react";
import ProductCard from "../ProductCard";
import { ProductSchema } from "@/api/models/ProductSchema";

interface BestSellingSoftwareProps {
  products: ProductSchema[];
}

export default function BestSellingSoftware({ products }: BestSellingSoftwareProps) {
  if (!products || products.length === 0) return null;

  return (
    <section className="w-full">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
            Best-Selling Software
          </h2>
          <p className="text-sm text-on-surface-variant mt-1">
            Top choices for modern enterprises and professionals.
          </p>
        </div>
        <a
          href="#all-software"
          className="text-sm font-bold text-primary flex items-center gap-1 hover:text-primary-container transition-colors"
        >
          View all Software
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
