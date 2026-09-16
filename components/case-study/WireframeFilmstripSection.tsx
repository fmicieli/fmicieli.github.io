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
 */
function WireframeCard({ screen, i }: { screen: WireframeScreen; i: number }) {
  return (
    <motion.div
      className="flex w-[168px] shrink-0 flex-col items-center"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-40px" }}
      transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      {"placeholder" in screen.image ? (
        <ImagePlaceholder spec={screen.image.placeholder} className="w-[168px]" />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={screen.image.src} alt={screen.image.alt} className="w-full border border-border object-contain" />
      )}
      <p className="mt-2.5 text-center text-xs text-text-muted">{screen.caption}</p>
    </motion.div>
  );
}

export function WireframeFilmstripSection({
  heading,
  subheading,
  screens,
}: {
  heading: string;
  subheading: string;
  screens: WireframeScreen[];
}) {
  return (
    <div className="flex h-full flex-1 flex-col">
      <SectionHeading heading={heading} subheading={subheading} />
      <div className="mt-title-to-content flex flex-1 flex-col justify-center">
        <div className="flex gap-[21px] overflow-x-auto pb-4 pt-1">
          {screens.map((screen, i) => (
            <WireframeCard key={screen.caption} screen={screen} i={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
