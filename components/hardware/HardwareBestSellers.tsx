"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "~/context/CartContext";
import { useRequestQuote } from "~/context/RequestQuoteContext";
import { toast } from "sonner";
import { ProductSchema } from "@/api/models/ProductSchema";
import { getImageUrl } from "@/lib/utils";

interface HardwareBestSellersProps {
  products?: ProductSchema[];
}

export default function HardwareBestSellers({ products = [] }: HardwareBestSellersProps) {
  const { addToCart, setIsCartOpen } = useCart();
  const { openQuoteModal } = useRequestQuote();

  // Pick top 3-4 hardware items based on reviews/rating or just slice the first 3
  const topProducts = products.slice(0, 3).map((p) => {
    return {
      id: p.id.toString(),
      name: p.name,
      categoryBadge: "HARDWARE",
      badgeClass: "bg-tertiary-fixed text-on-tertiary-fixed",
      statusBadge: p.price_type === "quote" ? "Request Quote" : "In Stock",
      statusIcon: p.price_type === "quote" ? "support_agent" : "local_shipping",
      statusClass: "text-tertiary bg-tertiary-fixed/40",
      subtitle: p.type || "Automotive Hardware",
      description: p.description,
      priceFormatted: p.price_type === "quote" ? "Enterprise" : `₹${Number(p.price || 0).toLocaleString("en-IN")}`,
      priceUnit: p.price_type === "quote" ? "" : "incl. GST",
      gstNote: p.price_type === "quote" ? "Contact Sales for Volume" : "Free Express Air Courier Pan-India",
      gstNoteClass: "text-secondary",
      imageUrl: p.images?.[0] || "",
      imageAlt: p.name,
      secondaryCtaText: p.price_type === "quote" ? "Request Quote" : "Details",
      secondaryCtaAction: p.price_type === "quote" ? "rfq" : "details",
      schema: p,
    };
  });

  if (topProducts.length === 0) return null;

  const handleAddToCart = (item: any) => {
    addToCart(item.schema);
    toast.success(`${item.name} added to cart!`, {
      description: `Price: ${item.priceFormatted}`,
    });
  };

  const handleSecondaryAction = (item: any) => {
    if (item.secondaryCtaAction === "rfq") {
      openQuoteModal(item.schema);
    } else {
      window.location.href = `/product/${item.id}`;
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <div className="border-b border-outline-variant/30 pb-6 mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
            Best-Selling Hardware
          </h2>
          <p className="text-sm text-on-surface-variant mt-1">
            Top-rated vehicle cameras and tracking units by our customers.
          </p>
        </div>
        <Link
          href="#product-grid"
          className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-surface-container-high text-on-surface text-xs font-bold hover:bg-surface-container-highest transition-colors"
        >
          View All <span className="material-symbols-outlined text-[16px]" aria-hidden="true">arrow_downward</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {topProducts.map((p) => (
          <div
            key={p.id}
            className="product-card flex flex-col justify-between rounded-2xl bg-surface-container-lowest border border-outline-variant/30 p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${p.badgeClass}`}>
                  {p.categoryBadge}
                </span>
                <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-md ${p.statusClass}`}>
                  <span className="material-symbols-outlined text-[13px]" aria-hidden="true">{p.statusIcon}</span>
                  {p.statusBadge}
                </span>
              </div>

              <div className="relative w-full h-44 rounded-xl bg-surface-container-low overflow-hidden mb-4 flex items-center justify-center p-3">
                <img
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                  alt={p.imageAlt}
                  src={getImageUrl(p.imageUrl)}
                />
              </div>

              <p className="text-xs text-on-surface-variant mb-1 font-medium">{p.subtitle}</p>
              <h3 className="text-base font-bold text-on-surface leading-snug mb-2">{p.name}</h3>
              <p className="text-xs text-on-surface-variant line-clamp-2 mb-4">
                {p.description}
              </p>
            </div>

            <div className="pt-4 border-t border-outline-variant/30">
              <div className="mb-3">
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-extrabold text-on-surface">
                    {p.priceFormatted}
                  </span>
                  <span className="text-xs text-on-surface-variant font-medium">
                    {p.priceUnit}
                  </span>
                </div>
                <p className={`text-xs font-semibold ${p.gstNoteClass}`}>{p.gstNote}</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {p.priceFormatted !== "Enterprise" && (
                  <button
                    onClick={() => handleAddToCart(p)}
                    type="button"
                    className="w-full flex items-center justify-center gap-1 py-2.5 rounded-xl bg-surface-container-high text-on-surface text-xs font-bold hover:bg-surface-container-highest active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]" aria-hidden="true">add_shopping_cart</span>
                    <span>Cart</span>
                  </button>
                )}
                
                <button
                  onClick={() => handleSecondaryAction(p)}
                  type="button"
                  className={`${p.priceFormatted === "Enterprise" ? "col-span-2" : "w-full"} flex items-center justify-center py-2.5 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary-container active:scale-[0.98] transition-all text-center cursor-pointer`}
                >
                  {p.secondaryCtaText}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
