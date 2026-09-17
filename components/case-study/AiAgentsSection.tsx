"use client";

import { SectionHeading } from "@/components/case-study/SectionHeading";

// Same dot-bullet list Tribu Music's ContextSection uses for the persona's
// goals/motivations/frustrations — the established "plain list" idiom.
function ItemList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-body leading-relaxed text-text-secondary">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function AiAgentsSection({
  heading,
  subheading,
  aiLabel,
  aiItems,
  humanLabel,
  humanItems,
  note,
}: {
  heading: string;
  subheading: string;
  aiLabel: string;
  aiItems: string[];
  humanLabel: string;
  humanItems: string[];
  note: string;
}) {
  return (
    <div className="flex h-full flex-1 flex-col">
      <SectionHeading heading={heading} subheading={subheading} />
      <div className="mt-title-to-content flex flex-1 flex-col justify-center gap-6">
        <div className="grid overflow-hidden rounded-card border border-border border-t-[var(--color-border-top-highlight)] bg-surface shadow-card backdrop-blur-card sm:grid-cols-2">
          <div className="border-b border-border p-6 sm:border-b-0 sm:border-r">
            <p className="mb-4 font-mono text-sm font-medium text-accent">{aiLabel}</p>
            <ItemList items={aiItems} />
          </div>
          <div className="p-6">
            <p className="mb-4 font-mono text-sm font-medium text-text-primary">{humanLabel}</p>
            <ItemList items={humanItems} />
          </div>
        </div>
        <p className="max-w-[64ch] text-body leading-relaxed text-text-secondary">{note}</p>
      </div>
    </div>
  );
}
