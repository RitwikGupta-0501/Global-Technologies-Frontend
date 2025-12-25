// components/home/CartSidebar.tsx
"use client";

import Image from "next/image";
import {
  X,
  Plus,
  Minus,
  ShoppingCart,
  CheckCircle,
  Truck,
  Clock,
  CreditCard,
  FileText,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import { Product } from "../ProductCard";

interface CartItem extends Product {
  qty: number;
}

interface CartSidebarProps {
  cart: CartItem[];
  isCartOpen: boolean;
  checkoutStep: "cart" | "decision" | "form" | "success";
  checkoutMode: "combined" | "split";
  cartTotal: number;
  fixedItemsCount: number;
  quoteItemsCount: number;
  formatPrice: (price: number | null) => string;
  onClose: () => void;
  onReset: () => void;
  onProceed: () => void;
  onUpdateQty: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  onSetStep: (step: "cart" | "decision" | "form" | "success") => void;
  onSetMode: (mode: "combined" | "split") => void;
  onSubmitForm: (e: React.FormEvent) => void;
}

export default function CartSidebar({
  cart,
  isCartOpen,
  checkoutStep,
  checkoutMode,
  cartTotal,
  fixedItemsCount,
  quoteItemsCount,
  formatPrice,
  onClose,
  onReset,
  onProceed,
  onUpdateQty,
  onRemove,
  onSetStep,
  onSetMode,
  onSubmitForm,
}: CartSidebarProps) {
  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden ${
        isCartOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-300 ${
          isCartOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <div
        className={`absolute inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl transform transition-transform duration-300 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white">
          <h2 className="text-xl font-bold text-slate-900">
            {checkoutStep === "cart"
              ? "Your List"
              : checkoutStep === "decision"
                ? "Checkout Options"
                : checkoutStep === "form"
                  ? "Finalize Details"
                  : "Confirmed"}
          </h2>
          <button
            onClick={onReset}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-500"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* success / empty / decision / form / cart list... */}
          {/* You can paste your existing inner JSX here, replacing handlers with props */}
        </div>

        {/* Footer (Actions) */}
        {cart.length > 0 && checkoutStep === "cart" && (
          <div className="p-5 border-t border-slate-100 bg-white">
            <div className="space-y-2 mb-4">
              {fixedItemsCount > 0 && (
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-slate-900">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
              )}
              {quoteItemsCount > 0 && (
                <div className="flex justify-between text-amber-600 bg-amber-50 p-2 rounded-lg text-sm">
                  <span className="flex items-center gap-2">
                    <MessageSquare size={14} /> Items for Quote
                  </span>
                  <span className="font-bold">{quoteItemsCount}</span>
                </div>
              )}
            </div>
            <button
              onClick={onProceed}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 hover:shadow-xl"
            >
              Proceed <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
