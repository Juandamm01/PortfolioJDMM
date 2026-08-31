import { applyTranslations, getCurrentLanguage, setLanguage, translations } from './translations.js';

export function initWelcomeInteractive() {
    let currentLang = getCurrentLanguage();
    const typedTextSpan = document.getElementById('typed-text');
    let textToType = translations[currentLang].typed;
    let typeTimeoutId = null;

    function startTypeWriter() {
        if (!typedTextSpan) return;
        if (typeTimeoutId) clearTimeout(typeTimeoutId);

        typedTextSpan.innerHTML = '';
        let i = 0;

        function typeWriter() {
            if (i < textToType.length) {
                typedTextSpan.innerHTML += textToType.charAt(i);
                i += 1;
                typeTimeoutId = setTimeout(typeWriter, Math.random() * 50 + 50);
            }
        }

        typeTimeoutId = setTimeout(typeWriter, 1200);
    }

    function renderTranslations() {
        currentLang = getCurrentLanguage();
        textToType = translations[currentLang].typed;
        applyTranslations(currentLang);
        startTypeWriter();
    }

    const langToggleBtn = document.getElementById('lang-toggle');
    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            currentLang = currentLang === 'es' ? 'en' : 'es';
            setLanguage(currentLang);
            renderTranslations();
        });
    }

    window.addEventListener('portfolio:lang-change', () => {
        renderTranslations();
    }, { once: false });

    renderTranslations();

    if (window.anime) {
        // --- 3. Premium Hero Entrance Animations ---
        // Initial opacity is handled via CSS (.entrance-anim { opacity: 0 }) to prevent flashing

        // Badge pops in
        const badge = document.querySelector('.badge.entrance-anim');
        if (badge) {
            window.anime({
                targets: badge,
                opacity: [0, 1],
                translateY: [25, 0],
                scale: [0.92, 1],
                easing: 'cubicBezier(0.34, 1.56, 0.64, 1)',
                duration: 1800,
                delay: 400
            });
        }

        // Heading fades and slides in
        const heading = document.querySelector('.glitch-text.entrance-anim');
        if (heading) {
            window.anime({
                targets: heading,
                opacity: [0, 1],
                translateY: [40, 0],
                scale: [0.97, 1],
                easing: 'cubicBezier(0.16, 1, 0.3, 1)',
                duration: 2400,
                delay: 600
            });
        }

        // Subheading (Typed text container)
        const subheading = document.querySelector('h2.entrance-anim');
        if (subheading) {
            window.anime({
                targets: subheading,
                opacity: [0, 1],
                translateY: [25, 0],
                easing: 'cubicBezier(0.16, 1, 0.3, 1)',
                duration: 2200,
                delay: 850
            });
        }

        // Description fades and slides in
        const desc = document.querySelector('.description.entrance-anim');
        if (desc) {
            window.anime({
                targets: desc,
                opacity: [0, 1],
                translateY: [35, 0],
                easing: 'cubicBezier(0.16, 1, 0.3, 1)',
                duration: 2200,
                delay: 1100
            });
        }

        // Social links appear staggeredly
        const socialLinks = document.querySelectorAll('.social-links.entrance-anim, .cv-btn.entrance-anim');
        window.anime({
            targets: socialLinks,
            opacity: [0, 1],
            translateY: [20, 0],
            delay: window.anime.stagger(150, { start: 1300 }),
            easing: 'cubicBezier(0.34, 1.56, 0.64, 1)',
            duration: 1600
        });

        // ID Card wrapper fades and slides up with 3D rotation
        const cardWrapper = document.querySelector('.hero-visuals.entrance-anim');
        const isMobile = window.innerWidth <= 600;
        if (cardWrapper) {
            if (isMobile) {
                cardWrapper.style.opacity = '0';
                cardWrapper.style.transform = 'translateY(40px) scale(0.85)';
                cardWrapper.style.pointerEvents = 'none';
            } else {
                window.anime({
                    targets: cardWrapper,
                    opacity: [0, 1],
                    translateY: [60, 0],
                    rotateY: [15, 0],
                    scale: [0.94, 1],
                    easing: 'cubicBezier(0.16, 1, 0.3, 1)',
                    duration: 2800,
                    delay: 700
                });
            }
        }

        // --- 4. ID Card floating animation (keep minimal or remove) ---
        // Removed to stop movement

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
        const isMobile = window.innerWidth <= 600;

        if (heroContent) {
            heroContent.style.opacity = isMobile ? 1 : Math.max(0, 1 - (scrollY / 600));
        }
        if (idVisuals) {
            if (isMobile) {
                // On mobile, fade in as they scroll, reaching full opacity at scrollY = 200
                const opacityVal = Math.min(1, scrollY / 200);
                idVisuals.style.opacity = opacityVal;
                idVisuals.style.pointerEvents = scrollY > 50 ? 'auto' : 'none';
                
                const translateVal = Math.max(0, 40 - (scrollY / 5));
                const scaleVal = Math.min(0.85, 0.72 + (scrollY / 1500));
                idVisuals.style.transform = `translateY(${translateVal}px) scale(${scaleVal})`;
            } else {
                idVisuals.style.opacity = Math.max(0, 1 - (scrollY / 600));
            }
        }
        if (lightning) {
            lightning.style.opacity = isMobile ? 0.1 : Math.max(0, 0.8 - (scrollY / 600));
        }
    }, { passive: true });
}
