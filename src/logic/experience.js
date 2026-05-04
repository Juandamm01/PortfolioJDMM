export function initExperienceInteractive() {
    if (!window.anime) return;

    const section = document.getElementById('experience');
    if (!section) return;

    const mainHeader = section.querySelector('.exp-main-anim');
    const cards = section.querySelectorAll('.exp-card-anim');

    const ease = 'cubicBezier(0.22, 1, 0.36, 1)';

    function resetExperience() {
        if (mainHeader) {
            mainHeader.style.opacity = '0';
            mainHeader.style.transform = 'translateY(20px)';
        }
        cards.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(28px) scale(0.98)';
        });
        section.querySelectorAll('.exp-dot').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'scale(0)';
        });
        section.querySelectorAll('.exp-bullets li').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateX(-10px)';
        });
    }

    function animateExperience() {
        if (mainHeader) {
            window.anime({
                targets: mainHeader,
                translateY: [20, 0],
                opacity: [0, 1],
                easing: ease,
                duration: 620
            });
        }

        window.anime({
            targets: cards,
            translateY: [28, 0],
            opacity: [0, 1],
            scale: [0.98, 1],
            delay: window.anime.stagger(110, { start: 120 }),
            easing: ease,
            duration: 680
        });

        window.anime({
            targets: section.querySelectorAll('.exp-dot'),
            scale: [0, 1],
            opacity: [0, 1],
            delay: window.anime.stagger(120, { start: 360 }),
            easing: ease,
            duration: 480
        });

        window.anime({
            targets: section.querySelectorAll('.exp-bullets li'),
            translateX: [-10, 0],
            opacity: [0, 1],
            delay: window.anime.stagger(35, { start: 520 }),
            easing: ease,
            duration: 380
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
    }, { root: null, threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

    observer.observe(section);
}
