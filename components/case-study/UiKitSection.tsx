"use client";

import { motion } from "framer-motion";
import type { UiKitGroup } from "@/data/projects";
import { SectionHeading } from "@/components/case-study/SectionHeading";

/**
 * Real pixel dimensions of every UI Kit screenshot (measured from the
 * source PNGs), plus an optional per-image `scale` on top of BASE_SCALE
 * (used for Primary/Secondary/Ghost/Error specifically — Text Link and Icon
 * stay unscaled). Final width = BASE_SCALE * that image's own `scale` * its
 * group's multiplier from GROUP_SCALE below — so a small icon button still
 * renders smaller than a full-width top bar by default, while specific
 * groups (or specific images within a group) can still be sized up on
 * request without distorting anything else's relative scale.
 */
const BASE_SCALE = 0.2031;

const IMAGE_SPEC: Record<string, { width: number; height: number; scale?: number }> = {
  "uikit-btn-primary.png": { width: 512, height: 371, scale: 1.681875 }, // 1.25 * 1.3 * 1.15 * 0.9
  "uikit-btn-secondary.png": { width: 512, height: 371, scale: 1.681875 }, // 1.25 * 1.3 * 1.15 * 0.9
  "uikit-btn-ghost.png": { width: 512, height: 371, scale: 1.681875 }, // 1.25 * 1.3 * 1.15 * 0.9
  "uikit-btn-error.png": { width: 512, height: 371, scale: 1.681875 }, // 1.25 * 1.3 * 1.15 * 0.9
  "uikit-btn-textlink.png": { width: 504, height: 666, scale: 1.3455 }, // 1.3 * 1.15 * 0.9
  "uikit-btn-icon.png": { width: 234, height: 424, scale: 1.035 }, // 1.15 * 0.9
  "uikit-cards-1.png": { width: 209, height: 707, scale: 1.3 },
  "uikit-cards-2.png": { width: 517, height: 359, scale: 1.3225 }, // 1.15 * 1.15
  "uikit-chatbubbles.png": { width: 585, height: 435 },
  "uikit-listitem.png": { width: 666, height: 538 },
  "uikit-navbar.png": { width: 814, height: 740 },
  "uikit-tabbar.png": { width: 893, height: 328 },
  "uikit-textfields.png": { width: 293, height: 508 },
  "uikit-topbar.png": { width: 1062, height: 698 },
};

// Which group each filename prefix belongs to, and that group's own size
// multiplier on top of BASE_SCALE — both keyed by filename (stable across
// languages) rather than the group's own translated title.
const GROUP_KEY: Record<string, string> = {
  "uikit-btn-": "buttons",
  "uikit-cards-": "cards",
  "uikit-textfields": "textfields",
  "uikit-topbar": "topbar",
  "uikit-navbar": "navbar",
  "uikit-tabbar": "tabbar",
  "uikit-listitem": "listitem",
  "uikit-chatbubbles": "chatbubbles",
};
const GROUP_SCALE: Record<string, number> = {
  cards: 2.1125, // 1.3 * 1.25 * 1.3 (uikit-cards-2 gets an extra +15% of its own, see IMAGE_SPEC)
  textfields: 3.1581875, // 1.3 * 1.25 * 1.3 * 1.15 * 1.3
  navbar: 1.452, // 1.1 * 1.2 * 1.1
  chatbubbles: 1.859, // 1.1 * 1.3 * 1.3
  tabbar: 1.625, // 1.25 * 1.3
  listitem: 1.625, // 1.25 * 1.3
};

function groupKeyOf(group: UiKitGroup): string {
  const filename = group.images[0]?.src.split("/").pop() ?? "";
  const prefix = Object.keys(GROUP_KEY).find((p) => filename.includes(p));
  return prefix ? GROUP_KEY[prefix] : "";
}

