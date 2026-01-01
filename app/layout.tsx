import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";

import { CartProvider } from "~/context/CartContext";
import GlobalCart from "~/components/GlobalCart";

import { OpenAPI } from "@/api/core/OpenAPI";
OpenAPI.BASE = "http://127.0.0.1:8000";

// Font: Inter (Body)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Font: Plus Jakarta Sans (Headings)
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Global Technologies | Home",
  description: "Distributors of premium software and hardware solutions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="bg-slate-50 text-slate-600 font-sans antialiased selection:bg-brand-blue selection:text-white">
        <CartProvider>
          {children}
          <GlobalCart />
        </CartProvider>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
