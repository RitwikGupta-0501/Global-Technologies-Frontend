"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import CartSidebar, { CheckoutFormData } from "./home/CartSidebar";
import { useCart } from "~/context/CartContext";
import { useAuth } from "~/context/AuthContext";
import { DefaultService } from "@/api/services/DefaultService";
import { ApiError } from "@/api/core/ApiError";

// --- Types for Razorpay ---
interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: any) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
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
      // Filter only fixed items (just in case)
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

      // 2. Call Backend: INITIATE ORDER
      const orderData = await DefaultService.orderApiInitiateOrder({
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
        key: orderData.key_id, // Public Key from backend response
        amount: orderData.amount * 100, // Amount in paise
        currency: orderData.currency,
        name: "Global Technologies",
        description: `Order #${orderData.order_id}`,
        order_id: orderData.razorpay_order_id, // The critical Razorpay Order ID
        handler: async function (response: any) {
          // 4. Payment Success -> Call Backend: VERIFY
          try {
            await DefaultService.orderApiVerifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            // 5. Success State
            toast.success("Payment Successful!");
            resetCart(); // Clears cart and sets step to 'cart'
            setCheckoutStep("success"); // Override step to show success message
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
          color: "#0f172a", // Slate-900 (Matches your brand)
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error(error);
      if (error instanceof ApiError) {
        toast.error(
          `Checkout failed: ${error.body?.message || error.statusText}`,
        );
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartSidebar
      cart={cart}
      isCartOpen={isCartOpen}
      checkoutStep={checkoutStep}
      cartTotal={cartTotal}
      loading={loading} // <--- Pass loading state
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
      onSubmitForm={handleCheckoutSubmit} // <--- Pass the new handler
    />
  );
}
