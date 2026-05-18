export function initExperienceInteractive() {
    if (!window.anime) return;

    const section = document.getElementById('experience');
    if (!section) return;

    const mainHeader = section.querySelector('.exp-main-anim');
    const cards = section.querySelectorAll('.exp-card-anim');
    const dots = section.querySelectorAll('.exp-dot');
    const bullets = section.querySelectorAll('.exp-bullets li');
    const techPills = section.querySelectorAll('.exp-tech .tech-pill');
    const timeline = section.querySelector('.exp-timeline');

    const ease = 'cubicBezier(0.16, 1, 0.3, 1)'; // Expo ease out

    function resetExperience() {
        if (mainHeader) {
            mainHeader.style.opacity = '0';
        }
        cards.forEach(el => {
            el.style.opacity = '0';
        });
        dots.forEach(el => {
            el.style.opacity = '0';
        });
        bullets.forEach(el => {
            el.style.opacity = '0';
        });
        techPills.forEach(el => {
            el.style.opacity = '0';
        });
        if (timeline) {
            timeline.style.opacity = '0';
        }
    }

    function animateExperience() {
        // Timeline line draws in
        if (timeline) {
            window.anime({
                targets: timeline,
                opacity: [0, 1],
                easing: ease,
                duration: 500
            });
        }

        // Header slides up with blur clear
        if (mainHeader) {
            window.anime({
                targets: mainHeader,
                opacity: [0, 1],
                easing: ease,
                duration: 900
            });
        }

        // Cards come in with stagger, and scale
        window.anime({
            targets: cards,
            opacity: [0, 1],
            delay: window.anime.stagger(160, { start: 180 }),
            easing: ease,
            duration: 900
        });

        // Dots pop in
        window.anime({
            targets: dots,
            opacity: [0, 1],
            delay: window.anime.stagger(160, { start: 400 }),
            easing: 'cubicBezier(0.34, 1.56, 0.64, 1)', // Spring overshoot
            duration: 600
        });

        // Bullets cascade in
        window.anime({
            targets: bullets,
            opacity: [0, 1],
            delay: window.anime.stagger(40, { start: 600 }),
            easing: ease,
            duration: 500
        });

        // Tech pills bounce in
        window.anime({
            targets: techPills,
            opacity: [0, 1],
            delay: window.anime.stagger(30, { start: 800 }),
            easing: 'cubicBezier(0.34, 1.56, 0.64, 1)',
            duration: 450
        });
    }

    resetExperience();

    let played = false;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting || played) return;
            played = true;
            animateExperience();
        });
    }, { root: null, threshold: 0.08, rootMargin: '0px 0px -4% 0px' });

    observer.observe(section);
}
