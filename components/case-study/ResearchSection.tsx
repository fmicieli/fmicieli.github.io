"use client";

import { motion } from "framer-motion";
import type { ResearchChartBar } from "@/data/projects";
import { SectionHeading } from "@/components/case-study/SectionHeading";

// Same category -> color mapping as the validated mockup, expressed with the
// site's real tokens instead of hardcoded hex: accent (lime is reserved for
// the Design System panel only) for the one actionable-workout outcome,
// two neutral greys for the two "still failed the beginner" outcomes.
const CATEGORY_CLASS: Record<ResearchChartBar["category"], string> = {
  workout: "bg-accent",
  paywall: "bg-text-secondary",
  noplan: "bg-white/20",
};

export function ResearchSection({
  heading,
  subheading,
  competitors,
  chartTitle,
  chartBars,
  legend,
  insights,
  quote,
}: {
  heading: string;
  subheading: string;
  competitors: string[];
  chartTitle: string;
  chartBars: ResearchChartBar[];
  legend: { workout: string; paywall: string; noplan: string };
  insights: string[];
  quote: string;
}) {
  return (
    <div className="flex h-full flex-1 flex-col">
      <SectionHeading heading={heading} subheading={subheading} />
      <div className="mt-title-to-content flex flex-1 flex-col justify-center gap-8">
        <ul className="flex flex-wrap gap-2">
          {competitors.map((name) => (
            <li
              key={name}
              className="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-text-secondary"
            >
              {name}
            </li>
          ))}
        </ul>

        <div>
          <p className="mb-4 font-mono text-label uppercase tracking-wide text-text-muted">{chartTitle}</p>
          <div className="flex flex-col gap-3">
            {chartBars.map((bar, i) => (
              <div key={bar.label} className="flex items-center gap-3">
                <p className="w-28 shrink-0 text-sm text-text-secondary sm:w-32">{bar.label}</p>
                <div className="relative h-6 flex-1 overflow-hidden rounded-md border border-border bg-surface">
                  <motion.div
                    className={`flex h-full items-center rounded-[4px] pl-2.5 ${CATEGORY_CLASS[bar.category]}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${bar.percent}%` }}
                    viewport={{ once: false, margin: "-40px" }}
                    transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="whitespace-nowrap font-mono text-[10.5px] font-medium text-bg">
                      {bar.caption}
                    </span>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-4">
            <span className="flex items-center gap-1.5 text-xs text-text-muted">
              <i className="inline-block h-2.5 w-2.5 rounded-[3px] bg-accent" />
              {legend.workout}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-text-muted">
              <i className="inline-block h-2.5 w-2.5 rounded-[3px] bg-text-secondary" />
              {legend.paywall}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-text-muted">
              <i className="inline-block h-2.5 w-2.5 rounded-[3px] bg-white/20" />
              {legend.noplan}
            </span>
          </div>
        </div>

        <ul className="flex max-w-[62ch] flex-col gap-2.5">
          {insights.map((insight, i) => (
            <motion.li
              key={insight}
              className="rounded-card border border-border bg-surface p-4 text-sm leading-relaxed text-text-secondary"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="mr-2 text-accent">—</span>
              {insight}
            </motion.li>
          ))}
        </ul>

        <p className="max-w-[58ch] border-l-2 border-accent pl-5 text-[17px] italic leading-relaxed text-text-primary">
          &ldquo;{quote}&rdquo;
        </p>
      </div>
    </div>
  );
}
