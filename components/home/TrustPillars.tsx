import React from "react";
import { ShieldCheck, FileCheck, KeyRound, Truck } from "lucide-react";

export default function TrustPillars() {
  const pillars = [
    {
      icon: ShieldCheck,
      title: "Authorized Indian Reseller",
      description: "Direct publisher distribution agreements for authentic commercial and developer tools.",
      iconColor: "text-blue-600",
    },
    {
      icon: FileCheck,
      title: "Compliant GST Invoicing",
      description: "Automated B2B tax invoices with valid GSTIN and HSN details for 100% input credit.",
      iconColor: "text-amber-600",
    },
    {
      icon: KeyRound,
      title: "Instant Digital Key Dispatch",
      description: "Direct license keys, serials, and setup instructions delivered immediately to your account.",
      iconColor: "text-emerald-600",
    },
    {
      icon: Truck,
      title: "Insured Pan-India Dispatch",
      description: "Fast, insured courier transit across India for all imported Korean dashcam hardware.",
      iconColor: "text-slate-700",
    },
  ];

  return (
    <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-16">
      {/* Accessible Section Heading for Screen Readers */}
      <h2 className="sr-only">Procurement Verification and Enterprise Guarantees</h2>

      {/* Unified Minimalist Data Strip with Hairline Dividers */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-0 sm:divide-x divide-slate-100">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex flex-col justify-between sm:px-6 first:sm:pl-0 last:sm:pr-0"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <Icon className={`w-5 h-5 ${item.iconColor} shrink-0`} />
                    <h3 className="text-sm font-bold text-slate-900 leading-snug">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
