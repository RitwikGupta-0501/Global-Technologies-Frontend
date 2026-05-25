import Navbar from "../../components/Navbar";
import ProductGrid from "../../components/home/ProductGrid";

async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/`, {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    return [];
  }
  const data = await res.json();
  return Array.isArray(data) ? data : (data.items || data.results || []);
}

export default async function SoftwarePage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-slate-50 font-sans">
      <Navbar />

      <div className="pt-32 pb-12 bg-white border-b border-slate-200 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Software Solutions</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-500">
            Secure licensing for creative, security, and development tools tailored to enterprise scale.
          </p>
        </div>
      </div>

      <ProductGrid products={products} initialCategory="Software" hideCategoryFilter={true} />

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
