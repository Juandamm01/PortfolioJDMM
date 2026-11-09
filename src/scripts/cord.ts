import { clamp, isReduced, root } from './env';

const STORAGE_KEY = 'jdm-lights';
const THEME_COLOR = { light: '#e3e8ee', dark: '#0c111d' } as const;

// Spring constants: a stiff, lightly damped stretch and a slower pendulum swing.
const STRETCH_K = 380;
const STRETCH_DAMP = 12;
const SWING_K = 40;
const SWING_DAMP = 2.2;
const PULL_THRESHOLD = 16;
const MAX_STRETCH = 44;

type CordState = { s: number; vs: number; th: number; w: number };

const store = (off: boolean) => {
  try {
    localStorage.setItem(STORAGE_KEY, off ? 'off' : 'on');
  } catch {
    /* Storage can be unavailable (private mode); the switch still works for this visit. */
  }
};

const syncMeta = (off: boolean) => {
  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (meta) meta.content = off ? THEME_COLOR.dark : THEME_COLOR.light;
};

const syncLabel = (cord: HTMLElement, off: boolean) => {
  const label = off ? cord.dataset.labelOff : cord.dataset.labelOn;
  if (label) cord.setAttribute('aria-label', label);
};

/** Applies the new lighting, revealed as a circle of light from the bead when supported. */
const switchLights = (cord: HTMLElement, bead: HTMLElement) => {
  const off = !root.classList.contains('lights-off');
  const apply = () => {
    root.classList.toggle('lights-off', off);
    syncLabel(cord, off);
    syncMeta(off);
    store(off);
  };

  const rect = bead.getBoundingClientRect();
  root.style.setProperty('--cord-x', `${rect.left + rect.width / 2}px`);
  root.style.setProperty('--cord-y', `${rect.top + rect.height / 2}px`);

  const startTransition = (document as Document & { startViewTransition?: (cb: () => void) => { finished: Promise<void> } })
    .startViewTransition;
  if (!startTransition || isReduced()) {
    apply();
    return;
  }
  root.classList.add('theme-swapping');
  const transition = startTransition.call(document, apply);
  transition.finished.finally(() => root.classList.remove('theme-swapping'));
};

export const initCord = () => {
  const cord = document.querySelector<HTMLElement>('[data-cord]');
  const string = cord?.querySelector<SVGPathElement>('[data-cord-string]');
  const bead = cord?.querySelector<HTMLElement>('[data-cord-bead]');
  if (!cord || !string || !bead) return;

  syncLabel(cord, root.classList.contains('lights-off'));
  syncMeta(root.classList.contains('lights-off'));

  const length = () => Number(getComputedStyle(cord.parentElement ?? cord).getPropertyValue('--cord-len')) || 58;
  const state: CordState = { s: 0, vs: 0, th: 0, w: 0 };
  let frame = 0;
  let last = 0;
  let toggleAtFullTension = false;

  const render = () => {
    const l = length() + state.s;
    const x = Math.sin(state.th) * l;
    const y = Math.cos(state.th) * l;
    // The control point lags behind the swing, so the cord bends like a real string.
    const cx = x * 0.5 - state.w * 5;
    const cy = y * 0.55;
    string.setAttribute('d', `M0 0 Q${cx.toFixed(2)} ${cy.toFixed(2)} ${x.toFixed(2)} ${y.toFixed(2)}`);
    bead.style.setProperty('--bx', `${x.toFixed(2)}px`);
    bead.style.setProperty('--by', `${y.toFixed(2)}px`);
    bead.style.setProperty('--br', `${(-state.th * 1.2).toFixed(3)}rad`);
  };

  const step = (now: number) => {
    const dt = Math.min((now - last) / 1000, 1 / 30);
    last = now;
    // Integrate in small sub-steps for a stable spring.
    for (let i = 0; i < 4; i += 1) {
      const h = dt / 4;
      state.vs += (-STRETCH_K * state.s - STRETCH_DAMP * state.vs) * h;
      state.s += state.vs * h;
      state.w += (-SWING_K * state.th - SWING_DAMP * state.w) * h;
      state.th += state.w * h;
    }
    if (toggleAtFullTension && state.vs <= 0) {
      toggleAtFullTension = false;
      switchLights(cord, bead);
    }
    render();
    const resting = Math.abs(state.s) < 0.05 && Math.abs(state.vs) < 0.05 && Math.abs(state.th) < 0.001 && Math.abs(state.w) < 0.005;
    if (resting) {
      Object.assign(state, { s: 0, vs: 0, th: 0, w: 0 });
      render();
      frame = 0;
      return;
    }
    frame = requestAnimationFrame(step);
  };

  const run = () => {
    if (frame) return;
    last = performance.now();
    frame = requestAnimationFrame(step);
  };

  /** A tug: the cord is yanked down, the light switches at full tension, then it swings back. */
  const tug = () => {
    if (isReduced()) {
      switchLights(cord, bead);
      return;
    }
    state.vs = 560;
    state.w += (Math.random() > 0.5 ? 1 : -1) * (0.9 + Math.random() * 0.6);
    toggleAtFullTension = true;
    run();
  };

  // Dragging: the bead follows the pointer with rubber-band resistance.
  let dragging = false;
  let moved = false;
  let suppressClick = false;
  let start = { x: 0, y: 0 };
  let prevS = 0;
  let prevT = 0;

  cord.addEventListener('pointerdown', (event) => {
    if (isReduced()) return;
    dragging = true;
    moved = false;
    start = { x: event.clientX, y: event.clientY };
    prevS = state.s;
    prevT = performance.now();
    cancelAnimationFrame(frame);
    frame = 0;
    cord.setPointerCapture(event.pointerId);
  });

  cord.addEventListener('pointermove', (event) => {
    if (!dragging) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.hypot(dx, dy) > 5) moved = true;
    const stretch = dy > 0 ? MAX_STRETCH * (1 - Math.exp(-dy / 70)) : -4 * (1 - Math.exp(dy / 30));
    const now = performance.now();
    state.vs = ((stretch - prevS) / Math.max(now - prevT, 1)) * 1000 * 0.35;
    prevS = stretch;
    prevT = now;
    state.s = stretch;
    state.th = clamp(Math.atan2(dx, length() + Math.max(dy, 0)) * 0.7, -0.6, 0.6);
    state.w = 0;
    render();
  });

  const release = () => {
    if (!dragging) return;
    dragging = false;
    if (moved) {
      suppressClick = true;
      if (state.s > PULL_THRESHOLD) switchLights(cord, bead);
    }
    run();
  };
  cord.addEventListener('pointerup', release);
  cord.addEventListener('pointercancel', release);

  // Click and keyboard (Enter/Space) both arrive here.
  cord.addEventListener('click', () => {
    if (suppressClick) {
      suppressClick = false;
      return;
    }
    tug();
  });

  render();
};
