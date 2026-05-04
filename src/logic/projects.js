export function initProjectsInteractive() {
    if (!window.anime) return;

    const ease = 'cubicBezier(0.22, 1, 0.36, 1)';

    function resetToHidden(targets) {
        targets.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(24px)';
        });
    }

    function resetScale(targets) {
        targets.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'scale(0.96)';
        });
    }

    function resetBlade(blade) {
        if (blade) {
            blade.style.transform = 'scaleX(0)';
            blade.style.opacity = '0';
        }
    }

    function enterProjects(section) {
        const headerItems = section.querySelectorAll('.projects-header .badge, .projects-header h2');
        const cards = section.querySelectorAll('.project-card');
        const blade = section.querySelector('.saber-blade');

        window.anime({
            targets: headerItems,
            translateY: [24, 0],
            opacity: [0, 1],
            delay: window.anime.stagger(90, { start: 0 }),
            easing: ease,
            duration: 650
        });

        if (blade) {
            window.anime({
                targets: blade,
                scaleX: [0, 1],
                opacity: [0, 1],
                easing: ease,
                duration: 900,
                delay: 120
            });
        }

        window.anime({
            targets: cards,
            translateY: [32, 0],
            opacity: [0, 1],
            scale: [0.98, 1],
            delay: window.anime.stagger(120, { start: 200 }),
            easing: ease,
            duration: 720
        });

        window.anime({
            targets: section.querySelectorAll('.project-image'),
            scale: [1.06, 1],
            delay: window.anime.stagger(100, { start: 320 }),
            easing: ease,
            duration: 800
        });
    }

    function enterStack(section) {
        const headerItems = section.querySelectorAll('.projects-header .badge, .projects-header h2');
        const cards = section.querySelectorAll('.stack-card');
        const icons = section.querySelectorAll('.stack-item');

        window.anime({
            targets: headerItems,
            translateY: [24, 0],
            opacity: [0, 1],
            delay: window.anime.stagger(90, { start: 0 }),
            easing: ease,
            duration: 650
        });

        window.anime({
            targets: cards,
            translateY: [28, 0],
            opacity: [0, 1],
            delay: window.anime.stagger(55, { start: 180 }),
            easing: ease,
            duration: 580
        });

        window.anime({
            targets: icons,
            scale: [0.92, 1],
            opacity: [0, 1],
            delay: window.anime.stagger(22, { start: 420 }),
            easing: ease,
            duration: 420
        });
    }

    const projectSection = document.getElementById('project');
    const stackSection = document.getElementById('tech');

    if (projectSection) {
        resetToHidden([...projectSection.querySelectorAll('.projects-header .badge, .projects-header h2')]);
        resetToHidden([...projectSection.querySelectorAll('.project-card')]);
        resetBlade(projectSection.querySelector('.saber-blade'));
    }
    if (stackSection) {
        resetToHidden([...stackSection.querySelectorAll('.projects-header .badge, .projects-header h2')]);
        resetToHidden([...stackSection.querySelectorAll('.stack-card')]);
        resetScale([...stackSection.querySelectorAll('.stack-item')]);
    }

    const ioOpts = {
        root: null,
        threshold: 0.12,
        rootMargin: '0px 0px -6% 0px'
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
