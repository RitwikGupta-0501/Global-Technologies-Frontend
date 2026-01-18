"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";

export default function Navbar() {
  const { cart, setIsCartOpen } = useCart();
  const { user, logout } = useAuth();

  const cartCount = cart.length;

  return (
    <nav className="fixed w-full z-50 glass-panel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center">
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="Global Technologies"
                  width={200}
                  height={1000}
                  quality={100}
                  unoptimized
                />
              </Link>
            </div>
          </div>
          {/* Search Pill (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-xl mx-12">
            <label htmlFor="search" className="sr-only">
              Search products, brands, or SKUs
            </label>
            <div className="relative w-full group">
              <input
                id="search"
                type="text"
                className="input-pill block w-full pl-12 pr-4 py-3 bg-slate-100/80 text-slate-900 placeholder-slate-500 transition-all shadow-inner focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-xl border border-slate-200"
                placeholder="Search products, brands, or SKUs..."
                aria-describedby="search-help"
              />
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-slate-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
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
              href="/support"
              className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm"
              aria-label="Visit support page"
            >
              Support
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-slate-600 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg cursor-pointer"
              aria-label={`View cart, ${cartCount} items`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cartCount > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg border-2 border-white ring-2 ring-white/50 min-w-5">
                  {cartCount > 99 ? "99+" : cartCount}
                </div>
              )}
            </button>

            {user ? (
              <div className="flex items-center gap-4">
                <span className="hidden md:block text-sm font-semibold text-slate-700">
                  Hi, {user.first_name}
                </span>
                <button
                  onClick={logout}
                  className="bg-slate-200 text-slate-700 px-5 py-2.5 rounded-full text-sm font-bold hover:bg-slate-300 transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/auth"
                className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 active:scale-[0.98]"
                aria-label="Partner login portal"
              >
                Partner Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
