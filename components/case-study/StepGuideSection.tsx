"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
  type AnimationPlaybackControls,
} from "framer-motion";
import type { GuideStep } from "@/data/projects";
import { SectionHeading } from "@/components/case-study/SectionHeading";
import { ImagePlaceholder } from "@/components/case-study/ImagePlaceholder";
import { useScrollContainer } from "@/components/case-study/ScrollMain";

// Vertical scroll budget per step. Short on purpose: transitions now
// auto-complete on a minimum scroll (see COMMIT_THRESHOLD below) rather than
// scrubbing 1:1 with scroll distance, so the container no longer needs a
// full 100vh per step to feel proportional — that would just leave a lot of
// "nothing happens" scroll room after the transitions have already settled.
const STEP_VH = 50;

// Fixed per-step vertical budget: a slot for the circle, a slot for the
// connector above it. Every step keeps this same footprint, so the column
// never reflows as steps become active/inactive — only size/color/opacity
// on top of that fixed slot change.
const CIRCLE_SLOT = 96;
const CONNECTOR_SLOT = 56;

// The two end states a circle animates between. Copied 1:1 from the "Before"
// circle style in FlowComparisonSection (`h-[39px] w-[39px] text-[22px] ...
// bg-white/10 text-text-secondary`) for the non-highlighted state, and the
// existing active-step look (bg-accent-soft / text-accent / text-stat-lg /
// h-20) for the highlighted one. framer-motion's color interpolation needs
// literal, parseable colors (it can't resolve a `var(--color-*)` reference
// at animation time), so these are written out to match app/globals.css's
// tokens exactly rather than referencing them.
const MUTED_SIZE = 39;
const MUTED_FONT = 22;
const MUTED_BG = "rgba(255, 255, 255, 0.1)";
const MUTED_TEXT = "#a8a8a8"; // --color-text-secondary
const ACTIVE_SIZE = 80;
const ACTIVE_FONT = 40;
const ACTIVE_BG = "rgba(255, 154, 196, 0.15)"; // --color-accent-soft
const ACTIVE_TEXT = "#ff9ac4"; // --color-accent

// How much of one step's raw scroll range (0-1 between it and the next)
// counts as "a minimum scroll" before the transition commits and finishes
// on its own, instead of tracking the user's scroll distance exactly.
const COMMIT_THRESHOLD = 0.12;
const COMMIT_DURATION = 0.5;
// After a commit, further scroll input is ignored for this long — long past
// COMMIT_DURATION — so a single fast/long scroll gesture (which keeps
// generating raw-progress updates well past the threshold for a while)
// can't re-cross the threshold again mid-gesture and chain into a second,
// third, fourth commit. One physical scroll, at most one step, always —
// short or long, exactly like the section-to-section snap elsewhere.
const COMMIT_LOCK = COMMIT_DURATION + 0.35;

