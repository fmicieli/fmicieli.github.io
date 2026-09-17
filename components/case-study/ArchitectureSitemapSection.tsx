"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { SitemapNavItem } from "@/data/projects";
import { SectionHeading } from "@/components/case-study/SectionHeading";

type Line = { x1: number; y1: number; x2: number; y2: number };

/** Reveal order for the diagram: Start, then the arrow into Onboarding, then
 * the arrows fanning out into the nav sections, then finally the arrow down
 * into the Entrenamiento sub-flow nested under Today — each stage a beat
 * after the last rather than the whole tree fading in at once. */
const STAGE_START = 0;
const STAGE_ONBOARDING = 0.45;
const STAGE_NAV = 0.9;
const STAGE_SUBFLOW = 1.4;
const STAGE_EASE = [0.22, 1, 0.36, 1] as const;

/** Which reveal stage a given connector line belongs to, by its index in the
 * `lines` array as built by `measure()`: index 0 is Start->Onboarding, the
 * next `navCount` are Onboarding->each nav box, and the last (if present) is
 * the nav's first box -> the Entrenamiento sub-flow. */
function lineStageDelay(i: number, navCount: number) {
  if (i === 0) return STAGE_ONBOARDING;
  if (i <= navCount) return STAGE_NAV;
  return STAGE_SUBFLOW;
}

/** Center-x / top-or-bottom-y of `el`, in coordinates relative to
 * `container`'s own box — what the SVG overlay (itself absolutely
 * positioned over the same container) needs to draw a connector that lands
 * exactly on the real, currently-laid-out edge of a reflowing HTML box. */
function edgePoint(el: HTMLElement, container: HTMLElement, edge: "top" | "bottom") {
  const r = el.getBoundingClientRect();
  const c = container.getBoundingClientRect();
  return { x: r.left - c.left + r.width / 2, y: (edge === "top" ? r.top : r.bottom) - c.top };
}

/** Right-angle ("elbow") connector — straight down from the source, across,
 * then straight down into the target — instead of a diagonal line, so a fan
 * of connectors out of one shared source reads as a trunk that splits into
 * branches rather than a starburst of diagonals. Degenerates to a single
 * straight vertical segment when x1 === x2 (e.g. Start -> Onboarding). */
function elbowPath(line: Line) {
  const midY = line.y1 + (line.y2 - line.y1) / 2;
  return `M ${line.x1} ${line.y1} L ${line.x1} ${midY} L ${line.x2} ${midY} L ${line.x2} ${line.y2}`;
}

/**
 * The IA diagram's boxes are plain reflowing HTML (a flex row that wraps to
 * 2 or 1 columns on narrow screens) rather than fixed SVG coordinates, so
 * they stay a comfortable, fixed reading size at any viewport width instead
 * of shrinking like a scaled image. The connecting arrows are drawn on a
 * transparent SVG layer sized to match the container's real pixel box and
 * re-measured (via ResizeObserver, so it also catches font-load reflow)
 * every time those HTML boxes' actual positions change — the only way the
 * connectors can stay correct once the boxes are free to wrap.
 */
