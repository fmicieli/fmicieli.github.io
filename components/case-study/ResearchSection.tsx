"use client";

import { motion } from "framer-motion";
import type { CompetitorLogo, ResearchChartBar } from "@/data/projects";
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

// Wraps every occurrence of a competitor's name inside an insight's free-text
// sentence in white — the rest of the sentence stays the muted secondary
// color, so the app names (what a reader is scanning for) pop out without
// needing a separate bullet marker.
function highlightNames(text: string, names: string[]) {
  if (names.length === 0) return text;
  const pattern = new RegExp(`(${names.map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");
  return text.split(pattern).map((part, i) =>
    names.includes(part) ? (
      <span key={i} className="font-medium text-text-primary">
        {part}
      </span>
    ) : (
      part
    )
  );
}

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
  competitors: CompetitorLogo[];
  chartTitle: string;
  chartBars: ResearchChartBar[];
  legend: { workout: string; paywall: string; noplan: string };
  insights: string[];
  quote: string;
}) {
  const competitorNames = competitors.map((c) => c.name);

  return (
    <div className="flex h-full flex-1 flex-col">
      <SectionHeading heading={heading} subheading={subheading} />
      <div className="mt-title-to-content flex flex-1 flex-col justify-center gap-8">
        <ul className="flex flex-wrap justify-center gap-[28.8px] sm:justify-start">
          {competitors.map((competitor) => (
            <li key={competitor.name} className="flex flex-col items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={competitor.logo} alt={competitor.name} className="h-[64px] w-[64px] rounded-[2px] object-contain" />
              <p className="text-xs text-text-secondary">{competitor.name}</p>
            </li>
          ))}
        </ul>

        <div>
          <p className="mb-4 font-mono text-label uppercase tracking-wide text-text-muted">{chartTitle}</p>
          {/* Same row shape as BBVA's BenchmarkingSection: name label, a
              rounded-full pill track/fill (not the small-radius bar this
              used before), and the value read to the right of the bar
              instead of squeezed inside its fill. */}
          <div className="flex flex-col gap-2.5">
            {chartBars.map((bar, i) => (
              <div key={bar.label} className="flex items-center gap-3">
                <p className="w-28 shrink-0 text-sm text-text-secondary sm:w-32">{bar.label}</p>
                <div className="relative h-8 flex-1 overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    className={`h-full rounded-full ${CATEGORY_CLASS[bar.category]}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${bar.percent}%` }}
                    viewport={{ once: false, margin: "-40px" }}
                    transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
                <p className="w-10 shrink-0 whitespace-nowrap text-right font-mono text-xs text-text-secondary">
                  {bar.caption}
                </p>
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

        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {insights.map((insight, i) => (
            <motion.li
              key={insight}
              className="rounded-card border border-border bg-surface p-4 text-sm leading-relaxed text-text-secondary"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              {highlightNames(insight, competitorNames)}
            </motion.li>
          ))}
        </ul>

        <p className="border-l-2 border-accent pl-5 text-[17px] italic leading-relaxed text-text-primary">
          &ldquo;{quote}&rdquo;
        </p>
      </div>
    </div>
  );
}