function Connector({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const fill = useTransform(progress, [index - 1, index], ["0%", "100%"], { clamp: true });
  return (
    <div className="relative w-px bg-white/10" style={{ height: CONNECTOR_SLOT }} aria-hidden="true">
      <motion.div className="absolute inset-x-0 top-0 bg-accent" style={{ height: fill }} />
    </div>
  );
}

/**
 * One step's number. Always visible (no more fading in from nothing — a
 * connector line drawing toward an invisible number read as broken) in the
 * muted "Before" style, at full opacity once reached/passed and at 50%
 * opacity while still upcoming (a preview of what's coming, not yet
 * reached). It grows into the big accent style exactly while it's the
 * active step, then shrinks back to muted as scroll hands off to the next
 * one — except the last step, which just stays big once reached.
 */
function StepNode({
  index,
  stepNumber,
  displayProgress,
  isLast,
}: {
  index: number;
  stepNumber: string;
  displayProgress: MotionValue<number>;
  isLast: boolean;
}) {
  const distance = useTransform(displayProgress, (v) => v - index);
  // 1 exactly at this step, decaying to 0 one full step away in either
  // direction — except the last step, which has no "next" to hand off to
  // and so simply stays at 1 once reached.
  const sizeT = useTransform(distance, (d) => (isLast ? Math.min(Math.max(d + 1, 0), 1) : 1 - Math.min(Math.abs(d), 1)));
  // Full opacity once this step has ever been reached (active or passed);
  // 50% while it's still upcoming — matches "before that step is shown" from
  // the brief, not tied to the size/color ramp so a passed step never fades
  // back down once it's been visited.
  const opacity = useTransform(distance, (d) => (d >= 0 ? 1 : 0.5));

  const size = useTransform(sizeT, [0, 1], [MUTED_SIZE, ACTIVE_SIZE]);
  const fontSize = useTransform(sizeT, [0, 1], [MUTED_FONT, ACTIVE_FONT]);
  const backgroundColor = useTransform(sizeT, [0, 1], [MUTED_BG, ACTIVE_BG]);
  const color = useTransform(sizeT, [0, 1], [MUTED_TEXT, ACTIVE_TEXT]);

  return (
    <div className="flex shrink-0 items-center justify-center" style={{ height: CIRCLE_SLOT }}>
      <motion.span
        className="flex shrink-0 items-center justify-center rounded-full font-display font-bold"
        style={{ width: size, height: size, fontSize, backgroundColor, color, opacity }}
      >
        {stepNumber}
      </motion.span>
    </div>
  );
}

function StepContent({ step }: { step: GuideStep }) {
  return (
    <motion.div
      key={step.number}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-1 flex-col gap-6 sm:flex-row sm:items-center sm:gap-3"
    >
      <div className="flex-1">
        <p className="font-display text-stat-md font-bold text-text-primary">{step.title}</p>
        <ul className="mt-4 flex flex-col gap-3">
          {step.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-3 text-body leading-relaxed text-text-secondary sm:text-base">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" aria-hidden="true" />
              {bullet}
            </li>
          ))}
        </ul>
      </div>
      {/* Media per step, sized/positioned to match the phone mockup in the
          Solution section (PhoneScrollDemo: w-[300px], aspect-ratio
          877/1783) rather than its own smaller ad-hoc size — same "product
          screen" precedent, same slot on the right of the text. Muted+
          loop+playsInline autoplay is the standard "silent looping clip"
          pattern — no user-facing controls, just a seamless demo.
          AnimatePresence only ever mounts the *active* step's content, so
          other steps' media never loads until that step is actually
          active. */}
      <div className="flex w-full shrink-0 justify-center gap-3 sm:w-auto sm:justify-start">
        {step.images.map((image, i) =>
          "placeholder" in image ? (
            <ImagePlaceholder key={i} spec={image.placeholder} className="w-full max-w-[300px] sm:w-[300px]" />
          ) : "videoSrc" in image ? (
            <video
              key={i}
              src={image.videoSrc}
              aria-label={image.alt}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              style={{ aspectRatio: "877 / 1783" }}
              className="w-full max-w-[300px] rounded-xl object-cover shadow-lg shadow-black/30 sm:w-[300px]"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={image.src}
              alt={image.alt}
              loading="lazy"
              className="w-full max-w-[300px] rounded-xl shadow-lg shadow-black/30 sm:w-[300px]"
            />
          ),
        )}
      </div>
    </motion.div>
  );
}

/**
 * Mobile-only fallback (< sm): the sm+ experience below pins a full-height
 * panel and scrubs through `steps.length * 50vh` of scroll to swap between
 * steps one at a time — that budget assumes there's room for the always-
 * visible vertical timeline (4 steps * 96px slot + connectors), the active
 * step's text, AND a ~300x610px portrait video stacked in a single 100dvh
 * screen. On a phone that easily adds up to more vertical space than the
 * viewport has, and because the panel is `position: sticky` (not its own
 * scroll container), anything past the fold would simply never become
 * visible rather than being reachable by scrolling further.
 *
 * Rather than shrinking everything down to the point of illegibility to
 * force a fit, mobile gets its own plain, non-pinned rendering: every step
 * in normal document flow, in order, each with its number badge, title,
 * bullets, and media at a comfortable capped width — ordinary native
 * scroll, no scrubbing, nothing to get clipped. Desktop/tablet (sm+) keep
 * the exact scroll-linked panel unchanged below.
 */
