import Navbar from "../components/Navbar";
import HeroSection from "../components/home/HeroSection";
import TrustPillars from "../components/home/TrustPillars";
import HighlightsSection from "../components/home/HighlightsSection";
import ProductGrid from "../components/home/ProductGrid";
import Footer from "../components/Footer";

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
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-700 font-sans relative selection:bg-blue-600 selection:text-white">
      <Navbar />

      <HeroSection />
      <TrustPillars />
      <HighlightsSection />

      <div id="catalog">
        <ProductGrid products={products} />
      </div>

      <Footer />
    </main>
  );
}
