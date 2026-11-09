import type { Localized } from './localized';

export type ExperienceEntry = {
  id: string;
  year: number;
  /** Ambient light colour used (in night mode) while this entry is in focus. */
  glow: string;
  kind: Localized;
  period: Localized;
  role: Localized;
  org: string;
  /** Short label revealed on the organisation name, e.g. the type of contract. */
  badge?: Localized;
  place: Localized;
  summary?: Localized;
  stack?: string[];
};

// Professional and academic path only. Projects and their recognitions live in projects.ts.
export const experience: ExperienceEntry[] = [
  {
    id: 'bioconstructores',
    year: 2026,
    glow: '#1f5a46',
    kind: { es: 'Experiencia laboral', en: 'Work experience' },
    period: { es: 'Febrero — Mayo 2026', en: 'February — May 2026' },
    role: { es: 'Full Stack Web Developer', en: 'Full Stack Web Developer' },
    org: 'Bioconstructores Asociados SAS',
    badge: { es: 'Prácticas laborales', en: 'Professional Internship' },
    place: { es: 'Villavicencio, Meta. Modalidad híbrida', en: 'Villavicencio, Meta. Hybrid' },
    summary: {
      es: 'Participé en el desarrollo de un dashboard administrativo y de funcionalidades de una aplicación web. Trabajé con Neon (PostgreSQL) y Prisma para el modelo de datos, y con AWS S3 para la gestión de imágenes.',
      en: 'I took part in building an admin dashboard and features of a web application. I worked with Neon (PostgreSQL) and Prisma for the data model, and with AWS S3 for image management.',
    },
    stack: ['Next.js', 'React', 'TypeScript', 'Prisma', 'Neon', 'AWS S3'],
  },
  {
    id: 'monitor',
    year: 2025,
    glow: '#23407f',
    kind: { es: 'Docencia', en: 'Teaching' },
    period: { es: 'Septiembre 2025 — Actualidad', en: 'September 2025 — Present' },
    role: { es: 'Monitor académico de programación', en: 'Academic programming tutor' },
    org: 'UNIMINUTO',
    place: { es: 'Corporación Universitaria Minuto de Dios, Villavicencio', en: 'Corporación Universitaria Minuto de Dios, Villavicencio' },
    summary: {
      es: 'Apoyo procesos de formación en programación con C++: estructuras de control, ciclos y funciones.',
      en: 'I support programming courses in C++: control structures, loops and functions.',
    },
    stack: ['C++'],
  },
  {
    id: 'education',
    year: 2024,
    glow: '#6b5420',
    kind: { es: 'Formación', en: 'Education' },
    period: { es: 'Febrero 2024 — Actualidad', en: 'February 2024 — Present' },
    role: { es: 'Tecnología en Desarrollo de Software', en: 'Software Development Technology program' },
    org: 'UNIMINUTO',
    place: { es: 'Corporación Universitaria Minuto de Dios, Villavicencio', en: 'Corporación Universitaria Minuto de Dios, Villavicencio' },
  },
];
