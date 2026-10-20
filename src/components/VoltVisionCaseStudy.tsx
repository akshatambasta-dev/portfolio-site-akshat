import { useState, useRef, useEffect, type PointerEvent } from 'react';
import { ArrowUpRight, Cpu, Activity, Award, CheckCircle2 } from 'lucide-react';
import { VOLTVISION_DATA } from '../data/portfolioData';

const FLOW_STEPS = [
  {
    step: '01',
    name: 'AC Electrical Load',
    type: 'Physical Hardware',
    desc: 'Domestic AC appliances (230V / 50Hz) connected via non-invasive current transformer.',
    telemetry: 'Real-time AC waveform',
  },
  {
    step: '02',
    name: 'PZEM-004T v3.0',
    type: 'Measurement Sensor',
    desc: 'Optocoupled metering IC sampling Voltage (V), Current (I), Active Power (W), and Energy (kWh).',
    telemetry: 'UART 9600 bps serial output',
  },
  {
    step: '03',
    name: 'ESP32 Microcontroller',
    type: 'Firmware Engine',
    desc: 'Ingests UART telemetry, runs moving-average filtering, and packages JSON payload over Wi-Fi.',
    telemetry: 'Firmware in Arduino C++',
  },
  {
    step: '04',
    name: 'Flask API & SQLite',
    type: 'Server & Storage',
    desc: 'Receives and validates sensor telemetry, persisting timestamped power samples into relational SQLite tables.',
    telemetry: 'REST endpoint /api/telemetry',
  },
  {
    step: '05',
    name: 'NILM & Insight Engine',
    type: 'Analytics (Research)',
    desc: 'Explores appliance signature disaggregation, high-power anomaly detection, and energy conservation recommendations.',
    telemetry: 'Power signature heuristics',
  },
  {
    step: '06',
    name: 'VoltVision Dashboard',
    type: 'User Interface',
    desc: 'Live browser dashboard providing users with clear real-time gauges, historical charts, and cost estimates.',
    telemetry: 'HTML5 / CSS / Vanilla JS',
  },
];

