"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import type { FlowStep } from "@/data/projects";
import { SectionHeading } from "@/components/case-study/SectionHeading";
import { useTranslation } from "@/lib/i18n/ui";

// One icon per highlight card, in order: early validation (shield),
// combined steps (layers), speed + security (bolt).
const HIGHLIGHT_ICON_PATHS = [
  <path
    key="shield"
    d="M12 3 L20 6 V11 C20 16 16.5 19.5 12 21 C7.5 19.5 4 16 4 11 V6 Z"
    stroke="currentColor"
    strokeWidth="1.5"
    fill="none"
    strokeLinejoin="round"
  />,
  <g key="layers">
    <path d="M12 4 L21 8.5 L12 13 L3 8.5 Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
    <path d="M3 13.5 L12 18 L21 13.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </g>,
  <path
    key="bolt"
    d="M13 3 L5 13 H11 L10 21 L19 10 H13 Z"
    stroke="currentColor"
    strokeWidth="1.5"
    fill="none"
    strokeLinejoin="round"
  />,
];

// The whole sequence, in order: 1) before/after lists reveal, 2) the after
// box's border draws itself on, 3) the reduction percentage counts up,
// 4) the three highlight icons appear one by one. Each stage's start delay
// is derived from the previous stage's own duration so they never overlap.
const FLOW_STEP_STAGGER = 0.117; // slowed 30% from the original 0.09
const FLOW_STEP_DURATION = 0.585; // slowed 30% from the original 0.45
const BORDER_DRAW_DURATION = 0.9;
const COUNTER_DURATION = 1.3;
const HIGHLIGHT_STAGGER = 0.26;

// Before/after get visually distinct treatments so the contrast reads at a
// glance: before is muted (friction), after is solid accent (resolved).
// Each row reveals top-to-bottom, number + label together.
function StepList({
  steps,
  variant,
}: {
  steps: FlowStep[];
  variant: "before" | "after";
}) {
  const isAfter = variant === "after";
  return (
    <ol className="flex flex-col">
      {steps.map((step, i) => (
        <li key={step.number}>
          <motion.div
            className="flex items-center gap-[14px]"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-40px" }}
            transition={{ duration: FLOW_STEP_DURATION, delay: i * FLOW_STEP_STAGGER, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className={`flex h-[39px] w-[39px] shrink-0 items-center justify-center rounded-full text-[22px] font-medium ${
                isAfter ? "bg-accent-soft text-accent" : "bg-white/10 text-text-secondary"
              }`}
            >
              {step.number}
            </span>
            <span className={`text-[17px] ${isAfter ? "text-text-primary" : "text-text-secondary"}`}>{step.label}</span>
          </motion.div>
          {/* Connector segment sits only in the gap between this circle and
              the next one, so it never overlaps (or shows through) a circle.
              ml is half of the (scaled) circle width, adjusted to center on
              the circle's 2px-equivalent visual edge, same as the original
              14 - 0.5 = 13.5 relationship: 39/2 = 19.5, minus 0.5 = 19. */}
          {i < steps.length - 1 && (
            <div
              className={`ml-[19px] h-[28px] w-px ${isAfter ? "bg-accent/30" : "bg-white/10"}`}
              aria-hidden="true"
            />
          )}
        </li>
      ))}
    </ol>
  );
}

// Draws the after box's border on once the before/after lists have settled,
// using the pathLength trick so it works regardless of the box's actual
// (dynamic) pixel size — no need to measure it.
function AfterBoxBorder({ delay }: { delay: number }) {
  const ref = useRef<SVGRectElement>(null);
  const inView = useInView(ref, { once: false, margin: "-40px" });
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      aria-hidden="true"
    >
      <motion.rect
        ref={ref}
        x="1"
        y="1"
        width="calc(100% - 2px)"
        height="calc(100% - 2px)"
        rx="13"
        ry="13"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="2"
        pathLength={1}
        style={{ strokeDasharray: 1 }}
        initial={{ strokeDashoffset: 1 }}
        animate={{ strokeDashoffset: inView ? 0 : 1 }}
        transition={
          inView
            ? { duration: BORDER_DRAW_DURATION, delay, ease: [0.22, 1, 0.36, 1] }
            : { duration: 0.2 }
        }
      />
    </svg>
  );
}

// Animates the reduction percentage counting up from 0, starting only once
// the after box's border has finished drawing (stage 3 of the sequence).
// Resets to 0 whenever the section scrolls out of view so it replays in
// full every time the user comes back to it, not just the first time.
function ReductionCounter({ value, startDelay }: { value: string; startDelay: number }) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: false, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) {
      const reset = setTimeout(() => setDisplay(0), 0);
      return () => clearTimeout(reset);
    }
    const timeout = setTimeout(() => {
      const controls = animate(0, target, {
        duration: COUNTER_DURATION,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (v) => setDisplay(Math.round(v)),
      });
      return () => controls.stop();
    }, startDelay * 1000);
    return () => clearTimeout(timeout);
  }, [inView, target, startDelay]);

  return (
    <p
      ref={ref}
      className="w-full font-display text-stat-lg font-bold tabular-nums text-accent"
    >
      {display}
      {suffix}
    </p>
  );
}

