"use client";

import { motion } from "framer-motion";
import type { BenchmarkRow } from "@/data/projects";
import { SectionHeading } from "@/components/case-study/SectionHeading";

export function BenchmarkingSection({
  heading,
  subheading,
  note,
  rows,
}: {
  heading: string;
  subheading: string;
  note: string;
  rows: BenchmarkRow[];
}) {
  const maxSteps = Math.max(...rows.map((row) => row.steps));

  const competitors = rows.filter((row) => row.logo);

  return (
    <div className="flex h-full flex-1 flex-col">
      <SectionHeading heading={heading} subheading={subheading} />

      <div className="mt-title-to-content flex flex-1 flex-col justify-center">
      {/* gap-3/60px on mobile (was a flat gap-8/90px) so all 4 logos fit
          one line instead of wrapping to 2: 4*60 + 3*12 = 276px, comfortably
          under a phone's content width. sm: restores the original size. */}
      <ul className="flex flex-nowrap justify-center gap-3 sm:flex-wrap sm:gap-8">
        {competitors.map((row, i) => (
          <motion.li
            key={row.name}
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-white p-2 sm:h-[90px] sm:w-[90px] sm:p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={row.logo} alt={row.name} className="h-full w-full object-contain" />
            </div>
            <p className="text-center text-[11px] text-text-secondary sm:text-body">{row.name}</p>
          </motion.li>
        ))}
      </ul>

      <p className="mt-6 text-label font-semibold uppercase tracking-[0.08em] text-text-secondary">
        {note}
      </p>
      <ul className="mt-3 flex flex-col gap-2.5">
        {rows.map((row, i) => (
          <motion.li
            key={row.name}
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="w-32 shrink-0 text-body text-text-secondary sm:w-40">{row.name}</p>
            <div className="relative h-8 flex-1 overflow-hidden rounded-full bg-white/5">
              <motion.div
                className={`h-full rounded-full ${row.highlight ? "bg-accent" : "bg-white/20"}`}
                initial={{ width: 0 }}
                whileInView={{ width: `${(row.steps / maxSteps) * 100}%` }}
                viewport={{ once: false, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.08 + 0.1, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <p className="w-6 shrink-0 text-right text-body font-medium text-text-primary">{row.steps}</p>
          </motion.li>
        ))}
      </ul>
      </div>
    </div>
  );
}