export function VoltVisionCaseStudy() {
  const [activeStep, setActiveStep] = useState(2); // Default to ESP32
  const tiltRef = useRef<HTMLDivElement | null>(null);
  const isReduced = useRef(false);

  useEffect(() => {
    isReduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (isReduced.current || e.pointerType === 'touch' || !tiltRef.current) return;
    const r = tiltRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    tiltRef.current.style.setProperty('--tilt-x', `${-y * 5}deg`);
    tiltRef.current.style.setProperty('--tilt-y', `${x * 7}deg`);
  };

  const handlePointerLeave = () => {
    if (!tiltRef.current) return;
    tiltRef.current.style.setProperty('--tilt-x', '0deg');
    tiltRef.current.style.setProperty('--tilt-y', '0deg');
  };

  return (
    <article className="featured-case-study" aria-labelledby="voltvision-heading">
      {/* Top Header & Recognition Banner */}
      <div className="case-study-top">
        <div className="case-meta-group">
          <span className="case-eyebrow">
            <span className="star-mark">✦</span> FEATURED CASE STUDY // EMBEDDED TO CLOUD
          </span>
          <h3 id="voltvision-heading" className="featured-project-name">
            VoltVision<span className="accent-red-dot">.</span>
          </h3>
          <p className="featured-project-strapline">
            AI-Enabled Energy Intelligence &amp; Appliance Monitoring System
          </p>
        </div>

        <div className="case-action-group">
          <a
            href={VOLTVISION_DATA.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-live-project"
          >
            <span>Visit Live Project</span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Competitive Recognition Bar */}
      <div className="award-banner" data-reveal>
        <div className="award-icon-box">
          <Award size={20} className="award-badge-icon" aria-hidden="true" />
        </div>
        <div className="award-text-content">
          <strong>1st Place Winner</strong> — IEEE Maharashtra Section Entrepreneurship &amp; Innovation Group (EIG) Business Pitch Competition, 2026.
          <span className="award-sub">Validated functional hardware-to-cloud prototype pitching real domestic energy savings.</span>
        </div>
      </div>

      {/* Narrative Lead */}
      <p className="case-study-lede" data-reveal>
        VoltVision tackles the opacity of domestic electricity consumption. Rather than receiving a confusing monthly bill, users gain an intelligent system that connects real-time AC electrical measurement through an ESP32 microcontroller into a Flask backend and user dashboard.
      </p>

      {/* Interactive System Flow Schematic */}
      <div
        className="flow-schematic-wrapper"
        ref={tiltRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        data-reveal
      >
        <div className="schematic-header">
          <div className="schematic-title">
            <Cpu size={14} aria-hidden="true" />
            <span>FIG 01. HARDWARE-TO-CLOUD DATA FLOW ARCHITECTURE</span>
          </div>
          <span className="schematic-interactive-hint">CLICK NODES TO INSPECT TELEMETRY</span>
        </div>

        <ol className="schematic-nodes-list">
          {FLOW_STEPS.map((step, idx) => (
            <li
              key={step.step}
              className={`schematic-node-item ${activeStep === idx ? 'is-active' : ''}`}
              onClick={() => setActiveStep(idx)}
            >
              <div className="node-card">
                <div className="node-card-top">
                  <span className="node-num">{step.step}</span>
                  <span className="node-type">{step.type}</span>
                </div>
                <strong className="node-name">{step.name}</strong>
                <span className="node-meta-hint">{step.telemetry}</span>
              </div>
              {idx < FLOW_STEPS.length - 1 && (
                <div className="node-connector" aria-hidden="true">
                  <span className="conn-line" />
                  <span className="conn-arrow">→</span>
                </div>
              )}
            </li>
          ))}
        </ol>

        {/* Selected Node Telemetry Inspector */}
        <div className="step-inspector-box">
          <div className="inspector-badge">
            <Activity size={13} aria-hidden="true" />
            <span>INSPECTOR // NODE {FLOW_STEPS[activeStep].step}: {FLOW_STEPS[activeStep].name.toUpperCase()}</span>
          </div>
          <p className="inspector-desc">{FLOW_STEPS[activeStep].desc}</p>
          <div className="inspector-telemetry-tag">
            <span className="tag-label">TELEMETRY SPEC:</span>
            <code>{FLOW_STEPS[activeStep].telemetry}</code>
          </div>
        </div>
      </div>

      {/* Detailed Technical Specification Grid */}
      <div className="case-details-grid">
        <div className="details-column" data-reveal>
          <div className="detail-section">
            <h4 className="detail-heading">CORE RESPONSIBILITIES</h4>
            <p className="detail-role">Lead Developer &amp; Hardware/Software Architect</p>
            <ul className="bullet-checklist">
              {VOLTVISION_DATA.contributions.map((c) => (
                <li key={c}>
                  <CheckCircle2 size={14} className="check-bullet" aria-hidden="true" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="details-column" data-reveal>
          <div className="detail-section">
            <h4 className="detail-heading">IMPLEMENTED CAPABILITIES</h4>
            <div className="specs-list">
              <div className="spec-item">
                <strong>Real-Time RMS Monitoring</strong>
                <p>Simultaneous voltage (V), current (A), instantaneous active power (W), and cumulative energy (kWh).</p>
              </div>
              <div className="spec-item">
                <strong>Local Server Persistence</strong>
                <p>Flask web API storing structured timestamped measurements in SQLite for fast local retrieval.</p>
              </div>
              <div className="spec-item">
                <strong>Appliance-Level NILM (Research)</strong>
                <p>Analyzing electrical load step-changes to explore non-intrusive individual appliance signatures.</p>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h4 className="detail-heading">HARDWARE &amp; SOFTWARE STACK</h4>
            <ul className="tech-chip-array">
              {VOLTVISION_DATA.technologies.map((t) => (
                <li key={t} className="tech-chip">
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="detail-action-footer">
            <a
              href={VOLTVISION_DATA.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-case-cta"
            >
              <span>Explore VoltVision Live Project</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
