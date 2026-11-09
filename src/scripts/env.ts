export const root = document.documentElement;

export const isReduced = () => root.classList.contains('reduced');

/** Precise pointer with hover: desktop mouse or trackpad. Touch devices never get cursor effects. */
export const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

export const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/** Batches pointer-driven style writes into one animation frame. */
export const rafThrottle = <A extends unknown[]>(fn: (...args: A) => void) => {
  let frame = 0;
  let lastArgs: A;
  return (...args: A) => {
    lastArgs = args;
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      fn(...lastArgs);
    });
  };
};
