"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 glass-panel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue to-brand-green flex items-center justify-center text-white shadow-lg">
              {/* Globe Icon SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-xl text-slate-900 leading-none">
                NEXGEN
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Distribution
              </span>
            </div>
          </div>

          {/* Search Pill (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-xl mx-12">
            <div className="relative w-full group">
              <input
                type="text"
                className="input-pill block w-full pl-12 pr-4 py-3 bg-slate-100 text-slate-600 placeholder-slate-400 transition-all shadow-inner focus:bg-white"
                placeholder="Search products, brands, or SKUs..."
              />
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-sm font-semibold text-slate-500 hover:text-brand-blue transition-colors"
            >
              Support
            </Link>
            <button className="relative p-2 text-slate-500 hover:text-brand-blue transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-brand-green rounded-full border-2 border-white"></span>
            </button>
            <button className="bg-brand-navy text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl">
              Partner Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
