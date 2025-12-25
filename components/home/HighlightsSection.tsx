// components/home/HighlightsSection.tsx
"use client";

export default function HighlightsSection() {
  return (
    <section className="relative -mt-32 z-20 px-4 sm:px-6 lg:px-8 pb-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Software Card */}
          <div className="group glass-card p-8 rounded-3xl hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden bg-white">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
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
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Software Solutions
              </h3>
              <p className="text-slate-500 mb-8 leading-relaxed">
                Secure licensing for creative, security, and development tools.
              </p>
              <div className="flex gap-2 flex-wrap mb-8">
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
                  Unity
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
                  McAfee
                </span>
              </div>
            </div>
          </div>

          {/* Hardware Card */}
          <div className="group glass-card p-8 rounded-3xl hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden bg-white">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
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
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
