import type { CaseStudySection as CaseStudySectionData } from "@/data/projects";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/case-study/SectionHeading";

/** Body strings may contain `\n\n` paragraph breaks and `**bold**` spans. */
function renderBody(body: string) {
  return body.split("\n\n").map((paragraph, i) => (
    <p key={i} className="text-body leading-relaxed text-text-secondary">
      {paragraph.split(/(\*\*[^*]+\*\*)/g).map((chunk, j) =>
        chunk.startsWith("**") && chunk.endsWith("**") ? (
          <strong key={j} className="font-semibold text-text-primary">
            {chunk.slice(2, -2)}
          </strong>
        ) : (
          chunk
        ),
      )}
    </p>
  ));
}

export function CaseStudySection({ section }: { section: CaseStudySectionData }) {
  return (
    <Reveal once={false} className="flex min-h-screen flex-col pt-section-top pb-12 snap-start">
      <SectionHeading heading={section.heading} />
      <div className="mt-title-to-content flex flex-1 flex-col justify-center">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div className="max-w-[46ch] space-y-4">{renderBody(section.body)}</div>
          {section.images && section.images.length > 0 && (
            <ul className="flex justify-center gap-4">
              {section.images.map((image) => (
                // 32 * 1.3, 40 * 1.3
                <li key={image.src} className="w-[166px] sm:w-[208px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full rounded-xl border border-border shadow-lg shadow-black/30"
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Reveal>
  );
}
