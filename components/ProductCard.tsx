"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { Plus, Phone, Heart } from "lucide-react";
import { ProductSchema } from "@/api/models/ProductSchema";
import { getImageUrl } from "@/lib/utils";
import { useCart } from "~/context/CartContext";
import { useRequestQuote } from "~/context/RequestQuoteContext";

interface ProductCardProps {
  product: ProductSchema;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Cart Context Hooks
  const { cart, addToCart, incrementQty, decrementQty, formatPrice } =
    useCart();
  const { openQuoteModal } = useRequestQuote();

  const isQuote = product.price_type === "quote";
  const cartItem = cart.find((item) => item.id === product.id);
  const currentQty = cartItem ? cartItem.qty : 0;
  const productColor = product.category === "Software" ? "blue" : "amber";

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleRequestQuote = () => {
    openQuoteModal(product);
  };

  const handleMouseEnter = () => {
    if (product.images && product.images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
      }, 2000);
    }
  };

  const handleMouseLeave = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCurrentImageIndex(0);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div
      className="group bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Header: Badge & Favorite */}
      <div className="flex justify-between items-start mb-4">
        <span
          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
            productColor === "blue"
              ? "bg-blue-50 text-blue-700 border border-blue-100"
              : "bg-amber-50 text-amber-800 border border-amber-200/60"
          }`}
        >
          {product.category === "Hardware" ? "Korean Dashcam" : product.category}
        </span>
        <button
          className="min-w-[44px] min-h-[44px] -mr-2 -mt-2 rounded-full flex items-center justify-center text-slate-400 hover:text-rose-500 transition-colors z-10 relative cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-600"
          aria-label={`Save ${product.name} to favorites`}
        >
          <Heart className="h-4 w-4" />
        </button>
      </div>

      {/* Image Area */}
      <Link
        href={`/product/${product.id}-${product.slug}`}
        className="block w-full focus-visible:outline-2 focus-visible:outline-blue-600 rounded-xl"
      >
        <div className="mb-4 relative w-full h-48 bg-slate-50 rounded-xl overflow-hidden border border-slate-100 group-hover:border-slate-200 transition-all">
          {product.images?.length ? (
            <>
              {product.images.map((img, idx) => (
                <Image
                  key={idx}
                  src={getImageUrl(img)}
                  alt={`${product.name} View ${idx + 1}`}
                  fill
                  aria-hidden={idx !== currentImageIndex}
                  className={`object-contain p-4 transition-opacity duration-500 motion-reduce:transition-none ease-in-out ${
                    idx === currentImageIndex ? "opacity-100" : "opacity-0"
                  }`}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              ))}
              {product.images.length > 1 && (
                <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  {product.images.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        idx === currentImageIndex
                          ? "w-4 bg-slate-800"
                          : "w-1 bg-slate-300"
                      }`}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <Image
              src="/placeholder.svg"
              alt={product.name}
              fill
              className="object-contain p-4"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          )}
        </div>
      </Link>

      {/* Product Details */}
      <Link 
        href={`/product/${product.id}-${product.slug}`} 
        className="block focus-visible:outline-2 focus-visible:outline-blue-600 rounded"
      >
        <h3 className="font-bold text-base text-slate-900 mb-1 hover:text-blue-600 transition-colors line-clamp-1">
          {product.name}
        </h3>
      </Link>
      <p className="text-xs text-slate-500 mb-4 line-clamp-2 leading-relaxed">
        {product.description}
      </p>

      {/* Footer: Price & Action with Standardized Alignment */}
      <div className="mt-auto pt-4 border-t border-slate-100 flex flex-col gap-2">
        {/* ROW 1: THE LABEL */}
        <div className="flex items-center justify-between">
          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
            {product.type || "Commercial License"}
          </p>
          {isQuote && (
            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
              Volume Sourcing
            </span>
          )}
        </div>

        {/* ROW 2: PRICE & BUTTONS */}
        <div className="flex items-center justify-between min-h-[44px]">
          <div>
            {!isQuote ? (
              <p className="font-extrabold text-lg text-slate-900 tabular-nums tracking-tight">
                {formatPrice(product.price)}
              </p>
            ) : (
              <p className="text-xs font-bold text-slate-600">
                Custom Volume RFQ
              </p>
            )}
          </div>

          {/* CTA area with 44px min touch targets */}
          {isQuote ? (
            <button
              className="min-h-[44px] px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-blue-600 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-blue-600"
              aria-label={`Request volume quote for ${product.name}`}
              onClick={handleRequestQuote}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Request RFQ</span>
            </button>
          ) : currentQty === 0 ? (
            <button
              onClick={handleAddToCart}
              className="min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center bg-slate-900 text-white hover:bg-blue-600 transition-all cursor-pointer shadow-xs active:scale-95 focus-visible:outline-2 focus-visible:outline-blue-600"
              aria-label={`Add ${product.name} to cart`}
            >
              <Plus aria-hidden="true" className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-full p-1">
              <button
                onClick={() => decrementQty(product.id)}
                className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center hover:bg-white text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                aria-label={`Decrease quantity for ${product.name}`}
              >
                −
              </button>
              <span className="text-xs font-bold text-slate-800 w-6 text-center tabular-nums">
                {currentQty}
              </span>
              <button
                onClick={() => incrementQty(product.id)}
                className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center hover:bg-white text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                aria-label={`Increase quantity for ${product.name}`}
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
