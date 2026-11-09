const LANG_KEY = 'jdm-lang';

export const initHeader = () => {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;

  // Glass bar once the page has scrolled.
  let ticking = false;
  const syncScrolled = () => {
    ticking = false;
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(syncScrolled);
      }
    },
    { passive: true },
  );
  syncScrolled();

  // Highlight the link of the section in view and remember it for the language switch.
  const links = [...header.querySelectorAll<HTMLAnchorElement>('[data-nav-link]')];
  let currentSection = '';
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        currentSection = entry.target.id;
        links.forEach((link) => {
          if (link.dataset.navLink === currentSection) link.setAttribute('aria-current', 'true');
          else link.removeAttribute('aria-current');
        });
      }
    },
    { rootMargin: '-50% 0px -50% 0px' },
  );
  document.querySelectorAll('main section[id]').forEach((section) => sectionObserver.observe(section));

  // Language switch: remember the choice and land on the same section in the other language.
  document.querySelectorAll<HTMLAnchorElement>('[data-lang-link]').forEach((link) => {
    link.addEventListener('click', () => {
      try {
        localStorage.setItem(LANG_KEY, link.dataset.langLink ?? 'es');
      } catch {
        /* ignore */
      }
      if (currentSection && currentSection !== 'inicio') {
        link.href = `${link.pathname}#${currentSection}`;
      }
    });
  });

  // Mobile menu.
  const toggle = header.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const nav = header.querySelector<HTMLElement>('#site-nav');
  if (!toggle || !nav) return;

  const setOpen = (open: boolean) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', (open ? toggle.dataset.labelClose : toggle.dataset.labelOpen) ?? '');
    nav.classList.toggle('is-open', open);
    document.documentElement.classList.toggle('menu-open', open);
  };

  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  links.forEach((link) => link.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      setOpen(false);
      toggle.focus();
    }
  });
  window.matchMedia('(min-width: 861px)').addEventListener('change', (event) => {
    if (event.matches) setOpen(false);
  });
};
