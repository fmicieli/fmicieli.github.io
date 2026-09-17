"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { CaseStudyImage, SolutionPoint } from "@/data/projects";
import { SectionHeading } from "@/components/case-study/SectionHeading";
import { PhoneScrollDemo } from "@/components/case-study/PhoneScrollDemo";

// Vertical position (% down the phone frame, matching PhoneScrollDemo's own
// box) each annotation's arrow points at: the balance card near the top of
// the cutout, the shortcuts row just below it, and the bottom nav bar near
// the bottom of the screen.
const ANNOTATION_TOP = ["20%", "calc(34% + 40px)", "calc(85% + 40px)"];

export function SolutionSection({
  heading,
  subheading,
  points,
  annotations,
  image,
  phoneDemo,
}: {
  heading: string;
  subheading: string;
  points: SolutionPoint[];
  annotations: string[];
  image?: CaseStudyImage;
  phoneDemo?: { frameSrc: string; frameAlt: string; scrollSrc: string };
}) {
  const hasVisual = Boolean(image || phoneDemo);
  // Mirrors PhoneScrollDemo's own scroll-into-view + start-delay gate (see
  // its onStartedChange prop below) so the annotation callouts' fade
  // animation only starts ticking once the mockup's own auto-scroll does —
  // otherwise the two ran on independent clocks: the mockup paused until
  // scrolled into view, but the callouts' 16s CSS loop started counting
  // from page mount, so by the time a visitor actually scrolled down here
  // the callouts could already be mid-fade or hidden while the mockup was
  // still sitting at its static starting frame.
  const [phoneStarted, setPhoneStarted] = useState(false);

  return (
    <div className="flex h-full flex-1 flex-col">
      <SectionHeading heading={heading} subheading={subheading} />
      <div className="mt-title-to-content flex flex-1 flex-col justify-center">
      {/* The visual column (phone + annotations) needs ~340px just for the
          phone and its gap before any annotation text — splitting into two
          columns as early as `sm` (640px) leaves that column well under
          300px through the whole tablet range, which pushed the arrow row
          (see below) out past the viewport edge. `lg` (1024px) is the
          first point where a half-width column is comfortably >= 340px. */}
      <div className={hasVisual ? "grid gap-8 lg:grid-cols-2 lg:items-center" : ""}>
        <ul className="flex flex-col gap-8">
          {points.map((point, i) => (
            <motion.li
              key={point.number}
              className="flex gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full bg-accent-soft font-display text-[21px] font-semibold text-accent">
                {point.number}
              </span>
              <div>
                <p className="font-medium text-text-primary">{point.title}</p>
                <p className="mt-1 text-body leading-relaxed text-text-secondary">
                  {point.description}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>

        {hasVisual ? (
          <>
            {/* < xl: the pointer-arrow layout below assumes a side-by-side
                row where the annotations column shares the phone's exact
                height (so each callout's % position lines up with the spot
                on the screen it's meant to point at) AND has enough width
                left over after the phone's own ~300px + gap for readable
                callout text — that's only true from `xl` (1280px) up, given
                the grid above only splits into two columns at `lg`. Below
                that (all of mobile, all of tablet, and small desktop
                windows) gets its own simple, non-overlapping rendering
                instead: the mockup on top, the same annotation copy below
                as a plain static list, no arrows. */}
            {(phoneDemo || image) && (
              <div className="flex flex-col items-center gap-4 xl:hidden">
                {phoneDemo ? (
                  <PhoneScrollDemo
                    frameSrc={phoneDemo.frameSrc}
                    frameAlt={phoneDemo.frameAlt}
                    scrollSrc={phoneDemo.scrollSrc}
                  />
                ) : (
                  image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-32 rounded-2xl border border-border shadow-xl shadow-black/30"
                    />
                  )
                )}
                {phoneDemo && (
                  <ul className="flex w-full flex-col gap-2">
                    {annotations.map((annotation) => (
                      <li
                        key={annotation}
                        className="rounded-card border border-border border-t-[var(--color-border-top-highlight)] bg-surface px-3 py-2 text-body leading-relaxed text-text-secondary shadow-card backdrop-blur-card"
                      >
                        {annotation}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* xl+: mockup on the left, three callouts pointing at fixed
                spots on its screen (balance card near the top, shortcuts
                row just below it, bottom nav near the bottom) on the
                right. All three are on screen together only during the
                initial pause, then fade out together the moment the
                auto-scroll starts, via the shared annotation-group-fade
                keyframe (see globals.css). */}
            <motion.div
              className="hidden items-stretch justify-center gap-10 xl:flex"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              {phoneDemo ? (
                <div className="relative shrink-0">
                  <PhoneScrollDemo
                    frameSrc={phoneDemo.frameSrc}
                    frameAlt={phoneDemo.frameAlt}
                    scrollSrc={phoneDemo.scrollSrc}
                    onStartedChange={setPhoneStarted}
                  />
                </div>
              ) : (
                image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-32 shrink-0 rounded-2xl border border-border shadow-xl shadow-black/30 sm:w-40"
                  />
                )
              )}

              {phoneDemo && (
                // `key` forces a remount every time `phoneStarted` flips —
                // see PhoneScrollDemo's matching comment: pausing a CSS
                // animation freezes its current progress rather than
                // rewinding it, so leaving this section mid-fade-out and
                // coming back left the callouts stuck invisible (paused at
                // whatever opacity the loop happened to be at) instead of
                // showing again during the fresh "not yet scrolling" pause.
                <div
                  key={phoneStarted ? "fading" : "visible"}
                  className="relative min-h-[64px] flex-1"
                  style={
                    phoneStarted ? { animation: "annotation-group-fade 16s ease-in-out infinite" } : undefined
                  }
                >
                  {annotations.map((annotation, i) => (
                    <div
                      key={annotation}
                      className="absolute left-0 flex w-full -translate-y-1/2 items-center gap-2"
                      style={{ top: ANNOTATION_TOP[i] }}
                    >
                      <svg
                        viewBox="0 0 40 24"
                        aria-hidden="true"
                        className="w-8 shrink-0 text-accent"
                      >
                        <path d="M1 12 H30" stroke="currentColor" strokeWidth="2" fill="none" />
                        <path
                          d="M22 5 L32 12 L22 19"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="min-w-0 flex-1 rounded-card border border-border border-t-[var(--color-border-top-highlight)] bg-surface px-3 py-2 text-body leading-relaxed text-text-secondary shadow-card backdrop-blur-card">
                        {annotation}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </>
        ) : (
          <ul className="mt-4 flex flex-wrap gap-2">
            {annotations.map((annotation, i) => (
              <motion.li
                key={annotation}
                className="rounded-full border border-border bg-surface px-3 py-1.5 text-body text-text-secondary"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                {annotation}
              </motion.li>
            ))}
          </ul>
        )}
      </div>
      </div>
    </div>
  );
}
