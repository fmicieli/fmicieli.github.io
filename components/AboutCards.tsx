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

// How far below the viewport's bottom edge the row still sits at the mid
// checkpoint, cut off by the sticky container's overflow-hidden, before the
// second scroll gesture settles everything into the final row. Raised 30%
// (was 460) so more of the row already shows before any scrolling.
const PEEK_OFFSET = 322;

type Skill = { title: string; text: string; tags: string[] };

function CardContent({ item }: { item: Skill }) {
  return (
    <>
      <h3 className="font-display text-card-title font-bold text-text-primary">{item.title}</h3>
      <p className="text-body leading-relaxed text-text-secondary">{item.text}</p>
      <div className="mt-4 flex flex-wrap gap-2 sm:mt-auto">
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
 * Desktop/tablet only: the four cards sit in their final row position the
 * whole time (no overlapped/fanned pre-step) and simply rise + fade into
 * place as the hero's pinned scroll continues. Driven by `progress` (0-1),
 * a slice of the hero's own scrollYProgress rather than the cards' own
 * position in the page, since they live inside Hero's sticky viewport and
 * never actually scroll past it on their own.
 */
function StackToRow({ progress, skills }: { progress: MotionValue<number>; skills: Skill[] }) {
  const opacity = useTransform(progress, [0, 0.4], [0, 1]);
  const y = useTransform(progress, [0, 1], [PEEK_OFFSET, 0]);

  const center = (skills.length - 1) / 2;
  const finalX = (i: number) => (i - center) * CARD_STEP;

  return (
    <div className="relative mx-auto hidden max-w-6xl sm:block" style={{ height: CARD_HEIGHT }}>
      {skills.map((item, i) => (
        <motion.div
          key={item.title}
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            marginLeft: -CARD_WIDTH / 2,
            width: CARD_WIDTH,
            height: CARD_HEIGHT,
            x: finalX(i),
            y,
            opacity,
          }}
          className={CARD_STYLE}
        >
          <HoverBorderTrace />
          <CardContent item={item} />
        </motion.div>
      ))}
    </div>
  );
}

/** Mobile: a plain 2-column grid (no horizontal spread to animate — there's
 *  no room for a fanned row, or even two side by side, on a narrow
 *  screen), sharing the same peek-from-below/fade-in as the desktop
 *  version. Single column (was 2) — see Hero.tsx for how the pinned
 *  section grows to fit these stacked one under another instead of
 *  clipping the last one or two. */
function StackedGrid({ progress, skills }: { progress: MotionValue<number>; skills: Skill[] }) {
  const y = useTransform(progress, [0, 1], [PEEK_OFFSET, 0]);
  const opacity = useTransform(progress, [0, 0.4], [0, 1]);

  return (
    <div className="mx-auto grid max-w-sm grid-cols-1 gap-4 sm:hidden">
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
