"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

// How long after the phone scrolls into view before its auto-scroll starts
// — long enough for Solution's text points (staggered reveal, ~0.74s to
// settle) to finish appearing first, so it reads as "text, then scroll"
// instead of both happening at once.
const START_DELAY_MS = 900;

/**
 * Composites a phone frame (with a transparent cutout where its screen
 * should be) over a tall screenshot of everything that screen would show if
 * scrolled top to bottom, then slow-pans that tall image up through the
 * cutout on a loop — simulating someone scrolling the real screen, using
 * only two static exports (no video, no live embed).
 *
 * The cutout's position/size (as % of the frame image's own box) and the
 * scroll distance (as % of the content image's own height) were measured
 * directly from the exported PNGs' alpha channel and aspect ratios — see the
 * commit that introduced this file for the exact pixel measurements.
 *
 * The CSS animation itself is always attached (so its timing/easing is
 * defined once, in the keyframe), but stays paused until this component has
 * actually scrolled into view — otherwise it starts ticking the moment the
 * page mounts, and by the time a visitor actually scrolls down to it, the
 * 16s loop could be anywhere in its cycle rather than at a clean start.
 */
export function PhoneScrollDemo({
  frameSrc,
  frameAlt,
  scrollSrc,
  onStartedChange,
}: {
  frameSrc: string;
  frameAlt: string;
  scrollSrc: string;
  /** Fires whenever this component's own scroll-into-view + start-delay
   *  gate flips, so a sibling element (Solution's annotation callouts) can
   *  run its own CSS animation in lockstep with this one instead of ticking
   *  from page mount regardless of visibility — see SolutionSection.tsx. */
  onStartedChange?: (started: boolean) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-100px" });
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!inView) {
      const reset = setTimeout(() => setStarted(false), 0);
      return () => clearTimeout(reset);
    }
    const timeout = setTimeout(() => setStarted(true), START_DELAY_MS);
    return () => clearTimeout(timeout);
  }, [inView]);

  useEffect(() => {
    onStartedChange?.(started);
  }, [started, onStartedChange]);

  return (
    <div
      ref={ref}
      className="relative mx-auto w-[300px] max-w-full shrink-0"
      style={{ aspectRatio: "877 / 1783" }}
    >
      {/* Height padded a couple points past the measured cutout (73.25%) so
          the scrolling image always overlaps the frame's bottom edge with
          margin for error — any excess simply hides behind the opaque bezel
          drawn on top, rather than leaving a sliver of page background
          showing through if the fit were ever a pixel short. */}
      <div
        className="absolute overflow-hidden rounded-none"
        style={{ left: "5.25%", top: "13.01%", width: "89.51%", height: "76%" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={scrollSrc}
          alt=""
          aria-hidden="true"
          className="w-full"
          style={{
            animation: "phone-scroll 16s ease-in-out infinite",
            animationPlayState: started ? "running" : "paused",
          }}
        />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={frameSrc}
        alt={frameAlt}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />
    </div>
  );
}
