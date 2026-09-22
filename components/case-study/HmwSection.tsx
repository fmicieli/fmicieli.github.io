"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/case-study/SectionHeading";

// A "How might we" list where one question is the one the team actually
// carried forward — rendered as a filled callout instead of just another
// bullet, so it reads as "this is the one we picked," not "these are all
// equally under consideration."
export function HmwSection({
  heading,
  subheading,
  intro,
  questions,
  primaryIndex,
}: {
  heading: string;
  subheading?: string;
  intro?: string;
  questions: string[];
  primaryIndex?: number;
}) {
  return (
    <div className="flex h-full flex-1 flex-col">
      <SectionHeading heading={heading} subheading={subheading} />
      <div className="mt-title-to-content flex flex-1 flex-col justify-center gap-4">
        {intro && <p className="max-w-[72ch] text-body leading-relaxed text-text-secondary">{intro}</p>}
        <ul className="flex flex-col gap-3">
          {questions.map((q, i) => {
            const isPrimary = i === primaryIndex;
            return (
              <motion.li
                key={q}
                className={
                  isPrimary
                    ? "rounded-card border-2 border-[var(--color-border-accent)] bg-accent-soft p-4 text-body font-semibold leading-relaxed text-text-primary"
                    : "flex items-start gap-2.5 text-body leading-relaxed text-text-secondary"
                }
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                {isPrimary ? (
                  q
                ) : (
                  <>
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" aria-hidden="true" />
                    {q}
                  </>
                )}
              </motion.li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
