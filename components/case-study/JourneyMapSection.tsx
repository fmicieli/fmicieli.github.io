"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/case-study/SectionHeading";

const SENTIMENT_Y: Record<"positive" | "neutral" | "negative", number> = {
  positive: 15,
  neutral: 50,
  negative: 85,
};
const SENTIMENT_EMOJI: Record<"positive" | "neutral" | "negative", string> = {
  positive: "😄",
  neutral: "😐",
  negative: "🙁",
};

// The step count is fixed per instance (not dynamically measured, unlike
// ArchitectureSitemapSection's reflowing boxes), so each point's position
// is a plain evenly-spaced percentage — no ResizeObserver/DOM measurement
// needed to draw the connecting line.
function TrackSvg({ steps }: { steps: { sentiment: "positive" | "neutral" | "negative" }[] }) {
  const points = steps.map((s, i) => ({
    x: steps.length > 1 ? (i / (steps.length - 1)) * 100 : 50,
    y: SENTIMENT_Y[s.sentiment],
  }));
  const path = points.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
      <polyline points={path} fill="none" stroke="var(--color-accent)" strokeWidth={0.6} />
    </svg>
  );
}

export function JourneyMapSection({
  heading,
  subheading,
  steps,
  painPointsLabel,
  painPoints,
  opportunitiesLabel,
  opportunities,
}: {
  heading: string;
  subheading?: string;
  steps: { label: string; sentiment: "positive" | "neutral" | "negative" }[];
  painPointsLabel: string;
  painPoints: string[];
  opportunitiesLabel: string;
  opportunities: string[];
}) {
  return (
    <div className="flex h-full flex-1 flex-col">
      <SectionHeading heading={heading} subheading={subheading} />
      <div className="mt-title-to-content flex flex-1 flex-col justify-center gap-8">
        <div>
          <div className="flex gap-2">
            {steps.map((step) => (
              <div
                key={step.label}
                className="flex-1 rounded-[6px] bg-white/10 px-3 py-2.5 text-center text-body font-medium text-text-primary"
              >
                {step.label}
              </div>
            ))}
          </div>
          <div className="relative mt-4 h-28">
            <TrackSvg steps={steps} />
            {steps.map((step, i) => (
              <motion.span
                key={step.label}
                className="absolute -translate-x-1/2 -translate-y-1/2 text-2xl"
                style={{
                  left: `${steps.length > 1 ? (i / (steps.length - 1)) * 100 : 50}%`,
                  top: `${SENTIMENT_Y[step.sentiment]}%`,
                }}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                aria-hidden="true"
              >
                {SENTIMENT_EMOJI[step.sentiment]}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="rounded-[6px] bg-accent-soft py-2 text-center text-body font-semibold text-accent">
              {painPointsLabel}
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {painPoints.map((p) => (
                <li key={p} className="flex items-start gap-2 text-body leading-relaxed text-text-secondary">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="rounded-[6px] bg-accent-soft py-2 text-center text-body font-semibold text-accent">
              {opportunitiesLabel}
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {opportunities.map((o) => (
                <li key={o} className="flex items-start gap-2 text-body leading-relaxed text-text-secondary">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" aria-hidden="true" />
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
