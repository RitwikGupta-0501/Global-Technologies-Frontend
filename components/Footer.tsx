"use client";

import React from "react";
import Link from "next/link";
import { useRequestQuote } from "~/context/RequestQuoteContext";

export default function Footer() {
  const { openQuoteModal } = useRequestQuote();

  return (
    <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/30 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img
                alt="Global-Tech"
                className="h-6 w-auto object-contain"
                src="/logo.png"
              />
              <span className="font-bold text-lg text-on-surface">Global-Tech</span>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              India&apos;s trusted destination for genuine commercial IT software, fleet-grade dashcams, and corporate hardware procurement with mandatory Input Tax Credit (ITC) compliant GST invoicing.
            </p>
            <div className="flex items-center gap-2 text-[10px] font-bold text-tertiary bg-tertiary-fixed/30 px-3 py-1.5 rounded-lg w-fit">
              <span className="material-symbols-outlined text-[14px]">verified_user</span>
              <span>AUTHORIZED DIRECT DISTRIBUTOR</span>
            </div>
          </div>

          {/* Product Categories */}
          <div>
            <h4 className="text-sm font-bold text-on-surface mb-4">Product Categories</h4>
            <ul className="space-y-2.5 text-xs text-on-surface-variant">
              <li>
                <Link className="hover:text-primary transition-colors" href="/software">
                  Operating Systems &amp; Servers
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" href="/software">
                  Enterprise Security &amp; Antivirus
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" href="/hardware">
                  Dual-Channel 4K Dashcams
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" href="/hardware">
                  Commercial Fleet Telematics
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" href="/software">
                  Cloud Productivity Suites
                </Link>
              </li>
            </ul>
          </div>

          {/* B2B & Customer Care */}
          <div>
            <h4 className="text-sm font-bold text-on-surface mb-4">B2B &amp; Customer Care</h4>
            <ul className="space-y-2.5 text-xs text-on-surface-variant">
              <li>
                <Link className="hover:text-primary transition-colors" href="/orders">
                  Download GST Tax Invoices
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" href="/orders">
                  Track Pan-India Consignment
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openQuoteModal()}
                  className="hover:text-primary transition-colors text-left cursor-pointer"
                >
                  Bulk Corporate RFQ
                </button>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" href="/support">
                  Returns &amp; OEM Warranty Claims
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openQuoteModal()}
                  className="hover:text-primary transition-colors text-left cursor-pointer"
                >
                  Authorized Reseller Program
                </button>
              </li>
            </ul>
          </div>

          {/* Corporate Technology Hub */}
          <div>
            <h4 className="text-sm font-bold text-on-surface mb-4">Corporate Technology Hub</h4>
            <div className="text-xs text-on-surface-variant space-y-2">
              <p className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[16px] text-primary shrink-0 mt-0.5">
                  apartment
                </span>
                <span>
                  Tower B, Prestige Tech Park, Marathahalli-Sarjapur Ring Rd, Kadubeesanahalli, Bengaluru, Karnataka 560103
                </span>
              </p>
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-primary shrink-0">
                  mail
                </span>
                <span>b2b@globaltech.in</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-primary shrink-0">
                  call
                </span>
                <span>+91 (080) 4129-8800</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-outline-variant/30 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-on-surface-variant">
          <p>© {new Date().getFullYear()} Global-Tech India Ltd. All rights reserved. Registered Indian Enterprise.</p>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2 py-1 bg-surface-container rounded text-[11px] font-semibold text-on-secondary-container">
              UPI
            </span>
            <span className="px-2 py-1 bg-surface-container rounded text-[11px] font-semibold text-on-secondary-container">
              RuPay
            </span>
            <span className="px-2 py-1 bg-surface-container rounded text-[11px] font-semibold text-on-secondary-container">
              Visa / MC
            </span>
            <span className="px-2 py-1 bg-surface-container rounded text-[11px] font-semibold text-on-secondary-container">
              NetBanking 50+
            </span>
            <span className="px-2 py-1 bg-surface-container rounded text-[11px] font-semibold text-on-secondary-container">
              GST ITC Ready
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
