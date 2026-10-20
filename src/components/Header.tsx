import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Recognition', href: '#achievements' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
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
        {/* Editorial Wordmark with 4-Point Star Motif */}
        <a href="#top" className="brand-wordmark" onClick={() => setIsOpen(false)}>
          <span className="brand-star" aria-hidden="true">✦</span>
          <span className="brand-name">AKSHAT AMBASTA</span>
          <span className="brand-dot">.</span>
        </a>

        {/* Desktop Primary Navigation */}
        <nav className="desktop-primary-nav" aria-label="Primary Navigation">
          <ul className="nav-list">
            {NAV_LINKS.map((item) => (
              <li key={item.href} className="nav-item">
                <a href={item.href} className="nav-anchor">
                  {item.label}
                </a>
              </li>
            ))}
            <li className="nav-divider-line" aria-hidden="true" />
            <li className="nav-item external">
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-anchor ext"
              >
                <span>LinkedIn</span>
                <ArrowUpRight size={13} aria-hidden="true" />
              </a>
            </li>
            <li className="nav-item external">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-anchor ext"
              >
                <span>GitHub</span>
                <ArrowUpRight size={13} aria-hidden="true" />
              </a>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Trigger Button */}
        <button
          type="button"
          className="mobile-menu-btn"
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
                  className="mobile-link"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mobile-socials-row">
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-soc-btn"
            >
              <span>LinkedIn</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-soc-btn"
            >
              <span>GitHub</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
