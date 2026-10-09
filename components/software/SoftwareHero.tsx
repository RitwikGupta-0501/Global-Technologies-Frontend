import React from "react";

export default function SoftwareHero() {
  return (
    <section className="relative w-full pb-16 pt-8 overflow-hidden">
      {/* Background gradients for premium feel */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-64 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="flex flex-col items-center gap-6 max-w-3xl mx-auto">
          <span className="px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest rounded-full bg-surface-container text-on-surface border border-outline-variant/30 shadow-sm">
            Digital Storefront
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-on-surface tracking-tight leading-tight">
            Enterprise Software &amp; Licensing
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant font-medium leading-relaxed">
            Procure professional development tools, productivity suites, and top-tier cybersecurity licenses instantly. Designed for independent professionals and corporate teams.
          </p>
          <div className="flex items-center gap-4 mt-4">
            <a
              href="#all-software"
              className="px-6 py-3 rounded-xl bg-primary text-on-primary text-sm font-bold shadow-md hover:bg-primary-container hover:shadow-lg active:scale-[0.98] transition-all"
            >
              Browse Full Catalog
            </a>
            <div className="flex items-center gap-2 text-sm font-semibold text-on-surface-variant px-4">
              <span className="material-symbols-outlined text-[18px] text-primary">bolt</span>
              Instant Key Delivery
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
