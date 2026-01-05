"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  Plus,
  Minus,
  ShoppingCart,
  CheckCircle,
  ArrowRight,
  Loader2,
  Lock,
} from "lucide-react";
import { ProductSchema } from "@/api/models/ProductSchema"; // Adjust path
import { getImageUrl } from "@/lib/utils";
import { useAuth } from "~/context/AuthContext";

// --- Interfaces ---

export interface CartItem extends ProductSchema {
  qty: number;
}

export interface AddressData {
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: string;
}

export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  gstin: string;
  billingAddress: AddressData;
  shippingAddress: AddressData;
  saveInfo: boolean;
}

interface CartSidebarProps {
  cart: CartItem[];
  isCartOpen: boolean;
  checkoutStep: "cart" | "form" | "success";
  cartTotal: number;
  loading: boolean; // <--- New Prop
  formatPrice: (price: number | null) => string;
  onClose: () => void;
  onReset: () => void;
  onProceed: () => void;
  onUpdateQty: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  onSetStep: (step: "cart" | "form" | "success") => void;
  onSubmitForm: (data: CheckoutFormData) => void; // <--- Updated Prop
}

export default function CartSidebar({
  cart,
  isCartOpen,
  checkoutStep,
  cartTotal,
  loading,
  formatPrice,
  onClose,
  onReset,
  onProceed,
  onUpdateQty,
  onRemove,
  onSetStep,
  onSubmitForm,
}: CartSidebarProps) {
  const { user } = useAuth();

  // --- Form State ---
  const [sameAsBilling, setSameAsBilling] = useState(true);
  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyName: "",
    gstin: "",
    saveInfo: false,
    billingAddress: { line1: "", line2: "", city: "", state: "", pincode: "" },
    shippingAddress: { line1: "", line2: "", city: "", state: "", pincode: "" },
  });

  // Pre-fill User Info when Sidebar Opens
  useEffect(() => {
    if (user && isCartOpen) {
      setFormData((prev) => ({
        ...prev,
        firstName: prev.firstName || user.first_name || "",
        lastName: prev.lastName || user.last_name || "",
        email: prev.email || user.email || "",
      }));
    }
  }, [user, isCartOpen]);

  // Helper: Handle Nested Address Updates
  const updateAddress = (
    type: "billingAddress" | "shippingAddress",
    field: keyof AddressData,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [type]: { ...prev[type], [field]: value },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Use billing address as shipping if checkbox is checked
    const finalData = {
      ...formData,
      shippingAddress: sameAsBilling
        ? formData.billingAddress
        : formData.shippingAddress,
    };
    onSubmitForm(finalData);
  };

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
        className={`absolute inset-y-0 right-0 max-w-xl w-full bg-white shadow-2xl transform transition-transform duration-300 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white z-10">
          <h2 className="text-xl font-bold text-slate-900">
            {checkoutStep === "cart"
              ? `Your Cart (${cart.length})`
              : checkoutStep === "form"
                ? "Secure Checkout"
                : "Order Confirmed"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
          {checkoutStep === "success" ? (
            // --- SUCCESS VIEW ---
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6 animate-in zoom-in-95">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-100/50">
                <CheckCircle size={40} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Payment Successful!
                </h3>
                <p className="text-slate-500 mt-2 max-w-xs mx-auto">
                  Your order has been placed. You will receive an email
                  confirmation shortly.
                </p>
              </div>
              <button
                onClick={onReset}
                className="px-8 py-3 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                Continue Shopping
              </button>
            </div>
          ) : cart.length === 0 ? (
            // --- EMPTY CART VIEW ---
            <div className="flex flex-col items-center justify-center h-full text-center text-slate-400">
              <ShoppingCart size={64} className="mb-4 opacity-10" />
              <p className="font-medium">Your cart is empty</p>
              <button
                onClick={onClose}
                className="mt-4 text-blue-600 font-medium hover:underline"
              >
                Continue Browsing
              </button>
            </div>
          ) : checkoutStep === "form" ? (
            // --- CHECKOUT FORM VIEW ---
            <div className="space-y-6">
              {/* Order Summary Card */}
              <div className="p-4 rounded-xl bg-white border border-slate-100 shadow-sm">
                <h4 className="font-bold mb-3 text-sm text-slate-900 uppercase tracking-wide">
                  Order Summary
                </h4>
                <ul className="text-sm space-y-2 text-slate-600">
                  <li className="flex justify-between">
                    <span>Items ({cart.length})</span>
                    <span>--</span>
                  </li>
                  <li className="flex justify-between font-bold text-lg text-slate-900 pt-3 border-t border-slate-100">
                    <span>Total</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </li>
                </ul>
              </div>

              <form
                id="checkout-form"
                className="space-y-6"
                onSubmit={handleSubmit}
              >
                {/* 1. Contact Info */}
                <section>
                  <h4 className="font-bold text-sm text-slate-900 uppercase tracking-wide mb-3">
                    Contact Information
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-1">
                      <label className="text-xs font-semibold text-slate-500">
                        First Name
                      </label>
                      <input
                        required
                        type="text"
                        className="w-full px-3 py-2 mt-1 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            firstName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="text-xs font-semibold text-slate-500">
                        Last Name
                      </label>
                      <input
                        required
                        type="text"
                        className="w-full px-3 py-2 mt-1 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-xs font-semibold text-slate-500">
                        Email Address
                      </label>
                      <input
                        required
                        type="email"
                        className="w-full px-3 py-2 mt-1 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-xs font-semibold text-slate-500">
                        Phone Number
                      </label>
                      <input
                        required
                        type="tel"
                        className="w-full px-3 py-2 mt-1 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </section>

                {/* 2. Business Info (Optional) */}
                <section>
                  <h4 className="font-bold text-sm text-slate-900 uppercase tracking-wide mb-3">
                    Business Details{" "}
                    <span className="text-slate-400 font-normal normal-case">
                      (Optional)
                    </span>
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-1">
                      <label className="text-xs font-semibold text-slate-500">
                        Company Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 mt-1 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        value={formData.companyName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            companyName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="text-xs font-semibold text-slate-500">
                        GSTIN
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 mt-1 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        value={formData.gstin}
                        onChange={(e) =>
                          setFormData({ ...formData, gstin: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </section>

                {/* 3. Billing Address */}
                <section>
                  <h4 className="font-bold text-sm text-slate-900 uppercase tracking-wide mb-3">
                    Billing Address
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="text-xs font-semibold text-slate-500">
                        Address Line 1
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Street, Building, etc."
                        className="w-full px-3 py-2 mt-1 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        value={formData.billingAddress.line1}
                        onChange={(e) =>
                          updateAddress(
                            "billingAddress",
                            "line1",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-xs font-semibold text-slate-500">
                        Address Line 2 (Optional)
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 mt-1 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        value={formData.billingAddress.line2}
                        onChange={(e) =>
                          updateAddress(
                            "billingAddress",
                            "line2",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-500">
                        City
                      </label>
                      <input
                        required
                        type="text"
                        className="w-full px-3 py-2 mt-1 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        value={formData.billingAddress.city}
                        onChange={(e) =>
                          updateAddress(
                            "billingAddress",
                            "city",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-500">
                        State
                      </label>
                      <input
                        required
                        type="text"
                        className="w-full px-3 py-2 mt-1 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        value={formData.billingAddress.state}
                        onChange={(e) =>
                          updateAddress(
                            "billingAddress",
                            "state",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-xs font-semibold text-slate-500">
                        Pincode
                      </label>
                      <input
                        required
                        type="text"
                        className="w-full px-3 py-2 mt-1 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        value={formData.billingAddress.pincode}
                        onChange={(e) =>
                          updateAddress(
                            "billingAddress",
                            "pincode",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                  </div>
                </section>

                {/* 4. Shipping Address */}
                <section>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-sm text-slate-900 uppercase tracking-wide">
                      Shipping Address
                    </h4>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="accent-blue-600 w-4 h-4"
                        checked={sameAsBilling}
                        onChange={(e) => setSameAsBilling(e.target.checked)}
                      />
                      <span className="text-xs font-medium text-slate-600">
                        Same as Billing
                      </span>
                    </label>
                  </div>

                  {!sameAsBilling && (
                    <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="col-span-2">
                        <label className="text-xs font-semibold text-slate-500">
                          Address Line 1
                        </label>
                        <input
                          required={!sameAsBilling}
                          type="text"
                          className="w-full px-3 py-2 mt-1 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                          value={formData.shippingAddress.line1}
                          onChange={(e) =>
                            updateAddress(
                              "shippingAddress",
                              "line1",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="text-xs font-semibold text-slate-500">
                          Address Line 2 (Optional)
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 mt-1 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                          value={formData.shippingAddress.line2}
                          onChange={(e) =>
                            updateAddress(
                              "shippingAddress",
                              "line2",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-slate-500">
                          City
                        </label>
                        <input
                          required={!sameAsBilling}
                          type="text"
                          className="w-full px-3 py-2 mt-1 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                          value={formData.shippingAddress.city}
                          onChange={(e) =>
                            updateAddress(
                              "shippingAddress",
                              "city",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-slate-500">
                          State
                        </label>
                        <input
                          required={!sameAsBilling}
                          type="text"
                          className="w-full px-3 py-2 mt-1 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                          value={formData.shippingAddress.state}
                          onChange={(e) =>
                            updateAddress(
                              "shippingAddress",
                              "state",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="text-xs font-semibold text-slate-500">
                          Pincode
                        </label>
                        <input
                          required={!sameAsBilling}
                          type="text"
                          className="w-full px-3 py-2 mt-1 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                          value={formData.shippingAddress.pincode}
                          onChange={(e) =>
                            updateAddress(
                              "shippingAddress",
                              "pincode",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                    </div>
                  )}
                </section>

                <div className="pt-2">
                  <label className="flex items-center gap-2 cursor-pointer mb-4">
                    <input
                      type="checkbox"
                      className="accent-blue-600 w-4 h-4"
                      checked={formData.saveInfo}
                      onChange={(e) =>
                        setFormData({ ...formData, saveInfo: e.target.checked })
                      }
                    />
                    <span className="text-xs font-medium text-slate-600">
                      Save this address for future orders
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-700 text-white rounded-xl font-bold shadow-lg mt-2 transition-all hover:shadow-xl flex items-center justify-center gap-2 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        Pay Securely {formatPrice(cartTotal)}
                      </>
                    )}
                  </button>
                  <p className="text-center text-[10px] text-slate-400 mt-3 flex items-center justify-center gap-1">
                    <Lock className="w-3 h-3" />
                    Encrypted and Secured by Razorpay
                  </p>
                </div>
              </form>

              <button
                onClick={() => onSetStep("cart")}
                className="w-full py-2 text-slate-500 text-sm hover:underline"
              >
                Back to Cart
              </button>
            </div>
          ) : (
            // --- CART LIST VIEW ---
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-white rounded-xl border border-slate-100 shadow-sm"
                >
                  <div className="w-16 h-16 bg-slate-50 rounded-lg shrink-0 flex items-center justify-center border border-slate-100 overflow-hidden relative">
                    <Image
                      src={getImageUrl(item.images[0])}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold text-slate-900 text-sm truncate pr-2">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => onRemove(item.id)}
                        className="text-slate-400 hover:text-red-500 p-1 -m-1 rounded-sm hover:bg-slate-50 transition-colors"
                        aria-label="Remove item"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateQty(item.id, -1)}
                          className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors text-slate-600"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-sm font-medium w-4 text-center">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => onUpdateQty(item.id, 1)}
                          className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors text-slate-600"
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
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 hover:shadow-xl hover:-translate-y-0.5"
            >
              Checkout <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
