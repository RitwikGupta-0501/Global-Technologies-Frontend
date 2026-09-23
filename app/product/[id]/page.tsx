import React from "react";
import { notFound } from "next/navigation";
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
  const rawId = id.split("-")[0];
  const productId = Number(rawId);

  if (!productId || isNaN(productId) || productId <= 0) {
    notFound();
  }

  // 3. Fetch Data using the clean numeric ID
  let product;
  try {
    product = await DefaultService.productApiGetProduct(productId);
  } catch {
    notFound();
  }

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <Navbar />
      <ProductDetailsView product={product} />
    </main>
  );
}
