"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useRequestQuote } from "../context/RequestQuoteContext";
import { DefaultService } from "@/api/services/DefaultService";
import { ProductSchema } from "@/api/models/ProductSchema";

export default function Navbar() {
  const { cart, setIsCartOpen } = useCart();
  const { user, logout } = useAuth();
  const { openQuoteModal } = useRequestQuote();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ProductSchema[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(96);

  const searchRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const cartCount = cart.length;

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };
    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);
    return () => window.removeEventListener("resize", updateHeaderHeight);
  }, []);

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

  // Prevent background scrolling when mobile navigation drawer is open
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

  // Handle ESC key to dismiss drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/95 backdrop-blur-xl border-b border-outline-variant/30 shadow-[0_1px_12px_rgba(0,0,0,0.04)]">
      {/* 1. Top Utility Bar */}
      <div className="bg-inverse-surface text-inverse-on-surface text-xs font-medium border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 truncate">
            <span className="inline-flex items-center gap-1.5 text-tertiary-fixed-dim font-semibold shrink-0">
              <span className="material-symbols-outlined text-[15px]">verified</span>
              100% Verified GST Invoices
            </span>
            <span className="text-white/20 hidden sm:inline">•</span>
            <span className="hidden sm:inline text-inverse-on-surface/90 truncate">
              Express Pan-India Delivery
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-xs shrink-0">
            <span className="flex items-center gap-1 cursor-default text-inverse-on-surface/90">
              <span className="material-symbols-outlined text-[14px]">currency_rupee</span>INR (₹)
            </span>
            <span className="hidden sm:inline-block text-white/20">|</span>
            <button
              onClick={() => openQuoteModal()}
              type="button"
              className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors text-inverse-on-surface/90"
            >
              <span className="material-symbols-outlined text-[15px] text-tertiary-fixed-dim">support_agent</span>
              Enterprise Procurement Desk
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4 lg:gap-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <img
            alt="Global-Tech"
            className="h-8 w-auto object-contain"
            src="/logo.png"
          />
        </Link>

        {/* Enhanced Search */}
        <div ref={searchRef} className="flex-1 max-w-2xl hidden md:flex items-center relative bg-surface-container-low border border-outline-variant/40 rounded-xl px-3 py-1.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all">
          <span className="material-symbols-outlined text-outline text-[18px] mr-2">search</span>
          <label htmlFor="global-search-input" className="sr-only">Search catalog</label>
          <input
            id="global-search-input"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearchOpen(true);
            }}
            onFocus={() => setIsSearchOpen(true)}
            className="w-full bg-transparent text-sm text-on-surface focus:outline-none placeholder:text-outline/80 border-none"
            placeholder="Search enterprise SKUs, Microsoft licenses, fleet dashcams..."
            type="text"
          />

          {/* Live Search Dropdown */}
          {isSearchOpen && searchQuery.trim() !== "" && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-surface-container-lowest rounded-2xl shadow-xl border border-outline-variant/40 overflow-hidden z-50">
              {isSearching ? (
                <div className="px-4 py-5 text-center text-outline text-xs">
                  Searching catalog...
                </div>
              ) : searchResults.length > 0 ? (
                <ul className="py-2 divide-y divide-surface-container-low max-h-72 overflow-y-auto">
                  {searchResults.map((p) => (
                    <li key={p.id}>
                      <Link
                        href={`/product/${p.id}-${p.slug}`}
                        onClick={() => {
                          setIsSearchOpen(false);
                          setSearchQuery("");
                        }}
                        className="flex items-center px-4 py-2.5 hover:bg-surface-container-low transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-on-surface truncate">
                            {p.name}
                          </h4>
                          <p className="text-[10px] text-on-surface-variant truncate">
                            {p.description}
                          </p>
                        </div>
                        <span className="text-xs font-bold text-primary ml-3 whitespace-nowrap">
                          {p.price_type === "quote" ? "RFQ" : `₹${p.price}`}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-4 py-5 text-center text-outline text-xs">
                  No products found for &quot;{searchQuery}&quot;
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Items */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => openQuoteModal()}
            type="button"
            className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-primary text-primary hover:bg-primary/5 text-sm font-bold transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add_box</span>
            <span>Request Product</span>
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            type="button"
            className="flex items-center gap-1.5 sm:gap-2 bg-primary-container hover:bg-primary text-on-primary font-semibold text-xs sm:text-sm px-2.5 sm:px-4 py-2 rounded-xl transition-all shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] sm:text-[19px]">shopping_bag</span>
            <span id="header-cart-label" className="whitespace-nowrap">
              <span className="hidden sm:inline">Cart </span>({cartCount})
            </span>
          </button>

          {user ? (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href="/orders"
                className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-primary font-semibold hover:bg-surface-container-highest transition-colors"
                title="My Orders"
              >
                <span className="material-symbols-outlined text-[19px]">receipt_long</span>
              </Link>
              <button
                onClick={logout}
                type="button"
                className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-error transition-colors cursor-pointer"
                title="Log Out"
              >
                <span className="material-symbols-outlined text-[19px]">logout</span>
              </button>
            </div>
          ) : (
            <Link
              href="/auth"
              className="hidden sm:flex w-9 h-9 rounded-full bg-surface-container-high items-center justify-center text-primary font-semibold hover:bg-surface-container-highest transition-colors"
              title="Partner Login"
            >
              <span className="material-symbols-outlined text-[19px]">person</span>
            </Link>
          )}

          {/* Mobile Menu / Downwards Toggle Button (Apple-style 2-line morphing icon) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            type="button"
            className="md:hidden relative w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors duration-200 cursor-pointer shrink-0 active:scale-95"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
          >
            <div className="w-4 h-2 relative flex flex-col justify-between pointer-events-none">
              <span
                className={`w-full h-0.5 bg-current rounded-full transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${
                  isMobileMenuOpen ? "translate-y-[3px] rotate-45" : ""
                }`}
              />
              <span
                className={`w-full h-0.5 bg-current rounded-full transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${
                  isMobileMenuOpen ? "-translate-y-[3px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* 3. Edge-to-Edge Clean Horizontal Nav Bar (Hidden on Mobile, Displayed on Desktop) */}
      <div className="hidden md:block bg-surface-container-low/60 border-t border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-8 overflow-x-auto whitespace-nowrap py-2 text-sm font-medium">
            <Link
              href="/#store"
              className="flex items-center gap-2 text-primary font-bold border-b-2 border-primary py-1"
            >
              <span>Store</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">
                All Products
              </span>
            </Link>
            <Link
              href="/software"
              className="text-on-surface-variant hover:text-primary transition-colors py-1"
            >
              Commercial Software
            </Link>
            <Link
              href="/hardware"
              className="text-on-surface-variant hover:text-primary transition-colors py-1"
            >
              Dashcams &amp; Fleet
            </Link>
            <a
              href="#enterprise-banner"
              className="text-on-surface-variant hover:text-primary transition-colors py-1"
            >
              GST &amp; B2B Invoicing
            </a>
            <button
              onClick={() => openQuoteModal()}
              type="button"
              className="text-on-surface-variant hover:text-primary transition-colors py-1 cursor-pointer"
            >
              Request Quote (RFQ)
            </button>
          </nav>
        </div>
      </div>

    </header>

    {/* 4. Downwards Expanding Mobile Navigation Panel (Apple-style GPU translateY) */}
    <div
      className="fixed inset-x-0 bottom-0 z-40 overflow-hidden pointer-events-none md:hidden"
      style={{ top: `${headerHeight}px` }}
      aria-hidden={!isMobileMenuOpen}
    >
      <div
        className={`w-full max-h-full overflow-y-auto bg-surface-container-lowest/98 backdrop-blur-2xl border-b border-outline-variant/30 shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform motion-reduce:transition-none ${
          isMobileMenuOpen
            ? "translate-y-0 pointer-events-auto"
            : "-translate-y-full pointer-events-none"
        }`}
      >
        {/* Mobile Search Bar */}
        <div className="p-4 border-b border-outline-variant/20 bg-surface-container-low/30">
          <div className="relative flex items-center bg-surface-container-lowest rounded-xl px-3 py-2 border border-outline-variant/40 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">
            <span className="material-symbols-outlined text-outline text-[18px] mr-2">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search enterprise SKUs, licenses..."
              className="w-full bg-transparent text-sm text-on-surface outline-none placeholder:text-outline"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-outline hover:text-on-surface"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">cancel</span>
              </button>
            )}
          </div>

          {/* Live Search Results in Expanded Menu */}
          {searchQuery.trim() !== "" && (
            <div className="mt-2 bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-md overflow-hidden">
              {isSearching ? (
                <div className="p-3 text-center text-xs text-outline">Searching catalog...</div>
              ) : searchResults.length > 0 ? (
                <ul className="divide-y divide-surface-container-low max-h-48 overflow-y-auto">
                  {searchResults.map((p) => (
                    <li key={p.id}>
                      <Link
                        href={`/product/${p.id}-${p.slug}`}
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setSearchQuery("");
                        }}
                        className="flex items-center justify-between p-2.5 hover:bg-surface-container-low text-xs"
                      >
                        <span className="font-medium text-on-surface truncate pr-2">{p.name}</span>
                        <span className="font-bold text-primary shrink-0">₹{p.price}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-3 text-center text-xs text-outline">No products found</div>
              )}
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <div className="p-4 space-y-5">
          {/* Storefront Sections */}
          <div className="space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-outline px-3 mb-1.5">
              Storefront Navigation
            </div>
            <Link
              href="/#store"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl font-bold text-primary bg-primary/5 hover:bg-primary/10 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">storefront</span>
                <span>Storefront (All Products)</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary text-on-primary">
                Catalog
              </span>
            </Link>

            <Link
              href="/software"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-on-surface hover:bg-surface-container-low transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px] text-primary">terminal</span>
                <span>Commercial Software</span>
              </div>
              <span className="material-symbols-outlined text-[16px] text-outline">chevron_right</span>
            </Link>

            <Link
              href="/hardware"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-on-surface hover:bg-surface-container-low transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px] text-tertiary">videocam</span>
                <span>Vehicle Dashcams &amp; Fleet</span>
              </div>
              <span className="material-symbols-outlined text-[16px] text-outline">chevron_right</span>
            </Link>

            <a
              href="#enterprise-banner"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-on-surface hover:bg-surface-container-low transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px] text-outline">receipt_long</span>
                <span>GST Invoicing &amp; ITC</span>
              </div>
              <span className="material-symbols-outlined text-[16px] text-outline">chevron_right</span>
            </a>
          </div>

          {/* Procurement Actions */}
          <div className="space-y-2 pt-2 border-t border-outline-variant/20">
            <div className="text-[11px] font-bold uppercase tracking-wider text-outline px-3 mb-1">
              Enterprise Procurement
            </div>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openQuoteModal();
              }}
              type="button"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-primary text-primary hover:bg-primary/5 text-sm font-bold transition-all cursor-pointer active:scale-98"
            >
              <span className="material-symbols-outlined text-[18px]">add_box</span>
              <span>Request Product / RFQ</span>
            </button>
          </div>

          {/* Partner Account & Orders */}
          <div className="space-y-2 pt-2 border-t border-outline-variant/20">
            <div className="text-[11px] font-bold uppercase tracking-wider text-outline px-3 mb-1">
              Account &amp; Orders
            </div>
            {user ? (
              <div className="space-y-2">
                <div className="px-3 py-2 bg-surface-container-low rounded-xl flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-primary">account_circle</span>
                  <div className="text-xs truncate">
                    <span className="font-bold text-on-surface block">{user.first_name || user.email}</span>
                    <span className="text-outline text-[11px]">{user.email}</span>
                  </div>
                </div>
                <Link
                  href="/orders"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-on-surface hover:bg-surface-container-low"
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">receipt</span>
                    My Orders &amp; Invoices
                  </span>
                  <span className="material-symbols-outlined text-[16px] text-outline">chevron_right</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  type="button"
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium text-error hover:bg-error/10 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                href="/auth"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-primary text-on-primary text-sm font-bold hover:bg-primary/90 transition-all shadow-sm active:scale-98"
              >
                <span className="material-symbols-outlined text-[18px]">person</span>
                <span>Partner Portal Login</span>
              </Link>
            )}
          </div>
        </div>

        {/* Footer Notice */}
        <div className="p-3 border-t border-outline-variant/30 bg-surface-container-low/50 text-xs text-outline flex items-center justify-between">
          <span className="flex items-center gap-1.5 font-bold text-tertiary">
            <span className="material-symbols-outlined text-[14px]">verified</span>
            100% Verified GST Invoices
          </span>
          <span className="text-[11px] text-on-surface-variant">Pan-India Express Delivery</span>
        </div>
      </div>
    </div>

    {/* Backdrop overlay with smooth fade transition */}
    <div
      className={`fixed inset-0 z-30 bg-black/40 backdrop-blur-xs md:hidden transition-opacity duration-300 ease-out motion-reduce:transition-none ${
        isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      onClick={() => setIsMobileMenuOpen(false)}
      aria-hidden="true"
    />
    </>
  );
}
