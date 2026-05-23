import { useRef, useEffect, useState } from 'react';
import '../styles/GooeyNav.css';

const GooeyNav = ({
  items = [
    { label: "Inicio", href: "/#home", i18n: "nav_home" },
    { label: "Proyectos", href: "/#project", i18n: "nav_project" },
    { label: "Stack", href: "/#tech", i18n: "nav_stack" },
    { label: "Experiencia", href: "/#experience", i18n: "nav_experience" },
    { label: "Contacto", href: "/#contact", i18n: "nav_contact" }
  ],
  animationTime = 600,
  particleCount = 15,
  particleDistances = [90, 10],
  particleR = 100,
  timeVariance = 300,
  colors = [1, 2, 3, 1, 2, 3, 1, 4],
  initialActiveIndex = 0
}) => {
  const containerRef = useRef(null);
  const navRef = useRef(null);
  const filterRef = useRef(null);
  const textRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);

  useEffect(() => {
    const isHome = window.location.pathname === '/' || window.location.pathname.endsWith('index.html');
    if (!isHome) {
      setActiveIndex(-1);
    }
  }, []);
  const isHomePage = () =>
    window.location.pathname === '/' || window.location.pathname.endsWith('index.html');

  const clickLockRef = useRef(false);
  const clickLockTimeoutRef = useRef(null);
  const lastBurstTimeRef = useRef(0);
  const lastBurstIndexRef = useRef(-1);
  const initTimeRef = useRef(Date.now());

  const noise = (n = 1) => n / 2 - Math.random() * n;

  const getXY = (distance, pointIndex, totalPoints) => {
    // Restrict angles to bottom hemisphere (0 to 180 degrees) so they shoot downwards and sideways
    const angle = ((180 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };

  const createParticle = (i, t, d, r) => {
    let rotate = noise(r / 10);
    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10
    };
  };

  const triggerBurst = (index) => {
    const now = Date.now();
    if (now - initTimeRef.current < 1500) return; // Prevent burst on initial page load
    if (index === lastBurstIndexRef.current && now - lastBurstTimeRef.current < 450) return; // Responsive burst throttle
    lastBurstTimeRef.current = now;
    lastBurstIndexRef.current = index;

    if (!filterRef.current || window.innerWidth <= 900) return;

    // Clear previous particles
    const particles = filterRef.current.querySelectorAll('.particle');
    particles.forEach(p => {
      try { filterRef.current.removeChild(p); } catch (e) {}
    });

    const d = particleDistances;
    const r = particleR;
    const bubbleTime = animationTime * 2 + timeVariance;
    filterRef.current.style.setProperty('--time', `${bubbleTime}ms`);

    for (let i = 0; i < particleCount; i++) {
      const t = animationTime * 2 + noise(timeVariance * 2);
      const p = createParticle(i, t, d, r);
      filterRef.current.classList.remove('active');

      setTimeout(() => {
        const particle = document.createElement('span');
        const point = document.createElement('span');
        particle.classList.add('particle');
        particle.style.setProperty('--start-x', `${p.start[0]}px`);
        particle.style.setProperty('--start-y', `${p.start[1]}px`);
        particle.style.setProperty('--end-x', `${p.end[0]}px`);
        particle.style.setProperty('--end-y', `${p.end[1]}px`);
        particle.style.setProperty('--time', `${p.time}ms`);
        particle.style.setProperty('--scale', `${p.scale}`);
        particle.style.setProperty('--color', `var(--color-${p.color}, white)`);
        particle.style.setProperty('--rotate', `${p.rotate}deg`);

        point.classList.add('point');
        particle.appendChild(point);
        filterRef.current.appendChild(particle);
        requestAnimationFrame(() => {
          filterRef.current.classList.add('active');
        });
        setTimeout(() => {
          try {
            filterRef.current.removeChild(particle);
          } catch {
            // Do nothing
          }
        }, t);
      }, 30);
    }
  };

  const updateEffectPosition = element => {
    if (!containerRef.current || !filterRef.current || !textRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const pos = element.getBoundingClientRect();

    const styles = {
      left: `${pos.x - containerRect.x}px`,
      top: `${pos.y - containerRect.y}px`,
      width: `${pos.width}px`,
      height: `${pos.height}px`
    };
    Object.assign(filterRef.current.style, styles);
    Object.assign(textRef.current.style, styles);
    textRef.current.innerText = element.innerText;
  };

  const handleClick = (e, index) => {
    if (!isHomePage()) {
      // En certificaciones: dejar que el navegador siga el href normalmente (/#home, /#project, etc.)
      // Sin animaciones, sin bloqueos — navegación directa
      return;
    }

    const liEl = e.currentTarget.parentElement || e.currentTarget;
    if (activeIndex === index) return;

    setActiveIndex(index);
    updateEffectPosition(liEl);

    if (textRef.current) {
      textRef.current.classList.remove('active');
      void textRef.current.offsetWidth;
      textRef.current.classList.add('active');
    }

    clickLockRef.current = true;
    if (clickLockTimeoutRef.current) clearTimeout(clickLockTimeoutRef.current);
    clickLockTimeoutRef.current = setTimeout(() => {
      clickLockRef.current = false;
    }, 1000);

    triggerBurst(index);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const liEl = e.currentTarget.parentElement;
      if (liEl) {
        handleClick({ currentTarget: liEl }, index);
      }
    }
  };

  // ── Effect 1: Runs ONCE on mount. Sets up all global listeners. ──
  useEffect(() => {
    const SECTION_IDS = ['home', 'project', 'tech', 'experience', 'contact'];

    const getActiveSectionId = () => {
      const doc = document.documentElement;
      const scrollBottom = window.scrollY + window.innerHeight;
      if (scrollBottom >= doc.scrollHeight - 48) return 'contact';
      const navH = 80;
      const marker = window.scrollY + navH + 12;
      let current = 'home';
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= marker) current = id;
      }
      return current;
    };

    // Called on page-load / hashchange / astro transition to set the
    // correct active item. NEVER called during a user click.
    const activateFromPageChange = () => {
      if (!isHomePage()) {
        setActiveIndex(-1);
        return;
      }
      const hash = window.location.hash.replace(/^#/, '');
      if (hash) {
        const idx = items.findIndex(item => item.href.endsWith(`#${hash}`));
        if (idx !== -1) {
          setActiveIndex(idx);
          return;
        }
      }
      const activeId = getActiveSectionId();
      const newIdx = items.findIndex(item => item.href.endsWith(`#${activeId}`));
      if (newIdx !== -1) setActiveIndex(newIdx);
    };

    const handleScroll = () => {
      if (clickLockRef.current) return;
      if (!isHomePage()) return; // don't reset on scroll — click already handles it

      const activeId = getActiveSectionId();
      const newIndex = items.findIndex(item => item.href.endsWith(`#${activeId}`));
      if (newIndex !== -1) {
        setActiveIndex(prev => {
          if (prev !== newIndex) {
            triggerBurst(newIndex);
            return newIndex;
          }
          // Same index: just reposition the pill
          const li = navRef.current?.querySelectorAll('li')[newIndex];
          if (li) updateEffectPosition(li);
          return prev;
        });
      }
    };

    // Initial activation on mount
    activateFromPageChange();

    // Re-activate after every View Transition
    document.addEventListener('astro:page-load', activateFromPageChange);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('hashchange', activateFromPageChange);

    return () => {
      document.removeEventListener('astro:page-load', activateFromPageChange);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', activateFromPageChange);
      if (clickLockTimeoutRef.current) clearTimeout(clickLockTimeoutRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // ← empty deps: runs once, never re-registers listeners on activeIndex change

  useEffect(() => {
    if (!navRef.current || !containerRef.current) return;
    const activeLi = navRef.current.querySelectorAll('li')[activeIndex];
    if (activeLi) {
      if (filterRef.current) filterRef.current.style.opacity = '1';
      if (textRef.current) textRef.current.style.opacity = '1';
      updateEffectPosition(activeLi);
      textRef.current?.classList.add('active');
    } else {
      if (filterRef.current) filterRef.current.style.opacity = '0';
      if (textRef.current) textRef.current.style.opacity = '0';
    }

    // Recalculate once web fonts are fully loaded to avoid incorrect widths
    if (document.fonts) {
      document.fonts.ready.then(() => {
        const currentActiveLi = navRef.current?.querySelectorAll('li')[activeIndex];
        if (currentActiveLi) {
          updateEffectPosition(currentActiveLi);
        }
      });
    }

    const resizeObserver = new ResizeObserver(() => {
      const currentActiveLi = navRef.current?.querySelectorAll('li')[activeIndex];
      if (currentActiveLi) {
        updateEffectPosition(currentActiveLi);
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [activeIndex]);

  return (
    <div className="gooey-nav-container nav-anim" ref={containerRef}>
      <nav>
        <ul ref={navRef}>
          {items.map((item, index) => (
            <li 
              key={index} 
              className={activeIndex === index ? 'active' : ''}
            >
              <a href={item.href} data-i18n={item.i18n} onClick={e => handleClick(e, index)} onKeyDown={e => handleKeyDown(e, index)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <span className="effect filter" ref={filterRef} />
      <span className="effect text" ref={textRef} />
    </div>
  );
};

export default GooeyNav;
