"use client";

import Image from "next/image";
import {
  X,
  Plus,
  Minus,
  ShoppingCart,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { ProductSchema } from "../../src/api/models/ProductSchema";
import { getImageUrl } from "@/lib/utils";

export interface CartItem extends ProductSchema {
  qty: number;
}

interface CartSidebarProps {
  cart: CartItem[];
  isCartOpen: boolean;
  checkoutStep: "cart" | "form" | "success";
  cartTotal: number;
  formatPrice: (price: number | null) => string;
  onClose: () => void;
  onReset: () => void;
  onProceed: () => void;
  onUpdateQty: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  onSetStep: (step: "cart" | "form" | "success") => void;
  onSubmitForm: (e: React.FormEvent) => void;
}

export default function CartSidebar({
  cart,
  isCartOpen,
  checkoutStep,
  cartTotal,
  formatPrice,
  onClose,
  onReset,
  onProceed,
  onUpdateQty,
  onRemove,
  onSetStep,
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
              ? "Your Cart"
              : checkoutStep === "form"
                ? "Checkout"
                : "Order Confirmed"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-500"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {checkoutStep === "success" ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                <CheckCircle size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Order Placed!
                </h3>
                <p className="text-slate-600 mt-2">
                  Thank you for your purchase. A confirmation email has been
                  sent.
                </p>
              </div>
              <button
                onClick={onReset}
                className="mt-4 px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-slate-500">
              <ShoppingCart size={48} className="mb-4 opacity-20" />
              <p>Your cart is empty.</p>
              <button
                onClick={onClose}
                className="mt-4 text-blue-600 font-medium hover:underline"
              >
                Continue Browsing
              </button>
            </div>
          ) : checkoutStep === "form" ? (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                <h4 className="font-semibold mb-2 text-sm text-slate-900">
                  Order Summary
                </h4>
                <ul className="text-sm space-y-1 text-slate-600">
                  <li className="flex justify-between">
                    <span>Items:</span> <span>{cart.length}</span>
                  </li>
                  <li className="flex justify-between font-bold text-slate-900 pt-2 border-t border-slate-200 mt-2">
                    <span>Total:</span> <span>{formatPrice(cartTotal)}</span>
                  </li>
                </ul>
              </div>

              <form className="space-y-3" onSubmit={onSubmitForm}>
                <div>
                  <label
                    className="block text-sm font-medium text-slate-700 mb-1"
                    htmlFor="name"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    required
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-slate-700 mb-1"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    required
                    type="email"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Payment Placeholder */}
                <div className="pt-2">
                  <div className="p-3 border border-slate-200 rounded-lg text-sm text-slate-500 text-center bg-slate-50">
                    Payment Gateway (Stripe) would appear here
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-lg mt-4 transition-all hover:shadow-xl"
                >
                  Pay {formatPrice(cartTotal)}
                </button>
              </form>

              <button
                onClick={() => onSetStep("cart")}
                className="w-full py-2 text-slate-500 text-sm hover:underline"
              >
                Back to Cart
              </button>
            </div>
          ) : (
            // Default: Cart List
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100"
                >
                  <div className="w-16 h-16 bg-white rounded-lg shrink-0 flex items-center justify-center border border-slate-200 overflow-hidden">
                    <Image
                      src={getImageUrl(item.images[0])}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold text-slate-900 text-sm truncate pr-2">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => onRemove(item.id)}
                        className="text-slate-400 hover:text-red-500 p-1 -m-1 rounded-sm hover:bg-slate-200 transition-colors"
                        aria-label="Remove item"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateQty(item.id, -1)}
                          className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center hover:bg-slate-100 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-sm font-medium w-4 text-center">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => onUpdateQty(item.id, 1)}
                          className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center hover:bg-slate-100 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="font-bold text-slate-900">
                        {formatPrice(Number(item.price) * item.qty)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer (Actions) */}
        {cart.length > 0 && checkoutStep === "cart" && (
          <div className="p-5 border-t border-slate-100 bg-white">
            <div className="flex justify-between items-end mb-4">
              <span className="text-slate-500 font-medium">Subtotal</span>
              <span className="text-2xl font-bold text-slate-900">
                {formatPrice(cartTotal)}
              </span>
            </div>
            <button
              onClick={onProceed}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 hover:shadow-xl"
            >
              Checkout <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
