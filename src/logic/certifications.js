export function initCertificationsInteractive() {
    if (!window.anime) return;

    const section = document.getElementById('certifications');
    if (!section) return;

    const animTargets = section.querySelectorAll('.cert-anim');
    if (animTargets.length === 0) return;

    const ease = 'cubicBezier(0.22, 1, 0.36, 1)';

    const playEntrance = () => {
        window.anime.set(animTargets, { opacity: 0, translateY: 28 });
        window.anime({
            targets: animTargets,
            translateY: [28, 0],
            opacity: [0, 1],
            scale: [0.98, 1],
            delay: window.anime.stagger(100, { start: 80 }),
            easing: ease,
            duration: 700
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
}
