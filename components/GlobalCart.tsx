"use client";
import React from "react";
import CartSidebar from "./home/CartSidebar"; // Adjust path as needed
import { useCart } from "../context/CartContext";

export default function GlobalCart() {
  const cartData = useCart(); // Access the context

  // We wrap the handleFormSubmit here or inside Context if it's generic
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    cartData.setCheckoutStep("success");
    // Add your actual API submission logic here or in Context
  };

  return (
    <CartSidebar
      cart={cartData.cart}
      isCartOpen={cartData.isCartOpen}
      checkoutStep={cartData.checkoutStep}
      checkoutMode={cartData.checkoutMode}
      cartTotal={cartData.cartTotal}
      fixedItemsCount={cartData.fixedItemsCount}
      quoteItemsCount={cartData.quoteItemsCount}
      formatPrice={cartData.formatPrice}
      onClose={() => cartData.setIsCartOpen(false)}
      onReset={cartData.resetCart}
      onProceed={cartData.handleProceed}
      onUpdateQty={cartData.updateQty}
      onRemove={cartData.removeFromCart}
      onSetStep={cartData.setCheckoutStep}
      onSetMode={cartData.setCheckoutMode}
      onSubmitForm={handleFormSubmit}
    />
  );
}
