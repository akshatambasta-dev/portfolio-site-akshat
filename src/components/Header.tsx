import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Awards', href: '#achievements' },
  { label: 'Skills', href: '#skills' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className={`site-header-navbar ${isScrolled ? 'is-condensed' : ''}`}>
      <div className="container header-container">
        {/* Brand Home Link with 4-Point Rotating Star (Ritzenthaler Signature Motif) */}
        <a href="#top" className="brand-wordmark magnet group" onClick={() => setIsOpen(false)} aria-label="Akshat Ambasta — Home">
          <svg className="brand-star-svg" viewBox="0 0 544 544" aria-hidden="true">
            <path
              className="star-path"
              d="m544,272c-144,70.69-201.31,128-272,272C201.31,400,144,342.69,0,272,144,201.31,201.31,144,272,0c70.69,144,128,201.31,272,272Z"
            />
          </svg>
          <span className="brand-name">AKSHAT AMBASTA</span>
          <span className="brand-dot">.</span>
        </a>

        {/* Desktop Primary Navigation with Double-Layer Roll-Up Text Hover */}
        <nav className="desktop-primary-nav" aria-label="Primary Navigation">
          <ul className="nav-list">
            {NAV_LINKS.map((item) => (
              <li key={item.href} className="nav-item">
                <a href={item.href} className="nav-anchor magnet group">
                  <span className="roll-track">
                    <span className="roll-word">{item.label}</span>
                    <span className="roll-word clone" aria-hidden="true">{item.label}</span>
                  </span>
                </a>
              </li>
            ))}
            <li className="nav-divider-line" aria-hidden="true" />
            <li className="nav-item external">
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-anchor ext magnet"
              >
                <span>LinkedIn</span>
                <ArrowUpRight size={12} aria-hidden="true" />
              </a>
            </li>
            <li className="nav-item external">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-anchor ext magnet"
              >
                <span>GitHub</span>
                <ArrowUpRight size={12} aria-hidden="true" />
              </a>
            </li>
            <li className="nav-item nav-cta-item">
              <a href="#contact" className="nav-inquire-pill magnet">
                <span>Inquire</span>
                <ArrowUpRight size={13} aria-hidden="true" />
              </a>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Trigger Button */}
        <button
          type="button"
          className="mobile-menu-btn magnet"
          aria-label={isOpen ? 'Close mobile menu' : 'Open mobile menu'}
          aria-expanded={isOpen}
          aria-controls="mobile-nav-panel"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Accessible Mobile Drawer Menu */}
      {isOpen && (
        <div id="mobile-nav-panel" className="mobile-drawer-nav" aria-label="Mobile Navigation">
          <ul className="mobile-links-list">
            {NAV_LINKS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="mobile-nav-anchor"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="mobile-num">0{NAV_LINKS.indexOf(item) + 1}</span>
                  <span className="mobile-label">{item.label}</span>
                </a>
              </li>
            ))}
            <li className="mobile-sep" />
            <li>
              <a
                href="#contact"
                className="mobile-cta-btn"
                onClick={() => setIsOpen(false)}
              >
                Inquire &amp; Build
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
