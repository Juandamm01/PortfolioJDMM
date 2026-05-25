const NAV_OFFSET = 80;

/** Posición real del scroll (compatible con Lenis). */
export function getPageScrollY() {
  const lenis = window.__portfolioLenis;
  if (lenis && typeof lenis.scroll === 'number') {
    return lenis.scroll;
  }
  return window.scrollY || document.documentElement.scrollTop || 0;
}

/** Restaura scroll sin saltar al inicio. */
export function restorePageScroll(y) {
  const lenis = window.__portfolioLenis;
  const top = Math.max(0, y);

  if (lenis) {
    lenis.scrollTo(top, { immediate: true });
    lenis.start();
    return;
  }

  window.scrollTo({ top, left: 0, behavior: 'instant' });
}

export function lockPageScroll() {
  const y = getPageScrollY();
  document.body.dataset.projectModal = 'open';
  document.body.dataset.scrollLock = String(y);
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
  window.__portfolioLenis?.stop();
  return y;
}

export function unlockAndRestoreScroll(savedY) {
  delete document.body.dataset.projectModal;
  delete document.body.dataset.scrollLock;
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';

  const project = document.getElementById('project');
  const projectTop = project ? Math.max(0, project.offsetTop - NAV_OFFSET) : 0;
  const target = savedY > 120 ? savedY : projectTop || savedY;

  requestAnimationFrame(() => {
    restorePageScroll(target);
    window.dispatchEvent(
      new CustomEvent('portfolio:modal-closed', { detail: { sectionId: 'project' } })
    );
  });
}
