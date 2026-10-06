"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import CartSidebar, { CheckoutFormData } from "./home/CartSidebar";
import { useCart } from "~/context/CartContext";
import { useAuth } from "~/context/AuthContext";
import { DefaultService } from "@/api/services/DefaultService";
import { ApiError } from "@/api/core/ApiError";

// --- Types for Razorpay ---
interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
}

interface RazorpayInstance {
  open: () => void;
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

export default function GlobalCart() {
  const {
    cart,
    isCartOpen,
    checkoutStep,
    cartTotal,
    setIsCartOpen,
    setCheckoutStep,
    resetCart,
    clearCart,
    formatPrice,
    handleProceed,
    updateQty,
    removeFromCart,
  } = useCart();

  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  // --- HANDLE CHECKOUT SUBMISSION ---
  const handleCheckoutSubmit = async (formData: CheckoutFormData) => {
    if (!user) {
      toast.error("You must be logged in to checkout");
      return;
    }

    setLoading(true);

    try {
      // 1. Prepare Payload
      const itemsPayload = cart
        .filter((item) => item.price_type === "fixed")
        .map((item) => ({
          product_id: item.id,
          quantity: item.qty,
        }));

      if (itemsPayload.length === 0) {
        toast.error("Your cart contains no purchasable items.");
        setLoading(false);
        return;
      }

      // 1. Generate Idempotency Key
      const idempotencyKey =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `idemp_${Date.now()}`;

      // 2. Call Backend: INITIATE ORDER
      const orderData = await DefaultService.orderApiInitiateOrder({
        idempotency_key: idempotencyKey,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        company_name: formData.companyName,
        gstin: formData.gstin,
        save_info: formData.saveInfo,
        billing_address: {
          address_line1: formData.billingAddress.line1,
          address_line2: formData.billingAddress.line2,
          city: formData.billingAddress.city,
          state: formData.billingAddress.state,
          pincode: formData.billingAddress.pincode,
        },
        shipping_address: {
          address_line1: formData.shippingAddress.line1,
          address_line2: formData.shippingAddress.line2,
          city: formData.shippingAddress.city,
          state: formData.shippingAddress.state,
          pincode: formData.shippingAddress.pincode,
        },
        items: itemsPayload,
      });

      // 3. Open Razorpay Popup
      const options: RazorpayOptions = {
        key: orderData.key_id,
        amount:
          (orderData as { amount_paise?: number; amount: number }).amount_paise ??
          Math.round(Number(orderData.amount) * 100),
        currency: orderData.currency,
        name: "Global Technologies",
        description: `Order #${orderData.order_id}`,
        order_id: orderData.razorpay_order_id,
        handler: async function (response: RazorpayResponse) {
          try {
            await DefaultService.orderApiVerifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            toast.success("Payment Successful!");
            clearCart();
            setCheckoutStep("success");
          } catch (verifyError) {
            console.error("Verification Failed", verifyError);
            toast.error("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#0f172a",
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
            toast.info("Payment window closed. Your order is reserved and you may retry.");
          },
        },
      };

      if (!window.Razorpay) {
        toast.error("Payment system is unavailable. Please refresh and try again.");
        setLoading(false);
        return;
      }

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error(error);
      if (error instanceof ApiError) {
        toast.error(`Checkout failed: ${error.body?.message || error.statusText}`);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CartSidebar
        cart={cart}
        isCartOpen={isCartOpen}
        checkoutStep={checkoutStep}
        cartTotal={cartTotal}
        loading={loading}
        formatPrice={formatPrice}
        onClose={() => setIsCartOpen(false)}
        onReset={() => {
          resetCart();
          setIsCartOpen(false);
        }}
        onProceed={handleProceed}
        onUpdateQty={updateQty}
        onRemove={removeFromCart}
        onSetStep={setCheckoutStep}
        onSubmitForm={handleCheckoutSubmit}
      />

      {/* FLOATING CART REMINDER PILL (Matching landing_stitch.html) */}
      {cart.length > 0 && !isCartOpen && (
        <aside className="fixed bottom-6 right-6 z-40 transition-transform duration-300 transform translate-y-0">
          <button
            onClick={() => setIsCartOpen(true)}
            type="button"
            className="flex items-center gap-4 px-5 py-3.5 rounded-full bg-on-surface/95 text-on-primary backdrop-blur-xl shadow-2xl hover:scale-105 active:scale-95 transition-all border border-white/10 cursor-pointer"
          >
            <div className="relative flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px] text-on-primary">
                shopping_bag
              </span>
              <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-primary text-on-primary text-[10px] font-bold flex items-center justify-center">
                {cart.length}
              </span>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[11px] text-secondary-fixed leading-tight">
                {cart.length} {cart.length === 1 ? "item" : "items"} in cart
              </span>
              <span className="text-sm font-bold text-on-primary">
                ₹{cartTotal.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="w-7 h-7 rounded-full bg-surface-container-lowest/20 flex items-center justify-center ml-1">
              <span className="material-symbols-outlined text-[16px] text-on-primary">
                arrow_forward
              </span>
            </div>
          </button>
        </aside>
      )}
    </>
  );
}
