export function initNavbarInteractive() {
    // Se ejecuta al cargar para darle el efecto dinámico exclusivo al Navbar
    if(window.anime) {
        window.anime({
            targets: '.nav-anim',
            translateY: [-20, 0],
            opacity: [0, 1],
            delay: window.anime.stagger(100, {start: 200}),
            easing: 'easeOutElastic(1, .8)'
        });
    }

    const navbar = document.getElementById('main-nav');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (!navbar) return;
        
        const currentScrollY = window.scrollY;
        
        // Add glassy background when scrolled past top
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide when scrolling down, show when scrolling up
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navbar.classList.add('hidden-scroll');
        } else {
            navbar.classList.remove('hidden-scroll');
        }

        lastScrollY = currentScrollY;
    }, { passive: true });
}
