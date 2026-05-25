import { useEffect, useRef, useState } from 'react';
import './Folder.css';

const CLICK_PEEK_MS = 380;

const darkenColor = (hex, percent) => {
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
};

export default function Folder({
  color = '#5227FF',
  size = 1,
  items = [],
  className = '',
  onFolderClick,
  activeModalId = null,
  folderId = null,
}) {
  const maxItems = 3;
  const papers = items.slice(0, maxItems);
  while (papers.length < maxItems) {
    papers.push(null);
  }

  const [open, setOpen] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [paperOffsets, setPaperOffsets] = useState(
    Array.from({ length: maxItems }, () => ({ x: 0, y: 0 }))
  );
  const folderRef = useRef(null);
  const clickTimerRef = useRef(null);

  const isModalTrigger = typeof onFolderClick === 'function';

  const folderBackColor = darkenColor(color, 0.08);
  const paper1 = darkenColor('#ffffff', 0.1);
  const paper2 = darkenColor('#ffffff', 0.05);
  const paper3 = '#ffffff';

  const clearClickPeek = () => {
    folderRef.current?.classList.remove('folder-click-peek');
    setIsClicking(false);
  };

  useEffect(() => {
    if (!isModalTrigger) return undefined;

    if (activeModalId === null) {
      clearClickPeek();
      if (clickTimerRef.current) {
        clearTimeout(clickTimerRef.current);
        clickTimerRef.current = null;
      }
    }

    return () => {
      if (clickTimerRef.current) {
        clearTimeout(clickTimerRef.current);
        clickTimerRef.current = null;
      }
    };
  }, [activeModalId, isModalTrigger]);

  const handleClick = (e) => {
    if (isModalTrigger) {
      e.preventDefault();
      e.stopPropagation();
      if (isClicking) return;

      setIsClicking(true);
      folderRef.current?.classList.add('folder-click-peek');

      clickTimerRef.current = window.setTimeout(() => {
        clearClickPeek();
        onFolderClick();
        clickTimerRef.current = null;
      }, CLICK_PEEK_MS);
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
    const offsetX = (e.clientX - centerX) * 0.12;
    const offsetY = (e.clientY - centerY) * 0.12;
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

  const folderClassName = ['folder', !isModalTrigger && open ? 'open' : ''].filter(Boolean).join(' ');

  const scaleStyle = { transform: `scale(${size})` };

  return (
    <div style={scaleStyle} className={['folder-scale', className].filter(Boolean).join(' ')}>
      <div
        ref={folderRef}
        className={folderClassName}
        style={folderStyle}
        onClick={handleClick}
      >
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
