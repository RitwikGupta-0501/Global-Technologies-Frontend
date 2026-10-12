"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/../components/Navbar";
import Footer from "@/../components/Footer";
import { allPartners, BrandItem } from "@/lib/partners-data";
import { useRequestQuote } from "~/context/RequestQuoteContext";

function PartnersContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");
  const initialBrand = searchParams.get("brand");

  const [activeCategory, setActiveCategory] = useState<"all" | "Software" | "Hardware">(
    initialCategory === "Software" || initialCategory === "Hardware"
      ? initialCategory
      : "all"
  );
  const [searchQuery, setSearchQuery] = useState(
    initialBrand ? (allPartners.find((p) => p.id === initialBrand)?.name || "") : ""
  );

  // Partnership form states
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    partnerType: "software_publisher",
    estimatedVolume: "",
    portfolioDescription: "",
  });

  const { openQuoteModal } = useRequestQuote();

  const softwareCount = useMemo(() => allPartners.filter((p) => p.category === "Software").length, []);
  const hardwareCount = useMemo(() => allPartners.filter((p) => p.category === "Hardware").length, []);

  const filteredPartners = useMemo(() => {
    return allPartners.filter((brand) => {
      const matchesCategory =
        activeCategory === "all" || brand.category === activeCategory;

      if (!searchQuery.trim()) return matchesCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        brand.name.toLowerCase().includes(q) ||
        brand.desc.toLowerCase().includes(q) ||
        (brand.longDesc && brand.longDesc.toLowerCase().includes(q)) ||
        brand.tier.toLowerCase().includes(q) ||
        brand.popularSolutions.some((s) => s.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 900);
  };

  return (
    <>
      <Navbar />

      <main className="w-full pt-28 sm:pt-36 pb-20 bg-background min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Hero Section */}
          <section className="relative rounded-3xl bg-surface-container-lowest/90 backdrop-blur-xl border border-outline-variant/30 p-8 sm:p-12 lg:p-16 overflow-hidden shadow-[0_4px_32px_rgba(11,28,48,0.04)]">
            <div className="absolute -top-32 right-1/4 w-96 h-64 bg-gradient-to-b from-primary/15 via-primary/5 to-transparent blur-3xl pointer-events-none -z-10" />

            <div className="max-w-3xl space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono font-bold uppercase tracking-wider">
                <span className="material-symbols-outlined text-[16px]">verified_user</span>
                <span>Official Direct OEM Alliances</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-on-surface tracking-tight leading-tight">
                Authorized Brand Partners &amp; OEM Directory
              </h1>

              <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed font-normal">
                Direct commercial agreements with global enterprise software publishers and automotive telematics hardware manufacturers. Certified volume licensing, authorized national warranty coverage, and dedicated B2B account SLAs.
              </p>

              {/* Fast Jump Links */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#directory"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs sm:text-sm shadow-sm hover:bg-primary/90 transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">manage_search</span>
                  <span>Browse Directory ({allPartners.length} Brands)</span>
                </a>
                <a
                  href="#become-a-partner"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-outline-variant/40 hover:border-primary/50 text-on-surface hover:text-primary font-semibold text-xs sm:text-sm transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">handshake</span>
                  <span>Apply to Become a Partner</span>
                </a>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 mt-10 border-t border-outline-variant/20">
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-extrabold text-primary font-mono">16+</div>
                <div className="text-xs text-on-surface-variant font-medium">Direct Global OEM Partners</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-extrabold text-on-surface font-mono">100%</div>
                <div className="text-xs text-on-surface-variant font-medium">Genuine Publisher Licenses</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-extrabold text-tertiary font-mono">18% ITC</div>
                <div className="text-xs text-on-surface-variant font-medium">Mandatory GST B2B Invoicing</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-extrabold text-on-surface font-mono">24/7</div>
                <div className="text-xs text-on-surface-variant font-medium">Corporate SLA &amp; Warranty Hub</div>
              </div>
            </div>
          </section>

          {/* Directory Section */}
          <section id="directory" className="space-y-6 scroll-mt-32">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-on-surface">
                  All Authorized Brand Partners
                </h2>
                <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
                  Explore authorized publishers, cloud CSPs, and telematics hardware importers.
                </p>
              </div>

              {/* Controls: Category tabs + Search bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Category Filter Pills */}
                <div
                  role="tablist"
                  className="flex items-center gap-1 p-1 bg-surface-container-low/80 border border-outline-variant/30 rounded-2xl"
                >
                  <button
                    type="button"
                    onClick={() => setActiveCategory("all")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      activeCategory === "all"
                        ? "bg-primary text-on-primary shadow-sm"
                        : "text-on-surface-variant hover:text-on-surface"
                    }`}
                  >
                    All ({allPartners.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveCategory("Software")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      activeCategory === "Software"
                        ? "bg-primary text-on-primary shadow-sm"
                        : "text-on-surface-variant hover:text-on-surface"
                    }`}
                  >
                    Software ({softwareCount})
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveCategory("Hardware")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      activeCategory === "Hardware"
                        ? "bg-primary text-on-primary shadow-sm"
                        : "text-on-surface-variant hover:text-on-surface"
                    }`}
                  >
                    Telematics ({hardwareCount})
                  </button>
                </div>

                {/* Instant Search Bar */}
                <div className="relative w-full sm:w-64">
                  <span
                    className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant text-[18px] pointer-events-none"
                    aria-hidden="true"
                  >
                    search
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search brand or product..."
                    className="w-full pl-9 pr-8 py-2 text-xs bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-on-surface placeholder:text-outline-variant focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-outline-variant hover:text-on-surface p-0.5"
                    >
                      <span className="material-symbols-outlined text-[16px]">close</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Partners Grid */}
            {filteredPartners.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPartners.map((brand) => (
                  <PartnerDirectoryCard
                    key={brand.id}
                    brand={brand}
                    onOpenQuote={() => openQuoteModal()}
                  />
                ))}
              </div>
            ) : (
              <div className="py-20 px-6 text-center bg-surface-container-lowest border border-outline-variant/30 rounded-3xl">
                <span className="material-symbols-outlined text-outline-variant text-[44px] mb-2 inline-block">
                  search_off
                </span>
                <p className="text-base font-bold text-on-surface">No partners found matching &ldquo;{searchQuery}&rdquo;</p>
                <p className="text-xs text-on-surface-variant mt-1 max-w-sm mx-auto">
                  Try clearing your search query or switching between the Software and Hardware categories.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                  }}
                  className="mt-4 px-4 py-2 text-xs font-semibold text-primary bg-primary/10 rounded-xl hover:bg-primary/20 transition-colors cursor-pointer"
                >
                  Reset Search
                </button>
              </div>
            )}
          </section>

          {/* Become a Partner Section */}
          <section
            id="become-a-partner"
            className="scroll-mt-32 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-[0_4px_32px_rgba(11,28,48,0.03)]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Why Partner */}
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/30 text-secondary text-xs font-mono font-bold uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[15px]">handshake</span>
                  <span>OEM Channel Expansion</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
                  Partner with Global-Tech
                </h2>

                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Are you an enterprise software ISV or commercial telematics manufacturer looking to expand your certified distribution in India? Global-Tech provides an established B2B commerce network with direct enterprise relationships.
                </p>

                <div className="space-y-4 pt-2">
                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[18px]">domain_verification</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-on-surface">500+ Enterprise &amp; Fleet Clients</h4>
                      <p className="text-xs text-on-surface-variant mt-0.5">
                        Direct procurement relationships with top IT companies, fleet operators, and logistics networks across India.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-tertiary/10 text-tertiary flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-on-surface">100% Tax &amp; GST Compliance</h4>
                      <p className="text-xs text-on-surface-variant mt-0.5">
                        Automated B2B GST e-invoicing, e-way bill generation, and full Input Tax Credit compliance.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[18px]">shield_check</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-on-surface">Authorized Warranty &amp; RMA Hub</h4>
                      <p className="text-xs text-on-surface-variant mt-0.5">
                        Local Indian diagnostic, RMA replacement, and customer service depot support.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Partnership Request Form */}
              <div className="lg:col-span-7 bg-surface-container-low/60 border border-outline-variant/30 rounded-2xl p-6 sm:p-8">
                {formSubmitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
                      <span className="material-symbols-outlined text-[32px]">check_circle</span>
                    </div>
                    <h3 className="text-xl font-bold text-on-surface">Partnership Inquiry Received</h3>
                    <p className="text-sm text-on-surface-variant max-w-md mx-auto leading-relaxed">
                      Thank you for your interest in partnering with Global-Tech. Our OEM Alliances director will review your submission and contact you within 1 business day.
                    </p>
                    <button
                      type="button"
                      onClick={() => setFormSubmitted(false)}
                      className="mt-4 px-5 py-2 text-xs font-semibold text-primary bg-primary/10 rounded-xl hover:bg-primary/20 transition-colors cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-on-surface">Request Partnership Details</h3>
                      <p className="text-xs text-on-surface-variant">
                        Fill out the information below to connect with our vendor alliance team.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-on-surface mb-1">
                          Company / Brand Name <span className="text-error">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                          placeholder="e.g. Acme Tech Solutions"
                          className="w-full px-3 py-2 text-xs bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-on-surface placeholder:text-outline-variant focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-on-surface mb-1">
                          Contact Person <span className="text-error">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.contactName}
                          onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full px-3 py-2 text-xs bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-on-surface placeholder:text-outline-variant focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-on-surface mb-1">
                          Corporate Email <span className="text-error">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@company.com"
                          className="w-full px-3 py-2 text-xs bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-on-surface placeholder:text-outline-variant focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-on-surface mb-1">
                          Phone / WhatsApp <span className="text-error">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-3 py-2 text-xs bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-on-surface placeholder:text-outline-variant focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-on-surface mb-1">
                          Partnership Category
                        </label>
                        <select
                          value={formData.partnerType}
                          onChange={(e) => setFormData({ ...formData, partnerType: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-on-surface focus:outline-none focus:border-primary/50"
                        >
                          <option value="software_publisher">Software Publisher / ISV</option>
                          <option value="oem_manufacturer">Telematics &amp; Hardware OEM</option>
                          <option value="fleet_integrator">Fleet Telematics Integrator</option>
                          <option value="corporate_reseller">Authorized Corporate Reseller</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-on-surface mb-1">
                          Estimated Annual Volume
                        </label>
                        <input
                          type="text"
                          value={formData.estimatedVolume}
                          onChange={(e) => setFormData({ ...formData, estimatedVolume: e.target.value })}
                          placeholder="e.g. 500+ licenses or 100+ units"
                          className="w-full px-3 py-2 text-xs bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-on-surface placeholder:text-outline-variant focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-on-surface mb-1">
                        Portfolio Details / Distribution Proposal <span className="text-error">*</span>
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={formData.portfolioDescription}
                        onChange={(e) => setFormData({ ...formData, portfolioDescription: e.target.value })}
                        placeholder="Describe your product lineup, current certifications (e.g. AIS-140, CE, FCC), and target distribution scope..."
                        className="w-full px-3 py-2 text-xs bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-on-surface placeholder:text-outline-variant focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-2.5 px-4 rounded-xl bg-primary text-on-primary font-bold text-xs sm:text-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 shadow-sm"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin" />
                          <span>Submitting Application...</span>
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-[18px]">send</span>
                          <span>Submit Partnership Application</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

function PartnerDirectoryCard({
  brand,
  onOpenQuote,
}: {
  brand: BrandItem;
  onOpenQuote: () => void;
}) {
  const isHardware = brand.category === "Hardware";

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/30 hover:border-primary/40 rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 hover:shadow-md">
      <div className="space-y-4">
        {/* Header: Icon & Category */}
        <div className="flex items-start justify-between">
          <div
            className={`w-12 h-12 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-center justify-center text-on-surface ${
              isHardware ? "text-tertiary" : "text-primary"
            }`}
          >
            {brand.iconType === "symbol" ? (
              <span className="material-symbols-outlined text-[24px]">{brand.iconSymbol}</span>
            ) : (
              brand.iconSvg
            )}
          </div>
          <span
            className={`text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full font-bold ${
              isHardware
                ? "bg-tertiary-fixed/40 text-tertiary"
                : "bg-primary/10 text-primary"
            }`}
          >
            {brand.category}
          </span>
        </div>

        {/* Title & Tier */}
        <div>
          <h3 className="text-lg font-bold text-on-surface">{brand.name}</h3>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-outline mt-1">
            <span className={`w-2 h-2 rounded-full ${brand.tierDotColor}`} />
            <span>{brand.tier}</span>
          </div>
        </div>

        {/* Long Description */}
        <p className="text-xs text-on-surface-variant leading-relaxed">
          {brand.longDesc || brand.desc}
        </p>

        {/* Solutions List */}
        {brand.popularSolutions && brand.popularSolutions.length > 0 && (
          <div className="space-y-1.5 pt-2 border-t border-outline-variant/20">
            <span className="text-[10px] font-mono uppercase tracking-wider text-outline font-semibold">
              Authorized Lineup:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {brand.popularSolutions.map((solution) => (
                <span
                  key={solution}
                  className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-surface-container text-on-surface-variant"
                >
                  {solution}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="pt-5 mt-5 border-t border-outline-variant/20 flex items-center gap-2">
        <Link
          href={brand.productPath}
          className="flex-1 text-center py-2 px-3 rounded-xl bg-surface-container-low hover:bg-surface-container border border-outline-variant/30 text-xs font-semibold text-on-surface hover:text-primary transition-colors cursor-pointer"
        >
          Browse Products
        </Link>
        <button
          type="button"
          onClick={onOpenQuote}
          className="py-2 px-3 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1"
          title="Request Enterprise Quote"
        >
          <span className="material-symbols-outlined text-[15px]">request_quote</span>
          <span>Quote</span>
        </button>
      </div>
    </div>
  );
}

export default function PartnersPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <PartnersContent />
    </Suspense>
  );
}
