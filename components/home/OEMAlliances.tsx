"use client";

import React, { useState, useEffect, useRef } from "react";

interface BrandItem {
  id: string;
  category: "Software" | "Hardware";
  name: string;
  desc: string;
  tier: string;
  tierDotColor: string;
  badgeClass: string;
  iconType: "symbol" | "svg";
  iconSymbol?: string;
  iconSvg?: React.ReactNode;
}

const initialTiles: BrandItem[] = [
  {
    id: "docker",
    category: "Software",
    name: "Docker",
    desc: "Business Containerization",
    tier: "Authorized Channel Partner",
    tierDotColor: "bg-emerald-500",
    badgeClass: "bg-surface-container/60 text-outline-variant group-hover:text-primary group-hover:bg-primary/10",
    iconType: "symbol",
    iconSymbol: "deployed_code",
  },
  {
    id: "autodesk",
    category: "Software",
    name: "Autodesk",
    desc: "AEC & CAD Product Suites",
    tier: "Authorized Channel",
    tierDotColor: "bg-emerald-500",
    badgeClass: "bg-surface-container/60 text-outline-variant group-hover:text-primary group-hover:bg-primary/10",
    iconType: "symbol",
    iconSymbol: "architecture",
  },
  {
    id: "microsoft",
    category: "Software",
    name: "Microsoft",
    desc: "M365 & Cloud Security",
    tier: "Direct Cloud CSP",
    tierDotColor: "bg-emerald-500",
    badgeClass: "bg-surface-container/60 text-outline-variant group-hover:text-primary group-hover:bg-primary/10",
    iconType: "svg",
    iconSvg: (
      <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 23 23">
        <path d="M0 0h11v11H0zM12 0h11v11H12zM0 12h11v11H0zM12 12h11v11H12z" />
      </svg>
    ),
  },
  {
    id: "jetbrains",
    category: "Software",
    name: "JetBrains",
    desc: "IDEs & Dev Tooling",
    tier: "Commercial Partner",
    tierDotColor: "bg-emerald-500",
    badgeClass: "bg-surface-container/60 text-outline-variant group-hover:text-primary group-hover:bg-primary/10",
    iconType: "svg",
    iconSvg: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M4 4h7.5v7.5H4V4zm8.5 0H20v7.5h-7.5V4zM4 12.5h7.5V20H4v-7.5zm8.5 0H20V20h-7.5v-7.5z" />
      </svg>
    ),
  },
  {
    id: "queclink",
    category: "Hardware",
    name: "Queclink",
    desc: "AIS-140 GPS & OBD Trackers",
    tier: "Certified Telematics Importer",
    tierDotColor: "bg-tertiary",
    badgeClass: "bg-tertiary-fixed/40 text-tertiary",
    iconType: "symbol",
    iconSymbol: "router",
  },
  {
    id: "blackvue",
    category: "Hardware",
    name: "BlackVue Cloud",
    desc: "Over-the-Cloud 4K Dashcams",
    tier: "Direct National Importer",
    tierDotColor: "bg-tertiary",
    badgeClass: "bg-tertiary-fixed/40 text-tertiary",
    iconType: "symbol",
    iconSymbol: "camera",
  },
  {
    id: "garmin",
    category: "Hardware",
    name: "Garmin Fleet",
    desc: "Commercial Telematics & GPS",
    tier: "Enterprise Channel Partner",
    tierDotColor: "bg-tertiary",
    badgeClass: "bg-tertiary-fixed/40 text-tertiary",
    iconType: "symbol",
    iconSymbol: "navigation",
  },
  {
    id: "meraki",
    category: "Hardware",
    name: "Cisco Meraki",
    desc: "Smart MV Cameras & Gateways",
    tier: "Select B2B Integrator",
    tierDotColor: "bg-tertiary",
    badgeClass: "bg-tertiary-fixed/40 text-tertiary",
    iconType: "symbol",
    iconSymbol: "lan",
  },
];

