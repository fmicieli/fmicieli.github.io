"use client";

import { motion } from "framer-motion";
import type { SimpleTable } from "@/data/projects";

/**
 * Generic columns+rows table used across every Tribu Music spec table
 * (usability results, type scale, spacing tokens, border radii, contrast
 * ratios, touch targets, compliance checklist) — same glass-card language
 * as the rest of the case-study system (border/border-t-highlight/surface)
 * instead of a bespoke one-off table per section.
 */
export function DataTable({ table, dense }: { table: SimpleTable; dense?: boolean }) {
  return (
    <div className="w-full overflow-x-auto rounded-card border border-border border-t-[var(--color-border-top-highlight)] bg-surface shadow-card backdrop-blur-card">
      <table className="w-full min-w-[480px] border-collapse text-left">
        <thead>
          <tr className="bg-white/5">
            {table.columns.map((col) => (
              <th
                key={col}
                className={`border-b border-border font-medium text-text-primary ${dense ? "px-3 py-2 text-label" : "px-4 py-3 text-body"}`}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, i) => (
            <motion.tr
              key={i}
              className="border-b border-border/60 last:border-b-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`text-text-secondary ${dense ? "px-3 py-2 text-label" : "px-4 py-3 text-body"} ${j === 0 ? "text-text-primary" : ""}`}
                >
                  {cell}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
