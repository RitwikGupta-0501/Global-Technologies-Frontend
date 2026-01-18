"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useRequestQuote } from "../context/RequestQuoteContext";
import { ProductSchema } from "@/api/models/ProductSchema";
import { getImageUrl } from "@/lib/utils";
import {
  Star,
  Check,
  ChevronRight,
  Minus,
  Plus,
  Phone,
  ArrowLeft,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

interface ProductDetailsViewProps {
  product: ProductSchema;
}

export default function ProductDetailsView({
  product,
}: ProductDetailsViewProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState<"features" | "specs">("features");

  // Zoom state
  const [showZoom, setShowZoom] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Cart Context
  const { cart, addToCart, removeFromCart, formatPrice } = useCart();
  const { openQuoteModal } = useRequestQuote();

  // Ref for the interval
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Global Cart Sync
  const cartItem = cart.find((item) => item.id === product.id);
  const isInCart = !!cartItem;

  // If in cart, use cart qty. If not, use local qty (default 1)
  const [localQuantity, setLocalQuantity] = useState(1);
  const syncedQuantity = cartItem ? cartItem.qty : localQuantity;

  // --- DATA MAPPING (Bridge API -> UI) ---
  const isQuote = product.price_type === "quote";
  const priceLabel = isQuote ? "Custom Configuration" : "Per License";
  const stockCount = 10;

  // --- LOGIC ---

  // Auto-cycle images every 5 seconds
  const startImageCycle = React.useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (product.images.length > 1) {
      intervalRef.current = setInterval(() => {
        setSelectedImage((prev) => (prev + 1) % product.images.length);
      }, 5000);
    }
  }, [product.images.length]);

  useEffect(() => {
    startImageCycle();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startImageCycle]);

  const handleManualImageSelect = (idx: number) => {
    setSelectedImage(idx);
    startImageCycle(); // Reset the timer on manual interaction
  };

  const handleQuantity = (delta: number) => {
    // If we are decreasing and quantity is 1...
    if (delta === -1 && syncedQuantity === 1 && isInCart) {
      removeFromCart(product.id);
      setLocalQuantity(1); // Reset local state
      toast.success("Removed from cart");
      return;
    }

    const newQty = Math.max(1, syncedQuantity + delta);
    setLocalQuantity(newQty);

    // Sync with cart (handles both add + update)
    if (cartItem) {
      addToCart(product, newQty - cartItem.qty); // Delta update
    }
  };

  const handleAddToCart = () => {
    addToCart(product, syncedQuantity);
    toast.success("Added to cart!", {
      description: `${product.name} × ${syncedQuantity}`,
      duration: 3000,
    });
  };

  const handleRequestQuote = () => {
    openQuoteModal(product);
  };

  // Zoom Handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const { left, top, width, height } =
      imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePosition({ x, y });
  };

  // Safe Image handling
  const mainImage = product.images[selectedImage] || "/placeholder.png";

  return (
    <main className="min-h-screen bg-slate-50 font-sans relative overflow-hidden pt-18">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-200 pointer-events-none z-0">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl mix-blend-multiply animate-blob" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-2000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-4 lg:mt-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm text-slate-500 mb-8 pt-2">
          <Link
            href="/"
            className="hover:text-slate-900 transition-colors flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Products
          </Link>
          <ChevronRight className="w-4 h-4 mx-2 text-slate-300" />
          <span className="text-slate-900 font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* LEFT COLUMN: Image Gallery */}
          <div className="space-y-4">
            {product.images?.length ? (
              <>
                {/* Main Image Container */}
                <div
                  ref={imageContainerRef}
                  className="aspect-square bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden relative group cursor-crosshair"
                  onMouseEnter={() => setShowZoom(true)}
                  onMouseLeave={() => setShowZoom(false)}
                  onMouseMove={handleMouseMove}
                >
                  <Image
                    key={selectedImage}
                    src={getImageUrl(mainImage)}
                    alt={product.name}
                    fill
                    className="object-contain p-8 animate-in fade-in duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />

                  {showZoom && (
                    <div
                      className="absolute pointer-events-none border-2 border-slate-400/50 bg-white/10 backdrop-blur-none shadow-2xl rounded-xl"
                      style={{
                        width: "150px",
                        height: "150px",
                        left: `${mousePosition.x}%`,
                        top: `${mousePosition.y}%`,
                        transform: "translate(-50%, -50%)",
                        backgroundImage: `url(${getImageUrl(mainImage)})`,
                        backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
                        backgroundSize: "500%",
                        backgroundRepeat: "no-repeat",
                      }}
                    />
                  )}

                  {!showZoom && (
                    <div className="absolute top-4 left-4 transition-opacity duration-300">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                          product.category === "Software"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-emerald-100 text-emerald-700"
                        }`}
                      >
                        {product.category}
                      </span>
                    </div>
                  )}
                </div>

                {/* Thumbnails */}
                <div className="grid grid-cols-6 gap-2">
                  {product.images.map((img: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => handleManualImageSelect(idx)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === idx
                          ? "border-slate-900 ring-2 ring-slate-900/20"
                          : "border-transparent hover:border-slate-300"
                      }`}
                    >
                      <Image
                        src={getImageUrl(img)}
                        alt={`View ${idx}`}
                        className="object-cover"
                        fill
                        sizes="100px"
                      />
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="aspect-square bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 flex items-center justify-center p-8">
                <Image
                  src="/placeholder.svg"
                  alt="No image available"
                  width={512}
                  height={512}
                  className="object-contain"
                />
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Product Info */}
          <div className="flex flex-col">
            <div className="mb-6 border-b border-slate-100 pb-6">
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="ml-1 font-semibold text-slate-900">
                    {product.rating}
                  </span>
                </div>
                <span className="text-slate-300">|</span>
                <span className="text-slate-500">
                  {product.reviews} Reviews
                </span>
                <span className="text-slate-300">|</span>
                <span className="text-emerald-600 font-medium flex items-center">
                  <Check className="w-4 h-4 mr-1" />
                  {stockCount > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>

            {/* Price & Cart Section */}
            <div className="bg-white/60 backdrop-blur-md border border-white/50 rounded-2xl p-6 shadow-sm mb-8">
              <div className="flex items-end justify-between mb-6">
                <div>
                  <p className="text-sm text-slate-500 font-medium mb-1">
                    {priceLabel}
                  </p>
                  {isQuote ? (
                    <div className="text-3xl font-bold text-blue-600">
                      Quote Required
                    </div>
                  ) : (
                    <div className="text-4xl font-bold text-slate-900">
                      {formatPrice(product.price)}
                    </div>
                  )}
                </div>
              </div>

              {/* ACTION AREA - ANIMATED */}
              <div className="flex flex-row h-14 relative group gap-4">
                {/* QUANTITY SELECTOR */}
                {!isQuote && (
                  <div
                    className={`
                                    flex items-center justify-between bg-white border rounded-xl z-10 h-14
                                    transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
                                    ${
                                      isInCart
                                        ? "w-full border-blue-500 shadow-[0_0_0_4px_rgba(59,130,246,0.1)] px-4"
                                        : "w-36 border-slate-200 px-2"
                                    }
                                  `}
                  >
                    {/* DECREASE BUTTON */}
                    <button
                      onClick={() => handleQuantity(-1)}
                      className={`
                                      w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200
                                      ${
                                        isInCart
                                          ? "text-blue-600 hover:bg-blue-50"
                                          : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                                      }
                                    `}
                    >
                      {isInCart && syncedQuantity === 1 ? (
                        <Trash2 className="w-5 h-5 text-red-500" />
                      ) : (
                        <Minus className="w-5 h-5" />
                      )}
                    </button>

                    {/* NUMBER DISPLAY */}
                    <span
                      className={`
                                    font-bold text-lg tabular-nums transition-all duration-300 select-none
                                    ${isInCart ? "text-slate-900 scale-110" : "text-slate-700 scale-100"}
                                  `}
                    >
                      {syncedQuantity}
                    </span>

                    {/* INCREASE BUTTON */}
                    <button
                      onClick={() => handleQuantity(1)}
                      className={`
                                      w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200
                                      ${
                                        isInCart
                                          ? "text-blue-600 hover:bg-blue-50"
                                          : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                                      }
                                    `}
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                )}

                {/* ADD TO CART / REQUEST QUOTE BUTTON */}
                <button
                  onClick={isQuote ? handleRequestQuote : handleAddToCart}
                  disabled={isInCart && !isQuote}
                  className={`
                                  h-14 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-2
                                  overflow-hidden whitespace-nowrap
                                  transform transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
                                  ${
                                    isQuote
                                      ? "flex-1 bg-slate-900 hover:bg-slate-800 opacity-100"
                                      : isInCart
                                        ? "w-0 p-0 m-0 opacity-0 translate-x-10" // Hidden State
                                        : "flex-1 bg-blue-600 hover:bg-blue-700 opacity-100 translate-x-0 ml-0" // Visible State
                                  }
                                `}
                >
                  {isQuote ? (
                    <>
                      <Phone className="w-5 h-5" />
                      Request Custom Quote
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </>
                  )}
                </button>
              </div>

              {/* Helper text when in cart */}
              {!isQuote && (
                <div
                  className={`
                  text-center mt-3 text-xs font-medium text-blue-600 transition-all duration-500
                  ${isInCart ? "opacity-100 translate-y-0 h-auto" : "opacity-0 -translate-y-2 h-0 overflow-hidden"}
                `}
                >
                  Item is in your cart. Adjust quantity above.
                </div>
              )}
            </div>

            <div className="prose prose-slate mb-8">
              <p className="text-slate-600 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Tabs: Features / Specs */}
            <div className="mt-auto">
              <div className="flex border-b border-slate-200 mb-6">
                <button
                  onClick={() => setActiveTab("features")}
                  className={`pb-3 pr-6 text-sm font-bold transition-all relative ${
                    activeTab === "features"
                      ? "text-slate-900"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  Key Features
                  {activeTab === "features" && (
                    <span className="absolute -bottom-px left-0 w-full h-0.5 bg-slate-900" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("specs")}
                  className={`pb-3 px-6 text-sm font-bold transition-all relative ${
                    activeTab === "specs"
                      ? "text-slate-900"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  Technical Specs
                  {activeTab === "specs" && (
                    <span className="absolute -bottom-px left-0 w-full h-0.5 bg-slate-900" />
                  )}
                </button>
              </div>

              <div className="min-h-50">
                {activeTab === "features" ? (
                  <ul className="grid grid-cols-1 gap-3">
                    {product.features?.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-start text-slate-600">
                        <div className="bg-blue-50 p-1 rounded-full mr-3 mt-0.5">
                          <Check className="w-3 h-3 text-blue-600" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {product.specs &&
                      Object.entries(product.specs).map(([key, value], idx) => (
                        <div
                          key={idx}
                          className="bg-white p-3 rounded-lg border border-slate-100"
                        >
                          <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">
                            {key}
                          </p>
                          <p className="text-slate-900 font-medium">
                            {value as string}
                          </p>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
