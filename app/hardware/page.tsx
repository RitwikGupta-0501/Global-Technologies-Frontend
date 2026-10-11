import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProductGrid from "../../components/home/ProductGrid";
import HardwareHero from "../../components/hardware/HardwareHero";
import BestSellingHardware from "../../components/hardware/BestSellingHardware";
import HardwareCategoryTiles from "../../components/hardware/HardwareCategoryTiles";
import HardwareCompanyTiles from "../../components/hardware/HardwareCompanyTiles";

async function getProducts() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"}/api/products/?category=Hardware`,
      {
        next: { revalidate: 300 },
      }
    );

    if (!res.ok) {
      return [];
    }
    const data = await res.json();
    return Array.isArray(data) ? data : data.items || data.results || [];
  } catch (err) {
    console.warn("Failed to fetch products at render/build time:", err);
    return [];
  }
}

export default async function HardwarePage() {
  const products = await getProducts();

  const hardwareProducts = products.filter(
    (p: any) => p.category?.toLowerCase() === "hardware" || !p.category
  );
  const bestSellers = hardwareProducts.slice(0, 4);

  return (
    <>
      <Navbar />
      {/* pt-36 on mobile, pt-44 on desktop to comfortably clear the fixed navbar */}
      <main className="w-full pt-36 sm:pt-44 pb-20 bg-background">
        <HardwareHero />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 lg:space-y-24 mt-12 mb-20">
          <BestSellingHardware products={bestSellers} />
          <HardwareCategoryTiles />
          <HardwareCompanyTiles />
        </div>

        {/* Traditional Product List with Filters */}
        <div
          className="bg-surface-container-lowest border-t border-outline-variant/20 pt-16 pb-12"
          id="all-hardware"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
            <h2 className="text-3xl font-extrabold text-on-surface tracking-tight">
              All Hardware Systems
            </h2>
            <p className="text-on-surface-variant mt-2">
              Browse, filter, and sort our complete hardware catalog.
            </p>
          </div>
          <ProductGrid
            products={hardwareProducts}
            initialCategory="Hardware"
            hideCategoryFilter={true}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
