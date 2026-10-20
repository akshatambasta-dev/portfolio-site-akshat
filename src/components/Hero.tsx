import { useRef, useState, useEffect, type CSSProperties, type PointerEvent } from 'react';
import { ArrowDown, ArrowUpRight, MapPin, Terminal } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export function OrbitBadge() {
  return (
    <div className="orbit-badge-signature" aria-label="Signature motif: Akshat Ambasta · Systems &amp; Hardware · AI &amp; IoT">
      <svg viewBox="0 0 200 200" className="orbit-svg" aria-hidden="true">
        <defs>
          <path
            id="orbitRingPath"
            d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"
          />
        </defs>
        <text className="orbit-text">
          <textPath href="#orbitRingPath" startOffset="0%">
            AKSHAT AMBASTA ✦ SYSTEMS &amp; HARDWARE ✦ AI &amp; IOT ✦
          </textPath>
        </text>
      </svg>
      {/* 4-point geometric star signature */}
      <div className="orbit-star-center" aria-hidden="true">
        <svg viewBox="0 0 48 48" className="star-icon">
          <path
            d="M 24 2 L 28.5 19.5 L 46 24 L 28.5 28.5 L 24 46 L 19.5 28.5 L 2 24 L 19.5 19.5 Z"
            fill="currentColor"
          />
          <circle cx="24" cy="24" r="5" fill="#A11212" />
        </svg>
      </div>
    </div>
  );
}

export function Hero() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [glitch, setGlitch] = useState({ x: 0, y: 0, active: false });
  const isReduced = useRef(false);

  useEffect(() => {
    isReduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (isReduced.current || e.pointerType === 'touch' || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;

    // Damped displacement
    const gx = +(nx * 14).toFixed(2);
    const gy = +(ny * 6).toFixed(2);
    setGlitch({ x: gx, y: gy, active: true });
  };

  const handlePointerLeave = () => {
    setGlitch({ x: 0, y: 0, active: false });
  };

  return (
    <section className="hero-section" aria-labelledby="hero-title-h" ref={heroRef} onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
      <div className="container hero-container">
        {/* Top Architectural Telemetry Bar */}
        <div className="hero-status-bar" data-reveal>
          <div className="status-indicator">
            <span className="live-pulse" aria-hidden="true" />
            <span className="status-text">[SYS: ACTIVE] AI BUILDER · HARDWARE &amp; IOT</span>
          </div>
          <div className="hero-location">
            <MapPin size={13} className="loc-icon" aria-hidden="true" />
            <span>PUNE, MAHARASHTRA, INDIA</span>
          </div>
        </div>

        {/* Hero Main Display Area */}
        <div className={`hero-display-block ${glitch.active ? 'is-distorting' : ''}`}>
          <div className="hero-title-wrap">
            <h1 id="hero-title-h" className="hero-main-title">
              {/* Blackletter Display Signature with Chromatic Aberration */}
              <span
                className="name-display glitch-target"
                data-text="Akshat Ambasta"
                style={{
                  '--glitch-x': `${glitch.x}px`,
                  '--glitch-y': `${glitch.y}px`,
                } as CSSProperties}
              >
                <span className="name-row">Akshat</span>
                <span className="name-row">Ambasta</span>
              </span>

              {/* Bold Architectural Headline */}
              <span className="title-headline">
                BUILDING INTELLIGENT SYSTEMS
              </span>

              <span className="title-subline">
                FOR REAL-WORLD IMPACT<span className="accent-dot">.</span>
              </span>
            </h1>

            {/* Orbit Motif Integrated with the Layout */}
            <div className="hero-motif-anchor">
              <OrbitBadge />
            </div>
          </div>
        </div>

        {/* Hero Lede & Call to Actions */}
        <div className="hero-footer-grid" data-reveal>
          <div className="hero-summary-copy">
            <p className="hero-lede-text">
              I am an AI student and technical builder turning ideas into practical systems across software, embedded hardware, IoT, and data intelligence.
            </p>
            <div className="hero-subtext-meta">
              <span className="meta-tag"><Terminal size={12} aria-hidden="true" /> ESP32 &amp; ARDUINO</span>
              <span className="meta-divider">/</span>
              <span className="meta-tag">FLASK &amp; PYTHON</span>
              <span className="meta-divider">/</span>
              <span className="meta-tag">NILM &amp; AI EXPERIMENTS</span>
            </div>
          </div>

          <div className="hero-actions-cluster">
            <a href="#projects" className="btn-pill btn-dark">
              <span>Explore Projects</span>
              <ArrowDown size={15} aria-hidden="true" />
            </a>
            <a href={`mailto:${PERSONAL_INFO.email}`} className="btn-pill btn-hollow">
              <span>Get in Touch</span>
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Lower Viewport Ticker Indicator */}
        <div className="hero-bottom-strip">
          <span className="strip-text">FIRST-YEAR B.SC. ARTIFICIAL INTELLIGENCE · SYMBISIS SAII</span>
          <span className="strip-scroll">SCROLL TO INSPECT ARCHITECTURE ↓</span>
        </div>
      </div>
    </section>
  );
}
