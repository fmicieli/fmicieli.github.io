"use client";

import type { SimpleTable } from "@/data/projects";
import { SectionHeading } from "@/components/case-study/SectionHeading";
import { DataTable } from "@/components/case-study/DataTable";

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

export function AccessibilitySection({
  heading,
  subheading,
  intro,
  areas,
  typographyColorHeading,
  typographyColorIntro,
  contrastTable,
  touchHeading,
  touchIntro,
  touchTable,
  formsHeading,
  formsLabelsTitle,
  formsLabelsBullets,
  formsStatesTitle,
  formsStatesBullets,
  resultsHeading,
  complianceTable,
}: {
  heading: string;
  subheading: string;
  intro: string;
  areas: string[];
  typographyColorHeading: string;
  typographyColorIntro: string;
  contrastTable: SimpleTable;
  touchHeading: string;
  touchIntro: string;
  touchTable: SimpleTable;
  formsHeading: string;
  formsLabelsTitle: string;
  formsLabelsBullets: string[];
  formsStatesTitle: string;
  formsStatesBullets: string[];
  resultsHeading: string;
  complianceTable: SimpleTable;
}) {
  return (
    <div className="flex h-full flex-1 flex-col">
      <SectionHeading heading={heading} subheading={subheading} />
      <div className="mt-title-to-content flex flex-1 flex-col justify-center gap-10">
        <div>
          <p className="text-body leading-relaxed text-text-secondary">{intro}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {areas.map((area) => (
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
          <p className="font-display text-card-title font-bold text-text-primary">{typographyColorHeading}</p>
          <p className="text-body text-text-secondary">{typographyColorIntro}</p>
          <DataTable table={contrastTable} dense />
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-display text-card-title font-bold text-text-primary">{touchHeading}</p>
          <p className="text-body text-text-secondary">{touchIntro}</p>
          <DataTable table={touchTable} dense />
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <p className="font-display text-card-title font-bold text-text-primary">{formsHeading}</p>
            <p className="mt-2 font-medium text-text-primary">{formsLabelsTitle}</p>
            <div className="mt-1.5">
              <BulletList items={formsLabelsBullets} />
            </div>
            <p className="mt-4 font-medium text-text-primary">{formsStatesTitle}</p>
            <div className="mt-1.5">
              <BulletList items={formsStatesBullets} />
            </div>
          </div>
          <div>
            <p className="font-display text-card-title font-bold text-text-primary">{resultsHeading}</p>
            <div className="mt-2">
              <DataTable table={complianceTable} dense />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
