import React, { useState, useEffect } from 'react';
import '../../../styles/phone/NavbarPhone.css';

export default function NavbarPhone() {
  const [isOpen, setIsOpen] = useState(false);
  const [langLabel, setLangLabel] = useState('EN');

  const menuItems = [
    { label: 'Inicio', href: '#home', i18n: 'nav_home' },
    { label: 'Proyectos', href: '#project', i18n: 'nav_project' },
    { label: 'Stack', href: '#tech', i18n: 'nav_stack' },
    { label: 'Experiencia', href: '#experience', i18n: 'nav_experience' },
    { label: 'Diplomas', href: '#certifications', i18n: 'nav_cert' },
    { label: 'Contacto', href: '#contact', i18n: 'nav_contact' },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleLangToggle = () => {
    const desktopToggle = document.getElementById('lang-toggle');
    if (desktopToggle) {
      desktopToggle.click();
      setLangLabel(desktopToggle.textContent || 'EN');
    }
  };

  // Sync initial language label and updates
  useEffect(() => {
    const desktopToggle = document.getElementById('lang-toggle');
    if (desktopToggle) {
      setLangLabel(desktopToggle.textContent || 'EN');
      
      const observer = new MutationObserver(() => {
        setLangLabel(desktopToggle.textContent || 'EN');
      });
      observer.observe(desktopToggle, { characterData: true, childList: true });
      return () => observer.disconnect();
    }
  }, []);

  return (
    <div className="navbar-phone-container">
      {/* Burger Button */}
      <button 
        className={`burger-btn ${isOpen ? 'open' : ''}`} 
        onClick={toggleMenu}
        aria-label="Toggle Menu"
      >
        <span className="burger-line"></span>
        <span className="burger-line"></span>
        <span className="burger-line"></span>
      </button>

      {/* Menu Overlay and Sidebar Container */}
      <div className={`menu-overlay ${isOpen ? 'show' : ''}`} onClick={() => setIsOpen(false)}>
        {/* Elastic Liquid Background SVG */}
        <svg 
          className="elastic-svg" 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
        >
          <path 
            className="elastic-path" 
            d={isOpen 
              ? "M 30,0 L 100,0 L 100,100 L 30,100 Q 30,50 30,0 Z" 
              : "M 100,0 L 100,0 L 100,100 L 100,100 Q 100,50 100,0 Z"
            }
          />
        </svg>

        {/* Sidebar Menu Panel */}
        <nav className={`menu-panel ${isOpen ? 'open' : ''}`} onClick={e => e.stopPropagation()}>
          <div className="menu-items">
            {menuItems.map((item, idx) => (
              <a 
                key={idx} 
                className="menu-item" 
                href={item.href}
                data-i18n={item.i18n}
                onClick={handleLinkClick}
                style={{ transitionDelay: isOpen ? `${idx * 0.05 + 0.1}s` : '0s' }}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile Language Button inside Sidebar */}
          <div className="menu-footer" style={{ transitionDelay: isOpen ? `${menuItems.length * 0.05 + 0.15}s` : '0s' }}>
            <button 
              id="lang-toggle-mobile" 
              className="lang-btn-mobile" 
              onClick={handleLangToggle}
            >
              {langLabel}
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}
