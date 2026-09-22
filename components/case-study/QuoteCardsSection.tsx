"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/case-study/SectionHeading";

// Splits on `**bold**` markers and renders those spans in the accent color
// — lets the data just mark which word(s) in "Sofía **needs** to..." should
// pop, instead of the caller pre-splitting into prefix/highlight/suffix
// fields for every possible number of highlighted words.
function Highlighted({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        const match = part.match(/^\*\*([^*]+)\*\*$/);
        return match ? (
          <span key={i} className="font-semibold text-accent">
            {match[1]}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        );
      })}
    </>
  );
}

// Photo + attributed insight cards, synthesized findings phrased as a need
// or opinion belonging to a specific research participant — same card
// language as the rest of the system, with the participant's photo doubling
// as a face to the quote instead of an anonymous bullet point.
export function QuoteCardsSection({
  heading,
  subheading,
  intro,
  cards,
}: {
  heading: string;
  subheading?: string;
  intro?: string;
  cards: { name: string; photo?: { src: string; alt: string }; text: string }[];
}) {
  return (
    <div className="flex h-full flex-1 flex-col">
      <SectionHeading heading={heading} subheading={subheading} />
      <div className="mt-title-to-content flex flex-1 flex-col justify-center gap-6">
        {intro && <p className="max-w-[72ch] text-body leading-relaxed text-text-secondary">{intro}</p>}
        <div className="grid gap-5 sm:grid-cols-2">
          {cards.map((card, i) => (
            <motion.div
              key={card.name + i}
              className="flex items-center gap-4 rounded-card border border-border border-t-[var(--color-border-top-highlight)] bg-surface p-5 shadow-card backdrop-blur-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              {card.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={card.photo.src}
                  alt={card.photo.alt}
                  className="h-16 w-16 shrink-0 rounded-full object-cover"
                />
              ) : (
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-accent-soft font-display text-lg font-bold text-accent">
                  {card.name
                    .split(" ")
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join("")}
                </span>
              )}
              <p className="text-body leading-relaxed text-text-secondary">
                <Highlighted text={card.text} />
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
