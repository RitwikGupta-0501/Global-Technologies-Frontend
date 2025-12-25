import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

export default function Home() {
  // Mock Data with Multiple Images
  const products = [
    {
      id: 1,
      name: "McAfee Endpoint Security",
      desc: "Complete enterprise protection bundle for 50-100 nodes.",
      price: "$1,240",
      type: "Software",
      color: "blue",
      priceLabel: "Distributor Price",
      images: [
        "https://placehold.co/600x400/eff6ff/3b82f6?text=McAfee+Box+Front",
        "https://placehold.co/600x400/eff6ff/3b82f6?text=Dashboard+UI",
        "https://placehold.co/600x400/eff6ff/3b82f6?text=Security+Report",
      ],
    },
    {
      id: 2,
      name: "BlackBox 4K LTE",
      desc: "Cloud connected dashcam with night vision and parking mode.",
      price: "$289",
      type: "Hardware",
      color: "green",
      priceLabel: "Unit Price",
      images: [
        "https://placehold.co/600x400/f0fdf4/10b981?text=Dashcam+Front",
        "https://placehold.co/600x400/f0fdf4/10b981?text=Rear+Camera",
        "https://placehold.co/600x400/f0fdf4/10b981?text=Mobile+App+View",
      ],
    },
    {
      id: 3,
      name: "Unity Pro Enterprise",
      desc: "Annual multi-seat development license with priority support.",
      price: "$1,950",
      type: "Software",
      color: "blue",
      priceLabel: "Annual Price",
      images: [
        "https://placehold.co/600x400/eff6ff/3b82f6?text=Unity+Editor",
        "https://placehold.co/600x400/eff6ff/3b82f6?text=Asset+Store",
        "https://placehold.co/600x400/eff6ff/3b82f6?text=Team+Collaboration",
      ],
    },
    {
      id: 4,
      name: "FleetTrack OBD-II",
      desc: "Plug & Play real-time vehicle tracker with sim card included.",
      price: "$89",
      type: "Hardware",
      color: "green",
      priceLabel: "Unit Price",
      images: [
        "https://placehold.co/600x400/f0fdf4/10b981?text=OBD+Tracker",
        "https://placehold.co/600x400/f0fdf4/10b981?text=Install+Diagram",
        "https://placehold.co/600x400/f0fdf4/10b981?text=Live+Map",
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      {/* === HERO SECTION === */}
      <section className="relative pt-32 pb-48 bg-brand-dark overflow-hidden">
        {/* Ambient Aurora Blobs */}
        <div className="aurora-blob bg-brand-blue w-96 h-96 top-0 left-1/4 -translate-y-1/2 blur-3xl animate-float"></div>
        <div className="aurora-blob bg-brand-green w-80 h-80 bottom-0 right-1/4 translate-y-1/2 blur-3xl animate-float-delayed"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-slate-800/50 border border-slate-700 text-brand-blueLight text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-sm">
            Authorized Distributor
          </span>
          <h1 className="font-heading text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 leading-tight">
            Empowering the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blueLight to-brand-greenLight">
              Connected Ecosystem
            </span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Seamlessly sourcing enterprise software and commercial fleet
            hardware for modern businesses.
          </p>
        </div>

        {/* Decorative Curve Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg
            className="relative block w-[calc(100%+1.3px)] h-[80px]"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,432.84,2c-47.29-3.51-174.45-8-257,5.55c0,0-78.34,16.51-176,58.55V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              fill="#F8FAFC"
            ></path>
          </svg>
        </div>
      </section>

      {/* === OVERLAPPING CARDS SECTION === */}
      <section className="relative -mt-32 z-20 px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Software Card */}
            <div className="group glass-card p-8 rounded-3xl hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden bg-white">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-brand-blue flex items-center justify-center mb-6">
                  {/* Cloud Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                    />
                  </svg>
                </div>
                <h3 className="font-heading text-2xl font-bold text-slate-900 mb-2">
                  Software Solutions
                </h3>
                <p className="text-slate-500 mb-8 leading-relaxed">
                  Secure licensing for creative, security, and development
                  tools.
                </p>
                <div className="flex gap-2 flex-wrap mb-8">
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
                    Unity
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
                    McAfee
                  </span>
                </div>
                <button className="w-full btn-pill border border-slate-200 text-slate-700 hover:border-brand-blue hover:text-brand-blue hover:bg-white text-center">
                  Browse Catalog
                </button>
              </div>
            </div>

            {/* Hardware Card */}
            <div className="group glass-card p-8 rounded-3xl hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden bg-white">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-green-50 text-brand-green flex items-center justify-center mb-6">
                  {/* Truck/Dashcam Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                    />
                  </svg>
                </div>
                <h3 className="font-heading text-2xl font-bold text-slate-900 mb-2">
                  Fleet Hardware
                </h3>
                <p className="text-slate-500 mb-8 leading-relaxed">
                  Commercial dashcams, GPS tracking, and safety sensors.
                </p>
                <div className="flex gap-2 flex-wrap mb-8">
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
                    Dashcams
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
                    GPS
                  </span>
                </div>
                <button className="w-full btn-pill border border-slate-200 text-slate-700 hover:border-brand-green hover:text-brand-green hover:bg-white text-center">
                  View Inventory
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === MAIN SHOPPING AREA === */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-28">
              <h3 className="font-heading font-bold text-slate-900 text-lg mb-6">
                Filter
              </h3>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Category
                  </h4>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="cat"
                        className="w-4 h-4 text-brand-blue border-slate-300 focus:ring-brand-blue"
                        defaultChecked
                      />
                      <span className="text-sm font-medium group-hover:text-brand-blue transition-colors">
                        All Products
                      </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="cat"
                        className="w-4 h-4 text-brand-blue border-slate-300 focus:ring-brand-blue"
                      />
                      <span className="text-sm font-medium group-hover:text-brand-blue transition-colors">
                        Software
                      </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="cat"
                        className="w-4 h-4 text-brand-blue border-slate-300 focus:ring-brand-blue"
                      />
                      <span className="text-sm font-medium group-hover:text-brand-blue transition-colors">
                        Hardware
                      </span>
                    </label>
                  </div>
                </div>

                <div className="w-full h-px bg-slate-200"></div>

                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Availability
                  </h4>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded text-brand-blue border-slate-300 focus:ring-brand-blue"
                        defaultChecked
                      />
                      <span className="text-sm group-hover:text-brand-navy transition-colors">
                        In Stock
                      </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded text-brand-blue border-slate-300 focus:ring-brand-blue"
                      />
                      <span className="text-sm group-hover:text-brand-navy transition-colors">
                        Digital Delivery
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="font-heading text-2xl font-bold text-slate-900">
                  Featured Products
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Showing selected enterprise deals.
                </p>
              </div>
              <select className="bg-transparent border-none text-sm font-semibold text-slate-700 focus:ring-0 cursor-pointer hover:text-brand-blue transition-colors">
                <option>Sort by: Recommended</option>
                <option>Price: Low to High</option>
              </select>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="mt-12 text-center">
              <button className="bg-white border border-slate-200 text-slate-600 font-semibold py-3 px-8 rounded-full hover:bg-slate-50 hover:text-brand-blue transition-colors shadow-sm">
                View All Products
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* === FOOTER === */}
      <footer className="bg-brand-dark text-slate-400 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-1">
              <span className="text-white font-heading font-bold text-2xl">
                NEXGEN
              </span>
              <p className="mt-4 text-sm leading-relaxed text-slate-500">
                Connecting the world's leading software and automotive
                technologies to businesses everywhere.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Catalog</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href="#"
                    className="hover:text-brand-blue transition-colors"
                  >
                    Software
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-brand-green transition-colors"
                  >
                    Hardware
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    New Arrivals
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Support</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Partner Portal
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Get in Touch</h4>
              <ul className="space-y-3 text-sm">
                <li>hello@nexgen.distro</li>
                <li>+1 (555) 123-4567</li>
                <li className="flex gap-4 mt-4">
                  <a href="#" className="text-slate-500 hover:text-white">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a href="#" className="text-slate-500 hover:text-white">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-xs text-slate-600">
            &copy; 2025 NexGen Distribution. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
