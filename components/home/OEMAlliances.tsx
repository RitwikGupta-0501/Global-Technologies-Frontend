"use client";

import React from "react";
import Link from "next/link";
import { allPartners, BrandItem } from "@/lib/partners-data";

interface TrustedClient {
  name: string;
  icon: string;
}

const trustedClients: TrustedClient[] = [
  { name: "Infosys Limited", icon: "apartment" },
  { name: "Mahindra Logistics", icon: "local_shipping" },
  { name: "Tata Motors Commercial", icon: "directions_car" },
  { name: "Swiggy Fleet Network", icon: "two_wheeler" },
  { name: "Delhivery Express", icon: "inventory_2" },
  { name: "Wipro Technologies", icon: "cloud" },
  { name: "L&T Technology Services", icon: "precision_manufacturing" },
];

export default function OEMAlliances() {
  return (
    <section
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full"
      id="oem-alliances-section"
      aria-label="Direct Brand Partners and OEM Alliances"
    >
      <div className="space-y-10 sm:space-y-12">
        {/* Header Block: Left-Aligned & Clean */}
        <div className="max-w-3xl space-y-2">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-on-surface">
            Meet some of our Partners
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-on-surface-variant leading-relaxed max-w-2xl font-normal">
            Primary contract agreements with global software publishers and automotive telematics manufacturers. Authentic licensing, institutional warranties, and dedicated account SLAs.
          </p>
        </div>

        {/* Divided 4x4 Partner Matrix (Reference Grid Layout) */}
        <div className="rounded-2xl sm:rounded-3xl border border-outline-variant/30 overflow-hidden shadow-[0_2px_24px_rgba(11,28,48,0.03)]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-outline-variant/25">
            {allPartners.map((brand) => (
              <PartnerGridCell key={brand.id} brand={brand} />
            ))}
          </div>

          {/* Footer Bar of the Grid: Quick Directory Linkage */}
          <div className="bg-surface-container-lowest border-t border-outline-variant/20 px-6 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-on-surface-variant font-medium text-center sm:text-left">
              Official OEM distribution across cloud software suites, AIS-140 telematics, and dashcams.
            </span>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/partners"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-on-primary text-xs sm:text-sm font-semibold shadow-sm hover:bg-primary/90 transition-all cursor-pointer whitespace-nowrap"
              >
                <span>View All 16 Partners</span>
                <span className="material-symbols-outlined text-[15px]" aria-hidden="true">
                  arrow_forward
                </span>
              </Link>
              <Link
                href="/partners#become-a-partner"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-outline-variant/40 hover:border-outline-variant text-on-surface-variant hover:text-on-surface text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Become a Partner</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Customer Social Proof: Retained Dynamic Marquee */}
        <div className="rounded-2xl border border-outline-variant/25 bg-surface-container-low/20 py-4 px-6 sm:px-8 flex flex-col md:flex-row items-center gap-4 sm:gap-8 overflow-hidden">
          <div className="flex items-center gap-2 shrink-0">
            <span className="material-symbols-outlined text-primary text-[18px]" aria-hidden="true">
              verified
            </span>
            <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.16em] uppercase text-outline whitespace-nowrap">
              TRUSTED BY
            </span>
            <span className="text-outline-variant/50 hidden md:inline">|</span>
          </div>

          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
            <div className="animate-marquee flex items-center gap-10 sm:gap-14 lg:gap-16 whitespace-nowrap py-1">
              {trustedClients.concat(trustedClients).map((client, idx) => (
                <div
                  key={`trusted-${client.name}-${idx}`}
                  className="flex items-center gap-2.5 shrink-0 opacity-80 hover:opacity-100 transition-opacity"
                >
                  <span
                    className="material-symbols-outlined text-[22px] sm:text-[24px] text-on-surface-variant shrink-0"
                    aria-hidden="true"
                  >
                    {client.icon}
                  </span>
                  <span className="text-sm sm:text-base font-bold text-on-surface tracking-tight">
                    {client.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PartnerGridCell({ brand }: { brand: BrandItem }) {
  const isHardware = brand.category === "Hardware";

  return (
    <Link
      href={`/partners?category=${brand.category}&brand=${brand.id}`}
      className="group relative flex items-center justify-center gap-3 h-28 sm:h-32 lg:h-36 px-4 sm:px-6 bg-surface-container-lowest hover:bg-surface-container-low/40 transition-colors duration-200 cursor-pointer"
      title={`View ${brand.name} partnership details`}
    >
      {/* Brand Logo Mark */}
      <div className="shrink-0 transition-transform duration-200 group-hover:scale-105 flex items-center justify-center">
        {brand.iconSvg}
      </div>

      {/* Brand Typography */}
      <span
        className={`text-sm sm:text-base lg:text-[17px] font-bold tracking-tight text-on-surface ${
          isHardware ? "group-hover:text-tertiary" : "group-hover:text-primary"
        } transition-colors whitespace-nowrap`}
      >
        {brand.name}
      </span>
    </Link>
  );
}
