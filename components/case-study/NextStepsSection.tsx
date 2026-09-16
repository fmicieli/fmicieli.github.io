"use client";

import { motion } from "framer-motion";
import type { NextPhase } from "@/data/projects";
import { SectionHeading } from "@/components/case-study/SectionHeading";
import { Footer } from "@/components/Footer";

export function NextStepsSection({
  heading,
  subheading,
  phases,
  disclaimer,
}: {
  heading: string;
  subheading: string;
  phases: NextPhase[];
  disclaimer?: string;
}) {
  return (
    <div className="flex h-full flex-1 flex-col">
      <SectionHeading heading={heading} subheading={subheading} />
      <div className="mt-title-to-content flex flex-1 flex-col justify-center">
      <ul className="grid gap-4 sm:grid-cols-3">
        {phases.map((phase, i) => (
          <motion.li
            key={phase.title}
            className="flex flex-col items-center rounded-card border border-border border-t-[var(--color-border-top-highlight)] bg-surface p-5 text-center shadow-card backdrop-blur-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-medium text-text-primary">{phase.title}</p>
            <ul className="mt-3 flex flex-col items-center gap-2">
              {phase.items.map((item, j) => (
                <motion.li
                  key={item}
                  className="text-[14px] leading-[20px] text-text-secondary"
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, margin: "-40px" }}
                  transition={{ duration: 0.35, delay: i * 0.12 + 0.15 + j * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.li>
        ))}
      </ul>

      {disclaimer && (
        <p className="mt-8 border-t border-border pt-6 text-sm leading-relaxed text-text-secondary">
          {disclaimer}
        </p>
      )}
      </div>

      {/* This is the last section of block-based case studies (BBVA-style).
          The section itself is a full min-h-screen viewport like every
          other one (see CaseStudyBlocks) — cards + disclaimer above are
          vertically centered in the space between the heading and here via
          the sibling div's flex-1/justify-center, and Footer sits pinned to
          the very bottom of that viewport via this mt-auto — same pattern
          as Contact.tsx on the home page — instead of rendering as separate
          trailing page content after ScrollMain. See CaseStudyPageContent.tsx,
          which no longer renders a page-level Footer for the
          caseStudyBlocks path. */}
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
