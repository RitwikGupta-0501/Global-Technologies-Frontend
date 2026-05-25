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

  const categories = ["All Products", "Software", "Hardware"];
  
  // Extract dynamic filters based on the CURRENT category
  const productsInCategory = useMemo(() => {
    return selectedCategory === "All Products" 
      ? products 
      : products.filter(p => p.category === selectedCategory);
  }, [products, selectedCategory]);

  const brands = useMemo(() => {
    const brandSet = new Set<string>();
    productsInCategory.forEach(p => {
      // Very naive brand extraction: first word of name or specs.brand
      if (p.specs && p.specs.brand) {
        brandSet.add(p.specs.brand);
      } else {
        brandSet.add(p.name.split(" ")[0]);
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
      const brand = (p.specs && p.specs.brand) ? p.specs.brand : p.name.split(" ")[0];
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

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="sticky top-28">
            <h3 className="font-bold text-slate-900 text-lg mb-6">Filter</h3>
            <div className="space-y-8">
              {!hideCategoryFilter && (
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Category
                  </h4>
                  <div className="space-y-3">
                    {categories.map((cat) => (
                      <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="radio"
                          name="cat"
                          value={cat}
                          checked={selectedCategory === cat}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium group-hover:text-blue-600 transition-colors">
                          {cat}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Brand
                </h4>
                <div className="space-y-3">
                  {brands.map((b) => (
                    <label key={b} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="brand"
                        value={b}
                        checked={selectedBrand === b}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                        className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium group-hover:text-blue-600 transition-colors">
                        {b}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Type
                </h4>
                <div className="space-y-3">
                  {types.map((t) => (
                    <label key={t} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="type"
                        value={t}
                        checked={selectedType === t}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium group-hover:text-blue-600 transition-colors">
                        {t}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Max Price: ${currentMaxPrice}
                </h4>
                <div className="pt-2">
                  <input
                    type="range"
                    min="0"
                    max={maxAvailablePrice}
                    step={Math.max(1, Math.floor(maxAvailablePrice / 100))}
                    value={currentMaxPrice}
                    onChange={(e) => setUserPrice(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-2">
                    <span>$0</span>
                    <span>${maxAvailablePrice}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                {selectedCategory === "All Products" ? "Featured Products" : `${selectedCategory} Solutions`}
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Showing {filteredProducts.length} results.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="text-slate-500">No products found matching these filters.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