// Top Bar, Navigation Bar, Chat Bubbles, Tab Bar and List Item are each a
// single image with a totally different native aspect ratio, so matching
// their real relative scale (like every other group) left them at 5
// different widths — per request, they now share one fixed width instead;
// only the height still varies per image's own aspect ratio.
const UNIFORM_WIDTH_GROUPS = ["topbar", "navbar", "chatbubbles", "tabbar", "listitem"];
const UNIFORM_WIDTH = 240;

function ImageThumb({
  image,
  groupTitle,
  scale,
  widthOverride,
}: {
  image: { src: string; alt: string; label: string };
  groupTitle: string;
  scale: number;
  widthOverride?: number;
}) {
  const filename = image.src.split("/").pop() ?? "";
  const spec = IMAGE_SPEC[filename];
  const w = widthOverride ?? (spec ? Math.round(spec.width * BASE_SCALE * scale * (spec.scale ?? 1)) : 120);
  return (
    // Fixed to the image's own computed width (not just the <img> itself)
    // so a long caption ("Primary — Default / Hover / Pressed / Disabled")
    // wraps inside that same width instead of growing the flex item wider
    // to fit more of the text on one line — that growth was silently
    // blocking same-sized images from ever sharing a row via flex-wrap.
    <div className="flex shrink-0 flex-col gap-1.5" style={{ width: `${w}px`, maxWidth: "100%" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        width={spec?.width}
        height={spec?.height}
        style={{ width: "100%", height: "auto" }}
        className="rounded-md border border-border bg-white/5"
      />
      {/* Skip the caption when it's just the group title repeated (e.g. a
          single "Top Bar" image labeled "Top Bar") — only render it when
          it actually adds information beyond the group's own heading.
          Clamped to 2 lines: at these thumbnail widths a full state list
          ("Default / Hover / Pressed / Disabled") can wrap into 4-5 lines
          on its own, taller than the image above it — the full text is
          still in the `alt`/DOM for anyone who needs it, this is just the
          visible summary. */}
      {image.label !== groupTitle && (
        <p className="line-clamp-2 text-label leading-snug text-text-secondary">{image.label}</p>
      )}
    </div>
  );
}

// Row 1's between-groups gap — 24px (gap-6) * 1.2 — shared with Cards'
// internal image gap below so the two stay equal as either is adjusted.
const ROW1_GAP = "gap-[28.8px]";

function GroupBlock({
  group,
  index,
  mobileColumn = false,
}: {
  group: UiKitGroup;
  index: number;
  /** Rendered inside the mobile 2-column masonry (see UiKitSection) instead
   * of a desktop row: drops `shrink-0` so it can narrow to fit its column
   * (each ImageThumb's own `maxWidth: 100%` then shrinks it to match), and
   * Buttons wraps its states instead of requiring horizontal scroll to see
   * them all — a scrollable strip inside an already-narrow mobile column
   * read as "can't see this at 100% without panning it." */
  mobileColumn?: boolean;
}) {
  const key = groupKeyOf(group);
  const isButtons = key === "buttons";
  // Every group's images are top-aligned — per request (Cards was the
  // first to switch off the original bottom-alignment; now all of them
  // match).
  const alignClass = "items-start";
  // Cards' own internal image-to-image gap matches ROW1_GAP (the
  // between-groups row gap) instead of the smaller default (gap-3, 12px) —
  // per request, so the two Cards images don't read as more tightly paired
  // than Cards is with its neighbors in the row. Kept as one shared
  // constant (see below) so the two stay in sync as either changes.
  const gapClass = key === "cards" ? ROW1_GAP : "gap-3";
  const scale = GROUP_SCALE[key] ?? 1;
  const widthOverride = UNIFORM_WIDTH_GROUPS.includes(key) ? UNIFORM_WIDTH : undefined;
  const wrapClass = isButtons && !mobileColumn ? `flex-nowrap ${gapClass} overflow-x-auto pb-1` : `flex-wrap ${gapClass}`;
  return (
    <motion.div
      className={mobileColumn ? "flex min-w-0 flex-col gap-2" : "flex shrink-0 flex-col gap-2"}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="font-display text-[17px] font-bold text-text-primary">{group.title}</p>
      {/* Buttons specifically (desktop only, see wrapClass): all states
          side by side in one row, not wrapping — per explicit request.
          Horizontal scroll is the fallback if the row is ever wider than
          its own space. */}
      <div className={`flex ${alignClass} ${wrapClass}`}>
        {group.images.map((image) => (
          <ImageThumb key={image.src} image={image} groupTitle={group.title} scale={scale} widthOverride={widthOverride} />
        ))}
      </div>
    </motion.div>
  );
}

export function UiKitSection({
  heading,
  subheading,
  groups,
}: {
  heading: string;
  subheading: string;
  groups: UiKitGroup[];
}) {
  const byKey = new Map(groups.map((g) => [groupKeyOf(g), g]));
  // Two explicit rows — the pairing of which groups share a row is
  // content-driven here, not something a generic layout algorithm would
  // reliably reproduce. Row 1's items sit at their own natural sizes with
  // automatic (gap-only) spacing between them now, rather than being
  // force-stretched apart via `justify-between` to fill the row's full
  // width — per request.
  const row1Keys = ["cards", "textfields", "topbar", "navbar", "chatbubbles"];
  // Tab Bar and List Item moved back down to align with Buttons — per
  // request — instead of stacking under Chat Bubbles/Top Bar in row 1.
  const row2Keys = ["tabbar", "buttons", "listitem"];
  const row1 = row1Keys.map((k) => byKey.get(k)).filter((g): g is UiKitGroup => Boolean(g));
  const row2 = row2Keys.map((k) => byKey.get(k)).filter((g): g is UiKitGroup => Boolean(g));

  // Mobile: every group (both former rows combined) split into two
  // independent columns that each flow top to bottom on their own — not
  // aligned row by row with each other, so a tall group in one column
  // doesn't force a gap next to a short one in the other (masonry, not a
  // grid). Dealt alternately for a reasonably even split; there's no
  // "correct" pairing to preserve here the way there was for the two
  // desktop rows.
  const allGroups = [...row1, ...row2];
  const mobileCol1 = allGroups.filter((_, i) => i % 2 === 0);
  const mobileCol2 = allGroups.filter((_, i) => i % 2 === 1);

  return (
    <div className="flex h-full flex-1 flex-col">
      <SectionHeading heading={heading} subheading={subheading} />
      <div className="mt-title-to-content flex flex-1 flex-col justify-center gap-8">
        {/* Mobile-only 2-column masonry — see mobileCol1/2 above. Desktop
            keeps the original two hand-tuned rows below (hidden here). */}
        <div className="flex items-start gap-3 sm:hidden">
          <div className="flex min-w-0 flex-1 flex-col gap-6">
            {mobileCol1.map((group, i) => (
              <GroupBlock key={group.title} group={group} index={i} mobileColumn />
            ))}
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-6">
            {mobileCol2.map((group, i) => (
              <GroupBlock key={group.title} group={group} index={i} mobileColumn />
            ))}
          </div>
        </div>

        <div className="hidden flex-col gap-8 sm:flex">
          <div className={`flex flex-wrap items-start ${ROW1_GAP}`}>
            {row1.map((group, i) => (
              <GroupBlock key={group.title} group={group} index={i} />
            ))}
          </div>
          {/* flex-nowrap + overflow-x-auto rather than flex-wrap: Buttons'
              states take up close to the full row width on their own, which
              would otherwise push Tab Bar/List Item down onto their own
              separate lines instead of sharing this row. This guarantees all
              three stay aligned on one row, with horizontal scroll as the
              fallback — same pattern already used for Buttons' own internal
              row of states. */}
          <div className="flex flex-nowrap items-start gap-6 overflow-x-auto pb-1">
            {row2.map((group, i) => (
              <GroupBlock key={group.title} group={group} index={row1.length + i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
