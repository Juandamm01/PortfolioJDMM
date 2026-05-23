import { useCallback, useEffect, useState } from 'react';
import BcasVideo from '../assets/Video/Bcas.mp4';
import CamiVideo from '../assets/Video/Cami.mp4';
import '../styles/projects.css';

const FOLDER_COLOR = '#00f3ff';

function darkenColor(hex, percent) {
  let color = hex.startsWith('#') ? hex.slice(1) : hex;
  if (color.length === 3) {
    color = color
      .split('')
      .map((c) => c + c)
      .join('');
  }
  const num = parseInt(color, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

function Folder({ color = '#5227FF', size = 1, items = [], className = '', onFolderClick }) {
  const maxItems = 3;
  const papers = items.slice(0, maxItems);
  while (papers.length < maxItems) {
    papers.push(null);
  }

  const [open, setOpen] = useState(false);
  const [paperOffsets, setPaperOffsets] = useState(
    Array.from({ length: maxItems }, () => ({ x: 0, y: 0 }))
  );

  const isModalTrigger = typeof onFolderClick === 'function';
  const folderBackColor = darkenColor(color, 0.08);
  const paper1 = darkenColor('#ffffff', 0.1);
  const paper2 = darkenColor('#ffffff', 0.05);
  const paper3 = '#ffffff';

  const handleClick = () => {
    if (isModalTrigger) {
      onFolderClick();
      return;
    }
    setOpen((prev) => !prev);
    if (open) {
      setPaperOffsets(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));
    }
  };

  const handlePaperMouseMove = (e, index) => {
    if (!open) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (e.clientX - centerX) * 0.15;
    const offsetY = (e.clientY - centerY) * 0.15;
    setPaperOffsets((prev) => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: offsetX, y: offsetY };
      return newOffsets;
    });
  };

  const handlePaperMouseLeave = (_e, index) => {
    setPaperOffsets((prev) => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: 0, y: 0 };
      return newOffsets;
    });
  };

  const folderStyle = {
    '--folder-color': color,
    '--folder-back-color': folderBackColor,
    '--paper-1': paper1,
    '--paper-2': paper2,
    '--paper-3': paper3,
  };

  const folderClassName = `folder ${!isModalTrigger && open ? 'open' : ''}`.trim();
  const scaleStyle = { transform: `scale(${size})` };

  return (
    <div style={scaleStyle} className={className}>
      <div className={folderClassName} style={folderStyle} onClick={handleClick}>
        <div className="folder__back">
          {papers.map((item, i) => (
            <div
              key={i}
              className={`paper paper-${i + 1}`}
              onMouseMove={(e) => handlePaperMouseMove(e, i)}
              onMouseLeave={(e) => handlePaperMouseLeave(e, i)}
              style={
                open
                  ? {
                    '--magnet-x': `${paperOffsets[i]?.x || 0}px`,
                    '--magnet-y': `${paperOffsets[i]?.y || 0}px`,
                  }
                  : {}
              }
            >
              {item}
            </div>
          ))}
          <div className="folder__front"></div>
          <div className="folder__front right"></div>
        </div>
      </div>
    </div>
  );
}

const PROJECTS = [
  {
    id: 'camila',
    folderLabel: 'Dra. Camila Henao Odontología',
    title: 'Dra. Camila Henao Odontología',
    description:
      'Desarrollo moderno y dinámico para clínica dental. Frontend en Next.js con animaciones fluidas usando Framer Motion y GSAP para una experiencia interactiva inmersiva.',
    stack: ['Next.js', 'Framer Motion', 'GSAP'],
    inDevelopment: true,
    siteUrl: null,
    video: CamiVideo,
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
    video: BcasVideo,
  },
];

function ProjectModal({ project, onClose }) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleVideoClick = () => {
    if (project.siteUrl) {
      window.open(project.siteUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const videoHasLink = Boolean(project.siteUrl);

  return (
    <div className="modal-overlay" onClick={handleOverlayClick} role="presentation">
      <div
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="modal-close" onClick={onClose} aria-label="Cerrar">
          ×
        </button>

        <div className="modal-head">
          <h3 id="modal-title" className="modal-title">
            {project.title}
          </h3>
          {project.inDevelopment && <span className="modal-dev-badge">En Desarrollo</span>}
        </div>

        <p className="modal-description">{project.description}</p>

        <div
          className="modal-video-wrapper"
          onClick={handleVideoClick}
          role={videoHasLink ? 'button' : undefined}
          tabIndex={videoHasLink ? 0 : undefined}
          aria-label={videoHasLink ? 'Abrir sitio web del proyecto' : undefined}
          onKeyDown={
            videoHasLink
              ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleVideoClick();
                }
              }
              : undefined
          }
        >
          <video
            className="modal-video"
            src={project.video}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          />
          <div className="modal-video-overlay" aria-hidden="true">
            <span className="modal-play-icon">▶</span>
          </div>
        </div>

        <div className="modal-stack">
          {project.stack.map((tech) => (
            <span key={tech} className="modal-stack-pill">
              {tech}
            </span>
          ))}
        </div>

        <div className="modal-actions">
          {project.inDevelopment ? (
            <button type="button" className="modal-btn modal-btn--disabled" disabled>
              Ver proyecto
            </button>
          ) : (
            <a
              href={project.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-btn modal-btn--primary"
            >
              Ver proyecto
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    if (activeProject !== null) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [activeProject]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setActiveProject(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const openProject = useCallback((id) => {
    const project = PROJECTS.find((p) => p.id === id);
    if (project) setActiveProject(project);
  }, []);

  const closeModal = useCallback(() => {
    setActiveProject(null);
  }, []);

  return (
    <>
      <div className="projects-folders-row">
        {PROJECTS.map((project, index) => (
          <article
            key={project.id}
            className="folder-project-item project-anim"
            style={{ animationDelay: index === 1 ? '200ms' : undefined }}
          >
            <Folder color={FOLDER_COLOR} size={1.35} onFolderClick={() => openProject(project.id)} />
            <p className="folder-project-name">{project.folderLabel}</p>
          </article>
        ))}
      </div>

      {activeProject && <ProjectModal project={activeProject} onClose={closeModal} />}
    </>
  );
}
