import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="w-full pt-28 sm:pt-36 pb-20 bg-background min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
              <span className="material-symbols-outlined text-[15px]">verified_user</span>
              Authorized Direct Distributor
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-on-surface tracking-tight">
              About Global-Tech
            </h1>
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-on-surface-variant leading-relaxed">
              India&apos;s trusted destination for genuine commercial IT software, fleet-grade dashcams, and corporate hardware procurement with mandatory GST ITC compliant invoicing.
            </p>
          </div>

          {/* Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-container-low border border-outline-variant/30 rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">terminal</span>
              </div>
              <h3 className="font-bold text-base text-on-surface">Genuine Software</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Direct-from-publisher licensing for Microsoft, enterprise security suites, server software, and cloud productivity tools.
              </p>
            </div>

            <div className="bg-surface-container-low border border-outline-variant/30 rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-tertiary/10 text-tertiary flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">videocam</span>
              </div>
              <h3 className="font-bold text-base text-on-surface">Fleet-Grade Hardware</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Dual-channel 4K dashcams, commercial telematics, and heavy-duty surveillance solutions tested for Indian operating conditions.
              </p>
            </div>

            <div className="bg-surface-container-low border border-outline-variant/30 rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">receipt_long</span>
              </div>
              <h3 className="font-bold text-base text-on-surface">100% Verified GST</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Every order comes with official B2B tax invoices enabling 18% Input Tax Credit (ITC) claim for registered businesses.
              </p>
            </div>
          </div>

          {/* Corporate Hub Info */}
          <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[22px]">apartment</span>
              Corporate Technology Hub
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-on-surface-variant">
              <div>
                <p className="font-semibold text-on-surface mb-1">Headquarters</p>
                <p>Tower B, Prestige Tech Park, Marathahalli-Sarjapur Ring Rd, Kadubeesanahalli, Bengaluru, Karnataka 560103</p>
              </div>
              <div>
                <p className="font-semibold text-on-surface mb-1">Corporate Procurement Desk</p>
                <p>Email: b2b@globaltech.in</p>
                <p>Phone: +91 (080) 4129-8800</p>
              </div>
              <div>
                <p className="font-semibold text-on-surface mb-1">Fulfillment Network</p>
                <p>Pan-India insured express logistics with real-time consignment tracking and OEM warranty support.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
