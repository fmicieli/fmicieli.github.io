"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/lib/i18n/ui";
import { getProjects } from "@/data/getProjects";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";

export function ProjectsGrid() {
  const { language } = useLanguage();
  const t = useTranslation();
  const projects = getProjects(language).filter((project) => !project.hidden);

  return (
    <section id="projects" className="relative flex min-h-screen flex-col px-page-x pt-section-top pb-12">
      <Reveal>
        <h2 className="font-display text-display font-bold text-text-primary">{t.projectsGrid.heading}</h2>
      </Reveal>
      <div className="mt-title-to-content flex flex-1 flex-col justify-center">
        {/* ProjectCard itself switches from a stacked (image on top) to a
            side-by-side row layout at `sm` (640px) — fine as long as the
            card has a full container's worth of width to do that in. Once
            this grid also splits into two columns at the same breakpoint,
            each card is squeezed to ~half the container, and the row
            layout's text column collapses to a sliver (~30px at a 768px
            tablet width) well before there's room for it. Splitting the
            grid later, at `lg` (1024px), keeps cards full-width (and the
            row layout comfortable) through the whole tablet range. */}
        <div className="grid gap-8 lg:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.05}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
