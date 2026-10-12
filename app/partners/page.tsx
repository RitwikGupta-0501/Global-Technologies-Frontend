import React, { Suspense } from "react";
import { Metadata } from "next";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PartnersContent from "./PartnersContent";

export const metadata: Metadata = {
  title: "Authorized Brand Partners & OEM Directory | Global-Tech",
  description:
    "Direct commercial alliances with global enterprise software publishers and telematics hardware manufacturers. Genuine licensing, GST ITC invoicing, and dedicated B2B SLAs.",
  keywords: [
    "Authorized OEM Partners",
    "Enterprise Software Licensing India",
    "Microsoft CSP India",
    "Red Hat Premier Partner",
    "Queclink AIS-140 Importer",
    "VIOFO India Distributor",
    "GST B2B Invoicing",
  ],
  openGraph: {
    title: "Authorized Brand Partners & OEM Directory | Global-Tech",
    description:
      "Direct OEM alliances with enterprise software publishers and telematics hardware manufacturers in India.",
    type: "website",
  },
};

export default function PartnersPage() {
  return (
    <>
      <Navbar />
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-background">
            <div
              className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"
              role="status"
              aria-label="Loading directory content"
            />
          </div>
        }
      >
        <PartnersContent />
      </Suspense>
      <Footer />
    </>
  );
}
