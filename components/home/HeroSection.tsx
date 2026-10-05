"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search, FileText } from "lucide-react";
import { useRequestQuote } from "~/context/RequestQuoteContext";

export default function HeroSection() {
  const { openQuoteModal } = useRequestQuote();
  const [heroSearch, setHeroSearch] = useState("");

  const quickPills = [
    { label: "Unity Pro", query: "Unity" },
    { label: "Red Hat Linux", query: "Red Hat" },
    { label: "Quick Heal", query: "Quick Heal" },
    { label: "Korean Dashcams", href: "/hardware" },
    { label: "Antivirus & Security", href: "/software" },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      window.location.href = `/#catalog`;
    }
  };

  return (
    <section className="relative pt-36 sm:pt-48 pb-20 sm:pb-28 overflow-hidden bg-white border-b border-slate-200/80">
      
      {/* Precision Subtle Background Grid */}
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none bg-[radial-gradient(#0f172a_1px,transparent_1px)] [background-size:28px_28px]" 
        aria-hidden="true" 
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-4xl flex flex-col items-start text-left">

          {/* Display Headline - Wide, Authoritative, No Eyebrow */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.04] mb-8">
            Genuine Commercial Licensing. <br />
            <span className="text-blue-700">Instant Digital Activation.</span>
          </h1>

          {/* Editorial Subtext */}
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl font-normal leading-relaxed mb-10">
            Authorized Indian distributor for commercial software suites, multi-seat developer tools, and direct vendor activation keys. Official GST tax invoices on every order for corporate input credit.
          </p>

          {/* Integrated Fast SKU Search Bar */}
          <div className="w-full max-w-2xl mb-8">
            <form 
              onSubmit={handleSearchSubmit} 
              className="relative flex items-center bg-slate-50 border border-slate-300 rounded-2xl p-2 focus-within:ring-2 focus-within:ring-blue-600/20 focus-within:border-blue-600 focus-within:bg-white transition-all shadow-xs"
            >
              <div className="pl-3.5 pr-2 text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                placeholder="Search 100+ commercial licenses, Unity seats, Red Hat, or dashcams..."
                className="flex-1 bg-transparent text-sm sm:text-base text-slate-900 placeholder-slate-400 outline-none pr-3 py-1.5"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer shrink-0"
              >
                Search Catalog
              </button>
            </form>

            {/* Quick Jump Category Pills */}
            <div className="flex flex-wrap items-center gap-2 mt-3.5 text-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Quick Jump:</span>
              {quickPills.map((pill, idx) => (
                pill.href ? (
                  <Link
                    key={idx}
                    href={pill.href}
                    className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors"
                  >
                    {pill.label}
                  </Link>
                ) : (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setHeroSearch(pill.query || "")}
                    className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 font-medium transition-colors cursor-pointer"
                  >
                    {pill.label}
                  </button>
                )
              ))}
            </div>
          </div>

          {/* Action Row: High-Contrast Dual CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/software"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98] min-h-[44px]"
            >
              <span>Explore Software Catalog</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <button
              type="button"
              onClick={() => openQuoteModal()}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-sm transition-all duration-200 active:scale-[0.98] cursor-pointer min-h-[44px]"
            >
              <FileText className="w-4 h-4 text-blue-600" />
              <span>Request Enterprise RFQ</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
