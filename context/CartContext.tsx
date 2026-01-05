"use client";

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
  Dispatch,
  SetStateAction,
  useLayoutEffect,
} from "react";
import { ProductSchema } from "@/api/models/ProductSchema";

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
  checkoutStep: "cart" | "form" | "success";
  addToCart: (product: ProductSchema, qty?: number) => void;
  removeFromCart: (id: number) => void;
  incrementQty: (id: number) => void; // Helper for simple increment
  decrementQty: (id: number) => void; // Helper for simple decrement
  updateQty: (id: number, delta: number) => void;
  resetCart: () => void;
  handleProceed: () => void;
  setCheckoutStep: (step: "cart" | "form" | "success") => void;
  formatPrice: (price: string | number | null | undefined) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function useLocalStorageCart(
  defaultValue: CartItem[] = [],
): [CartItem[], Dispatch<SetStateAction<CartItem[]>>] {
  const [cart, setCart] = useState<CartItem[]>(defaultValue);

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("cart");
        if (saved) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setCart(JSON.parse(saved));
        }
      } catch {
        console.warn("Failed to load cart from localStorage");
      }
    }
  }, []);

  // Auto-save unchanged
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("cart", JSON.stringify(cart));
      } catch (error) {
        console.error("Failed to save cart:", error);
      }
    }
  }, [cart]);

  return [cart, setCart];
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  // --- State ---
  const [cart, setCart] = useLocalStorageCart([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "form" | "success">(
    "cart",
  );

  // Multi-tab sync
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "cart") {
        try {
          setCart(JSON.parse(e.newValue || "[]"));
        } catch {
          console.warn("Failed to sync cart from storage event");
        }
      }
    };
    if (typeof window !== "undefined") {
      window.addEventListener("storage", handleStorage);
      return () => window.removeEventListener("storage", handleStorage);
    }
  }, [setCart]);

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

  const addToCart = useCallback(
    (product: ProductSchema, qty: number = 1) => {
      setCart((prev) => {
        const existing = prev.find((item) => item.id === product.id);
        if (existing) {
          return prev.map((item) =>
            item.id === product.id ? { ...item, qty: item.qty + qty } : item,
          );
        }
        return [...prev, { ...product, qty }];
      });
    },
    [setCart],
  );

  const removeFromCart = useCallback(
    (id: number) => {
      setCart((prev) => prev.filter((item) => item.id !== id));
    },
    [setCart],
  );

  const updateQty = useCallback(
    (id: number, delta: number) => {
      setCart((prev) =>
        prev
          .map((item) =>
            item.id === id ? { ...item, qty: item.qty + delta } : item,
          )
          .filter((item) => item.qty > 0),
      );
    },
    [setCart],
  );

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
    setCheckoutStep("form");
  }, []);

  const resetCart = useCallback(() => {
    setCart([]);
    setIsCartOpen(false);
    setCheckoutStep("cart");
  }, [setCart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        cartTotal,
        fixedItemsCount,
        checkoutStep,
        addToCart,
        removeFromCart,
        updateQty,
        incrementQty,
        decrementQty,
        resetCart,
        handleProceed,
        setCheckoutStep,
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
