"use client";

import React, { useState, useMemo, useCallback } from "react";
import Navbar from "../components/Navbar";
import ProductCard, { Product } from "../components/ProductCard";
import HeroSection from "../components/home/HeroSection";
import HighlightsSection from "../components/home/HighlightsSection";
import CartSidebar from "../components/home/CartSidebar";
import ProductGrid from "../components/home/ProductGrid";

interface CartItem extends Product {
  qty: number;
}

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
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<
    "cart" | "decision" | "form" | "success"
  >("cart");
  const [checkoutMode, setCheckoutMode] = useState<"combined" | "split">(
    "combined",
  );

  // --- 3. Derived values ---
  const cartTotal = useMemo(
    () =>
      cart.reduce(
        (sum, item) =>
          item.priceType === "fixed" && item.price != null
            ? sum + item.price * item.qty
            : sum,
        0,
      ),
    [cart],
  );

  const quoteItemsCount = useMemo(
    () => cart.filter((item) => item.priceType === "quote").length,
    [cart],
  );

  const fixedItemsCount = useMemo(
    () => cart.filter((item) => item.priceType === "fixed").length,
    [cart],
  );

  const formatPrice = useCallback((price: number | null): string => {
    return price != null && Number.isFinite(price)
      ? `$${price.toFixed(2)}`
      : "$0.00";
  }, []);

  // --- 4. Handlers ---
  const addToCart = useCallback((product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateQty = useCallback((id: number, delta: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item,
      ),
    );
  }, []);

  const handleProceed = useCallback(() => {
    if (fixedItemsCount > 0 && quoteItemsCount > 0) {
      setCheckoutStep("decision");
    } else {
      setCheckoutMode(fixedItemsCount > 0 ? "split" : "combined");
      setCheckoutStep("form");
    }
  }, [fixedItemsCount, quoteItemsCount]);

  const handleFormSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep("success");
  }, []);

  const resetCart = useCallback(() => {
    setCart([]);
    setIsCartOpen(false);
    setCheckoutStep("cart");
    setCheckoutMode("combined");
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 font-sans">
      <Navbar cartCount={cart.length} onOpenCart={() => setIsCartOpen(true)} />

      <HeroSection />
      <HighlightsSection />

      {/* Product grid still uses ProductCard; wrapped in its own component */}
      <ProductGrid products={products} onAddToCart={addToCart} />

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

      {/* Cart Sidebar */}
      <CartSidebar
        cart={cart}
        isCartOpen={isCartOpen}
        checkoutStep={checkoutStep}
        checkoutMode={checkoutMode}
        cartTotal={cartTotal}
        fixedItemsCount={fixedItemsCount}
        quoteItemsCount={quoteItemsCount}
        formatPrice={formatPrice}
        onClose={() => setIsCartOpen(false)}
        onReset={resetCart}
        onProceed={handleProceed}
        onUpdateQty={updateQty}
        onRemove={removeFromCart}
        onSetStep={setCheckoutStep}
        onSetMode={setCheckoutMode}
        onSubmitForm={handleFormSubmit}
      />
    </main>
  );
}
