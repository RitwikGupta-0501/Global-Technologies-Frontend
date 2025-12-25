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
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {checkoutStep === "success" ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                  <CheckCircle size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">All Set!</h3>
                  <p className="text-slate-600 mt-2">
                    {checkoutMode === "split"
                      ? `Your order for ${fixedItemsCount} items is processing. Your quote request for ${quoteItemsCount} items has been sent separately.`
                      : "Your consolidated quote request has been received. A representative will contact you with a full invoice."}
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
                <p>Your list is empty.</p>
                <button
                  onClick={onClose}
                  className="mt-4 text-blue-600 font-medium hover:underline"
                >
                  Start Browsing
                </button>
              </div>
            ) : checkoutStep === "decision" ? (
              <div className="space-y-4">
                <p className="text-slate-600 text-sm mb-2">
                  You have both <strong>In-Stock</strong> and{" "}
                  <strong>Quote-Only</strong> items.
                </p>

                <button
                  onClick={() => {
                    onSetMode("split");
                    onSetStep("form");
                  }}
                  className="w-full text-left p-4 rounded-xl border-2 border-slate-100 hover:border-blue-500 hover:bg-blue-50 transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg group-hover:bg-blue-200">
                      <Truck size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">
                        Buy Now & Quote Later
                      </h4>
                      <p className="text-xs text-slate-600 mt-1">
                        Pay <strong>{formatPrice(cartTotal)}</strong> now.
                        Request a quote for the rest.
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    onSetMode("combined");
                    onSetStep("form");
                  }}
                  className="w-full text-left p-4 rounded-xl border-2 border-slate-100 hover:border-amber-500 hover:bg-amber-50 transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-amber-100 text-amber-600 rounded-lg group-hover:bg-amber-200">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">
                        Wait & Consolidate
                      </h4>
                      <p className="text-xs text-slate-600 mt-1">
                        Submit all as one request. Single invoice for
                        everything.
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => onSetStep("cart")}
                  className="w-full py-2 text-slate-500 text-sm hover:underline mt-4"
                >
                  Back to List
                </button>
              </div>
            ) : checkoutStep === "form" ? (
              <div className="space-y-4">
                <div
                  className={`p-4 rounded-lg border ${
                    checkoutMode === "split"
                      ? "bg-blue-50 border-blue-100"
                      : "bg-amber-50 border-amber-100"
                  }`}
                >
                  <h4
                    className={`font-semibold mb-2 text-sm ${
                      checkoutMode === "split"
                        ? "text-blue-900"
                        : "text-amber-900"
                    }`}
                  >
                    {checkoutMode === "split"
                      ? "Order & Quote Summary"
                      : "Consolidated Request Summary"}
                  </h4>
                  <ul
                    className={`text-sm space-y-1 ${
                      checkoutMode === "split"
                        ? "text-blue-800"
                        : "text-amber-800"
                    }`}
                  >
                    {checkoutMode === "split" ? (
                      <>
                        <li className="flex items-center gap-2">
                          <CreditCard size={14} />
                          <strong>Due Now:</strong> {formatPrice(cartTotal)}
                        </li>
                        <li className="flex items-center gap-2">
                          <FileText size={14} />
                          <strong>Quote Request:</strong> {quoteItemsCount}{" "}
                          items
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="flex items-center gap-2">
                          <Clock size={14} />
                          <strong>Pay Later:</strong> Consolidated Invoice
                        </li>
                        <li className="flex items-center gap-2">
                          <FileText size={14} />
                          <strong>Total Items:</strong> {cart.length}
                        </li>
                      </>
                    )}
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
                  <button
                    type="submit"
                    className={`w-full py-3 text-white rounded-lg font-bold shadow-lg mt-4 transition-all ${
                      checkoutMode === "split"
                        ? "bg-blue-600 hover:bg-blue-700 hover:shadow-xl"
                        : "bg-slate-900 hover:bg-slate-800 hover:shadow-xl"
                    }`}
                  >
                    {checkoutMode === "split"
                      ? `Pay ${formatPrice(cartTotal)} & Request`
                      : "Submit Request"}
                  </button>
                </form>

                <button
                  onClick={() =>
                    onSetStep(
                      fixedItemsCount > 0 && quoteItemsCount > 0
                        ? "decision"
                        : "cart",
                    )
                  }
                  className="w-full py-2 text-slate-500 text-sm hover:underline"
                >
                  Back
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
                        src={item.images[0]}
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
                        {item.priceType === "fixed" && item.price != null ? (
                          <span className="font-bold text-slate-900">
                            {formatPrice(item.price * item.qty)}
                          </span>
                        ) : (
                          <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded">
                            Quote Req.
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
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
