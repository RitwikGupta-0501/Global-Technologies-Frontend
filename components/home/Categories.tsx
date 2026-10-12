"use client";

import React from "react";
import Link from "next/link";
import { getImageUrl } from "@/lib/utils";

const SOFTWARE_TAGS = [
  "Developer Tools",
  "Office Suites",
  "CAD & Design",
  "Cloud Security",
];

const HARDWARE_TAGS = [
  "4K Dual Channel",
  "Cloud 4G Live View",
  "Heavy Vehicle 360°",
  "Supercapacitor",
];

export default function Categories() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
          Product Categories
        </h2>
      </div>

      <div className="space-y-6">
        {/* Division 1: Commercial Software (Horizontal Card, Image Left, Content Right) */}
        <Link
          href="/software"
          className="group relative flex flex-col lg:flex-row items-stretch rounded-2xl bg-surface-container-lowest border border-outline-variant/30 hover:border-primary/40 shadow-sm hover:shadow-md transition-all overflow-hidden"
        >
          <div className="lg:w-2/5 relative bg-surface-container-low min-h-[220px] lg:min-h-full overflow-hidden flex items-center justify-center">
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              alt="Digital software licensing cubes on clean background"
              loading="lazy"
              decoding="async"
              src={getImageUrl("https://lh3.googleusercontent.com/aida-public/AB6AXuBR7eUrFxF9yxG1-F6QAc_pvHG0QwI4BnQq23sLZcWnV_5mpW3bGrrQ4f6RaZcKVVuixCwOmhztWuj89h6Wr4ALnvzQM1OmYeKCkspXYflGFASYdZgoFmE7C2HaTTRjo8WzeUsaWjC5cCdCSbrcVO80naeddwF2Pj2hbqMFnq-5gtwqTE_xTpBUxBtGKRygHiXtxYVMZ52fv2THTG3EdbkazLy64iP8AgvQAvx2WgbpkzzTEu1o6Ykh")}
            />
            <div className="absolute bottom-3 left-3 bg-surface-container-lowest/90 backdrop-blur-md px-3.5 py-1.5 rounded-full flex items-center gap-2 shadow-md border border-outline-variant/30">
              <span className="material-symbols-outlined text-[16px] text-primary" aria-hidden="true">key</span>
              <span className="text-xs font-semibold text-on-surface">Auto-Dispatch via Email</span>
            </div>
          </div>

          <div className="lg:w-3/5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="text-2xl font-bold text-on-surface">Commercial Software</h3>
                <div className="w-9 h-9 shrink-0 rounded-full bg-surface-container flex items-center justify-center text-on-surface group-hover:bg-primary group-hover:text-on-primary transition-colors">
                  <span className="material-symbols-outlined text-[18px]" aria-hidden="true">north_east</span>
                </div>
              </div>
              <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
                Direct enterprise procurement for JetBrains, Microsoft 365, Autodesk, and Cloud Security Suites with instant automated GST activation keys.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {SOFTWARE_TAGS.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg bg-surface-container-low border border-outline-variant/20 text-on-surface-variant text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-sm font-bold text-primary flex items-center gap-2 group-hover:translate-x-1 transition-transform">
              <span>Explore 140+ Software SKUs</span>
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">arrow_forward</span>
            </div>
          </div>
        </Link>

        {/* Division 2: Dashcams & Fleet Hardware (Horizontal Card, Content Left, Image Right on desktop, consistent Image Top on mobile) */}
        <Link
          href="/hardware"
          className="group relative flex flex-col lg:flex-row-reverse items-stretch rounded-2xl bg-surface-container-lowest border border-outline-variant/30 hover:border-tertiary/40 shadow-sm hover:shadow-md transition-all overflow-hidden"
        >
          <div className="lg:w-2/5 relative bg-surface-container-low min-h-[220px] lg:min-h-full overflow-hidden flex items-center justify-center">
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              alt="Precision engineered 4K dual lens dashcam on clean display pedestal"
              loading="lazy"
              decoding="async"
              src={getImageUrl("https://lh3.googleusercontent.com/aida-public/AB6AXuAhDdIIte6ZS0sh8K_sZyAsHlk6qlxIMkMen0O1jGi8hGG3rDZiGCsGyuAW__n1Ear1muPPL6hMnikJaGzvbLoKPEtUT5RIgkbPt7MV-art1XEK0SMdCvwnynrOowam6zKvt5sUi3V1GD8RiOMisS8A4jhK_QOZmOMnb7cKkamZZ6kHKbp4ccReiLNookQBSd1uKLY2Dg0_8d9xLwZYzTF10w2inxlWwRxmknnrapH2aH__P-RIKnwZ")}
            />
            <div className="absolute bottom-3 left-3 bg-surface-container-lowest/90 backdrop-blur-md px-3.5 py-1.5 rounded-full flex items-center gap-2 shadow-md border border-outline-variant/30">
              <span className="material-symbols-outlined text-[16px] text-tertiary" aria-hidden="true">inventory_2</span>
              <span className="text-xs font-semibold text-on-surface">Same-Day Dispatch Ready</span>
            </div>
          </div>

          <div className="lg:w-3/5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="text-2xl font-bold text-on-surface">
                  Vehicle Dashcams &amp; Fleet Hardware
                </h3>
                <div className="w-9 h-9 shrink-0 rounded-full bg-surface-container flex items-center justify-center text-on-surface group-hover:bg-tertiary group-hover:text-on-tertiary transition-colors">
                  <span className="material-symbols-outlined text-[18px]" aria-hidden="true">north_east</span>
                </div>
              </div>
              <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
                Ultra-HD STARVIS 2 dashcams, multi-channel fleet telematics, and AIS-140 GPS video telematics engineered for Indian climate and highway conditions.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {HARDWARE_TAGS.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg bg-surface-container-low border border-outline-variant/20 text-on-surface-variant text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-sm font-bold text-tertiary flex items-center gap-2 group-hover:translate-x-1 transition-transform">
              <span>Explore 28+ Dashcam Models</span>
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">arrow_forward</span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
