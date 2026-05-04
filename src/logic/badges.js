export function initBadgesInteractive() {
    if (!window.anime) return;

    const section = document.getElementById('badges');
    if (!section) return;

    const animTargets = section.querySelectorAll('.badges-anim');
    if (animTargets.length === 0) return;

    const ease = 'cubicBezier(0.22, 1, 0.36, 1)';

    const playEntrance = () => {
        window.anime.set(animTargets, { opacity: 0, translateY: 32, scale: 0.97 });
        window.anime({
            targets: animTargets,
            translateY: [32, 0],
            opacity: [0, 1],
            scale: [0.97, 1],
            delay: window.anime.stagger(100, { start: 80 }),
            easing: ease,
            duration: 720
        });
    };

    let played = false;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting || played) return;
            played = true;
            playEntrance();
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

    observer.observe(section);

    // Subtle hover animation for cards is handled by CSS, 
    // but we could add more JS-based "pro" effects here if needed.
    // For example, a magnetic effect or light sweep.
}
