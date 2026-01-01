"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { ProductSchema } from "../src/api/models/ProductSchema";
import {
  Star,
  Check,
  Shield,
  Truck,
  RefreshCw,
  ChevronRight,
  Minus,
  Plus,
  Phone,
  ArrowLeft,
} from "lucide-react";
import Image from "next/image";

interface ProductDetailsViewProps {
  product: ProductSchema;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

const getImageUrl = (path: string) => {
  if (!path) return "/placeholder.png";
  if (path.startsWith("http")) return path; // Already a full URL (e.g. S3)
  return `${API_URL}${path}`; // Prepend Django Backend URL
};

export default function ProductDetailsView({
  product,
}: ProductDetailsViewProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"features" | "specs">("features");

  // Zoom state
  const [showZoom, setShowZoom] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Cart Context
  const { addToCart } = useCart();

  // Ref for the interval
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // --- DATA MAPPING (Bridge API -> UI) ---
  const isQuote = product.price_type === "quote";
  // Default to "Per Item" if not specified, or use logic based on type
  const priceLabel = isQuote ? "Custom Configuration" : "Per License";
  const priceNumber = product.price ? Number(product.price) : 0;
  // API doesn't have stock count yet, so we assume available
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
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      // 1. Map API 'description' to Frontend 'desc'
      desc: product.description,
      price: priceNumber,
      // 2. Logic for Color (Blue/Green)
      color: product.category === "Software" ? "blue" : "green",
      type: product.category,
      // 3. Logic for Price Label & Type
      priceLabel: priceLabel,
      priceType: isQuote ? "quote" : "fixed",
      // 4. CRITICAL: Send the full array, not just one string
      images: product.images.map(getImageUrl),
    });
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
    <main className="min-h-screen bg-slate-50 font-sans relative overflow-hidden">
      {/* Assuming Navbar is handled in layout, but if you want it here: */}
      {/* <Navbar /> */}

      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-200 pointer-events-none z-0">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl mix-blend-multiply animate-blob" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-2000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-4 lg:mt-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm text-slate-500 mb-8">
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
            {/* Main Image Container */}
            <div
              ref={imageContainerRef}
              className="aspect-square bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden relative group cursor-crosshair"
              onMouseEnter={() => setShowZoom(true)}
              onMouseLeave={() => setShowZoom(false)}
              onMouseMove={handleMouseMove}
            >
              {/* Base Image */}
              <Image
                key={selectedImage}
                src={getImageUrl(mainImage)}
                alt={product.name}
                fill
                className="object-contain p-8 animate-in fade-in duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Zoom Lens / Preview Box */}
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
                    backgroundSize: "500%", // Increased Zoom level (5x)
                    backgroundRepeat: "no-repeat",
                  }}
                />
              )}

              {/* Type Badge (Hidden when zooming) */}
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
          </div>

          {/* RIGHT COLUMN: Product Info */}
          <div className="flex flex-col">
            {/* Header */}
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
                  <Check className="w-4 h-4 mr-1" />{" "}
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
                      ${(priceNumber * quantity).toLocaleString()}
                      {quantity > 1 && (
                        <span className="text-lg text-slate-400 font-normal ml-2">
                          (${priceNumber.toLocaleString()} ea)
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {/* Quantity - Only show if not a quote item */}
                {!isQuote && (
                  <div className="flex items-center bg-white border border-slate-200 rounded-xl px-2 h-14 w-fit">
                    <button
                      onClick={() => handleQuantity(-1)}
                      className="w-10 h-full flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-bold text-slate-900 text-lg">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantity(1)}
                      className="w-10 h-full flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Main Action Button */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 h-14 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-2 transform transition-all active:scale-[0.98] ${
                    isQuote
                      ? "bg-slate-900 hover:bg-slate-800 shadow-slate-900/20"
                      : "bg-blue-600 hover:bg-blue-700 shadow-blue-600/20"
                  }`}
                >
                  {isQuote ? (
                    <>
                      <Phone className="w-5 h-5" />
                      Request Custom Quote
                    </>
                  ) : (
                    <>
                      Add to Cart — ${(priceNumber * quantity).toLocaleString()}
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Description */}
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

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-100">
              <div className="flex flex-col items-center text-center">
                <Shield className="w-6 h-6 text-slate-400 mb-2" />
                <span className="text-xs font-semibold text-slate-500">
                  Secure Payment
                </span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Truck className="w-6 h-6 text-slate-400 mb-2" />
                <span className="text-xs font-semibold text-slate-500">
                  Fast Delivery
                </span>
              </div>
              <div className="flex flex-col items-center text-center">
                <RefreshCw className="w-6 h-6 text-slate-400 mb-2" />
                <span className="text-xs font-semibold text-slate-500">
                  30-Day Returns
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
