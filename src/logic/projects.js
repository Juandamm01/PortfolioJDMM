export function initProjectsInteractive() {
    if (!window.anime) return;

    // ─── Helper: reset un grupo de elementos a su estado inicial ───────────
    function resetToHidden(targets) {
        targets.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(40px)';
        });
    }

    function resetScale(targets) {
        targets.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'scale(0.8)';
        });
    }

    function resetBlade(blade) {
        if (blade) {
            blade.style.transform = 'scaleX(0)';
            blade.style.opacity = '0';
        }
    }

    // ─── PROJECTS SECTION ──────────────────────────────────────────────────
    function enterProjects(section) {
        const headerItems = section.querySelectorAll('.projects-header .badge, .projects-header h2');
        const cards = section.querySelectorAll('.project-card');
        const blade = section.querySelector('.saber-blade');

        // 1. Header — igual que Welcome.astro entrance-anim
        window.anime({
            targets: headerItems,
            translateY: [40, 0],
            opacity: [0, 1],
            delay: window.anime.stagger(150, { start: 0 }),
            easing: 'easeOutQuart',
            duration: 900
        });

        // 2. Sable de luz se enciende con glow
        if (blade) {
            window.anime({
                targets: blade,
                scaleX: [0, 1],
                opacity: [0, 1],
                easing: 'easeOutElastic(1, .5)',
                duration: 1400,
                delay: 200
            });
        }

        // 3. Cards entran desde abajo — igual DNA que Hero
        window.anime({
            targets: cards,
            translateY: [60, 0],
            opacity: [0, 1],
            scale: [0.94, 1],
            delay: window.anime.stagger(200, { start: 350 }),
            easing: 'easeOutQuart',
            duration: 1000
        });

        // 4. Imágenes hacen zoom-out reveal (premium)
        window.anime({
            targets: section.querySelectorAll('.project-image'),
            scale: [1.15, 1],
            delay: window.anime.stagger(200, { start: 500 }),
            easing: 'easeOutQuart',
            duration: 1200
        });
    }

    function leaveProjects(section) {
        resetToHidden([...section.querySelectorAll('.projects-header .badge, .projects-header h2')]);
        resetToHidden([...section.querySelectorAll('.project-card')]);
        resetBlade(section.querySelector('.saber-blade'));
    }

    // ─── TECHSTACK SECTION ────────────────────────────────────────────────
    function enterStack(section) {
        const headerItems = section.querySelectorAll('.projects-header .badge, .projects-header h2');
        const cards = section.querySelectorAll('.stack-card');
        const icons = section.querySelectorAll('.stack-item');

        // 1. Header — igual DNA
        window.anime({
            targets: headerItems,
            translateY: [40, 0],
            opacity: [0, 1],
            delay: window.anime.stagger(150, { start: 0 }),
            easing: 'easeOutQuart',
            duration: 900
        });

        // 2. Cards con flipping 3D entrance — más vistoso
        window.anime({
            targets: cards,
            translateY: [50, 0],
            opacity: [0, 1],
            rotateX: ['10deg', '0deg'],
            delay: window.anime.stagger(70, { start: 300 }),
            easing: 'easeOutQuart',
            duration: 700
        });

        // 3. Íconos pop-in elástico dentro de las cards
        window.anime({
            targets: icons,
            scale: [0, 1],
            opacity: [0, 1],
            delay: window.anime.stagger(30, { start: 700 }),
            easing: 'easeOutElastic(1, .8)',
            duration: 500
        });
    }

    function leaveStack(section) {
        resetToHidden([...section.querySelectorAll('.projects-header .badge, .projects-header h2')]);
        resetToHidden([...section.querySelectorAll('.stack-card')]);
        resetScale([...section.querySelectorAll('.stack-item')]);
    }

    // ─── Observar ENTRADA y SALIDA de cada sección ───────────────────────
    const projectSection = document.getElementById('project');
    const stackSection = document.getElementById('techstack');

    // Reset inicial
    if (projectSection) leaveProjects(projectSection);
    if (stackSection) leaveStack(stackSection);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const section = entry.target;

            if (entry.isIntersecting) {
                if (section.id === 'project') enterProjects(section);
                if (section.id === 'techstack') enterStack(section);
            } else {
                // Al SALIR, reseteamos para que la próxima vez vuelva a animar
                if (section.id === 'project') leaveProjects(section);
                if (section.id === 'techstack') leaveStack(section);
            }
        });
    }, {
        root: null,
        threshold: 0.1
    });

    if (projectSection) observer.observe(projectSection);
    if (stackSection) observer.observe(stackSection);
}
