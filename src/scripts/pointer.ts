import { clamp, finePointer, isReduced, rafThrottle } from './env';

/** Portrait: the rig tilts toward the cursor anywhere inside its section. */
const initTilt = (el: HTMLElement) => {
  const area = el.closest('section') ?? el;
  const max = Number(el.dataset.tiltMax ?? 6);

  const update = rafThrottle((x: number, y: number) => {
    const rect = el.getBoundingClientRect();
    const dx = clamp((x - (rect.left + rect.width / 2)) / (rect.width * 1.2), -1, 1);
    const dy = clamp((y - (rect.top + rect.height / 2)) / (rect.height * 1.2), -1, 1);
    el.style.setProperty('--ry', `${(dx * max).toFixed(2)}deg`);
    el.style.setProperty('--rx', `${(-dy * max * 0.8).toFixed(2)}deg`);
    el.style.setProperty('--px', `${((x - rect.left) / rect.width) * 100}%`);
    el.style.setProperty('--py', `${((y - rect.top) / rect.height) * 100}%`);
  });

  area.addEventListener('pointermove', (e) => {
    const event = e as PointerEvent;
    el.dataset.tilting = '';
    update(event.clientX, event.clientY);
  });
  area.addEventListener('pointerleave', () => {
    delete el.dataset.tilting;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  });
};

/** Doors: the whole wall leans a few degrees, so the doors read as objects in space. */
const initStage = (stage: HTMLElement) => {
  const area = stage.parentElement ?? stage;
  const update = rafThrottle((x: number, y: number) => {
    const rect = area.getBoundingClientRect();
    const nx = (x - rect.left) / rect.width - 0.5;
    const ny = (y - rect.top) / rect.height - 0.5;
    stage.style.setProperty('--ry', `${(nx * 6).toFixed(2)}deg`);
    stage.style.setProperty('--rx', `${(-ny * 4).toFixed(2)}deg`);
  });
  area.addEventListener('pointermove', (e) => update((e as PointerEvent).clientX, (e as PointerEvent).clientY));
  area.addEventListener('pointerleave', () => {
    stage.style.setProperty('--rx', '0deg');
    stage.style.setProperty('--ry', '0deg');
  });
};

/** Contact rows: the value drifts slightly toward the cursor. */
const initMagnetic = (el: HTMLElement) => {
  const update = rafThrottle((x: number, y: number) => {
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--tx', `${((x - rect.left - rect.width / 2) * 0.03).toFixed(1)}px`);
    el.style.setProperty('--ty', `${((y - rect.top - rect.height / 2) * 0.12).toFixed(1)}px`);
  });
  el.addEventListener('pointermove', (e) => update(e.clientX, e.clientY));
  el.addEventListener('pointerleave', () => {
    el.style.setProperty('--tx', '0px');
    el.style.setProperty('--ty', '0px');
  });
};

/** Night spotlight that follows the cursor across the fixed stage. */
const initSpotlight = () => {
  const stage = document.querySelector<HTMLElement>('.stage');
  if (!stage) return;
  const update = rafThrottle((x: number, y: number) => {
    stage.style.setProperty('--mx', `${x}px`);
    stage.style.setProperty('--my', `${y}px`);
  });
  window.addEventListener('pointermove', (e) => update(e.clientX, e.clientY), { passive: true });
};

export const initPointer = () => {
  if (!finePointer.matches || isReduced()) return;
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach(initTilt);
  document.querySelectorAll<HTMLElement>('[data-tilt-stage]').forEach(initStage);
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach(initMagnetic);
  initSpotlight();
};
