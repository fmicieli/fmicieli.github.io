"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { LabeledImage } from "@/data/projects";
import { SectionHeading } from "@/components/case-study/SectionHeading";
import { Modal } from "@/components/Modal";

export function PrototypeSection({
  heading,
  subheading,
  intro,
  bullets,
  screens,
}: {
  heading: string;
  subheading: string;
  intro: string;
  bullets: string[];
  screens: LabeledImage[];
}) {
  // Same "click a small screen thumbnail to view it full-size" pattern as
  // WireframeFilmstripSection — these render even smaller (w-24/w-28) than
  // a wireframe filmstrip card, so it matters just as much here.
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const openScreen = openIndex !== null ? screens[openIndex] : null;

  return (
    <div className="flex h-full flex-1 flex-col">
      <SectionHeading heading={heading} subheading={subheading} />
      <div className="mt-title-to-content flex flex-1 flex-col justify-center">
        {/* Text left, mockups right — per request. The intro paragraph is
            deliberately narrowed (max-w-[26ch]) so it wraps onto ~2 short
            lines instead of running the full width of its column. */}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <p className="max-w-[26ch] text-body leading-relaxed text-text-secondary">{intro}</p>
            <ul className="mt-3 flex flex-col gap-2 text-body leading-relaxed text-text-secondary">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" aria-hidden="true" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <ul className="grid grid-cols-3 gap-4">
            {screens.map((screen, i) => (
              <motion.li
                key={screen.label}
                className="flex w-24 flex-col items-center gap-2 sm:w-28"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(i)}
                  aria-label={`View ${screen.label} in detail`}
                  className="w-full overflow-hidden rounded-xl border border-border shadow-lg shadow-black/30 transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={screen.src} alt={screen.alt} loading="lazy" className="w-full" />
                </button>
                <p className="text-center text-label font-medium text-text-secondary">{screen.label}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {openScreen && (
        <Modal open={true} onClose={() => setOpenIndex(null)} title={openScreen.label}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={openScreen.src}
            alt={openScreen.alt}
            className="mx-auto h-auto max-h-[75vh] w-auto rounded-[2px]"
          />
        </Modal>
      )}
    </div>
  );
}
