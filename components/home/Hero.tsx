"use client";

import React from "react";
import Link from "next/link";
import { useRequestQuote } from "~/context/RequestQuoteContext";

export default function Hero() {
  const { openQuoteModal } = useRequestQuote();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 w-full">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-surface-container-lowest to-surface-container-low/70 border border-outline-variant/30 p-8 sm:p-12 lg:p-16 text-center shadow-sm">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[280px] bg-primary/10 blur-3xl rounded-full pointer-events-none -z-10" />

        {/* Overline Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high text-on-surface text-xs font-semibold mb-6 shadow-sm border border-outline-variant/20">
          <span className="tracking-wide">DIRECT AUTHORIZED INDIAN DISTRIBUTOR</span>
          <span className="text-outline-variant">•</span>
          <span className="text-on-surface-variant font-medium">ITC-Compliant GST</span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-on-surface tracking-tight leading-[1.12] max-w-4xl mx-auto mb-6">
          Official Tech Licenses &amp; Premium Dashcams, Delivered Across India.
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed mb-8">
          The direct procurement store for developers, enterprises, and vehicle fleets. Instant digital keys or tracked express delivery with 100% compliant Indian GST invoices.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-10">
          <Link
            href="#store"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-on-surface text-on-primary font-bold text-sm hover:bg-inverse-surface active:scale-[0.98] transition-all shadow-md"
          >
            <span className="material-symbols-outlined text-[19px]">shopping_bag</span>
            <span>Browse Online Store</span>
          </Link>
          <button
            type="button"
            onClick={() => openQuoteModal()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-surface-container-lowest text-on-surface font-bold text-sm border border-outline-variant/40 hover:bg-surface-container-low active:scale-[0.98] transition-all shadow-sm cursor-pointer"
          >
            <span>Request Volume Quote (RFQ)</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>

        {/* Integrated Horizontal Trust Ribbon */}
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-outline-variant/30 border border-outline-variant/30 rounded-2xl bg-surface-container-lowest/80 backdrop-blur-sm overflow-hidden text-left">
          <div className="flex items-center gap-3.5 p-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">bolt</span>
            </div>
            <div>
              <p className="text-xs font-bold text-on-surface leading-tight">Instant Key Delivery</p>
              <p className="text-[11px] text-on-surface-variant font-medium">(&lt;60s)</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4">
            <div className="w-10 h-10 rounded-xl bg-tertiary-fixed/60 text-tertiary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">verified_user</span>
            </div>
            <div>
              <p className="text-xs font-bold text-on-surface leading-tight">100% GST Input Credit</p>
              <p className="text-[11px] text-on-surface-variant font-medium">Valid Tax ITC</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">local_shipping</span>
            </div>
            <div>
              <p className="text-xs font-bold text-on-surface leading-tight">Free Pan-India Express</p>
              <p className="text-[11px] text-on-surface-variant font-medium">Air Courier Delivery</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">verified</span>
            </div>
            <div>
              <p className="text-xs font-bold text-on-surface leading-tight">Direct Authorized Importer</p>
              <p className="text-[11px] text-on-surface-variant font-medium">Genuine OEM License</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
