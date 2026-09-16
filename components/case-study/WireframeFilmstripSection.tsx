"use client";

import { motion } from "framer-motion";
import type { WireframeScreen } from "@/data/projects";
import { SectionHeading } from "@/components/case-study/SectionHeading";
import { ImagePlaceholder } from "@/components/case-study/ImagePlaceholder";

/**
 * One placeholder card. Reuses the same `ImagePlaceholder` every other case
 * study uses for a missing screenshot (loud green dashed box) instead of a
 * bespoke quieter style, so a "still pending" screen reads the same way
 * here as it does in BBVA/Tribu Music. Reused as-is for both the low-fi (05)
 * and high-fi (07) filmstrips — swap `screen.image` for a real `{ src, alt }`
 * later and this renders the actual screenshot instead, with zero layout
 * changes anywhere else.
 *
 * `cardWidth` is a fixed px width normally (`shrink-0`) — the low-fi
 * filmstrip's cards stay that size and the row centers with side margins if
 * it doesn't fill the container. With `fill`, it becomes a `flex-basis`
 * instead: cards on the same wrapped line grow together to fill the full
 * container width (the high-fi filmstrip's last, partial line included),
 * rather than sitting centered with empty space on the sides — flexbox
 * distributes each wrapped line's leftover space independently, so this
 * needs no per-row logic in JS.
 */
function WireframeCard({
  screen,
  i,
  cardWidth,
  fill,
}: {
  screen: WireframeScreen;
  i: number;
  cardWidth: number;
  fill?: boolean;
}) {
  return (
    <motion.div
      className={fill ? "flex min-w-0 flex-1 flex-col items-center" : "flex shrink-0 flex-col items-center"}
      style={fill ? { flexBasis: cardWidth } : { width: cardWidth }}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-40px" }}
      transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      {"placeholder" in screen.image ? (
        <ImagePlaceholder spec={screen.image.placeholder} className={fill ? "w-full" : undefined} style={fill ? undefined : { width: cardWidth }} />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={screen.image.src} alt={screen.image.alt} className="w-full border border-border object-contain" />
      )}
      {/* 12px * 1.25 = 15px, 16px * 1.25 = 20px */}
      <p className="mt-2.5 text-center text-[15px] leading-5 text-text-muted">{screen.caption}</p>
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
  // High-fi also passes `cardFill: true` so both wrapped rows stretch to
  // span the full container width instead of staying at a fixed size.
  fill = false,
}: {
  heading: string;
  subheading: string;
  screens: WireframeScreen[];
  cardWidth?: number;
  fill?: boolean;
}) {
  return (
    <div className="flex h-full flex-1 flex-col">
      <SectionHeading heading={heading} subheading={subheading} />
      <div className="mt-title-to-content flex flex-1 flex-col justify-center">
        <div className={`flex flex-wrap gap-x-[21px] gap-y-6 pt-1 ${fill ? "" : "justify-center"}`}>
          {screens.map((screen, i) => (
            <WireframeCard key={screen.caption} screen={screen} i={i} cardWidth={cardWidth} fill={fill} />
          ))}
        </div>
      </div>
    </div>
  );
}
