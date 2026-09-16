"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { HoverBorderTrace } from "@/components/HoverBorderTrace";
import { useTranslation } from "@/lib/i18n/ui";

// Tool-name tags are proper nouns — not translated, kept in one fixed order
// that lines up positionally with the translated title/text pulled from the
// UI dictionary (see useTranslation() below).
const skillTags = [
  ["Claude", "Google Meet", "Loom", "Miro"],
  ["Figma", "Stark"],
  ["Figma", "Photoshop", "Illustrator"],
  ["Claude Code", "Framer", "Vercel"],
];

// Narrower and taller than the previous grid version so all four fit in one
// row: 4 * 280 + 3 * 40 = 1240px, comfortably inside common desktop widths.
const CARD_WIDTH = 280;
const CARD_GAP = 32;
const CARD_STEP = CARD_WIDTH + CARD_GAP;
const CARD_HEIGHT = 300;

// Pre-scroll: cards sit close together and fanned (small alternating
// rotation), like a stacked hand of cards — not spread across the screen.
const STACK_STEP = 50;
const ROTATE_STEP = 6;

// How far below the viewport's bottom edge the row still sits at the mid
// checkpoint, cut off by the sticky container's overflow-hidden, before the
// second scroll gesture settles everything into the final row. Raised 30%
// (was 460) so more of the fanned stack already shows before any scrolling.
const PEEK_OFFSET = 322;

type Skill = { title: string; text: string; tags: string[] };

function CardContent({ item }: { item: Skill }) {
  return (
    <>
      <h3 className="font-display text-card-title font-bold text-text-primary">{item.title}</h3>
      <p className="text-body leading-relaxed text-text-secondary">{item.text}</p>
      <div className="mt-auto flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white bg-white/20 px-2.5 py-2 text-label font-medium text-white"
          >
            {tag}
          </span>
        ))}
      </div>
    </>
  );
}

const CARD_STYLE =
  "group relative flex flex-col gap-1.5 rounded-card border border-border border-t-[var(--color-border-top-highlight)] bg-surface px-6 pt-[18px] pb-6 shadow-card backdrop-blur-card";

/**
 * Desktop/tablet only: the four cards start tightly overlapped and fanned —
 * a stacked hand of cards, peeking up from below the viewport — then spread
 * apart into a single row as the hero's pinned scroll continues. Driven by
 * `progress` (0-1), a slice of the hero's own scrollYProgress rather than
 * the cards' own position in the page, since they live inside Hero's sticky
 * viewport and never actually scroll past it on their own.
 *
 * Each card's x/rotate target is unique, so each needs its own motion
 * value — four of each, named individually rather than built in a loop so
 * this stays a fixed, static set of hook calls. y is shared: it's a single
 * row now, so every card rises by the same amount.
 */
function StackToRow({ progress, skills }: { progress: MotionValue<number>; skills: Skill[] }) {
  const opacity = useTransform(progress, [0, 0.4], [0, 1]);
  const y = useTransform(progress, [0, 1], [PEEK_OFFSET, 0]);

  const center = (skills.length - 1) / 2;
  const startX = (i: number) => (i - center) * STACK_STEP;
  const finalX = (i: number) => (i - center) * CARD_STEP;
  const startRotate = (i: number) => (i - center) * ROTATE_STEP;

  const x0 = useTransform(progress, [0, 1], [startX(0), finalX(0)]);
  const x1 = useTransform(progress, [0, 1], [startX(1), finalX(1)]);
  const x2 = useTransform(progress, [0, 1], [startX(2), finalX(2)]);
  const x3 = useTransform(progress, [0, 1], [startX(3), finalX(3)]);
  const xByIndex = [x0, x1, x2, x3];

  const rotate0 = useTransform(progress, [0, 1], [startRotate(0), 0]);
  const rotate1 = useTransform(progress, [0, 1], [startRotate(1), 0]);
  const rotate2 = useTransform(progress, [0, 1], [startRotate(2), 0]);
  const rotate3 = useTransform(progress, [0, 1], [startRotate(3), 0]);
  const rotateByIndex = [rotate0, rotate1, rotate2, rotate3];

  return (
    <div className="relative mx-auto hidden max-w-6xl sm:block" style={{ height: CARD_HEIGHT }}>
      {skills.map((item, i) => {
        // Cards nearer the center of the fan sit on top, like a real
        // stacked deck.
        const zIndex = Math.round(skills.length - Math.abs(i - center) * 2);
        return (
          <motion.div
            key={item.title}
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              marginLeft: -CARD_WIDTH / 2,
              width: CARD_WIDTH,
              height: CARD_HEIGHT,
              x: xByIndex[i],
              y,
              rotate: rotateByIndex[i],
              opacity,
              zIndex,
            }}
            className={CARD_STYLE}
          >
            <HoverBorderTrace />
            <CardContent item={item} />
          </motion.div>
        );
      })}
    </div>
  );
}

/** Mobile: a plain 2-column grid (no horizontal spread to animate — there's
 *  no room for a fanned row on a narrow screen), sharing the same
 *  peek-from-below/fade-in as the desktop version. */
function StackedGrid({ progress, skills }: { progress: MotionValue<number>; skills: Skill[] }) {
  const y = useTransform(progress, [0, 1], [PEEK_OFFSET, 0]);
  const opacity = useTransform(progress, [0, 0.4], [0, 1]);

  return (
    <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 sm:hidden">
      {skills.map((item) => (
        <motion.div key={item.title} style={{ opacity, y }} className={CARD_STYLE}>
          <HoverBorderTrace />
          <CardContent item={item} />
        </motion.div>
      ))}
    </div>
  );
}

export function AboutCards({ progress }: { progress: MotionValue<number> }) {
  const t = useTranslation();
  const skills: Skill[] = t.aboutCards.skills.map((skill, i) => ({
    ...skill,
    tags: skillTags[i],
  }));

  return (
    <>
      <StackToRow progress={progress} skills={skills} />
      <StackedGrid progress={progress} skills={skills} />
    </>
  );
}
