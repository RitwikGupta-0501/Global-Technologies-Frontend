// components/home/HeroSection.tsx
"use client";

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-48 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">


      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center">
        <span className="inline-block py-2 px-4 rounded-full bg-white/10 border border-white/20 text-blue-300 text-xs font-bold uppercase tracking-wider mb-6">
          Authorized Distributor
        </span>
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 leading-tight">
          Empowering the <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
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
