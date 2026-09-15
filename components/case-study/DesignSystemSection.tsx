"use client";

import { motion } from "framer-motion";
import type { DesignSystemStat, DesignSystemTypeRow } from "@/data/projects";
import { SectionHeading } from "@/components/case-study/SectionHeading";

// Stride's own validated product tokens — literal, not site theme vars,
// since this panel is the one place in the whole case study that recreates
// Stride's actual dark+lime product identity rather than the portfolio's
// own page chrome. Kept local to this file on purpose.
const DK_BG = "#0D0D0F";
const DK_SURFACE = "#1B1B1D";
const DK_SURFACE_2 = "#242427";
const DK_LINE = "#303033";
const LIME = "#9BE83C";
const LIME_TINT = "rgba(155,232,60,.14)";
const DANGER = "#E5484D";
const DK_TEXT_2 = "#9C9CA0";

function ComponentCell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      className="relative flex min-h-[96px] flex-col items-start justify-center gap-2 p-4 pt-8"
      style={{ background: DK_BG }}
    >
      <span className="absolute left-4 top-2.5 font-stride-mono text-[9.5px]" style={{ color: DK_TEXT_2 }}>
        {label}
      </span>
      {children}
    </div>
  );
}

export function DesignSystemSection({
  heading,
  subheading,
  stats,
  typeSpecimen,
  sectionLabels,
  componentLabels,
  fontNote,
}: {
  heading: string;
  subheading: string;
  stats: DesignSystemStat[];
  typeSpecimen: DesignSystemTypeRow[];
  sectionLabels: { colorAccent: string; colorSurfaces: string; tintOpacity: string };
  componentLabels: {
    primaryButton: string;
    pillBadge: string;
    listItem: string;
    statValue: string;
    statLabel: string;
    achievementTitle: string;
    dangerAction: string;
    navItems: [string, string, string, string];
  };
  fontNote?: string;
}) {
  return (
    <div className="flex h-full flex-1 flex-col">
      <SectionHeading heading={heading} subheading={subheading} />
      <div className="mt-title-to-content flex flex-1 flex-col justify-center gap-6">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="bg-surface p-4 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <span className="block font-mono text-stat-md font-bold text-accent">{stat.value}</span>
              <span className="mt-1 block text-xs text-text-muted">{stat.label}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="font-stride-sans overflow-hidden rounded-card border"
          style={{ borderColor: DK_LINE, background: DK_BG }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="border-b px-10 py-10 text-center" style={{ borderColor: DK_LINE }}>
            <div className="text-[40px] font-extrabold tracking-tight text-white">STRIDE</div>
            <div
              className="mx-auto mt-3 flex h-9 w-9 items-center justify-center rounded-[10px] text-[15px] font-extrabold"
              style={{ background: LIME, color: DK_BG }}
            >
              S
            </div>
          </div>

          <p className="font-stride-mono px-5 pt-4 text-[10px] tracking-wide" style={{ color: DK_TEXT_2 }}>
            {sectionLabels.colorAccent}
          </p>
          <div className="flex border-b" style={{ borderColor: DK_LINE }}>
            <div
              className="font-stride-mono flex-1 p-4 text-[10.5px]"
              style={{ background: LIME, color: DK_BG }}
            >
              lime-500
              <br />
              #9BE83C
            </div>
            <div
              className="font-stride-mono flex-1 p-4 text-[10.5px]"
              style={{ background: LIME_TINT, color: LIME }}
            >
              lime-tint
              <br />
              {sectionLabels.tintOpacity}
            </div>
          </div>
          <p className="font-stride-mono px-5 pt-4 text-[10px] tracking-wide" style={{ color: DK_TEXT_2 }}>
            {sectionLabels.colorSurfaces}
          </p>
          <div className="flex flex-wrap border-b" style={{ borderColor: DK_LINE }}>
            {[
              { name: "bg", hex: DK_BG },
              { name: "surface", hex: DK_SURFACE },
              { name: "surface-2", hex: DK_SURFACE_2 },
              { name: "danger", hex: DANGER },
            ].map((swatch) => (
              <div
                key={swatch.name}
                className="font-stride-mono min-w-[110px] flex-1 p-4 text-[10.5px] text-white"
                style={{ background: swatch.hex }}
              >
                {swatch.name}
                <br />
                {swatch.hex}
              </div>
            ))}
          </div>

          <div className="border-b" style={{ borderColor: DK_LINE }}>
            {typeSpecimen.map((row) => (
              <div
                key={row.sample}
                className="flex flex-wrap items-baseline justify-between gap-4 border-b px-6 py-4 last:border-b-0"
                style={{ borderColor: DK_LINE }}
              >
                <span
                  className={row.mono ? "font-stride-mono text-white" : "text-white"}
                  style={{ fontSize: row.size, fontWeight: row.weight }}
                >
                  {row.sample}
                </span>
                <span className="font-stride-mono text-[10.5px] text-right" style={{ color: DK_TEXT_2 }}>
                  {row.meta}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-px sm:grid-cols-4" style={{ background: DK_LINE }}>
            <ComponentCell label="button / primary">
              <div
                className="rounded-full px-4 py-2 text-xs font-bold"
                style={{ background: LIME, color: DK_BG }}
              >
                {componentLabels.primaryButton}
              </div>
            </ComponentCell>
            <ComponentCell label="pill / badge">
              <div
                className="rounded-full px-3 py-1.5 text-[10.5px] font-semibold"
                style={{ background: LIME_TINT, color: LIME }}
              >
                {componentLabels.pillBadge}
              </div>
            </ComponentCell>
            <ComponentCell label="progress ring">
              <div
                className="font-stride-mono flex h-9 w-9 items-center justify-center rounded-full border-4 text-[8px] text-white"
                style={{ borderColor: DK_SURFACE_2, borderTopColor: LIME }}
              >
                0%
              </div>
            </ComponentCell>
            <ComponentCell label="list item">
              <div className="flex w-full items-center justify-between text-xs text-white">
                {componentLabels.listItem} <span style={{ color: DK_TEXT_2 }}>›</span>
              </div>
            </ComponentCell>
            <ComponentCell label="stat">
              <div className="text-[11px]" style={{ color: DK_TEXT_2 }}>
                <b className="font-stride-mono block text-base font-extrabold text-white">
                  {componentLabels.statValue}
                </b>
                {componentLabels.statLabel}
              </div>
            </ComponentCell>
            <ComponentCell label="achievement card">
              <div className="w-full">
                <div className="mb-1.5 flex justify-between text-[10.5px] text-white">
                  <span>{componentLabels.achievementTitle}</span>
                  <span>0%</span>
                </div>
                <div className="h-[5px] overflow-hidden rounded-full" style={{ background: DK_SURFACE_2 }}>
                  <div className="h-full w-[35%] rounded-full" style={{ background: LIME }} />
                </div>
              </div>
            </ComponentCell>
            <ComponentCell label="danger action">
              <div className="text-[11.5px] font-semibold" style={{ color: DANGER }}>
                {componentLabels.dangerAction}
              </div>
            </ComponentCell>
            <ComponentCell label="bottom nav">
              <div className="flex w-full border-t pt-2" style={{ borderColor: DK_LINE }}>
                {componentLabels.navItems.map((label, i) => (
                  <span
                    key={label}
                    className="flex-1 text-center text-[8.5px]"
                    style={i === 0 ? { color: LIME, fontWeight: 700 } : { color: DK_TEXT_2 }}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </ComponentCell>
          </div>
        </motion.div>

        {fontNote && <p className="max-w-[64ch] text-xs leading-relaxed text-text-muted">{fontNote}</p>}
      </div>
    </div>
  );
}
