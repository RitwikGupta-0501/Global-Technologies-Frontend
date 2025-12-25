"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";

export interface Product {
  id: number;
  name: string;
  desc: string;
  price: number | null;
  type: string;
  color: "blue" | "green";
  priceLabel: string;
  priceType: "fixed" | "quote";
  images: string[];
}

interface ProductProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const isQuote = product.priceType === "quote";
  const priceNumber = product.price != null ? Number(product.price) : null;

  // Safe price formatting
  const formatPrice = useCallback(() => {
    return priceNumber && Number.isFinite(priceNumber)
      ? `$${priceNumber.toFixed(2)}`
      : "Price unavailable";
  }, [priceNumber]);

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
            product.color === "blue"
              ? "bg-blue-50 text-blue-700" // ✅ Use standard Tailwind
              : "bg-emerald-50 text-emerald-700"
          }`}
        >
          {product.type}
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
      {/* Image Area - Perfect as-is */}
      <div className="mb-6 relative w-full h-48 bg-slate-50 rounded-2xl overflow-hidden shadow-inner group-hover:shadow-md transition-all">
        {product.images.map((img, idx) => (
          <Image
            key={idx}
            src={img}
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
                    ? product.color === "blue"
                      ? "w-4 bg-blue-600"
                      : "w-4 bg-emerald-600"
                    : "w-1 bg-slate-300"
                }`}
              />
            ))}
          </div>
        )}
      </div>
      {/* Product Details */}
      <h3 className="font-bold text-lg text-slate-900 mb-1">
        {product.name}
      </h3>{" "}
      {/* ✅ Removed undefined font-heading */}
      <p className="text-sm text-slate-500 mb-4 line-clamp-2">{product.desc}</p>
      {/* Footer: Price & Action */}
      <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-400 font-medium">
            {product.priceLabel}
          </p>
          <p className="font-bold text-xl text-slate-900">
            {isQuote ? (
              <span>Price on Request</span>
            ) : (
              <span>{formatPrice()}</span>
            )}
          </p>
        </div>
        <button
          onClick={() => onAddToCart(product)}
          className={`w-10 h-10 rounded-full text-white flex items-center justify-center transition-all shadow-lg hover:scale-105 ${
            product.color === "blue"
              ? "bg-slate-900 hover:bg-blue-600"
              : "bg-slate-900 hover:bg-emerald-600"
          }`}
          aria-label="Add to Cart"
        >
          <Plus aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
