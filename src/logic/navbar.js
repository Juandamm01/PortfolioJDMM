const SECTION_IDS = ['home', 'project', 'tech', 'experience', 'certifications', 'contact'];

function updateFilterPosition(navbar, activeLi) {
    const filterEl = document.getElementById('nav-filter');
    const container = document.getElementById('nav-container');
    if (!filterEl || !container || !activeLi) return;

    if (window.innerWidth <= 900) return;

    const containerRect = container.getBoundingClientRect();
    const pos = activeLi.getBoundingClientRect();

    filterEl.style.left = `${pos.x - containerRect.x}px`;
    filterEl.style.top = `${pos.y - containerRect.y}px`;
    filterEl.style.width = `${pos.width}px`;
    filterEl.style.height = `${pos.height}px`;
}

function makeParticles(filterEl) {
    if (window.innerWidth <= 900 || !filterEl) return;

    const particleCount = 12;
    const particleDistances = [85, 12];
    const particleR = 100;
    const animationTime = 600;
    const timeVariance = 300;
    const colors = ['#00f3ff', '#7df9ff', '#3178c6', '#f7df1e'];

    const noise = (n = 1) => n / 2 - Math.random() * n;
    const getXY = (distance, pointIndex, totalPoints) => {
        const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
        return [distance * Math.cos(angle), distance * Math.sin(angle)];
    };

    filterEl.querySelectorAll('.particle').forEach(p => {
        try { filterEl.removeChild(p); } catch (e) {}
    });

    for (let i = 0; i < particleCount; i++) {
        const t = animationTime * 2 + noise(timeVariance * 2);
        const rotate = noise(particleR / 10);
        const p = {
            start: getXY(particleDistances[0], particleCount - i, particleCount),
            end: getXY(particleDistances[1] + noise(7), particleCount - i, particleCount),
            time: t,
            scale: 1 + noise(0.2),
            color: colors[Math.floor(Math.random() * colors.length)],
            rotate: rotate > 0 ? (rotate + particleR / 20) * 10 : (rotate - particleR / 20) * 10
        };

        const particle = document.createElement('span');
        const point = document.createElement('span');
        particle.classList.add('particle');
        particle.style.setProperty('--start-x', `${p.start[0]}px`);
        particle.style.setProperty('--start-y', `${p.start[1]}px`);
        particle.style.setProperty('--end-x', `${p.end[0]}px`);
        particle.style.setProperty('--end-y', `${p.end[1]}px`);
        particle.style.setProperty('--time', `${p.time}ms`);
        particle.style.setProperty('--scale', `${p.scale}`);
        particle.style.setProperty('--color', p.color);
        particle.style.setProperty('--rotate', `${p.rotate}deg`);

        point.classList.add('point');
        particle.appendChild(point);
        filterEl.appendChild(particle);

        setTimeout(() => {
            try {
                filterEl.removeChild(particle);
            } catch (e) {}
        }, t);
    }
}

function setActiveNavItem(navbar, sectionId) {
    if (!SECTION_IDS.includes(sectionId)) sectionId = 'home';
    const filterEl = document.getElementById('nav-filter');

    navbar.querySelectorAll('.nav-links li').forEach((li) => {
        const a = li.querySelector('a[href^="#"]');
        if (!a) return;
        const href = a.getAttribute('href');
        if (href === `#${sectionId}`) {
            const wasActive = li.classList.contains('active');
            li.classList.add('active');
            updateFilterPosition(navbar, li);
            
            if (!wasActive && filterEl) {
                makeParticles(filterEl);
            }
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

    window.addEventListener('resize', () => {
        const activeLi = navbar.querySelector('.nav-links li.active');
        if (activeLi) {
            updateFilterPosition(navbar, activeLi);
        }
    });

    const initial = (window.location.hash || '#home').replace(/^#/, '');
    setActiveNavItem(navbar, SECTION_IDS.includes(initial) ? initial : 'home');
    requestAnimationFrame(applyScrollState);
}
