import React from "react";

export default function HardwareHero() {
  return (
    <section className="relative w-full pb-16 pt-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left Column: Content */}
          <div className="flex-1 flex flex-col items-start gap-6">
            <span className="px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest rounded-full bg-surface-container text-on-surface border border-outline-variant/30 shadow-sm">
              Specialized Hardware Store
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-on-surface tracking-tight leading-tight">
              Vehicle Dashcams &amp; Fleet Systems
            </h1>
            <p className="text-lg text-on-surface-variant font-medium leading-relaxed max-w-[50ch]">
              High-precision optical sensors, 4K dual recording systems, and commercial fleet telematics hardware. Available for individual drivers and corporate fleet bulk supply.
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-2">
              <a
                href="#all-hardware"
                className="inline-flex justify-center items-center px-6 py-3 rounded-xl bg-primary text-on-primary text-sm font-bold shadow-md hover:bg-primary-container hover:shadow-lg active:scale-[0.98] transition-all"
              >
                Browse Full Catalog
              </a>
              <div className="flex items-center gap-2 text-sm font-semibold text-on-surface-variant">
                <span className="material-symbols-outlined text-[18px] text-tertiary font-bold" aria-hidden="true">local_shipping</span>
                Express Pan-India Air Delivery
              </div>
            </div>
          </div>

          {/* Right Column: Visual Asset */}
          <div className="flex-1 w-full lg:w-auto relative group">
            <div className="absolute inset-0 bg-tertiary/10 rounded-3xl transform translate-x-3 translate-y-3 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-500" aria-hidden="true" />
            <img 
              src="https://picsum.photos/seed/dashcam-fleet-hardware/800/600" 
              alt="Automotive dashcam and vehicle fleet recording hardware unit preview" 
              className="relative w-full h-auto object-cover rounded-3xl shadow-xl border border-outline-variant/20 aspect-[4/3]"
              loading="eager"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
