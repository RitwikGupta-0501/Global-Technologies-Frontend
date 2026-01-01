"use client";

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";
import { ProductSchema } from "../src/api/models/ProductSchema";

// Define the shape of your context
interface CartItem extends ProductSchema {
  qty: number;
}

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  cartTotal: number;
  fixedItemsCount: number;
  quoteItemsCount: number;
  checkoutStep: "cart" | "decision" | "form" | "success";
  checkoutMode: "combined" | "split";
  addToCart: (product: ProductSchema) => void;
  removeFromCart: (id: number) => void;
  incrementQty: (id: number) => void; // Helper for simple increment
  decrementQty: (id: number) => void; // Helper for simple decrement
  updateQty: (id: number, delta: number) => void;
  resetCart: () => void;
  handleProceed: () => void;
  setCheckoutStep: (step: "cart" | "decision" | "form" | "success") => void;
  setCheckoutMode: (mode: "combined" | "split") => void;
  formatPrice: (price: string | number | null | undefined) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  // --- State ---
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<
    "cart" | "decision" | "form" | "success"
  >("cart");
  const [checkoutMode, setCheckoutMode] = useState<"combined" | "split">(
    "combined",
  );

  // --- Cart Logic ---
  const cartTotal = useMemo(
    () =>
      cart.reduce(
        (sum, item) =>
          item.price_type === "fixed" && item.price != null
            ? sum + Number(item.price) * item.qty
            : sum,
        0,
      ),
    [cart],
  );

  const quoteItemsCount = useMemo(
    () => cart.filter((item) => item.price_type === "quote").length,
    [cart],
  );
  const fixedItemsCount = useMemo(
    () => cart.filter((item) => item.price_type === "fixed").length,
    [cart],
  );

  const formatPrice = useCallback(
    (price: string | number | null | undefined) => {
      if (price === null || price === undefined) return "$0.00";

      // Ensure it is a number before formatting
      const numValue = Number(price);

      return Number.isFinite(numValue) ? `$${numValue.toFixed(2)}` : "$0.00";
    },
    [],
  );

  const addToCart = useCallback((product: ProductSchema) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    // setIsCartOpen(true); // Uncomment to Auto-open cart on add
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateQty = useCallback((id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty + delta } : item,
        )
        .filter((item) => item.qty > 0),
    );
  }, []);

  // Simple helpers for the UI
  const incrementQty = useCallback(
    (id: number) => updateQty(id, 1),
    [updateQty],
  );
  const decrementQty = useCallback(
    (id: number) => updateQty(id, -1),
    [updateQty],
  );

  const handleProceed = useCallback(() => {
    if (fixedItemsCount > 0 && quoteItemsCount > 0) {
      setCheckoutStep("decision");
    } else {
      setCheckoutMode(fixedItemsCount > 0 ? "split" : "combined");
      setCheckoutStep("form");
    }
  }, [fixedItemsCount, quoteItemsCount]);

  const resetCart = useCallback(() => {
    setCart([]);
    setIsCartOpen(false);
    setCheckoutStep("cart");
    setCheckoutMode("combined");
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        cartTotal,
        fixedItemsCount,
        quoteItemsCount,
        checkoutStep,
        checkoutMode,
        addToCart,
        removeFromCart,
        updateQty,
        incrementQty,
        decrementQty,
        resetCart,
        handleProceed,
        setCheckoutStep,
        setCheckoutMode,
        formatPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
