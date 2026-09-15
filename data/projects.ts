export type CaseStudySection = {
  heading: string;
  body: string;
};

export type CaseStudyMeta = { label: string; value: string };
export type ProblemStat = { value: string; label: string };
export type BenchmarkRow = {
  name: string;
  steps: number;
  highlight?: boolean;
  logo?: string;
};
export type SolutionPoint = { number: string; title: string; description: string };
export type FlowStep = { number: string; label: string };
export type GuideStepVideo = { videoSrc: string; alt: string };
export type GuideStepImage = CaseStudyImage | GuideStepVideo | { placeholder: string };
export type GuideStep = {
  number: string;
  title: string;
  bullets: string[];
  images: GuideStepImage[];
};
export type ImpactCard = { title: string; problem: string; solution: string; impact: string };
export type NextPhase = { title: string; items: string[] };
export type CaseStudyImage = { src: string; alt: string };
export type LabeledImage = CaseStudyImage & { label: string };

/** Generic columns+rows table, reused across every Tribu Music spec table
 * (usability results, type scale, spacing tokens, border radii, contrast
 * ratios, touch targets, compliance checklist) instead of a bespoke typed
 * shape per table — same spirit as BenchmarkRow, just table-shaped. */
export type SimpleTable = { columns: string[]; rows: string[][] };

export type ContextBenchmarkRow = { app: string; logo?: string; strengths: string; weaknesses: string };
export type PersonaField = { label: string; value: string };
export type PersonaData = {
  name: string;
  quote: string;
  photo?: CaseStudyImage;
  fields: PersonaField[];
  justificacionLabel: string;
  justificacion: string;
  bioLabel: string;
  bio: string;
  objetivosLabel: string;
  objetivos: string[];
  motivacionesLabel: string;
  motivaciones: string[];
  frustracionesLabel: string;
  frustraciones: string[];
  habilidadesLabel: string;
  habilidades: string;
};

export type BeforeAfterPair = { label: string; before: CaseStudyImage; after: CaseStudyImage };
export type PieChartData = { question: string; slices: { label: string; value: number }[] };
export type UiKitGroup = { title: string; images: LabeledImage[] };
export type ColorSwatch = { name: string; hex: string };

/** Stride case study — new block-type support types. */
export type ResearchChartBar = {
  label: string;
  caption: string;
  percent: number;
  category: "workout" | "paywall" | "noplan";
};
export type DimensionCard = { title: string; text: string };
export type SitemapNavItem = { label: string; sub: string; highlight?: boolean };
/** Same shape as `GuideStepImage`: a placeholder today, swappable for a real
 * screenshot later without touching the component that renders it. */
export type WireframeScreen = { caption: string; image: CaseStudyImage | { placeholder: string } };
export type DesignSystemStat = { value: string; label: string };
export type DesignSystemTypeRow = { sample: string; meta: string; size: number; weight: number; mono?: boolean };
export type TerminalLine = { kind: "comment" | "prompt"; text: string };

export type CaseStudyBlock =
  | {
      type: "hero";
      title: string;
      subtitle: string;
      meta: CaseStudyMeta[];
      tags: string[];
      images?: CaseStudyImage[];
      video?: { src: string; alt: string };
      watermark?: { src: string; alt: string };
      mockupRadius?: string;
    }
  | {
      type: "problem";
      heading: string;
      subheading: string;
      quotes: string[];
      stats: ProblemStat[];
      note: string;
    }
  | {
      type: "benchmarking";
      heading: string;
      subheading: string;
      note: string;
      rows: BenchmarkRow[];
    }
  | {
      type: "solution";
      heading: string;
      subheading: string;
      points: SolutionPoint[];
      annotations: string[];
      image?: CaseStudyImage;
      phoneDemo?: { frameSrc: string; frameAlt: string; scrollSrc: string };
    }
  | {
      type: "flow-comparison";
      heading: string;
      subheading: string;
      before: FlowStep[];
      after: FlowStep[];
      afterLabel: string;
      reductionLabel: string;
      highlights: { title: string; description: string }[];
    }
  | { type: "step-guide"; heading: string; subheading: string; steps: GuideStep[] }
  | { type: "impact"; heading: string; cards: ImpactCard[] }
  | { type: "next-steps"; heading: string; subheading: string; phases: NextPhase[]; disclaimer?: string }
  | {
      type: "context";
      heading: string;
      subheading: string;
      intro: string;
      insightsHeading: string;
      insights: string[];
      researchHeading: string;
      researchText: string;
      benchmarkingHeading: string;
      benchmarkingColumns: string[];
      benchmarkingRows: ContextBenchmarkRow[];
      benchmarkingCtaLabel: string;
      persona: PersonaData;
      personaCtaLabel: string;
    }
  | {
      type: "design-process";
      heading: string;
      subheading: string;
      happyPathHeading: string;
      happyPathText: string;
      happyPathImages: LabeledImage[];
      digitizationHeading: string;
      digitizationText: string;
      digitizationImages: LabeledImage[];
      gridHeading: string;
      gridText: string;
      gridSpecs: { label: string; value: string }[];
      gridDemoImage: CaseStudyImage;
      midFiHeading: string;
      midFiText: string;
      midFiImages: LabeledImage[];
      figmaLinkLabel: string;
      figmaLinkHref: string;
    }
  | {
      type: "usability-test";
      heading: string;
      subheading: string;
      tasks: string[];
      resultsHeading: string;
      resultsTable: SimpleTable;
      viewAllLabel: string;
      findingsHeading: string;
      findings: string[];
      analysisHeading: string;
      analysis: { title: string; text: string }[];
      surveyHeading: string;
      surveyCharts: PieChartData[];
      improvementsHeading: string;
      improvementsIntro: string;
      improvements: string[];
      beforeAfterHeading: string;
      beforeAfterPairs: BeforeAfterPair[];
    }
  | {
      type: "brand-identity";
      heading: string;
      subheading: string;
      logoHeading: string;
      logoIntro: string;
      logoBullets: string[];
      logoHorizontal: CaseStudyImage;
      logoVertical: CaseStudyImage;
      voiceHeading: string;
      voiceTitle: string;
      voiceBullets: string[];
      toneTitle: string;
      toneBullets: string[];
      colorHeading: string;
      colorSwatches: ColorSwatch[];
      colorUsageTitle: string;
      colorUsageBullets: string[];
      colorAccessibilityTitle: string;
      colorAccessibilityBullets: string[];
      viewAllLabel: string;
      typographyHeading: string;
      fontFamiliesTitle: string;
      fontFamilies: string[];
      typeScaleTitle: string;
      typeScaleTable: SimpleTable;
      iconographyHeading: string;
      iconSpecsTitle: string;
      iconSpecs: string[];
      iconUsageTitle: string;
      iconUsageBullets: string[];
      spacingHeading: string;
      spacingTitle: string;
      spacingTable: SimpleTable;
      radiusTitle: string;
      radiusTable: SimpleTable;
    }
  | { type: "ui-kit"; heading: string; subheading: string; intro: string; groups: UiKitGroup[] }
  | {
      type: "prototype";
      heading: string;
      subheading: string;
      intro: string;
      bullets: string[];
      linkLabel: string;
      linkHref: string;
      screens: LabeledImage[];
    }
  | {
      type: "accessibility";
      heading: string;
      subheading: string;
      intro: string;
      areas: string[];
      typographyColorHeading: string;
      typographyColorIntro: string;
      contrastTable: SimpleTable;
      touchHeading: string;
      touchIntro: string;
      touchTable: SimpleTable;
      formsHeading: string;
      formsLabelsTitle: string;
      formsLabelsBullets: string[];
      formsStatesTitle: string;
      formsStatesBullets: string[];
      resultsHeading: string;
      complianceTable: SimpleTable;
    }
  | { type: "closing"; heading: string; subheading: string; images: CaseStudyImage[] }
  | {
      type: "stride-problem";
      heading: string;
      subheading: string;
      bullets: string[];
      callout: string;
    }
  | {
      type: "research";
      heading: string;
      subheading: string;
      competitors: string[];
      chartTitle: string;
      chartBars: ResearchChartBar[];
      legend: { workout: string; paywall: string; noplan: string };
      insights: string[];
      quote: string;
    }
  | {
      type: "benchmarking-dimensions";
      heading: string;
      subheading: string;
      dimensions: DimensionCard[];
      table: SimpleTable;
      callout: string;
    }
  | {
      type: "architecture-sitemap";
      heading: string;
      subheading: string;
      onboardingLabel: string;
      onboardingSub: string;
      navNote: string;
      navItems: SitemapNavItem[];
      subflowLabel: string;
      subflowSub: string;
      discrepancyNote?: string;
    }
  | { type: "wireframe-filmstrip"; heading: string; subheading: string; screens: WireframeScreen[] }
  | {
      type: "design-system";
      heading: string;
      subheading: string;
      stats: DesignSystemStat[];
      typeSpecimen: DesignSystemTypeRow[];
      sectionLabels: { colorAccent: string; colorSurfaces: string; tintOpacity: string };
      /** Text baked into the Figma-component recreation itself (button
       * copy, list-item label...) — kept as data, not hardcoded in the
       * component, so it switches with the language toggle like everything
       * else on the page instead of staying frozen in one language. */
      componentLabels: {
        primaryButton: string;
        pillBadge: string;
        listItem: string;
        statValue: string;
        statLabel: string;
        achievementTitle: string;
        dangerAction: string;
        navItems: [string, string, string, string];
      };
      fontNote?: string;
    }
  | {
      type: "development";
      heading: string;
      subheading: string;
      body: string;
      stack: string[];
      terminalLines: TerminalLine[];
      prototypeLabel: string;
      prototypeHref: string;
      videoPendingLabel: string;
    }
  | {
      type: "ai-agents";
      heading: string;
      subheading: string;
      aiLabel: string;
      aiItems: string[];
      humanLabel: string;
      humanItems: string[];
      note: string;
    };

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  tags: string[];
  coverImage: string | null;
  coverAlt: string;
  behanceUrl: string;
  contentReady: boolean;
  sections: {
    context: CaseStudySection;
    process: CaseStudySection;
    decisions: CaseStudySection;
    result: CaseStudySection;
  };
  /** When present, the project page renders these instead of `sections`. */
  caseStudyBlocks?: CaseStudyBlock[];
};

