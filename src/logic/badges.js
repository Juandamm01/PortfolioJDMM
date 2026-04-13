export function initBadgesInteractive() {
    if (!window.anime) return;

    const section = document.getElementById('badges');
    if (!section) return;

    const animTargets = section.querySelectorAll('.badges-anim');
    if (animTargets.length === 0) return;

    const playEntrance = () => {
        // Reset to hidden before triggering stagger
        window.anime.set(animTargets, { opacity: 0, translateY: 60, scale: 0.9 });
        
        window.anime({
            targets: animTargets,
            translateY: [60, 0],
            opacity: [0, 1],
            scale: [0.9, 1],
            delay: window.anime.stagger(250, {start: 200}),
            easing: 'easeOutElastic(1, .8)',
            duration: 1800
        });
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                playEntrance();
            }
        });
    }, { threshold: 0.15 });

    observer.observe(section);

    // Subtle hover animation for cards is handled by CSS, 
    // but we could add more JS-based "pro" effects here if needed.
    // For example, a magnetic effect or light sweep.
}
