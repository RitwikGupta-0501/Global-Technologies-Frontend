"use client";

import { useState, useMemo } from "react";
import { SearchX, RotateCcw, Filter, X } from "lucide-react";
import ProductCard from "../ProductCard";
import { ProductSchema } from "@/api/models/ProductSchema";

interface ProductGridProps {
  products: ProductSchema[];
  initialCategory?: string;
  hideCategoryFilter?: boolean;
}

export default function ProductGrid({ products, initialCategory = "All Products", hideCategoryFilter = false }: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState<string>("All Brands");
  const [userPrice, setUserPrice] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<string>("All Types");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const categories = [
    { key: "All Products", label: "All Products" },
    { key: "Software", label: "Software Licensing" },
    { key: "Hardware", label: "Korean Dashcams" },
  ];
  
  // Extract dynamic filters based on the CURRENT category
  const productsInCategory = useMemo(() => {
    return selectedCategory === "All Products" 
      ? products 
      : products.filter(p => p.category === selectedCategory);
  }, [products, selectedCategory]);

  const brands = useMemo(() => {
    const brandSet = new Set<string>();
    productsInCategory.forEach(p => {
      if (p.specs && p.specs.brand) {
        brandSet.add(p.specs.brand);
      } else {
        const name = p.name.trim();
        const knownBrands = [
          "Quick Heal", 
          "Red Hat", 
          "Microsoft", 
          "Unity", 
          "McAfee", 
          "IROAD", 
          "Thinkware", 
          "BlackVue", 
          "FineVu", 
          "Sophos"
        ];
        const matched = knownBrands.find(b => name.toLowerCase().startsWith(b.toLowerCase()));
        brandSet.add(matched || name.split(" ")[0]);
      }
    });
    return ["All Brands", ...Array.from(brandSet).sort()];
  }, [productsInCategory]);

  const types = useMemo(() => {
    const typeSet = new Set<string>();
    productsInCategory.forEach(p => {
      if (p.type) typeSet.add(p.type);
    });
    return ["All Types", ...Array.from(typeSet).sort()];
  }, [productsInCategory]);

  const maxAvailablePrice = useMemo(() => {
    const prices = productsInCategory
      .filter(p => p.price_type !== "quote")
      .map(p => parseFloat(p.price || "0"))
      .filter(n => !isNaN(n));
    return prices.length > 0 ? Math.ceil(Math.max(...prices)) : 1000;
  }, [productsInCategory]);

  const currentMaxPrice = userPrice !== null ? userPrice : maxAvailablePrice;

  const filteredProducts = useMemo(() => {
    return productsInCategory.filter(p => {
      // Filter by Brand
      const brand = (() => {
        if (p.specs && p.specs.brand) return p.specs.brand;
        const name = p.name.trim();
        const knownBrands = [
          "Quick Heal", 
          "Red Hat", 
          "Microsoft", 
          "Unity", 
          "McAfee", 
          "IROAD", 
          "Thinkware", 
          "BlackVue", 
          "FineVu", 
          "Sophos"
        ];
        const matched = knownBrands.find(b => name.toLowerCase().startsWith(b.toLowerCase()));
        return matched || name.split(" ")[0];
      })();
      if (selectedBrand !== "All Brands" && brand !== selectedBrand) return false;

      // Filter by Type
      if (selectedType !== "All Types" && p.type !== selectedType) return false;

      // Filter by Price (negotiable products bypass the price filter)
      if (p.price_type !== "quote" && p.price) {
        const priceNum = parseFloat(p.price);
        if (!isNaN(priceNum) && priceNum > currentMaxPrice) return false;
      }

      return true;
    });
  }, [productsInCategory, selectedBrand, selectedType, currentMaxPrice]);

  const activeFilterCount = (selectedCategory !== "All Products" ? 1 : 0) + 
                            (selectedBrand !== "All Brands" ? 1 : 0) + 
                            (selectedType !== "All Types" ? 1 : 0) + 
                            (userPrice !== null ? 1 : 0);

  const filterContent = (
    <div className="space-y-6">
      {!hideCategoryFilter && (
        <div>
          <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3">
            Category
          </h4>
          <div className="space-y-1">
            {categories.map((cat) => (
              <label key={cat.key} className="flex items-center gap-3 py-1 px-1 cursor-pointer group rounded-lg hover:bg-slate-50 transition-colors">
                <input
                  type="radio"
                  name="cat"
                  value={cat.key}
                  checked={selectedCategory === cat.key}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setSelectedBrand("All Brands");
                  }}
                  className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500 accent-blue-600"
                />
                <span className="text-xs font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">
                  {cat.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      <div>
        <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3">
          Manufacturer
        </h4>
        <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
          {brands.map((b) => (
            <label key={b} className="flex items-center gap-3 py-1 px-1 cursor-pointer group rounded-lg hover:bg-slate-50 transition-colors">
              <input
                type="radio"
                name="brand"
                value={b}
                checked={selectedBrand === b}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500 accent-blue-600"
              />
              <span className="text-xs font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">
                {b}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3">
          Product Type
        </h4>
        <div className="space-y-1">
          {types.map((t) => (
            <label key={t} className="flex items-center gap-3 py-1 px-1 cursor-pointer group rounded-lg hover:bg-slate-50 transition-colors">
              <input
                type="radio"
                name="type"
                value={t}
                checked={selectedType === t}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500 accent-blue-600"
              />
              <span className="text-xs font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">
                {t}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3">
          Maximum Price: ₹{currentMaxPrice.toLocaleString("en-IN")}
        </h4>
        <div className="pt-2">
          <input
            type="range"
            min="0"
            max={maxAvailablePrice}
            step={Math.max(1, Math.floor(maxAvailablePrice / 100))}
            value={currentMaxPrice}
            onChange={(e) => setUserPrice(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
          />
          <div className="flex justify-between text-[11px] text-slate-400 mt-2 font-mono">
            <span>₹0</span>
            <span>₹{maxAvailablePrice.toLocaleString("en-IN")}</span>
          </div>
        </div>
      </div>

      {activeFilterCount > 0 && (
        <button
          onClick={() => {
            setSelectedCategory("All Products");
            setSelectedBrand("All Brands");
            setSelectedType("All Types");
            setUserPrice(null);
          }}
          className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Filters</span>
        </button>
      )}
    </div>
  );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
      
      {/* Mobile Filter Trigger Button */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          className="w-full flex items-center justify-between p-3.5 bg-white border border-slate-200 rounded-2xl shadow-xs font-bold text-xs text-slate-800 cursor-pointer min-h-[44px]"
        >
          <span className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-blue-600" />
            <span>Filter Catalog</span>
            {activeFilterCount > 0 && (
              <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                {activeFilterCount}
              </span>
            )}
          </span>
          <span>{isMobileFilterOpen ? "Hide Filters ▲" : "Show Filters ▼"}</span>
        </button>

        {/* Collapsible Mobile Filter Box */}
        {isMobileFilterOpen && (
          <div className="mt-2 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm animate-in fade-in duration-200">
            {filterContent}
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Desktop Sticky Sidebar Filter Desk */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-28 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
            <h3 className="font-extrabold text-slate-900 text-base mb-6 tracking-tight flex items-center justify-between">
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                  {activeFilterCount} active
                </span>
              )}
            </h3>
            {filterContent}
          </div>
        </aside>

        {/* Product Grid Area */}
        <div className="flex-1">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {selectedCategory === "All Products" ? "Product Catalog" : `${selectedCategory === "Hardware" ? "Precision Hardware" : selectedCategory} Catalog`}
              </h2>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full py-16 px-6 text-center bg-white rounded-3xl border border-slate-200 flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
                  <SearchX className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">No products match your criteria</h3>
                <p className="text-xs text-slate-500 max-w-sm mb-4">
                  We couldn't find any inventory matching your exact filters. Adjust your criteria or clear filters to view the full catalog.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("All Products");
                    setSelectedBrand("All Brands");
                    setSelectedType("All Types");
                    setUserPrice(null);
                  }}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer min-h-[44px]"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