const poolBrands: BrandItem[] = [
  ...initialTiles,
  {
    id: "adobe",
    category: "Software",
    name: "Adobe",
    desc: "Creative Cloud Enterprise",
    tier: "VIP Marketplace",
    tierDotColor: "bg-emerald-500",
    badgeClass: "bg-surface-container/60 text-outline-variant group-hover:text-primary group-hover:bg-primary/10",
    iconType: "svg",
    iconSvg: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M14.5 3H21v18h-4.3l-2.2-6.5zm-5 0H3v18h4.3l2.2-6.5zM12 10.8l2.6 7.7H9.4z" />
      </svg>
    ),
  },
  {
    id: "viofo",
    category: "Hardware",
    name: "VIOFO",
    desc: "STARVIS 2 4K Dashcams",
    tier: "India Exclusive Importer",
    tierDotColor: "bg-tertiary",
    badgeClass: "bg-tertiary-fixed/40 text-tertiary",
    iconType: "symbol",
    iconSymbol: "videocam",
  },
  {
    id: "70mai",
    category: "Hardware",
    name: "70mai",
    desc: "Smart AI Automotive Tech",
    tier: "National Warranty Hub",
    tierDotColor: "bg-tertiary",
    badgeClass: "bg-tertiary-fixed/40 text-tertiary",
    iconType: "symbol",
    iconSymbol: "smart_toy",
  },
  {
    id: "thinkware",
    category: "Hardware",
    name: "Thinkware",
    desc: "Connected ADAS Telematics",
    tier: "Fleet Certified",
    tierDotColor: "bg-tertiary",
    badgeClass: "bg-tertiary-fixed/40 text-tertiary",
    iconType: "symbol",
    iconSymbol: "sensors",
  },
  {
    id: "nextbase",
    category: "Hardware",
    name: "Nextbase",
    desc: "iQ Emergency IoT Systems",
    tier: "Authorized Importer",
    tierDotColor: "bg-tertiary",
    badgeClass: "bg-tertiary-fixed/40 text-tertiary",
    iconType: "symbol",
    iconSymbol: "hub",
  },
  {
    id: "redhat",
    category: "Software",
    name: "Red Hat",
    desc: "RHEL & OpenShift Enterprise",
    tier: "Premier Solution Provider",
    tierDotColor: "bg-emerald-500",
    badgeClass: "bg-surface-container/60 text-outline-variant group-hover:text-primary group-hover:bg-primary/10",
    iconType: "symbol",
    iconSymbol: "terminal",
  },
  {
    id: "crowdstrike",
    category: "Software",
    name: "CrowdStrike",
    desc: "Falcon EDR & Cloud Security",
    tier: "Elite Falcon MSSP",
    tierDotColor: "bg-emerald-500",
    badgeClass: "bg-surface-container/60 text-outline-variant group-hover:text-primary group-hover:bg-primary/10",
    iconType: "symbol",
    iconSymbol: "shield",
  },
  {
    id: "datadog",
    category: "Software",
    name: "Datadog",
    desc: "Observability & APM Monitoring",
    tier: "Cloud Solution Provider",
    tierDotColor: "bg-emerald-500",
    badgeClass: "bg-surface-container/60 text-outline-variant group-hover:text-primary group-hover:bg-primary/10",
    iconType: "symbol",
    iconSymbol: "monitoring",
  },
];

