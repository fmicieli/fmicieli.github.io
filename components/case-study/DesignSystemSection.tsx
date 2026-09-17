"use client";

import { motion } from "framer-motion";
import type { DesignSystemTypeRow } from "@/data/projects";
import { SectionHeading } from "@/components/case-study/SectionHeading";

// Stride's own validated product tokens — literal, not site theme vars,
// since this panel is the one place in the whole case study that recreates
// Stride's actual dark+lime product identity rather than the portfolio's
// own page chrome. Kept local to this file on purpose.
const DK_BG = "#0D0D0F";
const DK_SURFACE = "#1B1B1D";
const DK_SURFACE_2 = "#242427";
const DK_LINE = "#303033";
const LIME = "#9BE83C";
const LIME_TINT = "rgba(155,232,60,.14)";
const DANGER = "#E5484D";
// DANGER itself, used as *text* on DK_SURFACE, is only 4.39:1 — under
// WCAG AA's 4.5:1 floor for normal text. This lightened variant (same hue,
// ~5.1:1 on DK_SURFACE) is for text only; DANGER itself stays unchanged
// for the swatch fill/border, where it already passes.
const DANGER_TEXT = "#E85E63";
const DK_TEXT_2 = "#9C9CA0";

function ComponentCell({
  label,
  className,
  scale = 1.15,
  children,
}: {
  label: string;
  className?: string;
  /** Bottom nav's 4 items already span edge-to-edge with no slack — the
   * default 15% growth clipped its 4th item entirely under overflow-hidden.
   * Passed as 1 there; every other cell keeps the default. */
  scale?: number;
  children: React.ReactNode;
}) {
  return (
    // overflow-hidden + a scaled inner wrapper, rather than resizing every
    // component preview's own fonts/padding by hand: the cell (and the
    // fixed-size grid/panel it lives in) stays exactly the same size, the
    // preview inside it just renders bigger, clipped if it would overflow.
    // The label stays outside the scaled wrapper (a sibling, not a child
    // of it) so it isn't affected.
    <div
      // This min-h is what actually drives the whole panel's height:
      // ComponentCell's own natural (pre-scale) content already needed
      // ~132px per cell — more than the 92px floor this used to have, and
      // more than the style panel's own content height too — so it was
      // already the tallest of the grid's two `h-full` columns, silently
      // winning the shared row-height calc. That left "text field · error"
      // (3 stacked lines at 1.15x) and the buttons (1.15x width) clipped
      // under overflow-hidden with no headroom. 153.6px = 132 * 1.15,
      // which grows the whole shared panel by exactly 15% (measured) and
      // gives every cell the extra room.
      className={`relative flex min-h-[153.6px] flex-col items-start justify-center gap-2 overflow-hidden rounded-lg p-4 pt-7 ${className ?? ""}`}
      style={{ background: DK_SURFACE }}
    >
      <span className="absolute left-3 top-2 font-stride-mono text-xs" style={{ color: DK_TEXT_2 }}>
        {label}
      </span>
      {/* w-full: several previews (text fields, achievement box, bottom
          nav, stat grid...) have their own `w-full` child expecting to
          fill the cell's real width, not this wrapper's — transform
          doesn't change layout sizing for percentage children, only how
          the whole scaled box paints, so keeping this wrapper's own
          layout width identical to the cell's is what keeps those intact. */}
      <div className="w-full" style={{ transform: `scale(${scale})`, transformOrigin: "left center" }}>
        {children}
      </div>
    </div>
  );
}

