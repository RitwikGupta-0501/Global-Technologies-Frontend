import React from "react";
import Navbar from "../../../components/Navbar";
import ProductDetailsView from "../../../components/ProductDetailsView";
import { DefaultService } from "../../../src/api/services/DefaultService";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 1. Await params (Next.js 15 standard)
  const { id } = await params;

  // 2. HYBRID LOGIC: Extract the numeric ID
  // If URL is "15-macbook-pro", split by "-" and take the first part ("15").
  // If URL is just "15", it still works correctly.
  const productId = id.split("-")[0];

  // 3. Fetch Data using the clean numeric ID
  const product = await DefaultService.productApiGetProduct(Number(productId));

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <Navbar />
      <ProductDetailsView product={product} />
    </main>
  );
}
