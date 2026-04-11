export function initWelcomeInteractive() {
    // --- 0. Languages and Data ---
    const translations = {
        es: {
            nav_role: "Desarrollador de Software",
            nav_home: "Inicio",
            nav_about: "Sobre Mí",
            nav_project: "Proyectos",
            nav_contact: "Contacto",
            badge: "Un desarrollador, guiado por la Fuerza.",
            title: 'BIENVENIDO A MI <br/> <span class="text-cyan">PORTAFOLIO</span>',
            typed: "Desarrollador de Software",
            description: "Soy un estudiante de 5º semestre de Desarrollo de Software con experiencia en proyectos Fullstack usando Next.js, React.js, Javascript, Kotlin y Flutter. Me apasiona construir aplicaciones web y móviles funcionales con buena experiencia de usuario. Busco una oportunidad para crecer como desarrollador Front-End y aportar mis habilidades en proyectos reales.",
            id_header: "DESARROLLO DE SOFTWARE",
            id_role: "DESARROLLADOR FRONT END",
            scroll_down: "Desliza abajo",
            // Featured Projects
            projects_badge: "Mi Trabajo",
            projects_title: 'Proyectos <br/> <span class="text-cyan">Destacados</span>',
            btn_code: "Ver Código",
            project1_title: "Dra. Camila Henao Odontología",
            project1_desc: 'Desarrollo moderno y dinámico para clínica dental. Frontend construido en Next.js con animaciones fluidas a medida usando Framer Motion y GSAP para una experiencia interactiva inmersiva. <span class="text-cyan">(En Desarrollo)</span>',
            project2_title: "Bioconstructores Asociados SAS",
            project2_desc: "Panel de administración y landing corporativa Fullstack. Frontend ágil en React y Next.js, con Backend robusto en TypeScript. Incorpora almacenamiento escalable de imágenes con infraestructura AWS S3 nativa.",
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
            cat_design: "Diseño"
        },
        en: {
            nav_role: "Software Developer",
            nav_home: "Home",
            nav_about: "About",
            nav_project: "Project",
            nav_contact: "Contact",
            badge: "A developer, guided by the Force.",
            title: 'WELCOME TO MY <br/> <span class="text-cyan">PORTFOLIO</span>',
            typed: "Software Developer",
            description: "I am a 5th-semester Software Development student with experience in Fullstack projects using Next.js, React.js, Javascript, Kotlin, and Flutter. I am passionate about building functional web and mobile applications with good user experience. I am looking for an opportunity to grow as a Front-End developer and contribute my skills to real projects.",
            id_header: "SOFTWARE DEV",
            id_role: "FRONT END DEVELOPER",
            scroll_down: "Scroll down",
            // Featured Projects
            projects_badge: "My Work",
            projects_title: 'Featured <br/> <span class="text-cyan">Projects</span>',
            btn_code: "View Code",
            project1_title: "Dr. Camila Henao Clinic",
            project1_desc: 'Modern and dynamic development for a dental clinic. Frontend built in Next.js with custom fluid animations using Framer Motion and GSAP for an immersive interactive experience. <span class="text-cyan">(In Development)</span>',
            project2_title: "Bioconstructores Asociados SAS",
            project2_desc: "Fullstack corporate landing and admin dashboard. Agile frontend with React and Next.js, backed by a robust TypeScript backend. Includes scalable native image storage via AWS S3 architecture.",
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
            cat_design: "Design"
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
    startTypeWriter();

    if(window.anime) {
        // --- 2. Anime.js Lightning Animation Effect ---
        const pathElements = document.querySelectorAll('.lightning-path, .lightning-core');
        if (pathElements.length > 0) {
            // Initialize all paths
            pathElements.forEach(path => {
                window.anime.setDashoffset(path);
            });
            
            // Animate paths together for a single strike effect
            window.anime({
                targets: '.lightning-path, .lightning-core',
                strokeDashoffset: [window.anime.setDashoffset, 0],
                easing: 'easeOutElastic(1, .8)',
                duration: 800,
                direction: 'alternate',
                loop: true,
                opacity: [
                    { value: 0, duration: 100 },
                    { value: 1, duration: 50 },
                    { value: 0.3, duration: 50 },
                    { value: 1, duration: 50 },
                    { value: 0, duration: 300, delay: 200 }
                ],
                delay: 2000 // wait 2 seconds between strikes
            });
        }

        // --- 3. Anime.js Entrance Animations ---
        window.anime({
            targets: '.entrance-anim',
            translateY: [40, 0],
            opacity: [0, 1],
            delay: window.anime.stagger(150, {start: 600}), 
            easing: 'easeOutQuart',
            duration: 1000
        });

        // --- 4. ID Card Swinging Animation ---
        window.anime({
            targets: '.id-card-wrapper',
            rotateZ: ['-5deg', '5deg'],
            translateY: ['-8px', '8px'],
            duration: 4000,
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
