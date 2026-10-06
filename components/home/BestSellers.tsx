"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "~/context/CartContext";
import { useRequestQuote } from "~/context/RequestQuoteContext";
import { toast } from "sonner";
import { ProductSchema } from "@/api/models/ProductSchema";
import { getImageUrl } from "@/lib/utils";

interface FeaturedProduct {
  id: string;
  name: string;
  category: "software" | "hardware";
  categoryBadge: string;
  badgeClass: string;
  statusBadge: string;
  statusIcon: string;
  statusClass: string;
  subtitle: string;
  description: string;
  priceFormatted: string;
  priceUnit: string;
  gstNote: string;
  gstNoteClass: string;
  priceNum: number;
  imageUrl: string;
  imageAlt: string;
  secondaryCtaText: string;
  secondaryCtaAction: "buy" | "rfq" | "details";
  schema: ProductSchema;
}

const defaultProducts: FeaturedProduct[] = [
  {
    id: "prod-jetbrains",
    name: "JetBrains All Products Pack",
    category: "software",
    categoryBadge: "SOFTWARE",
    badgeClass: "bg-secondary-container text-on-secondary-container",
    statusBadge: "Instant Key",
    statusIcon: "bolt",
    statusClass: "text-primary bg-surface-container",
    subtitle: "Developer License • Commercial Sub",
    description: "Complete toolset with 16 IDEs including IntelliJ IDEA Ultimate, WebStorm, and PyCharm for enterprise teams.",
    priceFormatted: "₹57,999",
    priceUnit: "/ year",
    gstNote: "+18% GST Claimable (₹10,440 ITC)",
    gstNoteClass: "text-tertiary",
    priceNum: 57999,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBONu90Bnl6cjeqcS22QSHn_neqBVAgKgWt6SbIoftNrn1A7kYRWm4L4XRLWpJPzU4TBkSaH2m4Lgy9tMy0Z-Rz_erYeD1RnJ_Y_HM12w5YxCeU_YgaSCLQQVpoxFb1ZTj7UlldsQWVmAhVq2v0CAwEZZ8_K0BpPVHN-VuZ4YPLi_UTlThZor2i3cW9SpQi9HXH_zKHCOy3tyPL5K-781Dd22u_fk9d9vH6NT0P5V-7lYqnxp9SaDqa",
    imageAlt: "JetBrains All Products Pack Box Packaging",
    secondaryCtaText: "Buy Now",
    secondaryCtaAction: "buy",
    schema: {
      id: 99101,
      name: "JetBrains All Products Pack",
      slug: "jetbrains-all-products-pack",
      category: "Software",
      type: "Commercial License",
      description: "Complete toolset with 16 IDEs including IntelliJ IDEA Ultimate, WebStorm, and PyCharm for enterprise teams.",
      price: "57999",
      price_type: "fixed",
      rating: 5,
      reviews: 128,
      images: [getImageUrl("https://lh3.googleusercontent.com/aida-public/AB6AXuBONu90Bnl6cjeqcS22QSHn_neqBVAgKgWt6SbIoftNrn1A7kYRWm4L4XRLWpJPzU4TBkSaH2m4Lgy9tMy0Z-Rz_erYeD1RnJ_Y_HM12w5YxCeU_YgaSCLQQVpoxFb1ZTj7UlldsQWVmAhVq2v0CAwEZZ8_K0BpPVHN-VuZ4YPLi_UTlThZor2i3cW9SpQi9HXH_zKHCOy3tyPL5K-781Dd22u_fk9d9vH6NT0P5V-7lYqnxp9SaDqa")],
      features: ["16 IDEs", "IntelliJ IDEA", "WebStorm", "PyCharm"],
    },
  },
  {
    id: "prod-dashcam",
    name: "GT-4K Dual Elite Dashcam (Front + Rear)",
    category: "hardware",
    categoryBadge: "HARDWARE",
    badgeClass: "bg-tertiary-fixed text-on-tertiary-fixed",
    statusBadge: "In Stock",
    statusIcon: "local_shipping",
    statusClass: "text-tertiary bg-tertiary-fixed/40",
    subtitle: "Automotive Hardware • Sony STARVIS 2",
    description: "True 4K UHD Front + 1080p Rear with Supercapacitor, dual-band 5GHz Wi-Fi, and 64GB High-Endurance card included.",
    priceFormatted: "₹14,499",
    priceUnit: "incl. GST",
    gstNote: "Free Express Air Courier Pan-India",
    gstNoteClass: "text-secondary",
    priceNum: 14499,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAuQhXmBu8UjfAZcv4altbkTA_1iADXJWgpuSjYkv0987hl0rtqOvldKQkf6wX16oThbzqUlEF7rcY4gUZKXzzaaH0mrcaPjc4nz1-NsH2bLm5vw9sS1kz2KUdMfXt6AkBxLUWm9b9t3HzVHxiornY95gtpw822LydHXvZmf-pCrg5HIElQiS-KZure3ofQxPwl-ZS6K5rz1zYvOPPWgcYBChJGDPEIsap2N4HyYQALpfOrXW4HLtEN",
    imageAlt: "GT-4K Dual Elite Dashcam hardware",
    secondaryCtaText: "Details",
    secondaryCtaAction: "details",
    schema: {
      id: 99102,
      name: "GT-4K Dual Elite Dashcam (Front + Rear)",
      slug: "gt-4k-dual-elite-dashcam",
      category: "Hardware",
      type: "4K Dual Dashcam",
      description: "True 4K UHD Front + 1080p Rear with Supercapacitor, dual-band 5GHz Wi-Fi, and 64GB High-Endurance card included.",
      price: "14499",
      price_type: "fixed",
      rating: 5,
      reviews: 94,
      images: [getImageUrl("https://lh3.googleusercontent.com/aida-public/AB6AXuAuQhXmBu8UjfAZcv4altbkTA_1iADXJWgpuSjYkv0987hl0rtqOvldKQkf6wX16oThbzqUlEF7rcY4gUZKXzzaaH0mrcaPjc4nz1-NsH2bLm5vw9sS1kz2KUdMfXt6AkBxLUWm9b9t3HzVHxiornY95gtpw822LydHXvZmf-pCrg5HIElQiS-KZure3ofQxPwl-ZS6K5rz1zYvOPPWgcYBChJGDPEIsap2N4HyYQALpfOrXW4HLtEN")],
      features: ["Sony STARVIS 2", "4K Front + 1080p Rear", "5GHz Wi-Fi", "Supercapacitor"],
    },
  },
  {
    id: "prod-m365",
    name: "Microsoft 365 Business Premium",
    category: "software",
    categoryBadge: "SOFTWARE",
    badgeClass: "bg-secondary-container text-on-secondary-container",
    statusBadge: "Instant Setup",
    statusIcon: "cloud_sync",
    statusClass: "text-primary bg-surface-container",
    subtitle: "Cloud Workspace & Security",
    description: "Complete Office apps, Intune device management, Defender for Business, and Azure Information Protection.",
    priceFormatted: "₹1,740",
    priceUnit: "/ user / mo",
    gstNote: "+18% GST Claimable (Zero FX Fee)",
    gstNoteClass: "text-tertiary",
    priceNum: 1740,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAl3lz6X1dG8gL93YxJ5cdKSBQBUpKCo0EcKnem8GEDSHxRHoopWiZ8AEIXRSqvvqdh1eQIu0MvlqOk5VFCnsh8PBjmVhyEvYBzGnzC4BtkHWjh2OZvbpRoGGvzL7w3iZgZ9yD1OoBqwFXBZ3qvFNvzqa7oNWq_4odjebaSv9QKFTDkJ5CbreWnfafSe0p-_wkprLUlQWpWm7eJzseXObjdn4Nnj_NUW019bm2l9_AT0z-7LZ33JWjB",
    imageAlt: "Microsoft 365 Business Premium suite",
    secondaryCtaText: "Volume RFQ",
    secondaryCtaAction: "rfq",
    schema: {
      id: 99103,
      name: "Microsoft 365 Business Premium",
      slug: "microsoft-365-business-premium",
      category: "Software",
      type: "Cloud Security",
      description: "Complete Office apps, Intune device management, Defender for Business, and Azure Information Protection.",
      price: "1740",
      price_type: "fixed",
      rating: 5,
      reviews: 210,
      images: [getImageUrl("https://lh3.googleusercontent.com/aida-public/AB6AXuAl3lz6X1dG8gL93YxJ5cdKSBQBUpKCo0EcKnem8GEDSHxRHoopWiZ8AEIXRSqvvqdh1eQIu0MvlqOk5VFCnsh8PBjmVhyEvYBzGnzC4BtkHWjh2OZvbpRoGGvzL7w3iZgZ9yD1OoBqwFXBZ3qvFNvzqa7oNWq_4odjebaSv9QKFTDkJ5CbreWnfafSe0p-_wkprLUlQWpWm7eJzseXObjdn4Nnj_NUW019bm2l9_AT0z-7LZ33JWjB")],
      features: ["Intune", "Defender for Business", "Office Apps", "Zero FX Fee"],
    },
  },
  {
    id: "prod-gtfleet",
    name: "GT-Fleet Pro AI 4G Dashcam",
    category: "hardware",
    categoryBadge: "FLEET TELEMATICS",
    badgeClass: "bg-tertiary-fixed text-on-tertiary-fixed",
    statusBadge: "AIS-140 Ready",
    statusIcon: "cell_tower",
    statusClass: "text-on-surface-variant bg-surface-container",
    subtitle: "Fleet Telematics & Live Stream",
    description: "Integrated DMS & ADAS driver fatigue sensors, real-time live remote cloud viewing, and tamper-resistant wiring harness.",
    priceFormatted: "₹22,999",
    priceUnit: "/ unit",
    gstNote: "Fleet tiered pricing from 10+ units",
    gstNoteClass: "text-primary",
    priceNum: 22999,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeTxgSpCeZA8FHZchiI0qpnkFnT2a38IOIlNFS5kkCfFiyyJOWjRJ-YS54a-3SrL4pGVJZQypx3VbhKqTdos6DSsy2hhe8VJlEw4Xd1bmmoKm2iluebuio5nG83bXsomW9EkUJ6sbY-DHq5KirhLJwuWFvX4ukSf2hwg1jdkfm58jQhs6Z7vewVurTtriipUJqios2SkwNHLYv3-xWcN5hixsRN3TuWqDcYtQtWg2aoFlTFz4bKTOg",
    imageAlt: "GT-Fleet Pro AI 4G Dashcam telematics unit",
    secondaryCtaText: "Fleet RFQ",
    secondaryCtaAction: "rfq",
    schema: {
      id: 99104,
      name: "GT-Fleet Pro AI 4G Dashcam",
      slug: "gt-fleet-pro-ai-4g-dashcam",
      category: "Hardware",
      type: "Fleet Telematics",
      description: "Integrated DMS & ADAS driver fatigue sensors, real-time live remote cloud viewing, and tamper-resistant wiring harness.",
      price: "22999",
      price_type: "fixed",
      rating: 5,
      reviews: 43,
      images: [getImageUrl("https://lh3.googleusercontent.com/aida-public/AB6AXuCeTxgSpCeZA8FHZchiI0qpnkFnT2a38IOIlNFS5kkCfFiyyJOWjRJ-YS54a-3SrL4pGVJZQypx3VbhKqTdos6DSsy2hhe8VJlEw4Xd1bmmoKm2iluebuio5nG83bXsomW9EkUJ6sbY-DHq5KirhLJwuWFvX4ukSf2hwg1jdkfm58jQhs6Z7vewVurTtriipUJqios2SkwNHLYv3-xWcN5hixsRN3TuWqDcYtQtWg2aoFlTFz4bKTOg")],
      features: ["DMS & ADAS", "4G LTE Cloud View", "AIS-140 Certified", "Tamper-proof"],
    },
  },
];

