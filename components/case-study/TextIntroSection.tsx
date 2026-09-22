"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/case-study/SectionHeading";

// The simplest shape in the block system: a heading and a few plain
// paragraphs, no cards or structure — for a section whose source material
// is just a short blurb (e.g. Medifé's target-user definition).
export function TextIntroSection({
  heading,
  subheading,
  paragraphs,
}: {
  heading: string;
  subheading?: string;
  paragraphs: string[];
}) {
  return (
    <div className="flex h-full flex-1 flex-col">
      <SectionHeading heading={heading} subheading={subheading} />
      <div className="mt-title-to-content flex flex-1 flex-col justify-center gap-3">
        {paragraphs.map((p, i) => (
          <motion.p
            key={i}
            className="max-w-[72ch] text-body leading-relaxed text-text-secondary"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {p}
          </motion.p>
        ))}
      </div>
    </div>
  );
}
