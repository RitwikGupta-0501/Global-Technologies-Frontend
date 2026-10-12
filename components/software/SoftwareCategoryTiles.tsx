import React from "react";

const CATEGORIES = [
  {
    id: "dev-tools",
    title: "Developer Tools",
    icon: "code_blocks",
    desc: "IDEs, DevOps utilities, and coding environments for software engineering teams.",
    colorClass: "bg-primary/5 border-primary/20 hover:border-primary/40",
    iconColorClass: "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-on-primary",
    link: "#all-software",
  },
  {
    id: "cloud-security",
    title: "Cloud Security",
    icon: "security",
    desc: "Endpoint protection, firewalls, and enterprise cybersecurity suites.",
    colorClass: "bg-tertiary/5 border-tertiary/20 hover:border-tertiary/40",
    iconColorClass: "bg-tertiary/10 text-tertiary group-hover:bg-tertiary group-hover:text-on-tertiary",
    link: "#all-software",
  },
  {
    id: "office",
    title: "Office & Productivity",
    icon: "work",
    desc: "Collaborative tools, document editing, and business management software.",
    colorClass: "bg-secondary/5 border-secondary/20 hover:border-secondary/40",
    iconColorClass: "bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-on-secondary",
    link: "#all-software",
  },
  {
    id: "design-cad",
    title: "Design & CAD",
    icon: "architecture",
    desc: "3D modeling, vector graphics, and digital art licenses.",
    colorClass: "bg-surface-container-low border-outline-variant/30 hover:border-outline-variant/60",
    iconColorClass: "bg-surface-container-high text-on-surface-variant group-hover:bg-on-surface group-hover:text-surface-container",
    link: "#all-software",
  },
];

export default function SoftwareCategoryTiles() {
  return (
    <section className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
          Browse by Category
        </h2>
        <p className="text-sm text-on-surface-variant mt-1">
          Explore software tailored to your professional workflow.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CATEGORIES.map((cat) => (
          <a
            key={cat.id}
            href={cat.link}
            aria-label={`Browse ${cat.title} category`}
            className={`group flex items-start p-6 rounded-2xl border shadow-sm hover:shadow-md transition-all duration-300 ${cat.colorClass}`}
          >
            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center mr-5 shrink-0 transition-colors duration-300 ${cat.iconColorClass}`}
              aria-hidden="true"
            >
              <span className="material-symbols-outlined text-[28px]">
                {cat.icon}
              </span>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-on-surface mb-1">
                  {cat.title}
                </h3>
                <span className="material-symbols-outlined text-outline-variant group-hover:text-on-surface transition-colors translate-x-0 group-hover:translate-x-1 duration-300" aria-hidden="true">
                  arrow_forward
                </span>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed mt-1">
                {cat.desc}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
