import Navbar from "../../components/Navbar";
import ProductGrid from "../../components/home/ProductGrid";
import HardwareCategories from "../../components/hardware/HardwareCategories";
import HardwareBrands from "../../components/hardware/HardwareBrands";
import HardwareBestSellers from "../../components/hardware/HardwareBestSellers";
import Footer from "../../components/Footer";

async function getProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"}/api/products/?category=Hardware`, {
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

export default async function HardwarePage() {
  const products = await getProducts();

  return (
    <>
      <Navbar />
      <main className="w-full pt-20 sm:pt-24 bg-background pb-20">
        {/* Hardware Hero */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="flex flex-col items-start gap-4">
            <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-surface-container-high text-on-surface border border-outline-variant/30">
              Specialized Hardware Import
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight">
              Premium Vehicle Hardware
            </h1>
            <p className="max-w-2xl text-lg text-on-surface-variant font-medium">
              High-precision vehicle recording systems, optical sensors, and commercial dashcam hardware. Available for individual drivers and corporate fleet bulk supply.
            </p>
          </div>
        </div>

        <HardwareBrands />
        <HardwareCategories />
        <HardwareBestSellers products={products} />

        {/* Anchor for product grid */}
        <div id="product-grid" className="pt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight border-b border-outline-variant/30 pb-4">
              Full Hardware Catalog
            </h2>
          </div>
          <ProductGrid products={products} initialCategory="Hardware" hideCategoryFilter={true} />
        </div>
      </main>
      <Footer />
    </>
  );
}
