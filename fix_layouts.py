import os
import re

def fix_layout(filepath, title, subtitle, badge_text):
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Replace the <main> block and the legacy header
    pattern = re.compile(r'<main className="min-h-screen[^>]*>\s*<Navbar />\s*<div className="pt-36[^>]*>.*?</div>\s*</div>\s*(<ProductGrid [^>]*/>)\s*<Footer />\s*</main>', re.DOTALL)
    
    replacement = f"""<>
      <Navbar />
      <main className="w-full pt-44 bg-background pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="flex flex-col items-start gap-4">
            <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-surface-container-high text-on-surface border border-outline-variant/30">
              {badge_text}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight">
              {title}
            </h1>
            <p className="max-w-2xl text-lg text-on-surface-variant font-medium">
              {subtitle}
            </p>
          </div>
        </div>
        \\1
      </main>
      <Footer />
    </>"""
    
    new_content = pattern.sub(replacement, content)
    
    with open(filepath, 'w') as f:
        f.write(new_content)

fix_layout('app/hardware/page.tsx', 
           'Imported Korean Dashcams', 
           'High-precision vehicle recording systems, optical sensors, and commercial dashcam hardware. Available for individual drivers and corporate fleet bulk supply.', 
           'Specialized Hardware Import')
           
fix_layout('app/software/page.tsx', 
           'Software Solutions & Licensing', 
           'Enterprise-grade development tools, productivity suites, and cybersecurity licenses for corporate teams and independent professionals.', 
           'Digital Distribution')

