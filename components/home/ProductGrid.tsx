// components/home/ProductGrid.tsx
"use client";

import ProductCard from "../ProductCard";
import { ProductSchema } from "@/api/models/ProductSchema";

interface ProductGridProps {
  products: ProductSchema[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="sticky top-28">
            <h3 className="font-bold text-slate-900 text-lg mb-6">Filter</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Category
                </h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="cat"
                      className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                      defaultChecked
                    />
                    <span className="text-sm font-medium group-hover:text-blue-600 transition-colors">
                      All Products
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="cat"
                      className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium group-hover:text-blue-600 transition-colors">
                      Software
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="cat"
                      className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium group-hover:text-blue-600 transition-colors">
                      Hardware
                    </span>
                  </label>
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
                Featured Products
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Showing selected enterprise deals.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {products.map((product) => {
              return <ProductCard key={product.id} product={product} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
