import Navbar from "../components/Navbar";
import Hero from "../components/home/Hero";
import OEMAlliances from "../components/home/OEMAlliances";
import Categories from "../components/home/Categories";
import BestSellers from "../components/home/BestSellers";
import EnterpriseBanner from "../components/home/EnterpriseBanner";
import Footer from "../components/Footer";

async function getProducts() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"}/api/products/`,
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

export default async function Home() {
  const products = await getProducts();

  return (
    <>
      <Navbar />

      <main className="w-full pt-44 bg-background">
        <Hero />
        <OEMAlliances />
        <Categories />
        <BestSellers products={products} />
        <EnterpriseBanner />
      </main>

      <Footer />
    </>
  );
}
