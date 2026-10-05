import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, FileCheck, Truck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Trust Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 mb-12 border-b border-slate-800/80">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">100% Genuine Licenses</h4>
              <p className="text-xs text-slate-400 mt-0.5">Direct vendor keys with verified activation.</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20 shrink-0">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">GST Tax Invoices</h4>
              <p className="text-xs text-slate-400 mt-0.5">B2B input tax credit on every corporate order.</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Pan-India Delivery</h4>
              <p className="text-xs text-slate-400 mt-0.5">Instant key dispatch &amp; insured hardware transit.</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <Link href="/" className="inline-flex items-center bg-white px-3 py-1.5 rounded-xl shadow-xs hover:bg-slate-100 transition-colors">
                <Image
                  src="/logo.png"
                  alt="Global Technologies"
                  width={160}
                  height={28}
                  className="h-5 sm:h-6 w-auto object-contain"
                />
              </Link>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm mb-4">
              Authorized reseller and distributor of commercial software solutions and specialized imported Korean dashcam hardware. Serving corporate IT, studios, and individual professionals across India.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] text-amber-300 font-medium">
              <span>The Technology Supermarket • Pan-India</span>
            </div>
          </div>

          {/* Software Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Software Solutions</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/software" className="hover:text-white transition-colors">
                  All Software
                </Link>
              </li>
              <li>
                <Link href="/software" className="hover:text-white transition-colors">
                  Antivirus &amp; Security
                </Link>
              </li>
              <li>
                <Link href="/software" className="hover:text-white transition-colors">
                  3D &amp; Game Engines (Unity)
                </Link>
              </li>
              <li>
                <Link href="/software" className="hover:text-white transition-colors">
                  Enterprise OS &amp; Red Hat
                </Link>
              </li>
              <li>
                <Link href="/software" className="hover:text-white transition-colors">
                  Multi-Seat Volume Quotes
                </Link>
              </li>
            </ul>
          </div>

          {/* Hardware & Orders */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Hardware Division</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/hardware" className="hover:text-white transition-colors">
                  Korean Dashcams
                </Link>
              </li>
              <li>
                <Link href="/hardware" className="hover:text-white transition-colors">
                  Dual-Channel 4K Dashcams
                </Link>
              </li>
              <li>
                <Link href="/orders" className="hover:text-white transition-colors">
                  Track My Order
                </Link>
              </li>
              <li>
                <Link href="/auth" className="hover:text-white transition-colors">
                  Partner Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Procurement Help */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Procurement &amp; Help</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/support" className="hover:text-white transition-colors">
                  Contact &amp; Support
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-white transition-colors">
                  GST Invoicing FAQs
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-white transition-colors">
                  Bulk Order RFQs
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Global Technologies. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Pan-India Distribution</span>
            <span>GST-Compliant Invoicing</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
