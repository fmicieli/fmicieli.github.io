"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/case-study/SectionHeading";

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 flex flex-col gap-1.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-body leading-relaxed text-text-secondary">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

// A grid of cards, each optionally combining a short body paragraph with a
// bulleted list and a small attribution line — covers both Medifé's
// "methodology + objectives" shape and its "conclusions" shape (three
// themed cards of findings, each credited) without needing two components.
export function BulletCardsSection({
  heading,
  subheading,
  intro,
  cards,
}: {
  heading: string;
  subheading?: string;
  intro?: string;
  cards: { label: string; body?: string; bullets?: string[]; attribution?: string }[];
}) {
  return (
    <div className="flex h-full flex-1 flex-col">
      <SectionHeading heading={heading} subheading={subheading} />
      <div className="mt-title-to-content flex flex-1 flex-col justify-center gap-6">
        {intro && <p className="max-w-[72ch] text-body leading-relaxed text-text-secondary">{intro}</p>}
        <div className={`grid gap-6 ${cards.length > 1 ? "sm:grid-cols-2 lg:grid-cols-3" : ""}`}>
          {cards.map((card, i) => (
            <motion.div
              key={card.label}
              className="flex flex-col rounded-card border border-border border-t-[var(--color-border-top-highlight)] bg-surface p-6 shadow-card backdrop-blur-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-display text-card-title font-bold text-accent">{card.label}</p>
              {card.body && <p className="mt-2 text-body leading-relaxed text-text-secondary">{card.body}</p>}
              {card.bullets && <BulletList items={card.bullets} />}
              {card.attribution && (
                <p className="mt-auto pt-4 text-label text-text-muted">{card.attribution}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
