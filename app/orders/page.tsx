"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "~/components/Navbar";
import { useAuth } from "~/context/AuthContext";
import { DefaultService } from "@/api/services/DefaultService";
import type { OrderOutSchema } from "@/api/models/OrderOutSchema";
import {
  Package,
  Clock,
  CheckCircle2,
  AlertCircle,
  Truck,
  ArrowRight,
  Receipt,
  ShoppingBag,
} from "lucide-react";

export default function OrdersPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<OrderOutSchema[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("ALL");

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth?redirect=/orders");
      return;
    }

    if (user) {
      DefaultService.orderApiGetMyOrders()
        .then((data) => {
          setOrders(data || []);
        })
        .catch((err) => {
          console.error("Failed to load orders:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user, authLoading, router]);

  const filteredOrders = orders.filter((order) => {
    if (filter === "ALL") return true;
    return order.status.toUpperCase() === filter.toUpperCase();
  });

  const getStatusBadge = (status: string) => {
    switch (status.toUpperCase()) {
      case "PAID":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Paid
          </span>
        );
      case "PENDING":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3.5 h-3.5" />
            Payment Pending
          </span>
        );
      case "SHIPPED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <Truck className="w-3.5 h-3.5" />
            Shipped
          </span>
        );
      case "COMPLETED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Completed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <AlertCircle className="w-3.5 h-3.5" />
            {status}
          </span>
        );
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans pb-24">
      <Navbar />

      <div className="pt-28 sm:pt-32 pb-8 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                My Orders & Receipts
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Track your orders, view itemized receipts, and verify delivery status.
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 mt-8 overflow-x-auto pb-2 scrollbar-none">
            {["ALL", "PAID", "PENDING", "SHIPPED"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  filter === tab
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {tab === "ALL" ? "All Orders" : tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {loading || authLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-200 p-6 animate-pulse space-y-4"
              >
                <div className="h-5 bg-slate-100 rounded w-1/4"></div>
                <div className="h-4 bg-slate-100 rounded w-1/2"></div>
                <div className="h-10 bg-slate-100 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-lg mx-auto my-12 shadow-sm">
            <div className="w-16 h-16 mx-auto bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
              <Package className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No orders found</h3>
            <p className="text-sm text-slate-500 mt-2">
              {filter === "ALL"
                ? "You have not placed any orders yet. Browse our hardware and software catalog."
                : `No orders currently match the status "${filter}".`}
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/hardware" className="btn-primary w-full sm:w-auto text-sm">
                Explore Hardware
              </Link>
              <Link href="/software" className="btn-outline w-full sm:w-auto text-sm">
                Explore Software
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                {/* Order Top Bar */}
                <div className="bg-slate-50/80 px-6 py-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                  <div className="flex flex-wrap items-center gap-4">
                    <div>
                      <span className="font-semibold text-slate-400 uppercase tracking-wider block">
                        Order Placed
                      </span>
                      <span className="font-medium text-slate-700">
                        {formatDate(order.created_at)}
                      </span>
                    </div>
                    <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
                    <div>
                      <span className="font-semibold text-slate-400 uppercase tracking-wider block">
                        Order ID
                      </span>
                      <span className="font-bold text-slate-900">#GT-{order.id}</span>
                    </div>
                    <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
                    <div>
                      <span className="font-semibold text-slate-400 uppercase tracking-wider block">
                        Ship To
                      </span>
                      <span className="font-medium text-slate-700 truncate max-w-[150px] inline-block">
                        {order.first_name} {order.last_name}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {getStatusBadge(order.status)}
                    <Link
                      href={`/order/${order.id}`}
                      className="inline-flex items-center gap-1.5 font-bold text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      <Receipt className="w-4 h-4" />
                      Invoice
                    </Link>
                  </div>
                </div>

                {/* Order Body: Items */}
                <div className="p-6">
                  <div className="divide-y divide-slate-100">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 text-slate-400">
                            <Package className="w-6 h-6" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-slate-900">
                              {item.product_name}
                            </h4>
                            <p className="text-xs text-slate-500 mt-0.5">
                              Qty: {item.quantity} • ₹
                              {Number(item.price_at_purchase).toLocaleString("en-IN")} each
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-sm font-bold text-slate-900">
                            ₹
                            {(
                              Number(item.price_at_purchase) * item.quantity
                            ).toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer summary */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                    <div className="text-xs text-slate-500">
                      {order.company_name && (
                        <span>Company: <strong>{order.company_name}</strong> • </span>
                      )}
                      <span>Destination: {order.shipping_city}, {order.shipping_state}</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="text-xs text-slate-400 block">Total Amount</span>
                        <span className="text-lg font-black text-slate-900">
                          ₹{Number(order.total_amount).toLocaleString("en-IN")}
                        </span>
                      </div>
                      <Link
                        href={`/order/${order.id}`}
                        className="btn-outline px-4 py-2 text-xs flex items-center gap-1.5"
                      >
                        View Details
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