function MobileStepList({
  heading,
  subheading,
  steps,
}: {
  heading: string;
  subheading: string;
  steps: GuideStep[];
}) {
  return (
    <div className="flex flex-col pb-12 pt-section-top sm:hidden">
      <SectionHeading heading={heading} subheading={subheading} />
      <div className="mt-title-to-content flex flex-col gap-10">
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft font-display text-lg font-semibold text-accent">
                {step.number}
              </span>
              <p className="font-display text-stat-md font-bold text-text-primary">{step.title}</p>
            </div>
            <ul className="flex flex-col gap-3">
              {step.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 text-body leading-relaxed text-text-secondary">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" aria-hidden="true" />
                  {bullet}
                </li>
              ))}
            </ul>
            <div className="flex justify-center gap-3">
              {step.images.map((image, i) =>
                "placeholder" in image ? (
                  <ImagePlaceholder key={i} spec={image.placeholder} className="w-full max-w-[240px]" />
                ) : "videoSrc" in image ? (
                  <video
                    key={i}
                    src={image.videoSrc}
                    aria-label={image.alt}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    style={{ aspectRatio: "877 / 1783" }}
                    className="w-full max-w-[240px] rounded-xl object-cover shadow-lg shadow-black/30"
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className="w-full max-w-[240px] rounded-xl shadow-lg shadow-black/30"
                  />
                ),
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Renders as one tall block (`steps.length * STEP_VH` vh) with a `sticky`
 * panel pinned inside it. Scroll position still drives everything (no wheel
 * handler, no lockout — this stays native scroll all the way through), but
 * the raw scroll fraction (`rawProgress`) is no longer used directly to
 * position the connector/numbers 1:1. Instead it's watched for a *minimum*
 * amount of movement in one direction (`COMMIT_THRESHOLD`): once crossed,
 * the step "commits" and a separate `displayProgress` value animates the
 * rest of the way there on its own (`COMMIT_DURATION`), so a small scroll
 * nudge finishes the transition instead of requiring the user to physically
 * scroll the whole distance to see the line finish drawing.
 */
export function StepGuideSection({
  heading,
  subheading,
  steps,
}: {
  heading: string;
  subheading: string;
  steps: GuideStep[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainer = useScrollContainer();
  const [activeIndex, setActiveIndex] = useState(0);
  const displayProgress = useMotionValue(0);
  const committedRef = useRef(0);
  const baseRawRef = useRef(0);
  const animRef = useRef<AnimationPlaybackControls | null>(null);
  const settledRef = useRef(false);
  const lockedRef = useRef(false);
  const lockTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollContainer ?? undefined,
    offset: ["start start", "end end"],
  });
  const rawProgress = useTransform(scrollYProgress, [0, 1], [0, steps.length - 1]);

  const commitTo = (next: number) => {
    committedRef.current = next;
    setActiveIndex(next);
    animRef.current?.stop();
    animRef.current = animate(displayProgress, next, {
      duration: COMMIT_DURATION,
      // Ease-in-out, not the ease-OUT curve used for reveals elsewhere on
      // the site: this is a camera-pan between two states, not an element
      // arriving on screen, so a fast-start/soft-land curve read as an
      // abrupt jolt at the very start of the transition. Slow in, slow out.
      ease: [0.65, 0, 0.35, 1],
    });

    // Hard-lock further commits until the gesture that triggered this one
    // has had time to fully play out, then re-baseline against wherever
    // scroll physically ended up — so the "overshoot" from that same
    // gesture doesn't immediately count as fresh movement once unlocked.
    lockedRef.current = true;
    if (lockTimeoutRef.current) clearTimeout(lockTimeoutRef.current);
    lockTimeoutRef.current = setTimeout(() => {
      lockedRef.current = false;
      baseRawRef.current = rawProgress.get();
    }, COMMIT_LOCK * 1000);
  };

  useMotionValueEvent(rawProgress, "change", (raw) => {
    // First frame with a real position: snap straight to it instead of
    // threshold-stepping from 0 — handles arriving mid-section (e.g. a deep
    // link) without having to "catch up" one commit at a time.
    if (!settledRef.current) {
      settledRef.current = true;
      const start = Math.min(Math.max(Math.round(raw), 0), steps.length - 1);
      committedRef.current = start;
      baseRawRef.current = raw;
      displayProgress.set(start);
      setActiveIndex(start);
      return;
    }

    if (lockedRef.current) return;

    const committed = committedRef.current;
    const delta = raw - baseRawRef.current;
    if (delta > COMMIT_THRESHOLD && committed < steps.length - 1) {
      commitTo(committed + 1);
    } else if (delta < -COMMIT_THRESHOLD && committed > 0) {
      commitTo(committed - 1);
    }
  });

  useEffect(
    () => () => {
      animRef.current?.stop();
      if (lockTimeoutRef.current) clearTimeout(lockTimeoutRef.current);
    },
    [],
  );

  return (
    <>
      {/* < sm: plain stacked list, no scroll-pin — see MobileStepList's own
          comment for why. Does not read `containerRef`'s scroll progress at
          all, so it's unaffected by whatever `rawProgress`/`displayProgress`
          are doing off-screen in the sm+ tree below. */}
      <MobileStepList heading={heading} subheading={subheading} steps={steps} />

      {/* sm+: the original scroll-linked pinned panel, unchanged. Still
          mounted (not conditionally rendered) below sm so `containerRef`
          keeps a stable identity across breakpoint changes — just visually
          hidden and contributing no layout height via `hidden`. */}
      <div
        ref={containerRef}
        className="relative hidden sm:block"
        style={{ height: `${steps.length * STEP_VH}vh` }}
      >
        <div className="sticky top-0 flex h-screen flex-col pb-12 pt-section-top">
          <SectionHeading heading={heading} subheading={subheading} />
          <div className="mt-title-to-content flex flex-1 flex-col justify-center">
            <div className="flex items-center gap-10 sm:gap-16">
              {/* Fixed width (the circle's max/active size) so the column's
                  own footprint never changes as a circle grows or shrinks —
                  without it, the column auto-sizes to whichever circle is
                  momentarily biggest, which shifts the whole row (numbers AND
                  the content on the right) sideways during every transition
                  instead of only the line/number themselves animating. */}
              <div className="flex shrink-0 flex-col items-center" style={{ width: ACTIVE_SIZE }}>
                {steps.map((step, i) => (
                  <div key={step.number} className="flex flex-col items-center">
                    {i > 0 && <Connector index={i} progress={displayProgress} />}
                    <StepNode
                      index={i}
                      stepNumber={step.number}
                      displayProgress={displayProgress}
                      isLast={i === steps.length - 1}
                    />
                  </div>
                ))}
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <StepContent key={steps[activeIndex].number} step={steps[activeIndex]} />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
