type Dot = {
  x: number;
  y: number;
  radius: number;
  phase: number;
  speed: number;
};

export function initBlinkingDots(): void {
  const canvas = document.querySelector<HTMLCanvasElement>('.stage__dots');
  const context = canvas?.getContext('2d', { alpha: true });
  if (!canvas || !context) return;

  const root = document.documentElement;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const smallScreen = matchMedia('(max-width: 768px)');
  const dots: Dot[] = [];
  let width = 0;
  let height = 0;
  let frame = 0;
  let color = 'rgba(15, 23, 42, 0.25)';

  const createDots = () => {
    const area = width * height;
    const lowPower = root.classList.contains('lite');
    const maxDots = lowPower ? 36 : smallScreen.matches ? 72 : 180;
    const minDots = smallScreen.matches ? 24 : 48;
    const count = Math.min(maxDots, Math.max(minDots, Math.round(area / 7000)));

    dots.length = 0;
    for (let index = 0; index < count; index += 1) {
      dots.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 0.7 + Math.random() * 1.1,
        phase: Math.random() * Math.PI * 2,
        speed: 0.45 + Math.random() * 0.8,
      });
    }
  };

  const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, smallScreen.matches ? 1 : 1.25);
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    createDots();
    paint(0);
  };

  const paint = (time: number) => {
    context.clearRect(0, 0, width, height);
    context.fillStyle = color;

    for (const dot of dots) {
      const blink = reduceMotion.matches ? 0.65 : 0.25 + (Math.sin(time * 0.001 * dot.speed + dot.phase) + 1) * 0.3;
      context.globalAlpha = blink;
      context.beginPath();
      context.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
      context.fill();
    }

    context.globalAlpha = 1;
  };

  const syncTheme = () => {
    const isDark =
      root.classList.contains('lights-off') ||
      root.classList.contains('dark') ||
      root.dataset.theme === 'dark';
    color = isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(15, 23, 42, 0.25)';
    paint(0);
  };

  const animate = (time: number) => {
    if (document.hidden) {
      frame = 0;
      return;
    }
    paint(time);
    frame = requestAnimationFrame(animate);
  };

  const start = () => {
    if (!reduceMotion.matches && !document.hidden && !frame) {
      frame = requestAnimationFrame(animate);
    } else if (reduceMotion.matches) {
      paint(0);
    }
  };

  const stop = () => {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
  };

  const themeObserver = new MutationObserver(syncTheme);
  themeObserver.observe(root, { attributes: true, attributeFilter: ['class', 'data-theme'] });

  window.addEventListener('resize', resize, { passive: true });
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  reduceMotion.addEventListener('change', () => {
    stop();
    start();
  });
  smallScreen.addEventListener('change', resize);

  resize();
  syncTheme();
  start();
}
