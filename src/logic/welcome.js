export function initWelcomeInteractive() {
    // --- 0. Languages and Data ---
    const translations = {
        es: {
            nav_role: "Desarrollador de Software",
            nav_logo_strong: "JUAN DAVID",
            nav_logo_muted: "MARTÍNEZ",
            nav_home: "Inicio",
            nav_project: "Proyectos",
            nav_stack: "Stack",
            nav_experience: "Experiencia",
            nav_cert: "Diplomas",
            nav_contact: "Contacto",
            badge: "Un desarrollador, guiado por la Fuerza.",
            title: 'BIENVENIDO A MI <br/> <span class="text-cyan">PORTAFOLIO</span>',
            typed: "Desarrollador de Software",
            description: "Soy un estudiante de <strong>6º semestre</strong> de Desarrollo de Software con experiencia en proyectos Fullstack usando <strong><span class=\"text-cyan\">Next.js</span></strong>, <strong><span class=\"text-cyan\">React.js</span></strong>, <strong><span class=\"text-cyan\">JavaScript</span></strong> y <strong><span class=\"text-cyan\">TypeScript</span></strong>. Me apasiona construir aplicaciones web y móviles funcionales con excelente experiencia de usuario. Enfocado en optimizar interfaces y aportar soluciones técnicas escalables como desarrollador Front-End, destacándome por mi <strong>buena comunicación</strong> y <strong>trabajo en equipo</strong>, además de mi aprendizaje continuo en <strong>AWS</strong> y <strong>Docker</strong> (nivel principiante).",
            id_header: "DESARROLLO DE SOFTWARE",
            id_role: "DESARROLLADOR FRONT END",
            scroll_down: "Desliza abajo",
            download_cv: "Descargar CV",
            // Featured Projects
            projects_badge: "Mi Trabajo",
            projects_title: 'Proyectos <br/> <span class="text-cyan">Destacados</span>',
            btn_code: "Ver Código",
            project1_title: "Dra. Camila Henao Odontología",
            project1_desc: 'Desarrollo moderno y dinámico para clínica dental. Frontend construido en Next.js con animaciones fluidas a medida usando Framer Motion y GSAP para una experiencia interactiva inmersiva. <span class="text-cyan">(En Desarrollo)</span>',
            project2_title: "Bioconstructores Asociados SAS",
            project2_desc: "Panel de administración y landing corporativa Fullstack. Desarrollada con Next.js, React.js, Prisma, Neon y animaciones avanzadas con Framer Motion y GSAP. Incorpora infraestructura de backend robusta y almacenamiento escalable.",
            // Tech Stack
            stack_badge: "Tecnologías",
            stack_title: 'Mi <br/><span class="text-cyan">Stack</span>',
            cat_dev: "Lenguajes",
            cat_front: "Frontend",
            cat_back: "Backend",
            cat_frame: "Frameworks",
            cat_db: "Bases de Datos",
            cat_tools: "Herramientas",
            cat_cloud: "Cloud",
            cat_design: "Diseño",
            docker_wip: "En proceso",
            aws_level: "Principiante",
            // Experience
            exp_badge: "Trayectoria",
            exp_title: 'Experiencia & <span class="text-cyan">Estudios</span>',
            exp_col_label_prof: "💼 Experiencia Profesional",
            exp_col_label_edu: "🎓 Educación",
            exp_tag_onsite: "Presencial",
            exp_tag_present: "Activo",
            exp1_role: "Monitor de Lógica de Programación",
            exp1_b1: "Soporte técnico en lógica algorítmica con <strong>C++</strong>.",
            exp1_b2: "Tutorías prácticas sobre condicionales, ciclos y arreglos.",
            exp1_b3: "Fortalecimiento de liderazgo académico y comunicación.",
            exp2_role: "Desarrollador Web Fullstack",
            exp2_b1: "Desarrollé sitio web con <strong>Next.js</strong>, <strong>React.js</strong>, <strong>Prisma</strong> y <strong>Neon</strong>.",
            exp2_b2: "Animaciones con <strong>Framer Motion</strong> y <strong>GSAP</strong>.",
            exp2_b3: "Coordinación de proyectos y adaptación tecnológica.",
            edu_badge: "Formación",
            edu_title: "Educación",
            edu1_degree: "Tecnología en Desarrollo de Software",
            // Certifications
            cert_badge: "Reconocimientos",
            cert_title: 'Mis <br/> <span class="text-cyan">Certificaciones</span>',
            cert1_title: "Control de versiones con Git y GitHub",
            cert1_entity: "Crehana / TecMD",
            cert1_desc: "Certificación profesional en sistemas de control de versiones, enfocado en flujos de trabajo de Git y GitHub. Dominio de estrategias de ramificación, gestión de repositorios, Pull Requests y resolución de conflictos. Valida mi capacidad para gestionar bases de código complejas y colaborar en equipos ágiles.",
            cert1_date: "Abril 2025",
            cert2_title: "Kotlin: Apps desde Cero",
            cert2_entity: "Udemy",
            cert2_desc: "Desarrollo integral de 6 aplicaciones móviles nativas bajo la arquitectura moderna de Android. Aprendizaje profundo de Kotlin, Jetpack Compose, integración de APIs y gestión de estado para aplicaciones robustas y escalables.",
            cert2_date: "Julio 2025",
            cert3_title: "Programación Nivel Explorador",
            cert3_entity: "Ministerio TIC / CUN",
            cert3_desc: "El curso Explorador de Talento Tech introduce los fundamentos del desarrollo web, incluyendo HTML y CSS básico, el desarrollo de lógica de programación con <strong>JavaScript (Nivel Intermedio)</strong> y la creación de proyectos prácticos.",
            cert3_date: "Agosto 2025",
            // Badges
            badges_badge: "Reconocimientos Digitales",
            badges_title: 'Mis <br/> <span class="text-cyan">Badges</span>',
            badge1_title: "Compila apps con Flutter",
            badge1_desc: "Aprendí a crear apps web, para dispositivos móviles y de escritorio atractivas y compiladas de forma nativa a partir de una sola base de código con Flutter.",
            badge2_title: "Administración del trabajo con GitHub Projects",
            badge2_desc: "Aprendí a usar GitHub Projects para crear incidencias, dividirlos en tareas, realizar un seguimiento de las relaciones, agregar campos personalizados y tener conversaciones.",
            // Footer
            footer_cta: "¿TRABAJAMOS <br/><span class='text-cyan'>JUNTOS?</span>",
            footer_quote: "Construyendo el futuro de la web y el desarrollo móvil, una línea de código a la vez.",
            footer_contact_title: "Contacto",
            footer_navigation_title: "Navegación",
            footer_rights: "Todos los derechos reservados.",
            footer_tagline: "Que la Fuerza te acompañe.",
            nav_tech: "Tecnologías",
            nav_experience: "Experiencia",
        },
        en: {
            nav_role: "Software Developer",
            nav_logo_strong: "JUAN DAVID",
            nav_logo_muted: "MARTINEZ",
            nav_home: "Home",
            nav_project: "Projects",
            nav_stack: "Stack",
            nav_experience: "Experience",
            nav_cert: "Badges",
            nav_contact: "Contact",
            badge: "A developer, guided by the Force.",
            title: 'WELCOME TO MY <br/> <span class="text-cyan">PORTFOLIO</span>',
            typed: "Software Developer",
            description: "I am a <strong>6th-semester</strong> Software Development student with experience in Fullstack projects using <strong><span class=\"text-cyan\">Next.js</span></strong>, <strong><span class=\"text-cyan\">React.js</span></strong>, <strong><span class=\"text-cyan\">JavaScript</span></strong>, and <strong><span class=\"text-cyan\">TypeScript</span></strong>. I am passionate about building functional web and mobile applications with excellent user experience. Focused on optimizing interfaces and providing scalable technical solutions as a Front-End developer, excelling in <strong>teamwork</strong> and <strong>good communication</strong>, while actively learning <strong>AWS</strong> and <strong>Docker</strong> (beginner level).",
            id_header: "SOFTWARE DEV",
            id_role: "FRONT END DEVELOPER",
            scroll_down: "Scroll down",
            download_cv: "Download CV",
            // Featured Projects
            projects_badge: "My Work",
            projects_title: 'Featured <br/> <span class="text-cyan">Projects</span>',
            btn_code: "View Code",
            project1_title: "Dr. Camila Henao Clinic",
            project1_desc: 'Modern and dynamic development for a dental clinic. Frontend built in Next.js with custom fluid animations using Framer Motion and GSAP for an immersive interactive experience. <span class="text-cyan">(In Development)</span>',
            project2_title: "Bioconstructores Asociados SAS",
            project2_desc: "Fullstack corporate landing and admin dashboard. Developed with Next.js, React.js, Prisma, Neon, and advanced animations with Framer Motion and GSAP. Features robust backend infrastructure and scalable storage.",
            // Tech Stack
            stack_badge: "Technologies",
            stack_title: 'My <br/><span class="text-cyan">Stack</span>',
            cat_dev: "Languages",
            cat_front: "Frontend",
            cat_back: "Backend",
            cat_frame: "Frameworks",
            cat_db: "Databases",
            cat_tools: "Tools",
            cat_cloud: "Cloud",
            cat_design: "Design",
            docker_wip: "In progress",
            aws_level: "Beginner",
            // Experience
            exp_badge: "Path",
            exp_title: 'Experience & <span class="text-cyan">Studios</span>',
            exp_col_label_prof: "💼 Professional Experience",
            exp_col_label_edu: "🎓 Education",
            exp_tag_onsite: "On-site",
            exp_tag_present: "Present",
            exp1_role: "Programming Logic Mentor",
            exp1_b1: "Technical support in algorithmic logic with <strong>C++</strong>.",
            exp1_b2: "Practical tutoring on conditionals, loops, and arrays.",
            exp1_b3: "Strengthening academic leadership and communication.",
            exp2_role: "Fullstack Web Developer",
            exp2_b1: "Developed website with <strong>Next.js</strong>, <strong>React.js</strong>, <strong>Prisma</strong>, and <strong>Neon</strong>.",
            exp2_b2: "Animations with <strong>Framer Motion</strong> and <strong>GSAP</strong>.",
            exp2_b3: "Project coordination and technological adaptation.",
            edu_badge: "Formation",
            edu_title: "Education",
            edu1_degree: "Software Development Technology",
            // Certifications
            cert_badge: "Achievements",
            cert_title: 'My <br/> <span class="text-cyan">Certifications</span>',
            cert1_title: "Version Control with Git & GitHub",
            cert1_entity: "Crehana / TecMD",
            cert1_desc: "Earned a professional certification in version control systems, focusing on Git and GitHub workflows. Mastered essential collaborative development skills, including branching strategies, repository management, pull requests, and conflict resolution. This certification validates my ability to manage complex codebases and collaborate effectively within agile software development teams.",
            cert1_date: "April 2025",
            cert2_title: "Kotlin: Apps from Scratch",
            cert2_entity: "Udemy",
            cert2_desc: "Comprehensive development of 6 native mobile applications using modern Android architecture. Deep dive into Kotlin, Jetpack Compose, API integration, and state management for scalable and robust mobile solutions.",
            cert2_date: "July 2025",
            cert3_title: "Explorer Level Programming",
            cert3_entity: "Ministerio TIC / CUN",
            cert3_desc: "The Explorer Talento Tech course introduces the fundamentals of web development, including basic HTML and CSS, programming logic with <strong>JavaScript (Intermediate Level)</strong>, and the creation of practical projects.",
            cert3_date: "August 2025",
            // Badges
            badges_badge: "Digital Badges",
            badges_title: 'My <br/> <span class="text-cyan">Badges</span>',
            badge1_title: "Build apps with Flutter",
            badge1_desc: "Learned to build beautiful, natively compiled applications for mobile, web, and desktop from a single codebase using Flutter.",
            badge2_title: "Manage work with GitHub Projects",
            badge2_desc: "Learned how to use GitHub Projects to create issues, break them into tasks, track relationships, add custom fields, and have conversations.",
            // Footer
            footer_cta: "LET'S WORK <br/><span class='text-cyan'>TOGETHER?</span>",
            footer_quote: "Building the future of web and mobile development, one line of code at a time.",
            footer_contact_title: "Contact",
            footer_navigation_title: "Navigation",
            footer_rights: "All rights reserved.",
            footer_tagline: "May the Force be with you.",
            nav_tech: "Technologies",
            nav_experience: "Experience",
        }
    };

    let currentLang = 'es';

    const langToggleBtn = document.getElementById('lang-toggle');

    let textToType = translations[currentLang].typed;
    const typedTextSpan = document.getElementById("typed-text");
    let typeIntervalId = null;
    let typeTimeoutId = null;

    function renderTranslations() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[currentLang][key]) {
                el.innerHTML = translations[currentLang][key];
            }
        });
        textToType = translations[currentLang].typed;
        if (typedTextSpan) {
            typedTextSpan.innerHTML = "";
            startTypeWriter();
        }

        const cvBtn = document.getElementById('download-cv-btn');
        if (cvBtn) {
            cvBtn.href = currentLang === 'es' ? '/pdf/JUAN_DAVID_MARTINEZ_CV_ES.pdf' : '/pdf/JUAN_DAVID_MARTINEZ_CV_EN.pdf';
        }
    }

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            currentLang = currentLang === 'es' ? 'en' : 'es';
            langToggleBtn.textContent = currentLang === 'es' ? 'EN' : 'ES';
            renderTranslations();
        });
    }

    // --- 1. Typing Effect ---
    function startTypeWriter() {
        if (typeIntervalId) clearInterval(typeIntervalId);
        if (typeTimeoutId) clearTimeout(typeTimeoutId);
        let i = 0;

        function typeWriter() {
            if (i < textToType.length) {
                typedTextSpan.innerHTML += textToType.charAt(i);
                i++;
                typeTimeoutId = setTimeout(typeWriter, Math.random() * 50 + 50);
            }
        }
        typeTimeoutId = setTimeout(typeWriter, 1200);
    }
    renderTranslations();

    if (window.anime) {
        // --- 3. Premium Hero Entrance Animations ---
        const heroElements = document.querySelectorAll('.entrance-anim');

        // First pass: set all to invisible
        heroElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
        });

        // Badge pops in from above with spring
        const badge = document.querySelector('.badge.entrance-anim');
        if (badge) {
            window.anime({
                targets: badge,
                translateY: [-35, 0],
                opacity: [0, 1],
                scale: [0.75, 1],
                easing: 'cubicBezier(0.34, 1.76, 0.64, 1)',
                duration: 1400,
                delay: 350
            });
        }

        // Heading sweeps up
        const heading = document.querySelector('.glitch-text.entrance-anim');
        if (heading) {
            window.anime({
                targets: heading,
                translateY: [80, 0],
                opacity: [0, 1],
                easing: 'cubicBezier(0.16, 1, 0.3, 1)',
                duration: 1800,
                delay: 500
            });
        }

        // Subheading
        const subheading = document.querySelector('h2.entrance-anim');
        if (subheading) {
            window.anime({
                targets: subheading,
                translateY: [50, 0],
                opacity: [0, 1],
                easing: 'cubicBezier(0.16, 1, 0.3, 1)',
                duration: 1600,
                delay: 750
            });
        }

        // Description fades with slight Y shift
        const desc = document.querySelector('.description.entrance-anim');
        if (desc) {
            window.anime({
                targets: desc,
                translateY: [40, 0],
                opacity: [0, 1],
                easing: 'cubicBezier(0.16, 1, 0.3, 1)',
                duration: 1500,
                delay: 950
            });
        }

        // Social links appear one by one
        const socialLinks = document.querySelectorAll('.social-links.entrance-anim, .cv-btn.entrance-anim');
        window.anime({
            targets: socialLinks,
            translateY: [30, 0],
            opacity: [0, 1],
            scale: [0.85, 1],
            delay: window.anime.stagger(120, { start: 1100 }),
            easing: 'cubicBezier(0.34, 1.56, 0.64, 1)',
            duration: 900
        });

        // ID Card wrapper sweeps in from the right
        const cardWrapper = document.querySelector('.id-card-wrapper.entrance-anim');
        if (cardWrapper) {
            window.anime({
                targets: cardWrapper,
                translateX: [140, 0],
                translateY: [30, 0],
                opacity: [0, 1],
                scale: [0.84, 1],
                easing: 'cubicBezier(0.16, 1, 0.3, 1)',
                duration: 2000,
                delay: 600
            });
        }

        // --- 4. ID Card floating animation ---
        window.anime({
            targets: '.id-card-wrapper',
            translateY: ['-14px', '14px'],
            rotateZ: ['-2.5deg', '2.5deg'],
            duration: 7000,
            direction: 'alternate',
            loop: true,
            easing: 'easeInOutSine',
            transformOrigin: 'top center'
        });
    }

    // --- 5. Interactive hover 3D tilt effect ---
    const card = document.getElementById('developer-card');
    if (card) {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -12;
            const rotateY = ((x - centerX) / centerX) * 12;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    }

    // --- 6. Parallax Scroll Effect for Hero Entrance ---
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const heroContent = document.querySelector('.hero-content');
        const idVisuals = document.querySelector('.hero-visuals');
        const lightning = document.querySelector('.lightning-svg');

        if (heroContent) {
            heroContent.style.transform = `translateY(${scrollY * 0.2}px)`; // Slower
            heroContent.style.opacity = Math.max(0, 1 - (scrollY / 600)); // Lasts longer
        }
        if (idVisuals) {
            idVisuals.style.transform = `translateY(${scrollY * -0.15}px) rotateZ(${scrollY * 0.05}deg)`; // Slower
            idVisuals.style.opacity = Math.max(0, 1 - (scrollY / 600));
        }
        if (lightning) {
            lightning.style.opacity = Math.max(0, 0.8 - (scrollY / 600));
        }
    }, { passive: true });
}
