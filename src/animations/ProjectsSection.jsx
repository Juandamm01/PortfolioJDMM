import { useCallback, useEffect, useRef, useState } from 'react';
import { lockPageScroll, unlockAndRestoreScroll } from '../logic/scrollLock.js';
import Folder from './Folder';
import '../styles/projects.css';

const FOLDER_COLOR = '#00f3ff';
const MODAL_CLOSE_MS = 340;

export const PROJECTS = [
  {
    id: 'camila',
    folderLabel: 'Dra. Camila Henao Odontología',
    title: 'Dra. Camila Henao Odontología',
    description:
      'Página web profesional y panel administrativo para clínica odontológica. Aplicación full-stack en Next.js con TypeScript, animaciones con Framer Motion y GSAP. Lógica de agendamiento de citas médicas mediante API Routes de Next.js. Prisma como capa de datos para almacenar citas, pacientes y la gestión del panel de administración.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'API Routes', 'Framer Motion', 'GSAP', 'Prisma', 'PostgreSQL', 'Docker'],
    isWebPage: true,
    inDevelopment: false,
    siteUrl: 'https://dra-camila-henao-web.vercel.app/',
    accent: '#00f3ff',
  },
  {
    id: 'bcas',
    folderLabel: 'Bioconstructores Asociados SAS',
    title: 'Bioconstructores Asociados SAS',
    description:
      'Panel de administración y landing corporativa fullstack bajo arquitectura moderna con Next.js, Prisma, Neon y almacenamiento en AWS S3. Interfaz animada con GSAP, Framer Motion, React Bits y Aceternity UI.',
    stack: [
      'Next.js',
      'React',
      'TypeScript',
      'Prisma',
      'Neon',
      'AWS S3',
      'GSAP',
      'Framer Motion',
      'React Bits',
      'Aceternity UI',
    ],
    inDevelopment: false,
    siteUrl: 'https://bcas-iqax.vercel.app/',
    accent: '#5227ff',
  },
  {
    id: 'driveden',
    folderLabel: 'DriveDen',
    title: 'DriveDen',
    description:
      'DriveDen es una aplicación móvil desarrollada en React Native con Expo para la gestión inteligente de vehículos: control de combustible, mantenimientos, recordatorios y estadísticas, con un sistema de registro por voz asistido por IA. Trabajé en el desarrollo completo del frontend, consumiendo la API del backend e integrando toda la lógica de negocio para lograr una experiencia fluida, moderna y coherente en toda la aplicación.',
    stack: ['React Native', 'Expo', 'TypeScript', 'Expo Router', 'Zustand', 'AsyncStorage'],
    inDevelopment: false,
    siteUrl: 'https://driveden.online/',
    accent: '#4ade80',
  },
  {
    id: 'papeleria-m-m',
    folderLabel: 'Papelería M&M',
    title: 'Papelería M&M',
    description:
      'Landing page para Papelería M&M, un emprendimiento familiar de barrio, con navegación por scroll-snap, animaciones fluidas y un carrusel de servicios para mostrar los productos. Incluye un botón de contacto directo por WhatsApp para facilitar los pedidos.',
    stack: ['React', 'Vite', 'TypeScript'],
    isWebPage: true,
    inDevelopment: false,
    siteUrl: 'https://papeleria-m-949ylb5ou-juan-david-s-projects-1927e4bd.vercel.app/',
    accent: '#00f3ff',
  },
];

function ProjectModal({ project, onClose, isClosing }) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const canOpenSite = Boolean(project.siteUrl);
  const overlayClass = isClosing ? 'modal-overlay--closing' : 'modal-overlay--open';
  const panelClass = isClosing ? 'modal-panel--closing' : 'modal-panel--open';

  return (
    <div className={`modal-overlay ${overlayClass}`} onClick={handleOverlayClick} role="presentation">
      <div
        className={`modal-panel ${panelClass}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="modal-bg-art"
          style={{ '--modal-accent': project.accent || FOLDER_COLOR }}
          aria-hidden="true"
        />

        <div className="modal-scrim" aria-hidden="true" />

        <button
          type="button"
          className="modal-close"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClose();
          }}
          aria-label="Cerrar"
        >
          ×
        </button>

        <div className="modal-content">
          <div className="modal-head">
            <h3 id="modal-title" className="modal-title">
              {project.title}
            </h3>
            {project.isWebPage && <span className="modal-type-badge">Página web</span>}
            {project.inDevelopment && <span className="modal-dev-badge">En Desarrollo</span>}
          </div>

          <p className="modal-description">{project.description}</p>

          <div className="modal-stack">
            {project.stack.map((tech) => (
              <span key={tech} className="modal-stack-pill">
                {tech}
              </span>
            ))}
          </div>

          <div className="modal-actions">
            {canOpenSite ? (
              <a
                href={project.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-btn modal-btn--primary"
              >
                Ver proyecto
              </a>
            ) : (
              <button type="button" className="modal-btn modal-btn--disabled" disabled>
                Ver proyecto
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const scrollLockY = useRef(0);

  useEffect(() => {
    if (activeProject === null) return undefined;

    scrollLockY.current = lockPageScroll();

    return () => {
      unlockAndRestoreScroll(scrollLockY.current);
    };
  }, [activeProject]);

  useEffect(() => {
    if (!isClosing) return undefined;

    const timer = window.setTimeout(() => {
      setActiveProject(null);
      setIsClosing(false);
    }, MODAL_CLOSE_MS);

    return () => window.clearTimeout(timer);
  }, [isClosing]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && activeProject && !isClosing) {
        setIsClosing(true);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeProject, isClosing]);

  const openProject = useCallback((id) => {
    const project = PROJECTS.find((p) => p.id === id);
    if (project) {
      setIsClosing(false);
      setActiveProject(project);
    }
  }, []);

  const closeModal = useCallback(
    (e) => {
      e?.preventDefault?.();
      e?.stopPropagation?.();
      if (isClosing || !activeProject) return;
      setIsClosing(true);
    },
    [activeProject, isClosing]
  );

  return (
    <>
      <div className="projects-folders-row">
        {PROJECTS.map((project, index) => (
          <article
            key={project.id}
            className="folder-project-item project-anim"
            style={{ animationDelay: index > 0 ? `${index * 120}ms` : undefined }}
          >
            <Folder
              color={FOLDER_COLOR}
              size={1.35}
              className="folder-project-folder"
              folderId={project.id}
              activeModalId={activeProject?.id ?? null}
              onFolderClick={() => openProject(project.id)}
            />
            <p className="folder-project-name">{project.folderLabel}</p>
          </article>
        ))}
      </div>

      {activeProject && (
        <ProjectModal project={activeProject} onClose={closeModal} isClosing={isClosing} />
      )}
    </>
  );
}
