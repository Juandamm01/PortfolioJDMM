export function initProjectsInteractive() {
    if (!window.anime) return;

    const ease = 'cubicBezier(0.16, 1, 0.3, 1)'; // Expo ease out — very premium feel
    const spring = 'cubicBezier(0.34, 1.56, 0.64, 1)'; // Spring with slight overshoot

    function enterProjects(section) {
        const badge = section.querySelector('.projects-header .badge');
        const heading = section.querySelector('.projects-header h2');
        const cards = section.querySelectorAll('.project-card');
        const images = section.querySelectorAll('.project-image');
        const pills = section.querySelectorAll('.small-stack .tech-pill');

        // Badge drops in from above
        if (badge) {
            window.anime({
                targets: badge,
                opacity: [0, 1],
                easing: spring,
                duration: 750,
                delay: 0
            });
        }

        // Heading slides up with letter-spacing collapse
        if (heading) {
            window.anime({
                targets: heading,
                opacity: [0, 1],
                easing: ease,
                duration: 900,
                delay: 120
            });
        }

        // Cards rise in with perspective tilt
        window.anime({
            targets: cards,
            opacity: [0, 1],
            delay: window.anime.stagger(150, { start: 250 }),
            easing: ease,
            duration: 950
        });

        // Images scale into view
        window.anime({
            targets: images,
            opacity: [0, 1],
            delay: window.anime.stagger(120, { start: 450 }),
            easing: ease,
            duration: 900
        });

        // Pills cascade at the end
        window.anime({
            targets: pills,
            opacity: [0, 1],
            delay: window.anime.stagger(20, { start: 700 }),
            easing: spring,
            duration: 400
        });
    }

    function enterStack(section) {
        const badge = section.querySelector('.projects-header .badge');
        const heading = section.querySelector('.projects-header h2');
        const cards = section.querySelectorAll('.stack-card');
        const icons = section.querySelectorAll('.stack-item');
        const categories = section.querySelectorAll('.stack-category');

        if (badge) {
            window.anime({
                targets: badge,
                opacity: [0, 1],
                easing: spring,
                duration: 700
            });
        }

        if (heading) {
            window.anime({
                targets: heading,
                opacity: [0, 1],
                filter: ['blur(5px)', 'blur(0px)'],
                easing: ease,
                duration: 850,
                delay: 100
            });
        }

        // Cards fly in from slight downward with stagger
        window.anime({
            targets: cards,
            opacity: [0, 1],
            filter: ['blur(5px)', 'blur(0px)'],
            delay: window.anime.stagger(70, { start: 200 }),
            easing: ease,
            duration: 800
        });

        // Category labels reveal after cards
        window.anime({
            targets: categories,
            opacity: [0, 1],
            delay: window.anime.stagger(70, { start: 350 }),
            easing: ease,
            duration: 500
        });

        // Icons bounce in with spring
        window.anime({
            targets: icons,
            opacity: [0, 1],
            delay: window.anime.stagger(18, { start: 550 }),
            easing: spring,
            duration: 480
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
            '.project-card',
        ]);
    }
    if (stackSection) {
        setInitial(stackSection, [
            '.projects-header .badge',
            '.projects-header h2',
            '.stack-card',
            '.stack-item',
            '.stack-category',
        ]);
    }

    const ioOpts = {
        root: null,
        threshold: 0.08,
        rootMargin: '0px 0px -4% 0px'
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
