export function initExperienceInteractive() {
    if (!window.anime) return;

    const section = document.getElementById('experience');
    if (!section) return;

    const mainHeader = section.querySelector('.exp-main-anim');
    const cards = section.querySelectorAll('.exp-card-anim');

    function resetExperience() {
        if (mainHeader) {
            mainHeader.style.opacity = '0';
            mainHeader.style.transform = 'translateY(30px)';
        }
        cards.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(40px) scale(0.97)';
        });
        section.querySelectorAll('.exp-dot').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'scale(0)';
        });
        section.querySelectorAll('.exp-bullets li').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateX(-15px)';
        });
    }

    function animateExperience() {
        // 1. Main Title Entrance
        if (mainHeader) {
            window.anime({
                targets: mainHeader,
                translateY: [30, 0],
                opacity: [0, 1],
                easing: 'easeOutQuart',
                duration: 800
            });
        }

        // 2. Cards entrance
        window.anime({
            targets: cards,
            translateY: [40, 0],
            opacity: [0, 1],
            scale: [0.97, 1],
            delay: window.anime.stagger(200, { start: 200 }),
            easing: 'easeOutQuart',
            duration: 900
        });

        // 3. Timeline dots pop
        window.anime({
            targets: section.querySelectorAll('.exp-dot'),
            scale: [0, 1],
            opacity: [0, 1],
            delay: window.anime.stagger(200, { start: 500 }),
            easing: 'easeOutElastic(1, .8)',
            duration: 600
        });

        // 4. Bullets slide in
        window.anime({
            targets: section.querySelectorAll('.exp-bullets li'),
            translateX: [-15, 0],
            opacity: [0, 1],
            delay: window.anime.stagger(50, { start: 800 }),
            easing: 'easeOutQuart',
            duration: 400
        });
    }

    resetExperience();

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateExperience();
            } else {
                resetExperience();
            }
        });
    }, { root: null, threshold: 0.1 });

    observer.observe(section);
}
