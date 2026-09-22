"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/case-study/SectionHeading";

const TRAIT_DOTS = 10;

function TraitBar({ left, right, value, i }: { left: string; right: string; value: number; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, margin: "-40px" }}
      transition={{ duration: 0.4, delay: i * 0.04 }}
    >
      <div className="flex justify-between text-label text-text-secondary">
        <span>{left}</span>
        <span>{right}</span>
      </div>
      <div className="mt-1.5 flex gap-1">
        {Array.from({ length: TRAIT_DOTS }, (_, dot) => (
          <span
            key={dot}
            className={`h-2 flex-1 rounded-full ${dot < value ? "bg-accent" : "bg-white/10"}`}
            aria-hidden="true"
          />
        ))}
      </div>
    </motion.div>
  );
}

// Medifé's user-persona slide: a classic persona card (photo, quote, bio,
// keywords/motivations/goals/frustrations) alongside a personality-traits
// panel of bipolar sliders (Introverted <-> Extroverted, etc.) — the traits
// panel is specific enough to this one persona shape that it isn't folded
// into ContextSection's existing (photo + fields + objectives-list) persona
// card, which has no notion of a slider scale.
export function UserPersonaSection({
  heading,
  subheading,
  persona,
  personalityLabel,
  traits,
}: {
  heading: string;
  subheading?: string;
  persona: {
    name: string;
    photo?: { src: string; alt: string };
    fields: string[];
    quote: string;
    bio: string;
    keywordsLabel: string;
    keywords: string;
    motivationsLabel: string;
    motivations: string;
    goalsLabel: string;
    goals: string;
    frustrationsLabel: string;
    frustrations: string;
  };
  personalityLabel: string;
  traits: { left: string; right: string; value: number }[];
}) {
  return (
    <div className="flex h-full flex-1 flex-col">
      <SectionHeading heading={heading} subheading={subheading} />
      <div className="mt-title-to-content flex flex-1 flex-col justify-center">
        <div className="grid gap-8 rounded-card border border-border border-t-[var(--color-border-top-highlight)] bg-surface p-6 shadow-card backdrop-blur-card lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)]">
          <motion.div
            className="flex flex-col gap-5"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-40px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-4">
              {persona.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={persona.photo.src}
                  alt={persona.photo.alt}
                  className="h-20 w-20 shrink-0 rounded-full object-cover"
                />
              ) : (
                <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-accent-soft font-display text-2xl font-bold text-accent">
                  {persona.name
                    .split(" ")
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join("")}
                </span>
              )}
              <div>
                <p className="font-display text-card-title font-bold text-text-primary">{persona.name}</p>
                <ul className="mt-1 flex flex-col text-body text-text-secondary">
                  {persona.fields.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="font-display text-lg font-semibold leading-snug text-text-primary">
              &ldquo;{persona.quote}&rdquo;
            </p>
            <p className="text-body leading-relaxed text-text-secondary">{persona.bio}</p>

            <dl className="flex flex-col gap-1.5 text-body text-text-secondary">
              <div>
                <span className="font-semibold text-text-primary">{persona.keywordsLabel}: </span>
                {persona.keywords}
              </div>
              <div>
                <span className="font-semibold text-text-primary">{persona.motivationsLabel}: </span>
                {persona.motivations}
              </div>
              <div>
                <span className="font-semibold text-text-primary">{persona.goalsLabel}: </span>
                {persona.goals}
              </div>
              <div>
                <span className="font-semibold text-text-primary">{persona.frustrationsLabel}: </span>
                {persona.frustrations}
              </div>
            </dl>
          </motion.div>

          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-display text-card-title font-bold text-accent">{personalityLabel}</p>
            {traits.map((trait, i) => (
              <TraitBar key={trait.left} {...trait} i={i} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
