"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { PieChartData } from "@/data/projects";

// Shades of the portfolio site's own accent (--color-accent, #ff9ac4) —
// matches the rest of the site's chrome (buttons, links, the landing page)
// instead of Tribu Music's own violet brand color, which is reserved for
// the "Sistema de Color" swatches actually documenting Tribu's palette.
const SLICE_COLORS = ["#ffc2dd", "#ff9ac4", "#e56a9e", "#b8447a"];

const SIZE = 160;
const RADIUS = 56;
const STROKE_WIDTH = 26;
const CENTER = SIZE / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function DonutSlice({
  value,
  total,
  offset,
  color,
  delay,
}: {
  value: number;
  total: number;
  offset: number;
  color: string;
  delay: number;
}) {
  const ref = useRef<SVGCircleElement>(null);
  const inView = useInView(ref, { once: false, margin: "-40px" });
  const fraction = value / total;
  const dash = fraction * CIRCUMFERENCE;
  const gap = CIRCUMFERENCE - dash;

  return (
    <motion.circle
      ref={ref}
      cx={CENTER}
      cy={CENTER}
      r={RADIUS}
      fill="none"
      stroke={color}
      strokeWidth={STROKE_WIDTH}
      strokeDasharray={`${dash} ${gap}`}
      strokeDashoffset={-offset}
      pathLength={CIRCUMFERENCE}
      initial={{ opacity: 0 }}
      animate={{ opacity: inView ? 1 : 0 }}
      transition={{ duration: 0.5, delay }}
    />
  );
}

export function DonutChart({ data, index }: { data: PieChartData; index: number }) {
  const total = data.slices.reduce((sum, s) => sum + s.value, 0);
  // Each slice's starting offset is the sum of every preceding slice's
  // value — computed functionally (no running-total mutation across the
  // render) since the slice counts here are always tiny (2-4).
  const offsets = data.slices.map((_, i) =>
    data.slices.slice(0, i).reduce((sum, s) => sum + s.value, 0),
  );

  return (
    <motion.div
      className="flex flex-col items-center gap-4 rounded-card border border-border border-t-[var(--color-border-top-highlight)] bg-surface p-5 text-center shadow-card backdrop-blur-card"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="text-body leading-snug text-text-secondary">{data.question}</p>
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="h-36 w-36 shrink-0 -rotate-90"
        aria-hidden="true"
      >
        {data.slices.map((slice, i) => (
          <DonutSlice
            key={slice.label}
            value={slice.value}
            total={total}
            offset={(offsets[i] / total) * CIRCUMFERENCE}
            color={SLICE_COLORS[i % SLICE_COLORS.length]}
            delay={index * 0.1 + i * 0.12}
          />
        ))}
      </svg>
      <ul className="flex flex-col gap-1.5 self-stretch">
        {data.slices.map((slice, i) => (
          <li key={slice.label} className="flex items-center justify-between gap-3 text-label text-text-secondary">
            <span className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: SLICE_COLORS[i % SLICE_COLORS.length] }}
                aria-hidden="true"
              />
              {slice.label}
            </span>
            <span className="font-medium text-text-primary">{slice.value}%</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
