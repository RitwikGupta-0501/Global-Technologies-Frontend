import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import { Toaster } from "sonner";
import { Geist, Plus_Jakarta_Sans } from "next/font/google";

import { CartProvider } from "~/context/CartContext";
import GlobalCart from "~/components/GlobalCart";
import { AuthProvider } from "~/context/AuthContext";

import { RequestQuoteProvider } from "../context/RequestQuoteContext";
import RequestQuoteModal from "../components/RequestQuoteModal";

import { OpenAPI } from "@/api/core/OpenAPI";
OpenAPI.BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

// Font: Geist (Body & Data)
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

// Font: Plus Jakarta Sans (Headings)
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Global Technologies | Software Distribution & Korean Dashcams",
  description:
    "The Technology Supermarket — Genuine software licensing, volume multi-seat bundling, official GST input credit invoicing, and imported Korean vehicle dashcams.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} ${jakarta.variable}`}>
      <body className="bg-[#f8fafc] text-slate-700 font-sans antialiased selection:bg-blue-600 selection:text-white">
        <a
          href="#catalog"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-blue-600 text-white rounded-xl font-bold shadow-lg focus:outline-none"
        >
          Skip to catalog
        </a>
        <AuthProvider>
          <CartProvider>
            <RequestQuoteProvider>
              {children}
              <RequestQuoteModal />
            </RequestQuoteProvider>
            <GlobalCart />
          </CartProvider>
        </AuthProvider>
        <Toaster position="top-right" richColors />
        {/* Load Razorpay SDK */}
        <Script
          id="razorpay-checkout-js"
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
