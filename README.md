# Akshat Ambasta — Personal Portfolio

A distinctive, editorial, production-ready portfolio for **Akshat Ambasta** — AI builder, embedded systems developer, and student leader. Built with React, TypeScript, Three.js, GLSL shaders, and Vite, deployed automatically as a Render Static Site.

Live site: [https://akshat-ambasta-portfolio-preview.onrender.com](https://akshat-ambasta-portfolio-preview.onrender.com)

---

## Technical & Motion Architecture

1. **Expressive Hero & Chromatic Glitch:**
   - Bold Title-Case blackletter signature (`UnifrakturMaguntia`) with real-time pointer-responsive chromatic aberration (cyan/red split) damped via spring curves.
   - SVG 4-point geometric star signature motif with continuous 360° rotating circular typography badge.
   - Strict responsive typography designed for desktop, tablet, and mobile screens.

2. **Warped Dimensional Computational Mesh (WebGL / Three.js):**
   - High-fidelity 64×64 subdivided plane geometry with procedural GLSL vertex displacement.
   - Inward-bending curved edges, undulating wave motion, and cursor raycast ripple interactivity.
   - Iridescent chromatic Fresnel shading with deep builder red (`#A11212`) rim and subtle cyan dispersion.
   - Large architectural ghosted background typography ("DIMENSIONS OF COMPUTATION").

3. **Sequential Layered Service Panels:**
   - 4 engineering disciplines: Frontend Design, Backend & Local Servers, AI/Data Profiling, and Embedded Hardware/IoT.
   - Distinct technical visuals inside each panel (motion curves, network topology streams, data profiling matrix, microcontroller pinout).
   - Sticky stacked scroll depth on desktop; fluid unclipped card layout on mobile.

4. **Featured Case Study — VoltVision:**
   - 1st Place Winner, IEEE Maharashtra Section EIG Business Pitch Competition 2026.
   - Interactive FIG 01 Hardware-to-Cloud schematic diagram: AC Load → PZEM-004T → ESP32 → Flask API → SQLite → NILM Analytics → Dashboard.
   - Interactive node inspector revealing live technical telemetry on click.

5. **Project Gallery with Accessible Card / List Switch:**
   - Semantic ARIA view toggle (`role="group"`, `aria-pressed`).
   - Bespoke UI previews tailored to each project:
     - **File2Base:** Startup concept & live interactive prototype for file-to-relational database schemas.
     - **Smart Plant Monitoring & AI-Based Farming:** Arduino IoT sensor cluster (2nd Place State KVS Bal Vaigyanik Pradarshini, advanced to Nationals).
     - **Household Carbon Emissions Calculator:** Regional grid factor emissions computational tool.
     - **DOOMSDAY PROTOCOL:** Multi-client college laboratory LAN escape-room system.

6. **Leadership, Achievements & Skills:**
   - Head of Student Council (1,000 students, 40–50 council members) & Student Instructor (Atal Tinkering Lab, Grades 9–12).
   - Milestones table with Amazon poetry collection publication (*A Thousand Broken Pieces*).
   - Honest, transparent skills taxonomy grouped by working proficiency, developing skills, and daily tools — zero artificial percentage meters.

7. **Cinematic Solar Closer Climax ("LET’S BUILD"):**
   - Dark starfield background with twinkling stars.
   - Custom WebGL / Three.js fragment-shader plasma sphere simulating multi-octave turbulent solar filaments, core incandescent glow, and corona flares.
   - Monumental blackletter "LET’S BUILD" call to action leading into direct communication channels.

8. **Accessibility & Performance:**
   - Custom magnetic cursor follower disabled on touch devices and `prefers-reduced-motion`.
   - Skip-to-content anchor and keyboard focus rings.
   - Chunk-split vendor bundles for Three.js and Lucide.
   - Zero horizontal overflow across viewports (1440px, 1024px, 390px, 360px).

---

## Run Locally

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

Production output is compiled to `dist/` with clean manual vendor chunks.
