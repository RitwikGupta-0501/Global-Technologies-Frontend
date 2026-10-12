import React from "react";

export interface SectionHeaderProps {
  title: string;
  description?: string;
  badge?: string;
  action?: React.ReactNode;
  divider?: boolean;
  headingLevel?: "h1" | "h2" | "h3";
  className?: string;
}

export default function SectionHeader({
  title,
  description,
  badge,
  action,
  divider = false,
  headingLevel = "h2",
  className = "mb-8",
}: SectionHeaderProps) {
  const HeadingTag = headingLevel;

  return (
    <div
      className={`w-full flex flex-col md:flex-row md:items-end justify-between gap-4 ${
        divider ? "border-b border-outline-variant/30 pb-6" : ""
      } ${className}`}
    >
      <div className="max-w-2xl space-y-1.5">
        {badge && (
          <span className="inline-block text-xs font-bold text-primary uppercase tracking-wider mb-1">
            {badge}
          </span>
        )}
        <HeadingTag className="text-2xl sm:text-3xl font-bold tracking-tight text-on-surface">
          {title}
        </HeadingTag>
        {description && (
          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
