export function initNavbarInteractive() {
    const navbar = document.getElementById('main-nav');
    if (!navbar) return;

    let ticking = false;
    const SCROLL_GLASS_AT = 20;

    function applyScrollState() {
        ticking = false;
        const y = window.scrollY;
        if (y > SCROLL_GLASS_AT) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener(
        'scroll',
        () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(applyScrollState);
            }
        },
        { passive: true }
    );

    requestAnimationFrame(applyScrollState);

    // Navbar Entrance Animation
    if (window.anime) {
        const navElements = document.querySelectorAll('.nav-anim');
        
        // Initial state
        navElements.forEach(el => {
            el.style.opacity = '0';
        });

        window.anime({
            targets: navElements,
            opacity: [0, 1],
            delay: window.anime.stagger(50, { start: 100 }), // Slightly faster stagger for navbar
            easing: 'linear',
            duration: 800
        });
    }
}
