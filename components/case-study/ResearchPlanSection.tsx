"use client";

import { motion } from "framer-motion";
import type { SimpleTable } from "@/data/projects";
import { SectionHeading } from "@/components/case-study/SectionHeading";
import { DataTable } from "@/components/case-study/DataTable";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, margin: "-40px" },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
});

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 flex flex-col gap-1.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-body leading-relaxed text-text-secondary">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

// Medifé's research-planning slide: questions + hypothesis side by side,
// objectives split into general/specific, and a methods table — four
// distinct chunks of a single research plan, laid out as one section rather
// than four separate ones since that's how the source material presents it.
export function ResearchPlanSection({
  heading,
  subheading,
  questionsLabel,
  questions,
  hypothesisLabel,
  hypothesis,
  objectivesLabel,
  generalLabel,
  general,
  specificLabel,
  specific,
  methodsLabel,
  methodsIntro,
  methodsTable,
}: {
  heading: string;
  subheading?: string;
  questionsLabel: string;
  questions: string[];
  hypothesisLabel: string;
  hypothesis: string[];
  objectivesLabel: string;
  generalLabel: string;
  general: string[];
  specificLabel: string;
  specific: string[];
  methodsLabel: string;
  methodsIntro: string;
  methodsTable: SimpleTable;
}) {
  return (
    <div className="flex h-full flex-1 flex-col">
      <SectionHeading heading={heading} subheading={subheading} />
      <div className="mt-title-to-content flex flex-1 flex-col justify-center gap-8">
        <div className="grid gap-6 sm:grid-cols-2">
          <motion.div {...fadeUp(0)}>
            <p className="font-display text-card-title font-bold text-accent">{questionsLabel}</p>
            <ul className="mt-2 flex flex-col gap-2">
              {questions.map((q) => (
                <li key={q} className="text-body leading-relaxed text-text-secondary">
                  {q}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div {...fadeUp(0.08)}>
            <p className="font-display text-card-title font-bold text-accent">{hypothesisLabel}</p>
            {hypothesis.map((p, i) => (
              <p key={i} className="mt-2 text-body leading-relaxed text-text-secondary">
                {p}
              </p>
            ))}
          </motion.div>
        </div>

        <motion.div {...fadeUp(0.16)}>
          <p className="mb-3 font-display text-card-title font-bold text-accent">{objectivesLabel}</p>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-card border border-border border-t-[var(--color-border-top-highlight)] bg-surface p-5 shadow-card backdrop-blur-card">
              <p className="font-semibold text-text-primary">{generalLabel}</p>
              <BulletList items={general} />
            </div>
            <div className="rounded-card border border-border border-t-[var(--color-border-top-highlight)] bg-surface p-5 shadow-card backdrop-blur-card">
              <p className="font-semibold text-text-primary">{specificLabel}</p>
              <BulletList items={specific} />
            </div>
          </div>
        </motion.div>

        <motion.div {...fadeUp(0.24)}>
          <p className="mb-2 font-display text-card-title font-bold text-accent">{methodsLabel}</p>
          <p className="mb-3 text-body leading-relaxed text-text-secondary">{methodsIntro}</p>
          <DataTable table={methodsTable} dense />
        </motion.div>
      </div>
    </div>
  );
}
