import Link from "next/link";
import type { Project } from "@/data/projects";
import { HoverBorderTrace } from "@/components/HoverBorderTrace";
import { useTranslation } from "@/lib/i18n/ui";

export function ProjectCard({ project }: { project: Project }) {
  const t = useTranslation();
  const disabled = project.disabled ?? false;

  const sharedClassName =
    "group relative flex w-full flex-col overflow-hidden rounded-card border border-border border-t-[var(--color-border-top-highlight)] bg-surface shadow-card backdrop-blur-card sm:h-[190px] sm:flex-row";

  const content = (
    <>
      {/* Row layout (sm+) sizes the image off the card's own h-[190px] row
          height, which leaves plenty of room next to it for the text
          column. Stacked on mobile instead (image on top, full card
          width, height driven by its own aspect ratio) — the row layout
          at a ~343px mobile card width left only ~90-140px for the title/
          tagline/tags column, not enough to stay legible. */}
      <div className="relative aspect-[1.157625] w-full shrink-0 overflow-hidden bg-white/5 sm:h-full sm:w-auto">
        {project.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.coverImage}
            alt={project.coverAlt}
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center text-center text-sm text-text-secondary"
            role="img"
            aria-label={`${project.coverAlt} — image pending replacement`}
          >
            {t.caseStudy.imagePending}
          </div>
        )}
      </div>
      <div className="flex w-full flex-1 flex-col overflow-hidden px-6 pt-[18px] pb-6 sm:h-full">
        <h3 className="line-clamp-1 font-display text-card-title font-bold text-text-primary">{project.title}</h3>
        <p className="mt-2 line-clamp-3 text-body leading-relaxed text-text-secondary">
          {project.tagline}
        </p>
        <ul className="mt-auto flex flex-wrap gap-2 pt-4">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-white bg-white/20 px-2.5 py-2 text-label font-medium text-white"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </>
  );

  if (disabled) {
    // No case study written up on-site yet (see Project.disabled) — shown
    // in the grid as "coming soon" rather than a dead/broken link: greyed
    // out, no hover lift, and not a real Link (nothing to navigate to).
    return (
      <div
        className={`${sharedClassName} cursor-default opacity-45 grayscale`}
        aria-disabled="true"
      >
        {content}
        <span className="pointer-events-none absolute right-4 top-4 rounded-full border border-white/30 bg-black/40 px-2.5 py-1 text-label font-medium text-white">
          {t.projectsGrid.comingSoon}
        </span>
      </div>
    );
  }

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`${sharedClassName} transition-transform hover:-translate-y-1 hover:scale-[1.01] focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2`}
    >
      {content}
      {/* Rendered last (not first) so it paints on top of the image and
          text columns — as the first child it used to sit underneath the
          image's own box in paint order, making the traced line invisible
          along the image side of the card. */}
      <HoverBorderTrace />
    </Link>
  );
}
