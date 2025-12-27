"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import { Product } from "../components/ProductCard";
import HeroSection from "../components/home/HeroSection";
import HighlightsSection from "../components/home/HighlightsSection";
import ProductGrid from "../components/home/ProductGrid";
import { useCart } from "../context/CartContext";

export default function Home() {
  // --- 1. Mock Data ---
  const [products] = useState<Product[]>([
    {
      id: 1,
      name: "McAfee Endpoint Security",
      desc: "Complete enterprise protection bundle for 50-100 nodes.",
      price: 1240,
      type: "Software",
      color: "blue",
      priceLabel: "Per License",
      priceType: "fixed",
      images: [
        "https://placehold.co/600x400/eff6ff/3b82f6.png?text=McAfee+Box+Front",
        "https://placehold.co/600x400/eff6ff/3b82f6.png?text=McAfee+Dashboard",
        "https://placehold.co/600x400/eff6ff/3b82f6.png?text=McAfee+Mobile",
      ],
    },
    {
      id: 2,
      name: "BlackBox 4K LTE",
      desc: "Cloud connected dashcam with night vision and parking mode.",
      price: 289,
      type: "Hardware",
      color: "green",
      priceLabel: "Per Unit",
      priceType: "fixed",
      images: [
        "https://placehold.co/600x400/f0fdf4/10b981.png?text=Dashcam+Front",
        "https://placehold.co/600x400/f0fdf4/10b981.png?text=Dashcam+Side",
        "https://placehold.co/600x400/f0fdf4/10b981.png?text=Dashcam+App",
      ],
    },
    {
      id: 3,
      name: "Unity Pro Enterprise",
      desc: "Annual multi-seat development license with priority support.",
      price: null,
      type: "Software",
      color: "blue",
      priceLabel: "Annual License",
      priceType: "quote",
      images: [
        "https://placehold.co/600x400/eff6ff/3b82f6.png?text=Unity+Editor",
        "https://placehold.co/600x400/eff6ff/3b82f6.png?text=Unity+Build",
        "https://placehold.co/600x400/eff6ff/3b82f6.png?text=Unity+Team",
      ],
    },
  ]);

  // --- 2. State Management ---
  const { cart, addToCart, incrementQty, decrementQty } = useCart();

  return (
    <main className="min-h-screen bg-slate-50 font-sans">
      <Navbar />

      <HeroSection />
      <HighlightsSection />

      <ProductGrid
        products={products}
        cart={cart}
        onAddToCart={addToCart}
        onIncrement={incrementQty}
        onDecrement={decrementQty}
      />

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-white font-bold text-2xl">NEXGEN</span>
            <p className="mt-4 text-sm text-slate-500">
              &copy; 2025 NexGen Distribution. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
