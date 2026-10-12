"use client";

import React, { useState } from "react";
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
  const { cart, addToCart, updateQty, removeFromCart } = useCart();
  const { openQuoteModal, quotedProductIds } = useRequestQuote();

  const isHardware = product.category?.toLowerCase() === "hardware";
  const isQuote = product.price_type === "quote";

  const cartItem = cart.find((item) => item.id === product.id);
  const isInCart = Boolean(cartItem);
  const qty = cartItem?.qty ?? 0;
  const isQuoted = quotedProductIds.includes(Number(product.id));

  // Track brief "just added" tick state
  const [showTick, setShowTick] = useState(false);

  const categoryBadge = (product.category || "Software").toUpperCase();
  const badgeClass = isHardware
    ? "bg-tertiary-fixed text-on-tertiary-fixed"
    : "bg-secondary-container text-on-secondary-container";

  const subtitle = product.type || "Commercial License";
  const priceFormatted = isQuote ? "Custom Quote" : `₹${Number(product.price || 0).toLocaleString("en-IN")}`;
  const priceUnit = isQuote ? "" : isHardware ? "incl. GST" : "/ year";
  const gstNote = isQuote
    ? "Contact Enterprise Sales for Volume Pricing"
    : isHardware
    ? "Free Express Air Courier Pan-India"
    : "+18% GST Claimable";
  const gstNoteClass = isHardware ? "text-secondary" : "text-tertiary";

  const imageUrl = product.images?.[0] ? getImageUrl(product.images[0]) : "";
  const productHref = `/product/${product.id}-${product.slug}`;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart(product);
    setShowTick(true);
    toast.success(`${product.name} added to cart!`);

    // Display checkmark briefly for 600ms, then reveal quantity selector
    setTimeout(() => {
      setShowTick(false);
    }, 600);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateQty(Number(product.id), 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (qty <= 1) {
      removeFromCart(Number(product.id));
      toast.info(`${product.name} removed from cart`);
    } else {
      updateQty(Number(product.id), -1);
    }
  };

  const handleQuoteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuoteModal(product);
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl bg-surface-container-lowest border border-outline-variant/30 p-4.5 shadow-sm hover:shadow-md hover:border-primary/40 transition-all h-full">
      {/* Accessible card link overlay */}
      <Link
        href={productHref}
        className="absolute inset-0 z-0 rounded-2xl focus-visible:outline-2 focus-visible:outline-primary"
        aria-label={`View details for ${product.name}`}
      />

      <div className="relative z-1 pointer-events-none">
        {/* Top bar: Category badge only */}
        <div className="flex items-center justify-between mb-3">
          <span
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${badgeClass}`}
          >
            {categoryBadge}
          </span>
        </div>

        {/* Product Image */}
        <div className="relative w-full h-44 rounded-xl bg-surface-container-low overflow-hidden mb-3.5 flex items-center justify-center p-3">
          {imageUrl && (
            <img
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
              alt={product.name}
              src={imageUrl}
            />
          )}
        </div>

        {/* Product Info: Clean, uncluttered title & subtitle */}
        <p className="text-[11px] text-on-surface-variant/80 font-medium mb-1 tracking-wide uppercase">
          {subtitle}
        </p>
        <h3 className="text-[15px] font-bold text-on-surface leading-snug group-hover:text-primary transition-colors line-clamp-2">
          {product.name}
        </h3>
      </div>

      {/* Footer: Streamlined Price & Balanced CTAs */}
      <div className="relative z-1 pt-3.5 border-t border-outline-variant/25 mt-4">
        <div className="flex items-baseline justify-between mb-3 pointer-events-none">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-extrabold text-on-surface tracking-tight">
                {priceFormatted}
              </span>
              {priceUnit && (
                <span className="text-xs text-on-surface-variant font-medium">
                  {priceUnit}
                </span>
              )}
            </div>
            <p className={`text-[11px] font-medium mt-0.5 ${gstNoteClass}`}>
              {gstNote}
            </p>
          </div>
        </div>

        {/* Action Button Row */}
        <div className="h-11 w-full flex items-center overflow-hidden">
          {isQuote ? (
            /* Quote Product CTA */
            isQuoted ? (
              <div className="w-full h-11 px-4 rounded-xl bg-emerald-600/15 border border-emerald-600/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs select-none animate-in fade-in zoom-in-95 duration-200">
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                <span>Quote Requested</span>
              </div>
            ) : (
              <button
                onClick={handleQuoteClick}
                type="button"
                className="w-full h-11 px-4 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary/90 active:scale-[0.98] transition-all text-center cursor-pointer shadow-xs flex items-center justify-center gap-1.5 group/btn"
              >
                <span className="material-symbols-outlined text-[17px] transition-transform duration-200 group-hover/btn:scale-110">
                  support_agent
                </span>
                <span>Request Quote</span>
              </button>
            )
          ) : (
            /* Option 1: Standard Product Full-Width Add to Cart */
            !isInCart ? (
              <button
                onClick={handleAddToCart}
                type="button"
                title={`Add ${product.name} to Cart`}
                aria-label={`Add ${product.name} to Cart`}
                className="w-full h-11 px-4 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary/90 active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-xs group/btn"
              >
                <span
                  className="material-symbols-outlined text-[17px] select-none transition-transform duration-200 group-hover/btn:scale-110"
                  aria-hidden="true"
                >
                  add_shopping_cart
                </span>
                <span>Add to Cart</span>
              </button>
            ) : showTick ? (
              /* Morphing Tick Confirmation */
              <div className="w-full h-11 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm animate-in zoom-in-95 fade-in duration-200 select-none">
                <span className="material-symbols-outlined text-[18px] animate-in zoom-in-50 duration-200">
                  check_circle
                </span>
                <span className="tracking-wide">Added to Cart</span>
              </div>
            ) : (
              /* Full-width Quantity Selector (+ qty -) */
              <div className="w-full h-11 px-2 rounded-xl bg-surface-container-high border border-outline-variant/30 flex items-center justify-between transition-all duration-300 animate-in fade-in zoom-in-95">
                <button
                  onClick={handleDecrement}
                  type="button"
                  title={qty === 1 ? "Remove from cart" : "Decrease quantity"}
                  aria-label={`Decrease quantity of ${product.name}`}
                  className="w-8 h-8 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-error-container hover:text-on-error-container active:scale-90 transition-all flex items-center justify-center cursor-pointer shadow-2xs"
                >
                  <span className="material-symbols-outlined text-[15px]">
                    {qty === 1 ? "delete" : "remove"}
                  </span>
                </button>

                <div className="flex items-center gap-1.5 select-none px-2">
                  <span className="text-xs font-extrabold text-on-surface">
                    {qty}
                  </span>
                  <span className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider">
                    in cart
                  </span>
                </div>

                <button
                  onClick={handleIncrement}
                  type="button"
                  title="Increase quantity"
                  aria-label={`Increase quantity of ${product.name}`}
                  className="w-8 h-8 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-primary hover:text-white active:scale-90 transition-all flex items-center justify-center cursor-pointer shadow-2xs"
                >
                  <span className="material-symbols-outlined text-[15px]">add</span>
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
