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
        const isHome = window.location.pathname === '/' || window.location.pathname.endsWith('index.html');
        
        if (isHome) {
            window.anime({
                targets: navElements,
                opacity: [0, 1],
                translateY: [-20, 0],
                delay: window.anime.stagger(40, { start: 200 }),
                easing: 'easeOutCubic',
                duration: 700
            });
        } else {
            // Instant show on secondary pages (no entrance drop animation)
            navElements.forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            });
        }
    }
}
