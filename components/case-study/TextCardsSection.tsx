"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/case-study/SectionHeading";

// A grid of labeled text cards — for source material that's organized as
// several short, titled blurbs (What is it / Context / Purpose / Problem,
// etc.) rather than a single narrative paragraph. Generic on purpose: reused
// across whichever of Medifé's sections turn out to be this same shape.
export function TextCardsSection({
  heading,
  subheading,
  cards,
}: {
  heading: string;
  subheading?: string;
  cards: { label: string; paragraphs: string[] }[];
}) {
  return (
    <div className="flex h-full flex-1 flex-col">
      <SectionHeading heading={heading} subheading={subheading} />
      <div className="mt-title-to-content flex flex-1 flex-col justify-center">
        <div className="grid gap-6 sm:grid-cols-2">
          {cards.map((card, i) => (
            <motion.div
              key={card.label}
              className="flex flex-col gap-3 rounded-card border border-border border-t-[var(--color-border-top-highlight)] bg-surface p-6 shadow-card backdrop-blur-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-display text-card-title font-bold text-accent">{card.label}</p>
              {card.paragraphs.map((p, pi) => (
                <p key={pi} className="text-body leading-relaxed text-text-secondary">
                  {p}
                </p>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
