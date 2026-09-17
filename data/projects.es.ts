import type { Project } from "./projects";

// Spanish mirror of `projects.ts` — same order, same slugs (routing depends
// on slugs matching exactly between languages), same image/video paths,
// hrefs, and icons. Only human-readable copy is translated. Proper nouns
// (product/company names, tool names) are left as-is.
export const projects: Project[] = [
  {
    slug: "stride",
    title: "Stride",
    tagline: "Una app de entrenamiento que acompaña a corredores principiantes desde su primer trote.",
    tags: ["UX/UI", "Research + IA", "React Native"],
    coverImage: null,
    coverAlt: "Pantallas de la app de running Stride",
    behanceUrl: "https://fmicieli.github.io/stride/",
    contentReady: true,
    sections: {
      context: {
        heading: "Contexto y problema",
        body: "Correr parece simple, pero empezar no lo es. Las apps de running existentes suelen asumir un nivel físico mínimo que un principiante real no tiene. Stride es una app mobile de entrenamiento para personas que nunca corrieron o están en una etapa muy inicial — genera un plan de entrenamiento personalizado y progresivo a partir de la meta, el nivel actual y la disponibilidad de días del usuario.",
      },
      process: {
        heading: "Proceso",
        body: "Research y benchmarking sobre seis apps de running líderes mediante auto-testing grabado, arquitectura de la información, wireframes de baja y alta fidelidad, un sistema de diseño completo y un prototipo funcional en React Native — con agentes de IA a cargo de gran parte de la ejecución repetitiva.",
      },
      decisions: {
        heading: "Decisiones clave",
        body: "Una sola pantalla \"Hoy\" en vez de tabs separados de plan/entrenamiento, revelación progresiva de la navegación en vez de mostrar todo de entrada, y 30 días de uso completo gratis en vez de un paywall inmediato.",
      },
      result: {
        heading: "Resultado",
        body: "Un prototipo funcional real — no solo pantallas navegables — deployado como demo web en GitHub Pages, que genera y persiste un plan de entrenamiento personalizado a partir de las respuestas del onboarding.",
      },
    },
    caseStudyBlocks: [
      {
        type: "hero",
        title: "Stride",
        subtitle:
          "Una app de entrenamiento para corredores principiantes que nunca corrieron — sin planes para elegir, sin vocabulario técnico, sin abrumar.",
        images: [
          { src: "/projects/stride/hero-welcome.png", alt: "Pantalla de bienvenida de la app Stride" },
        ],
        watermark: { src: "/projects/stride/logo-full.png", alt: "Logo de Stride" },
        deviceFrame: true,
        meta: [],
        tags: ["UX/UI · producto", "Research + IA", "React Native / Expo"],
      },
      {
        type: "stride-problem",
        heading: "01 · El problema",
        subheading:
          "Correr parece simple, pero empezar no lo es. Las apps de running existentes suelen asumir un nivel físico mínimo que un principiante real no tiene: piden elegir entre planes, usan vocabulario técnico y separan el plan de entrenamiento de la acción de salir a correr.",
        bullets: [
          "Asumen una base física que un principiante real no tiene",
          "Usan vocabulario técnico sin explicarlo (pace, splits, cadencia)",
          "Separan el plan de entrenamiento de la acción de salir a correr",
        ],
        callout:
          "Personas que nunca corrieron, sin vocabulario técnico, que necesitan objetivos chicos y alcanzables para no abandonar.",
        compareLabels: { generic: "Apps de running típicas", stride: "Stride" },
      },
      {
        type: "research",
        heading: "02 · Research",
        subheading:
          "Para validar el problema se estudió a los principiantes absolutos frente a seis apps de running líderes, combinando desk research con auto-testing grabado: se simuló el onboarding de cada app en primera persona, en el rol de alguien que nunca corrió.",
        competitors: [
          { name: "5K Runner", logo: "/projects/stride/logos/5k-runner.jpeg" },
          { name: "Nike Run Club", logo: "/projects/stride/logos/nike-run-club.png" },
          { name: "Strava", logo: "/projects/stride/logos/strava.png" },
          { name: "Runna", logo: "/projects/stride/logos/runna.webp" },
          { name: "Adidas Running", logo: "/projects/stride/logos/adidas-running.webp" },
          { name: "Zombies Run", logo: "/projects/stride/logos/zombies-run.png" },
        ],
        chartTitle: "TIEMPO HASTA ALGO ACCIONABLE (auto-testing grabado)",
        chartBars: [
          { label: "Adidas Running", caption: "56s", percent: 43, category: "noplan" },
          { label: "Zombies Run", caption: "94s", percent: 72, category: "workout" },
          { label: "Runna", caption: "99s", percent: 76, category: "paywall" },
          { label: "Nike Run Club", caption: "115s", percent: 88, category: "noplan" },
          { label: "Strava", caption: "116s", percent: 89, category: "noplan" },
          { label: "5K Runner", caption: "131s", percent: 100, category: "paywall" },
        ],
        legend: {
          workout: "entrenamiento real y accionable",
          paywall: "termina en paywall",
          noplan: "termina sin ningún plan",
        },
        insights: [
          "5K Runner es la única que pregunta la capacidad real en términos simples — pero esconde todo detrás de un paywall inmediato.",
          "Runna evalúa nivel y objetivo, pero 9 de 10 opciones asumen que ya corrés — \"empezar de cero\" no es una opción de primera clase.",
          "Nike Run Club, Strava y Adidas Running nunca preguntan sobre capacidad física antes de arrancar.",
          "Zombies Run da un entrenamiento real en el onboarding, pero sin chequear si corresponde, con un salto fuerte en la semana 3.",
        ],
        quote:
          "El patrón correcto ya existe y funciona en al menos un competidor — pero siempre viene atado a una fricción que lo anula. Ahí está el espacio libre para Stride.",
      },
      {
        type: "benchmarking-dimensions",
        heading: "03 · Benchmarking",
        subheading:
          "Sobre el mismo set de apps se analizó, además del onboarding, la navegación, la estructura de planes y el checkout.",
        competitors: [
          { name: "5K Runner", logo: "/projects/stride/logos/5k-runner.jpeg" },
          { name: "Runna", logo: "/projects/stride/logos/runna.webp" },
          { name: "Strava", logo: "/projects/stride/logos/strava.png" },
          { name: "Adidas Running", logo: "/projects/stride/logos/adidas-running.webp" },
          { name: "Zombies Run", logo: "/projects/stride/logos/zombies-run.png" },
          { name: "Nike Run Club", logo: "/projects/stride/logos/nike-run-club.png" },
        ],
        dimensions: [
          {
            title: "Navegación",
            text: "Nike y Strava separan \"tu plan\" de \"correr ahora\" en tabs distintas. Runna acierta con su tab \"Today\" — la única idea del set que vale la pena tomar.",
          },
          {
            title: "Planes",
            text: "Ninguna app ajusta la progresión según cómo le fue realmente al usuario. Todas escalan por calendario, no por evidencia real.",
          },
          {
            title: "Checkout",
            text: "La fricción de pago es tan determinante como la de onboarding: las 2 apps que mejor entienden a su usuario son las que más rápido piden tarjeta.",
          },
        ],
        table: {
          columns: ["App", "Precio", "Capa gratuita real"],
          rows: [
            ["5K Runner", "US$49,99 de por vida", "No — 7 días de trial"],
            ["Runna", "US$19,99/mes", "No"],
            ["Strava", "US$11,99/mes", "Sí, sin planes estructurados"],
            ["Adidas Running", "US$9,99/mes", "Sí, tracking básico"],
            ["Zombies Run", "US$6,99/mes", "3 semanas gratis de contenido real"],
            ["Nike Run Club", "Gratis", "Sí, sin sugerencia de plan"],
          ],
        },
        callout:
          "Con esa base, Stride define su modelo de acceso: 30 días de uso completo sin ningún aviso de \"prueba gratis\", y luego un pago único y bajo para continuar.",
      },
      {
        type: "architecture-sitemap",
        heading: "04 · Arquitectura de la información",
        subheading:
          "Una sola pantalla central (\"Hoy\") resuelve la pregunta \"¿qué me toca hoy?\". El onboarding numerado tiene 6 pasos (meta → punto de partida → disponibilidad → proyección → plan generado → cuenta), y la navegación se revela de forma progresiva para no abrumar desde el día uno.",
        startLabel: "Inicio",
        onboardingLabel: "Onboarding",
        onboardingSub: "6 pasos",
        navItems: [
          { label: "Hoy", sub: "entrenamiento de hoy", highlight: true },
          { label: "Progreso", sub: "racha + historial" },
          { label: "Logros", sub: "próximo logro" },
          { label: "Perfil", sub: "cuenta y ajustes" },
        ],
        subflowLabel: "Entrenamiento",
        subflowSub: "activo · sub-flujo",
      },
      {
        type: "wireframe-filmstrip",
        heading: "05 · Wireframes de baja fidelidad",
        subheading:
          "Se transcribieron 21 pantallas en escala de grises, sin bordes redondeados y sin componentes de diseño — un paso deliberadamente simple, enfocado en validar contenido, layout y flujo antes de invertir en estética visual.",
        cardWidth: 252, // 210 * 1.2
        screens: [
          { caption: "Meta", image: { src: "/projects/stride/wireframes-lofi/a2-meta.jpg", alt: "Wireframe de baja fidelidad: pantalla de selección de meta del onboarding" } },
          { caption: "Cuenta", image: { src: "/projects/stride/wireframes-lofi/a7-cuenta.jpg", alt: "Wireframe de baja fidelidad: pantalla de creación de cuenta del onboarding" } },
          { caption: "Hoy", image: { src: "/projects/stride/wireframes-lofi/b1-hoy.jpg", alt: "Wireframe de baja fidelidad: pantalla Hoy con el entrenamiento del día" } },
          { caption: "Mi plan", image: { src: "/projects/stride/wireframes-lofi/b2-mi-plan.jpg", alt: "Wireframe de baja fidelidad: pantalla Mi plan con el desglose semanal" } },
          { caption: "Pausa", image: { src: "/projects/stride/wireframes-lofi/c3-pausa.jpg", alt: "Wireframe de baja fidelidad: modal de entrenamiento en pausa" } },
        ],
      },
      {
        type: "design-system",
        heading: "06 · Sistema de diseño",
        subheading:
          "Sistema completo construido en Figma, verificado contra WCAG AA. Plus Jakarta Sans como tipografía principal y JetBrains Mono para valores numéricos — usadas solo dentro de este panel, no en el resto del sitio. Modo oscuro, con verde lima como acento de marca.",
        stats: [
          { value: "25", label: "componentes" },
          { value: "8", label: "secciones" },
          { value: "62", label: "variables" },
          { value: "12", label: "estilos de texto" },
        ],
        typeSpecimen: [
          { sample: "¿Listo para hoy?", meta: "Display · 30 / 800", size: 30, weight: 800 },
          { sample: "Trote con intervalos", meta: "Heading · 20 / 700", size: 20, weight: 700 },
          { sample: "20 min · método C25K", meta: "Body · 15 / 500", size: 15, weight: 500 },
          { sample: "SEMANA 1 DE 4", meta: "Caption mono · 12 / 600", size: 12, weight: 600, mono: true },
        ],
        sectionLabels: { colorAccent: "COLOR · ACENTO", colorSurfaces: "COLOR · SUPERFICIES", tintOpacity: "14% opacidad" },
        componentLabels: {
          primaryButton: "Reanudar entrenamiento",
          pillBadge: "Entrenamiento de hoy",
          statValue: "0 días",
          statLabel: "racha actual",
          achievementTitle: "Primer km",
          achievementLocked: "5 km",
          dangerAction: "Eliminar cuenta",
          navItems: ["Hoy", "Progreso", "Logros", "Perfil"],
          textFieldLabel: "Objetivo de distancia",
          textFieldPlaceholder: "Ingresá tu objetivo",
          dayInitials: ["L", "M", "X", "J", "V", "S", "D"],
          statusBadges: ["Descanso", "Actual", "+2 km"],
          dateFieldLabel: "Fecha de inicio",
          dateFieldValue: "12 mar 2026",
          statGrid: [
            { value: "12", label: "km esta semana" },
            { value: "3h 20m", label: "tiempo total" },
          ],
          textFieldFilledValue: "5 km",
          textFieldErrorValue: "0 km",
          textFieldErrorMessage: "Ingresá un número mayor a 0",
        },
      },
      {
        type: "wireframe-filmstrip",
        heading: "07 · Wireframes de alta fidelidad",
        subheading:
          "Las 21 pantallas del MVP se reconstruyeron usando instancias reales de los componentes del sistema de diseño (no elementos sueltos que solo imitan su apariencia), reemplazando la escala de grises por los tokens de color, tipografía y espaciado definitivos. Flujo: Onboarding → Hoy → Entrenamiento activo → Progreso → Perfil.",
        cardWidth: 184, // más angosto que el default (210) para que 7 pantallas queden 4 + 3, no 3 + 3 + 1
        cardFill: true, // ambas filas comparten el mismo ancho de columna; la primera fila completa ocupa el 100%
        screens: [
          { caption: "Meta", image: { src: "/projects/stride/wireframes-hifi/a2-meta.png", alt: "Pantalla de alta fidelidad: selección de meta del onboarding" } },
          { caption: "Cuenta", image: { src: "/projects/stride/wireframes-hifi/a7-cuenta.png", alt: "Pantalla de alta fidelidad: creación de cuenta del onboarding" } },
          { caption: "Hoy", image: { src: "/projects/stride/wireframes-hifi/b1-hoy.png", alt: "Pantalla de alta fidelidad: Hoy, con el entrenamiento del día" } },
          { caption: "Entrenamiento activo · Pausa", image: { src: "/projects/stride/wireframes-hifi/c3-pausa.png", alt: "Pantalla de alta fidelidad: entrenamiento activo en pausa" } },
          { caption: "Progreso", image: { src: "/projects/stride/wireframes-hifi/b2-progreso.png", alt: "Pantalla de alta fidelidad: Progreso, con racha e historial" } },
          { caption: "Logros", image: { src: "/projects/stride/wireframes-hifi/b3-logros.png", alt: "Pantalla de alta fidelidad: Logros" } },
          { caption: "Perfil", image: { src: "/projects/stride/wireframes-hifi/b4-perfil.png", alt: "Pantalla de alta fidelidad: Perfil" } },
        ],
      },
      {
        type: "development",
        heading: "08 · Desarrollo",
        subheading:
          "El prototipo se construyó en React Native + Expo, con TypeScript y NativeWind como capa de estilos, incorporando la tipografía de marca vía Google Fonts. El proyecto se scaffoldeó desde cero implementando el sistema de diseño completo (tokens, componentes y logo) directamente en código.",
        body: "El resultado es un prototipo funcional real, no solo pantallas navegables: genera el plan de entrenamiento a partir de las respuestas del onboarding y persiste los datos del usuario.",
        stack: ["React Native", "Expo", "TypeScript", "NativeWind"],
        terminalLines: [
          { kind: "comment", text: "// proyecto scaffoldeado desde cero" },
          { kind: "prompt", text: "implementar sistema de diseño completo" },
          { kind: "comment", text: "// tokens, componentes, tipografía de marca" },
          { kind: "prompt", text: "deploy → GitHub Pages" },
        ],
        prototypeLabel: "Prototipo funcional",
        prototypeHref: "https://fmicieli.github.io/stride/",
        videoPendingLabel: "video de navegación pendiente de subir",
      },
      {
        type: "ai-agents",
        heading: "09 · Uso de agentes de IA",
        subheading:
          "Buena parte del trabajo de ejecución de este proyecto se hizo con agentes de IA (principalmente Claude Code, en algunos casos con acceso de escritura al archivo de Figma).",
        aiLabel: "hizo la IA",
        aiItems: [
          "Síntesis del research y benchmarking",
          "Construcción del catálogo completo de componentes y tokens",
          "Transcripción de los wireframes de baja y alta fidelidad",
          "Scaffolding del prototipo funcional",
        ],
        humanLabel: "quedó 100% humano",
        humanItems: [
          "Dirección de producto y de marca",
          "Criterio sobre qué combinaciones de entrenamiento son seguras para un principiante",
          "Decisiones de arquitectura de la información",
          "Validación de que el trabajo del agente fuera correcto (instancias reales, no copias sueltas)",
        ],
        note: "Delegar la ejecución repetitiva a los agentes, reservando el criterio para las decisiones, redujo de forma considerable el tiempo total del proceso frente a hacerlo íntegramente a mano.",
      },
      {
        type: "next-steps",
        heading: "10 · Próximos pasos",
        subheading: "Este proceso no incluyó todavía testing con usuarios reales. Los pasos siguientes son:",
        phases: [
          { title: "Testear", items: ["Testear el flujo completo con principiantes reales."] },
          { title: "Recopilar feedback", items: ["Recopilar feedback sobre los puntos de fricción encontrados."] },
          { title: "Iterar", items: ["Iterar el onboarding, el plan y la navegación en base a esos hallazgos."] },
        ],
      },
    ],
  },
  {
    slug: "bbva-frances",
    title: "Rediseño de la app de BBVA Francés",
    tagline:
      "Simplificar la pantalla de inicio y el flujo de transferencias para mejorar la experiencia de banca móvil.",
    tags: ["Investigación UX", "Móvil", "Fintech"],
    coverImage: "/projects/bbva-frances/cover.png",
    coverAlt: "Pantallas del rediseño de la app de BBVA Francés",
    behanceUrl: "https://www.behance.net/gallery/243625059/BBVA-Francs-Caso-de-Estudio",
    contentReady: true,
    sections: {
      context: {
        heading: "Contexto y problema",
        body: "La app de BBVA Argentina resolvía una transferencia en 6 pasos, con información dispersa en la pantalla de inicio y fricción para encontrar las acciones más frecuentes. Este fue un rediseño no solicitado: un ejercicio autodirigido para explorar cómo simplificar el flujo sin acceso al equipo de producto real, partiendo de una investigación heurística sobre la app publicada.",
      },
      process: {
        heading: "Proceso",
        body: "Una evaluación heurística (Nielsen) de la app actual, mapeo paso a paso del flujo de transferencias, identificación de puntos de fricción y repriorización de la información de la pantalla de inicio en base a la frecuencia de uso real reportada por los usuarios en investigaciones previas.",
      },
      decisions: {
        heading: "Decisiones clave",
        body: "Se consolidaron los pasos de confirmación redundantes, se adelantó la selección de la cuenta destino al primer paso, y se rediseñó la pantalla de inicio para priorizar los accesos directos a transferencias por sobre el contenido promocional.",
      },
      result: {
        heading: "Resultado",
        body: "El flujo de transferencias pasó de 6 pasos a 3, manteniendo las validaciones de seguridad necesarias y eliminando la fricción de navegación innecesaria.",
      },
    },
    caseStudyBlocks: [
      {
        type: "hero",
        title: "Rediseño de la app de BBVA Francés",
        subtitle:
          "Simplificar la pantalla de inicio y el flujo de transferencias para mejorar la experiencia de banca móvil",
        video: { src: "/projects/bbva-frances/cover-demo.mp4", alt: "Recorrido de la app" },
        watermark: { src: "/projects/bbva-frances/bbva-logo.svg", alt: "BBVA Francés logo" },
        meta: [
          { label: "Rol", value: "Diseñadora UX/UI" },
          { label: "Duración", value: "10 días" },
          { label: "Plataforma", value: "iOS" },
          { label: "Herramientas", value: "Figma, Claude AI" },
        ],
        tags: ["Caso de estudio", "Febrero 2026"],
      },
      {
        type: "problem",
        heading: "Problema",
        subheading: "Qué piensan los usuarios sobre BBVA Francés",
        quotes: [
          "No encuentro cómo transferir dinero",
          "Todo está mezclado, es confuso",
          "No sé cuándo va a llegar mi transferencia",
        ],
        stats: [
          { value: "42%", label: "No encuentran funciones básicas" },
          { value: "80%", label: "Problemas de UX, no técnicos" },
          { value: "#1", label: "Transferencias — punto de dolor" },
        ],
        note: "89 reseñas analizadas — junio 2025 a enero 2026",
      },
      {
        type: "benchmarking",
        heading: "Benchmarking",
        subheading: "Analizamos 4 competidores del mercado argentino",
        note: "Pasos para completar una transferencia",
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
          { name: "Nueva solución", steps: 3, highlight: true },
        ],
      },
      {
        type: "solution",
        heading: "Solución",
        subheading: "Cómo resolvemos los problemas identificados",
        points: [
          {
            number: "1",
            title: "Jerarquía Visual Clara",
            description: "Lo más usado, lo más visible. El saldo y las acciones clave se destacan.",
          },
          {
            number: "2",
            title: "Validación Progresiva",
            description: "Detectar errores temprano para evitar frustración.",
          },
          {
            number: "3",
            title: "Fricción Reducida",
            description: "3 pasos en lugar de 6. Rápido sin sacrificar la seguridad.",
          },
        ],
        annotations: [
          "Saldo destacado con máxima jerarquía visual",
          "Accesos directos priorizados: los más usados, al frente y en el centro",
          "QR en el botón flotante (FAB) para pagos instantáneos",
        ],
        phoneDemo: {
          frameSrc: "/projects/bbva-frances/solution-frame.png",
          frameAlt: "Pantalla de inicio rediseñada",
          scrollSrc: "/projects/bbva-frances/solution-scroll.jpg",
        },
      },
      {
        type: "flow-comparison",
        heading: "Optimización del Flujo de Transferencias",
        subheading: "De 6 pasos confusos a 3 más claros",
        before: [
          { number: "1", label: "Confirmación de cuenta" },
          { number: "2", label: "Selección de destinatario" },
          { number: "3", label: "Confirmación de datos del destinatario" },
          { number: "4", label: "Monto de transferencia" },
          { number: "5", label: "Confirmación de la operación" },
          { number: "6", label: "Confirmación por código SMS" },
        ],
        after: [
          { number: "1", label: "Destinatario" },
          { number: "2", label: "Validación de datos" },
          { number: "3", label: "Monto + cuenta + confirmación" },
        ],
        afterLabel: "Rediseño",
        reductionLabel: "50% de reducción",
        highlights: [
          { title: "Validación temprana", description: "Previene errores antes de que ocurran" },
          { title: "Pasos combinados", description: "Menos fricciones, misma seguridad" },
          { title: "Velocidad + Seguridad", description: "Velocidad sin comprometer la protección" },
        ],
      },
      {
        type: "step-guide",
        heading: "Guía Paso a Paso",
        subheading: "Cómo funciona el nuevo flujo de transferencias",
        steps: [
          {
            number: "1",
            title: "Destinatario",
            bullets: [
              "Un solo campo (Alias/CBU/CVU)",
              "Contactos recientes visibles",
              "Validación automática",
            ],
            images: [
              {
                videoSrc: "/projects/bbva-frances/step-1-recipient-demo.mp4",
                alt: "Grabación de pantalla del paso de destinatario: ingreso de alias/CBU/CVU con validación en vivo",
              },
            ],
          },
          {
            number: "2",
            title: "Confirmación de Datos",
            bullets: [
              "Nombre y banco validados",
              "Muestra el CBU y CUIT completos",
              "Opción de guardar contacto",
            ],
            images: [
              {
                videoSrc: "/projects/bbva-frances/step-2-data-confirmation-demo.mp4",
                alt: "Grabación de pantalla del paso de confirmación de datos: nombre y banco del destinatario validados, CBU y CUIT completos, opción de guardar contacto",
              },
            ],
          },
          {
            number: "3",
            title: "Monto + Origen",
            bullets: [
              "Teclado numérico instantáneo + saldo visible",
              "Selección de cuenta de origen",
              "Botón de confirmar transferencia",
            ],
            images: [
              {
                videoSrc: "/projects/bbva-frances/step-3-amount-source-demo.mp4",
                alt: "Grabación de pantalla del paso de monto: teclado numérico, saldo visible y selección de cuenta de origen",
              },
            ],
          },
          {
            number: "4",
            title: "Éxito",
            bullets: [
              "Estado visual claro",
              "Comprobante disponible",
              "Número de operación, fecha y hora visibles",
            ],
            images: [
              {
                src: "/projects/bbva-frances/step-4-success.png",
                alt: "Pantalla de éxito: estado de confirmación, comprobante, número de operación, fecha y hora",
              },
            ],
          },
        ],
      },
      {
        type: "impact",
        heading: "Diseño con Impacto",
        cards: [
          {
            title: "Validación Progresiva",
            problem: "Errores tardíos en el proceso",
            solution: "Validación en cada paso",
            impact: "Previene la frustración",
          },
          {
            title: "Confirmación Intermedia",
            problem: "Los usuarios transfieren al destino equivocado",
            solution: "Modal con datos completos antes del monto",
            impact: "Revisa al destinatario antes de comprometer el dinero",
          },
          {
            title: "Todo en Una Pantalla",
            problem: "Las pantallas fragmentadas alargan el proceso",
            solution: "Monto + Cuenta + Confirmación en una sola vista",
            impact: "Reduce pasos sin perder claridad",
          },
          {
            title: "Jerarquía Visual en el Inicio",
            problem: "El 42% no encuentra funciones básicas",
            solution: "Saldo destacado + accesos directos priorizados",
            impact: "Acceso inmediato a funciones críticas",
          },
        ],
      },
      {
        type: "next-steps",
        heading: "Qué Sigue",
        subheading: "Próximos pasos del proyecto",
        phases: [
          {
            title: "Fase 1: Validación",
            items: [
              "Testing con 5–8 usuarios",
              "Medir tiempo, errores, satisfacción",
              "Iterar según hallazgos",
            ],
          },
          {
            title: "Fase 2: Expansión",
            items: [
              "Pago de servicios (dolor #2)",
              "Cuenta e historial de transacciones",
              "Gestión de tarjetas",
              "Configuración y perfil",
            ],
          },
          {
            title: "Fase 3: Implementación",
            items: [
              "Documentación",
              "Librería de componentes",
              "Guías de animación y transición",
              "Entrega al equipo dev",
            ],
          },
        ],
        disclaimer:
          "Este es un proyecto personal de rediseño conceptual, creado con fines educativos y de portfolio. No tengo afiliación con BBVA Francés, ni fui contratada por la empresa para realizar este trabajo. Todas las propuestas y diseños son hipotéticos y no representan planes oficiales de BBVA. Las marcas, logos y nombres comerciales que se muestran son propiedad de sus respectivos dueños y se utilizan únicamente con fines ilustrativos en este caso de estudio.",
      },
    ],
  },
  {
    slug: "tribu-music",
    title: "Tribu Music",
    tagline: "Una app móvil que conecta personas a través de la música en vivo.",
    tags: ["Diseño de Producto", "UI"],
    coverImage: "/projects/tribu-music/cover.png",
    coverAlt: "Portada del caso de estudio de Tribu Music, con el logo de la app y la pantalla de inicio",
    behanceUrl: "https://www.behance.net/gallery/241107187/Tribu-Music-Caso-de-estudio",
    contentReady: true,
    sections: {
      context: {
        heading: "Contexto y problema",
        body: "Tribu Music es una aplicación móvil diseñada para conectar personas a través de la música en vivo: descubrir recitales y eventos cercanos, y conectar con otros usuarios que comparten intereses musicales similares, a partir de una investigación UX exhaustiva sobre los pain points de quienes asisten a shows en vivo.",
      },
      process: {
        heading: "Proceso",
        body: "Mapeo de happy path, sketches de baja fidelidad digitalizados en wireframes, un sistema de grilla y espaciado definido, wireframes de media fidelidad con Material Design 3, testeo de usabilidad presencial con 5 usuarios y un UI Kit completo antes de las pantallas finales de alta fidelidad.",
      },
      decisions: {
        heading: "Decisiones clave",
        body: "Se reemplazó el ambiguo ícono de búsqueda por el logo de la marca como ancla del inicio, se renombró \"Mis gustos musicales\" por el más claro \"Favoritos\", y se reorganizó la jerarquía de acciones en la pantalla de perfil del evento en base a los hallazgos del testeo.",
      },
      result: {
        heading: "Resultado",
        body: "Un prototipo de alta fidelidad conforme a WCAG 2.1 AA con un sistema de diseño completo (color, tipografía, espaciado, componentes), validado mediante testeo de usabilidad con 100% de tasa de éxito en las tareas.",
      },
    },
    caseStudyBlocks: [
      {
        type: "hero",
        title: "Tribu Music",
        subtitle:
          "Una app móvil que conecta personas a través de la música en vivo — descubrí recitales cercanos y conectá con quienes comparten tu gusto musical.",
        images: [
          { src: "/projects/tribu-music/hero-discover-screen.png", alt: "Pantalla Descubrir de la app Tribu Music" },
        ],
        mockupRadius: "9px",
        watermark: { src: "/projects/tribu-music/tribu-logo-white.svg", alt: "Tribu Music logo" },
        meta: [
          { label: "Rol", value: "Diseñadora UX/UI" },
          { label: "Programa", value: "Talento Tech" },
          { label: "Fecha", value: "Diciembre 2025" },
        ],
        tags: ["Caso de estudio", "Diciembre 2025"],
      },
      {
        type: "context",
        heading: "01 · Contexto",
        subheading: "Research, benchmarking y usuario objetivo",
        intro:
          "Tribu Music es una aplicación móvil diseñada para conectar personas a través de la música en vivo. La app permite descubrir recitales y eventos musicales cercanos, y facilita la conexión entre usuarios que comparten intereses musicales similares.",
        insightsHeading: "Insights principales del research:",
        insights: [
          "Los usuarios buscan información consolidada sobre recitales cercanos",
          "Existe una necesidad de conectar con otras personas antes del evento",
          "La compra de entradas debe ser accesible y visible",
          "Los usuarios valoran la posibilidad de coordinar asistencia con grupos",
        ],
        researchHeading: "Research Inicial",
        researchText:
          "El proyecto partió de un proceso de investigación UX exhaustivo realizado por el equipo de research, que identificó las necesidades y pain points de usuarios que asisten a eventos musicales.",
        benchmarkingHeading: "Benchmarking",
        benchmarkingColumns: ["Apps", "Fortalezas", "Debilidades"],
        benchmarkingRows: [
          {
            app: "Spotify",
            logo: "/projects/tribu-music/logos/app-spotify.png",
            strengths:
              "Utiliza tu información de Spotify para recomendarte recitales. Buena variedad de propuestas en Argentina, que incluye desde artistas chicos a grandes.",
            weaknesses:
              "La función de recitales es difícil de encontrar, entre tanto contenido. La versión paga limita el uso y no ofrece buscador ni filtro de los recitales, solo es en base a lo recomendado.",
          },
          {
            app: "App de descubrimiento de recitales",
            logo: "/projects/tribu-music/logos/app-b.png",
            strengths:
              "Se puede vincular con tu cuenta de Spotify, Amazon o Apple. Variedad de propuestas en Argentina (artistas grandes y medianos). Filtro por género, ubicación, entre otras.",
            weaknesses:
              "Navegar la app puede resultar confuso, como también las funciones de ciertos botones. Es confusa la sección del perfil y sus funciones.",
          },
          {
            app: "App social de eventos",
            logo: "/projects/tribu-music/logos/app-c.png",
            strengths:
              "Chats de eventos a los que vas a asistir, que permiten conectar con gente que va al mismo evento. Además se pueden subir fotos del show.",
            weaknesses:
              "Varios errores en el funcionamiento de la app. La propuesta en Argentina es casi nula y el recorrido de la app es confuso por la cantidad de información dispuesta, sin jerarquía.",
          },
        ],
        benchmarkingCtaLabel: "Ver benchmarking completo",
        persona: {
          name: "Victoria Rodríguez",
          quote: "Descubre el mundo, descubre tu interior.",
          photo: { src: "/projects/tribu-music/victoria-rodriguez.jpg", alt: "Victoria Rodríguez" },
          fields: [
            { label: "Edad", value: "25 años" },
            { label: "Género", value: "Femenino" },
            { label: "Ubicación", value: "Avellaneda, GBA" },
            { label: "Estado civil", value: "Soltera" },
            { label: "Ocupación", value: "Tatuadora" },
          ],
          justificacionLabel: "Justificación",
          justificacion:
            "Tiene interés de querer presenciar música en vivo y conocer más sobre la movida musical emergente de Argentina. Está en plena juventud y pertenece a la generación nativo-digital.",
          bioLabel: "Biografía",
          bio: "Victoria hace unos meses que trabaja en su nuevo estudio privado haciendo tatuajes de forma independiente. Actualmente vive con sus padres en zona sur, pero le encanta la movida porteña. Le gusta trabajar e inspirarse a través de la música, siendo esta su acompañante en su vida laboral. Si bien está fascinada con la movida cultural de CABA no siempre llega a enterarse a tiempo y termina perdiéndose de la mayoría de los planes.",
          objetivosLabel: "Objetivos",
          objetivos: [
            "Escuchar más música en vivo y conocer nuevos artistas.",
            "No perderse ningún show de sus bandas favoritas.",
            "No depender de sus amigos o seguidores para enterarse sobre las novedades o propuestas.",
          ],
          motivacionesLabel: "Motivaciones",
          motivaciones: [
            "Poder conectarse con nuevos artistas y géneros musicales.",
            "Sentirse realizada al ver a sus artistas favoritos en vivo.",
            "Inspirarse por las movidas de otros artistas.",
          ],
          frustracionesLabel: "Frustraciones",
          frustraciones: [
            "Perderse el show de un artista y enterarse días después por historias de amigos o gente que sigue.",
            "Dificultad de enterarse de movidas musicales en CABA, por no vivir en la ciudad.",
            "Estar escuchando siempre la misma playlist.",
          ],
          habilidadesLabel: "Habilidades tecnológicas",
          habilidades: "Está familiarizada con las apps. Usa TikTok, Instagram, Twitter y YouTube.",
        },
        personaCtaLabel: "Ver arquetipo completo",
      },
      {
        type: "design-process",
        heading: "02 · Proceso de Diseño",
        subheading: "De los sketches a mano a los wireframes en Material Design 3",
        happyPathHeading: "Happy Path",
        happyPathText:
          "Como primer paso del proceso de diseño, desarrollamos un happy path identificando las 6 vistas mínimas necesarias para el flujo principal de la aplicación.",
        happyPathImages: [
          { src: "/projects/tribu-music/sketch-login.png", alt: "Sketch a mano del inicio de sesión", label: "Inicio de Sesión" },
          { src: "/projects/tribu-music/sketch-community.png", alt: "Sketch a mano de la comunidad", label: "Comunidad" },
          { src: "/projects/tribu-music/sketch-chat.png", alt: "Sketch a mano del chat", label: "Chat" },
          { src: "/projects/tribu-music/sketch-discover.png", alt: "Sketch a mano de descubrir", label: "Descubrir" },
          { src: "/projects/tribu-music/sketch-settings.png", alt: "Sketch a mano de ajustes", label: "Ajustes" },
          { src: "/projects/tribu-music/sketch-profile.png", alt: "Sketch a mano del perfil", label: "Perfil" },
        ],
        digitizationHeading: "Digitalización de Happy Path",
        digitizationText:
          "Como primer paso del proceso de diseño, desarrollamos un happy path identificando las 6 vistas mínimas necesarias para el flujo principal de la aplicación.",
        digitizationImages: [
          { src: "/projects/tribu-music/wireframe-lofi-login.png", alt: "Wireframe de baja fidelidad digitalizado del inicio de sesión", label: "Inicio de Sesión" },
          { src: "/projects/tribu-music/wireframe-lofi-community.png", alt: "Wireframe de baja fidelidad digitalizado de la comunidad", label: "Comunidad" },
          { src: "/projects/tribu-music/wireframe-lofi-chat.png", alt: "Wireframe de baja fidelidad digitalizado del chat", label: "Chat" },
          { src: "/projects/tribu-music/wireframe-lofi-discover.png", alt: "Wireframe de baja fidelidad digitalizado de descubrir", label: "Descubrir" },
          { src: "/projects/tribu-music/wireframe-lofi-settings.png", alt: "Wireframe de baja fidelidad digitalizado de ajustes", label: "Ajustes" },
          { src: "/projects/tribu-music/wireframe-lofi-profile.png", alt: "Wireframe de baja fidelidad digitalizado del perfil", label: "Perfil" },
        ],
        gridHeading: "Sistema de Grilla y Estructura",
        gridText:
          "Antes de avanzar con wireframes de media fidelidad, establecimos un sistema de diseño consistente. Especificaciones técnicas:",
        gridSpecs: [
          { label: "Grilla", value: "4 columnas" },
          { label: "Márgenes", value: "16px" },
          { label: "Calles", value: "8px" },
          { label: "Sistema de espaciado", value: "Tokens definidos (xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px)" },
        ],
        gridDemoImage: {
          src: "/projects/tribu-music/grid-system-demo.png",
          alt: "Grilla superpuesta sobre las pantallas principales de la app mostrando la estructura de 4 columnas con márgenes de 16px",
        },
        midFiHeading: "Wireframes de Media Fidelidad",
        midFiText:
          "Desarrollamos wireframes de media fidelidad incorporando patrones de diseño de Material Design 3. En esta etapa agregamos todas las pantallas necesarias para crear un prototipo interactivo apto para testeo de usuarios.",
        midFiImages: [
          { src: "/projects/tribu-music/wireframe-midfi-login.png", alt: "Wireframe de media fidelidad del inicio de sesión", label: "Inicio de Sesión" },
          { src: "/projects/tribu-music/wireframe-midfi-community.png", alt: "Wireframe de media fidelidad de la comunidad", label: "Comunidad" },
          { src: "/projects/tribu-music/wireframe-midfi-chat.png", alt: "Wireframe de media fidelidad del chat", label: "Chat" },
          { src: "/projects/tribu-music/wireframe-midfi-discover.png", alt: "Wireframe de media fidelidad de descubrir", label: "Descubrir" },
          { src: "/projects/tribu-music/wireframe-midfi-settings.png", alt: "Wireframe de media fidelidad de ajustes", label: "Ajustes" },
          { src: "/projects/tribu-music/wireframe-midfi-event.png", alt: "Wireframe de media fidelidad del perfil del evento", label: "Perfil del Evento" },
        ],
      },
      {
        type: "usability-test",
        heading: "03 · Testeo de Usabilidad",
        subheading:
          "Realizamos pruebas de usabilidad presenciales con 5 usuarios de 25 a 35 años — 100% de éxito en las tareas",
        tasks: [
          "Buscar el recital de Bad Bunny usando el buscador e ir al canal de personas que van al evento",
          "Ir al chat de Juan Pérez, una de las personas con las que conectaste anteriormente",
          "Acceder a la sección de ajustes dentro de la app",
          'Ir a la sección "Mis gustos musicales"',
        ],
        resultsHeading: "Resultados Cualitativos",
        resultsTable: {
          columns: ["Tareas", "Tasa de éxito", "Tiempo Promedio", "Clicks promedio", "Rango de tiempo"],
          rows: [
            ["Registrarse en la app", "100%", "00:08", "3,6", "00:05 - 00:15"],
            ["Buscar recital e ir al canal del evento", "100%", "00:10", "4,2", "00:08 - 00:12"],
            ["Ir al chat de Juan Perez", "100%", "00:17", "7,2", "00:05 - 00:54"],
            ['Sección "Ajustes"', "100%", "00:04", "1,2", "00:01 - 00:12"],
            ['Sección "Mis gustos musicales"', "100%", "00:09", "3,2", "00:04 - 00:26"],
          ],
        },
        viewAllLabel: "Ver más",
        findingsHeading: "Hallazgos clave",
        findings: [
          "Tasa de éxito: 100%",
          "Eficiencia comprometida: alta variabilidad en tiempo y clicks",
          "Satisfacción: sólo 40% completó sin confusión, 60% reportó dificultades",
        ],
        analysisHeading: "Análisis",
        analysis: [
          {
            title: "Confusión con el ícono de búsqueda:",
            text: "los usuarios no comprendían si el ícono de búsqueda representaba el inicio de la aplicación, generando desorientación en la navegación principal",
          },
          {
            title: 'Ambigüedad en "Mis gustos musicales":',
            text: "la etiqueta resultaba poco clara y no comunicaba efectivamente su función, contribuyendo a la alta variabilidad del tiempo (4 a 26 segundos) y clicks (2 a 8)",
          },
          {
            title: "Ausencia de CTA de compra:",
            text: "varios usuarios preguntaron explícitamente cómo comprar entradas, evidenciando que esta función no estaba suficientemente accesible o visible",
          },
        ],
        surveyHeading: "Resultados de la Encuesta",
        surveyCharts: [
          {
            question: "¿Pudiste completar todas las tareas de la app?",
            slices: [
              { label: "Sin problema", value: 60 },
              { label: "Algunas confusiones", value: 40 },
            ],
          },
          {
            question: "¿Cómo fue la experiencia de conectar con otras personas dentro de la app?",
            slices: [
              { label: "Muy Buena", value: 20 },
              { label: "Mala", value: 20 },
              { label: "Neutral", value: 20 },
              { label: "Buena", value: 40 },
            ],
          },
          {
            question: "¿Sentís que la app ofrece las funciones necesarias para encontrar recitales y conectar con otros usuarios?",
            slices: [
              { label: "Completamente", value: 40 },
              { label: "En parte", value: 60 },
            ],
          },
        ],
        improvementsHeading: "Mejoras Implementadas",
        improvementsIntro: "Basándonos en los hallazgos del testeo, implementamos las siguientes mejoras en el diseño:",
        improvements: [
          "Reemplazo del ícono de búsqueda por el logo de la marca. De esta manera se identifica claramente la pantalla de inicio, estableciendo un punto de partida de la navegación y reforzando la identidad visual.",
          'Cambio de "Mis gustos musicales" a "Favoritos": reemplazándolo por una nomenclatura más universal y concisa que reduce la carga cognitiva.',
          "Reorganización de la jerarquía de acciones en el perfil de recital",
        ],
        beforeAfterHeading: "Antes / Después",
        beforeAfterPairs: [
          {
            label: "Ícono de la pantalla de inicio",
            before: { src: "/projects/tribu-music/before-search-icon.png", alt: "Antes: ícono de búsqueda usado como ícono de la pestaña de inicio" },
            after: { src: "/projects/tribu-music/after-search-icon.png", alt: "Después: logo de la marca usado como ícono de la pestaña de inicio" },
          },
          {
            label: 'Etiqueta de ajustes ("Mis gustos musicales" → "Favoritos")',
            before: { src: "/projects/tribu-music/before-mis-gustos.png", alt: 'Antes: lista de ajustes mostrando "Mis gustos musicales"' },
            after: { src: "/projects/tribu-music/after-favoritos.png", alt: 'Después: lista de ajustes mostrando "Favoritos"' },
          },
          {
            label: "Jerarquía de acciones del perfil del evento",
            before: { src: "/projects/tribu-music/before-perfil-recital.png", alt: "Antes: pantalla de perfil del evento con la jerarquía de acciones original" },
            after: { src: "/projects/tribu-music/after-perfil-recital.png", alt: "Después: pantalla de perfil del evento con la jerarquía de acciones reorganizada" },
          },
        ],
      },
      {
        type: "brand-identity",
        heading: "04 · Identidad Visual",
        subheading: "Logo, voz y tono, color, tipografía y espaciado",
        logoHeading: "Logo",
        logoIntro: "Imagotipo combinado (símbolo + tipografía modular) compuesto por:",
        logoBullets: [
          "Barras de frecuencia: representan la música como dato visual — formas simples y redondeadas que escalan sin problema",
          "Tipografía Barlow Condensed Extrabold: cuenta con una presencia moderna característica de carteles de festivales y posee legibilidad en espacios reducidos",
          "Color violeta: transmite creatividad, energía nocturna y experiencia premium",
        ],
        logoHorizontal: { src: "/projects/tribu-music/logo-horizontal.svg", alt: "Lockup horizontal del logo de Tribu Music" },
        logoVertical: { src: "/projects/tribu-music/logo-vertical.svg", alt: "Lockup vertical del logo de Tribu Music" },
        voiceHeading: "Voz y Tono",
        voiceTitle: "Voz de la marca:",
        voiceBullets: [
          "Participativa y clara: contenido empático que facilita la interacción",
          "Simple: cualquier persona entiende el contenido, independientemente de su procedencia o nivel educativo",
        ],
        toneTitle: "Tono:",
        toneBullets: [
          'Cercano y amigable: uso del "vos" para denotar cercanía manteniendo el respeto',
          "Corto y directo: redacción concisa que facilita encontrar y resolver rápidamente",
          "Mensaje de valor agregado: comunicar beneficios desde el inicio",
        ],
        colorHeading: "Sistema de Color",
        colorSwatches: [
          { name: "Primario", hex: "#121212" },
          { name: "Secundario", hex: "#FAFAFA" },
          { name: "Acento", hex: "#D4B5FF" },
        ],
        colorUsageTitle: "Aplicación en UI:",
        colorUsageBullets: [
          "Acción principal: fondo violeta, texto negro",
          "Acción complementaria: fondo transparente, borde y texto blanco",
          "Acción terciaria (ghost): fondo transparente, borde y texto violeta",
        ],
        colorAccessibilityTitle: "Accesibilidad:",
        colorAccessibilityBullets: [
          "Texto primario (blanco / negro): 18.5:1",
          "Texto secundario (70% opacidad): 7.8:1",
          "Botón primario (negro / violeta): 8.2:1",
          "Icono activo (violeta / negro): 4.9:1",
        ],
        viewAllLabel: "Ver más",
        typographyHeading: "Tipografía",
        fontFamiliesTitle: "Familia tipográfica:",
        fontFamilies: [
          "Primaria: Roboto (UI, cuerpo de texto)",
          "Alternativa: Open Sans (fallback)",
          "Logo: Barlow Condensed (solo para marca)",
        ],
        typeScaleTitle: "Escala tipográfica:",
        typeScaleTable: {
          columns: ["Uso", "Tamaño", "Peso", "Line Height"],
          rows: [
            ["H1", "28 px", "Extrabold", "36 px"],
            ["H2", "22 px", "Bold", "28 px"],
            ["H3", "18 px", "Medium", "24 px"],
            ["Body Grande", "16 px", "Regular", "24 px"],
            ["Body Mediano", "14 px", "Regular", "20 px"],
            ["Body Pequeño", "12 px", "Regular", "16 px"],
            ["Button", "16 px", "Bold", "Auto"],
          ],
        },
        iconographyHeading: "Iconografía",
        iconSpecsTitle: "Especificaciones:",
        iconSpecs: [
          "Color primario: violeta para acciones destacadas",
          "Color secundario: blanco (70%) para navegación",
          "Tamaños estándar: 24 px, 30 px, 34 px",
        ],
        iconUsageTitle: "Uso del color:",
        iconUsageBullets: [
          "Íconos de navegación activos: violeta",
          "Íconos de navegación inactivos: blanco (38%)",
          "Íconos informativos: blanco (70%)",
        ],
        spacingHeading: "Espaciado y Layout",
        spacingTitle: "Escala de espaciado:",
        spacingTable: {
          columns: ["Token", "Valor", "Uso"],
          rows: [
            ["xs", "4 px", "Espaciado mínimo"],
            ["sm", "8 px", "Entre elementos relacionados"],
            ["md", "16 px", "Espaciado estándar"],
            ["lg", "24 px", "Entre secciones"],
            ["xl", "32 px", "Separación entre bloques"],
          ],
        },
        radiusTitle: "Radios de borde:",
        radiusTable: {
          columns: ["Elemento", "Radio"],
          rows: [
            ["Botones", "25 px (completamente redondeado)"],
            ["Botones ícono", "8 px"],
            ["Cards", "12 px"],
            ["Modales", "16 px"],
            ["Inputs", "8 px"],
            ["Chips", "16 px"],
            ["Tags", "16 px"],
          ],
        },
      },
      {
        type: "ui-kit",
        heading: "05 · UI Kit y Componentes",
        subheading: "Todos los componentes y estados, listos para alta fidelidad",
        intro:
          "Desarrollamos un UI Kit completo con todos los componentes necesarios para la implementación en alta fidelidad, incluyendo todos sus estados:",
        groups: [
          {
            title: "Campos de Texto",
            images: [
              {
                src: "/projects/tribu-music/uikit-textfields.png",
                alt: "Estados del campo de texto: predeterminado, enfocado, error, completado, deshabilitado",
                label: "Predeterminado / Enfocado / Error / Completado / Deshabilitado",
              },
            ],
          },
          {
            title: "Tarjetas",
            images: [
              { src: "/projects/tribu-music/uikit-cards-1.png", alt: "Estados del componente de tarjeta", label: "Predeterminado / Hover / Presionado" },
              { src: "/projects/tribu-music/uikit-cards-2.png", alt: "Estados del componente de tarjeta, layout alternativo", label: "Predeterminado / Hover / Presionado" },
            ],
          },
          {
            title: "Barra Superior",
            images: [{ src: "/projects/tribu-music/uikit-topbar.png", alt: "Componente de barra superior", label: "Barra Superior" }],
          },
          {
            title: "Botones",
            images: [
              { src: "/projects/tribu-music/uikit-btn-primary.png", alt: "Estados del botón primario", label: "Primario — Predeterminado / Hover / Presionado / Deshabilitado" },
              { src: "/projects/tribu-music/uikit-btn-secondary.png", alt: "Estados del botón secundario", label: "Secundario — Predeterminado / Hover / Presionado / Deshabilitado" },
              { src: "/projects/tribu-music/uikit-btn-ghost.png", alt: "Estados del botón ghost", label: "Ghost — Predeterminado / Hover / Presionado / Deshabilitado" },
              { src: "/projects/tribu-music/uikit-btn-error.png", alt: "Estados del botón de error", label: "Error — Predeterminado / Hover / Presionado / Deshabilitado" },
              { src: "/projects/tribu-music/uikit-btn-textlink.png", alt: "Estados del botón de texto/enlace", label: "Enlace de Texto — Predeterminado / Hover / Presionado / Deshabilitado" },
              { src: "/projects/tribu-music/uikit-btn-icon.png", alt: "Estados del botón de ícono", label: "Botón Ícono — Predeterminado / Enfocado" },
            ],
          },
          {
            title: "Barra de Navegación",
            images: [{ src: "/projects/tribu-music/uikit-navbar.png", alt: "Componente de barra de navegación", label: "Barra de Navegación" }],
          },
          {
            title: "Barra de Pestañas",
            images: [{ src: "/projects/tribu-music/uikit-tabbar.png", alt: "Componente de barra de pestañas", label: "Barra de Pestañas" }],
          },
          {
            title: "Item de Lista",
            images: [{ src: "/projects/tribu-music/uikit-listitem.png", alt: "Componente de item de lista", label: "Item de Lista" }],
          },
          {
            title: "Burbujas de Chat",
            images: [{ src: "/projects/tribu-music/uikit-chatbubbles.png", alt: "Componentes de burbujas de chat", label: "Burbujas de Chat" }],
          },
        ],
      },
      {
        type: "prototype",
        heading: "06 · Prototipo de Alta Fidelidad",
        subheading: "Mejoras del testeo aplicadas a las pantallas finales",
        intro: "Las mejoras identificadas en el testing fueron implementadas en la versión de alta fidelidad, donde aplicamos:",
        bullets: [
          "Paleta de colores definitiva",
          "Tipografías según sistema establecido",
          "Componentes del UI Kit",
          "Interacciones y microanimaciones",
          "Estados de todos los elementos",
        ],
        screens: [
          { src: "/projects/tribu-music/hifi-screen-login.png", alt: "Pantalla de alta fidelidad de inicio de sesión", label: "Inicio de Sesión" },
          { src: "/projects/tribu-music/hifi-screen-discover.png", alt: "Pantalla de alta fidelidad de descubrir/inicio", label: "Descubrir" },
          { src: "/projects/tribu-music/hifi-screen-event.png", alt: "Pantalla de alta fidelidad del perfil del evento (Bad Bunny)", label: "Perfil del Evento" },
          { src: "/projects/tribu-music/hifi-screen-channels.png", alt: "Pantalla de alta fidelidad de comunidad/canales", label: "Comunidad" },
          { src: "/projects/tribu-music/hifi-screen-chat.png", alt: "Pantalla de alta fidelidad del chat individual con Juan Perez", label: "Chat" },
          { src: "/projects/tribu-music/hifi-screen-settings.png", alt: "Pantalla de alta fidelidad de ajustes", label: "Ajustes" },
        ],
      },
      {
        type: "accessibility",
        heading: "07 · Accesibilidad",
        subheading: "Cumplimiento WCAG 2.1 AA en todo el diseño",
        intro:
          "El diseño de Tribu Music cumple con los requisitos de accesibilidad WCAG 2.1 nivel AA en todas las áreas aplicables. Áreas verificadas:",
        areas: [
          "Contraste de color",
          "Tamaños de texto",
          "Áreas táctiles",
          "Estados de componentes",
          "Navegación consistente",
          "Formularios accesibles",
        ],
        typographyColorHeading: "Tipografía y Color",
        typographyColorIntro: "Todos los pares de color superan los mínimos requeridos:",
        contrastTable: {
          columns: ["Elemento", "Ratio de Contraste", "Mínimo WCAG", "Estado"],
          rows: [
            ["Texto primario (#FAFAFA / #121212)", "18.5:1", "4.5:1", "✅"],
            ["Texto secundario (70% opacidad)", "7.8:1", "4.5:1", "✅"],
            ["Botón primario (#121212 / #D4B5FF)", "8.2:1", "4.5:1", "✅"],
            ["Icono activo (#D4B5FF / #121212)", "4.9:1", "3:1", "✅"],
            ["Surface elevada (#FAFAFA / #1E1E1E)", "17.2:1", "4.5:1", "✅"],
          ],
        },
        touchHeading: "Áreas Táctiles",
        touchIntro: "Todas las áreas táctiles superan el tamaño mínimo requerido:",
        touchTable: {
          columns: ["Elemento", "Tamaño", "Mínimo AA", "Estado"],
          rows: [
            ["Botones", "48 px de altura", "24x24 px", "✅ Supera AAA"],
            ["Inputs", "56 px de altura", "24x24 px", "✅ Supera AAA"],
            ["Íconos de navegación", "40x40 px área total", "24x24 px", "✅ Supera AAA"],
            ["Cards táctiles", "160x180 px", "24x24 px", "✅ Supera AAA"],
          ],
        },
        formsHeading: "Formularios y Controles",
        formsLabelsTitle: "Etiquetas y mensajes:",
        formsLabelsBullets: [
          "Todos los inputs tienen labels visibles y descriptivas",
          "Labels inmediatamente adyacentes a sus inputs",
          "Mensajes de error con borde rojo + texto descriptivo debajo del input",
          "Placeholders descriptivos y ejemplos claros",
        ],
        formsStatesTitle: "Estados de inputs:",
        formsStatesBullets: ["Estados diferenciados claramente (default, focus, error, success)"],
        resultsHeading: "Resultados de Cumplimiento",
        complianceTable: {
          columns: ["Criterio", "Estado"],
          rows: [
            ["Contraste de color", "Cumple"],
            ["Tamaños de texto", "Cumple"],
            ["Áreas táctiles", "Cumple"],
            ["Estados de componentes", "Cumple"],
            ["Cards táctiles", "Cumple"],
            ["Navegación consistente", "Cumple"],
            ["Formularios accesibles", "Cumple"],
          ],
        },
      },
      {
        type: "closing",
        heading: "Muchas Gracias",
        subheading: "Gracias por seguir este caso de estudio",
        images: [
          { src: "/projects/tribu-music/hifi-screen-discover.png", alt: "Pantalla Descubrir de Tribu Music" },
          { src: "/projects/tribu-music/hifi-screen-event.png", alt: "Pantalla de perfil del evento de Tribu Music" },
          { src: "/projects/tribu-music/hifi-screen-chat.png", alt: "Pantalla de chat de Tribu Music" },
        ],
      },
    ],
  },
  {
    slug: "out",
    title: "Diseño de sección para OUT",
    tagline: "Explorá, reservá y viví experiencias únicas en tu ciudad.",
    tags: ["UI", "Sistema de Diseño"],
    coverImage: "/projects/out/cover.png",
    coverAlt: "Pantalla de reserva de la app OUT para una experiencia de cata de vinos, sobre un mockup de teléfono",
    behanceUrl: "https://www.behance.net/gallery/230515938/Diseno-de-seccion-para-OUT",
    contentReady: false,
    heroImage: {
      src: "/projects/out/hero-experience-profile.jpg",
      alt: "Pantalla de perfil de experiencia de la app OUT para \"Entre Cosechas\", con fotos, detalles y panel de reserva",
    },
    sections: {
      context: {
        heading: "Contexto",
        body: "OUT es una app que te ayuda a encontrar bares y restaurantes únicos en Buenos Aires. Podés explorar por zona, estilo o tipo de experiencia (como terrazas, música en vivo o coctelería). Te muestra toda la información que necesitás para decidir a dónde ir: fotos, contacto, ambiente y más. **Ideal para quienes quieren salir y descubrir lugares diferentes sin perder tiempo buscando.**\n\nEn este proyecto se desarrollo una nueva sección llamada **\"Experiencias\"**, donde se pueden descubrir eventos especiales en los bares destacados, con la posibilidad de reservar y pagar directamente desde la app.\n\nAdemás, se optimizaron los tamaños de tipografías y elementos interactivos, como botones, filtros, etc. para garantizar una mejor visibilidad y usabilidad para todos los usuarios.",
        images: [
          { src: "/projects/out/context-mockup-categories.png", alt: "Pantalla de la app OUT mostrando categorías de lugares: Skybar, Elegante, Temático, Speakeasy, Casual" },
          { src: "/projects/out/context-mockup-home.png", alt: "Pantalla de inicio de la app OUT mostrando un banner de promoción y bares destacados y premiados" },
        ],
      },
      process: { heading: "Proceso", body: "TODO: contenido pendiente" },
      decisions: { heading: "Decisiones clave", body: "TODO: contenido pendiente" },
      result: { heading: "Resultado", body: "TODO: contenido pendiente" },
    },
  },
  {
    slug: "medife-research",
    title: "Investigación Medifé",
    tagline: "Caso de estudio de investigación para Medifé.",
    tags: ["Investigación UX", "Salud"],
    coverImage: null,
    coverAlt: "Material de investigación del proyecto Medifé",
    behanceUrl: "https://www.behance.net/gallery/225357747/Medif-Research-Caso-de-estudio",
    contentReady: false,
    sections: {
      context: { heading: "Contexto y problema", body: "TODO: contenido pendiente" },
      process: { heading: "Proceso", body: "TODO: contenido pendiente" },
      decisions: { heading: "Decisiones clave", body: "TODO: contenido pendiente" },
      result: { heading: "Resultado", body: "TODO: contenido pendiente" },
    },
  },
];
