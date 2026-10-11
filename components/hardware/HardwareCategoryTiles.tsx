import React from "react";

const CATEGORIES = [
  {
    id: "4k-dashcams",
    title: "4K UHD Dashcams",
    icon: "videocam",
    desc: "Single and multi-channel ultra high definition recording with Sony STARVIS 2 sensors.",
    colorClass: "bg-primary/5 border-primary/20 hover:border-primary/40",
    iconColorClass: "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-on-primary",
    link: "#all-hardware",
  },
  {
    id: "dual-dashcams",
    title: "Dual Front & Rear",
    icon: "camera_rear",
    desc: "Comprehensive 360° road safety coverage with buffered parking mode surveillance.",
    colorClass: "bg-tertiary/5 border-tertiary/20 hover:border-tertiary/40",
    iconColorClass: "bg-tertiary/10 text-tertiary group-hover:bg-tertiary group-hover:text-on-tertiary",
    link: "#all-hardware",
  },
  {
    id: "fleet-telematics",
    title: "Fleet Telematics & 4G Cloud",
    icon: "satellite_alt",
    desc: "Real-time remote live viewing, GPS tracking, DMS fatigue alerts & AIS-140 compliance.",
    colorClass: "bg-secondary/5 border-secondary/20 hover:border-secondary/40",
    iconColorClass: "bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-on-secondary",
    link: "#all-hardware",
  },
  {
    id: "accessories-storage",
    title: "High-Endurance Memory & Power",
    icon: "sd_card",
    desc: "Automotive-grade high-endurance microSD cards, hardwire kits, and supercapacitor power modules.",
    colorClass: "bg-surface-container-low border-outline-variant/30 hover:border-outline-variant/60",
    iconColorClass: "bg-surface-container-high text-on-surface-variant group-hover:bg-on-surface group-hover:text-surface-container",
    link: "#all-hardware",
  },
];

export default function HardwareCategoryTiles() {
  return (
    <section className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
          Browse by Category
        </h2>
        <p className="text-sm text-on-surface-variant mt-1">
          Explore specialized automotive and fleet recording hardware.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CATEGORIES.map((cat) => (
          <a
            key={cat.id}
            href={cat.link}
            aria-label={`Browse ${cat.title} category`}
            className={`group flex items-start p-6 rounded-2xl border shadow-sm hover:shadow-md transition-all duration-300 ${cat.colorClass}`}
          >
            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center mr-5 shrink-0 transition-colors duration-300 ${cat.iconColorClass}`}
              aria-hidden="true"
            >
              <span className="material-symbols-outlined text-[28px]">
                {cat.icon}
              </span>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-on-surface mb-1">
                  {cat.title}
                </h3>
                <span className="material-symbols-outlined text-outline-variant group-hover:text-on-surface transition-colors translate-x-0 group-hover:translate-x-1 duration-300" aria-hidden="true">
                  arrow_forward
                </span>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed mt-1">
                {cat.desc}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
