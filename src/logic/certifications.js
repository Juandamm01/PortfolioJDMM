export function initCertificationsInteractive() {
    if (!window.gsap || !window.ScrollTrigger) return;
    
    window.gsap.registerPlugin(window.ScrollTrigger);

    const section = document.getElementById('certifications');
    if (!section) return;

    const animTargets = section.querySelectorAll('.cert-anim');
    if (animTargets.length === 0) return;

    // ScrollTrigger Entrance
    window.gsap.fromTo(animTargets,
        { opacity: 0, y: 50 },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        }
    );

    // 3D Tilt Hover Effect
    const cards = section.querySelectorAll('.cert-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;  
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -8; 
            const rotateY = ((x - centerX) / centerX) * 8;
            
            window.gsap.to(card, {
                rotateX: rotateX,
                rotateY: rotateY,
                duration: 0.4,
                ease: "power2.out",
                transformPerspective: 1000
            });
        });
        
        card.addEventListener('mouseleave', () => {
            window.gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.7,
                ease: "power2.out"
            });
        });
    });
}
