"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { CaseStudyImage, LabeledImage } from "@/data/projects";
import { SectionHeading } from "@/components/case-study/SectionHeading";

function ImageRow({
  images,
  compact = false,
  uniform = false,
}: {
  images: LabeledImage[];
  /** Happy Path / Digitization / Mid-Fi rows: forced onto a single line (no
   *  wrap, horizontal scroll if it doesn't fit) so any of the 4 steps' full
   *  6-screen set reliably fits inside the shared one-viewport content area,
   *  regardless of which step is active. */
  compact?: boolean;
  /** Happy Path / Digitization / Mid-Fi rows: every screen forced to the
   *  exact same box (fixed height + width, object-contain) regardless of
   *  each source image's own resolution/aspect ratio, so all three steps
   *  share one consistent mockup size instead of each depending on its own
   *  source images happening to share an aspect ratio. */
  uniform?: boolean;
}) {
  return (
    <ul
      className={
        compact
          ? "flex flex-nowrap gap-4 overflow-x-auto pb-1"
          : "flex flex-wrap justify-center gap-4 sm:justify-between"
      }
    >
      {images.map((image, i) => (
        <motion.li
          key={image.label}
          className={compact ? "flex w-[225px] shrink-0 flex-col items-center gap-2" : "flex w-[120px] flex-col items-center gap-2 sm:w-auto"}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-40px" }}
          transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image.src}
            alt={image.alt}
            loading="lazy"
            className={
              uniform
                ? "h-[486px] w-[225px] shrink-0 rounded-lg object-contain shadow-lg shadow-black/30"
                : "w-full rounded-lg shadow-lg shadow-black/30"
            }
          />
          <p className="text-center text-label font-medium text-text-secondary">{image.label}</p>
        </motion.li>
      ))}
    </ul>
  );
}

function SubHeading({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <p className="font-display text-card-title font-bold text-text-primary">{title}</p>
      <p className="mt-1.5 text-body leading-relaxed text-text-secondary">{text}</p>
    </div>
  );
}

function StepCircle({
  number,
  active,
  label,
  onClick,
}: {
  number: number;
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "step" : undefined}
      aria-label={label}
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 bg-transparent font-display text-base font-bold transition-colors duration-300 sm:h-14 sm:w-14 sm:text-xl ${
        active ? "border-accent text-accent" : "border-white/20 text-text-secondary hover:border-white/40"
      }`}
    >
      {number}
    </button>
  );
}

function StepConnector({ filled }: { filled: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`h-0.5 w-8 shrink-0 rounded-full transition-colors duration-500 sm:w-20 ${
        filled ? "bg-accent" : "bg-white/15"
      }`}
    />
  );
}

export function DesignProcessSection({
  heading,
  subheading,
  happyPathHeading,
  happyPathText,
  happyPathImages,
  digitizationHeading,
  digitizationText,
  digitizationImages,
  gridHeading,
  gridText,
  gridSpecs,
  gridDemoImage,
  midFiHeading,
  midFiText,
  midFiImages,
}: {
  heading: string;
  subheading: string;
  happyPathHeading: string;
  happyPathText: string;
  happyPathImages: LabeledImage[];
  digitizationHeading: string;
  digitizationText: string;
  digitizationImages: LabeledImage[];
  gridHeading: string;
  gridText: string;
  gridSpecs: { label: string; value: string }[];
  gridDemoImage: CaseStudyImage;
  midFiHeading: string;
  midFiText: string;
  midFiImages: LabeledImage[];
}) {
  const steps = [
    { heading: happyPathHeading },
    { heading: digitizationHeading },
    { heading: gridHeading },
    { heading: midFiHeading },
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex h-full flex-1 flex-col">
      <SectionHeading heading={heading} subheading={subheading} />
      <div className="mt-title-to-content flex flex-1 flex-col gap-10">
        <div className="flex items-center justify-center">
          {steps.map((step, i) => (
            <div key={step.heading} className="flex items-center">
              {i > 0 && <StepConnector filled={activeIndex >= i} />}
              <StepCircle
                number={i + 1}
                active={activeIndex === i}
                label={step.heading}
                onClick={() => setActiveIndex(i)}
              />
            </div>
          ))}
        </div>

        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-6"
        >
          {activeIndex === 0 && (
            <>
              <SubHeading title={happyPathHeading} text={happyPathText} />
              <ImageRow images={happyPathImages} compact uniform />
            </>
          )}
          {activeIndex === 1 && (
            <>
              <SubHeading title={digitizationHeading} text={digitizationText} />
              <ImageRow images={digitizationImages} compact uniform />
            </>
          )}
          {activeIndex === 2 && (
            <>
              <SubHeading title={gridHeading} text={gridText} />
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
                <ul className="flex flex-col gap-2.5">
                  {gridSpecs.map((spec) => (
                    <li key={spec.label} className="text-body leading-relaxed text-text-secondary">
                      <span className="font-semibold text-text-primary underline underline-offset-2">
                        {spec.label}:
                      </span>{" "}
                      {spec.value}
                    </li>
                  ))}
                </ul>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={gridDemoImage.src}
                  alt={gridDemoImage.alt}
                  loading="lazy"
                  className="w-full max-w-[48.3rem] rounded-lg border border-border shadow-lg shadow-black/30 lg:max-w-[41.4rem]"
                />
              </div>
            </>
          )}
          {activeIndex === 3 && (
            <>
              <SubHeading title={midFiHeading} text={midFiText} />
              <ImageRow images={midFiImages} compact uniform />
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
