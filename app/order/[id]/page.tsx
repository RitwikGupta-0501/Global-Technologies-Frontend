"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "~/components/Navbar";
import { useAuth } from "~/context/AuthContext";
import { DefaultService } from "@/api/services/DefaultService";
import type { OrderOutSchema } from "@/api/models/OrderOutSchema";
import {
  ArrowLeft,
  Printer,
  CheckCircle2,
  Clock,
  AlertCircle,
  Truck,
  Building2,
  MapPin,
  CreditCard,
} from "lucide-react";

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const orderId = Number(resolvedParams.id);
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [order, setOrder] = useState<OrderOutSchema | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push(`/auth?redirect=/order/${orderId}`);
      return;
    }

    if (user && orderId) {
      DefaultService.orderApiGetOrderDetail(orderId)
        .then((data) => {
          setOrder(data);
        })
        .catch((err) => {
          console.error("Failed to load order details:", err);
          setError("Order not found or you do not have permission to view it.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user, authLoading, orderId, router]);

  const handlePrint = () => {
    window.print();
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateStr;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toUpperCase()) {
      case "PAID":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Paid
          </span>
        );
      case "PENDING":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
            <Clock className="w-3.5 h-3.5" />
            Payment Pending
          </span>
        );
      case "SHIPPED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300">
            <Truck className="w-3.5 h-3.5" />
            Shipped
          </span>
        );
      case "COMPLETED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-300">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Completed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
            <AlertCircle className="w-3.5 h-3.5" />
            {status}
          </span>
        );
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 font-sans pb-24 print:bg-white print:pb-0">
      <div className="print:hidden">
        <Navbar />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 print:pt-4">
        {/* Navigation & Action Bar */}
        <div className="flex items-center justify-between gap-4 mb-6 print:hidden">
          <Link
            href="/orders"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Orders
          </Link>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-slate-900 text-white hover:bg-slate-800 shadow-sm transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            Print / Save Invoice
          </button>
        </div>

        {loading || authLoading ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 animate-pulse space-y-6">
            <div className="h-8 bg-slate-100 rounded w-1/3"></div>
            <div className="h-4 bg-slate-100 rounded w-1/2"></div>
            <div className="h-40 bg-slate-100 rounded w-full"></div>
          </div>
        ) : error || !order ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-sm">
            <div className="w-16 h-16 mx-auto bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mb-4">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Order Not Found</h2>
            <p className="text-sm text-slate-500 mt-2">{error || "Unable to locate this order."}</p>
            <Link href="/orders" className="btn-primary inline-block mt-6 text-sm">
              Return to Orders
            </Link>
          </div>
        ) : (
          /* Invoice Paper View */
          <div className="bg-white rounded-3xl border border-slate-200 shadow-lg print:shadow-none print:border-none p-8 sm:p-12 overflow-hidden">
            {/* Top Company & Invoice Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-8 border-b border-slate-200">
              <div>
                <span className="text-2xl font-black text-slate-900 tracking-tight block">
                  GLOBAL TECHNOLOGIES
                </span>
                <p className="text-xs text-slate-500 mt-1">
                  Enterprise Fleet Hardware, Software & Telematics
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Web: globaltech.com &bull; Support: sales@globaltech.com
                </p>
              </div>

              <div className="sm:text-right">
                <span className="text-xs font-bold text-blue-600 tracking-widest uppercase block">
                  {order.status === "PAID" ? "TAX INVOICE" : "ORDER SUMMARY"}
                </span>
                <span className="text-2xl font-black text-slate-900 mt-1 block">
                  {order.status === "PAID" ? `#INV-GT-${order.id}` : `#ORD-GT-${order.id}`}
                </span>
                <div className="mt-2 flex items-center sm:justify-end gap-2">
                  {getStatusBadge(order.status)}
                </div>
              </div>
            </div>

            {/* Metadata Grid: Billed To / Shipped To */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-8 border-b border-slate-200 text-xs">
              <div>
                <span className="font-bold text-slate-400 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  Billed To
                </span>
                <p className="text-sm font-bold text-slate-900">
                  {order.first_name} {order.last_name}
                </p>
                {order.company_name && (
                  <p className="font-semibold text-slate-700 mt-0.5">{order.company_name}</p>
                )}
                {order.gstin && (
                  <p className="text-slate-600 mt-0.5">
                    GSTIN: <span className="font-mono font-bold text-slate-800">{order.gstin}</span>
                  </p>
                )}
                <p className="text-slate-600 mt-0.5">Email: {order.email}</p>
                <p className="text-slate-600">Phone: {order.phone}</p>
              </div>

              <div>
                <span className="font-bold text-slate-400 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  Shipping Destination
                </span>
                <p className="text-slate-800 font-medium">{order.shipping_address_line1}</p>
                {order.shipping_address_line2 && (
                  <p className="text-slate-600">{order.shipping_address_line2}</p>
                )}
                <p className="text-slate-800 font-medium">
                  {order.shipping_city}, {order.shipping_state} - {order.shipping_pincode}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                    Payment Details
                  </span>
                  <p className="text-slate-600">
                    Date: <span className="font-medium text-slate-800">{formatDate(order.created_at)}</span>
                  </p>
                  {order.razorpay_payment_id && (
                    <p className="text-slate-600 font-mono text-[11px]">
                      Ref ID: {order.razorpay_payment_id}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="py-8">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase font-bold tracking-wider">
                    <th className="pb-3 w-10">#</th>
                    <th className="pb-3">Product Description</th>
                    <th className="pb-3 text-center w-20">Qty</th>
                    <th className="pb-3 text-right w-28">Unit Price</th>
                    <th className="pb-3 text-right w-32">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {order.items.map((item, index) => (
                    <tr key={item.id} className="py-4">
                      <td className="py-4 text-slate-400 font-medium">{index + 1}</td>
                      <td className="py-4">
                        <span className="font-bold text-slate-900 text-sm block">
                          {item.product_name}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          SKU ID: GT-PROD-{item.product_id}
                        </span>
                      </td>
                      <td className="py-4 text-center font-bold text-slate-800">
                        {item.quantity}
                      </td>
                      <td className="py-4 text-right text-slate-700">
                        ₹{Number(item.price_at_purchase).toLocaleString("en-IN")}
                      </td>
                      <td className="py-4 text-right font-black text-slate-900">
                        ₹
                        {(
                          Number(item.price_at_purchase) * item.quantity
                        ).toLocaleString("en-IN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Financial Totals */}
              <div className="mt-8 pt-6 border-t-2 border-slate-900 flex justify-end">
                <div className="w-full sm:w-72 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-900">
                      ₹{Number(order.total_amount).toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Applicable Taxes (GST)</span>
                    <span className="font-semibold text-slate-900">Included</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-slate-200 text-base font-black text-slate-900">
                    <span>Total Paid</span>
                    <span>₹{Number(order.total_amount).toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Invoice Footer */}
            <div className="mt-8 pt-6 border-t border-slate-200 text-center text-xs text-slate-400">
              <p>This is a computer-generated invoice and requires no signature.</p>
              <p className="mt-1">
                For questions regarding this order, please reach out to{" "}
                <span className="text-slate-600 font-semibold">sales@globaltech.com</span>.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
