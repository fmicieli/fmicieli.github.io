import { useLanguage, type Language } from "@/contexts/LanguageContext";

type Ui = {
  header: {
    nav: { projects: string; about: string; contact: string };
    homeLink: string;
    openMenu: string;
    closeMenu: string;
    languageSwitcher: { en: string; es: string; label: string };
  };
  hero: {
    role: string;
    viewMore: string;
    aboutHeading: string;
    aboutText: string;
    scrollHint: string;
  };
  aboutCards: {
    skills: { title: string; text: string }[];
  };
  projectsGrid: {
    heading: string;
    comingSoon: string;
  };
  contact: {
    heading: string;
    prompt: string;
  };
  projectPage: {
    contentPending: string;
    viewOnBehance: string;
  };
  caseStudy: {
    imagePending: string;
    before: string;
    after: string;
    feedback: string;
    findings: string;
    problem: string;
    solution: string;
    impact: string;
    screenshotPending: (spec: string) => string;
    screenshotPendingAria: (spec: string) => string;
  };
};

export const ui: Record<Language, Ui> = {
  en: {
    header: {
      nav: { projects: "Projects", about: "About", contact: "Contact" },
      homeLink: "Florencia Micieli — Home",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      languageSwitcher: { en: "EN", es: "ES", label: "Language" },
    },
    hero: {
      role: "UX / UI - Product Designer",
      viewMore: "View more",
      aboutHeading: "About me",
      aboutText:
        "3+ years designing digital products for B2B and SaaS environments. Design systems, high-fidelity prototypes, and a workflow enhanced by generative AI to explore, document, and build interfaces independently.",
      scrollHint: "Scroll to explore",
    },
    aboutCards: {
      skills: [
        {
          title: "Research & Testing",
          text: "Understanding real user needs through interviews, usability testing, and Nielsen's heuristics.",
        },
        {
          title: "UX/UI Design",
          text: "Wireframes, high-fidelity prototypes, and accessible, scalable design systems.",
        },
        {
          title: "Documentation & Visual Design",
          text: "Specs, redlines, and visual assets ready for development.",
        },
        {
          title: "AI-Assisted Vibe Coding",
          text: "Building functional prototypes independently, powered by AI.",
        },
      ],
    },
    projectsGrid: {
      heading: "Featured projects",
      comingSoon: "Coming soon",
    },
    contact: {
      heading: "Contact",
      prompt: "Let's talk about a project?",
    },
    projectPage: {
      contentPending:
        "TODO: content pending — this case study doesn't have its final content and images yet.",
      viewOnBehance: "View on Behance in the meantime",
    },
    caseStudy: {
      imagePending: "TODO: image pending",
      before: "Before",
      after: "After",
      feedback: "Feedback",
      findings: "Findings",
      problem: "Problem",
      solution: "Solution",
      impact: "Impact",
      screenshotPending: (spec) => `TODO screenshot: ${spec}`,
      screenshotPendingAria: (spec) => `Placeholder — screenshot needed: ${spec}`,
    },
  },
  es: {
    header: {
      nav: { projects: "Proyectos", about: "Sobre mí", contact: "Contacto" },
      homeLink: "Florencia Micieli — Inicio",
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
      languageSwitcher: { en: "EN", es: "ES", label: "Idioma" },
    },
    hero: {
      role: "UX / UI - Diseñadora de Producto",
      viewMore: "Ver más",
      aboutHeading: "Sobre mí",
      aboutText:
        "Más de 3 años diseñando productos digitales para entornos B2B y SaaS. Sistemas de diseño, prototipos de alta fidelidad y un flujo de trabajo potenciado por IA generativa para explorar, documentar y construir interfaces de forma independiente.",
      scrollHint: "Desliza para explorar",
    },
    aboutCards: {
      skills: [
        {
          title: "Investigación y Testing",
          text: "Comprender las necesidades reales de los usuarios a través de entrevistas, testing de usabilidad y las heurísticas de Nielsen.",
        },
        {
          title: "Diseño UX/UI",
          text: "Wireframes, prototipos de alta fidelidad y sistemas de diseño accesibles y escalables.",
        },
        {
          title: "Documentación y Diseño Visual",
          text: "Specs, redlines y assets visuales listos para desarrollo.",
        },
        {
          title: "Vibe Coding Asistido por IA",
          text: "Construcción de prototipos funcionales de forma independiente, potenciados por IA.",
        },
      ],
    },
    projectsGrid: {
      heading: "Proyectos destacados",
      comingSoon: "Próximamente",
    },
    contact: {
      heading: "Contacto",
      prompt: "¿Hablamos de un proyecto?",
    },
    projectPage: {
      contentPending:
        "TODO: contenido pendiente — este caso de estudio todavía no tiene su contenido e imágenes finales.",
      viewOnBehance: "Ver en Behance mientras tanto",
    },
    caseStudy: {
      imagePending: "TODO: imagen pendiente",
      before: "Antes",
      after: "Después",
      feedback: "Comentarios",
      findings: "Hallazgos",
      problem: "Problema",
      solution: "Solución",
      impact: "Impacto",
      screenshotPending: (spec) => `TODO captura: ${spec}`,
      screenshotPendingAria: (spec) => `Placeholder — falta captura de pantalla: ${spec}`,
    },
  },
};

export function useTranslation() {
  const { language } = useLanguage();
  return ui[language];
}
