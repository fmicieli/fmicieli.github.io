"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage, type Language } from "@/contexts/LanguageContext";
import { useTranslation } from "@/lib/i18n/ui";

// Two small text buttons rather than a bootstrap-y select/pill toggle, to
// match the site's restrained aesthetic — active language reads in the
// accent color, inactive stays muted like the rest of the nav. Each button
// keeps an explicit 44px tap target (matching the hamburger's own h-11
// convention) even though the visible label is small. Text is 14px * 1.25
// on mobile (17.5px, where this is the only header text a visitor sees —
// desktop's row keeps the original 14px via sm:text-sm).
function LanguageSwitcher({
  language,
  setLanguage,
  labels,
  className,
}: {
  language: Language;
  setLanguage: (lang: Language) => void;
  labels: { en: string; es: string; label: string };
  className?: string;
}) {
  return (
    <div role="group" aria-label={labels.label} className={`flex items-center ${className ?? ""}`}>
      <button
        type="button"
        onClick={() => setLanguage("en")}
        aria-pressed={language === "en"}
        className={`flex h-11 min-w-11 items-center justify-center rounded-[2px] text-[17.5px] px-1.5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 sm:text-sm ${
          language === "en" ? "font-medium text-accent" : "text-text-secondary hover:text-text-primary"
        }`}
      >
        {labels.en}
      </button>
      <span className="text-border" aria-hidden="true">
        /
      </span>
      <button
        type="button"
        onClick={() => setLanguage("es")}
        aria-pressed={language === "es"}
        className={`flex h-11 min-w-11 items-center justify-center rounded-[2px] text-[17.5px] px-1.5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 sm:text-sm ${
          language === "es" ? "font-medium text-accent" : "text-text-secondary hover:text-text-primary"
        }`}
      >
        {labels.es}
      </button>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const t = useTranslation();

  const NAV_LINKS = [
    { href: "/#about", label: t.header.nav.about },
    { href: "/#projects", label: t.header.nav.projects },
    { href: "/#contact", label: t.header.nav.contact },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Same --gradient-ambient as body (see globals.css), not a flat
          bg-bg — a plain solid color here read as a hard opaque strip
          against the page's own soft ambient glow, most visible right at
          the landing hero where that glow is brightest. Both use
          background-attachment: fixed, which ties a background to the
          viewport rather than the element's own (much shorter) box, so
          this lines up with body's underneath it instead of just being a
          second, independently-positioned copy of the same gradient.
          opacity: 0.85 (not fully opaque) so page content is still very
          faintly readable through it while scrolling underneath — same
          value at every state (open/closed menu, any scroll position),
          there's no separate state-specific opacity to keep in sync. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: "var(--gradient-ambient)", backgroundAttachment: "fixed", opacity: 0.85 }}
      />
      {/* Shorter on mobile, but with a clean, symmetric 8px top+bottom
          around the row (py-2 here; the row itself carries no vertical
          padding of its own on mobile any more) — sm: restores the
          original desktop measurements exactly (pt-2 outer + py-1.5 on the
          row, no bottom padding on the outer wrapper). */}
      <div className="relative px-page-x pb-2 pt-2 sm:pb-0 sm:pt-2">
        <div className="relative flex min-h-11 items-center justify-center sm:py-1.5">
          {/* Site mark, left — links home from anywhere, including a
              project page, making a separate "back to projects" control
              unnecessary (removed; see git history for the fixed strip
              this replaced). */}
          <Link
            href="/"
            aria-label={t.header.homeLink}
            className="absolute left-0 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center overflow-hidden rounded-[6px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/favicon.svg" alt="" className="h-full w-full" />
          </Link>
          <nav className="hidden items-center gap-4 sm:flex" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-[2px] text-sm text-text-secondary transition-colors hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
              >
                {link.label}
              </a>
            ))}
          </nav>
          {/* Absolutely positioned like the mobile hamburger below, so it
              doesn't unbalance the centered nav links — only shown on sm+
              since the hamburger (which would otherwise collide with it)
              takes over below that breakpoint, where the switcher instead
              lives inside the dropdown menu. */}
          <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 sm:block">
            <LanguageSwitcher language={language} setLanguage={setLanguage} labels={t.header.languageSwitcher} />
          </div>
        </div>
      </div>

      {/* Hamburger, mobile only — sits outside the 15vw content margin on
          purpose (a tap target like this should hug the real screen edge,
          not get pushed in by the same margin that centers the desktop
          nav). Back to a 44px tap target (was briefly 36px). */}
      <div className="absolute right-2 top-1/2 -translate-y-1/2 sm:hidden">
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-lg text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          aria-label={open ? t.header.closeMenu : t.header.openMenu}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            {open ? (
              <path
                d="M4 4L16 16M16 4L4 16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M3 6H17M3 10H17M3 14H17"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <>
          <button
            type="button"
            aria-label={t.header.closeMenu}
            tabIndex={-1}
            className="fixed inset-0 -z-10 bg-bg/70 sm:hidden"
            onClick={() => setOpen(false)}
          />
          <nav
            className="relative mx-page-x mt-1 flex flex-col gap-1 rounded-xl border border-border bg-[rgba(21,10,19,0.97)] p-1 shadow-xl backdrop-blur-md sm:hidden"
            aria-label="Mobile navigation"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-3 text-[17.5px] text-text-secondary transition-colors hover:bg-white/5 hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="mt-1 flex items-center justify-center border-t border-border pt-2">
              <LanguageSwitcher language={language} setLanguage={setLanguage} labels={t.header.languageSwitcher} />
            </div>
          </nav>
        </>
      )}
    </header>
  );
}
