import { useEffect, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import './styles.css';

import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { About } from './components/About';
import { WarpedSurface } from './components/WarpedSurface';
import { Services } from './components/Services';
import { VoltVisionCaseStudy } from './components/VoltVisionCaseStudy';
import { ProjectGallery } from './components/ProjectGallery';
import { Experience } from './components/Experience';
import { Achievements } from './components/Achievements';
import { Skills } from './components/Skills';
import { SolarCloser } from './components/SolarCloser';
import { Contact } from './components/Contact';
import { Cursor } from './components/Cursor';
import { FluidCanvas } from './components/FluidCanvas';

function useRevealObserver() {
  useEffect(() => {
    // Check deep scroll query param
    const params = new URLSearchParams(window.location.search);
    const scrollTarget = params.get('scroll');
    if (scrollTarget) {
      setTimeout(() => {
        const el = document.getElementById(scrollTarget) || document.querySelector(`.${scrollTarget}`);
        if (el) {
          el.scrollIntoView({ behavior: 'instant', block: 'start' });
          window.dispatchEvent(new Event('scroll'));
        }
      }, 250);
    }

    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      targets.forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.01,
        rootMargin: '150px 0px 150px 0px',
      }
    );

    targets.forEach((el) => {
      observer.observe(el);
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight + 300 && r.bottom > -300) {
        el.classList.add('is-revealed');
      }
    });

    return () => observer.disconnect();
  }, []);
}

function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
}

function App() {
  useSmoothScroll();
  useRevealObserver();

  return (
    <div id="top" className="site-canvas-root">
      {/* Accessible skip link */}
      <a href="#main-content" className="skip-to-content-anchor">
        Skip to main content
      </a>

      {/* Viscous WebGL liquid wake (Ryan Ritzenthaler reference effect) */}
      <FluidCanvas />

      {/* Desktop magnetic custom cursor */}
      <Cursor />

      {/* Primary Navigation */}
      <Header />

      <main id="main-content">
        {/* 01. Hero with expressive blackletter title & orbit badge */}
        <Hero />

        {/* 02. Typographic continuous ticker */}
        <Marquee phrase="LEARN BY BUILDING ✦ BRIDGING ATOMS & BITS ✦ EMBEDDED TELEMETRY ✦ PRACTICAL AI ✦" />

        {/* 03. About & Institutional Foundation */}
        <About />

        {/* 04. Warped Dimensional WebGL Surface (The iconic reference effect) */}
        <WarpedSurface />

        {/* 05. Layered Sequential Service Panels */}
        <Services />

        {/* 06. Featured Project: VoltVision Hardware-to-Cloud Case Study */}
        <VoltVisionCaseStudy />

        {/* 07. Interactive Project Gallery (Card / List Toggle) */}
        <ProjectGallery />

        {/* 08. Secondary Marquee */}
        <Marquee
          phrase="PHYSICAL SENSORS ✦ FLASK LOGIC ✦ DATA PROFILING ✦ MULTI-CLIENT PROTOCOLS ✦"
          theme="dark"
        />

        {/* 09. Leadership & Instruction Experience */}
        <Experience />

        {/* 10. Achievements & Milestones */}
        <Achievements />

        {/* 11. Honest Technical Architecture & Skills */}
        <Skills />

        {/* 12. Cinematic Solar Climax ("LET'S BUILD") */}
        <SolarCloser />

        {/* 13. Direct Communication & Colophon */}
        <Contact />
      </main>
    </div>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
