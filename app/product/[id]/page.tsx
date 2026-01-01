import React from "react";
import Navbar from "../../../components/Navbar";
import ProductDetailsView from "../../../components/ProductDetailsView";
import { DefaultService } from "../../../src/api/services/DefaultService";

// 1. Update the type definition to be a Promise
export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 2. Await the params to extract the ID
  const { id } = await params;

  // 3. Now 'id' is a real string ("1"), so Number(id) works
  const product = await DefaultService.productApiGetProduct(Number(id));

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <Navbar />
      <ProductDetailsView product={product} />
    </main>
  );
}
