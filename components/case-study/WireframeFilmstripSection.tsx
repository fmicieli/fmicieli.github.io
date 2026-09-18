"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { WireframeScreen } from "@/data/projects";
import { SectionHeading } from "@/components/case-study/SectionHeading";
import { ImagePlaceholder } from "@/components/case-study/ImagePlaceholder";
import { Modal } from "@/components/Modal";

/** Every phone screen recreation shares this ratio (see the source
 * screenshots in public/projects/stride/wireframes-{lofi,hifi}) — locking
 * card art to it, rather than sizing from each image's own intrinsic
 * dimensions, is what guarantees every card in a filmstrip renders at
 * exactly the same width *and* height, on every row, regardless of how the
 * row wraps at a given viewport width. */
const SCREEN_ASPECT = "375 / 812";

/**
 * One placeholder card. Reuses the same `ImagePlaceholder` every other case
 * study uses for a missing screenshot (loud green dashed box) instead of a
 * bespoke quieter style, so a "still pending" screen reads the same way
 * here as it does in BBVA/Tribu Music. Reused as-is for both the low-fi (05)
 * and high-fi (07) filmstrips — swap `screen.image` for a real `{ src, alt }`
 * later and this renders the actual screenshot instead, with zero layout
 * changes anywhere else.
 *
 * Without `fill`, `cardWidth` is a fixed px width (`shrink-0`) for every
 * card in every row — cards never stretch to fill a wrapped row's leftover
 * space, so a shorter last row (e.g. 3 cards instead of 4) never renders
 * larger than the rows above it. With `fill`, the card instead just takes
 * 100% of its CSS Grid cell — see the grid comment below for why that's
 * what makes a shorter last row match, not grow past, the row above it.
 */
function WireframeCard({
  screen,
  i,
  cardWidth,
  fill,
  onOpen,
}: {
  screen: WireframeScreen;
  i: number;
  cardWidth: number;
  fill?: boolean;
  /** Only real screens (not the "placeholder" ImagePlaceholder ones) are
   * clickable — omitted for a placeholder, since there's nothing to view
   * in detail yet. */
  onOpen?: () => void;
}) {
  // min(...) rather than a bare cardWidth: on a narrow mobile container,
  // 33.333% of it (minus a share of the gap) undercuts the desktop-tuned
  // cardWidth, so 3 always fit one row there instead of flex-wrap's normal
  // "however many fit at the fixed width" (often just 1 on a phone). On
  // anything wide enough that a third of the container already exceeds
  // cardWidth, min() just resolves to the original fixed value — the same
  // "however many fit" layout as before, unchanged.
  const responsiveWidth = `min(calc(33.333% - 14px), ${cardWidth}px)`;

  return (
    <motion.div
      className={fill ? "flex w-full flex-col items-center" : "flex shrink-0 flex-col items-center"}
      style={fill ? undefined : { width: responsiveWidth }}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-40px" }}
      transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      {"placeholder" in screen.image ? (
        <div className="w-full overflow-hidden border border-border" style={{ aspectRatio: SCREEN_ASPECT }}>
          <ImagePlaceholder spec={screen.image.placeholder} className="h-full w-full" />
        </div>
      ) : (
        <button
          type="button"
          onClick={onOpen}
          aria-label={`View ${screen.caption} in detail`}
          className="w-full overflow-hidden rounded-[2px] border border-border transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          style={{ aspectRatio: SCREEN_ASPECT }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={screen.image.src} alt={screen.image.alt} className="h-full w-full object-cover" />
        </button>
      )}
      {/* 12px * 1.25 = 15px, 16px * 1.25 = 20px */}
      {/* gap: 10px * 1.5 */}
      <p className="mt-[15px] text-center text-[15px] leading-5 text-text-secondary">{screen.caption}</p>
    </motion.div>
  );
}

export function WireframeFilmstripSection({
  heading,
  subheading,
  screens,
  // 168 * 1.25 — the low-fi filmstrip's 5 screens already split cleanly
  // (3 + 2) at this width, so it stays the default. The high-fi filmstrip
  // passes a slightly narrower width (see its data entry) so its 7 screens
  // split 4 + 3 instead of leaving one screen stranded alone on its own row.
  cardWidth = 210,
  // High-fi also passes `fill: true`: a CSS Grid (not flex-wrap) with
  // `repeat(auto-fit, minmax(cardWidth, 1fr))` columns. Grid — unlike
  // flexbox — fixes the column tracks for the *whole* grid once, from the
  // container width, and every row shares them; so the first (full) row's
  // cards grow to fill 100% of the width via `1fr`, and a shorter last row
  // reuses those exact same column widths (matching row one, not growing
  // to fill its own leftover space the way a wrapped flex line would).
  fill = false,
}: {
  heading: string;
  subheading: string;
  screens: WireframeScreen[];
  cardWidth?: number;
  fill?: boolean;
}) {
  // Index into `screens`, or null when no popup is open — clicking a card
  // (see WireframeCard's onOpen) opens it full-size in a Modal so it can be
  // examined in detail instead of squinting at a ~100px-wide thumbnail.
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const openScreen = openIndex !== null ? screens[openIndex] : null;

  return (
    <div className="flex h-full flex-1 flex-col">
      <SectionHeading heading={heading} subheading={subheading} />
      <div className="mt-title-to-content flex flex-1 flex-col justify-center">
        <div
          className={fill ? "gap-x-[21px] gap-y-6 pt-1" : "flex flex-wrap justify-center gap-x-[21px] gap-y-6 pt-1"}
          style={
            fill
              ? {
                  display: "grid",
                  // Same min()-against-a-third-of-the-container idea as the
                  // non-fill card width above, applied to the track's own
                  // minimum instead: on mobile that resolves smaller than
                  // cardWidth, so auto-fit places 3 tracks instead of 1.
                  gridTemplateColumns: `repeat(auto-fit, minmax(min(calc(33.333% - 14px), ${cardWidth}px), 1fr))`,
                }
              : undefined
          }
        >
          {screens.map((screen, i) => (
            <WireframeCard
              key={screen.caption}
              screen={screen}
              i={i}
              cardWidth={cardWidth}
              fill={fill}
              onOpen={() => setOpenIndex(i)}
            />
          ))}
        </div>
      </div>

      {openScreen && !("placeholder" in openScreen.image) && (
        <Modal open={true} onClose={() => setOpenIndex(null)} title={openScreen.caption}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={openScreen.image.src}
            alt={openScreen.image.alt}
            className="mx-auto h-auto max-h-[75vh] w-auto rounded-[2px]"
          />
        </Modal>
      )}
    </div>
  );
}
