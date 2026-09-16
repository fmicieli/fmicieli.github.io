import type { CaseStudyBlock } from "@/data/projects";
import { Reveal } from "@/components/Reveal";
import { CaseStudyHero } from "@/components/case-study/CaseStudyHero";
import { ProblemSection } from "@/components/case-study/ProblemSection";
import { BenchmarkingSection } from "@/components/case-study/BenchmarkingSection";
import { SolutionSection } from "@/components/case-study/SolutionSection";
import { FlowComparisonSection } from "@/components/case-study/FlowComparisonSection";
import { StepGuideSection } from "@/components/case-study/StepGuideSection";
import { ImpactSection } from "@/components/case-study/ImpactSection";
import { NextStepsSection } from "@/components/case-study/NextStepsSection";
import { ContextSection } from "@/components/case-study/ContextSection";
import { DesignProcessSection } from "@/components/case-study/DesignProcessSection";
import { UsabilityTestSection } from "@/components/case-study/UsabilityTestSection";
import { BrandIdentitySection } from "@/components/case-study/BrandIdentitySection";
import { UiKitSection } from "@/components/case-study/UiKitSection";
import { PrototypeSection } from "@/components/case-study/PrototypeSection";
import { ClosingSection } from "@/components/case-study/ClosingSection";
import { StrideProblemSection } from "@/components/case-study/StrideProblemSection";
import { ResearchSection } from "@/components/case-study/ResearchSection";
import { BenchmarkingDimensionsSection } from "@/components/case-study/BenchmarkingDimensionsSection";
import { ArchitectureSitemapSection } from "@/components/case-study/ArchitectureSitemapSection";
import { WireframeFilmstripSection } from "@/components/case-study/WireframeFilmstripSection";
import { DesignSystemSection } from "@/components/case-study/DesignSystemSection";
import { DevelopmentSection } from "@/components/case-study/DevelopmentSection";
import { AiAgentsSection } from "@/components/case-study/AiAgentsSection";

