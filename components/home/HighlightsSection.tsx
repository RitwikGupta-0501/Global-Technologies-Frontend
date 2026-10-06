"use client";

import { 
  LayoutGrid, 
  Server, 
  Hexagon, 
  Camera, 
  Aperture,
  Focus,
  Cctv
} from "lucide-react";

export default function HighlightsSection() {
  const partners = [
    {
      name: "Microsoft",
      type: "Enterprise Software",
      icon: LayoutGrid,
      className: "col-span-1 md:col-span-2 row-span-2",
      titleSize: "text-4xl sm:text-5xl",
      iconSize: "w-12 h-12 sm:w-16 sm:h-16"
    },
    {
      name: "Red Hat",
      type: "Server & OS",
      icon: Server,
      className: "col-span-1 row-span-1",
      titleSize: "text-2xl",
      iconSize: "w-8 h-8"
    },
    {
      name: "Unity",
      type: "3D Engines",
      icon: Hexagon,
      className: "col-span-1 row-span-1",
      titleSize: "text-2xl",
      iconSize: "w-8 h-8"
    },
    {
      name: "BlackVue",
      type: "Dashcam Hardware",
      icon: Camera,
      className: "col-span-1 md:col-span-2 row-span-1",
      titleSize: "text-3xl",
      iconSize: "w-10 h-10"
    },
    {
      name: "Sony",
      type: "STARVIS™ Optics",
      icon: Aperture,
      className: "col-span-1 md:col-span-2 row-span-1",
      titleSize: "text-3xl",
      iconSize: "w-10 h-10"
    },
    {
      name: "Thinkware",
      type: "Precision Dashcams",
      icon: Focus,
      className: "col-span-1 row-span-1",
      titleSize: "text-2xl",
      iconSize: "w-8 h-8"
    },
    {
      name: "FineVu",
      type: "Vehicle Security",
      icon: Cctv,
      className: "col-span-1 row-span-1",
      titleSize: "text-2xl",
      iconSize: "w-8 h-8"
    }
  ];

  return (
    <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32 py-16">
      
      <div className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-semibold text-slate-900 tracking-tight mb-4">
          Trusted Partners.
        </h2>
        <p className="text-lg text-slate-500 font-medium leading-relaxed">
          Authorized licensing and hardware sourcing from the world&apos;s leading technology publishers and manufacturers.
        </p>
      </div>

      {/* Ultra-Minimal Apple-Style Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[200px] gap-4 sm:gap-6">
        {partners.map((partner, idx) => {
          const Icon = partner.icon;
          return (
            <div 
              key={idx} 
              className={`group flex flex-col justify-between p-8 rounded-[2rem] bg-slate-50 hover:bg-white border border-slate-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-500 ease-out cursor-default overflow-hidden relative ${partner.className}`}
            >
              {/* Top Row: Icon & Type */}
              <div className="flex justify-between items-start relative z-10">
                <Icon className={`${partner.iconSize} text-slate-400 group-hover:text-slate-900 transition-colors duration-500`} strokeWidth={1.5} />
                <span className="text-xs font-semibold tracking-wide text-slate-400 group-hover:text-slate-500 transition-colors duration-500 text-right">
                  {partner.type}
                </span>
              </div>

              {/* Bottom Row: Brand Name */}
              <div className="relative z-10">
                <h3 className={`${partner.titleSize} font-semibold tracking-tight text-slate-800 group-hover:text-black transition-colors duration-500`}>
                  {partner.name}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
      
    </section>
  );
}