export function DesignSystemSection({
  heading,
  subheading,
  typeSpecimen,
  sectionLabels,
  componentLabels,
}: {
  heading: string;
  subheading: string;
  typeSpecimen: DesignSystemTypeRow[];
  sectionLabels: { colorAccent: string; colorSurfaces: string; tintOpacity: string };
  componentLabels: {
    primaryButton: string;
    pillBadge: string;
    statValue: string;
    statLabel: string;
    achievementTitle: string;
    dangerAction: string;
    navItems: [string, string, string, string];
    textFieldLabel: string;
    textFieldPlaceholder: string;
    dayInitials: [string, string, string, string, string, string, string];
    statusBadges: [string, string, string];
    dateFieldLabel: string;
    dateFieldValue: string;
    statGrid: [{ value: string; label: string }, { value: string; label: string }];
    textFieldFilledValue: string;
    textFieldErrorValue: string;
    textFieldErrorMessage: string;
    achievementLocked: string;
  };
}) {
  const selectedDays = new Set([0, 2, 4]);
  // Home / bar-chart / trophy / person — matching the real bottom nav's
  // actual icon set (Today / Progress / Achievements / Profile), not
  // generic geometric stand-ins.
  const NAV_ICONS = [
    <path key="home" d="M3 8.5 L12 2.5 L21 8.5 M5.5 7 V20 H18.5 V7" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
    <path
      key="chart"
      d="M5 20 V13 M12 20 V6 M19 20 V10"
      strokeLinecap="round"
      fill="none"
    />,
    <path
      key="trophy"
      d="M7 4 H17 V8 A5 5 0 0 1 7 8 Z M7 5 H4 V7 A3 3 0 0 0 7 10 M17 5 H20 V7 A3 3 0 0 1 17 10 M12 13 V17 M9 20 H15 M9 17 H15 V20 H9 Z"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />,
    <path
      key="user"
      d="M12 12 A4 4 0 1 0 12 4 A4 4 0 0 0 12 12 Z M4 21 C4 16.5 7.5 14 12 14 C16.5 14 20 16.5 20 21"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />,
  ];

  return (
    <div className="flex h-full flex-1 flex-col">
      <SectionHeading heading={heading} subheading={subheading} />
      <div className="mt-title-to-content flex flex-1 flex-col justify-center gap-6">
        {/* Style on the left, components on the right — two independent
            panels instead of one long stacked sheet, so growing the
            component catalog doesn't just keep making the section taller.
            Stretched to equal height (the default for a grid row) so the
            shorter panel grows to fill whatever height the taller one
            sets — in practice that's the component grid's own min-h-per-
            cell total (see ComponentCell), not the style panel's content. */}
        <div className="grid gap-4 lg:grid-cols-[360px_1fr]">
          <motion.div
            className="font-stride-sans h-full overflow-hidden rounded-card border"
            style={{ borderColor: DK_LINE, background: DK_BG }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* py-10 * 1.15 (a proportionate bump, matching the rest of
                this panel — not what drives the shared container's
                height; see ComponentCell's min-h for that). */}
            <div className="border-b px-8 py-[46px] text-center" style={{ borderColor: DK_LINE }}>
              {/* Real brand assets (the white/light variant, meant for a
                  dark surface like this one) — Logo-stride (wordmark) and
                  Isologo-stride (the standalone "S" mark), not a crop of
                  one file. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/projects/stride/logo-full.png" alt="Stride" className="mx-auto h-auto w-[170px]" />
              {/* gap: 14.4px * 1.5 */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/projects/stride/logo-s.png" alt="" aria-hidden="true" className="mx-auto mt-[21.6px] h-[35px] w-auto" />
            </div>

            <p className="font-stride-mono px-4 pb-2 pt-3 text-xs tracking-wide" style={{ color: DK_TEXT_2 }}>
              {sectionLabels.colorAccent}
            </p>
            {/* min-h: 76px * 1.15 */}
            <div className="flex border-b" style={{ borderColor: DK_LINE }}>
              <div
                className="font-stride-mono flex min-h-[87.4px] flex-1 flex-col justify-end p-3 text-[9.5px]"
                style={{ background: LIME, color: DK_BG }}
              >
                lime-500
                <br />
                #9BE83C
              </div>
              <div
                className="font-stride-mono flex min-h-[87.4px] flex-1 flex-col justify-end p-3 text-[9.5px]"
                style={{ background: LIME_TINT, color: LIME }}
              >
                lime-tint
                <br />
                {sectionLabels.tintOpacity}
              </div>
            </div>
            <p className="font-stride-mono px-4 pb-2 pt-3 text-xs tracking-wide" style={{ color: DK_TEXT_2 }}>
              {sectionLabels.colorSurfaces}
            </p>
            <div className="flex flex-wrap border-b" style={{ borderColor: DK_LINE }}>
              {[
                { name: "bg", hex: DK_BG },
                { name: "surface", hex: DK_SURFACE },
                { name: "surface-2", hex: DK_SURFACE_2 },
                { name: "danger", hex: DANGER },
              ].map((swatch) => (
                <div
                  key={swatch.name}
                  className="font-stride-mono flex min-h-[87.4px] min-w-[90px] flex-1 flex-col justify-end p-3 text-[9.5px]"
                  // White text on the "danger" swatch's own mid-brightness
                  // red only reaches ~3.9:1 — under WCAG AA's 4.5:1 floor.
                  // Dark text clears it (~5:1) there; the other three
                  // swatches are all dark enough that white stays correct.
                  style={{ background: swatch.hex, color: swatch.name === "danger" ? DK_BG : "#fff" }}
                >
                  {swatch.name}
                  <br />
                  {swatch.hex}
                </div>
              ))}
            </div>

            <div className="pt-2">
              {typeSpecimen.map((row, i) => (
                // py-4 * 1.15
                <div
                  key={row.sample}
                  className={`flex flex-wrap items-baseline justify-between gap-4 px-5 py-[18.4px] ${
                    i < typeSpecimen.length - 1 ? "border-b" : ""
                  }`}
                  style={{ borderColor: DK_LINE }}
                >
                  <span
                    className={row.mono ? "font-stride-mono text-white" : "text-white"}
                    style={{ fontSize: Math.round(row.size * 0.8), fontWeight: row.weight }}
                  >
                    {row.sample}
                  </span>
                  <span className="font-stride-mono text-[9.5px] text-right" style={{ color: DK_TEXT_2 }}>
                    {row.meta}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="font-stride-sans grid h-full auto-rows-fr grid-cols-2 gap-2.5 rounded-card border p-2.5 sm:grid-cols-3"
            style={{ borderColor: DK_LINE, background: DK_BG }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <ComponentCell label="button / primary">
              <div className="rounded-full px-4 py-2 text-xs font-bold" style={{ background: LIME, color: DK_BG }}>
                {componentLabels.primaryButton}
              </div>
            </ComponentCell>
            <ComponentCell label="button / secondary">
              <div
                className="rounded-full border px-4 py-2 text-xs font-bold"
                style={{ borderColor: LIME, color: LIME }}
              >
                {componentLabels.primaryButton}
              </div>
            </ComponentCell>
            <ComponentCell label="button / ghost">
              <div className="px-1 text-xs font-bold underline" style={{ color: LIME }}>
                {componentLabels.primaryButton}
              </div>
            </ComponentCell>
            <ComponentCell label="pill / badge">
              <div
                className="rounded-full px-3 py-1.5 text-[10.5px] font-semibold"
                style={{ background: LIME_TINT, color: LIME }}
              >
                {componentLabels.pillBadge}
              </div>
            </ComponentCell>
            <ComponentCell label="progress ring">
              <div
                className="font-stride-mono flex h-9 w-9 items-center justify-center rounded-full border-4 text-[8px] text-white"
                style={{ borderColor: DK_SURFACE_2, borderTopColor: LIME }}
              >
                0%
              </div>
            </ComponentCell>
            <ComponentCell label="stat">
              <div className="text-[11px]" style={{ color: DK_TEXT_2 }}>
                <b className="font-stride-mono block text-base font-extrabold text-white">
                  {componentLabels.statValue}
                </b>
                {componentLabels.statLabel}
              </div>
            </ComponentCell>
            <ComponentCell label="danger action">
              <div className="text-[11.5px] font-semibold" style={{ color: DANGER_TEXT }}>
                {componentLabels.dangerAction}
              </div>
            </ComponentCell>
            {/* Achievement Box — copied from the real Figma component: an
                unlocked badge (tinted card, medal icon, lime label) next to
                a locked one (muted card, padlock icon, dimmed label), not a
                progress bar — that was this cell's old, invented shape. */}
            <ComponentCell label="achievement box">
              <div className="flex w-full gap-1.5">
                <div className="flex flex-1 flex-col items-center gap-1 rounded-lg px-1.5 py-2" style={{ background: LIME_TINT }}>
                  <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke={LIME} strokeWidth={1.3}>
                    <circle cx="8" cy="6" r="4" />
                    <path d="M6 9.5 L5 14.5 L8 13 L11 14.5 L10 9.5" strokeLinejoin="round" />
                  </svg>
                  <span className="text-[8.5px] font-semibold" style={{ color: LIME }}>
                    {componentLabels.achievementTitle}
                  </span>
                </div>
                <div className="flex flex-1 flex-col items-center gap-1 rounded-lg px-1.5 py-2" style={{ background: DK_SURFACE_2 }}>
                  <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke={DK_TEXT_2} strokeWidth={1.3}>
                    <rect x="4" y="7" width="8" height="6" rx="1.2" />
                    <path d="M5.5 7 V5 a2.5 2.5 0 0 1 5 0 V7" />
                  </svg>
                  <span className="text-[8.5px] font-semibold" style={{ color: DK_TEXT_2 }}>
                    {componentLabels.achievementLocked}
                  </span>
                </div>
              </div>
            </ComponentCell>
            {/* Text Field — the three states that actually differ visually
                (default/filled/error); focus and disabled are covered by
                the same component and omitted here only for space. */}
            <ComponentCell label="text field · default">
              <div className="w-full">
                <p className="mb-1 text-[9.5px]" style={{ color: DK_TEXT_2 }}>
                  {componentLabels.textFieldLabel}
                </p>
                <div
                  className="rounded-md px-2.5 py-2 text-[10.5px]"
                  style={{ background: DK_SURFACE, color: DK_TEXT_2 }}
                >
                  {componentLabels.textFieldPlaceholder}
                </div>
              </div>
            </ComponentCell>
            <ComponentCell label="text field · filled">
              <div className="w-full">
                <p className="mb-1 text-[9.5px]" style={{ color: DK_TEXT_2 }}>
                  {componentLabels.textFieldLabel}
                </p>
                <div className="rounded-md px-2.5 py-2 text-[10.5px] text-white" style={{ background: DK_SURFACE }}>
                  {componentLabels.textFieldFilledValue}
                </div>
              </div>
            </ComponentCell>
            <ComponentCell label="text field · error">
              <div className="w-full">
                <p className="mb-1 text-[9.5px]" style={{ color: DK_TEXT_2 }}>
                  {componentLabels.textFieldLabel}
                </p>
                <div
                  className="rounded-md border px-2.5 py-2 text-[10.5px] text-white"
                  style={{ background: DK_SURFACE, borderColor: DANGER }}
                >
                  {componentLabels.textFieldErrorValue}
                </div>
                <p className="mt-1 text-[8.5px]" style={{ color: DANGER_TEXT }}>
                  {componentLabels.textFieldErrorMessage}
                </p>
              </div>
            </ComponentCell>
            <ComponentCell label="date field">
              <div className="w-full">
                <p className="mb-1 text-[9.5px]" style={{ color: DK_TEXT_2 }}>
                  {componentLabels.dateFieldLabel}
                </p>
                <div
                  className="flex items-center justify-between rounded-md px-2.5 py-2 text-[10.5px] text-white"
                  style={{ background: DK_SURFACE }}
                >
                  {componentLabels.dateFieldValue}
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0" fill="none" stroke={DK_TEXT_2} strokeWidth={1.3}>
                    <rect x="2" y="3" width="12" height="11" rx="1.5" />
                    <path d="M2 6.5 H14 M5 1.5 V4 M11 1.5 V4" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </ComponentCell>
            <ComponentCell label="toggle switch">
              <div className="flex h-5 w-9 items-center rounded-full p-0.5" style={{ background: LIME }}>
                <div className="ml-auto h-4 w-4 rounded-full bg-black" />
              </div>
            </ComponentCell>
            <ComponentCell label="day chips">
              <div className="flex w-full flex-wrap gap-1.5">
                {componentLabels.dayInitials.map((day, i) => (
                  <span
                    key={i}
                    className="flex h-6 w-6 items-center justify-center rounded-full text-[9.5px] font-bold"
                    style={
                      selectedDays.has(i)
                        ? { background: LIME, color: DK_BG }
                        : { background: DK_SURFACE_2, color: "white" }
                    }
                  >
                    {day}
                  </span>
                ))}
              </div>
            </ComponentCell>
            <ComponentCell label="status badges">
              <div className="flex flex-wrap gap-1.5">
                <span
                  className="rounded-full px-2.5 py-1 text-[9.5px] font-semibold"
                  style={{ background: DK_SURFACE_2, color: DK_TEXT_2 }}
                >
                  {componentLabels.statusBadges[0]}
                </span>
                <span
                  className="rounded-full px-2.5 py-1 text-[9.5px] font-semibold text-white"
                  style={{ background: DK_SURFACE_2 }}
                >
                  {componentLabels.statusBadges[1]}
                </span>
                <span
                  className="rounded-full px-2.5 py-1 text-[9.5px] font-semibold"
                  style={{ background: LIME_TINT, color: LIME }}
                >
                  {componentLabels.statusBadges[2]}
                </span>
              </div>
            </ComponentCell>
            <ComponentCell label="progress bar">
              <div className="w-full">
                <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ background: DK_SURFACE_2 }}>
                  <div className="h-full w-[60%] rounded-full" style={{ background: LIME }} />
                </div>
              </div>
            </ComponentCell>
            {/* Same-size container as every other cell — 3 per row, no
                span override — rather than the wider treatment this had
                before. */}
            <ComponentCell label="bottom nav" scale={1}>
              <div className="flex w-full items-start justify-between">
                {componentLabels.navItems.map((label, i) => (
                  <div key={label} className="flex flex-col items-center gap-1">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-3.5 w-3.5"
                      fill="none"
                      stroke={i === 0 ? LIME : DK_TEXT_2}
                      strokeWidth={1.8}
                    >
                      {NAV_ICONS[i] ?? null}
                    </svg>
                    <span
                      className="whitespace-nowrap text-center text-[6.5px] leading-tight"
                      style={i === 0 ? { color: LIME, fontWeight: 600 } : { color: DK_TEXT_2 }}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </ComponentCell>
            <ComponentCell label="stat grid">
              <div className="flex w-full gap-4">
                {componentLabels.statGrid.map((stat) => (
                  <div key={stat.label}>
                    <b className="font-stride-mono block text-sm font-extrabold text-white">{stat.value}</b>
                    <span className="text-[9px]" style={{ color: DK_TEXT_2 }}>
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </ComponentCell>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
