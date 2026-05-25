export function initProjectsInteractive() {
    if (!window.anime) return;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const ease = 'cubicBezier(0.16, 1, 0.3, 1)';
    const spring = isMobile ? 'easeOutCubic' : 'cubicBezier(0.34, 1.56, 0.64, 1)';

    function peekFolder(folderEl) {
        if (!folderEl) return;
        folderEl.classList.remove('open', 'folder-click-peek');
        folderEl.classList.add('folder-scroll-peek');
        window.setTimeout(() => {
            folderEl.classList.remove('folder-scroll-peek');
        }, 560);
    }

    function enterProjects(section) {
        const badge = section.querySelector('.projects-header .badge');
        const heading = section.querySelector('.projects-header h2');
        const folderItems = section.querySelectorAll('.folder-project-item');
        const baseDelay = 100;
        const itemStagger = isMobile ? 110 : 150;

        if (badge) {
            window.anime({
                targets: badge,
                opacity: [0, 1],
                translateY: [-14, 0],
                easing: spring,
                duration: 420,
            });
        }

        if (heading) {
            window.anime({
                targets: heading,
                opacity: [0, 1],
                translateY: [18, 0],
                easing: ease,
                duration: 480,
                delay: 60,
            });
        }

        folderItems.forEach((item, index) => {
            const folder = item.querySelector('.folder');
            const name = item.querySelector('.folder-project-name');
            const fromRotate = index % 2 === 0 ? -12 : 12;
            const delay = baseDelay + index * itemStagger;

            window.anime({
                targets: item,
                opacity: [0, 1],
                duration: 16,
                delay,
                easing: 'linear',
            });

            if (folder) {
                window.anime({
                    targets: folder,
                    opacity: [0, 1],
                    translateY: [52, -6, 0],
                    scale: [0.5, 1.08, 1],
                    rotate: [fromRotate, 0],
                    duration: isMobile ? 720 : 880,
                    delay,
                    easing: spring,
                    complete: () => {
                        item.classList.add('is-revealed');
                        folder.style.removeProperty('transform');
                        folder.style.opacity = '1';
                        folder.style.willChange = 'auto';
                        peekFolder(folder);
                    },
                });
            }

            if (name) {
                window.anime({
                    targets: name,
                    opacity: [0, 1],
                    translateY: [18, 0],
                    duration: isMobile ? 360 : 420,
                    delay: delay + (isMobile ? 200 : 260),
                    easing: ease,
                });
            }
        });
    }

    function enterStack(section) {
        const badge = section.querySelector('.projects-header .badge');
        const heading = section.querySelector('.projects-header h2');
        const cards = section.querySelectorAll('.stack-card');

        if (badge) {
            window.anime({
                targets: badge,
                opacity: [0, 1],
                translateY: [-10, 0],
                easing: 'easeOutQuad',
                duration: 250
            });
        }

        if (heading) {
            window.anime({
                targets: heading,
                opacity: [0, 1],
                translateY: [10, 0],
                easing: 'easeOutQuad',
                duration: 300,
                delay: 50
            });
        }

        // Animar únicamente las tarjetas completas para máxima fluidez y cero lag
        window.anime({
            targets: cards,
            opacity: [0, 1],
            translateY: [20, 0],
            delay: window.anime.stagger(40, { start: 100 }),
            easing: 'easeOutSine',
            duration: 300
        });
    }

    // ----- Reset states -----
    const projectSection = document.getElementById('project');
    const stackSection = document.getElementById('tech');

    function setInitial(section, selectors) {
        selectors.forEach(sel => {
            section.querySelectorAll(sel).forEach(el => {
                el.style.opacity = '0';
            });
        });
    }

    if (projectSection) {
        setInitial(projectSection, [
            '.projects-header .badge',
            '.projects-header h2',
            '.folder-project-item',
            '.folder-project-name',
        ]);
        projectSection.querySelectorAll('.folder-project-item .folder').forEach((folder) => {
            folder.style.opacity = '0';
            folder.style.willChange = 'transform, opacity';
        });
    }
    if (stackSection) {
        setInitial(stackSection, [
            '.projects-header .badge',
            '.projects-header h2',
            '.stack-card'
        ]);
    }

    const ioOpts = {
        root: null,
        threshold: isMobile ? 0.22 : 0.18,
        rootMargin: isMobile ? '0px 0px -8% 0px' : '0px 0px -12% 0px',
    };

    let projectPlayed = false;
    let stackPlayed = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const section = entry.target;
            if (section.id === 'project' && !projectPlayed) {
                projectPlayed = true;
                enterProjects(section);
            }
            if (section.id === 'tech' && !stackPlayed) {
                stackPlayed = true;
                enterStack(section);
            }
        });
    }, ioOpts);

    if (projectSection) observer.observe(projectSection);
    if (stackSection) observer.observe(stackSection);
}
