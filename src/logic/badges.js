export function initBadgesInteractive() {
    if (!window.anime) return;

    const section = document.getElementById('badges');
    if (!section) return;

    const animTargets = section.querySelectorAll('.badges-anim');
    if (animTargets.length === 0) return;

    const playEntrance = () => {
        window.anime.set(animTargets, { opacity: 0, translateY: 60, scale: 0.8, rotateX: 20, rotate: -5 });
        window.anime({
            targets: animTargets,
            translateY: [60, 0],
            opacity: [1, 1],
            scale: [0.8, 1],
            rotateX: [20, 0],
            rotate: [-5, 0],
            delay: window.anime.stagger(150, { start: 100 }),
            easing: 'spring(1, 80, 10, 0)',
            duration: 1200
        });
    };

    if (window.gsap && window.ScrollTrigger) {
        window.gsap.registerPlugin(window.ScrollTrigger);
        window.ScrollTrigger.create({
            trigger: section,
            start: "top 85%",
            onEnter: () => playEntrance()
        });
    } else {
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

    // Magnetic effect + 3D Tilt
    const cards = section.querySelectorAll('.badge-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            if (window.gsap) {
                window.gsap.to(card, {
                    x: x * 0.15,
                    y: y * 0.15,
                    rotationY: x * 0.05,
                    rotationX: -y * 0.05,
                    transformPerspective: 1000,
                    duration: 0.4,
                    ease: "power2.out"
                });
            }
        });

        card.addEventListener('mouseleave', () => {
            if (window.gsap) {
                window.gsap.to(card, {
                    x: 0,
                    y: 0,
                    rotationY: 0,
                    rotationX: 0,
                    duration: 0.7,
                    ease: "elastic.out(1, 0.3)"
                });
            }
        });
    });
}
