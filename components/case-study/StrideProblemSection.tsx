"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/case-study/SectionHeading";

export function StrideProblemSection({
  heading,
  subheading,
  bullets,
  callout,
}: {
  heading: string;
  subheading: string;
  bullets: string[];
  callout: string;
}) {
  return (
    <div className="flex h-full flex-1 flex-col">
      <SectionHeading heading={heading} subheading={subheading} />
      <div className="mt-title-to-content flex flex-1 flex-col justify-center gap-8">
        {/* Same "insight pill" row Tribu Music's ContextSection uses for its
            research findings — short, parallel statements read better as
            equal-weight cards in a row than as a divided list. */}
        <ul className="flex flex-col gap-3 sm:flex-row">
          {bullets.map((bullet, i) => (
            <motion.li
              key={bullet}
              className="flex flex-1 items-center justify-center rounded-card border-2 border-[var(--color-border-accent)] bg-surface p-4 text-center text-body text-text-secondary shadow-card backdrop-blur-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              {bullet}
            </motion.li>
          ))}
        </ul>

        <motion.div
          className="max-w-[64ch] rounded-card border border-[var(--color-border-accent)] bg-accent-soft p-5 text-body leading-relaxed text-text-primary"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {callout}
        </motion.div>
      </div>
    </div>
  );
}
