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
      <div className="mt-title-to-content flex flex-1 flex-col justify-center">
        {/* Each mockup is paired with the text that explains it — grouped,
            but side by side rather than stacked, so the text fills the
            width beside the phone instead of the section's outer margins
            sitting empty. The three problem statements merge into one card
            next to the generic screen (what's wrong), and the persona
            callout sits next to Stride's own screen (who it's solved for). */}
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 sm:flex-row sm:items-center sm:gap-28">
          <motion.div
            className="flex flex-1 flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-6"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex shrink-0 flex-col items-center gap-3">
              <p className="text-label font-semibold uppercase tracking-[0.08em] text-text-secondary">
                {compareLabels.generic}
              </p>
              {/* 200 * 1.25 * 1.15 */}
              <div className="w-[288px]">
                <IPhoneMockup insetColors={{ top: "#1a1a1e", bottom: "#262627" }}>
                  <GenericAppScreen />
                </IPhoneMockup>
              </div>
            </div>
            <ul className="flex flex-1 flex-col gap-2.5 text-body text-text-secondary">
              {bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" aria-hidden="true" />
                  {bullet}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="flex flex-1 flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-6"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex shrink-0 flex-col items-center gap-3">
              <p className="text-label font-semibold uppercase tracking-[0.08em] text-accent">{compareLabels.stride}</p>
              {/* 200 * 1.25 * 1.15 */}
              <div className="w-[288px]">
                <IPhoneMockup
                  screenSrc="/projects/stride/wireframes-hifi/b1-hoy.png"
                  screenAlt="Stride's Today screen, in high fidelity"
                  insetColors={{ top: "#1a1a1e", bottom: "#262627" }}
                />
              </div>
            </div>
            <div className="flex-1 text-center text-body font-semibold leading-relaxed text-white">{callout}</div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
