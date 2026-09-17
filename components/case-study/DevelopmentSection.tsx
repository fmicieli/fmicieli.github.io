"use client";

import { motion } from "framer-motion";
import type { TerminalLine } from "@/data/projects";
import { SectionHeading } from "@/components/case-study/SectionHeading";

export function DevelopmentSection({
  heading,
  subheading,
  body,
  stack,
  terminalLines,
  prototypeLabel,
  prototypeHref,
  videoPendingLabel,
}: {
  heading: string;
  subheading: string;
  body: string;
  stack: string[];
  terminalLines: TerminalLine[];
  prototypeLabel: string;
  prototypeHref: string;
  videoPendingLabel: string;
}) {
  return (
    <div className="flex h-full flex-1 flex-col">
      <SectionHeading heading={heading} subheading={subheading} />
      <div className="mt-title-to-content flex flex-1 flex-col justify-center gap-8 lg:flex-row lg:items-center lg:gap-14">
        <div className="flex-1">
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

        <motion.div
          className="mx-auto flex h-[368px] w-[180px] shrink-0 items-center justify-center overflow-hidden rounded-[34px] border-8"
          style={{ borderColor: "#0D0D0F", background: "#0D0D0F" }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-col items-center gap-2.5 p-5 text-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] border-dashed border-[#9C9CA0] text-[#9C9CA0]">
              ▶
            </div>
            <span className="font-mono text-[14px] leading-relaxed text-[#9C9CA0]">{videoPendingLabel}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
