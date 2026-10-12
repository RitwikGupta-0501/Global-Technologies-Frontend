"use client";

import { useState, useMemo } from "react";
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
  const [sortBy, setSortBy] = useState<string>("featured");

  const { maxAvailablePrice, categories, brands, types } = useMemo(() => {
    let max = 0;
    const cats = new Set<string>();
    const brnds = new Set<string>();
    const typs = new Set<string>();

    products.forEach((p) => {
      const price = Number(p.price);
      if (price && price > max) max = price;
      
      if (p.category) cats.add(p.category);
      if (p.features && p.features.length > 0) {
        brnds.add(p.features[0]); // Mocking brand as the first feature
      }
      if (p.type) typs.add(p.type);
    });

    return {
      maxAvailablePrice: max,
      categories: ["All Products", ...Array.from(cats)],
      brands: ["All Brands", ...Array.from(brnds)],
      types: ["All Types", ...Array.from(typs)],
    };
  }, [products]);

  const currentMaxPrice = userPrice !== null ? userPrice : maxAvailablePrice;

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((p) => {
      const pPrice = Number(p.price) || 0;
      if (selectedCategory !== "All Products" && p.category !== selectedCategory) return false;
      if (selectedBrand !== "All Brands" && p.features?.[0] !== selectedBrand) return false;
      if (selectedType !== "All Types" && p.type !== selectedType) return false;
      if (p.price_type !== "quote" && pPrice > currentMaxPrice) return false;
      return true;
    });

    if (sortBy === "price_asc") {
      return [...filtered].sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
    } else if (sortBy === "price_desc") {
      return [...filtered].sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
    } else if (sortBy === "name_asc") {
      return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    }
    return filtered;
  }, [products, selectedCategory, selectedBrand, selectedType, currentMaxPrice, sortBy]);

  const activeFilterCount =
    (selectedCategory !== "All Products" ? 1 : 0) +
    (selectedBrand !== "All Brands" ? 1 : 0) +
    (selectedType !== "All Types" ? 1 : 0) +
    (userPrice !== null && userPrice < maxAvailablePrice ? 1 : 0);

  const resetFilters = () => {
    setSelectedCategory(initialCategory);
    setSelectedBrand("All Brands");
    setSelectedType("All Types");
    setUserPrice(null);
  };

  const filterContent = (
    <div className="space-y-8">
      {!hideCategoryFilter && categories.length > 1 && (
        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-outline mb-3">
            Category
          </h4>
          <div className="space-y-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setSelectedBrand("All Brands");
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all text-left cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-on-surface text-on-primary font-bold"
                    : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
                }`}
              >
                <span>{cat}</span>
                {selectedCategory === cat && <span className="material-symbols-outlined text-[16px]">check</span>}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <h4 className="text-[11px] font-bold uppercase tracking-wider text-outline mb-3">
          Brand / Feature
        </h4>
        <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
          {brands.map((b) => (
            <label key={b} className="flex items-center gap-3 py-1 px-1 cursor-pointer group rounded-lg hover:bg-surface-container-low transition-colors">
              <input
                type="radio"
                name="brand"
                value={b}
                checked={selectedBrand === b}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-4 h-4 text-primary border-outline-variant focus:ring-primary accent-primary"
              />
              <span className="text-xs font-semibold text-on-surface-variant group-hover:text-primary transition-colors">
                {b}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-[11px] font-bold uppercase tracking-wider text-outline mb-3">
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
            className="w-full h-2 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-[11px] text-on-surface-variant mt-2 font-mono">
            <span>₹0</span>
            <span>₹{maxAvailablePrice.toLocaleString("en-IN")}</span>
          </div>
        </div>
      </div>

      {activeFilterCount > 0 && (
        <button
          onClick={resetFilters}
          className="w-full py-2.5 px-3 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">refresh</span>
          <span>Reset Filters</span>
        </button>
      )}
    </div>
  );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="w-full sm:w-auto lg:hidden">
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="w-full flex items-center justify-between px-4 py-3 bg-surface-container-lowest border border-outline-variant/30 rounded-2xl shadow-sm font-bold text-xs text-on-surface cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary" aria-hidden="true">filter_list</span>
              <span>Filter Catalog</span>
              {activeFilterCount > (initialCategory !== "All Products" ? 1 : 0) && (
                <span className="bg-primary text-on-primary text-[10px] px-2 py-0.5 rounded-full font-bold">
                  {activeFilterCount - (initialCategory !== "All Products" ? 1 : 0)}
                </span>
              )}
            </span>
            <span className="material-symbols-outlined" aria-hidden="true">
              {isMobileFilterOpen ? "expand_less" : "expand_more"}
            </span>
          </button>
        </div>

        <div className="w-full sm:w-auto flex items-center gap-3 ml-auto">
          <label htmlFor="sort-products" className="text-xs font-bold text-on-surface-variant hidden sm:block">
            Sort by:
          </label>
          <div className="relative w-full sm:w-48">
            <select
              id="sort-products"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full appearance-none bg-surface-container-lowest border border-outline-variant/30 text-on-surface text-xs font-semibold rounded-2xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer shadow-sm"
            >
              <option value="featured">Featured / Recommended</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="name_asc">Name: A to Z</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[18px] text-outline pointer-events-none" aria-hidden="true">
              unfold_more
            </span>
          </div>
        </div>
      </div>

      <div className="lg:hidden mb-6">
        {isMobileFilterOpen && (
          <div className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/30 shadow-sm animate-in fade-in duration-200">
            {filterContent}
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-28 bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant/30 shadow-sm">
            <h3 className="font-extrabold text-on-surface text-base mb-6 tracking-tight flex items-center justify-between">
              <span>Filters</span>
              {activeFilterCount > (initialCategory !== "All Products" ? 1 : 0) && (
                <span className="text-[11px] font-bold text-primary bg-primary-container px-2 py-0.5 rounded-full">
                  {activeFilterCount - (initialCategory !== "All Products" ? 1 : 0)} active
                </span>
              )}
            </h3>
            {filterContent}
          </div>
        </aside>

        <div className="flex-1">
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full py-16 px-6 text-center bg-surface-container-lowest rounded-3xl border border-outline-variant/30 flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-2xl bg-surface-container-low text-on-surface-variant flex items-center justify-center mb-3">
                  <span className="material-symbols-outlined text-[24px]">search_off</span>
                </div>
                <h3 className="text-base font-bold text-on-surface mb-1">No products match your criteria</h3>
                <p className="text-xs text-on-surface-variant max-w-sm mb-4">
                  We couldn&apos;t find any inventory matching your exact filters. Adjust your criteria or clear filters to view the full catalog.
                </p>
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-primary text-on-primary text-xs font-bold hover:bg-primary-container transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">refresh</span>
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
