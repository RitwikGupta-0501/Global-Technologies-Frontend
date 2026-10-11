import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProductGrid from "../../components/home/ProductGrid";
import SoftwareHero from "../../components/software/SoftwareHero";
import BestSellingSoftware from "../../components/software/BestSellingSoftware";
import SoftwareCategoryTiles from "../../components/software/SoftwareCategoryTiles";
import SoftwareCompanyTiles from "../../components/software/SoftwareCompanyTiles";

async function getProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"}/api/products/?category=Software`, {
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

export default async function SoftwarePage() {
  const products = await getProducts();
  
  // Best sellers can be assumed to be top 4 software products
  const softwareProducts = products.filter((p: any) => p.category === "Software" || !p.category);
  const bestSellers = softwareProducts.slice(0, 4); 

  return (
    <>
      <Navbar />
      <main className="w-full pt-36 sm:pt-44 pb-20 bg-background">
        <SoftwareHero />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 lg:space-y-24 mt-12 mb-20">
          <BestSellingSoftware products={bestSellers} />
          <SoftwareCategoryTiles />
          <SoftwareCompanyTiles />
        </div>

        {/* Traditional Product List with Filters */}
        <div className="bg-surface-container-lowest border-t border-outline-variant/20 pt-16 pb-12" id="all-software">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
            <h2 className="text-3xl font-extrabold text-on-surface tracking-tight">All Software Licenses</h2>
            <p className="text-on-surface-variant mt-2">Browse, filter, and sort our complete catalog.</p>
          </div>
          <ProductGrid products={softwareProducts} initialCategory="Software" hideCategoryFilter={true} />
        </div>
      </main>
      <Footer />
    </>
  );
}