export default function OEMAlliances() {
  const [activeTiles, setActiveTiles] = useState<BrandItem[]>(initialTiles);
  const [swappingIndex, setSwappingIndex] = useState<number | null>(null);
  const isPausedRef = useRef(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isPausedRef.current) return;

      const randomIdx = Math.floor(Math.random() * 8);
      const targetCategory = randomIdx < 4 ? "Software" : "Hardware";

      setSwappingIndex(randomIdx);

      setTimeout(() => {
        setActiveTiles((current) => {
          const currentIds = current.map((t) => t.id);
          const candidates = poolBrands.filter(
            (b) => !currentIds.includes(b.id) && b.category === targetCategory
          );
          if (candidates.length === 0) return current;

          const chosen = candidates[Math.floor(Math.random() * candidates.length)];
          const nextTiles = [...current];
          nextTiles[randomIdx] = chosen;
          return nextTiles;
        });

        setTimeout(() => {
          setSwappingIndex(null);
        }, 300);
      }, 300);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full"
      id="oem-alliances-section"
      onMouseEnter={() => {
        isPausedRef.current = true;
      }}
      onMouseLeave={() => {
        isPausedRef.current = false;
      }}
    >
      <div className="rounded-3xl bg-surface-container-lowest/80 backdrop-blur-xl border border-outline-variant/30 overflow-hidden shadow-[0_2px_24px_rgba(11,28,48,0.03)] relative">
        {/* Subtle Ambient Top Light */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-3/4 h-48 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent blur-3xl pointer-events-none -z-10" />

        {/* Dual-Tier Asymmetric Header Block */}
        <div className="px-8 sm:px-12 pt-10 pb-8 border-b border-outline-variant/20 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2.5 max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-on-surface">
              Direct Brand Partners
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed font-normal">
              Primary contract agreements with global software publishers and automotive telematics manufacturers. Authentic licensing, institutional warranties, and dedicated account SLAs.
            </p>
          </div>
        </div>

        {/* Main Area: 8-tile Micro-Grid with swap animation */}
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 divide-x divide-outline-variant/20 bg-surface-container-lowest">
          {activeTiles.slice(0, 4).map((brand, i) => renderTile(brand, i, swappingIndex === i))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 divide-x divide-outline-variant/20 border-t border-outline-variant/20 bg-surface-container-lowest">
          {activeTiles.slice(4, 8).map((brand, i) => renderTile(brand, i + 4, swappingIndex === i + 4))}
        </div>

        {/* Enterprise Clients: Linear Trust Ticker */}
        <div className="border-t border-outline-variant/20 bg-surface-container-low/30 backdrop-blur-sm py-4 px-6 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-4 overflow-hidden">
          <div className="flex items-center gap-2.5 shrink-0">
            <span className="material-symbols-outlined text-outline text-[16px]">corporate_fare</span>
            <span className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-outline">
              TRUSTED ENTERPRISES
            </span>
            <span className="text-outline-variant/60 hidden sm:inline">|</span>
          </div>
          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="animate-marquee flex items-center gap-12 whitespace-nowrap text-xs font-semibold text-on-surface-variant tracking-wide uppercase">
              <span className="hover:text-on-surface transition-colors">Infosys Limited</span>
              <span className="text-outline-variant/40">•</span>
              <span className="hover:text-on-surface transition-colors">Mahindra Logistics</span>
              <span className="text-outline-variant/40">•</span>
              <span className="hover:text-on-surface transition-colors">Tata Motors Commercial</span>
              <span className="text-outline-variant/40">•</span>
              <span className="hover:text-on-surface transition-colors">Swiggy Fleet Network</span>
              <span className="text-outline-variant/40">•</span>
              <span className="hover:text-on-surface transition-colors">Delhivery Express</span>
              <span className="text-outline-variant/40">•</span>
              <span className="hover:text-on-surface transition-colors">Wipro Technologies</span>
              <span className="text-outline-variant/40">•</span>
              <span className="hover:text-on-surface transition-colors">L&amp;T Technology Services</span>
              <span className="text-outline-variant/40">•</span>
              {/* Duplicate loop for seamless infinite scroll */}
              <span className="hover:text-on-surface transition-colors">Infosys Limited</span>
              <span className="text-outline-variant/40">•</span>
              <span className="hover:text-on-surface transition-colors">Mahindra Logistics</span>
              <span className="text-outline-variant/40">•</span>
              <span className="hover:text-on-surface transition-colors">Tata Motors Commercial</span>
              <span className="text-outline-variant/40">•</span>
              <span className="hover:text-on-surface transition-colors">Swiggy Fleet Network</span>
              <span className="text-outline-variant/40">•</span>
              <span className="hover:text-on-surface transition-colors">Delhivery Express</span>
              <span className="text-outline-variant/40">•</span>
              <span className="hover:text-on-surface transition-colors">Wipro Technologies</span>
              <span className="text-outline-variant/40">•</span>
              <span className="hover:text-on-surface transition-colors">L&amp;T Technology Services</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function renderTile(brand: BrandItem, index: number, isSwapping: boolean) {
  const isHardware = brand.category === "Hardware";

  return (
    <div
      key={`${brand.id}-${index}`}
      className={`oem-tile group relative p-6 sm:p-8 hover:bg-surface-container-low/40 ${
        isHardware ? "hover:border-tertiary/40" : "hover:border-primary/40"
      } transition-all duration-500 cursor-default ${
        isSwapping ? "ring-2 ring-primary/20 bg-blue-50/50" : ""
      }`}
    >
      <div
        className="tile-inner transition-all duration-300"
        style={{
          opacity: isSwapping ? 0 : 1,
          transform: isSwapping ? "translateY(-4px)" : "translateY(0px)",
        }}
      >
        <div className="flex items-start justify-between mb-5">
          <div
            className={`tile-icon-box w-9 h-9 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-center justify-center text-on-surface ${
              isHardware
                ? "group-hover:border-tertiary/50 group-hover:text-tertiary"
                : "group-hover:border-primary/40 group-hover:text-primary"
            } transition-colors`}
          >
            {brand.iconType === "symbol" ? (
              <span className="material-symbols-outlined text-[20px]">{brand.iconSymbol}</span>
            ) : (
              brand.iconSvg
            )}
          </div>
          <span
            className={`tile-category text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded font-bold transition-colors ${
              isHardware
                ? "bg-tertiary-fixed/40 text-tertiary"
                : "bg-surface-container/60 text-outline-variant group-hover:text-primary group-hover:bg-primary/10"
            }`}
          >
            {brand.category}
          </span>
        </div>

        <h3
          className={`tile-name text-base sm:text-lg font-bold tracking-tight text-on-surface ${
            isHardware ? "group-hover:text-tertiary" : "group-hover:text-primary"
          } transition-colors`}
        >
          {brand.name}
        </h3>
        <p className="tile-desc text-xs text-on-surface-variant font-medium mt-1">{brand.desc}</p>
        <div className="tile-badge mt-4 flex items-center gap-1.5 text-[11px] font-semibold text-outline group-hover:text-on-surface transition-colors">
          <span className={`w-1.5 h-1.5 rounded-full ${brand.tierDotColor}`} />
          <span className="tile-tier">{brand.tier}</span>
        </div>
      </div>
    </div>
  );
}
