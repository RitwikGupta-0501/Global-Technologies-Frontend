import React from "react";

const VENDORS = [
  {
    id: "microsoft",
    name: "Microsoft",
    tier: "Platinum Partner",
    desc: "Windows Server, Office 365, and Azure Enterprise Agreements.",
    iconSymbol: "window",
  },
  {
    id: "jetbrains",
    name: "JetBrains",
    tier: "Authorized Reseller",
    desc: "IntelliJ IDEA, WebStorm, and complete developer packs.",
    iconSymbol: "code",
  },
  {
    id: "autodesk",
    name: "Autodesk",
    tier: "Gold Partner",
    desc: "AutoCAD, Maya, and professional engineering suites.",
    iconSymbol: "architecture",
  },
  {
    id: "kaspersky",
    name: "Kaspersky",
    tier: "Security Partner",
    desc: "Endpoint Security and centralized threat management.",
    iconSymbol: "security",
  },
  {
    id: "adobe",
    name: "Adobe",
    tier: "Creative Cloud Partner",
    desc: "Creative Cloud for Enterprise and Document Cloud.",
    iconSymbol: "brush",
  },
  {
    id: "vmware",
    name: "VMware",
    tier: "Enterprise Reseller",
    desc: "vSphere, Workspace ONE, and hybrid cloud infrastructure.",
    iconSymbol: "cloud_done",
  },
];

export default function SoftwareCompanyTiles() {
  return (
    <section className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
          Direct Publisher Partnerships
        </h2>
        <p className="text-sm text-on-surface-variant mt-1">
          Authentic commercial licenses sourced directly from global OEMs.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {VENDORS.map((vendor) => (
          <article
            key={vendor.id}
            className="group relative p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 hover:bg-surface-container-low/40 hover:border-primary/40 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-5">
              <div 
                className="w-10 h-10 rounded-xl bg-surface-container border border-outline-variant/30 flex items-center justify-center text-on-surface group-hover:border-primary/40 group-hover:text-primary transition-colors"
                aria-hidden="true"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {vendor.iconSymbol}
                </span>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded bg-surface-container/60 text-outline-variant font-bold group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                {vendor.tier}
              </span>
            </div>
            
            <h3 className="text-lg font-bold tracking-tight text-on-surface group-hover:text-primary transition-colors">
              {vendor.name}
            </h3>
            <p className="text-sm text-on-surface-variant mt-1.5 leading-relaxed">
              {vendor.desc}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
