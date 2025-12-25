// components/home/HeroSection.tsx
"use client";

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-48 bg-slate-900 overflow-hidden">
      <div className="absolute bg-blue-500 w-96 h-96 top-10 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-10" />
      <div className="absolute bg-emerald-500 w-80 h-80 bottom-0 right-1/4 translate-y-1/2 blur-3xl opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center">
        <span className="inline-block py-1 px-3 rounded-full bg-slate-800/50 border border-slate-700 text-blue-300 text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-sm">
          Authorized Distributor
        </span>
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 leading-tight">
          Empowering the <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-emerald-400">
            Connected Ecosystem
          </span>
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
          Seamlessly sourcing enterprise software and commercial fleet hardware
          for modern businesses.
        </p>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0">
        <svg
          className="relative block w-[calc(100%+1.3px)] h-20"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,432.84,2c-47.29-3.51-174.45-8-257,5.55c0,0-78.34,16.51-176,58.55V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            fill="#F8FAFC"
          />
        </svg>
      </div>
    </section>
  );
}
