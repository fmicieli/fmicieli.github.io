"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { BeforeAfterPair, PieChartData, SimpleTable } from "@/data/projects";
import { SectionHeading } from "@/components/case-study/SectionHeading";
import { DataTable } from "@/components/case-study/DataTable";
import { DonutChart } from "@/components/case-study/DonutChart";
import { Modal } from "@/components/Modal";
import { useTranslation } from "@/lib/i18n/ui";

function BeforeAfterCard({ pair, i }: { pair: BeforeAfterPair; i: number }) {
  const t = useTranslation();
  return (
    <motion.div
      className="flex flex-col gap-3"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-40px" }}
      transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="text-[14px] font-medium text-text-primary">{pair.label}</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <p className="text-label font-semibold uppercase tracking-[0.08em] text-text-secondary">{t.caseStudy.before}</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={pair.before.src} alt={pair.before.alt} loading="lazy" className="w-full rounded-md border border-border" />
        </div>
        <div className="flex flex-col gap-1.5">
          <p className="text-label font-semibold uppercase tracking-[0.08em] text-accent">{t.caseStudy.after}</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={pair.after.src} alt={pair.after.alt} loading="lazy" className="w-full rounded-md border border-border" />
        </div>
      </div>
    </motion.div>
  );
}

export function UsabilityTestSection({
  heading,
  subheading,
  tasks,
  resultsHeading,
  resultsTable,
  viewAllLabel,
  findingsHeading,
  findings,
  analysisHeading,
  analysis,
  surveyHeading,
  surveyCharts,
  improvementsHeading,
  improvementsIntro,
  improvements,
  beforeAfterHeading,
  beforeAfterPairs,
}: {
  heading: string;
  subheading: string;
  tasks: string[];
  resultsHeading: string;
  resultsTable: SimpleTable;
  viewAllLabel: string;
  findingsHeading: string;
  findings: string[];
  analysisHeading: string;
  analysis: { title: string; text: string }[];
  surveyHeading: string;
  surveyCharts: PieChartData[];
  improvementsHeading: string;
  improvementsIntro: string;
  improvements: string[];
  beforeAfterHeading: string;
  beforeAfterPairs: BeforeAfterPair[];
}) {
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="flex h-full flex-1 flex-col">
      <SectionHeading heading={heading} subheading={subheading} />
      <div className="mt-title-to-content flex flex-1 flex-col justify-center gap-8">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {tasks.map((task, i) => (
            <motion.li
              key={task}
              className="flex flex-col gap-2 rounded-card border border-border border-t-[var(--color-border-top-highlight)] bg-surface p-4 shadow-card backdrop-blur-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-center font-display text-[28.8px] leading-[33.6px] font-bold text-accent">{i + 1}</span>
              <p className="text-body leading-relaxed text-text-secondary">{task}</p>
            </motion.li>
          ))}
        </ul>

        <div className="flex flex-col items-start gap-5">
          <p className="font-display text-card-title font-bold text-text-primary">{resultsHeading}</p>
          <DataTable table={resultsTable} dense />
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="inline-flex h-9 items-center justify-center rounded-control border border-[var(--color-border-interactive)] bg-surface px-5 text-[14px] font-medium text-text-primary transition-[border-width,border-color,background-color] hover:border-2 hover:border-accent/30 hover:bg-surface-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          >
            {viewAllLabel}
          </button>
        </div>
      </div>

      <Modal open={showAll} onClose={() => setShowAll(false)} title={heading}>
        <div className="flex flex-col gap-12">
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="font-display text-card-title font-bold text-text-primary">{findingsHeading}</p>
              <ul className="mt-3 flex flex-col gap-2 text-body leading-relaxed text-text-secondary">
                {findings.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-display text-card-title font-bold text-text-primary">{analysisHeading}</p>
              <ul className="mt-3 flex flex-col gap-2 text-body leading-relaxed text-text-secondary">
                {analysis.map((a) => (
                  <li key={a.title} className="flex items-start gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" aria-hidden="true" />
                    <span>
                      <span className="font-semibold text-text-primary">{a.title}</span> {a.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <p className="font-display text-card-title font-bold text-text-primary">{surveyHeading}</p>
            <div className="grid gap-4 sm:grid-cols-3">
              {surveyCharts.map((chart, i) => (
                <DonutChart key={chart.question} data={chart} index={i} />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="font-display text-card-title font-bold text-text-primary">{improvementsHeading}</p>
            <p className="text-body leading-relaxed text-text-secondary">{improvementsIntro}</p>
            <ul className="flex flex-col gap-2 text-body leading-relaxed text-text-secondary">
              {improvements.map((imp) => (
                <li key={imp} className="flex items-start gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" aria-hidden="true" />
                  {imp}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-5">
            <p className="font-display text-card-title font-bold text-text-primary">{beforeAfterHeading}</p>
            <div className="flex flex-col gap-8">
              {beforeAfterPairs.map((pair, i) => (
                <BeforeAfterCard key={pair.label} pair={pair} i={i} />
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
