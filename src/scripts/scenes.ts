import { clamp, finePointer, isReduced, rafThrottle, root } from './env';

type Gsap = typeof import('gsap').gsap;
type ScrollTriggerType = typeof import('gsap/ScrollTrigger').ScrollTrigger;

const DESKTOP = '(min-width: 1024px)';
const PANE_SPACING = 1100;

const $ = <T extends Element = HTMLElement>(sel: string, scope: ParentNode = document) => scope.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(sel: string, scope: ParentNode = document) => [...scope.querySelectorAll<T>(sel)];

/* ---------------- About: entrance → depth → zoom → slide right → exit down ---------------- */
const aboutScene = (gsap: Gsap) => {
  const section = $('[data-about]');
  const stage = $('[data-about-stage]');
  const inner = $('[data-about-inner]');
  const figure = $('[data-about-figure]');
  const halo = $('[data-about-halo]');
  const floor = $('[data-about-floor]');
  if (!section || !stage || !inner || !figure) return;
  const reveals = $$('[data-about-reveal]', section);

  // Distance from the figure's final (right-hand) place to the centre of the stage.
  // offsetLeft is measured from the stage (the nearest positioned ancestor) and ignores transforms.
  const toCentre = () => stage.offsetWidth / 2 - (figure.offsetLeft + figure.offsetWidth / 2);

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: { trigger: section, start: 'top 75%', end: 'bottom bottom', scrub: 1, invalidateOnRefresh: true },
  });
  tl.fromTo(figure, { x: toCentre, y: '12vh', scale: 0.78, opacity: 0, rotateY: -16 }, { y: 0, scale: 0.9, opacity: 1, rotateY: -8, duration: 0.24 })
    .fromTo(halo, { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3 }, 0)
    .fromTo(floor, { yPercent: 18, opacity: 0 }, { yPercent: 0, opacity: 0.7, duration: 0.3 }, 0)
    // The composition gains depth and slides right, clearing the space for the copy...
    .to(figure, { x: 0, scale: 1.02, rotateY: 0, duration: 0.24 }, 0.22)
    // ...which then steps in from the left. Its hidden start state comes from CSS (html.scenes).
    .fromTo(
      reveals,
      { x: -50, rotateY: 22, transformPerspective: 900, transformOrigin: '0% 50%' },
      { opacity: 1, x: 0, rotateY: 0, stagger: 0.05, duration: 0.16 },
      0.4,
    )
    // A slow camera push while the visitor reads.
    .to(figure, { scale: 1.09, duration: 0.2 }, 0.62)
    .to(halo, { scale: 1.15, duration: 0.2 }, 0.62)
    // Exit: the camera tilts down towards the next section.
    .to(inner, { y: '-10vh', rotateX: 9, z: -140, opacity: 0.35, transformPerspective: 1400, transformOrigin: '50% 100%', duration: 0.18 }, 0.82)
    .to(floor, { yPercent: -20, opacity: 0, duration: 0.18 }, 0.82);
};

/* ---------------- Process: a camera flying through four planes ---------------- */
const processScene = (gsap: Gsap) => {
  const section = $('[data-process]');
  const stage = $('[data-process-stage]');
  const world = $('[data-process-world]');
  if (!section || !stage || !world) return;
  const panes = $$('[data-pane]', section);
  const depths = panes.map((_, i) => -i * PANE_SPACING);

  const layout = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const xs = [-0.19, 0.19, -0.17, 0.18].map((f) => f * w);
    const ys = [0.02, -0.05, 0.03, -0.03].map((f) => f * h);
    panes.forEach((pane, i) => {
      pane.style.setProperty('--x', `${xs[i]}px`);
      pane.style.setProperty('--y', `${ys[i]}px`);
      pane.style.setProperty('--z', `${depths[i]}px`);
    });
  };
  layout();

  const camera = { z: 0 };
  const apply = () => {
    world.style.setProperty('--cam', `${camera.z}px`);
    let closest = 0;
    panes.forEach((pane, i) => {
      const z = depths[i] + camera.z;
      // Planes fade in from the fog and dissolve once the camera passes through them.
      const near = z > 220 ? 1 - clamp((z - 220) / 380, 0, 1) : 1;
      const far = 1 - clamp(-z / 3200, 0, 1) * 0.8;
      pane.style.opacity = (near * far).toFixed(3);
      pane.style.visibility = near <= 0 ? 'hidden' : 'visible';
      if (Math.abs(z) < Math.abs(depths[closest] + camera.z)) closest = i;
    });
    panes[closest]?.classList.add('is-lit');
  };

  gsap.to(camera, {
    z: (panes.length - 1) * PANE_SPACING,
    ease: 'none',
    onUpdate: apply,
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      onRefresh: layout,
    },
  });
  apply();

  // The camera leans a little towards the cursor.
  if (finePointer.matches) {
    const lean = rafThrottle((x: number, y: number) => {
      stage.style.setProperty('--px', `${50 + (x / window.innerWidth - 0.5) * 14}%`);
      stage.style.setProperty('--py', `${45 + (y / window.innerHeight - 0.5) * 10}%`);
    });
    stage.addEventListener('pointermove', (e) => lean(e.clientX, e.clientY));
  }
};

/* ---------------- Footer: the name rises into place as the page ends ---------------- */
const footerScene = (gsap: Gsap) => {
  const band = $('[data-footer-band]');
  if (!band) return;
  gsap.fromTo(
    band,
    { rotateX: 62, yPercent: 40, opacity: 0, transformPerspective: 900, transformOrigin: '50% 100%' },
    {
      rotateX: 0,
      yPercent: 0,
      opacity: 1,
      ease: 'none',
      scrollTrigger: { trigger: band, start: 'top bottom', end: 'bottom 85%', scrub: 1 },
    },
  );
};

/* ---------------- Light fallbacks: mobile, tablets and reduced motion ---------------- */
const initFallbacks = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (root.classList.contains('scenes')) return;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-lit');
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -15% 0px', threshold: 0.25 },
  );
  $$('[data-pane]').forEach((pane) => observer.observe(pane));
};

let loaded: Promise<[Gsap, ScrollTriggerType]> | null = null;
const loadGsap = () => {
  loaded ??= Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([g, s]) => {
    g.gsap.registerPlugin(s.ScrollTrigger);
    return [g.gsap, s.ScrollTrigger];
  });
  return loaded;
};

const startDesktopScenes = async () => {
  const [gsap, ScrollTrigger] = await loadGsap();
  const mm = gsap.matchMedia();
  mm.add(`${DESKTOP} and (prefers-reduced-motion: no-preference)`, () => {
    root.classList.add('scenes');
    aboutScene(gsap);
    processScene(gsap);
    footerScene(gsap);
    ScrollTrigger.refresh();
    return () => root.classList.remove('scenes');
  });
  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
};

/** GSAP is only downloaded where the desktop scenes run; phones never pay for it. */
export const initScenes = () => {
  initFallbacks();
  if (isReduced()) return;
  const desktop = window.matchMedia(DESKTOP);
  if (desktop.matches) {
    startDesktopScenes();
    return;
  }
  desktop.addEventListener('change', (event) => event.matches && startDesktopScenes(), { once: true });
};
