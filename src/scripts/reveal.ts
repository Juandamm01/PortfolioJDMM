import { isReduced } from './env';

export const initReveal = () => {
  const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (isReduced() || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        // Items in a horizontal row (the doors carousel) reveal together, not as they are swiped in.
        const group = entry.target.closest('[data-reveal-group]');
        const batch = group ? group.querySelectorAll('[data-reveal]') : [entry.target];
        batch.forEach((el) => {
          el.classList.add('is-in');
          observer.unobserve(el);
        });
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
  );
  targets.forEach((el) => observer.observe(el));
};
