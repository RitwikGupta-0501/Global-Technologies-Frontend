"use client";

import React, { useState } from "react";
import { useRequestQuote } from "~/context/RequestQuoteContext";
import { toast } from "sonner";

export default function EnterpriseBanner() {
  const { openQuoteModal } = useRequestQuote();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleQuickInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    toast.success("Inquiry received!", {
      description: "An enterprise procurement specialist will reach out within 2 hours.",
    });
    setEmail("");
  };

  return (
    <section id="enterprise-banner" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      <div className="rounded-3xl bg-inverse-surface text-inverse-on-surface p-8 sm:p-12 shadow-lg border border-white/5 relative overflow-hidden">
        <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Benefit Column */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 bg-surface-container-lowest/10 px-3 py-1 rounded-full text-xs font-bold text-tertiary-fixed-dim uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px]">percent</span>
              <span>18% Immediate Savings with Indian GST Invoices</span>
              <span className="bg-primary/30 text-white px-2 py-0.5 rounded text-[10px]">LEGAL ITC</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-inverse-on-surface tracking-tight">
              Need a tailored volume quote for your organization?
            </h2>

            <p className="text-sm text-surface-variant leading-relaxed max-w-xl">
              Purchasing overseas software or unbranded dashcams risks tax scrutiny and non-claimable forex markups. Global-Tech provides direct domestic GST tax invoices with seamless GSTR-2B reflection.
            </p>

            <p className="text-xs text-surface-variant/90 leading-relaxed max-w-xl">
              Share your enterprise requirements or ask our licensing engineers for software compatibility, seat optimization, and dashcam fleet installation schedules across 45+ Indian cities.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => openQuoteModal()}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-tertiary-fixed-dim hover:text-white transition-colors cursor-pointer"
              >
                <span>Learn More About ITC</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-5 bg-surface-container-lowest/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <span className="text-xs font-bold uppercase tracking-widest text-tertiary-fixed-dim mb-3 block">
              Enterprise Support Desk
            </span>

            <form className="space-y-3" onSubmit={handleQuickInquiry}>
              <div className="relative w-full">
                <span className="material-symbols-outlined text-outline absolute left-4 top-1/2 -translate-y-1/2 text-[18px]">
                  mail
                </span>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-surface-container-lowest/15 text-inverse-on-surface placeholder:text-surface-variant pl-11 pr-4 py-3 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary border border-white/10"
                  placeholder="Enter your corporate work email..."
                  required
                  type="email"
                />
              </div>

              <button
                className="w-full py-3 px-6 rounded-xl bg-primary-container text-on-primary font-bold text-xs sm:text-sm hover:bg-primary transition-all active:scale-[0.98] shadow-md flex items-center justify-center gap-2 cursor-pointer"
                type="submit"
              >
                <span>Talk to Specialist</span>
                <span className="material-symbols-outlined text-[16px]">support_agent</span>
              </button>
            </form>

            {submitted && (
              <p className="text-xs text-primary-fixed mt-3 text-center">
                Thank you! An enterprise procurement specialist will reach out within 2 hours.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
