"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/case-study/SectionHeading";

function Quadrant({ label, items, i }: { label: string; items: string[]; i: number }) {
  return (
    <motion.div
      className="flex flex-col gap-2 rounded-card border border-border p-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, margin: "-40px" }}
      transition={{ duration: 0.4, delay: i * 0.06 }}
    >
      <p className="text-label font-semibold uppercase tracking-[0.08em] text-text-muted">{label}</p>
      <ul className="flex flex-col gap-1.5">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-[6px] bg-accent-soft px-2.5 py-2 text-body leading-relaxed text-text-primary"
          >
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function PainGainColumn({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="flex flex-1 flex-col gap-3">
      <p className="rounded-[6px] bg-white/10 py-2 text-center text-body font-semibold text-text-primary">{label}</p>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-card border border-border border-t-[var(--color-border-top-highlight)] bg-surface p-4 text-body leading-relaxed text-text-secondary shadow-card backdrop-blur-card"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Classic four-quadrant empathy map (Says/Thinks/Does/Feels around the
// persona) plus the Pain/Gain synthesis columns the source material derived
// from it — kept as one section since the Pain/Gain items are a direct
// distillation of specific quadrant entries, not an independent topic.
export function EmpathyMapSection({
  heading,
  subheading,
  photo,
  saysLabel,
  says,
  thinksLabel,
  thinks,
  doesLabel,
  does,
  feelsLabel,
  feels,
  painLabel,
  pain,
  gainLabel,
  gain,
}: {
  heading: string;
  subheading?: string;
  photo?: { src: string; alt: string };
  saysLabel: string;
  says: string[];
  thinksLabel: string;
  thinks: string[];
  doesLabel: string;
  does: string[];
  feelsLabel: string;
  feels: string[];
  painLabel: string;
  pain: string[];
  gainLabel: string;
  gain: string[];
}) {
  return (
    <div className="flex h-full flex-1 flex-col">
      <SectionHeading heading={heading} subheading={subheading} />
      <div className="mt-title-to-content flex flex-1 flex-col justify-center gap-6">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="relative grid grid-cols-2 gap-4 rounded-card border border-dashed border-border p-4">
            {photo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={photo.src}
                alt={photo.alt}
                className="pointer-events-none absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full object-cover shadow-lg"
              />
            )}
            <Quadrant label={saysLabel} items={says} i={0} />
            <Quadrant label={thinksLabel} items={thinks} i={1} />
            <Quadrant label={doesLabel} items={does} i={2} />
            <Quadrant label={feelsLabel} items={feels} i={3} />
          </div>
          <div className="flex gap-4">
            <PainGainColumn label={painLabel} items={pain} />
            <PainGainColumn label={gainLabel} items={gain} />
          </div>
        </div>
      </div>
    </div>
  );
}
