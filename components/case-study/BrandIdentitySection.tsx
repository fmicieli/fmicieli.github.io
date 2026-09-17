"use client";

import { useState } from "react";
import type { CaseStudyBlock, CaseStudyImage, ColorSwatch, SimpleTable } from "@/data/projects";
import { SectionHeading } from "@/components/case-study/SectionHeading";
import { DataTable } from "@/components/case-study/DataTable";
import { IconSet } from "@/components/case-study/IconSet";
import { Modal } from "@/components/Modal";

type AccessibilityBlock = Extract<CaseStudyBlock, { type: "accessibility" }>;

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2 text-body leading-relaxed text-text-secondary">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

// WCAG relative luminance. 0.1791 is the crossover point where a
// background's contrast against white and against black are equal —
// above it, black text has the higher (and passing) contrast; below it,
// white does. Used instead of a hardcoded "only #FAFAFA is light" check,
// which let other pale swatch colors (e.g. a light purple accent) slip
// through with white/70 text at ~1.5:1 — far under WCAG AA's 4.5:1 floor.
function relativeLuminance(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i + 1, i + 3), 16) / 255);
  const linear = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);
}

function SwatchCard({ swatch }: { swatch: ColorSwatch }) {
  const isLight = relativeLuminance(swatch.hex) > 0.1791;
  return (
    <div className="flex flex-1 flex-col items-center gap-2">
      <div
        className="flex h-24 w-full items-center justify-center rounded-lg border border-border"
        style={{ backgroundColor: swatch.hex }}
      >
        <span className={`text-sm font-medium ${isLight ? "text-[#121212]" : "text-white/70"}`}>{swatch.name}</span>
      </div>
      <p className="font-display text-[15px] font-bold text-text-primary">{swatch.hex}</p>
    </div>
  );
}

