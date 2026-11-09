/**
 * Kendrick Lamar easter egg: the headphones and the vinyl play/pause one track.
 * The audio is created on the first click (a user gesture), so autoplay policies allow it;
 * any rejection or load error is reported in the tooltip instead of failing silently.
 */
export const initAudio = () => {
  const control = document.querySelector<HTMLButtonElement>('.egg--music[data-audio-toggle]');
  const triggers = document.querySelectorAll<HTMLElement>('[data-audio-toggle]');
  const tip = control?.querySelector<HTMLElement>('[data-audio-tip]');
  if (!control || !triggers.length) return;

  const defaultTip = tip?.textContent ?? '';
  let audio: HTMLAudioElement | null = null;

  const setState = (playing: boolean) => {
    control.classList.toggle('is-playing', playing);
    control.setAttribute('aria-pressed', String(playing));
    control.setAttribute('aria-label', (playing ? control.dataset.labelPause : control.dataset.labelPlay) ?? '');
  };

  const showError = () => {
    setState(false);
    control.classList.add('has-error');
    if (tip) tip.textContent = control.dataset.labelError ?? '';
    window.setTimeout(() => {
      control.classList.remove('has-error');
      if (tip) tip.textContent = defaultTip;
    }, 3200);
  };

  const getAudio = () => {
    if (audio) return audio;
    audio = new Audio(control.dataset.audioSrc);
    audio.preload = 'none';
    audio.volume = 0.6;
    audio.addEventListener('ended', () => setState(false));
    audio.addEventListener('pause', () => setState(false));
    audio.addEventListener('play', () => setState(true));
    audio.addEventListener('error', showError);
    return audio;
  };

  const toggle = async () => {
    const track = getAudio();
    if (!track.paused) {
      track.pause();
      return;
    }
    try {
      await track.play();
    } catch (error) {
      // NotAllowedError (autoplay policy) or NotSupportedError (missing/invalid file).
      if (error instanceof DOMException && error.name === 'AbortError') return;
      showError();
    }
  };

  triggers.forEach((trigger) => trigger.addEventListener('click', toggle));
  // Leaving the tab pauses the music.
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) audio?.pause();
  });
};
