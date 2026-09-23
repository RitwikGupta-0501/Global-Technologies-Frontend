import Navbar from "../components/Navbar";
import HeroSection from "../components/home/HeroSection";
import HighlightsSection from "../components/home/HighlightsSection";
import ProductGrid from "../components/home/ProductGrid";

async function getProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"}/api/products/`, {
      // Cache for 5 minutes, revalidate on demand
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    return Array.isArray(data) ? data : (data.items || data.results || []);
  } catch (err) {
    console.warn("Failed to fetch products at render/build time:", err);
    return [];
  }
}

export default async function Home() {
  // --- 1. Mock Data ---
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-slate-50 font-sans">
      <Navbar />

      <HeroSection />
      <HighlightsSection />

      <ProductGrid products={products} />

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-white font-bold text-2xl">GLOBAL TECHNOLOGIES</span>
            <p className="mt-4 text-sm text-slate-500">
              &copy; 2025 Global Technologies. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
