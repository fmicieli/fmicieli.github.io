"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/case-study/SectionHeading";
import { ImagePlaceholder } from "@/components/case-study/ImagePlaceholder";

function ScreenRow({ label, screens }: { label: string; screens: { placeholder: string }[] }) {
  return (
    <div>
      <p className="mb-3 text-label font-semibold uppercase tracking-[0.08em] text-text-secondary">{label}</p>
      <div className="flex flex-wrap gap-4">
        {screens.map((screen, i) => (
          <motion.div
            key={i}
            className="w-[168px] shrink-0"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <ImagePlaceholder spec={screen.placeholder} className="w-[168px]" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Before/after screen comparison — current app flow vs. the proposed
// solution. Screens are placeholders for now (real exported screenshots
// weren't provided yet, only a composite slide image), swap for real
// `{ src, alt }` once they land, same pattern as every other pending-image
// section on the site.
export function SolutionCompareSection({
  heading,
  subheading,
  intro,
  currentLabel,
  currentScreens,
  solutionLabel,
  solutionScreens,
}: {
  heading: string;
  subheading?: string;
  intro?: string;
  currentLabel: string;
  currentScreens: { placeholder: string }[];
  solutionLabel: string;
  solutionScreens: { placeholder: string }[];
}) {
  return (
    <div className="flex h-full flex-1 flex-col">
      <SectionHeading heading={heading} subheading={subheading} />
      <div className="mt-title-to-content flex flex-1 flex-col justify-center gap-8">
        {intro && <p className="max-w-[72ch] text-body leading-relaxed text-text-secondary">{intro}</p>}
        <ScreenRow label={currentLabel} screens={currentScreens} />
        <ScreenRow label={solutionLabel} screens={solutionScreens} />
      </div>
    </div>
  );
}
