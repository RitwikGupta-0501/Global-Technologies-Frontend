"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";
import { DefaultService } from "@/api/services/DefaultService";
import { ProductSchema } from "@/api/models/ProductSchema";

export default function Navbar() {
  const { cart, setIsCartOpen } = useCart();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<ProductSchema[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const cartCount = cart.length;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await DefaultService.productApiListProducts() as any;
        const productsList = Array.isArray(data) ? data : (data.items || data.results || []);
        setProducts(productsList);
      } catch (error) {
        console.error("Failed to fetch products for search", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredProducts = products
    .filter(
      (p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, 5); // Limit to top 5 results

  return (
    <nav className="fixed w-full z-50 panel-clean">
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
                  unoptimized
                />
              </Link>
            </div>
          </div>
          {/* Search Pill (Desktop) */}
          <div ref={searchRef} className="relative hidden md:flex flex-1 max-w-xl mx-12">
            <label htmlFor="search" className="sr-only">
              Search products, brands, or SKUs
            </label>
            <div className="flex items-center w-full bg-gray-50 border border-gray-200 rounded-xl focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 focus-within:bg-white transition-all group">
              <div className="pl-4 pr-2 text-slate-400 group-focus-within:text-slate-500 pointer-events-none shrink-0">
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
              <input
                id="search"
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                className="flex-1 bg-transparent outline-none text-slate-900 placeholder-slate-400 pr-4 py-3 text-sm"
                placeholder="Search products, brands, or SKUs..."
                aria-describedby="search-help"
              />
            </div>
            {/* Live Search Dropdown */}
            {isSearchOpen && searchQuery.trim() !== "" && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50">
                {filteredProducts.length > 0 ? (
                  <ul className="py-2">
                    {filteredProducts.map((p) => (
                      <li key={p.id}>
                        <Link
                          href={`/product/${p.id}-${p.slug}`}
                          onClick={() => {
                            setIsSearchOpen(false);
                            setSearchQuery("");
                          }}
                          className="flex items-center px-4 py-3 hover:bg-slate-50 transition-colors"
                        >
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-slate-900 truncate">
                              {p.name}
                            </h4>
                            <p className="text-xs text-slate-500 truncate">
                              {p.description}
                            </p>
                          </div>
                          <span className="text-sm font-bold text-slate-900 ml-4 whitespace-nowrap">
                            {p.price_type === "quote" ? "Quote" : `$${p.price}`}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-4 py-8 text-center text-slate-500 text-sm">
                    No products found for &quot;{searchQuery}&quot;
                  </div>
                )}
              </div>
            )}
            </div>
            {/* Actions */}
          <div className="flex items-center gap-6">
            <Link
              href="/support"
              className="btn-ghost text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm"
              aria-label="Visit support page"
            >
              Support
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
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
                className="btn-secondary px-5 py-2.5 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
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