export function FlowComparisonSection({
  heading,
  subheading,
  before,
  after,
  afterLabel,
  reductionLabel,
  highlights,
}: {
  heading: string;
  subheading: string;
  before: FlowStep[];
  after: FlowStep[];
  afterLabel: string;
  reductionLabel: string;
  highlights: { title: string; description: string }[];
}) {
  const t = useTranslation();
  // "50% reduction" -> ["50%", "reduction"], so the number can count up while
  // the word underneath stays static.
  const [reductionValue, ...reductionRest] = reductionLabel.split(" ");
  const reductionWord = reductionRest.join(" ");
  const maxSteps = Math.max(before.length, after.length);

  // Stage timing: 1) lists settle, 2) border draws, 3) counter runs, 4) highlights.
  const listsSettleDelay = FLOW_STEP_STAGGER * (maxSteps - 1) + FLOW_STEP_DURATION;
  const borderDoneDelay = BORDER_DRAW_DURATION;
  const counterDoneDelay = borderDoneDelay + COUNTER_DURATION;

  return (
    <div className="flex h-full flex-1 flex-col">
      <SectionHeading heading={heading} subheading={subheading} />
      <div className="mt-title-to-content flex flex-1 flex-col justify-center">
      {/* justify-items-center: the reduction-count block (a fixed 154px,
          not w-full like the two boxes beside it) otherwise defaulted to
          grid's own start-alignment within its full-width mobile track,
          reading as left-aligned instead of centered. */}
      <div className="grid items-stretch justify-center justify-items-center gap-[38px] sm:grid-cols-[auto_auto_auto]">
        <div className="w-full max-w-sm rounded-[14px] border border-border border-t-[var(--color-border-top-highlight)] bg-surface p-6 shadow-card backdrop-blur-card sm:w-[307px]">
          <p className="text-[17px] font-medium uppercase tracking-[0.15em] text-text-secondary">
            {t.caseStudy.before}
          </p>
          <div className="mt-[14px]">
            <StepList steps={before} variant="before" />
          </div>
        </div>

        {/* Fixed width so the digits changing during the counter animation
            never shift the layout of the boxes on either side. */}
        <div className="flex w-[154px] shrink-0 flex-col items-center justify-center gap-[5px] text-center">
          <ReductionCounter value={reductionValue} startDelay={listsSettleDelay + borderDoneDelay} />
          {reductionWord && <p className="text-[17px] text-text-secondary">{reductionWord}</p>}
        </div>

        {/* Accent-treated card (rule 2): shadow-card-accent for elevation,
            layered under the animated SVG border draw rather than replacing
            it — the draw-on animation is a deliberate, separately-requested
            sequence step, not just a static border. No border-t highlight
            here: the SVG already draws an accent-colored ring around all
            four sides, and a separate static highlight on just the top
            would visually compete with it. */}
        <div className="relative w-full max-w-sm rounded-[14px] bg-surface p-6 shadow-card-accent backdrop-blur-card sm:w-[307px]">
          <AfterBoxBorder delay={listsSettleDelay} />
          <div className="flex items-center gap-[10px]">
            <p className="text-[17px] font-medium uppercase tracking-[0.15em] text-text-secondary">
              {t.caseStudy.after}
            </p>
            <span className="rounded-full bg-accent-soft px-[10px] py-0.5 text-[17px] font-medium text-accent">
              {afterLabel}
            </span>
          </div>
          <div className="mt-[14px]">
            <StepList steps={after} variant="after" />
          </div>
        </div>
      </div>

      {/* Grouped tighter with the cards above (rule 7), then +16px per a
          later request — still reads as one block, just with a bit more
          breathing room than the initial tightened value. */}
      {/* grid-cols-3 (not flex-col) on mobile too — was one per line, now
          all three fit one row at a shrunk size (was 43px icon / 22px
          text); sm: restores the original size and switches to the wider
          flex-row gap. */}
      <ul className="mt-12 grid grid-cols-3 items-start justify-center gap-3 sm:flex sm:flex-row sm:gap-[58px]">
        {highlights.map((highlight, i) => (
          <motion.li
            key={highlight.title}
            className="flex flex-col items-center gap-2 text-center sm:gap-[14px]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-40px" }}
            transition={{
              duration: 0.65,
              delay: listsSettleDelay + counterDoneDelay + i * HIGHLIGHT_STAGGER,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 text-accent sm:h-[43px] sm:w-[43px]">
              {HIGHLIGHT_ICON_PATHS[i]}
            </svg>
            <p className="text-[12px] font-medium text-text-primary sm:text-[22px]">{highlight.title}</p>
          </motion.li>
        ))}
      </ul>
      </div>
    </div>
  );
}
