"use client";

import React from "react";
import Link from "next/link";

const categories = [
  {
    title: "4K Dashcams",
    description: "Ultra HD recording",
    icon: "videocam",
    bgClass: "bg-tertiary-fixed",
    textClass: "text-on-tertiary-fixed",
  },
  {
    title: "Dual Dashcams",
    description: "Front & Rear coverage",
    icon: "camera_rear",
    bgClass: "bg-secondary-container",
    textClass: "text-on-secondary-container",
  },
  {
    title: "Fleet Telematics",
    description: "GPS & Cloud tracking",
    icon: "satellite_alt",
    bgClass: "bg-primary-container",
    textClass: "text-on-primary-container",
  },
  {
    title: "Memory & Storage",
    description: "High-Endurance SD cards",
    icon: "sd_card",
    bgClass: "bg-surface-container-high",
    textClass: "text-on-surface",
  },
];

export default function HardwareCategories() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8 border-b border-outline-variant/30 pb-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
            Hardware Categories
          </h2>
          <p className="text-sm text-on-surface-variant mt-1">
            Browse our specialized vehicle recording & tracking solutions
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {categories.map((cat, idx) => (
          <Link
            key={idx}
            href={`#product-grid`}
            className="group flex flex-col items-start p-5 sm:p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 hover:border-primary/40 hover:shadow-md transition-all cursor-pointer relative overflow-hidden"
          >
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${cat.bgClass} ${cat.textClass} group-hover:scale-110 transition-transform duration-300`}
            >
              <span className="material-symbols-outlined text-[24px]">{cat.icon}</span>
            </div>
            <h3 className="text-base font-bold text-on-surface mb-1">{cat.title}</h3>
            <p className="text-xs text-on-surface-variant font-medium">{cat.description}</p>
            <span className="material-symbols-outlined absolute top-6 right-6 text-outline/50 group-hover:text-primary transition-colors text-[20px] opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0">
              arrow_forward
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
