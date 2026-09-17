"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { TerminalLine } from "@/data/projects";
import { SectionHeading } from "@/components/case-study/SectionHeading";
import { IPhoneMockup } from "@/components/case-study/IPhoneMockup";

export function DevelopmentSection({
  heading,
  subheading,
  body,
  stack,
  terminalLines,
  prototypeLabel,
  prototypeHref,
  videoPendingLabel,
  videoSrc,
}: {
  heading: string;
  subheading: string;
  body: string;
  stack: string[];
  terminalLines: TerminalLine[];
  prototypeLabel: string;
  prototypeHref: string;
  videoPendingLabel: string;
  videoSrc?: string;
}) {
  // Every block on this page mounts unconditionally up front (see
  // CaseStudyBlocks), so a plain <video autoPlay> here would start
  // downloading the full file the instant the page loads — this section is
  // #8 of 10, competing for bandwidth with everything actually above the
  // fold. Deferring the <video> tag itself (not just its `src`) until the
  // section scrolls near view means the browser never fetches it before
  // then. "Seen once, keep mounted" (rather than mounting/unmounting on
  // every viewport re-entry) avoids restarting playback each time a
  // visitor scrolls past and back.
  const mockupRef = useRef<HTMLDivElement>(null);
  const mockupInView = useInView(mockupRef, { once: true, margin: "200px" });

  return (
    <div className="flex h-full flex-1 flex-col">
      <SectionHeading heading={heading} subheading={subheading} />
      <div className="mt-title-to-content flex flex-1 flex-col justify-center gap-8 lg:flex-row lg:items-center lg:gap-14">
        {/* max-w caps this at 75% of its old, uncapped flex-1 width (was
            filling all remaining space next to the 180px mockup; now stops
            growing past ~723px, the equivalent width at a typical content
            row once the mockup grew to 270px) — still fluid/shrinks below
            that on narrower screens. */}
        <div className="flex-1 lg:max-w-[723px]">
          <ul className="flex flex-wrap gap-2">
            {stack.map((item) => (
              <li key={item} className="rounded-lg border border-border bg-surface px-3 py-1.5 font-mono text-sm text-text-primary">
                {item}
              </li>
            ))}
          </ul>

          <p className="mt-5 max-w-[56ch] text-body leading-relaxed text-text-secondary">{body}</p>

          <div className="mt-6 rounded-card border border-border bg-black p-6 font-mono text-[14px] leading-loose text-[#d9e8d9]">
            {terminalLines.map((line, i) => (
              <div key={i}>
                {line.kind === "prompt" ? (
                  <>
                    <span className="text-accent">$</span> {line.text}
                  </>
                ) : (
                  <span className="text-text-secondary">{line.text}</span>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between rounded-card border border-border border-t-[var(--color-border-top-highlight)] bg-surface px-5 py-4 shadow-card backdrop-blur-card">
            <span className="flex items-center gap-2 text-sm font-medium text-text-primary">
              <span className="inline-block h-2 w-2 rounded-full bg-accent" />
              {prototypeLabel}
            </span>
            <a
              href={prototypeHref}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-sm text-accent underline underline-offset-4 hover:text-text-primary"
            >
              {prototypeHref.replace(/^https?:\/\//, "")}
            </a>
          </div>
        </div>

        {/* 180px * 1.5 * 1.25 = 337.5px target size — w-full + max-w (not a
            bare fixed width) so it shrinks on viewports narrower than
            ~370px instead of overflowing main's own horizontal scroll
            area (337.5px doesn't fit a 320px phone's content width once
            the page-x gutters are subtracted). */}
        <motion.div
          ref={mockupRef}
          className="mx-auto w-full max-w-[337.5px] shrink-0"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {videoSrc ? (
            <IPhoneMockup maxWidthPx={337.5}>
              {mockupInView && (
                <video src={videoSrc} autoPlay loop muted playsInline className="h-full w-full object-cover" />
              )}
            </IPhoneMockup>
          ) : (
            <div
              // 368px * 1.5 * 1.25, 180px * 1.5 * 1.25 — aspect-ratio (not a
              // fixed height) so it stays proportional as width shrinks.
              className="flex w-full items-center justify-center overflow-hidden rounded-[34px] border-8"
              style={{ borderColor: "#0D0D0F", background: "#0D0D0F", aspectRatio: "337.5 / 690" }}
            >
              <div className="flex flex-col items-center gap-2.5 p-5 text-center">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] border-dashed border-[#9C9CA0] text-[#9C9CA0]">
                  ▶
                </div>
                <span className="font-mono text-[14px] leading-relaxed text-[#9C9CA0]">{videoPendingLabel}</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