export function ArchitectureSitemapSection({
  heading,
  subheading,
  startLabel,
  onboardingLabel,
  onboardingSub,
  navItems,
  subflowLabel,
  subflowSub,
  discrepancyNote,
}: {
  heading: string;
  subheading: string;
  startLabel: string;
  onboardingLabel: string;
  onboardingSub: string;
  navItems: SitemapNavItem[];
  subflowLabel: string;
  subflowSub: string;
  discrepancyNote?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const startRef = useRef<HTMLDivElement>(null);
  const onboardingRef = useRef<HTMLDivElement>(null);
  const subflowRef = useRef<HTMLDivElement>(null);
  const navRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [lines, setLines] = useState<Line[]>([]);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    function measure() {
      const container = containerRef.current;
      const start = startRef.current;
      const onboarding = onboardingRef.current;
      if (!container || !start || !onboarding) return;

      const startBottom = edgePoint(start, container, "bottom");
      const onboardingTop = edgePoint(onboarding, container, "top");
      const next: Line[] = [{ x1: startBottom.x, y1: startBottom.y, x2: onboardingTop.x, y2: onboardingTop.y }];

      const from = edgePoint(onboarding, container, "bottom");
      navRefs.current
        .filter((el): el is HTMLDivElement => el !== null)
        .forEach((el) => {
          const to = edgePoint(el, container, "top");
          next.push({ x1: from.x, y1: from.y, x2: to.x, y2: to.y });
        });

      const firstNav = navRefs.current[0];
      if (subflowRef.current && firstNav) {
        const subFrom = edgePoint(firstNav, container, "bottom");
        const subTo = edgePoint(subflowRef.current, container, "top");
        next.push({ x1: subFrom.x, y1: subFrom.y, x2: subTo.x, y2: subTo.y });
      }

      setLines(next);
      setSize({ width: container.offsetWidth, height: container.offsetHeight });
    }

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    return () => observer.disconnect();
  }, [navItems.length]);

  // Belt-and-suspenders: web fonts swapping in after first paint can shift
  // box widths without firing a container resize on some browsers.
  useEffect(() => {
    const id = window.setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 300);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div className="flex h-full flex-1 flex-col">
      <SectionHeading heading={heading} subheading={subheading} />
      <div className="mt-title-to-content flex flex-1 flex-col justify-center">
        <motion.div
          ref={containerRef}
          className="relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, margin: "-40px" }}
          transition={{ duration: 0.3 }}
        >
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            width={size.width}
            height={size.height}
          >
            <defs>
              {/* 7 * 1.15 */}
              <marker id="sitemap-arrow" markerWidth="8" markerHeight="8" refX="6.3" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 Z" fill="var(--color-text-secondary)" />
              </marker>
            </defs>
            {lines.map((line, i) => (
              <motion.g
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false, margin: "-40px" }}
                transition={{ duration: 0.4, delay: lineStageDelay(i, navItems.length), ease: STAGE_EASE }}
              >
                {/* Stroke color + width bumped for visibility (was
                    --color-border at 1.5px — barely visible at ~1.6:1); now
                    --color-border-interactive (~3.76:1, already used
                    elsewhere on the site for exactly this "needs to read as
                    a boundary" case) at 2px. */}
                <path
                  d={elbowPath({ ...line, y2: line.y2 - 8 })}
                  fill="none"
                  stroke="var(--color-border-interactive)"
                  strokeWidth={2}
                  markerEnd="url(#sitemap-arrow)"
                />
              </motion.g>
            ))}
          </svg>

          <div className="relative flex justify-center">
            <motion.div
              ref={startRef}
              className="rounded-card border border-[var(--color-border-interactive)] bg-surface px-[27.6px] py-[11.5px] text-center shadow-card backdrop-blur-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-40px" }}
              transition={{ duration: 0.5, delay: STAGE_START, ease: STAGE_EASE }}
            >
              {/* 14px * 1.15 */}
              <p className="font-display text-[16.1px] font-semibold text-text-primary">{startLabel}</p>
            </motion.div>
          </div>

          {/* gap: 40px * 1.15 */}
          <div className="relative mt-[46px] flex justify-center">
            <motion.div
              ref={onboardingRef}
              className="rounded-card border border-[var(--color-border-interactive)] border-t-[var(--color-border-top-highlight)] bg-surface px-[36.8px] py-[18.4px] text-center shadow-card backdrop-blur-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-40px" }}
              transition={{ duration: 0.5, delay: STAGE_ONBOARDING, ease: STAGE_EASE }}
            >
              {/* 18px * 1.15, 14px * 1.15 */}
              <p className="font-display text-[20.7px] font-semibold text-text-primary">{onboardingLabel}</p>
              <p className="mt-[6.9px] font-mono text-[16.1px] text-text-secondary">{onboardingSub}</p>
            </motion.div>
          </div>

          {/* Entrenamiento (the sub-flow) nests directly under Hoy/Today
              (navItems[0]) in the same column, instead of centering under
              the whole row — a plain document-flow stack, so it always
              lands under that specific box regardless of how many items
              wrap next to it. */}
          {/* gap: 64px * 1.15, 26px * 1.15 */}
          <div className="relative mt-[73.6px] flex flex-wrap items-start justify-center gap-[29.9px]">
            {navItems.map((item, i) => {
              const box = (
                <motion.div
                  ref={(el) => {
                    navRefs.current[i] = el;
                  }}
                  // 210px * 1.15
                  className="w-[241.5px] rounded-card border border-[var(--color-border-interactive)] border-t-[var(--color-border-top-highlight)] bg-surface p-[18.4px] text-center shadow-card backdrop-blur-card"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: STAGE_NAV, ease: STAGE_EASE }}
                >
                  {/* 18px * 1.15, 14px * 1.15 */}
                  <p className="font-display text-[20.7px] font-semibold text-text-primary">{item.label}</p>
                  <p className="mt-[6.9px] whitespace-nowrap font-mono text-[16.1px] font-normal text-text-secondary">
                    {item.sub}
                  </p>
                </motion.div>
              );

              if (i !== 0) {
                return <div key={item.label}>{box}</div>;
              }

              return (
                // gap: 64px * 1.15
                <div key={item.label} className="flex flex-col items-center gap-[73.6px]">
                  {box}
                  <motion.div
                    ref={subflowRef}
                    className="rounded-card border border-dashed border-[var(--color-border-interactive)] bg-surface px-[27.6px] py-[18.4px] text-center shadow-card backdrop-blur-card"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: STAGE_SUBFLOW, ease: STAGE_EASE }}
                  >
                    <p className="font-display text-[20.7px] font-semibold text-text-primary">{subflowLabel}</p>
                    <p className="mt-[6.9px] whitespace-nowrap font-mono text-[16.1px] font-normal text-text-secondary">
                      {subflowSub}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {discrepancyNote && (
          <p className="mt-8 max-w-[64ch] border-l-2 border-border pl-4 text-body leading-relaxed text-text-secondary">
            {discrepancyNote}
          </p>
        )}
      </div>
    </div>
  );
}
