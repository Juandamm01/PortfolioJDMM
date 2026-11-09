import { isReduced } from './env';

const INTERVAL = 2800;
const TURN_MS = 950;

/** Rotates the hero prism one face at a time, loading the next word onto the face about to show. */
export const initPrism = () => {
  const prism = document.querySelector<HTMLElement>('[data-prism]');
  const body = prism?.querySelector<HTMLElement>('[data-prism-body]');
  if (!prism || !body) return;

  const items: string[] = JSON.parse(prism.dataset.items ?? '[]');
  const faces = [...body.querySelectorAll<HTMLElement>('[data-face]')];
  faces[0]?.classList.add('is-front');
  if (isReduced() || items.length < 2) return;

  let step = 0;
  let timer = 0;

  const turn = () => {
    step += 1;
    const face = faces[step % faces.length];
    face.textContent = items[step % items.length];
    faces.forEach((f) => f.classList.toggle('is-front', f === face));
    // Turning the body backwards on X brings the next face (rotated +90°) to the front.
    body.style.setProperty('--turn', `${step * -90}deg`);
    prism.classList.add('is-turning');
    window.setTimeout(() => prism.classList.remove('is-turning'), TURN_MS);
  };

  const start = () => {
    if (!timer) timer = window.setInterval(turn, INTERVAL);
  };
  const stop = () => {
    window.clearInterval(timer);
    timer = 0;
  };

  new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop())).observe(prism);
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
};
