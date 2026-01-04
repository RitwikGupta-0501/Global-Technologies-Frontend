"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // <--- Updated Import (Added useRouter)
import { X, Check, Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useRequestQuote } from "../context/RequestQuoteContext";
import { useAuth } from "../context/AuthContext";
import { getImageUrl } from "@/lib/utils";
import { DefaultService } from "@/api/services/DefaultService";

export default function RequestQuoteModal() {
  const { isOpen, selectedProduct, closeQuoteModal } = useRequestQuote();
  const { user, isLoading } = useAuth(); // <--- Get isLoading to prevent premature redirects
  const pathname = usePathname();
  const router = useRouter(); // <--- Initialize Router

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"form" | "success">("form");

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    quantity: 1,
    message: "",
  });

  // Check if we are already on the product page
  const isDetailPage =
    selectedProduct && pathname === `/product/${selectedProduct.id}`;

  // --- NEW: Authentication Protection ---
  useEffect(() => {
    // Only run this check if the modal is trying to open
    if (isOpen && !isLoading && !user) {
      toast.error("Please log in to request a quote");
      closeQuoteModal(); // Close the modal immediately
      router.push("/auth"); // Redirect to login
    }
  }, [isOpen, isLoading, user, router, closeQuoteModal]);

  // Auto-fill user details when modal opens
  useEffect(() => {
    if (isOpen && user) {
      setFormData((prev) => ({
        ...prev,
        name: `${user.first_name} ${user.last_name}`.trim(),
        email: user.email || "",
      }));
    }
  }, [isOpen, user]);

  if (!isOpen || !selectedProduct) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await DefaultService.quotesApiCreateQuoteRequest({
        product_id: selectedProduct.id,
        email: formData.email,
        phone: formData.phone,
        quantity: Number(formData.quantity),
        message: formData.message,
      });

      setStep("success");
      toast.success("Quote request received!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    closeQuoteModal();
    setTimeout(() => setStep("form"), 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl rounded-3xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100/50 hover:bg-slate-200 text-slate-500 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {step === "success" ? (
          // --- SUCCESS STATE ---
          <div className="flex flex-col items-center justify-center py-16 px-8 text-center animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6 text-emerald-600 shadow-lg shadow-emerald-100">
              <Check className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              Request Received!
            </h3>
            <p className="text-slate-500 max-w-sm mb-8">
              We have received your request for{" "}
              <strong>{selectedProduct.name}</strong>. Our team will review it
              and email you shortly.
            </p>
            <button
              onClick={handleClose}
              className="px-8 py-3 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
            >
              Done
            </button>
          </div>
        ) : (
          // --- FORM STATE ---
          <div className="flex flex-col md:flex-row h-full">
            {/* Sidebar: Product Info */}
            <div className="w-full md:w-2/5 bg-slate-50/50 border-r border-slate-100 p-8 flex flex-col">
              <div className="relative aspect-square w-full bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-6">
                <Image
                  src={getImageUrl(selectedProduct.images[0])}
                  alt={selectedProduct.name}
                  fill
                  className="object-contain p-4"
                />
              </div>

              <div className="mt-auto">
                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3 inline-block ${
                    selectedProduct.category === "Software"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  {selectedProduct.category}
                </span>
                <h3 className="font-bold text-lg text-slate-900 leading-snug mb-1 pl-1">
                  {selectedProduct.name}
                </h3>

                {!isDetailPage && (
                  <Link
                    href={`/product/${selectedProduct.id}`}
                    onClick={handleClose}
                    className="mt-4 w-full py-2.5 bg-white border border-slate-200 rounded-xl text-slate-700 text-xs font-bold uppercase tracking-wide hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2 group shadow-sm"
                  >
                    View Full Details
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                )}
              </div>
            </div>

            {/* Main Content: Form */}
            <div className="flex-1 p-8 overflow-y-auto">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900">
                  Request Quote
                </h2>
                <p className="text-sm text-slate-500">
                  Tell us what you need, and we'll build a custom offer for you.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Quantity
                    </label>
                    <input
                      required
                      type="number"
                      min="1"
                      value={formData.quantity}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          quantity: parseInt(e.target.value) || 1,
                        })
                      }
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Phone{" "}
                    <span className="text-slate-500 font-normal normal-case">
                      (Optional)
                    </span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Requirements
                  </label>
                  <textarea
                    rows={3}
                    placeholder="E.g. I need these for a new office setup..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-lg shadow-slate-900/20 hover:shadow-slate-900/30 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Sending Request...
                    </>
                  ) : (
                    "Submit Request"
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
