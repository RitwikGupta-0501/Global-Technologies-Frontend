"use client";

import { useState, useEffect } from "react";

interface ProductProps {
  product: {
    id: number;
    name: string;
    desc: string;
    price: string;
    type: string;
    color: string;
    priceLabel: string;
    images: string[];
  };
}

export default function ProductCard({ product }: ProductProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Handle Image Cycling
  useEffect(() => {
    let interval: NodeJS.Timeout;

    // Only cycle if hovered and there are multiple images
    if (isHovered && product.images.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
      }, 1500); // Cycle every 1.5 seconds
    } else {
      // Reset to first image when not hovering (optional, but cleaner)
      setCurrentImageIndex(0);
    }

    return () => clearInterval(interval);
  }, [isHovered, product.images.length]);

  return (
    <div
      className="group bg-white rounded-3xl p-6 shadow-soft border border-slate-100 flex flex-col h-full hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header: Badge & Favorite */}
      <div className="flex justify-between items-start mb-6">
        <span
          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
            product.color === "blue"
              ? "bg-blue-50 text-brand-blue"
              : "bg-green-50 text-brand-green"
          }`}
        >
          {product.type}
        </span>
        <button className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors z-10 relative">
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

      {/* Image Area with Cycling */}
      <div className="mb-6 relative w-full h-48 bg-slate-50 rounded-2xl overflow-hidden shadow-inner group-hover:shadow-md transition-all">
        {/* Stack images on top of each other using absolute positioning.
           Control visibility with opacity to create a smooth cross-fade.
        */}
        {product.images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`${product.name} View ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
              idx === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Cycling Indicators (Dots) */}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            {product.images.map((_, idx) => (
              <div
                key={idx}
                className={`h-1 rounded-full transition-all duration-300 ${
                  idx === currentImageIndex
                    ? product.color === "blue"
                      ? "w-4 bg-brand-blue"
                      : "w-4 bg-brand-green"
                    : "w-1 bg-slate-300"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Details */}
      <h3 className="font-heading font-bold text-lg text-slate-900 mb-1">
        {product.name}
      </h3>
      <p className="text-sm text-slate-500 mb-4 line-clamp-2">{product.desc}</p>

      {/* Footer: Price & Action */}
      <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-400 font-medium">
            {product.priceLabel}
          </p>
          <p className="font-heading font-bold text-xl text-slate-900">
            {product.price}
          </p>
        </div>
        <button
          className={`w-10 h-10 rounded-full text-white flex items-center justify-center transition-all shadow-lg hover:scale-105 ${
            product.color === "blue"
              ? "bg-slate-900 hover:bg-brand-blue"
              : "bg-slate-900 hover:bg-brand-green"
          }`}
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
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
