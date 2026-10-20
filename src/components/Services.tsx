import { type CSSProperties } from 'react';
import { SERVICES, type ServiceItem } from '../data/portfolioData';

function PanelVisual({ item }: { item: ServiceItem }) {
  if (item.id === 'frontend') {
    return (
      <div className="visual-stage visual-frontend" aria-hidden="true">
        <div className="canvas-grid-lines" />
        <div className="ui-frame-wireframe">
          <div className="wireframe-header">
            <span className="dot" /><span className="dot" /><span className="dot" />
            <span className="wireframe-title">VIEWPORT // 1440×900</span>
          </div>
          <div className="wireframe-body">
            <div className="wireframe-aside">
              <div className="aside-bar" />
              <div className="aside-bar short" />
              <div className="aside-bar" />
            </div>
            <div className="wireframe-content">
              <div className="motion-curve-box">
                <svg viewBox="0 0 160 80" className="curve-svg">
                  <path d="M 10 70 C 40 70, 70 10, 150 10" fill="none" stroke="#A11212" strokeWidth="2" />
                  <circle cx="10" cy="70" r="3" fill="#A11212" />
                  <circle cx="150" cy="10" r="3" fill="#A11212" />
                </svg>
                <span className="curve-label">cubic-bezier(.22, .8, .24, 1)</span>
              </div>
              <div className="wireframe-blocks">
                <div className="block" /><div className="block" /><div className="block accent" />
              </div>
            </div>
          </div>
        </div>
        <div className="visual-badge">01 / DESIGN &amp; CODE</div>
      </div>
    );
  }

  if (item.id === 'backend') {
    return (
      <div className="visual-stage visual-backend" aria-hidden="true">
        <div className="network-diagram">
          <div className="server-node host">
            <span className="node-chip">FLASK HOST</span>
            <span className="node-port">PORT:5000</span>
          </div>
          <div className="sync-streams">
            <div className="stream-line"><span className="pulse-packet packet-1" /></div>
            <div className="stream-line"><span className="pulse-packet packet-2" /></div>
            <div className="stream-line"><span className="pulse-packet packet-3" /></div>
          </div>
          <div className="client-nodes">
            <div className="client-station">
              <span>PC_01 [LAN]</span>
              <small>200 OK</small>
            </div>
            <div className="client-station">
              <span>PC_02 [LAN]</span>
              <small>SYNCED</small>
            </div>
            <div className="client-station">
              <span>SQLITE DB</span>
              <small>READ/WRITE</small>
            </div>
          </div>
        </div>
        <div className="visual-badge">02 / TCP &amp; HTTP ARCHITECTURE</div>
      </div>
    );
  }

  if (item.id === 'intelligence') {
    return (
      <div className="visual-stage visual-intelligence" aria-hidden="true">
        <div className="data-matrix-box">
          <div className="matrix-scan-head" />
          <div className="matrix-columns">
            <div className="matrix-col">
              <span className="col-header">INPUT DATA</span>
              <div className="data-row">CSV / RAW RECORDS</div>
              <div className="data-row">EXCEL TIMESTAMPS</div>
              <div className="data-row">AC POWER SPIKES</div>
            </div>
            <div className="matrix-flow-arrow">→</div>
            <div className="matrix-col highlight">
              <span className="col-header">PROFILING ENGINE</span>
              <div className="data-row">SCHEMA INFERENCE</div>
              <div className="data-row">TYPE RECOGNITION</div>
              <div className="data-row">NILM DISAGGREGATION</div>
            </div>
            <div className="matrix-flow-arrow">→</div>
            <div className="matrix-col">
              <span className="col-header">STRUCTURED</span>
              <div className="data-row">SQL TABLES</div>
              <div className="data-row">RELATIONAL KEYS</div>
              <div className="data-row">ENERGY INSIGHTS</div>
            </div>
          </div>
        </div>
        <div className="visual-badge">03 / TRANSFORMATION PIPELINE</div>
      </div>
    );
  }

  // Embedded Hardware
  return (
    <div className="visual-stage visual-embedded" aria-hidden="true">
      <div className="hardware-schematic-view">
        <div className="ic-chip esp32">
          <span className="ic-label">ESP32-WROOM</span>
          <div className="pin-array left">
            <span className="pin">3V3</span><span className="pin">GND</span><span className="pin active">TX2</span><span className="pin active">RX2</span>
          </div>
          <div className="pin-array right">
            <span className="pin">D21</span><span className="pin">D22</span><span className="pin">ADC</span><span className="pin">EN</span>
          </div>
        </div>
        <div className="bus-lines">
          <span className="bus-wire uart" />
          <span className="bus-tag">UART 9600 BAUD</span>
        </div>
        <div className="ic-chip pzem">
          <span className="ic-label">PZEM-004T v3.0</span>
          <div className="sensor-readout">
            <span>230.4 V</span>
            <span>2.85 A</span>
            <span>656 W</span>
          </div>
        </div>
      </div>
      <div className="visual-badge">04 / EMBEDDED TELEMETRY</div>
    </div>
  );
}

export function Services() {
  return (
    <section id="services" className="services-section-wrapper" aria-labelledby="services-title-h">
      <div className="container services-container">
        {/* Editorial Section Header */}
        <div className="services-lead-header">
          <div className="section-kicker-tag" data-reveal>
            <span className="accent-index">02</span>
            <span className="kicker-sep">—</span>
            <span className="kicker-title">SYSTEMS &amp; DISCIPLINES</span>
          </div>

          <h2 id="services-title-h" className="services-title-large" data-reveal>
            From <span className="serif-highlight">interface</span> to hardware telemetry.
          </h2>

          <p className="services-intro-paragraph" data-reveal>
            I build across the stack — combining frontend design with backend stability, data intelligence, and hands-on microcontroller engineering.
          </p>
        </div>

        {/* Sequential Layered Stack of Panels */}
        <div className="service-panels-stack">
          {SERVICES.map((service, index) => (
            <article
              key={service.id}
              className={`service-card theme-${service.theme}`}
              style={{
                '--panel-index': index,
              } as CSSProperties}
              data-reveal
            >
              <div className="card-top-bar">
                <span className="card-counter">{service.number} / 04</span>
                <span className="card-discipline">{service.discipline}</span>
                <span className="card-coords">{service.coordinates}</span>
              </div>

              <div className="card-main-grid">
                <div className="card-info-col">
                  <h3 className="card-title">{service.title}</h3>
                  <p className="card-desc">{service.description}</p>

                  <div className="card-skills-wrap">
                    <p className="skills-sublabel">CORE CAPABILITIES</p>
                    <ul className="skill-pills-list">
                      {service.skills.map((s) => (
                        <li key={s} className="skill-pill-item">
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="card-metrics-row">
                    {service.metrics.map((m) => (
                      <div key={m.label} className="metric-box">
                        <span className="metric-lbl">{m.label}</span>
                        <strong className="metric-val">{m.value}</strong>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card-visual-col">
                  <PanelVisual item={service} />
                </div>
              </div>

              <div className="card-bottom-accent" aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
