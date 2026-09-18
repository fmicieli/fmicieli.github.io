"use client";

import { motion } from "framer-motion";
import type { CaseStudyImage } from "@/data/projects";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/case-study/SectionHeading";

/**
 * Tribu Music's closing section ("Muchas gracias" in Figma) — the last
 * block of this case study, following the exact same pattern as every other
 * section on the site (heading top-left via SectionHeading, content
 * centered in the space below it) and, for this being the last block
 * specifically, BBVA's NextStepsSection pattern: Footer pinned to the true
 * bottom via a sibling mt-auto div. The Figma design uses a rotated,
 * overlapping collage of phone screens built from Figma's own generic
 * placeholder assets (no real content) — simplified here to a clean,
 * responsive row of the app's real hi-fi screens instead of replicating
 * placeholder art.
 */
export function ClosingSection({
  heading,
  subheading,
  images,
}: {
  heading: string;
  subheading: string;
  images: CaseStudyImage[];
}) {
  return (
    <div className="flex h-full flex-1 flex-col">
      <SectionHeading heading={heading} subheading={subheading} />
      <div className="mt-title-to-content flex flex-1 flex-col justify-center">
        <ul className="flex flex-wrap items-center justify-center gap-6">
          {images.map((image, i) => (
            <motion.li
              key={image.src}
              // min(...) here (not on the <img>): percentages resolve
              // against the nearest ancestor with a definite width, and an
              // <li> with no width of its own doesn't reliably give the
              // <img> inside it one to resolve against. Putting it on the
              // <li> itself — the actual flex item, sized directly against
              // <ul>'s width — resolves it correctly. On a narrow mobile
              // container, a third of it (minus a full 24px gap's share)
              // undercuts the desktop-tuned 13.2rem width, so all 3 screens
              // fit one line instead of wrapping to their own rows;
              // resolves back to that original fixed width once a third of
              // the container is already wider than it (roughly sm: up).
              style={{ width: "min(calc(33.333% - 24px), 13.2rem)" }}
              initial={{ opacity: 0, y: 24, rotate: i % 2 === 0 ? -4 : 4 }}
              whileInView={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? -2 : 2 }}
              viewport={{ once: false, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="w-full rounded-2xl border border-border shadow-xl shadow-black/30"
              />
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
