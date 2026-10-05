import Navbar from "../../components/Navbar";
import ProductGrid from "../../components/home/ProductGrid";
import Footer from "../../components/Footer";

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

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-700 font-sans">
      <Navbar />

      <div className="pt-36 pb-12 bg-white border-b border-slate-200/80 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Digital Distribution
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Software Solutions &amp; Licensing
          </h1>
          <p className="mt-2 max-w-2xl text-sm sm:text-base text-slate-500">
            Genuine commercial licenses for security, developer platforms, 3D engines, and enterprise infrastructure with GST tax credit.
          </p>
        </div>
      </div>

      <ProductGrid products={products} initialCategory="Software" hideCategoryFilter={true} />

      <Footer />
    </main>
  );
}
