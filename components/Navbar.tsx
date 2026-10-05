"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";
import { Search, ShoppingCart, LogOut, User as UserIcon, Menu, X, ArrowUpRight } from "lucide-react";
import { DefaultService } from "@/api/services/DefaultService";
import { ProductSchema } from "@/api/models/ProductSchema";

export default function Navbar() {
  const { cart, setIsCartOpen } = useCart();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ProductSchema[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const cartCount = cart.length;

  useEffect(() => {
    const query = searchQuery.trim();
    if (!query) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const data = await DefaultService.productApiListProducts(
          undefined,
          undefined,
          undefined,
          query,
          1,
          5
        );
        const responseObj = data as { items?: ProductSchema[]; results?: ProductSchema[] } | ProductSchema[];
        const list = Array.isArray(responseObj) ? responseObj : (responseObj.items || responseObj.results || []);
        setSearchResults(list);
      } catch (error) {
        console.error("Failed to search products", error);
      } finally {
        setIsSearching(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="fixed top-4 sm:top-6 inset-x-0 z-50 px-4 sm:px-8 pointer-events-none">
        <nav className="pointer-events-auto mx-auto max-w-6xl rounded-2xl sm:rounded-full bg-white/90 border border-slate-200/80 backdrop-blur-2xl shadow-sm px-6 sm:px-8 py-3 sm:py-3.5 flex items-center justify-between transition-all duration-300">
          
          {/* Brand Logo with Generous Clearance */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center py-0.5 focus-visible:outline-2 focus-visible:outline-blue-600 rounded">
              <Image
                src="/logo.png"
                alt="Global Technologies - The Technology Supermarket"
                width={190}
                height={34}
                className="h-6 sm:h-7 w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop Category Navigation: Breathable Text Links (Not cramped pills) */}
          <div className="hidden md:flex items-center gap-7 lg:gap-9">
            <Link
              href="/software"
              className="text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors focus-visible:outline-2 focus-visible:outline-blue-600"
            >
              Software Solutions
            </Link>
            <Link
              href="/hardware"
              className="text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors focus-visible:outline-2 focus-visible:outline-blue-600"
            >
              Korean Dashcams
            </Link>
            <Link
              href="/#catalog"
              className="text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors focus-visible:outline-2 focus-visible:outline-blue-600"
            >
              Catalog &amp; RFQ
            </Link>
          </div>

          {/* Search & Actions Group with Open Air */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            
            {/* Desktop Expandable Search */}
            <div ref={searchRef} className="relative hidden lg:flex items-center">
              <label htmlFor="desktop-search" className="sr-only">
                Search products by name or SKU
              </label>
              
              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-full focus-within:ring-2 focus-within:ring-blue-600/20 focus-within:border-blue-600 focus-within:bg-white transition-all w-36 focus-within:w-60 duration-300">
                <div className="pl-3 pr-1 text-slate-400 pointer-events-none">
                  <Search className="h-3.5 w-3.5" />
                </div>
                <input
                  ref={searchInputRef}
                  id="desktop-search"
                  type="text"
                  role="combobox"
                  aria-expanded={isSearchOpen && searchResults.length > 0}
                  aria-autocomplete="list"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  onFocus={() => setIsSearchOpen(true)}
                  className="flex-1 bg-transparent outline-none text-slate-900 placeholder-slate-400 pr-3 py-1.5 text-xs"
                  placeholder="Search SKUs..."
                />
              </div>

              {/* Live Search Dropdown */}
              {isSearchOpen && searchQuery.trim() !== "" && (
                <div className="absolute top-full right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-50 animate-in fade-in duration-150">
                  {isSearching ? (
                    <div className="px-4 py-5 text-center text-slate-400 text-xs">
                      Searching catalog...
                    </div>
                  ) : searchResults.length > 0 ? (
                    <ul className="py-2 divide-y divide-slate-100 max-h-72 overflow-y-auto">
                      {searchResults.map((p) => (
                        <li key={p.id}>
                          <Link
                            href={`/product/${p.id}-${p.slug}`}
                            onClick={() => {
                              setIsSearchOpen(false);
                              setSearchQuery("");
                            }}
                            className="flex items-center px-4 py-2.5 hover:bg-slate-50 transition-colors"
                          >
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-bold text-slate-900 truncate">
                                {p.name}
                              </h4>
                              <p className="text-[10px] text-slate-500 truncate">
                                {p.description}
                              </p>
                            </div>
                            <span className="text-xs font-bold text-slate-900 ml-3 whitespace-nowrap">
                              {p.price_type === "quote" ? "RFQ" : `₹${p.price}`}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="px-4 py-6 text-center text-slate-400 text-xs">
                      No products found for &quot;{searchQuery}&quot;
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Cart Trigger Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative min-w-[44px] min-h-[44px] flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-600"
              aria-label={`View shopping cart with ${cartCount} items`}
            >
              <ShoppingCart className="h-4 w-4" />
              {cartCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </button>

            {/* User Auth Portal */}
            {user ? (
              <div className="flex items-center gap-1.5">
                <Link
                  href="/orders"
                  className="hidden sm:inline-flex items-center text-xs font-medium text-slate-700 hover:text-slate-900 px-3 py-1.5 rounded-full hover:bg-slate-100 transition-colors"
                >
                  My Orders
                </Link>
                <button
                  onClick={logout}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-600"
                  aria-label="Log out of partner account"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/auth"
                className="hidden sm:inline-flex items-center gap-2 bg-slate-900 text-white hover:bg-slate-800 px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-xs active:scale-[0.98] min-h-[40px]"
              >
                <UserIcon className="w-3.5 h-3.5 text-slate-300" />
                <span>Partner Login</span>
              </Link>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-600"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </nav>
      </header>

      {/* Mobile Slide-Over Navigation Sheet */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-slate-950/40 backdrop-blur-sm transition-opacity">
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-2xl p-6 flex flex-col justify-between pt-24 border-l border-slate-200">
            <div>
              {/* Mobile Search */}
              <div className="mb-6">
                <label htmlFor="mobile-search" className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Quick SKU Search
                </label>
                <div className="flex items-center w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5">
                  <Search className="h-4 w-4 text-slate-400 mr-2 shrink-0" />
                  <input
                    id="mobile-search"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search software, SKUs..."
                    className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder-slate-400"
                  />
                </div>
                {searchQuery.trim() !== "" && searchResults.length > 0 && (
                  <div className="mt-2 bg-slate-50 rounded-xl border border-slate-200 divide-y divide-slate-100 max-h-48 overflow-y-auto">
                    {searchResults.map((p) => (
                      <Link
                        key={p.id}
                        href={`/product/${p.id}-${p.slug}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-100"
                      >
                        <div className="truncate">{p.name}</div>
                        <div className="text-[10px] text-blue-600 font-bold">{p.price_type === "quote" ? "RFQ" : `₹${p.price}`}</div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Links */}
              <div className="space-y-1">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
                  Product Divisions
                </p>
                <Link
                  href="/software"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100 transition-colors"
                >
                  <span>Commercial Software</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400" />
                </Link>
                <Link
                  href="/hardware"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100 transition-colors"
                >
                  <span>Imported Korean Dashcams</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400" />
                </Link>
                <Link
                  href="/#catalog"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100 transition-colors"
                >
                  <span>Full Catalog &amp; RFQ</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400" />
                </Link>
                {user && (
                  <Link
                    href="/orders"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100 transition-colors"
                  >
                    <span>My Orders &amp; Invoices</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-400" />
                  </Link>
                )}
              </div>
            </div>

            {/* Mobile Footer Auth */}
            <div className="pt-6 border-t border-slate-100">
              {user ? (
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-100 text-slate-700 text-sm font-bold hover:bg-slate-200 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              ) : (
                <Link
                  href="/auth"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition-colors shadow-sm"
                >
                  <UserIcon className="w-4 h-4" />
                  <span>Partner Login</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
