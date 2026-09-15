"use client";

import type { SitemapNavItem } from "@/data/projects";
import { SectionHeading } from "@/components/case-study/SectionHeading";

/**
 * The one diagram the brief calls out as "validated" and worth reproducing
 * exactly — everything else in this case study is copy/tables, but this is
 * drawn as inline SVG so the boxes/arrows read crisply at any size. Colors
 * come from the site's real CSS custom properties (read at paint time via
 * `var(--color-...)`, same as every other component), not the light palette
 * the original reference mockup used — this diagram is page chrome, not a
 * recreation of Stride's own product UI, so it stays in the site's own
 * dark/accent language rather than switching to the lime brand identity.
 */
export function ArchitectureSitemapSection({
  heading,
  subheading,
  onboardingLabel,
  onboardingSub,
  navNote,
  navItems,
  subflowLabel,
  subflowSub,
  discrepancyNote,
}: {
  heading: string;
  subheading: string;
  onboardingLabel: string;
  onboardingSub: string;
  navNote: string;
  navItems: SitemapNavItem[];
  subflowLabel: string;
  subflowSub: string;
  discrepancyNote?: string;
}) {
  const navWidth = 150;
  const gap = 20;
  const startX = 400 - (navItems.length * navWidth + (navItems.length - 1) * gap) / 2;

  return (
    <div className="flex h-full flex-1 flex-col">
      <SectionHeading heading={heading} subheading={subheading} />
      <div className="mt-title-to-content flex flex-1 flex-col justify-center">
        <svg viewBox="0 0 800 330" className="w-full max-w-[820px]">
          <line x1={400} y1={70} x2={startX + navWidth / 2} y2={140} stroke="var(--color-border)" strokeWidth={2} />
          <line
            x1={startX + navWidth / 2}
            y1={205}
            x2={startX + navWidth / 2}
            y2={250}
            stroke="var(--color-border)"
            strokeWidth={2}
          />

          <rect x={300} y={20} width={200} height={50} rx={10} fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth={1.5} />
          <text x={400} y={42} textAnchor="middle" fontFamily="var(--font-display)" fontSize={14} fontWeight={600} fill="var(--color-text-primary)">
            {onboardingLabel}
          </text>
          <text x={400} y={59} textAnchor="middle" fontSize={10} fill="var(--color-text-secondary)">
            {onboardingSub}
          </text>

          <text x={400} y={132} textAnchor="middle" fontSize={10} fill="var(--color-text-muted)">
            {navNote}
          </text>
          <rect
            x={50}
            y={140}
            width={700}
            height={65}
            rx={14}
            fill="rgba(255,255,255,0.03)"
            stroke="var(--color-border)"
            strokeWidth={1.5}
            strokeDasharray="4 4"
          />

          {navItems.map((item, i) => {
            const x = startX + i * (navWidth + gap);
            const cx = x + navWidth / 2;
            return (
              <g key={item.label}>
                <rect
                  x={x}
                  y={155}
                  width={navWidth}
                  height={35}
                  rx={9}
                  fill={item.highlight ? "var(--color-accent-soft)" : "var(--color-surface)"}
                  stroke={item.highlight ? "var(--color-accent)" : "var(--color-border)"}
                  strokeWidth={1.5}
                />
                <text x={cx} y={177} textAnchor="middle" fontFamily="var(--font-display)" fontSize={13} fontWeight={600} fill="var(--color-text-primary)">
                  {item.label}
                </text>
                <text x={cx} y={222} textAnchor="middle" fontSize={8.5} fill="var(--color-text-muted)">
                  {item.sub}
                </text>
              </g>
            );
          })}

          <rect
            x={startX}
            y={250}
            width={navWidth}
            height={55}
            rx={10}
            fill="rgba(255,255,255,0.03)"
            stroke="var(--color-border)"
            strokeWidth={1.5}
            strokeDasharray="3 3"
          />
          <text x={startX + navWidth / 2} y={273} textAnchor="middle" fontFamily="var(--font-display)" fontSize={12} fontWeight={600} fill="var(--color-text-primary)">
            {subflowLabel}
          </text>
          <text x={startX + navWidth / 2} y={288} textAnchor="middle" fontSize={9} fill="var(--color-text-secondary)">
            {subflowSub}
          </text>
        </svg>

        {discrepancyNote && (
          <p className="mt-5 max-w-[64ch] border-l-2 border-border pl-4 text-xs leading-relaxed text-text-muted">
            {discrepancyNote}
          </p>
        )}
      </div>
    </div>
  );
}
