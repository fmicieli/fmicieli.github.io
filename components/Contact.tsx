"use client";

import { Reveal } from "@/components/Reveal";
import { Footer } from "@/components/Footer";
import { useTranslation } from "@/lib/i18n/ui";

export function Contact() {
  const t = useTranslation();
  return (
    <section id="contact" className="relative flex min-h-screen flex-col px-page-x pt-section-top pb-12">
      <Reveal>
        <h2 className="text-2xl font-semibold">{t.contact.heading}</h2>
      </Reveal>
      <div className="mt-title-to-content flex flex-1 flex-col justify-center">
        <Reveal delay={0.05}>
          <p className="leading-relaxed text-text-secondary">
            {t.contact.prompt}{" "}
            <a
              href="mailto:fmicieli94@gmail.com"
              className="rounded-[2px] text-accent underline underline-offset-4 hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              fmicieli94@gmail.com
            </a>
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-2 text-body text-text-secondary">
            {t.contact.behanceLine}
            {" "}
            <span className="text-text-secondary">{t.contact.behanceTodo}</span>
          </p>
        </Reveal>
      </div>
      {/* Footer lives inside Contact's own section now (bottom of this
          section's flex column, via mt-auto) rather than as a trailing
          element after <main> — every section on this page is meant to be
          exactly one viewport, driven by HomeScrollSnap, so the footer
          needs to already be on screen once the user reaches this section
          instead of requiring extra scroll past it. */}
      <div className="mt-auto">
        <Footer />
      </div>
    </section>
  );
}
