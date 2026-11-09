// All visible interface copy lives here; content (experience, projects) lives in src/data.
export const languages = { es: 'Español', en: 'English' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'es';

const es = {
  meta: {
    title: 'Juan David Martínez Medina — Desarrollador de Software',
    description:
      'Portafolio de Juan David Martínez Medina, desarrollador de software en Villavicencio, Colombia. Experiencia, proyectos y contacto.',
  },
  a11y: {
    skip: 'Saltar al contenido',
    menuOpen: 'Abrir menú',
    menuClose: 'Cerrar menú',
    language: 'Idioma',
    lightsOff: 'Apagar las luces',
    lightsOn: 'Encender las luces',
    home: 'Inicio, Juan David Martínez Medina',
    newTab: 'se abre en una pestaña nueva',
    main: 'Principal',
  },
  nav: { about: 'Sobre mí', experience: 'Trayectoria', projects: 'Proyectos', contact: 'Contacto' },
  hero: {
    greeting: 'Hola, soy',
    role: 'Desarrollador de Software',
    flipLead: 'Trabajo en',
    flipItems: [
      'Lógica de negocio',
      'Soluciones en la nube',
      'Arquitectura de software',
      'Integración de APIs',
      'Desarrollo de aplicaciones',
      'Diseño de sistemas',
    ],
    summary:
      'Construyo sistemas funcionales, eficientes y bien estructurados, desde el diseño de la solución hasta la interfaz que usa cada persona.',
    location: 'Villavicencio, Colombia',
    cv: 'Descargar CV',
    cvFile: '/pdf/CV_Español.pdf',
    portraitAlt: 'Retrato profesional de Juan David Martínez Medina con traje oscuro de rayas y camisa blanca',
  },
  about: {
    title: 'Sobre mí',
    statement: 'Convierto necesidades reales en software bien diseñado y fácil de mantener.',
    body: [
      'Soy desarrollador de software con experiencia en el desarrollo de aplicaciones y soluciones tecnológicas. Me enfoco en construir sistemas funcionales, eficientes y bien estructurados, y participo en las distintas etapas del desarrollo.',
      'Aprendo rápido, pienso de forma analítica y me adapto con facilidad a nuevas tecnologías. Busco que cada solución responda a una necesidad concreta y que siga siendo clara y mantenible con el tiempo.',
    ],
    figureAlt: 'Juan David Martínez Medina trabajando en su portátil frente a un atril',
    web: 'Tu desarrollador amigable del vecindario.',
    music: 'En los audífonos: Kendrick Lamar.',
    musicPlay: 'Reproducir “how to pray” de Kendrick Lamar',
    musicPause: 'Pausar “how to pray” de Kendrick Lamar',
    musicError: 'No se pudo reproducir el audio.',
  },
  process: {
    title: 'Etapas en las que participo',
    lead: 'Cuatro fases de un mismo proceso: cada una sostiene a la siguiente.',
    stages: ['Diseño de la solución', 'Lógica de negocio', 'Integración de servicios', 'Construcción de interfaces'],
    step: 'Etapa',
    of: 'de',
  },
  experience: {
    title: 'Trayectoria',
    statement: 'Mi recorrido, de hoy hacia atrás.',
    stack: 'Tecnologías',
  },
  projects: {
    title: 'Proyectos',
    statement: 'Cada proyecto tiene su puerta.',
    hint: 'Pasa el cursor para asomarte y entra para conocer cada proyecto.',
    hintTouch: 'Sigue bajando para pasar de puerta en puerta y toca una para entrar.',
    enter: 'Entrar a',
    visit: 'Visitar sitio',
    stack: 'Tecnologías',
    challenge: 'El reto',
    solution: 'La solución',
    includes: 'Qué incluye',
    communities: 'Cuatro comunidades por edad',
    years: 'años',
    house: 'Casa',
    back: 'Volver a proyectos',
    next: 'Siguiente proyecto',
    detailTitle: (name: string) => `${name} — Proyecto de Juan David Martínez Medina`,
  },
  contact: {
    title: 'Contacto',
    statement: '¿Tienes un proyecto o una vacante? Hablemos.',
    email: 'Correo',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    phone: 'Teléfono',
    cv: 'Descargar CV',
  },
  footer: {
    farewell: 'Gracias por tu visita. Nos vemos en el próximo proyecto.',
    rights: 'Todos los derechos reservados.',
    top: 'Volver arriba',
  },
};

export type Dict = typeof es;

const en: Dict = {
  meta: {
    title: 'Juan David Martínez Medina — Software Developer',
    description:
      'Portfolio of Juan David Martínez Medina, software developer based in Villavicencio, Colombia. Experience, projects and contact.',
  },
  a11y: {
    skip: 'Skip to content',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    language: 'Language',
    lightsOff: 'Turn the lights off',
    lightsOn: 'Turn the lights on',
    home: 'Home, Juan David Martínez Medina',
    newTab: 'opens in a new tab',
    main: 'Main',
  },
  nav: { about: 'About', experience: 'Experience', projects: 'Projects', contact: 'Contact' },
  hero: {
    greeting: "Hi, I'm",
    role: 'Software Developer',
    flipLead: 'I work on',
    flipItems: [
      'Business Logic',
      'Cloud Solutions',
      'Software Architecture',
      'API Integration',
      'Application Development',
      'System Design',
    ],
    summary:
      'I build functional, efficient and well-structured systems, from the design of the solution to the interface each person uses.',
    location: 'Villavicencio, Colombia',
    cv: 'Download CV',
    cvFile: '/pdf/CV_English.pdf',
    portraitAlt: 'Professional portrait of Juan David Martínez Medina wearing a dark pinstripe suit and a white shirt',
  },
  about: {
    title: 'About',
    statement: 'I turn real needs into well-designed software that is easy to maintain.',
    body: [
      "I'm a software developer with experience building applications and technology solutions. I focus on functional, efficient and well-structured systems, and I take part in the different stages of development.",
      'I learn quickly, think analytically and adapt easily to new technologies. I want every solution to answer a concrete need and to stay clear and maintainable over time.',
    ],
    figureAlt: 'Juan David Martínez Medina working on his laptop at a lectern',
    web: 'Your friendly neighborhood developer.',
    music: 'On the headphones: Kendrick Lamar.',
    musicPlay: 'Play “how to pray” by Kendrick Lamar',
    musicPause: 'Pause “how to pray” by Kendrick Lamar',
    musicError: 'The audio could not be played.',
  },
  process: {
    title: 'Stages I work across',
    lead: 'Four phases of one process: each one holds up the next.',
    stages: ['Solution design', 'Business logic', 'Service integration', 'Interface development'],
    step: 'Stage',
    of: 'of',
  },
  experience: {
    title: 'Experience',
    statement: 'My path, from today backwards.',
    stack: 'Technologies',
  },
  projects: {
    title: 'Projects',
    statement: 'Every project has its own door.',
    hint: 'Hover to peek inside, then step in to explore each project.',
    hintTouch: 'Keep scrolling to move from door to door, and tap one to step in.',
    enter: 'Enter',
    visit: 'Visit site',
    stack: 'Technologies',
    challenge: 'The challenge',
    solution: 'The solution',
    includes: "What's inside",
    communities: 'Four communities by age',
    years: 'years old',
    house: 'House',
    back: 'Back to projects',
    next: 'Next project',
    detailTitle: (name: string) => `${name} — A project by Juan David Martínez Medina`,
  },
  contact: {
    title: 'Contact',
    statement: 'Have a project or an open role? Let’s talk.',
    email: 'Email',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    phone: 'Phone',
    cv: 'Download CV',
  },
  footer: {
    farewell: 'Thanks for stopping by. See you on the next project.',
    rights: 'All rights reserved.',
    top: 'Back to top',
  },
};

export const ui: Record<Lang, Dict> = { es, en };

export const getLang = (param: string | undefined): Lang => (param === 'en' ? 'en' : 'es');

export const useTranslations = (lang: Lang) => ui[lang];

/** Root path for a language: `/` for Spanish, `/en/` for English. */
export const homePath = (lang: Lang) => (lang === defaultLang ? '/' : `/${lang}/`);

/** Detail page of a project in each language. */
export const projectPath = (lang: Lang, id: string) => (lang === 'es' ? `/proyectos/${id}/` : `/en/projects/${id}/`);

export type Alternates = Record<Lang, string>;

export const homeAlternates: Alternates = { es: homePath('es'), en: homePath('en') };
