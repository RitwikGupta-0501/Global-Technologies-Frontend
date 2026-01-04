"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { ProductSchema } from "@/api/models/ProductSchema";

interface RequestQuoteContextType {
  isOpen: boolean;
  selectedProduct: ProductSchema | null;
  openQuoteModal: (product: ProductSchema) => void;
  closeQuoteModal: () => void;
}

const RequestQuoteContext = createContext<RequestQuoteContextType | undefined>(
  undefined,
);

export function RequestQuoteProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductSchema | null>(
    null,
  );

  const openQuoteModal = (product: ProductSchema) => {
    setSelectedProduct(product);
    setIsOpen(true);
    // Optional: Prevent background scrolling
    document.body.style.overflow = "hidden";
  };

  const closeQuoteModal = () => {
    setIsOpen(false);
    setSelectedProduct(null);
    document.body.style.overflow = "unset";
  };

  return (
    <RequestQuoteContext.Provider
      value={{ isOpen, selectedProduct, openQuoteModal, closeQuoteModal }}
    >
      {children}
    </RequestQuoteContext.Provider>
  );
}

export const useRequestQuote = () => {
  const context = useContext(RequestQuoteContext);
  if (!context) {
    throw new Error(
      "useRequestQuote must be used within a RequestQuoteProvider",
    );
  }
  return context;
};
