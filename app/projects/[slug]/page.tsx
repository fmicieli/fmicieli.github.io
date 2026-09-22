import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/data/projects";
import { Header } from "@/components/Header";
import { ScrollMain } from "@/components/case-study/ScrollMain";
import { CaseStudyPageContent } from "@/components/case-study/CaseStudyPageContent";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Florencia Micieli`,
    description: project.tagline,
    openGraph: {
      title: `${project.title} — Florencia Micieli`,
      description: project.tagline,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  // plainScroll projects (dense research material, not evenly-paced visual
  // beats — see Project.plainScroll) skip ScrollMain entirely: a plain
  // document-flow <main> scrolls exactly like the rest of the web, letting
  // each section take whatever height its own content needs instead of
  // being locked to one viewport.
  if (project.plainScroll) {
    return (
      <>
        <Header />
        <main className="pb-20">
          <CaseStudyPageContent slug={slug} />
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      {/* No pt-20 here: each section now handles its own header clearance
          (pt-[100px], see SectionHeading usages) — a shared top padding on
          the scroll container would double up with that, and worse, throws
          off `position: sticky` calculations for StepGuideSection's pinned
          panel (sticky offsets resolve against the scrollport's padding
          box, so it would add on top of the panel's own pt-[100px]). */}
      {/* No snap-y/snap-mandatory here anymore: ScrollMain now drives
          section-to-section movement itself (custom eased scrollTop
          animation on wheel), and native CSS snap running alongside it
          would fight that — worst case, snapping back to a tall section's
          own top mid-scroll instead of leaving its interior alone. */}
      <ScrollMain className="relative h-screen overflow-y-scroll pb-20">
        {/* All the actual content is localized and rendered client-side —
            see CaseStudyPageContent.tsx. This server component keeps only
            the English/build-time lookup above (notFound() + the
            generateMetadata() call below), since there's no per-locale
            routing to make either of those reactive to the language
            toggle. */}
        <CaseStudyPageContent slug={slug} />
      </ScrollMain>
    </>
  );
}
