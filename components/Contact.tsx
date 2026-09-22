"use client";

import { Reveal } from "@/components/Reveal";
import { Footer, SOCIAL_LINKS } from "@/components/Footer";
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
          <p className="leading-relaxed text-text-secondary">{t.contact.prompt}</p>
        </Reveal>
        {/* Email + LinkedIn as the two highlighted ways to reach out — same
            links as Footer's small utility icons (reused from there, not
            redefined), just given real visual weight here since this is
            the section whose whole point is "get in touch". */}
        <Reveal delay={0.1}>
          <ul className="mt-5 flex flex-col gap-3 sm:flex-row">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="flex items-center gap-2.5 rounded-control border border-accent/40 bg-accent-soft px-5 py-3 text-body font-medium text-text-primary transition-colors hover:border-accent hover:bg-accent/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
                >
                  <span className="text-accent">{link.icon}</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
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