export function CaseStudyBlocks({ blocks }: { blocks: CaseStudyBlock[] }) {
  // "Accessibility" no longer renders as its own top-level section — Brand
  // Identity's "View all" popup absorbed it (see BrandIdentitySection.tsx),
  // so it's looked up here by type and handed to it instead of being
  // rendered from the map below. "UI Kit & Components" renders standalone
  // again as its own section.
  const accessibilityBlock = blocks.find((b) => b.type === "accessibility");

  return (
    <div className="flex flex-col divide-y divide-white/10">
      {blocks.map((block, i) => {
        if (block.type === "accessibility") {
          return null;
        }

        if (block.type === "hero") {
          return (
            <div key={i} className="flex h-screen max-h-screen flex-col justify-center pb-10 snap-start">
              <CaseStudyHero
                title={block.title}
                subtitle={block.subtitle}
                meta={block.meta}
                tags={block.tags}
                images={block.images}
                video={block.video}
                watermark={block.watermark}
                mockupRadius={block.mockupRadius}
                deviceFrame={block.deviceFrame}
              />
            </div>
          );
        }

        // Tall scroll-linked stepper, not a plain centered min-h-screen
        // block: it manages its own height (one viewport per step) and
        // sticky inner panel, so it renders outside the generic wrapper.
        if (block.type === "step-guide") {
          return (
            <div key={i} className="snap-start">
              <StepGuideSection heading={block.heading} subheading={block.subheading} steps={block.steps} />
            </div>
          );
        }

        // The last block of the page — still a full min-h-screen section
        // like every other block (for a consistent one-viewport-per-section
        // snap rhythm), but its content is top-aligned rather than
        // vertically centered, with Footer pushed to the very bottom of
        // that viewport via its own mt-auto (see NextStepsSection).
        if (block.type === "next-steps") {
          return (
            <Reveal key={i} once={false} className="flex min-h-screen flex-col pt-section-top pb-12 snap-start">
              <NextStepsSection
                heading={block.heading}
                subheading={block.subheading}
                phases={block.phases}
                disclaimer={block.disclaimer}
              />
            </Reveal>
          );
        }

        // Tribu Music's closing block — same footer-embedded, full-viewport
        // pattern as "next-steps" above (see ClosingSection's own comment).
        if (block.type === "closing") {
          return (
            <Reveal key={i} once={false} className="flex min-h-screen flex-col pt-section-top pb-12 snap-start">
              <ClosingSection heading={block.heading} subheading={block.subheading} images={block.images} />
            </Reveal>
          );
        }

        return (
          <Reveal
            key={i}
            once={false}
            className="flex min-h-screen flex-col pt-section-top pb-12 snap-start"
          >
            {block.type === "problem" && (
              <ProblemSection
                heading={block.heading}
                subheading={block.subheading}
                quotes={block.quotes}
                stats={block.stats}
                note={block.note}
              />
            )}
            {block.type === "benchmarking" && (
              <BenchmarkingSection
                heading={block.heading}
                subheading={block.subheading}
                note={block.note}
                rows={block.rows}
              />
            )}
            {block.type === "solution" && (
              <SolutionSection
                heading={block.heading}
                subheading={block.subheading}
                points={block.points}
                annotations={block.annotations}
                image={block.image}
                phoneDemo={block.phoneDemo}
              />
            )}
            {block.type === "flow-comparison" && (
              <FlowComparisonSection
                heading={block.heading}
                subheading={block.subheading}
                before={block.before}
                after={block.after}
                afterLabel={block.afterLabel}
                reductionLabel={block.reductionLabel}
                highlights={block.highlights}
              />
            )}
            {block.type === "impact" && (
              <ImpactSection heading={block.heading} cards={block.cards} />
            )}
            {block.type === "design-process" && (
              <DesignProcessSection
                heading={block.heading}
                subheading={block.subheading}
                happyPathHeading={block.happyPathHeading}
                happyPathText={block.happyPathText}
                happyPathImages={block.happyPathImages}
                digitizationHeading={block.digitizationHeading}
                digitizationText={block.digitizationText}
                digitizationImages={block.digitizationImages}
                gridHeading={block.gridHeading}
                gridText={block.gridText}
                gridSpecs={block.gridSpecs}
                gridDemoImage={block.gridDemoImage}
                midFiHeading={block.midFiHeading}
                midFiText={block.midFiText}
                midFiImages={block.midFiImages}
              />
            )}
            {block.type === "context" && (
              <ContextSection
                heading={block.heading}
                subheading={block.subheading}
                intro={block.intro}
                insightsHeading={block.insightsHeading}
                insights={block.insights}
                researchHeading={block.researchHeading}
                researchText={block.researchText}
                benchmarkingHeading={block.benchmarkingHeading}
                benchmarkingColumns={block.benchmarkingColumns}
                benchmarkingRows={block.benchmarkingRows}
                benchmarkingCtaLabel={block.benchmarkingCtaLabel}
                persona={block.persona}
                personaCtaLabel={block.personaCtaLabel}
              />
            )}
            {block.type === "usability-test" && (
              <UsabilityTestSection
                heading={block.heading}
                subheading={block.subheading}
                tasks={block.tasks}
                resultsHeading={block.resultsHeading}
                resultsTable={block.resultsTable}
                viewAllLabel={block.viewAllLabel}
                findingsHeading={block.findingsHeading}
                findings={block.findings}
                analysisHeading={block.analysisHeading}
                analysis={block.analysis}
                surveyHeading={block.surveyHeading}
                surveyCharts={block.surveyCharts}
                improvementsHeading={block.improvementsHeading}
                improvementsIntro={block.improvementsIntro}
                improvements={block.improvements}
                beforeAfterHeading={block.beforeAfterHeading}
                beforeAfterPairs={block.beforeAfterPairs}
              />
            )}
            {block.type === "brand-identity" && (
              <BrandIdentitySection
                heading={block.heading}
                subheading={block.subheading}
                logoHeading={block.logoHeading}
                logoIntro={block.logoIntro}
                logoBullets={block.logoBullets}
                logoHorizontal={block.logoHorizontal}
                logoVertical={block.logoVertical}
                voiceHeading={block.voiceHeading}
                voiceTitle={block.voiceTitle}
                voiceBullets={block.voiceBullets}
                toneTitle={block.toneTitle}
                toneBullets={block.toneBullets}
                colorHeading={block.colorHeading}
                colorSwatches={block.colorSwatches}
                colorUsageTitle={block.colorUsageTitle}
                colorUsageBullets={block.colorUsageBullets}
                colorAccessibilityTitle={block.colorAccessibilityTitle}
                colorAccessibilityBullets={block.colorAccessibilityBullets}
                viewAllLabel={block.viewAllLabel}
                typographyHeading={block.typographyHeading}
                fontFamiliesTitle={block.fontFamiliesTitle}
                fontFamilies={block.fontFamilies}
                typeScaleTitle={block.typeScaleTitle}
                typeScaleTable={block.typeScaleTable}
                iconographyHeading={block.iconographyHeading}
                iconSpecsTitle={block.iconSpecsTitle}
                iconSpecs={block.iconSpecs}
                iconUsageTitle={block.iconUsageTitle}
                iconUsageBullets={block.iconUsageBullets}
                spacingHeading={block.spacingHeading}
                spacingTitle={block.spacingTitle}
                spacingTable={block.spacingTable}
                radiusTitle={block.radiusTitle}
                radiusTable={block.radiusTable}
                accessibility={accessibilityBlock}
              />
            )}
            {block.type === "ui-kit" && (
              <UiKitSection
                heading={block.heading}
                subheading={block.subheading}
                groups={block.groups}
              />
            )}
            {block.type === "prototype" && (
              <PrototypeSection
                heading={block.heading}
                subheading={block.subheading}
                intro={block.intro}
                bullets={block.bullets}
                screens={block.screens}
              />
            )}
            {block.type === "stride-problem" && (
              <StrideProblemSection
                heading={block.heading}
                subheading={block.subheading}
                bullets={block.bullets}
                callout={block.callout}
              />
            )}
            {block.type === "research" && (
              <ResearchSection
                heading={block.heading}
                subheading={block.subheading}
                competitors={block.competitors}
                chartTitle={block.chartTitle}
                chartBars={block.chartBars}
                legend={block.legend}
                insights={block.insights}
                quote={block.quote}
              />
            )}
            {block.type === "benchmarking-dimensions" && (
              <BenchmarkingDimensionsSection
                heading={block.heading}
                subheading={block.subheading}
                competitors={block.competitors}
                dimensions={block.dimensions}
                table={block.table}
                callout={block.callout}
              />
            )}
            {block.type === "architecture-sitemap" && (
              <ArchitectureSitemapSection
                heading={block.heading}
                subheading={block.subheading}
                startLabel={block.startLabel}
                onboardingLabel={block.onboardingLabel}
                onboardingSub={block.onboardingSub}
                navItems={block.navItems}
                subflowLabel={block.subflowLabel}
                subflowSub={block.subflowSub}
                discrepancyNote={block.discrepancyNote}
              />
            )}
            {block.type === "wireframe-filmstrip" && (
              <WireframeFilmstripSection heading={block.heading} subheading={block.subheading} screens={block.screens} />
            )}
            {block.type === "design-system" && (
              <DesignSystemSection
                heading={block.heading}
                subheading={block.subheading}
                typeSpecimen={block.typeSpecimen}
                sectionLabels={block.sectionLabels}
                componentLabels={block.componentLabels}
              />
            )}
            {block.type === "development" && (
              <DevelopmentSection
                heading={block.heading}
                subheading={block.subheading}
                body={block.body}
                stack={block.stack}
                terminalLines={block.terminalLines}
                prototypeLabel={block.prototypeLabel}
                prototypeHref={block.prototypeHref}
                videoPendingLabel={block.videoPendingLabel}
              />
            )}
            {block.type === "ai-agents" && (
              <AiAgentsSection
                heading={block.heading}
                subheading={block.subheading}
                aiLabel={block.aiLabel}
                aiItems={block.aiItems}
                humanLabel={block.humanLabel}
                humanItems={block.humanItems}
                note={block.note}
              />
            )}
          </Reveal>
        );
      })}
    </div>
  );
}
