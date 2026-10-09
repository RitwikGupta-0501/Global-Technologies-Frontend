"use client";

import React from "react";
import Link from "next/link";
import { toast } from "sonner";
import { ProductSchema } from "@/api/models/ProductSchema";
import { getImageUrl } from "@/lib/utils";
import { useCart } from "~/context/CartContext";
import { useRequestQuote } from "~/context/RequestQuoteContext";

interface ProductCardProps {
  product: ProductSchema;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { openQuoteModal } = useRequestQuote();

  const isHardware = product.category?.toLowerCase() === "hardware";
  const isQuote = product.price_type === "quote";

  const categoryBadge = (product.category || "Software").toUpperCase();
  const badgeClass = isHardware
    ? "bg-tertiary-fixed text-on-tertiary-fixed"
    : "bg-secondary-container text-on-secondary-container";
    
  const statusBadge = isQuote ? "Request Quote" : isHardware ? "In Stock" : "Instant Key";
  const statusIcon = isQuote ? "support_agent" : isHardware ? "local_shipping" : "bolt";
  const statusClass = isHardware
    ? "text-tertiary bg-tertiary-fixed/40"
    : "text-primary bg-surface-container";

  const subtitle = product.type || "Commercial License";
  const priceFormatted = isQuote ? "Enterprise" : `₹${Number(product.price || 0).toLocaleString("en-IN")}`;
  const priceUnit = isQuote ? "" : isHardware ? "incl. GST" : "/ year";
  const gstNote = isQuote
    ? "Contact Sales for Volume Pricing"
    : isHardware
    ? "Free Express Air Courier Pan-India"
    : "+18% GST Claimable";
  const gstNoteClass = isHardware ? "text-secondary" : "text-tertiary";

  const imageUrl = product.images?.[0] ? getImageUrl(product.images[0]) : "";
  const secondaryCtaText = isQuote ? "Request Quote" : isHardware ? "Details" : "Buy Now";

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleSecondaryAction = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isQuote) {
      openQuoteModal(product);
    } else {
      window.location.href = `/product/${product.id}-${product.slug}`;
    }
  };

  return (
    <Link
      href={`/product/${product.id}-${product.slug}`}
      className="group flex flex-col justify-between rounded-2xl bg-surface-container-lowest border border-outline-variant/30 p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all focus-visible:outline-2 focus-visible:outline-primary h-full"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <span
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${badgeClass}`}
          >
            {categoryBadge}
          </span>
          <span
            className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-md ${statusClass}`}
          >
            <span className="material-symbols-outlined text-[13px]">{statusIcon}</span>
            {statusBadge}
          </span>
        </div>

        <div className="relative w-full h-44 rounded-xl bg-surface-container-low overflow-hidden mb-4 flex items-center justify-center p-3">
          {imageUrl && (
            <img
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
              alt={product.name}
              src={imageUrl}
            />
          )}
        </div>

        <p className="text-xs text-on-surface-variant mb-1 font-medium">{subtitle}</p>
        <h3 className="text-base font-bold text-on-surface leading-snug mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
        <p className="text-xs text-on-surface-variant line-clamp-2 mb-4">
          {product.description}
        </p>
      </div>

      <div className="pt-4 border-t border-outline-variant/30 mt-auto">
        <div className="mb-3">
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-extrabold text-on-surface">
              {priceFormatted}
            </span>
            <span className="text-xs text-on-surface-variant font-medium">
              {priceUnit}
            </span>
          </div>
          <p className={`text-xs font-semibold ${gstNoteClass}`}>{gstNote}</p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {!isQuote && (
            <button
              onClick={handleAddToCart}
              type="button"
              className="w-full flex items-center justify-center gap-1 py-2.5 rounded-xl bg-surface-container-high text-on-surface text-xs font-bold hover:bg-surface-container-highest active:scale-[0.98] transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
              <span>Cart</span>
            </button>
          )}

          <button
            onClick={handleSecondaryAction}
            type="button"
            className={`${isQuote ? 'col-span-2' : 'w-full'} flex items-center justify-center py-2.5 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary-container active:scale-[0.98] transition-all text-center cursor-pointer`}
          >
            {secondaryCtaText}
          </button>
        </div>
      </div>
    </Link>
  );
}
