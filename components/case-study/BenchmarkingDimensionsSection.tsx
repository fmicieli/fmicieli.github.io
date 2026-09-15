"use client";

import { motion } from "framer-motion";
import type { DimensionCard, SimpleTable } from "@/data/projects";
import { SectionHeading } from "@/components/case-study/SectionHeading";
import { DataTable } from "@/components/case-study/DataTable";

export function BenchmarkingDimensionsSection({
  heading,
  subheading,
  dimensions,
  table,
  callout,
}: {
  heading: string;
  subheading: string;
  dimensions: DimensionCard[];
  table: SimpleTable;
  callout: string;
}) {
  return (
    <div className="flex h-full flex-1 flex-col">
      <SectionHeading heading={heading} subheading={subheading} />
      <div className="mt-title-to-content flex flex-1 flex-col justify-center gap-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {dimensions.map((dim, i) => (
            <motion.div
              key={dim.title}
              className="rounded-card border border-border border-t-[var(--color-border-top-highlight)] bg-surface p-5 shadow-card backdrop-blur-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-display text-card-title font-bold text-text-primary">{dim.title}</p>
              <p className="mt-2.5 text-sm leading-relaxed text-text-secondary">{dim.text}</p>
            </motion.div>
          ))}
        </div>

        <DataTable table={table} dense />

        <div className="max-w-[64ch] rounded-card border border-[var(--color-border-accent)] bg-accent-soft p-5 text-body leading-relaxed text-text-primary">
          {callout}
        </div>
      </div>
    </div>
  );
}
