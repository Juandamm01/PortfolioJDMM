export function initCertificationsInteractive() {
    if (!window.anime) return;

    const section = document.getElementById('certifications');
    if (!section) return;

    const animTargets = section.querySelectorAll('.cert-anim');
    if (animTargets.length === 0) return;

    const playEntrance = () => {
        // Reset to hidden before triggering stagger
        window.anime.set(animTargets, { opacity: 0, translateY: 50 });
        
        window.anime({
            targets: animTargets,
            translateY: [50, 0],
            opacity: [0, 1],
            scale: [0.95, 1],
            delay: window.anime.stagger(200, {start: 300}), // Delay slightly for scroll feel
            easing: 'easeOutElastic(1, .8)',
            duration: 1500
        });
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                playEntrance();
                // We keep animating every time it enters to satisfy "animacion when se llega ahi"
            }
        });
    }, { threshold: 0.1 });

    observer.observe(section);
}
