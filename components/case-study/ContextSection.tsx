"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { ContextBenchmarkRow, PersonaData } from "@/data/projects";
import { SectionHeading } from "@/components/case-study/SectionHeading";
import { Modal } from "@/components/Modal";

function InsightPill({ text, i }: { text: string; i: number }) {
  return (
    <motion.li
      className="flex flex-1 items-center justify-center rounded-card border-2 border-[var(--color-border-accent)] bg-surface p-4 text-center text-body text-text-secondary shadow-card backdrop-blur-card"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-40px" }}
      transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      {text}
    </motion.li>
  );
}

function BenchmarkTable({ columns, rows }: { columns: string[]; rows: ContextBenchmarkRow[] }) {
  return (
    <div className="w-full overflow-x-auto rounded-card border border-border border-t-[var(--color-border-top-highlight)] bg-surface shadow-card backdrop-blur-card">
      <table className="w-full min-w-[640px] border-collapse text-left">
        <thead>
          <tr className="bg-white/5">
            {columns.map((col) => (
              <th key={col} className="border-b border-border px-4 py-2.5 text-body font-medium text-text-primary">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <motion.tr
              key={row.app}
              className="border-b border-border/60 last:border-b-0 align-top"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <td className="px-4 py-3">
                <div className="flex flex-col items-center gap-2">
                  {row.logo && (
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-1.5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={row.logo} alt={row.app} className="h-full w-full object-contain" />
                    </span>
                  )}
                  <span className="whitespace-nowrap text-body font-medium text-text-primary">{row.app}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-body leading-relaxed text-text-secondary">{row.strengths}</td>
              <td className="px-4 py-3 text-body leading-relaxed text-text-secondary">{row.weaknesses}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PersonaCard({ persona }: { persona: PersonaData }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,260px)_1fr]">
      <div className="flex flex-col items-center gap-3 rounded-card border border-border border-t-[var(--color-border-top-highlight)] bg-surface p-5 text-center shadow-card backdrop-blur-card">
        {persona.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={persona.photo.src}
            alt={persona.photo.alt}
            className="h-20 w-20 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-accent-soft font-display text-2xl font-bold text-accent">
            {persona.name
              .split(" ")
              .map((w) => w[0])
              .slice(0, 2)
              .join("")}
          </span>
        )}
        <p className="font-display text-card-title font-bold text-text-primary">{persona.name}</p>
        <dl className="flex flex-col gap-1 text-body text-text-secondary">
          {persona.fields.map((f) => (
            <div key={f.label}>
              <span className="font-semibold text-text-primary">{f.label}: </span>
              {f.value}
            </div>
          ))}
        </dl>
        <p className="mt-2 border-t border-border pt-3 text-body leading-relaxed text-text-secondary">
          <span className="font-semibold text-text-secondary">{persona.justificacionLabel}: </span>
          {persona.justificacion}
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <p className="italic text-body text-accent">&ldquo;{persona.quote}&rdquo;</p>
        <div>
          <p className="font-display text-card-title font-bold text-text-primary">{persona.bioLabel}</p>
          <p className="mt-1.5 text-body leading-relaxed text-text-secondary">{persona.bio}</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <p className="font-medium text-text-primary">{persona.objetivosLabel}</p>
            <ul className="mt-2 flex flex-col gap-1.5 text-body leading-relaxed text-text-secondary">
              {persona.objetivos.map((o) => (
                <li key={o} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" aria-hidden="true" />
                  {o}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-medium text-text-primary">{persona.motivacionesLabel}</p>
            <ul className="mt-2 flex flex-col gap-1.5 text-body leading-relaxed text-text-secondary">
              {persona.motivaciones.map((o) => (
                <li key={o} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" aria-hidden="true" />
                  {o}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-medium text-text-primary">{persona.frustracionesLabel}</p>
            <ul className="mt-2 flex flex-col gap-1.5 text-body leading-relaxed text-text-secondary">
              {persona.frustraciones.map((o) => (
                <li key={o} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" aria-hidden="true" />
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <p className="font-medium text-text-primary">{persona.habilidadesLabel}</p>
          <p className="mt-1.5 text-body leading-relaxed text-text-secondary">{persona.habilidades}</p>
        </div>
      </div>
    </div>
  );
}

function ViewFullButton({
  label,
  onClick,
  className = "mt-3 self-start",
}: {
  label: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex h-9 shrink-0 items-center justify-center rounded-control border border-[var(--color-border-interactive)] bg-surface px-5 text-[14px] font-medium text-text-primary transition-[border-width,border-color,background-color] hover:border-2 hover:border-accent/30 hover:bg-surface-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 ${className}`}
    >
      {label}
    </button>
  );
}

function BenchmarkPreview({
  rows,
  ctaLabel,
  onOpen,
}: {
  rows: ContextBenchmarkRow[];
  ctaLabel: string;
  onOpen: () => void;
}) {
  return (
    <div className="flex h-full flex-col items-center justify-between gap-6 rounded-card border border-border border-t-[var(--color-border-top-highlight)] bg-surface p-5 shadow-card backdrop-blur-card">
      <ul className="flex flex-wrap justify-center gap-4">
        {rows.map((row) => (
          <li key={row.app} className="flex flex-col items-center gap-2 text-center">
            {row.logo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={row.logo} alt={row.app} className="h-[77px] w-[77px] shrink-0 object-contain" />
            )}
            <span className="text-body font-medium text-text-primary">{row.app}</span>
          </li>
        ))}
      </ul>
      <ViewFullButton label={ctaLabel} onClick={onOpen} className="self-center" />
    </div>
  );
}

function PersonaPreview({
  persona,
  ctaLabel,
  onOpen,
}: {
  persona: PersonaData;
  ctaLabel: string;
  onOpen: () => void;
}) {
  return (
    <div className="flex h-full flex-col items-center justify-between gap-6 rounded-card border border-border border-t-[var(--color-border-top-highlight)] bg-surface p-5 text-center shadow-card backdrop-blur-card">
      <div className="flex flex-col items-center gap-3">
        {persona.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={persona.photo.src}
            alt={persona.photo.alt}
            className="h-16 w-16 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-accent-soft font-display text-xl font-bold text-accent">
            {persona.name
              .split(" ")
              .map((w) => w[0])
              .slice(0, 2)
              .join("")}
          </span>
        )}
        <div className="flex flex-col items-center">
          <p className="font-display text-card-title font-bold text-text-primary">{persona.name}</p>
          <p className="mt-1 italic text-body text-text-secondary">&ldquo;{persona.quote}&rdquo;</p>
        </div>
      </div>
      <ViewFullButton label={ctaLabel} onClick={onOpen} className="self-center" />
    </div>
  );
}

export function ContextSection({
  heading,
  subheading,
  intro,
  insightsHeading,
  insights,
  researchHeading,
  researchText,
  benchmarkingHeading,
  benchmarkingColumns,
  benchmarkingRows,
  benchmarkingCtaLabel,
  persona,
  personaCtaLabel,
}: {
  heading: string;
  subheading: string;
  intro: string;
  insightsHeading: string;
  insights: string[];
  researchHeading: string;
  researchText: string;
  benchmarkingHeading: string;
  benchmarkingColumns: string[];
  benchmarkingRows: ContextBenchmarkRow[];
  benchmarkingCtaLabel: string;
  persona: PersonaData;
  personaCtaLabel: string;
}) {
  const [openModal, setOpenModal] = useState<"benchmarking" | "persona" | null>(null);

  return (
    <div className="flex h-full flex-1 flex-col">
      <SectionHeading heading={heading} subheading={subheading} />
      <div className="mt-title-to-content flex flex-1 flex-col justify-center gap-10">
        <p className="text-body leading-relaxed text-text-secondary">{intro}</p>

        <div>
          <p className="font-display text-card-title font-bold text-text-primary">{insightsHeading}</p>
          <ul className="mt-3 flex flex-col gap-3 sm:flex-row">
            {insights.map((insight, i) => (
              <InsightPill key={insight} text={insight} i={i} />
            ))}
          </ul>
        </div>

        <div>
          <p className="font-display text-card-title font-bold text-text-primary">{researchHeading}</p>
          <p className="mt-2 text-body leading-relaxed text-text-secondary">{researchText}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col">
            <p className="mb-3 font-display text-card-title font-bold text-text-primary">{benchmarkingHeading}</p>
            <BenchmarkPreview
              rows={benchmarkingRows}
              ctaLabel={benchmarkingCtaLabel}
              onOpen={() => setOpenModal("benchmarking")}
            />
          </div>

          <div className="flex flex-col">
            <p className="mb-3 font-display text-card-title font-bold text-text-primary">{persona.name}</p>
            <PersonaPreview persona={persona} ctaLabel={personaCtaLabel} onOpen={() => setOpenModal("persona")} />
          </div>
        </div>
      </div>

      <Modal open={openModal === "benchmarking"} onClose={() => setOpenModal(null)} title={benchmarkingHeading}>
        <BenchmarkTable columns={benchmarkingColumns} rows={benchmarkingRows} />
      </Modal>
      <Modal open={openModal === "persona"} onClose={() => setOpenModal(null)} title={persona.name}>
        <PersonaCard persona={persona} />
      </Modal>
    </div>
  );
}
