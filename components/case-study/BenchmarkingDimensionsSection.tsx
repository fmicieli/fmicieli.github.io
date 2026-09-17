"use client";

import { motion } from "framer-motion";
import type { CompetitorLogo, DimensionCard, SimpleTable } from "@/data/projects";
import { SectionHeading } from "@/components/case-study/SectionHeading";

// Same visual recipe as the shared DataTable, but with the first column
// rendering a competitor's logo next to its name instead of plain text —
// DataTable itself stays generic (string cells only) since every other
// table on the site reuses it as-is.
function PricingTable({ table, competitors }: { table: SimpleTable; competitors: CompetitorLogo[] }) {
  const logoByName = new Map(competitors.map((c) => [c.name, c.logo]));

  return (
    <div className="w-full overflow-x-auto rounded-card border border-border border-t-[var(--color-border-top-highlight)] bg-surface shadow-card backdrop-blur-card">
      <table className="w-full min-w-[480px] border-collapse text-left">
        <thead>
          <tr className="bg-white/5">
            {table.columns.map((col) => (
              // cell height: 9.2px * 1.5. text: 13px + 2px capped at 14px
              <th key={col} className="border-b border-border px-3 py-[13.8px] text-[14px] font-medium text-text-primary">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, i) => (
            <motion.tr
              key={row[0]}
              className="border-b border-border/60 last:border-b-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
            >
              {row.map((cell, j) =>
                j === 0 ? (
                  // cell height: 9.2px * 1.5. text: 13px + 2px capped at 14px
                  <td key={j} className="px-3 py-[13.8px] text-[14px] text-text-primary">
                    <div className="flex items-center gap-2.5">
                      {logoByName.get(cell) && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={logoByName.get(cell)} alt="" className="h-[29px] w-[29px] shrink-0 rounded-[2px] object-contain" />
                      )}
                      {cell}
                    </div>
                  </td>
                ) : (
                  <td key={j} className="px-3 py-[13.8px] text-[14px] text-text-secondary">
                    {cell}
                  </td>
                )
              )}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function BenchmarkingDimensionsSection({
  heading,
  subheading,
  competitors,
  dimensions,
  table,
  callout,
}: {
  heading: string;
  subheading: string;
  competitors: CompetitorLogo[];
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
              <p className="mt-2.5 text-body leading-relaxed text-text-secondary">{dim.text}</p>
            </motion.div>
          ))}
        </div>

        <PricingTable table={table} competitors={competitors} />

        <div className="rounded-card border border-[var(--color-border-accent)] bg-accent-soft p-5 text-body leading-relaxed text-text-primary">
          {callout}
        </div>
      </div>
    </div>
  );
}
