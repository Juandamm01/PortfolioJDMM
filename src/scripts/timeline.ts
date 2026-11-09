import { clamp, root } from './env';

/**
 * Experience timeline: the entry crossing the middle of the viewport becomes active,
 * rolls the year odometer, and tints the night ambient with its own light.
 */
export const initTimeline = () => {
  const timeline = document.querySelector<HTMLElement>('[data-timeline]');
  if (!timeline) return;

  const entries = [...timeline.querySelectorAll<HTMLElement>('[data-entry]')];
  const digits = [...document.querySelectorAll<HTMLElement>('[data-odometer] .odometer__digit')];
  const kind = document.querySelector<HTMLElement>('[data-odometer-kind]');
  const fill = timeline.querySelector<HTMLElement>('[data-timeline-fill]');

  const activate = (entry: HTMLElement) => {
    entries.forEach((el) => el.classList.toggle('is-active', el === entry));

    const year = entry.dataset.year ?? '';
    year.split('').forEach((digit, i) => digits[i]?.style.setProperty('--d', digit));

    if (entry.dataset.glow) root.style.setProperty('--glow', entry.dataset.glow);

    if (kind && entry.dataset.kind && kind.textContent !== entry.dataset.kind) {
      kind.classList.add('is-swapping');
      window.setTimeout(() => {
        kind.textContent = entry.dataset.kind ?? '';
        kind.classList.remove('is-swapping');
      }, 300);
    }
  };

  const entryObserver = new IntersectionObserver(
    (records) => {
      for (const record of records) {
        if (record.isIntersecting) activate(record.target as HTMLElement);
      }
    },
    { rootMargin: '-45% 0px -45% 0px' },
  );
  entries.forEach((entry) => entryObserver.observe(entry));

  // Progress rail: only listens to scroll while the timeline is on screen.
  if (!fill) return;
  let frame = 0;
  const paint = () => {
    frame = 0;
    const rect = timeline.getBoundingClientRect();
    const progress = clamp((window.innerHeight * 0.5 - rect.top) / rect.height, 0, 1);
    fill.style.setProperty('--progress', progress.toFixed(4));
  };
  const onScroll = () => {
    if (!frame) frame = requestAnimationFrame(paint);
  };
  new IntersectionObserver(([record]) => {
    if (record.isIntersecting) {
      window.addEventListener('scroll', onScroll, { passive: true });
      paint();
    } else {
      window.removeEventListener('scroll', onScroll);
    }
  }).observe(timeline);
};