export const projects: Project[] = [
  {
    slug: "stride",
    title: "Stride",
    tagline: "A training app that guides absolute-beginner runners from their first jog onward.",
    tags: ["UX/UI", "Research + AI", "React Native"],
    coverImage: null,
    coverAlt: "Screens from the Stride running app",
    behanceUrl: "https://fmicieli.github.io/stride/",
    contentReady: true,
    sections: {
      context: {
        heading: "Context & problem",
        body: "Running looks simple, but starting isn't. Existing running apps assume a baseline fitness level a real beginner doesn't have. Stride is a mobile training app for people who've never run before or are at a very early stage — it generates a personalized, progressive training plan from the user's goal, current level, and day availability.",
      },
      process: {
        heading: "Process",
        body: "Research and benchmarking across six leading running apps via recorded self-testing, information architecture, low- and high-fidelity wireframes, a full design system, and a functional React Native prototype — with AI agents handling most of the repetitive execution.",
      },
      decisions: {
        heading: "Key decisions",
        body: "A single 'Today' screen instead of separate plan/workout tabs, progressive navigation reveal instead of showing everything at once, and 30 days of full free use instead of an immediate paywall.",
      },
      result: {
        heading: "Result",
        body: "A real functional prototype — not just navigable screens — deployed as a web demo on GitHub Pages, generating and persisting a personalized training plan from the onboarding answers.",
      },
    },
    caseStudyBlocks: [
      {
        type: "hero",
        title: "Guides you by the hand from your first jog to crossing the finish line.",
        subtitle:
          "A training app for absolute-beginner runners who've never run before — no plans to choose between, no technical jargon, no overwhelm.",
        meta: [],
        tags: ["UX/UI · product", "Research + AI", "React Native / Expo"],
      },
      {
        type: "stride-problem",
        heading: "01 · The problem",
        subheading:
          "Running looks simple. Starting isn't. Existing running apps assume a baseline fitness level a real beginner doesn't have: they ask you to pick between plans, use technical jargon, and separate the training plan from the act of going out for a run.",
        bullets: [
          "Assume a physical baseline a real beginner doesn't have",
          "Use technical jargon without explaining it (pace, splits, cadence)",
          "Separate the training plan from the act of going out for a run",
        ],
        callout:
          "People who've never run before, with no technical vocabulary, who need small, achievable goals so they don't give up.",
      },
      {
        type: "research",
        heading: "02 · Research",
        subheading:
          "To validate the problem, absolute beginners were studied against six leading running apps, combining desk research with recorded self-testing: each app's onboarding was simulated first-person, in the role of someone who had never run before.",
        competitors: ["5K Runner", "Nike Run Club", "Strava", "Runna", "Adidas Running", "Zombies Run"],
        chartTitle: "TIME TO SOMETHING ACTIONABLE (recorded self-testing)",
        chartBars: [
          { label: "Adidas Running", caption: "56s · no plan", percent: 43, category: "noplan" },
          { label: "Zombies Run", caption: "94s · real workout", percent: 72, category: "workout" },
          { label: "Runna", caption: "99s · paywall", percent: 76, category: "paywall" },
          { label: "Nike Run Club", caption: "115s · no plan", percent: 88, category: "noplan" },
          { label: "Strava", caption: "116s · no plan", percent: 89, category: "noplan" },
          { label: "5K Runner", caption: "131s · paywall", percent: 100, category: "paywall" },
        ],
        legend: {
          workout: "real, actionable workout",
          paywall: "ends in a paywall",
          noplan: "ends with no plan at all",
        },
        insights: [
          "Only one app (5K Runner) asks the user about their real ability in their own terms (\"how much do you think you can run today?\", with a floor of \"just a little\") — but hides all the value behind an immediate paywall.",
          "Runna assesses level and goal, but 9 of its 10 goal options assume the user already runs; \"starting from zero\" isn't a first-class option.",
          "Nike Run Club, Strava, and Adidas Running don't ask a single question about physical ability before letting the user choose or start on their own.",
          "Zombies Run is the only one that delivers a real workout inside its own onboarding, but without checking whether it's appropriate, and with a sharp intensity jump in week 3 with no intermediate check.",
        ],
        quote:
          "The right pattern already exists and works in at least one competitor — but it always comes tied to a friction that cancels it out. That's the open space for Stride.",
      },
      {
        type: "benchmarking-dimensions",
        heading: "03 · Benchmarking",
        subheading:
          "Across the same set of apps, three more dimensions were analyzed beyond onboarding: navigation, plan structure, and checkout.",
        dimensions: [
          {
            title: "Navigation",
            text: "Nike and Strava split \"your plan\" from \"run now\" into separate tabs. Runna gets it right with its \"Today\" tab — the only idea in the set worth borrowing.",
          },
          {
            title: "Plans",
            text: "No app adjusts progression based on how the user actually performed. All of them scale by calendar, not real evidence.",
          },
          {
            title: "Checkout",
            text: "Payment friction is just as decisive as onboarding friction: the 2 apps that understand their user best are also the ones that ask for a card fastest.",
          },
        ],
        table: {
          columns: ["App", "Price", "Real free tier"],
          rows: [
            ["5K Runner", "US$49.99 lifetime", "No — 7-day trial"],
            ["Runna", "US$19.99/mo", "No"],
            ["Strava", "US$11.99/mo", "Yes, no structured plans"],
            ["Adidas Running", "US$9.99/mo", "Yes, basic tracking"],
            ["Zombies Run", "US$6.99/mo", "3 free weeks of real content"],
            ["Nike Run Club", "Free", "Yes, no plan suggestion"],
          ],
        },
        callout:
          "Based on that, Stride defines its access model: 30 days of full use with no \"free trial\" notice at all, then a low, one-time payment to continue.",
      },
      {
        type: "architecture-sitemap",
        heading: "04 · Information architecture",
        subheading:
          "A single central screen (\"Today\") answers \"what's on for me today?\" The numbered onboarding has 6 steps (goal → starting point → availability → projection → generated plan → account), and navigation reveals itself progressively so it doesn't overwhelm from day one.",
        onboardingLabel: "Onboarding",
        onboardingSub: "6 steps",
        navNote: "bottom navigation — 4 sections",
        navItems: [
          { label: "Today", sub: "today's workout", highlight: true },
          { label: "Progress", sub: "streak + history" },
          { label: "Achievements", sub: "next milestone" },
          { label: "Profile", sub: "account & settings" },
        ],
        subflowLabel: "Active workout",
        subflowSub: "sub-flow",
        discrepancyNote:
          "⚠️ Integration note: the diagram follows the validated 4 tabs — Today / Progress / Achievements / Profile (as in the validated mockup). The source report's own text, when describing the progressive navigation reveal, mentions \"Progress and Community\" instead of \"Achievements\" — a discrepancy between the two source documents left unresolved for Flor to confirm.",
      },
      {
        type: "wireframe-filmstrip",
        heading: "05 · Low-fidelity wireframes",
        subheading:
          "21 screens were transcribed in grayscale, with no rounded corners and no design components — a deliberately simple step, focused on validating content, layout, and flow before investing in visual polish.",
        screens: [
          { caption: "A1 · Welcome", image: { placeholder: "Welcome" } },
          { caption: "A2 · Goal", image: { placeholder: "Goal" } },
          { caption: "A4 · Availability", image: { placeholder: "Availability" } },
          { caption: "A6 · Generated plan", image: { placeholder: "Generated plan" } },
          { caption: "B1 · Today", image: { placeholder: "Today" } },
          { caption: "B2 · Progress", image: { placeholder: "Progress" } },
          { caption: "B3 · Achievements", image: { placeholder: "Achievements" } },
          { caption: "B4 · Profile", image: { placeholder: "Profile" } },
        ],
      },
      {
        type: "design-system",
        heading: "06 · Design system",
        subheading:
          "A complete design system built in Figma, verified against WCAG AA. Plus Jakarta Sans as the primary typeface and JetBrains Mono for numeric values — used only inside this panel, not across the rest of the site. Dark mode, with lime green as the brand accent.",
        stats: [
          { value: "25", label: "components" },
          { value: "8", label: "sections" },
          { value: "62", label: "variables" },
          { value: "12", label: "text styles" },
        ],
        typeSpecimen: [
          { sample: "Ready for today?", meta: "Display · 30 / 800", size: 30, weight: 800 },
          { sample: "Interval jog", meta: "Heading · 20 / 700", size: 20, weight: 700 },
          { sample: "20 min · C25K method", meta: "Body · 15 / 500", size: 15, weight: 500 },
          { sample: "WEEK 1 OF 4", meta: "Caption mono · 12 / 600", size: 12, weight: 600, mono: true },
        ],
        sectionLabels: { colorAccent: "COLOR · ACCENT", colorSurfaces: "COLOR · SURFACES", tintOpacity: "14% opacity" },
        componentLabels: {
          primaryButton: "Resume workout",
          pillBadge: "Today's workout",
          listItem: "Change goal",
          statValue: "0 days",
          statLabel: "current streak",
          achievementTitle: "7-day streak",
          dangerAction: "Delete account",
          navItems: ["Today", "Progress", "Achievements", "Profile"],
        },
        fontNote:
          "⚠️ Integration note: the source report describes the brand accent as \"mint green,\" but the validated design brief (and this panel) use lime green (#9BE83C) with exact hex tokens — treated as correct here since it comes with validated tokens; the report likely uses \"mint\" imprecisely.",
      },
      {
        type: "wireframe-filmstrip",
        heading: "07 · High-fidelity wireframes",
        subheading:
          "The MVP's 21 screens were rebuilt using real instances of the design system's components (not loose elements that only imitate their look), replacing grayscale with the definitive color, typography, and spacing tokens. Flow: Onboarding → Today → Active workout → Progress → Profile.",
        screens: [
          { caption: "A1 · Welcome", image: { placeholder: "Welcome" } },
          { caption: "A2 · Goal", image: { placeholder: "Goal" } },
          { caption: "A4 · Availability", image: { placeholder: "Availability" } },
          { caption: "A6 · Generated plan", image: { placeholder: "Generated plan" } },
          { caption: "B1 · Today", image: { placeholder: "Today" } },
          { caption: "B2 · Progress", image: { placeholder: "Progress" } },
          { caption: "B3 · Achievements", image: { placeholder: "Achievements" } },
          { caption: "B4 · Profile", image: { placeholder: "Profile" } },
        ],
      },
      {
        type: "development",
        heading: "08 · Development",
        subheading:
          "The prototype was built in React Native + Expo, with TypeScript and NativeWind as the styling layer, pulling in the brand typeface via Google Fonts. The project was scaffolded from scratch, implementing the full design system (tokens, components, and logo) directly in code.",
        body: "The result is a real functional prototype, not just navigable screens: it generates the training plan from the onboarding answers and persists the user's data.",
        stack: ["React Native", "Expo", "TypeScript", "NativeWind"],
        terminalLines: [
          { kind: "comment", text: "// project scaffolded from scratch" },
          { kind: "prompt", text: "implement full design system" },
          { kind: "comment", text: "// tokens, components, brand typeface" },
          { kind: "prompt", text: "deploy → GitHub Pages" },
        ],
        prototypeLabel: "Functional prototype",
        prototypeHref: "https://fmicieli.github.io/stride/",
        videoPendingLabel: "navigation video pending upload",
      },
      {
        type: "ai-agents",
        heading: "09 · Use of AI agents",
        subheading:
          "Much of this project's execution work was done with AI agents (mainly Claude Code, in some cases with write access to the Figma file).",
        aiLabel: "the AI did",
        aiItems: [
          "Research and benchmarking synthesis",
          "Full component and token catalog build",
          "Low- and high-fidelity wireframe transcription",
          "Functional prototype scaffolding",
        ],
        humanLabel: "stayed 100% human",
        humanItems: [
          "Product and brand direction",
          "Judgment on which training combinations are safe for a beginner",
          "Information architecture decisions",
          "Validating the agent's work was correct (real instances, not lookalike copies)",
        ],
        note: "Delegating repetitive execution to agents, while keeping judgment calls for the decisions, considerably reduced the total process time compared to doing it entirely by hand.",
      },
      {
        type: "next-steps",
        heading: "10 · Next steps",
        subheading: "This process hasn't included testing with real users yet. The next steps are:",
        phases: [
          { title: "Test", items: ["Test the full flow with real beginners."] },
          { title: "Gather feedback", items: ["Gather feedback on the friction points found."] },
          { title: "Iterate", items: ["Iterate on onboarding, the plan, and navigation based on those findings."] },
        ],
      },
    ],
  },
  {
    slug: "bbva-frances",
    title: "BBVA Francés App Redesign",
    tagline:
      "Simplifying the home screen and transfer flow to improve the mobile banking experience.",
    tags: ["UX Research", "Mobile", "Fintech"],
    coverImage: "/projects/bbva-frances/cover.png",
    coverAlt: "Screens from the BBVA Francés app redesign",
    behanceUrl: "https://www.behance.net/gallery/243625059/BBVA-Francs-Caso-de-Estudio",
    contentReady: true,
    sections: {
      context: {
        heading: "Context & problem",
        body: "The BBVA Argentina app resolved a transfer in 6 steps, with information scattered across the home screen and friction finding the most frequent actions. This was an unsolicited redesign: a self-directed exercise exploring how to simplify the flow without access to the real product team, starting from heuristic research on the published app.",
      },
      process: {
        heading: "Process",
        body: "A heuristic (Nielsen) evaluation of the current app, step-by-step mapping of the transfer flow, identifying friction points, and re-prioritizing home screen information based on actual usage frequency reported by users in prior research.",
      },
      decisions: {
        heading: "Key decisions",
        body: "Consolidated redundant confirmation steps, moved destination account selection up to the first step, and redesigned the home screen to prioritize direct transfer shortcuts over promotional content.",
      },
      result: {
        heading: "Result",
        body: "The transfer flow went from 6 steps to 3, keeping the necessary security validations while removing unnecessary navigation friction.",
      },
    },
    caseStudyBlocks: [
      {
        type: "hero",
        title: "BBVA Francés App Redesign",
        subtitle:
          "Simplifying the home screen and transfer flow to improve the mobile banking experience",
        video: { src: "/projects/bbva-frances/cover-demo.mp4", alt: "App preview walkthrough" },
        watermark: { src: "/projects/bbva-frances/bbva-logo.svg", alt: "BBVA Francés logo" },
        meta: [
          { label: "Role", value: "UX/UI Designer" },
          { label: "Duration", value: "10 Days" },
          { label: "Platform", value: "iOS" },
          { label: "Tools", value: "Figma, Claude AI" },
        ],
        tags: ["Case study", "February 2026"],
      },
      {
        type: "problem",
        heading: "Problem",
        subheading: "What users think about BBVA Francés",
        quotes: [
          "I can't find how to transfer money",
          "Everything's mixed together, it's confusing",
          "I don't know when my transfer will arrive",
        ],
        stats: [
          { value: "42%", label: "Can't find basic functions" },
          { value: "80%", label: "UX problems, not technical ones" },
          { value: "#1", label: "Transfers — pain point" },
        ],
        note: "89 reviews analyzed — June 2025 to January 2026",
      },
      {
        type: "benchmarking",
        heading: "Benchmarking",
        subheading: "We analyzed 4 competitors in the Argentine market",
        note: "Steps to complete a transfer",
        rows: [
          {
            name: "Banco Galicia",
            steps: 6,
            logo: "/projects/bbva-frances/logos/banco-galicia.png",
          },
          {
            name: "Mercado Pago",
            steps: 4,
            logo: "/projects/bbva-frances/logos/mercado-pago.png",
          },
          { name: "Naranja X", steps: 4, logo: "/projects/bbva-frances/logos/naranja-x.png" },
          { name: "Cuenta DNI", steps: 2, logo: "/projects/bbva-frances/logos/cuenta-dni.png" },
          { name: "New solution", steps: 3, highlight: true },
        ],
      },
      {
        type: "solution",
        heading: "Solution",
        subheading: "How we solve the identified problems",
        points: [
          {
            number: "1",
            title: "Clear Visual Hierarchy",
            description: "The most used, most visible. Balance and key actions stand out.",
          },
          {
            number: "2",
            title: "Progressive Validation",
            description: "Catch errors early to avoid frustration.",
          },
          {
            number: "3",
            title: "Reduced Friction",
            description: "3 steps instead of 6. Fast without sacrificing security.",
          },
        ],
        annotations: [
          "Balance highlighted with maximum visual hierarchy",
          "Prioritized shortcuts: most-used front and center",
          "QR in the FAB for instant payments",
        ],
        phoneDemo: {
          frameSrc: "/projects/bbva-frances/solution-frame.png",
          frameAlt: "Redesigned home screen",
          scrollSrc: "/projects/bbva-frances/solution-scroll.jpg",
        },
      },
      {
        type: "flow-comparison",
        heading: "Transfer Flow Optimization",
        subheading: "From 6 confusing steps to 3 clearer ones",
        before: [
          { number: "1", label: "Account confirmation" },
          { number: "2", label: "Recipient selection" },
          { number: "3", label: "Recipient data confirmation" },
          { number: "4", label: "Transfer amount" },
          { number: "5", label: "Operation confirmation" },
          { number: "6", label: "SMS code confirmation" },
        ],
        after: [
          { number: "1", label: "Recipient" },
          { number: "2", label: "Data validation" },
          { number: "3", label: "Amount + account + confirmation" },
        ],
        afterLabel: "Redesign",
        reductionLabel: "50% reduction",
        highlights: [
          { title: "Early validation", description: "Prevents errors before they happen" },
          { title: "Combined steps", description: "Fewer frictions, same security" },
          { title: "Speed + Security", description: "Speed without compromising protection" },
        ],
      },
      {
        type: "step-guide",
        heading: "Step-by-Step Guide",
        subheading: "How the new transfer flow works",
        steps: [
          {
            number: "1",
            title: "Recipient",
            bullets: [
              "Single input (Alias/CBU/CVU)",
              "Recent contacts visible",
              "Automatic validation",
            ],
            images: [
              {
                videoSrc: "/projects/bbva-frances/step-1-recipient-demo.mp4",
                alt: "Screen recording of the recipient step: entering an alias/CBU/CVU with live validation",
              },
            ],
          },
          {
            number: "2",
            title: "Data Confirmation",
            bullets: [
              "Name and bank validated",
              "Shows full CBU and CUIT",
              "Option to save contact",
            ],
            images: [
              {
                videoSrc: "/projects/bbva-frances/step-2-data-confirmation-demo.mp4",
                alt: "Screen recording of the data confirmation step: recipient name and bank validated, full CBU and CUIT shown, save-contact option",
              },
            ],
          },
          {
            number: "3",
            title: "Amount + Source",
            bullets: [
              "Instant numeric keypad + visible balance",
              "Source account selection",
              "Confirm transfer button",
            ],
            images: [
              {
                videoSrc: "/projects/bbva-frances/step-3-amount-source-demo.mp4",
                alt: "Screen recording of the amount step: numeric keypad, visible balance, and source account selection",
              },
            ],
          },
          {
            number: "4",
            title: "Success",
            bullets: [
              "Clear visual status",
              "Receipt available",
              "Operation number, date, and time visible",
            ],
            images: [
              {
                src: "/projects/bbva-frances/step-4-success.png",
                alt: "Success screen: confirmation status, receipt, operation number, date and time",
              },
            ],
          },
        ],
      },
      {
        type: "impact",
        heading: "Design with Impact",
        cards: [
          {
            title: "Progressive Validation",
            problem: "Late errors in the process",
            solution: "Validation at every step",
            impact: "Prevents frustration",
          },
          {
            title: "Intermediate Confirmation",
            problem: "Users transfer to the wrong destination",
            solution: "Modal with complete data before the amount",
            impact: "Reviews the recipient before committing money",
          },
          {
            title: "Everything on One Screen",
            problem: "Fragmented screens lengthen the process",
            solution: "Amount + Account + Confirmation in a single view",
            impact: "Reduces steps without losing clarity",
          },
          {
            title: "Visual Hierarchy on Home",
            problem: "42% can't find basic functions",
            solution: "Highlighted balance + prioritized shortcuts",
            impact: "Immediate access to critical functions",
          },
        ],
      },
      {
        type: "next-steps",
        heading: "What's Next",
        subheading: "Next steps for the project",
        phases: [
          {
            title: "Phase 1: Validation",
            items: [
              "Usability testing: 5–8 users",
              "Track time, errors, satisfaction",
              "Iterate on findings",
            ],
          },
          {
            title: "Phase 2: Expansion",
            items: [
              "Pay bills (pain point #2)",
              "Account & transaction history",
              "Card management",
              "Settings & profile",
            ],
          },
          {
            title: "Phase 3: Implementation",
            items: [
              "Documentation",
              "Component library",
              "Animation & transition guides",
              "Dev team handoff",
            ],
          },
        ],
        disclaimer:
          "This is a personal conceptual redesign project created for educational and portfolio purposes. I am not affiliated with BBVA Francés, nor was I hired by the company to do this work. All proposals and designs are hypothetical and do not represent official BBVA plans. The brands, logos, and trade names shown are the property of their respective owners and are used solely for illustrative purposes in this case study.",
      },
    ],
  },
  {
    slug: "tribu-music",
    title: "Tribu Music",
    tagline: "A mobile app that connects people through live music.",
    tags: ["Product Design", "UI"],
    coverImage: "/projects/tribu-music/hifi-screen-discover.png",
    coverAlt: "Screens from the Tribu Music app redesign",
    behanceUrl: "https://www.behance.net/gallery/241107187/Tribu-Music-Caso-de-estudio",
    contentReady: true,
    sections: {
      context: {
        heading: "Context & problem",
        body: "Tribu Music is a mobile app designed to connect people through live music — discovering nearby concerts and events, and connecting with others who share similar musical interests, based on in-depth UX research into the pain points of concertgoers.",
      },
      process: {
        heading: "Process",
        body: "Happy-path mapping, low-fidelity sketches digitized into wireframes, a defined grid and spacing system, Material Design 3 mid-fidelity wireframes, in-person usability testing with 5 users, and a full UI Kit ahead of the final high-fidelity screens.",
      },
      decisions: {
        heading: "Key decisions",
        body: "Replaced the ambiguous search icon with the brand logo as the home anchor, renamed \"My music tastes\" to the clearer \"Favorites\", and reorganized the action hierarchy on the event profile screen based on usability findings.",
      },
      result: {
        heading: "Result",
        body: "A WCAG 2.1 AA–compliant high-fidelity prototype with a complete design system (color, type, spacing, components), validated through usability testing with a 100% task success rate.",
      },
    },
    caseStudyBlocks: [
      {
        type: "hero",
        title: "Tribu Music",
        subtitle:
          "A mobile app that connects people through live music — discover nearby concerts and connect with others who share your taste.",
        images: [
          { src: "/projects/tribu-music/hero-discover-screen.png", alt: "Tribu Music app Discover screen" },
        ],
        mockupRadius: "9px",
        watermark: { src: "/projects/tribu-music/tribu-logo-white.svg", alt: "Tribu Music logo" },
        meta: [
          { label: "Role", value: "UX/UI Designer" },
          { label: "Program", value: "Talento Tech" },
          { label: "Date", value: "December 2025" },
        ],
        tags: ["Case study", "December 2025"],
      },
      {
        type: "context",
        heading: "01 · Context",
        subheading: "Research, benchmarking, and the target user",
        intro:
          "Tribu Music is a mobile app designed to connect people through live music. The app makes it possible to discover nearby concerts and music events, and helps users connect with others who share similar musical interests.",
        insightsHeading: "Key research insights:",
        insights: [
          "Users look for consolidated information about nearby concerts",
          "There's a need to connect with other people before the event",
          "Ticket purchasing needs to be accessible and visible",
          "Users value being able to coordinate attendance with groups",
        ],
        researchHeading: "Initial Research",
        researchText:
          "The project started from an in-depth UX research process carried out by the research team, which identified the needs and pain points of users who attend live music events.",
        benchmarkingHeading: "Benchmarking",
        benchmarkingColumns: ["Apps", "Strengths", "Weaknesses"],
        benchmarkingRows: [
          {
            app: "Spotify",
            logo: "/projects/tribu-music/logos/app-spotify.png",
            strengths:
              "Uses your Spotify listening data to recommend concerts. Good variety of offerings in Argentina, ranging from small to large artists.",
            weaknesses:
              "The concerts feature is hard to find among so much content. The paid tier limits usage, and there's no search or filter for concerts — only recommendation-based browsing.",
          },
          {
            app: "Concert discovery app",
            logo: "/projects/tribu-music/logos/app-b.png",
            strengths:
              "Can link with a Spotify, Amazon, or Apple account. Wide variety of offerings in Argentina, covering both large and mid-size artists. Filter by genre, location, and more.",
            weaknesses:
              "Navigating the app can be confusing, as can certain buttons' functions. The profile section and its features are unclear.",
          },
          {
            app: "Event social app",
            logo: "/projects/tribu-music/logos/app-c.png",
            strengths:
              "Event chats for the shows you're attending, letting you connect with people going to the same event. You can also upload photos from the show.",
            weaknesses:
              "Several bugs in how the app functions. Very little presence in Argentina, and the app's flow feels confusing due to how much information is packed in without hierarchy.",
          },
        ],
        benchmarkingCtaLabel: "View full benchmarking",
        persona: {
          name: "Victoria Rodríguez",
          quote: "Discover the world, discover what's inside you.",
          photo: { src: "/projects/tribu-music/victoria-rodriguez.jpg", alt: "Victoria Rodríguez" },
          fields: [
            { label: "Age", value: "25 years old" },
            { label: "Gender", value: "Female" },
            { label: "Location", value: "Avellaneda, Greater Buenos Aires" },
            { label: "Marital status", value: "Single" },
            { label: "Occupation", value: "Tattoo artist" },
          ],
          justificacionLabel: "Why this persona",
          justificacion:
            "She's interested in experiencing live music and learning more about Argentina's emerging music scene. She's young and part of the digitally native generation.",
          bioLabel: "Bio",
          bio: "Victoria has been running her own private tattoo studio for a few months now. She currently lives with her parents in the southern suburbs, but loves Buenos Aires' cultural scene. She likes to work and find inspiration through music, which accompanies her throughout her workday. While she's fascinated by CABA's cultural scene, she doesn't always find out about events in time and ends up missing most of the plans.",
          objetivosLabel: "Goals",
          objetivos: [
            "Listen to more live music and discover new artists.",
            "Not miss any show from her favorite bands.",
            "Not depend on friends or people she follows to find out about news or events.",
          ],
          motivacionesLabel: "Motivations",
          motivaciones: [
            "Being able to connect with new artists and music genres.",
            "Feeling fulfilled seeing her favorite artists live.",
            "Being inspired by other artists' scenes and movements.",
          ],
          frustracionesLabel: "Frustrations",
          frustraciones: [
            "Missing an artist's show and finding out days later through friends' stories or people she follows.",
            "Difficulty finding out about music events in CABA since she doesn't live in the city.",
            "Always listening to the same playlist.",
          ],
          habilidadesLabel: "Tech skills",
          habilidades: "She's comfortable with apps — uses TikTok, Instagram, Twitter, and YouTube.",
        },
        personaCtaLabel: "View full archetype",
      },
      {
        type: "design-process",
        heading: "02 · Design Process",
        subheading: "From hand-drawn sketches to Material Design 3 wireframes",
        happyPathHeading: "Happy Path",
        happyPathText:
          "As the first step of the design process, we mapped out a happy path identifying the 6 minimum views needed for the app's core flow.",
        happyPathImages: [
          { src: "/projects/tribu-music/sketch-login.png", alt: "Hand-drawn sketch of the login screen", label: "Login" },
          { src: "/projects/tribu-music/sketch-community.png", alt: "Hand-drawn sketch of the community screen", label: "Community" },
          { src: "/projects/tribu-music/sketch-chat.png", alt: "Hand-drawn sketch of the chat screen", label: "Chat" },
          { src: "/projects/tribu-music/sketch-discover.png", alt: "Hand-drawn sketch of the discover screen", label: "Discover" },
          { src: "/projects/tribu-music/sketch-settings.png", alt: "Hand-drawn sketch of the settings screen", label: "Settings" },
          { src: "/projects/tribu-music/sketch-profile.png", alt: "Hand-drawn sketch of the profile screen", label: "Profile" },
        ],
        digitizationHeading: "Digitizing the Happy Path",
        digitizationText:
          "As the first step of the design process, we mapped out a happy path identifying the 6 minimum views needed for the app's core flow.",
        digitizationImages: [
          { src: "/projects/tribu-music/wireframe-lofi-login.png", alt: "Digitized low-fidelity wireframe of the login screen", label: "Login" },
          { src: "/projects/tribu-music/wireframe-lofi-community.png", alt: "Digitized low-fidelity wireframe of the community screen", label: "Community" },
          { src: "/projects/tribu-music/wireframe-lofi-chat.png", alt: "Digitized low-fidelity wireframe of the chat screen", label: "Chat" },
          { src: "/projects/tribu-music/wireframe-lofi-discover.png", alt: "Digitized low-fidelity wireframe of the discover screen", label: "Discover" },
          { src: "/projects/tribu-music/wireframe-lofi-settings.png", alt: "Digitized low-fidelity wireframe of the settings screen", label: "Settings" },
          { src: "/projects/tribu-music/wireframe-lofi-profile.png", alt: "Digitized low-fidelity wireframe of the profile screen", label: "Profile" },
        ],
        gridHeading: "Grid System & Structure",
        gridText:
          "Before moving on to mid-fidelity wireframes, we established a consistent design system. Technical specifications:",
        gridSpecs: [
          { label: "Grid", value: "4 columns" },
          { label: "Margins", value: "16px" },
          { label: "Gutters", value: "8px" },
          { label: "Spacing system", value: "Defined tokens (xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px)" },
        ],
        gridDemoImage: {
          src: "/projects/tribu-music/grid-system-demo.png",
          alt: "Grid overlay across the app's core screens showing 4-column structure with 16px margins",
        },
        midFiHeading: "Mid-Fidelity Wireframes",
        midFiText:
          "We developed mid-fidelity wireframes incorporating Material Design 3 patterns. At this stage we added every screen needed to build an interactive prototype suitable for user testing.",
        midFiImages: [
          { src: "/projects/tribu-music/wireframe-midfi-login.png", alt: "Mid-fidelity wireframe of the login screen", label: "Login" },
          { src: "/projects/tribu-music/wireframe-midfi-community.png", alt: "Mid-fidelity wireframe of the community screen", label: "Community" },
          { src: "/projects/tribu-music/wireframe-midfi-chat.png", alt: "Mid-fidelity wireframe of the chat screen", label: "Chat" },
          { src: "/projects/tribu-music/wireframe-midfi-discover.png", alt: "Mid-fidelity wireframe of the discover screen", label: "Discover" },
          { src: "/projects/tribu-music/wireframe-midfi-settings.png", alt: "Mid-fidelity wireframe of the settings screen", label: "Settings" },
          { src: "/projects/tribu-music/wireframe-midfi-event.png", alt: "Mid-fidelity wireframe of the event profile screen", label: "Event Profile" },
        ],
        figmaLinkLabel: "View on Figma",
        figmaLinkHref:
          "https://www.figma.com/design/lEMkBV42DJcfRvPf1TUCDU/Curso-UI---Micieli-Florencia?node-id=554-4414&t=SW1tVbjaGYvh1s8m-4",
      },
      {
        type: "usability-test",
        heading: "03 · Usability Testing",
        subheading:
          "We conducted in-person usability tests with 5 users, ages 25–35 — 100% task success",
        tasks: [
          "Search for the Bad Bunny concert using the search feature and go to the channel for people attending the event",
          "Go to Juan Pérez's chat, one of the people you connected with earlier",
          "Access the settings section within the app",
          'Go to the "My music tastes" section',
        ],
        resultsHeading: "Qualitative Results",
        resultsTable: {
          columns: ["Tasks", "Success Rate", "Avg. Time", "Avg. Clicks", "Time Range"],
          rows: [
            ["Sign up for the app", "100%", "00:08", "3.6", "00:05 - 00:15"],
            ["Search for a concert and go to the event channel", "100%", "00:10", "4.2", "00:08 - 00:12"],
            ["Go to Juan Perez's chat", "100%", "00:17", "7.2", "00:05 - 00:54"],
            ['"Settings" section', "100%", "00:04", "1.2", "00:01 - 00:12"],
            ['"My music tastes" section', "100%", "00:09", "3.2", "00:04 - 00:26"],
          ],
        },
        viewAllLabel: "View more",
        findingsHeading: "Key Findings",
        findings: [
          "Success rate: 100%",
          "Efficiency compromised: high variability in time and clicks",
          "Satisfaction: only 40% completed tasks without confusion, 60% reported difficulties",
        ],
        analysisHeading: "Analysis",
        analysis: [
          {
            title: "Confusion with the search icon:",
            text: "users didn't understand whether the search icon represented the app's home screen, causing disorientation in the main navigation",
          },
          {
            title: 'Ambiguity in "My music tastes":',
            text: "the label wasn't clear and didn't effectively communicate its purpose, contributing to the high variability in time (4 to 26 seconds) and clicks (2 to 8)",
          },
          {
            title: "No purchase CTA:",
            text: "several users explicitly asked how to buy tickets, showing that this function wasn't sufficiently accessible or visible",
          },
        ],
        surveyHeading: "Survey Results",
        surveyCharts: [
          {
            question: "Were you able to complete all the tasks in the app?",
            slices: [
              { label: "No problem", value: 60 },
              { label: "Some confusion", value: 40 },
            ],
          },
          {
            question: "How was your experience connecting with other people in the app?",
            slices: [
              { label: "Very Good", value: 20 },
              { label: "Bad", value: 20 },
              { label: "Neutral", value: 20 },
              { label: "Good", value: 40 },
            ],
          },
          {
            question: "Do you feel the app offers the features needed to find concerts and connect with other users?",
            slices: [
              { label: "Completely", value: 40 },
              { label: "Partially", value: 60 },
            ],
          },
        ],
        improvementsHeading: "Improvements Implemented",
        improvementsIntro: "Based on the testing findings, we implemented the following design improvements:",
        improvements: [
          "Replaced the search icon with the brand logo. This clearly identifies the home screen, establishing a clear starting point for navigation and reinforcing visual identity.",
          'Changed "My music tastes" to "Favorites": replacing it with more universal, concise wording that reduces cognitive load.',
          "Reorganized the action hierarchy on the event profile screen",
        ],
        beforeAfterHeading: "Before / After",
        beforeAfterPairs: [
          {
            label: "Home screen icon",
            before: { src: "/projects/tribu-music/before-search-icon.png", alt: "Before: search icon used as the home tab icon" },
            after: { src: "/projects/tribu-music/after-search-icon.png", alt: "After: brand logo used as the home tab icon" },
          },
          {
            label: 'Settings label ("My music tastes" → "Favorites")',
            before: { src: "/projects/tribu-music/before-mis-gustos.png", alt: 'Before: settings list showing "My music tastes"' },
            after: { src: "/projects/tribu-music/after-favoritos.png", alt: 'After: settings list showing "Favorites"' },
          },
          {
            label: "Event profile action hierarchy",
            before: { src: "/projects/tribu-music/before-perfil-recital.png", alt: "Before: event profile screen with original action hierarchy" },
            after: { src: "/projects/tribu-music/after-perfil-recital.png", alt: "After: event profile screen with reorganized action hierarchy" },
          },
        ],
      },
      {
        type: "brand-identity",
        heading: "04 · Visual Identity",
        subheading: "Logo, voice and tone, color, typography, and spacing",
        logoHeading: "Logo",
        logoIntro: "Combined logotype (symbol + modular typography) made up of:",
        logoBullets: [
          "Frequency bars: represent music as visual data — simple, rounded shapes that scale without issue",
          "Barlow Condensed Extrabold typeface: has a modern presence characteristic of festival posters and stays legible in small spaces",
          "Violet color: conveys creativity, nighttime energy, and a premium experience",
        ],
        logoHorizontal: { src: "/projects/tribu-music/logo-horizontal.svg", alt: "Tribu Music horizontal logo lockup" },
        logoVertical: { src: "/projects/tribu-music/logo-vertical.svg", alt: "Tribu Music vertical logo lockup" },
        voiceHeading: "Voice & Tone",
        voiceTitle: "Brand voice:",
        voiceBullets: [
          "Participatory and clear: empathetic content that facilitates interaction",
          "Simple: anyone can understand the content, regardless of background or education level",
        ],
        toneTitle: "Tone:",
        toneBullets: [
          'Warm and friendly: uses the informal "vos" to convey closeness while keeping respect',
          "Short and direct: concise writing that makes it easy to find and resolve things quickly",
          "Added-value messaging: communicating benefits from the start",
        ],
        colorHeading: "Color System",
        colorSwatches: [
          { name: "Primary", hex: "#121212" },
          { name: "Secondary", hex: "#FAFAFA" },
          { name: "Accent", hex: "#D4B5FF" },
        ],
        colorUsageTitle: "UI application:",
        colorUsageBullets: [
          "Primary action: violet background, black text",
          "Secondary action: transparent background, white border and text",
          "Tertiary (ghost) action: transparent background, violet border and text",
        ],
        colorAccessibilityTitle: "Accessibility:",
        colorAccessibilityBullets: [
          "Primary text (white / black): 18.5:1",
          "Secondary text (70% opacity): 7.8:1",
          "Primary button (black / violet): 8.2:1",
          "Active icon (violet / black): 4.9:1",
        ],
        viewAllLabel: "View more",
        typographyHeading: "Typography",
        fontFamiliesTitle: "Type families:",
        fontFamilies: [
          "Primary: Roboto (UI, body text)",
          "Alternative: Open Sans (fallback)",
          "Logo: Barlow Condensed (brand use only)",
        ],
        typeScaleTitle: "Type scale:",
        typeScaleTable: {
          columns: ["Use", "Size", "Weight", "Line Height"],
          rows: [
            ["H1", "28 px", "Extrabold", "36 px"],
            ["H2", "22 px", "Bold", "28 px"],
            ["H3", "18 px", "Medium", "24 px"],
            ["Body Large", "16 px", "Regular", "24 px"],
            ["Body Medium", "14 px", "Regular", "20 px"],
            ["Body Small", "12 px", "Regular", "16 px"],
            ["Button", "16 px", "Bold", "Auto"],
          ],
        },
        iconographyHeading: "Iconography",
        iconSpecsTitle: "Specifications:",
        iconSpecs: [
          "Primary color: violet for highlighted actions",
          "Secondary color: white (70%) for navigation",
          "Standard sizes: 24 px, 30 px, 34 px",
        ],
        iconUsageTitle: "Color usage:",
        iconUsageBullets: [
          "Active navigation icons: violet",
          "Inactive navigation icons: white (38%)",
          "Informational icons: white (70%)",
        ],
        spacingHeading: "Spacing & Layout",
        spacingTitle: "Spacing scale:",
        spacingTable: {
          columns: ["Token", "Value", "Usage"],
          rows: [
            ["xs", "4 px", "Minimum spacing"],
            ["sm", "8 px", "Between related elements"],
            ["md", "16 px", "Standard spacing"],
            ["lg", "24 px", "Between sections"],
            ["xl", "32 px", "Separation between blocks"],
          ],
        },
        radiusTitle: "Border radii:",
        radiusTable: {
          columns: ["Element", "Radius"],
          rows: [
            ["Buttons", "25 px (fully rounded)"],
            ["Icon buttons", "8 px"],
            ["Cards", "12 px"],
            ["Modals", "16 px"],
            ["Inputs", "8 px"],
            ["Chips", "16 px"],
            ["Tags", "16 px"],
          ],
        },
      },
      {
        type: "ui-kit",
        heading: "05 · UI Kit & Components",
        subheading: "Every component and state, ready for high fidelity",
        intro:
          "We built a complete UI Kit with every component needed for the high-fidelity implementation, including all of its states:",
        groups: [
          {
            title: "Text Fields",
            images: [
              {
                src: "/projects/tribu-music/uikit-textfields.png",
                alt: "Text field states: default, focused, error, filled, disabled",
                label: "Default / Focused / Error / Filled / Disabled",
              },
            ],
          },
          {
            title: "Cards",
            images: [
              { src: "/projects/tribu-music/uikit-cards-1.png", alt: "Card component states", label: "Default / Hover / Pressed" },
              { src: "/projects/tribu-music/uikit-cards-2.png", alt: "Card component states, alternate layout", label: "Default / Hover / Pressed" },
            ],
          },
          {
            title: "Top Bar",
            images: [{ src: "/projects/tribu-music/uikit-topbar.png", alt: "Top bar component", label: "Top Bar" }],
          },
          {
            title: "Buttons",
            images: [
              { src: "/projects/tribu-music/uikit-btn-primary.png", alt: "Primary button states", label: "Primary — Default / Hover / Pressed / Disabled" },
              { src: "/projects/tribu-music/uikit-btn-secondary.png", alt: "Secondary button states", label: "Secondary — Default / Hover / Pressed / Disabled" },
              { src: "/projects/tribu-music/uikit-btn-ghost.png", alt: "Ghost button states", label: "Ghost — Default / Hover / Pressed / Disabled" },
              { src: "/projects/tribu-music/uikit-btn-error.png", alt: "Error button states", label: "Error — Default / Hover / Pressed / Disabled" },
              { src: "/projects/tribu-music/uikit-btn-textlink.png", alt: "Text link button states", label: "Text Link — Default / Hover / Pressed / Disabled" },
              { src: "/projects/tribu-music/uikit-btn-icon.png", alt: "Icon button states", label: "Icon Button — Default / Focused" },
            ],
          },
          {
            title: "Navigation Bar",
            images: [{ src: "/projects/tribu-music/uikit-navbar.png", alt: "Navigation bar component", label: "Navigation Bar" }],
          },
          {
            title: "Tab Bar",
            images: [{ src: "/projects/tribu-music/uikit-tabbar.png", alt: "Tab bar component", label: "Tab Bar" }],
          },
          {
            title: "List Item",
            images: [{ src: "/projects/tribu-music/uikit-listitem.png", alt: "List item component", label: "List Item" }],
          },
          {
            title: "Chat Bubbles",
            images: [{ src: "/projects/tribu-music/uikit-chatbubbles.png", alt: "Chat bubble components", label: "Chat Bubbles" }],
          },
        ],
      },
      {
        type: "prototype",
        heading: "06 · High-Fidelity Prototype",
        subheading: "Testing improvements applied to the final screens",
        intro: "The improvements identified in testing were applied to the high-fidelity version, where we implemented:",
        bullets: [
          "Final color palette",
          "Typography per the established system",
          "UI Kit components",
          "Interactions and micro-animations",
          "States for every element",
        ],
        linkLabel: "View Prototype",
        linkHref:
          "https://www.figma.com/design/lEMkBV42DJcfRvPf1TUCDU/Curso-UI---Micieli-Florencia?node-id=560-5065&t=SW1tVbjaGYvh1s8m-4",
        screens: [
          { src: "/projects/tribu-music/hifi-screen-login.png", alt: "High-fidelity login screen", label: "Login" },
          { src: "/projects/tribu-music/hifi-screen-discover.png", alt: "High-fidelity discover/home screen", label: "Discover" },
          { src: "/projects/tribu-music/hifi-screen-event.png", alt: "High-fidelity event profile screen (Bad Bunny)", label: "Event Profile" },
          { src: "/projects/tribu-music/hifi-screen-channels.png", alt: "High-fidelity community/channels screen", label: "Community" },
          { src: "/projects/tribu-music/hifi-screen-chat.png", alt: "High-fidelity individual chat screen with Juan Perez", label: "Chat" },
          { src: "/projects/tribu-music/hifi-screen-settings.png", alt: "High-fidelity settings screen", label: "Settings" },
        ],
      },
      {
        type: "accessibility",
        heading: "07 · Accessibility",
        subheading: "WCAG 2.1 AA compliance across the whole design",
        intro:
          "Tribu Music's design meets WCAG 2.1 Level AA accessibility requirements across every applicable area. Areas verified:",
        areas: [
          "Color contrast",
          "Text sizes",
          "Touch areas",
          "Component states",
          "Consistent navigation",
          "Accessible forms",
        ],
        typographyColorHeading: "Typography & Color",
        typographyColorIntro: "Every color pair exceeds the required minimums:",
        contrastTable: {
          columns: ["Element", "Contrast Ratio", "WCAG Minimum", "Status"],
          rows: [
            ["Primary text (#FAFAFA / #121212)", "18.5:1", "4.5:1", "✅"],
            ["Secondary text (70% opacity)", "7.8:1", "4.5:1", "✅"],
            ["Primary button (#121212 / #D4B5FF)", "8.2:1", "4.5:1", "✅"],
            ["Active icon (#D4B5FF / #121212)", "4.9:1", "3:1", "✅"],
            ["Elevated surface (#FAFAFA / #1E1E1E)", "17.2:1", "4.5:1", "✅"],
          ],
        },
        touchHeading: "Touch Areas",
        touchIntro: "Every touch target exceeds the minimum required size:",
        touchTable: {
          columns: ["Element", "Size", "AA Minimum", "Status"],
          rows: [
            ["Buttons", "48 px height", "24x24 px", "✅ Exceeds AAA"],
            ["Inputs", "56 px height", "24x24 px", "✅ Exceeds AAA"],
            ["Navigation icons", "40x40 px total area", "24x24 px", "✅ Exceeds AAA"],
            ["Tappable cards", "160x180 px", "24x24 px", "✅ Exceeds AAA"],
          ],
        },
        formsHeading: "Forms & Controls",
        formsLabelsTitle: "Labels & messages:",
        formsLabelsBullets: [
          "Every input has a visible, descriptive label",
          "Labels sit immediately next to their inputs",
          "Error messages use a red border + descriptive text below the input",
          "Descriptive placeholders with clear examples",
        ],
        formsStatesTitle: "Input states:",
        formsStatesBullets: ["Clearly differentiated states (default, focus, error, success)"],
        resultsHeading: "Compliance Results",
        complianceTable: {
          columns: ["Criteria", "Status"],
          rows: [
            ["Color contrast", "Meets"],
            ["Text sizes", "Meets"],
            ["Touch areas", "Meets"],
            ["Component states", "Meets"],
            ["Tappable cards", "Meets"],
            ["Consistent navigation", "Meets"],
            ["Accessible forms", "Meets"],
          ],
        },
      },
      {
        type: "closing",
        heading: "Thank You",
        subheading: "Thanks for following this case study",
        images: [
          { src: "/projects/tribu-music/hifi-screen-discover.png", alt: "Tribu Music discover screen" },
          { src: "/projects/tribu-music/hifi-screen-event.png", alt: "Tribu Music event profile screen" },
          { src: "/projects/tribu-music/hifi-screen-chat.png", alt: "Tribu Music chat screen" },
        ],
      },
    ],
  },
  {
    slug: "out",
    title: "Section design for OUT",
    tagline: "Design of a product section for OUT.",
    tags: ["UI", "Design System"],
    coverImage: null,
    coverAlt: "Screens from the OUT project",
    behanceUrl: "https://www.behance.net/gallery/230515938/Diseno-de-seccion-para-OUT",
    contentReady: false,
    sections: {
      context: { heading: "Context & problem", body: "TODO: content pending" },
      process: { heading: "Process", body: "TODO: content pending" },
      decisions: { heading: "Key decisions", body: "TODO: content pending" },
      result: { heading: "Result", body: "TODO: content pending" },
    },
  },
  {
    slug: "medife-research",
    title: "Medifé Research",
    tagline: "Research case study for Medifé.",
    tags: ["UX Research", "Healthcare"],
    coverImage: null,
    coverAlt: "Research material from the Medifé project",
    behanceUrl: "https://www.behance.net/gallery/225357747/Medif-Research-Caso-de-estudio",
    contentReady: false,
    sections: {
      context: { heading: "Context & problem", body: "TODO: content pending" },
      process: { heading: "Process", body: "TODO: content pending" },
      decisions: { heading: "Key decisions", body: "TODO: content pending" },
      result: { heading: "Result", body: "TODO: content pending" },
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
