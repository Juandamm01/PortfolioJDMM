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
                duration: 400,
                delay: 0
            });
        }

        // Heading slides up with letter-spacing collapse
        if (heading) {
            window.anime({
                targets: heading,
                opacity: [0, 1],
                easing: ease,
                duration: 400,
                delay: 50
            });
        }

        // Cards rise in with perspective tilt
        window.anime({
            targets: cards,
            opacity: [0, 1],
            delay: window.anime.stagger(60, { start: 100 }),
            easing: ease,
            duration: 400
        });

        // Images scale into view
        window.anime({
            targets: images,
            opacity: [0, 1],
            delay: window.anime.stagger(50, { start: 200 }),
            easing: ease,
            duration: 400
        });

        // Pills cascade at the end
        window.anime({
            targets: pills,
            opacity: [0, 1],
            delay: window.anime.stagger(10, { start: 300 }),
            easing: spring,
            duration: 300
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
            '.project-card',
        ]);
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
