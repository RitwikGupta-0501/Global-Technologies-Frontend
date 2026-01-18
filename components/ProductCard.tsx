"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { Plus, Phone } from "lucide-react";
import { ProductSchema } from "@/api/models/ProductSchema";
import { getImageUrl } from "@/lib/utils";
import { useCart } from "~/context/CartContext";
import { useRequestQuote } from "../context/RequestQuoteContext";

interface ProductProps {
  product: ProductSchema;
}

export default function ProductCard({ product }: ProductProps) {
  const { cart, addToCart, incrementQty, decrementQty, formatPrice } =
    useCart();
  const { openQuoteModal } = useRequestQuote();

  const cartItem = cart.find((item) => item.id === product.id);
  const currentQty = cartItem ? cartItem.qty : 0;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const isQuote = product.price_type === "quote";
  const productColor = product.category === "Software" ? "blue" : "green";

  const handleAddToCart = () => {
    // Call Context Function
    addToCart(product);

    // Show Feedback
    toast.success(`${product.name} added to cart!`, {
      description: `Quantity: 1 • ${formatPrice(product.price)}`,
      duration: 3000,
    });
  };

  // TODO: Add logic for RequestQuote
  const handleRequestQuote = () => {
    openQuoteModal(product);
  };

  // Image cycling (unchanged - perfect)
  const handleMouseEnter = useCallback(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Start new interval only if multiple images
    if (product.images?.length && product.images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
      }, 1500);
    }
  }, [product.images.length]);

  const handleMouseLeave = useCallback(() => {
    // Clear interval and reset index
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCurrentImageIndex(0);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div
      className="group bg-white rounded-3xl p-6 shadow-soft border border-slate-100 flex flex-col h-full hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Header: Badge & Favorite */}
      <div className="flex justify-between items-start mb-6">
        <span
          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
            productColor === "blue"
              ? "bg-blue-50 text-blue-700" // ✅ Use standard Tailwind
              : "bg-emerald-50 text-emerald-700"
          }`}
        >
          {product.category}
        </span>
        <button
          className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors z-10 relative"
          aria-label="Add to favorites"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>
      {/* Image Area */}
      <Link
        href={`/product/${product.id}-${product.slug}`}
        className="block w-full"
      >
        <div className="mb-6 relative w-full h-48 bg-slate-50 rounded-2xl overflow-hidden shadow-inner group-hover:shadow-md transition-all">
          {product.images?.length ? (
            // Your existing carousel (unchanged)
            <>
              {product.images.map((img, idx) => (
                <Image
                  key={idx}
                  src={getImageUrl(img)}
                  alt={`${product.name} View ${idx + 1}`}
                  fill
                  className={`object-cover transition-opacity duration-700 ease-in-out ${
                    idx === currentImageIndex ? "opacity-100" : "opacity-0"
                  }`}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              ))}
              {product.images.length > 1 && (
                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  {product.images.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        idx === currentImageIndex
                          ? productColor === "blue"
                            ? "w-4 bg-blue-600"
                            : "w-4 bg-emerald-600"
                          : "w-1 bg-slate-300"
                      }`}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            // SVG Placeholder - matches your bg-slate-50/rounded-2xl style
            <Image
              src={
                product.images?.length
                  ? getImageUrl(product.images[currentImageIndex])
                  : "/placeholder.svg"
              }
              alt={
                product.images?.length
                  ? `${product.name} View ${currentImageIndex + 1}`
                  : "No image"
              }
              fill
              className="object-cover" // SVG uses object-contain via conditional class
              onError={(e) => {
                // Ultimate fallback: show inline SVG or solid color
                e.currentTarget.src = "/placeholder.svg"; // Retry SVG
              }}
            />
          )}
        </div>
      </Link>

      {/* Product Details */}
      <Link href={`/product/${product.id}-${product.slug}`} className="block">
        <h3 className="font-bold text-lg text-slate-900 mb-1">
          {product.name}
        </h3>
      </Link>
      <p className="text-sm text-slate-500 mb-4 line-clamp-2">
        {product.description}
      </p>

      {/* Footer: Price & Action */}
      <div
        className={`mt-auto pt-4 border-t border-slate-100 flex ${
          isQuote
            ? "flex-row items-center justify-between" // Quote: Label | Button
            : "flex-col items-start" // Standard: Label (top), Price|Button (bottom)
        }`}
      >
        {/* ROW 1: THE LABEL */}
        <div>
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
            {product.type}
          </p>
        </div>

        {/* ROW 2: PRICE & BUTTONS */}
        <div
          className={`flex items-center ${isQuote ? "" : "justify-between w-full"}`}
        >
          <p className="font-bold text-xl text-slate-900">
            {!isQuote ? <span>{formatPrice(product.price)}</span> : <span />}
          </p>

          {/* CTA area */}
          {isQuote ? (
            <button
              className="px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-semibold hover:bg-blue-600 transition-colors flex items-center gap-2"
              aria-label="Request quote"
              onClick={handleRequestQuote}
            >
              <Phone className="w-3 h-3" />
              Request Quote
            </button>
          ) : currentQty === 0 ? (
            <button
              onClick={handleAddToCart}
              className={`w-10 h-10 rounded-full -translate-y-2 flex items-center justify-center shadow-lg hover:scale-105 text-white transition-all ${
                productColor === "blue"
                  ? "bg-slate-900 hover:bg-blue-600"
                  : "bg-slate-900 hover:bg-emerald-600"
              }`}
              aria-label="Add to cart"
            >
              <Plus aria-hidden="true" className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => decrementQty(product.id)}
                className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center hover:bg-slate-100 text-slate-700 font-semibold text-base leading-none transition-colors"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="text-sm font-medium w-6 text-center">
                {currentQty}
              </span>
              <button
                onClick={() => incrementQty(product.id)}
                className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center hover:bg-slate-100 text-slate-700 font-semibold text-base leading-none transition-colors"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
