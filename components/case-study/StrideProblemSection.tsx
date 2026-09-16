"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/case-study/SectionHeading";
import { IPhoneMockup } from "@/components/case-study/IPhoneMockup";

/**
 * Stand-in for "every other running app," built in code rather than a real
 * screenshot (there's no single app this is tracing) — deliberately dense,
 * jargon-heavy, and grayscale-only (no accent color anywhere) so it reads as
 * the generic, harder-to-parse opposite of Stride's own screen next to it.
 */
function GenericAppScreen() {
  const plans = [
    { title: "5K · Zone 2 base", meta: "Pace 6:10/km" },
    { title: "Interval · 400m repeats", meta: "Cadence 172spm" },
    { title: "Tempo · threshold pace", meta: "HR Zone 4" },
    { title: "Long run · negative split", meta: "Pace 5:45/km" },
  ];
  return (
    <div className="flex h-full w-full flex-col gap-3 bg-neutral-900 p-4 text-neutral-300">
      <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-neutral-500">New training plan</p>
      <p className="text-[13px] font-semibold text-neutral-100">Select your workout type</p>
      <ul className="flex flex-col gap-1.5">
        {plans.map((plan) => (
          <li key={plan.title} className="rounded-md border border-neutral-700 bg-neutral-800 px-2.5 py-2">
            <p className="text-[11px] font-medium text-neutral-200">{plan.title}</p>
            <p className="text-[10px] text-neutral-500">{plan.meta}</p>
          </li>
        ))}
      </ul>
      <div className="mt-1 flex items-center justify-between rounded-md border border-neutral-700 bg-neutral-800 px-2.5 py-2">
        <span className="text-[10px] text-neutral-500">Target pace</span>
        <span className="text-[11px] font-medium text-neutral-200">5:30 /km</span>
      </div>
      <div className="mt-auto rounded-md bg-neutral-700 py-2 text-center text-[11px] font-medium text-neutral-300">
        Continue
      </div>
    </div>
  );
}

export function StrideProblemSection({
  heading,
  subheading,
  bullets,
  callout,
  compareLabels,
}: {
  heading: string;
  subheading: string;
  bullets: string[];
  callout: string;
  compareLabels: { generic: string; stride: string };
}) {
  return (
    <div className="flex h-full flex-1 flex-col">
      <SectionHeading heading={heading} subheading={subheading} />
      <div className="mt-title-to-content flex flex-1 flex-col justify-center gap-8">
        {/* Same "insight pill" row Tribu Music's ContextSection uses for its
            research findings — short, parallel statements read better as
            equal-weight cards in a row than as a divided list. What these
            three describe in words, the two mockups below show side by
            side. */}
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

        <div className="mx-auto grid w-full max-w-[520px] grid-cols-2 items-start gap-6 sm:gap-10">
          <motion.div
            className="flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-label font-semibold uppercase tracking-[0.08em] text-text-secondary">
              {compareLabels.generic}
            </p>
            <div className="w-full max-w-[200px]">
              <IPhoneMockup>
                <GenericAppScreen />
              </IPhoneMockup>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-label font-semibold uppercase tracking-[0.08em] text-accent">{compareLabels.stride}</p>
            <div className="w-full max-w-[200px]">
              <IPhoneMockup
                screenSrc="/projects/stride/wireframes-hifi/b1-hoy.png"
                screenAlt="Stride's Today screen, in high fidelity"
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mx-auto max-w-[64ch] rounded-card border border-[var(--color-border-accent)] bg-accent-soft p-5 text-center text-body leading-relaxed text-text-primary"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {callout}
        </motion.div>
      </div>
    </div>
  );
}
