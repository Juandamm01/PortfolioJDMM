const SECTION_IDS = ['home', 'project', 'tech', 'experience', 'certifications', 'contact'];

function setActiveNavItem(navbar, sectionId) {
    if (!SECTION_IDS.includes(sectionId)) sectionId = 'home';
    navbar.querySelectorAll('.nav-links li').forEach((li) => {
        const a = li.querySelector('a[href^="#"]');
        if (!a) return;
        const href = a.getAttribute('href');
        if (href === `#${sectionId}`) {
            li.classList.add('active');
        } else {
            li.classList.remove('active');
        }
    });
}

function getActiveSectionId(navbar) {
    const doc = document.documentElement;
    const scrollBottom = window.scrollY + window.innerHeight;
    if (scrollBottom >= doc.scrollHeight - 48) {
        return 'contact';
    }

    const navH = navbar.getBoundingClientRect().height || 72;
    const marker = window.scrollY + navH + 12;
    let current = 'home';

    for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= marker) {
            current = id;
        }
    }
    return current;
}

export function initNavbarInteractive() {
    if (window.anime) {
        window.anime({
            targets: '.nav-anim',
            translateY: [-14, 0],
            opacity: [0, 1],
            delay: window.anime.stagger(70, { start: 120 }),
            easing: 'cubicBezier(0.22, 1, 0.36, 1)',
            duration: 720
        });
    }

    const navbar = document.getElementById('main-nav');
    if (!navbar) return;

    let ticking = false;
    const SCROLL_GLASS_AT = 32;

    /** Tras clic en ancla, el scroll suave dispara muchos "scroll" y el spy devolvía la sección anterior hasta el final del movimiento. */
    let pendingClickNav = false;
    let clickLockId = 'home';
    let navLockTimer = null;

    function clearNavLockTimer() {
        if (navLockTimer) {
            clearTimeout(navLockTimer);
            navLockTimer = null;
        }
    }

    function finishClickNav() {
        clearNavLockTimer();
        pendingClickNav = false;
        setActiveNavItem(navbar, getActiveSectionId(navbar));
    }

    function armNavClickLock(sectionId) {
        clickLockId = sectionId;
        pendingClickNav = true;
        setActiveNavItem(navbar, sectionId);
        clearNavLockTimer();
        navLockTimer = setTimeout(finishClickNav, 1000);
    }

    function syncActiveForScroll() {
        if (pendingClickNav) {
            setActiveNavItem(navbar, clickLockId);
            return;
        }
        setActiveNavItem(navbar, getActiveSectionId(navbar));
    }

    function applyScrollState() {
        ticking = false;
        const y = window.scrollY;
        if (y > SCROLL_GLASS_AT) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        syncActiveForScroll();
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

    window.addEventListener(
        'scrollend',
        () => {
            if (pendingClickNav) {
                finishClickNav();
            }
        },
        { passive: true }
    );

    function onHashNav(href) {
        const id = href.startsWith('#') ? href.slice(1) : href;
        if (!SECTION_IDS.includes(id)) return;
        armNavClickLock(id);
    }

    navbar.querySelectorAll('.nav-links a[href^="#"]').forEach((a) => {
        a.addEventListener('click', () => {
            const href = a.getAttribute('href') || '#home';
            onHashNav(href);
        });
    });

    const logoHome = navbar.querySelector('a.logo[href="#home"]');
    if (logoHome) {
        logoHome.addEventListener('click', () => {
            onHashNav('#home');
        });
    }

    window.addEventListener('hashchange', () => {
        const id = (window.location.hash || '#home').replace(/^#/, '');
        if (SECTION_IDS.includes(id)) {
            armNavClickLock(id);
        }
    });

    const initial = (window.location.hash || '#home').replace(/^#/, '');
    setActiveNavItem(navbar, SECTION_IDS.includes(initial) ? initial : 'home');
    requestAnimationFrame(applyScrollState);
}
