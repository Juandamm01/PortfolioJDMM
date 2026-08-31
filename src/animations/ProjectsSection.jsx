import { useCallback, useEffect, useRef, useState } from 'react';
import { getCurrentLanguage, translations } from '../logic/translations.js';
import { lockPageScroll, unlockAndRestoreScroll } from '../logic/scrollLock.js';
import Folder from './Folder';
import '../styles/projects.css';

const FOLDER_COLOR = '#00f3ff';
const MODAL_CLOSE_MS = 340;

export const PROJECTS = [
  {
    id: 'camila',
    folderLabelKey: 'project1_title',
    titleKey: 'project1_title',
    descriptionKey: 'project1_desc',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'API Routes', 'Framer Motion', 'GSAP', 'Prisma', 'PostgreSQL', 'Docker'],
    isWebPage: true,
    inDevelopment: false,
    siteUrl: 'https://dra-camila-henao-web.vercel.app/',
    accent: '#00f3ff',
  },
  {
    id: 'bcas',
    folderLabelKey: 'project2_title',
    titleKey: 'project2_title',
    descriptionKey: 'project2_desc',
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
    folderLabelKey: 'project3_title',
    titleKey: 'project3_title',
    descriptionKey: 'project3_desc',
    stack: ['React Native', 'Expo', 'TypeScript', 'Expo Router', 'Zustand', 'AsyncStorage'],
    inDevelopment: false,
    siteUrl: 'https://driveden.online/',
    accent: '#4ade80',
  },
  {
    id: 'papeleria-m-m',
    folderLabelKey: 'project4_title',
    titleKey: 'project4_title',
    descriptionKey: 'project4_desc',
    stack: ['React', 'Vite', 'TypeScript'],
    isWebPage: true,
    inDevelopment: false,
    siteUrl: 'https://papeleria-m-m-ten.vercel.app/',
    accent: '#00f3ff',
  },
];

const getLocalizedProjects = (lang = getCurrentLanguage()) => {
  const active = translations[lang] || translations.es;

  return PROJECTS.map((project) => ({
    ...project,
    folderLabel: active[project.folderLabelKey],
    title: active[project.titleKey],
    description: active[project.descriptionKey],
  }));
};

function ProjectModal({ project, onClose, isClosing, lang }) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const canOpenSite = Boolean(project.siteUrl);
  const overlayClass = isClosing ? 'modal-overlay--closing' : 'modal-overlay--open';
  const panelClass = isClosing ? 'modal-panel--closing' : 'modal-panel--open';
  const translatedClose = lang === 'en' ? 'Close' : 'Cerrar';
  const translatedView = lang === 'en' ? 'View project' : 'Ver proyecto';
  const translatedWeb = lang === 'en' ? 'Website' : 'Página web';
  const translatedDev = lang === 'en' ? 'In Development' : 'En Desarrollo';

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
          aria-label={translatedClose}
        >
          ×
        </button>

        <div className="modal-content">
          <div className="modal-head">
            <h3 id="modal-title" className="modal-title">
              {project.title}
            </h3>
            {project.isWebPage && <span className="modal-type-badge">{translatedWeb}</span>}
            {project.inDevelopment && <span className="modal-dev-badge">{translatedDev}</span>}
          </div>

          <p
            className="modal-description"
            dangerouslySetInnerHTML={{ __html: project.description || '' }}
          />

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
                {translatedView}
              </a>
            ) : (
              <button type="button" className="modal-btn modal-btn--disabled" disabled>
                {translatedView}
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
  const [lang, setLang] = useState(getCurrentLanguage());
  const [localizedProjects, setLocalizedProjects] = useState(() => getLocalizedProjects());
  const scrollLockY = useRef(0);

  useEffect(() => {
    const syncLanguage = () => {
      const nextLang = getCurrentLanguage();
      setLang(nextLang);
      setLocalizedProjects(getLocalizedProjects(nextLang));
    };

    syncLanguage();
    window.addEventListener('portfolio:lang-change', syncLanguage);
    return () => window.removeEventListener('portfolio:lang-change', syncLanguage);
  }, []);

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
    const project = localizedProjects.find((p) => p.id === id);
    if (project) {
      setIsClosing(false);
      setActiveProject(project);
    }
  }, [localizedProjects]);

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
        {localizedProjects.map((project, index) => (
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
        <ProjectModal project={activeProject} onClose={closeModal} isClosing={isClosing} lang={lang} />
      )}
    </>
  );
}
