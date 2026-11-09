import { clamp, isReduced, root } from './env';

const SWING_MS = 380;
const PUSH_MS = 820;

/**
 * Doors are real links. A plain click opens the door, pushes the camera through it and then
 * navigates; the project page picks the preview up with a view transition.
 */
const enterDoor = (door: HTMLAnchorElement, event: MouseEvent) => {
  const section = door.closest<HTMLElement>('[data-projects]');
  const modified = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
  if (modified || !section || isReduced()) return;

  event.preventDefault();
  if (section.classList.contains('is-entering')) return;

  // Aim the camera at the opening of the chosen door.
  const room = door.querySelector('.door__room') ?? door;
  const rect = room.getBoundingClientRect();
  const box = section.getBoundingClientRect();
  section.style.setProperty('--zx', `${rect.left + rect.width / 2 - box.left}px`);
  section.style.setProperty('--zy', `${rect.top + rect.height / 2 - box.top}px`);
  section.style.setProperty('--zoom', `${Math.min(6, (window.innerHeight / rect.height) * 1.15).toFixed(2)}`);

  door.classList.add('is-entering');
  window.setTimeout(() => section.classList.add('is-entering'), SWING_MS);
  window.setTimeout(() => {
    window.location.href = door.href;
  }, SWING_MS + PUSH_MS);
};

/** Mobile carousel: keeps the position dots in sync with the door closest to the centre. */
const initCarousel = () => {
  const track = document.querySelector<HTMLElement>('[data-carousel]');
  const dots = [...document.querySelectorAll<HTMLElement>('[data-carousel-dot]')];
  if (!track || !dots.length) return;
  const units = [...track.children] as HTMLElement[];
  let frame = 0;
  const sync = () => {
    frame = 0;
    const centre = track.scrollLeft + track.clientWidth / 2;
    let closest = 0;
    units.forEach((unit, i) => {
      const mid = unit.offsetLeft + unit.offsetWidth / 2;
      const best = units[closest].offsetLeft + units[closest].offsetWidth / 2;
      if (Math.abs(mid - centre) < Math.abs(best - centre)) closest = i;
    });
    dots.forEach((dot, i) => dot.classList.toggle('is-current', i === closest));
  };
  track.addEventListener('scroll', () => {
    if (!frame) frame = requestAnimationFrame(sync);
  }, { passive: true });
};

/**
 * Phones: while the hall is pinned, vertical scroll progress picks the current door
 * (equal segments, one door at a time) and the track glides to it. Reduced motion keeps
 * the native swipe carousel instead.
 */
const initPinnedDoors = () => {
  const pin = document.querySelector<HTMLElement>('[data-hall-pin]');
  const hall = pin?.querySelector<HTMLElement>('[data-hall]');
  const track = pin?.querySelector<HTMLElement>('[data-carousel]');
  const dots = [...document.querySelectorAll<HTMLElement>('[data-carousel-dot]')];
  if (!pin || !hall || !track) return;
  const units = [...track.children] as HTMLElement[];
  const phone = window.matchMedia('(max-width: 860px)');
  let current = -1;
  let frame = 0;

  const show = (index: number) => {
    if (index === current) return;
    current = index;
    track.style.setProperty('--track-x', `${-(units[index].offsetLeft - units[0].offsetLeft)}px`);
    dots.forEach((dot, i) => dot.classList.toggle('is-current', i === index));
  };

  const progress = () => {
    const box = pin.getBoundingClientRect();
    const stuck = hall.getBoundingClientRect();
    return clamp((stuck.top - box.top) / Math.max(box.height - stuck.height, 1), 0, 0.9999);
  };

  const update = () => {
    frame = 0;
    if (root.classList.contains('doors-pinned')) show(Math.floor(progress() * units.length));
  };

  const setup = () => {
    const on = phone.matches && !isReduced();
    root.classList.toggle('doors-pinned', on);
    current = -1;
    if (on) {
      track.scrollLeft = 0;
      update();
    } else {
      track.style.removeProperty('--track-x');
    }
  };

  window.addEventListener('scroll', () => {
    if (!frame) frame = requestAnimationFrame(update);
  }, { passive: true });
  phone.addEventListener('change', setup);
  window.addEventListener('resize', () => {
    current = -1;
    update();
  });

  // Keyboard users: focusing a hidden door scrolls the page to that door's segment.
  units.forEach((unit, i) => {
    unit.addEventListener('focusin', () => {
      if (!root.classList.contains('doors-pinned')) return;
      const box = pin.getBoundingClientRect();
      const distance = box.height - hall.getBoundingClientRect().height;
      const stickyTop = parseFloat(getComputedStyle(hall).top) || 0;
      const top = window.scrollY + box.top - stickyTop + (distance * (i + 0.5)) / units.length;
      window.scrollTo({ top, behavior: 'instant' });
      track.scrollLeft = 0;
    });
  });

  setup();
};

export const initDoors = () => {
  initPinnedDoors();
  document.querySelectorAll<HTMLAnchorElement>('a[data-door]').forEach((door) => {
    door.addEventListener('click', (event) => enterDoor(door, event));
  });
  initCarousel();

  // Coming back with the browser's Back button restores the page from cache: close the doors.
  window.addEventListener('pageshow', (event) => {
    if (!event.persisted) return;
    document.querySelectorAll('.is-entering').forEach((el) => el.classList.remove('is-entering'));
  });
};
