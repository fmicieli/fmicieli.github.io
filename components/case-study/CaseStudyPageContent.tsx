"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/lib/i18n/ui";
import { getLocalizedProjectBySlug } from "@/data/getProjects";
import { CaseStudySection } from "@/components/CaseStudySection";
import { CaseStudyBlocks } from "@/components/case-study/CaseStudyBlocks";
import { Reveal } from "@/components/Reveal";
import { Footer } from "@/components/Footer";
import { useScrollContainer } from "@/components/case-study/ScrollMain";

/**
 * Everything the project page used to render inline for a given slug, now
 * localized via `useLanguage()`/`getLocalizedProjectBySlug` instead of the
 * page's own build-time, English-only `getProjectBySlug` lookup (that one
 * stays put in the page for `notFound()`/`generateMetadata`, which are
 * necessarily English/build-time since there's no per-locale routing).
 */
export function CaseStudyPageContent({ slug }: { slug: string }) {
  const { language } = useLanguage();
  const t = useTranslation();
  const project = getLocalizedProjectBySlug(slug, language);
  const scrollContainer = useScrollContainer();

  // Belt-and-suspenders: if this component instance is ever reused across
  // a slug change (e.g. a future direct project-to-project link, or a
  // Next.js router-cache restore that skips a fresh mount) rather than
  // fully remounting, ScrollMain's `<main>` node would otherwise carry
  // over whatever `scrollTop` the previous project left it at — landing
  // the new project mid-page instead of at the top. Keyed on `slug` only,
  // so this never fires on an in-place re-render of the same project (e.g.
  // the language toggle), which should keep the user's scroll position.
  useEffect(() => {
    scrollContainer?.current?.scrollTo(0, 0);
  }, [slug, scrollContainer]);

  // Defensive only: the page itself already calls notFound() via the
  // English-only lookup before this component ever renders, so `project`
  // should always resolve here.
  if (!project) return null;

  const sections = Object.values(project.sections);

  return (
    <div className="px-page-x">
      {/* Fixed (not scrolling away with the rest of the page, and not
          inside `Reveal` — a fade-in on scroll-into-view doesn't apply to
          something that's meant to just always be there): sits just below
          the site header's own 52px, in the same px-page-x gutter as
          everything else. Its own bg-bg backdrop (same technique as
          Header's) keeps section content that pans past underneath it
          during a jump transition from visibly showing through/colliding
          with this text. */}
      <div className="fixed inset-x-0 top-[52px] z-40">
        <div aria-hidden="true" className="absolute inset-0 bg-bg" />
        <Link
          href="/#projects"
          className="relative inline-block rounded-[2px] pb-3 pl-page-x pt-3 text-sm text-text-secondary hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        >
          {t.projectPage.backToProjects}
        </Link>
      </div>

      {/* once={false}, matching every other Reveal in the case-study tree
          (see CaseStudySection/CaseStudyBlocks): this is the same
          component instance/DOM position across a slug change if ever
          reused rather than remounted (see the scroll-reset effect above),
          so `once={true}`'s internal "already fired" state could carry
          over and skip the reveal — or, on a fresh mount, simply never
          have a chance to fire if the container's initial layout isn't
          settled yet when the IntersectionObserver first checks. Replaying
          on every viewport entry avoids depending on that first-mount
          timing being exact. */}
      <Reveal once={false} className="pt-section-top">
        {!project.caseStudyBlocks && (
          <div className={project.heroImage ? "grid items-center gap-10 sm:grid-cols-2" : undefined}>
            <div>
              <h1 className="mt-6 font-display text-3xl font-semibold sm:text-4xl">
                {project.title}
              </h1>
              <p className="mt-3 max-w-xl leading-relaxed text-text-secondary">{project.tagline}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-border px-3 py-1 text-sm text-text-secondary"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
            {project.heroImage && (
              // Flat screenshot given a phone frame purely via a large
              // border-radius, same technique as CaseStudyHero's default
              // `mockupRadius` — no bezel asset needed.
              <div className="mx-auto w-full max-w-[300px] overflow-hidden rounded-[3.25rem] border border-border shadow-xl shadow-black/30">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={project.heroImage.src} alt={project.heroImage.alt} className="h-auto w-full" />
              </div>
            )}
          </div>
        )}

        {!project.contentReady && (
          <p className="mt-4 rounded-lg border border-[var(--color-border-accent)] bg-accent-soft px-4 py-3 text-body text-text-secondary">
            {t.projectPage.contentPending}{" "}
            <a
              href={project.behanceUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-[2px] underline underline-offset-4 hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              {t.projectPage.viewOnBehance}
            </a>
            .
          </p>
        )}
      </Reveal>

      {project.caseStudyBlocks ? (
        // Block-based case studies embed Footer inside their own last
        // section (NextStepsSection, after the disclaimer) instead of
        // rendering it here — see NextStepsSection.tsx.
        <div className="mt-8">
          <CaseStudyBlocks blocks={project.caseStudyBlocks} />
        </div>
      ) : (
        <>
          <div className="mt-4 divide-y divide-white/10">
            {sections.map((section) => (
              <CaseStudySection key={section.heading} section={section} />
            ))}
          </div>
          {/* No next-steps block to embed Footer in for this (placeholder
              content) path, so it stays page-level, same as before — just
              nested inside this px-page-x wrapper now instead of living
              outside it, since Footer no longer carries its own horizontal
              padding (see Footer.tsx). */}
          <Footer />
        </>
      )}
    </div>
  );
}
