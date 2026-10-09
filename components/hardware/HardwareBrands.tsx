"use client";

import React from "react";

const brands = [
  { name: "VIOFO", logo: "Viofo", icon: "camera" },
  { name: "BlackVue", logo: "BlackVue", icon: "visibility" },
  { name: "Thinkware", logo: "Thinkware", icon: "memory" },
  { name: "70mai", logo: "70mai", icon: "directions_car" },
  { name: "Garmin", logo: "Garmin", icon: "explore" },
  { name: "SanDisk", logo: "SanDisk", icon: "sd_storage" },
];

export default function HardwareBrands() {
  return (
    <section className="bg-surface-container-low py-10 border-y border-outline-variant/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h3 className="text-sm font-extrabold uppercase tracking-[0.2em] text-outline">
            Official Hardware Partners
          </h3>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-12 opacity-80">
          {brands.map((brand, idx) => (
            <div key={idx} className="flex items-center gap-2 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer text-on-surface-variant hover:text-primary">
              <span className="material-symbols-outlined text-[28px]">{brand.icon}</span>
              <span className="font-black text-xl tracking-tighter">{brand.logo}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