export function BrandIdentitySection({
  heading,
  subheading,
  logoHeading,
  logoIntro,
  logoBullets,
  logoHorizontal,
  logoVertical,
  voiceHeading,
  voiceTitle,
  voiceBullets,
  toneTitle,
  toneBullets,
  colorHeading,
  colorSwatches,
  colorUsageTitle,
  colorUsageBullets,
  colorAccessibilityTitle,
  colorAccessibilityBullets,
  viewAllLabel,
  typographyHeading,
  fontFamiliesTitle,
  fontFamilies,
  typeScaleTitle,
  typeScaleTable,
  iconographyHeading,
  iconSpecsTitle,
  iconSpecs,
  iconUsageTitle,
  iconUsageBullets,
  spacingHeading,
  spacingTitle,
  spacingTable,
  radiusTitle,
  radiusTable,
  accessibility,
}: {
  heading: string;
  subheading: string;
  logoHeading: string;
  logoIntro: string;
  logoBullets: string[];
  logoHorizontal: CaseStudyImage;
  logoVertical: CaseStudyImage;
  voiceHeading: string;
  voiceTitle: string;
  voiceBullets: string[];
  toneTitle: string;
  toneBullets: string[];
  colorHeading: string;
  colorSwatches: ColorSwatch[];
  colorUsageTitle: string;
  colorUsageBullets: string[];
  colorAccessibilityTitle: string;
  colorAccessibilityBullets: string[];
  viewAllLabel: string;
  typographyHeading: string;
  fontFamiliesTitle: string;
  fontFamilies: string[];
  typeScaleTitle: string;
  typeScaleTable: SimpleTable;
  iconographyHeading: string;
  iconSpecsTitle: string;
  iconSpecs: string[];
  iconUsageTitle: string;
  iconUsageBullets: string[];
  spacingHeading: string;
  spacingTitle: string;
  spacingTable: SimpleTable;
  radiusTitle: string;
  radiusTable: SimpleTable;
  /** "07 · Accessibility" no longer renders as its own top-level section —
   *  its content folds into this section's own "View all" popup instead
   *  (see CaseStudyBlocks.tsx, which finds this block by type and passes it
   *  here instead of rendering it itself). Optional so this component
   *  doesn't break if a future case study has a brand-identity block
   *  without it. */
  accessibility?: AccessibilityBlock;
}) {
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="flex h-full flex-1 flex-col">
      <SectionHeading heading={heading} subheading={subheading} />
      <div className="mt-title-to-content flex flex-1 flex-col justify-center gap-12">
        {/* Logo */}
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="font-display text-card-title font-bold text-text-primary">{logoHeading}</p>
            <p className="mt-1.5 text-body leading-relaxed text-text-secondary">{logoIntro}</p>
            <div className="mt-3">
              <BulletList items={logoBullets} />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-8">
            <div className="flex flex-col items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logoHorizontal.src} alt={logoHorizontal.alt} className="h-24 w-auto" />
            </div>
            <div className="flex flex-col items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logoVertical.src} alt={logoVertical.alt} className="h-32 w-auto" />
            </div>
          </div>
        </div>

        {/* Voice & tone */}
        <div>
          <p className="font-display text-card-title font-bold text-text-primary">{voiceHeading}</p>
          <div className="mt-3 grid gap-8 sm:grid-cols-2">
            <div>
              <p className="font-medium text-text-primary">{voiceTitle}</p>
              <div className="mt-2">
                <BulletList items={voiceBullets} />
              </div>
            </div>
            <div>
              <p className="font-medium text-text-primary">{toneTitle}</p>
              <div className="mt-2">
                <BulletList items={toneBullets} />
              </div>
            </div>
          </div>
        </div>

        {/* Color */}
        <div>
          <p className="font-display text-card-title font-bold text-text-primary">{colorHeading}</p>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            {colorSwatches.map((swatch) => (
              <SwatchCard key={swatch.name} swatch={swatch} />
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="inline-flex h-9 items-center justify-center self-start rounded-control border border-[var(--color-border-interactive)] bg-surface px-5 text-[14px] font-medium text-text-primary transition-[border-width,border-color,background-color] hover:border-2 hover:border-accent/30 hover:bg-surface-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        >
          {viewAllLabel}
        </button>
      </div>

      <Modal open={showAll} onClose={() => setShowAll(false)} title={heading}>
        <div className="flex flex-col gap-12">
          {/* Color usage & accessibility */}
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="font-medium text-text-primary">{colorUsageTitle}</p>
              <div className="mt-2">
                <BulletList items={colorUsageBullets} />
              </div>
            </div>
            <div>
              <p className="font-medium text-text-primary">{colorAccessibilityTitle}</p>
              <div className="mt-2">
                <BulletList items={colorAccessibilityBullets} />
              </div>
            </div>
          </div>

          {/* Typography */}
          <div>
            <p className="font-display text-card-title font-bold text-text-primary">{typographyHeading}</p>
            <div className="mt-3 grid gap-8 lg:grid-cols-[1fr_1.3fr]">
              <div>
                <p className="font-medium text-text-primary">{fontFamiliesTitle}</p>
                <div className="mt-2">
                  <BulletList items={fontFamilies} />
                </div>
              </div>
              <div>
                <p className="font-medium text-text-primary">{typeScaleTitle}</p>
                <div className="mt-2">
                  <DataTable table={typeScaleTable} dense />
                </div>
              </div>
            </div>
          </div>

          {/* Iconography */}
          <div>
            <p className="font-display text-card-title font-bold text-text-primary">{iconographyHeading}</p>
            <div className="mt-3 grid gap-8 lg:grid-cols-[1fr_1fr_auto]">
              <div>
                <p className="font-medium text-text-primary">{iconSpecsTitle}</p>
                <div className="mt-2">
                  <BulletList items={iconSpecs} />
                </div>
              </div>
              <div>
                <p className="font-medium text-text-primary">{iconUsageTitle}</p>
                <div className="mt-2">
                  <BulletList items={iconUsageBullets} />
                </div>
              </div>
              <div className="lg:w-64">
                <IconSet />
              </div>
            </div>
          </div>

          {/* Spacing & layout */}
          <div>
            <p className="font-display text-card-title font-bold text-text-primary">{spacingHeading}</p>
            <div className="mt-3 grid gap-8 lg:grid-cols-2">
              <div>
                <p className="font-medium text-text-primary">{spacingTitle}</p>
                <div className="mt-2">
                  <DataTable table={spacingTable} dense />
                </div>
              </div>
              <div>
                <p className="font-medium text-text-primary">{radiusTitle}</p>
                <div className="mt-2">
                  <DataTable table={radiusTable} dense />
                </div>
              </div>
            </div>
          </div>

          {/* Accessibility */}
          {accessibility && (
            <div className="flex flex-col gap-10">
              <div>
                <p className="font-display text-card-title font-bold text-text-primary">{accessibility.heading}</p>
                <p className="mt-1.5 text-body leading-relaxed text-text-secondary">{accessibility.intro}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {accessibility.areas.map((area) => (
                    <li
                      key={area}
                      className="rounded-full border border-border bg-surface px-3 py-2 text-label text-text-secondary"
                    >
                      {area}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-3">
                <p className="font-display text-card-title font-bold text-text-primary">
                  {accessibility.typographyColorHeading}
                </p>
                <p className="text-body text-text-secondary">{accessibility.typographyColorIntro}</p>
                <DataTable table={accessibility.contrastTable} dense />
              </div>

              <div className="flex flex-col gap-3">
                <p className="font-display text-card-title font-bold text-text-primary">{accessibility.touchHeading}</p>
                <p className="text-body text-text-secondary">{accessibility.touchIntro}</p>
                <DataTable table={accessibility.touchTable} dense />
              </div>

              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <p className="font-display text-card-title font-bold text-text-primary">{accessibility.formsHeading}</p>
                  <p className="mt-2 font-medium text-text-primary">{accessibility.formsLabelsTitle}</p>
                  <div className="mt-1.5">
                    <BulletList items={accessibility.formsLabelsBullets} />
                  </div>
                  <p className="mt-4 font-medium text-text-primary">{accessibility.formsStatesTitle}</p>
                  <div className="mt-1.5">
                    <BulletList items={accessibility.formsStatesBullets} />
                  </div>
                </div>
                <div>
                  <p className="font-display text-card-title font-bold text-text-primary">{accessibility.resultsHeading}</p>
                  <div className="mt-2">
                    <DataTable table={accessibility.complianceTable} dense />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