interface BestSellersProps {
  products?: ProductSchema[];
}

export default function BestSellers({}: BestSellersProps) {
  const [activeCategory, setActiveCategory] = useState<"all" | "software" | "hardware">("all");
  const [gstChecked, setGstChecked] = useState(true);
  const [instantChecked, setInstantChecked] = useState(true);

  const { addToCart, setIsCartOpen } = useCart();
  const { openQuoteModal } = useRequestQuote();

  const filteredProducts = defaultProducts.filter((p) => {
    if (activeCategory !== "all" && p.category !== activeCategory) return false;
    return true;
  });

  const handleAddToCart = (item: FeaturedProduct) => {
    addToCart(item.schema);
    toast.success(`${item.name} added to cart!`, {
      description: `Price: ${item.priceFormatted}`,
    });
  };

  const handleSecondaryAction = (item: FeaturedProduct) => {
    if (item.secondaryCtaAction === "buy") {
      addToCart(item.schema);
      setIsCartOpen(true);
    } else if (item.secondaryCtaAction === "rfq") {
      openQuoteModal(item.schema);
    } else {
      // details
      if (item.category === "hardware") {
        window.location.href = "/hardware";
      } else {
        window.location.href = "/software";
      }
    }
  };

  return (
    <section id="store" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <div className="border-b border-outline-variant/30 pb-6 mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
          Featured Store Best-Sellers
        </h2>
        <p className="text-sm text-on-surface-variant mt-1">
          Guaranteed genuine serial keys &amp; official OEM boxed hardware with valid tax deductions.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Sidebar Filter Rail */}
        <aside className="w-full lg:w-64 shrink-0 bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 shadow-sm sticky top-44">
          <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30 mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
              Store Filters
            </span>
            <button
              onClick={() => {
                setActiveCategory("all");
                setGstChecked(true);
                setInstantChecked(true);
              }}
              className="text-[11px] font-semibold text-primary hover:underline cursor-pointer"
            >
              Reset
            </button>
          </div>

          <div className="space-y-1 mb-6">
            <button
              onClick={() => setActiveCategory("all")}
              className={`filter-btn w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                activeCategory === "all"
                  ? "bg-on-surface text-on-primary"
                  : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
              }`}
            >
              <span>All Best Sellers</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>

            <button
              onClick={() => setActiveCategory("software")}
              className={`filter-btn w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all text-left cursor-pointer ${
                activeCategory === "software"
                  ? "bg-on-surface text-on-primary font-bold"
                  : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
              }`}
            >
              <span>Commercial Software</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>

            <button
              onClick={() => setActiveCategory("hardware")}
              className={`filter-btn w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all text-left cursor-pointer ${
                activeCategory === "hardware"
                  ? "bg-on-surface text-on-primary font-bold"
                  : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
              }`}
            >
              <span>Vehicle Dashcams</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>

          <div className="pt-4 border-t border-outline-variant/30">
            <p className="text-[11px] font-bold uppercase tracking-wider text-outline mb-3">
              Quick Tags
            </p>
            <div className="space-y-2">
              <label
                htmlFor="quick-tag-gst"
                className="flex items-center gap-2 text-xs text-on-surface font-medium cursor-pointer"
              >
                <input
                  id="quick-tag-gst"
                  type="checkbox"
                  checked={gstChecked}
                  onChange={(e) => setGstChecked(e.target.checked)}
                  className="rounded border-outline-variant text-primary focus:ring-primary h-4 w-4"
                />
                <span>100% GST Claimable</span>
              </label>
              <label
                htmlFor="quick-tag-instant"
                className="flex items-center gap-2 text-xs text-on-surface font-medium cursor-pointer"
              >
                <input
                  id="quick-tag-instant"
                  type="checkbox"
                  checked={instantChecked}
                  onChange={(e) => setInstantChecked(e.target.checked)}
                  className="rounded border-outline-variant text-primary focus:ring-primary h-4 w-4"
                />
                <span>Instant Digital Key</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <div className="flex-1 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="product-card flex flex-col justify-between rounded-2xl bg-surface-container-lowest border border-outline-variant/30 p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${p.badgeClass}`}
                    >
                      {p.categoryBadge}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-md ${p.statusClass}`}
                    >
                      <span className="material-symbols-outlined text-[13px]">{p.statusIcon}</span>
                      {p.statusBadge}
                    </span>
                  </div>

                  <div className="relative w-full h-44 rounded-xl bg-surface-container-low overflow-hidden mb-4 flex items-center justify-center p-3">
                    <img
                      className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                      alt={p.imageAlt}
                      src={getImageUrl(p.imageUrl)}
                    />
                  </div>

                  <p className="text-xs text-on-surface-variant mb-1 font-medium">{p.subtitle}</p>
                  <h3 className="text-base font-bold text-on-surface leading-snug mb-2">{p.name}</h3>
                  <p className="text-xs text-on-surface-variant line-clamp-2 mb-4">
                    {p.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-outline-variant/30">
                  <div className="mb-3">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-extrabold text-on-surface">
                        {p.priceFormatted}
                      </span>
                      <span className="text-xs text-on-surface-variant font-medium">
                        {p.priceUnit}
                      </span>
                    </div>
                    <p className={`text-xs font-semibold ${p.gstNoteClass}`}>{p.gstNote}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleAddToCart(p)}
                      type="button"
                      className="w-full flex items-center justify-center gap-1 py-2.5 rounded-xl bg-surface-container-high text-on-surface text-xs font-bold hover:bg-surface-container-highest active:scale-[0.98] transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                      <span>Cart</span>
                    </button>

                    <button
                      onClick={() => handleSecondaryAction(p)}
                      type="button"
                      className="w-full flex items-center justify-center py-2.5 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary-container active:scale-[0.98] transition-all text-center cursor-pointer"
                    >
                      {p.secondaryCtaText}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View Full Store Link */}
          <div className="mt-8 text-center bg-surface-container-low/50 border border-outline-variant/30 rounded-2xl py-4">
            <Link
              href="/software"
              className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-on-surface transition-colors"
            >
              <span>View All 180+ Products in Store</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
