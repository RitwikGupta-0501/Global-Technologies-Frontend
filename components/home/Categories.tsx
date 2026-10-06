"use client";

import React from "react";
import Link from "next/link";
import { getImageUrl } from "@/lib/utils";

export default function Categories() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
            Curated Storefront Categories
          </h2>
        </div>
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
              src={getImageUrl("https://lh3.googleusercontent.com/aida-public/AB6AXuBR7eUrFxF9yxG1-F6QAc_pvHG0QwI4BnQq23sLZcWnV_5mpW3bGrrQ4f6RaZcKVVuixCwOmhztWuj89h6Wr4ALnvzQM1OmYeKCkspXYflGFASYdZgoFmE7C2HaTTRjo8WzeUsaWjC5cCdCSbrcVO80naeddwF2Pj2hbqMFnq-5gtwqTE_xTpBUxBtGKRygHiXtxYVMZ52fv2THTG3EdbkazLy64iP8AgvQAvx2WgbpkzzTEu1o6Ykh")}
            />
            <div className="absolute bottom-3 left-3 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-sm border border-outline-variant/20">
              <span className="material-symbols-outlined text-[16px] text-primary">key</span>
              <span className="text-xs font-bold text-on-surface">Auto-Dispatch via Email</span>
            </div>
          </div>

          <div className="lg:w-3/5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Cloud &amp; Perpetual SKUs
                </span>
                <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface group-hover:bg-primary-container group-hover:text-on-primary transition-colors">
                  <span className="material-symbols-outlined text-[18px]">north_east</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-on-surface mb-2">Commercial Software</h3>
              <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
                Direct enterprise procurement for JetBrains, Microsoft 365, Autodesk, and Cloud Security Suites with instant automated GST activation keys.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-2.5 py-1 rounded-lg bg-surface-container-low text-on-surface text-xs font-medium">
                  Developer Tools
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-surface-container-low text-on-surface text-xs font-medium">
                  Office Suites
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-surface-container-low text-on-surface text-xs font-medium">
                  CAD &amp; Design
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-surface-container-low text-on-surface text-xs font-medium">
                  Cloud Security
                </span>
              </div>
            </div>
            <div className="text-sm font-bold text-primary flex items-center gap-2 group-hover:translate-x-1 transition-transform">
              <span>Explore 140+ Software SKUs</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </div>
          </div>
        </Link>

        {/* Division 2: Dashcams & Fleet Hardware (Horizontal Card, Content Left, Image Right) */}
        <Link
          href="/hardware"
          className="group relative flex flex-col-reverse lg:flex-row items-stretch rounded-2xl bg-surface-container-lowest border border-outline-variant/30 hover:border-tertiary/40 shadow-sm hover:shadow-md transition-all overflow-hidden"
        >
          <div className="lg:w-3/5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-[11px] font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
                  Hardware &amp; Telematics
                </span>
                <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface group-hover:bg-primary-container group-hover:text-on-primary transition-colors">
                  <span className="material-symbols-outlined text-[18px]">north_east</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-on-surface mb-2">
                Vehicle Dashcams &amp; Fleet Hardware
              </h3>
              <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
                Ultra-HD STARVIS 2 dashcams, multi-channel fleet telematics, and AIS-140 GPS video telematics engineered for Indian climate and highway conditions.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-2.5 py-1 rounded-lg bg-surface-container-low text-on-surface text-xs font-medium">
                  4K Dual Channel
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-surface-container-low text-on-surface text-xs font-medium">
                  Cloud 4G Live View
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-surface-container-low text-on-surface text-xs font-medium">
                  Heavy Vehicle 360°
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-surface-container-low text-on-surface text-xs font-medium">
                  Supercapacitor
                </span>
              </div>
            </div>
            <div className="text-sm font-bold text-primary flex items-center gap-2 group-hover:translate-x-1 transition-transform">
              <span>Explore 28+ Dashcam Models</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </div>
          </div>

          <div className="lg:w-2/5 relative bg-surface-container-low min-h-[220px] lg:min-h-full overflow-hidden flex items-center justify-center">
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              alt="Precision engineered 4K dual lens dashcam on clean display pedestal"
              src={getImageUrl("https://lh3.googleusercontent.com/aida-public/AB6AXuAhDdIIte6ZS0sh8K_sZyAsHlk6qlxIMkMen0O1jGi8hGG3rDZiGCsGyuAW__n1Ear1muPPL6hMnikJaGzvbLoKPEtUT5RIgkbPt7MV-art1XEK0SMdCvwnynrOowam6zKvt5sUi3V1GD8RiOMisS8A4jhK_QOZmOMnb7cKkamZZ6kHKbp4ccReiLNookQBSd1uKLY2Dg0_8d9xLwZYzTF10w2inxlWwRxmknnrapH2aH__P-RIKnwZ")}
            />
            <div className="absolute bottom-3 left-3 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-sm border border-outline-variant/20">
              <span className="material-symbols-outlined text-[16px] text-tertiary">inventory_2</span>
              <span className="text-xs font-bold text-on-surface">Same-Day Dispatch Ready</span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
