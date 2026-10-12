import React from "react";

const VENDORS = [
  {
    id: "viofo",
    name: "VIOFO",
    tier: "Authorized Direct Partner",
    desc: "Industry-leading 4K Sony STARVIS 2 dashcams & multi-channel surveillance.",
    iconSymbol: "videocam",
  },
  {
    id: "blackvue",
    name: "BlackVue",
    tier: "Official Importer",
    desc: "Cloud-connected LTE dashcams, live fleet remote viewing, and tamper-proof telematics.",
    iconSymbol: "cloud_sync",
  },
  {
    id: "thinkware",
    name: "Thinkware",
    tier: "Certified Distributor",
    desc: "Super Night Vision 4.0, integrated ADAS road safety, and thermal sensor protection.",
    iconSymbol: "visibility",
  },
  {
    id: "70mai",
    name: "70mai",
    tier: "Authorized Partner",
    desc: "Smart AI vehicle dashcams, interior passenger monitors, and smart parking surveillance.",
    iconSymbol: "directions_car",
  },
  {
    id: "sandisk",
    name: "SanDisk",
    tier: "Storage OEM Partner",
    desc: "High-Endurance microSD cards engineered for continuous 24/7 automotive loop recording.",
    iconSymbol: "sd_storage",
  },
  {
    id: "teltonika",
    name: "Teltonika Telematics",
    tier: "Fleet Telematics Partner",
    desc: "AIS-140 certified GPS telematics units, OBD diagnostics, and commercial fleet hardware.",
    iconSymbol: "satellite_alt",
  },
];

export default function HardwareCompanyTiles() {
  return (
    <section className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
          Direct Hardware OEM Partnerships
        </h2>
        <p className="text-sm text-on-surface-variant mt-1">
          Authentic imported vehicle recording systems &amp; fleet hardware sourced directly from certified global manufacturers.
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
