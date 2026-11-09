import type { ImageMetadata } from 'astro';
import type { Localized } from './localized';
import comunidadProtegida from '../assets/projects/comunidad-protegida.jpg';
import camilaHenao from '../assets/projects/camila-henao.jpg';
import bioconstructores from '../assets/projects/bioconstructores.jpg';
import driveden from '../assets/projects/driveden.jpg';
import papeleria from '../assets/projects/papeleria-mm.jpg';

type CaseStudy = {
  award: Localized;
  challenge: Localized;
  solution: Localized;
  features: Localized<string[]>;
  communities: { house: string; ages: string; season: Localized; tone: string }[];
  note: Localized;
};

export type Project = {
  id: string;
  name: string;
  category: Localized;
  summary: Localized;
  stack: string[];
  url: string;
  preview: ImageMetadata;
  /** Door paint and the darker shade used for its panels. */
  paint: { base: string; shade: string };
  featured?: CaseStudy;
};

export const projects: Project[] = [
  {
    id: 'comunidad-protegida',
    name: 'Comunidad Protegida',
    category: { es: 'Plataforma web de orientación', en: 'Guidance web platform' },
    summary: {
      es: 'Plataforma de orientación y acompañamiento informativo para jóvenes de Villavicencio, desarrollada en la Hackatón de Villavicencio 2026.',
      en: 'Guidance and information platform for young people in Villavicencio, built at the Villavicencio Hackathon 2026.',
    },
    stack: ['Next.js', 'React'],
    url: 'https://gobernacionreto.vercel.app/',
    preview: comunidadProtegida,
    paint: { base: '#4b3a8f', shade: '#382b6c' },
    featured: {
      award: { es: 'Primer lugar, Hackatón de Villavicencio 2026', en: 'First place, Villavicencio Hackathon 2026' },
      challenge: {
        es: '¿Cómo podemos ayudar a los jóvenes de Villavicencio a encontrar información confiable, entender las rutas disponibles y acceder a ellas oportunamente frente a situaciones relacionadas con la depresión?',
        en: 'How can we help young people in Villavicencio find reliable information, understand the available routes and reach them in time when facing situations related to depression?',
      },
      solution: {
        es: 'Construimos una plataforma de orientación y acompañamiento informativo que une rutas de apoyo con una experiencia interactiva inspirada en juegos sociales como Club Penguin. Los jóvenes participan en comunidades separadas por edad, sin registrar un correo ni revelar su identidad.',
        en: 'We built a guidance and information platform that combines support routes with an interactive experience inspired by social games like Club Penguin. Young people join communities separated by age, without registering an email or revealing their identity.',
      },
      features: {
        es: [
          'Rutas de orientación y apoyo.',
          'Información sobre instituciones y servicios disponibles.',
          'Experiencia interactiva inspirada en juegos sociales como Club Penguin.',
          'Comunidades organizadas por rangos de edad.',
          'Participación sin correo electrónico ni identidad personal.',
          'Restricciones y medidas de protección para evitar la exposición de información personal.',
        ],
        en: [
          'Guidance and support routes.',
          'Information about available institutions and services.',
          'Interactive experience inspired by social games like Club Penguin.',
          'Communities organized by age range.',
          'Participation without an email address or personal identity.',
          'Restrictions and safeguards that prevent exposing personal information.',
        ],
      },
      communities: [
        { house: 'A', ages: '10–12', season: { es: 'Otoño', en: 'Autumn' }, tone: '#c8742f' },
        { house: 'B', ages: '13–15', season: { es: 'Primavera', en: 'Spring' }, tone: '#5f9a4c' },
        { house: 'C', ages: '16–17', season: { es: 'Invierno', en: 'Winter' }, tone: '#5b86c4' },
        { house: 'D', ages: '18–22', season: { es: 'Verano', en: 'Summer' }, tone: '#d2a62e' },
      ],
      note: {
        es: 'La plataforma facilita el acceso a información confiable y rutas de apoyo. No es una herramienta de diagnóstico ni reemplaza la atención profesional.',
        en: 'The platform makes reliable information and support routes easier to reach. It is not a diagnostic tool and does not replace professional care.',
      },
    },
  },
  {
    id: 'camila-henao',
    name: 'Dra. Camila Henao',
    category: { es: 'Sitio web y panel administrativo', en: 'Website and admin panel' },
    summary: {
      es: 'Sitio web y panel de administración para una clínica odontológica. Incluye agendamiento de citas mediante API Routes de Next.js, con Prisma como capa de datos para citas, pacientes y la gestión del panel.',
      en: 'Website and admin panel for a dental clinic. It includes appointment scheduling through Next.js API Routes, with Prisma as the data layer for appointments, patients and panel management.',
    },
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'Prisma', 'PostgreSQL', 'Docker'],
    url: 'https://dra-camila-henao-web.vercel.app/',
    preview: camilaHenao,
    paint: { base: '#2f6f6b', shade: '#225450' },
  },
  {
    id: 'bioconstructores',
    name: 'Bioconstructores Asociados',
    category: { es: 'Sitio web y dashboard', en: 'Website and dashboard' },
    summary: {
      es: 'Plataforma web desarrollada durante mi experiencia en Bioconstructores Asociados SAS: sitio público y dashboard administrativo editable, con Neon y Prisma como capa de datos y AWS S3 para el almacenamiento de imágenes.',
      en: 'Web platform built during my time at Bioconstructores Asociados SAS: a public site and an editable admin dashboard, with Neon and Prisma as the data layer and AWS S3 for image storage.',
    },
    stack: ['Next.js', 'React', 'TypeScript', 'Prisma', 'Neon', 'AWS S3', 'GSAP', 'Framer Motion'],
    url: 'https://bcas-iqax.vercel.app/',
    preview: bioconstructores,
    paint: { base: '#24324f', shade: '#19243b' },
  },
  {
    id: 'driveden',
    name: 'DriveDen',
    category: { es: 'Aplicación móvil', en: 'Mobile app' },
    summary: {
      es: 'Aplicación móvil para la gestión de vehículos: combustible, mantenimientos, recordatorios y estadísticas, con registro por voz asistido por IA. Desarrollé el frontend completo, consumiendo la API del backend e integrando la lógica de negocio.',
      en: 'Mobile app for vehicle management: fuel, maintenance, reminders and statistics, with AI-assisted voice logging. I built the complete frontend, consuming the backend API and integrating the business logic.',
    },
    stack: ['React Native', 'Expo', 'TypeScript', 'Expo Router', 'Zustand', 'AsyncStorage'],
    url: 'https://driveden.online/',
    preview: driveden,
    paint: { base: '#b4532c', shade: '#8e3f20' },
  },
  {
    id: 'papeleria-mm',
    name: 'Papelería M&M',
    category: { es: 'Landing page', en: 'Landing page' },
    summary: {
      es: 'Landing page para la papelería de mi mamá, un emprendimiento familiar de barrio. Usa navegación con scroll-snap, animaciones y un carrusel de servicios para mostrar sus productos.',
      en: "Landing page for my mother's stationery shop, a family-run neighborhood business. It uses scroll-snap navigation, animations and a services carousel to show its products.",
    },
    stack: ['React', 'Vite', 'TypeScript'],
    url: 'https://papeleria-m-m-ten.vercel.app/',
    preview: papeleria,
    paint: { base: '#7d8f63', shade: '#62724c' },
  },
];
