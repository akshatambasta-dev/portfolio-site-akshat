import { useState } from 'react';
import { LayoutGrid, List, ArrowUpRight, Database, Sprout, Leaf } from 'lucide-react';
import { OTHER_PROJECTS, type ProjectItem } from '../data/portfolioData';

function ProjectBespokePreview({ item }: { item: ProjectItem }) {
  if (item.kind === 'file2base') {
    return (
      <div className="card-preview-art preview-file2base" aria-hidden="true">
        <div className="preview-top-badge">
          <Database size={12} />
          <span>FILE2BASE // DEMO PROTOTYPE</span>
        </div>
        <div className="schema-visualizer-mock">
          <div className="raw-file-pane">
            <span className="file-tag">INPUT: records_2026.csv</span>
            <div className="raw-csv-stream">
              <code>cust_id, order_amt, date, status</code>
              <code>1042, 450.00, 2026-10-18, shipped</code>
              <code>1043, 120.50, 2026-10-19, pending</code>
            </div>
          </div>
          <div className="schema-conversion-arrow">
            <span>PROFILING</span>
            <i>→</i>
          </div>
          <div className="schema-table-pane">
            <span className="table-tag">TABLE: orders (Relational)</span>
            <div className="schema-fields">
              <span><strong>id</strong> INTEGER [PK]</span>
              <span><strong>order_amount</strong> NUMERIC</span>
              <span><strong>status_code</strong> VARCHAR(16)</span>
            </div>
          </div>
        </div>
        <div className="preview-status-strip">
          <span>AI SCHEMA SUGGESTION: CONFIDENCE 94%</span>
          <span>EXPORT SQL</span>
        </div>
      </div>
    );
  }

  if (item.kind === 'smartfarm') {
    return (
      <div className="card-preview-art preview-smartfarm" aria-hidden="true">
        <div className="preview-top-badge">
          <Sprout size={12} />
          <span>IOT SENSOR ARRAY // ARDUINO</span>
        </div>
        <div className="farm-telemetry-mock">
          <div className="sensor-gauge-cluster">
            <div className="gauge-box">
              <span className="gauge-lbl">SOIL MOISTURE</span>
              <strong className="gauge-val">68%</strong>
              <small className="gauge-status opt">OPTIMAL</small>
            </div>
            <div className="gauge-box">
              <span className="gauge-lbl">AMBIENT TEMP</span>
              <strong className="gauge-val">27.4°C</strong>
              <small className="gauge-status">NORMAL</small>
            </div>
            <div className="gauge-box">
              <span className="gauge-lbl">RELAY STATE</span>
              <strong className="gauge-val">AUTO</strong>
              <small className="gauge-status">STANDBY</small>
            </div>
          </div>
          <div className="farm-graph-strip">
            <div className="soil-wave" />
          </div>
        </div>
        <div className="preview-status-strip">
          <span>2ND PLACE STATE · BAL VAIGYANIK PRADARSHINI</span>
          <span>NATIONAL LEVEL</span>
        </div>
      </div>
    );
  }

  // Carbon Calculator
  return (
    <div className="card-preview-art preview-carbon" aria-hidden="true">
      <div className="preview-top-badge">
        <Leaf size={12} />
        <span>CARBON CALCULATOR // PYTHON</span>
      </div>
      <div className="carbon-analytics-mock">
        <div className="carbon-meter-row">
          <div className="carbon-stat">
            <span className="lbl">EST. MONTHLY EMISSIONS</span>
            <strong className="val">284 kg CO₂e</strong>
          </div>
          <div className="carbon-delta">
            <span className="lbl">REGIONAL GRID FACTOR</span>
            <span className="val-factor">0.82 kg/kWh (MH)</span>
          </div>
        </div>
        <div className="offset-breakdown-bar">
          <div className="bar-segment grid" style={{ width: '65%' }}><span>GRID 65%</span></div>
          <div className="bar-segment gas" style={{ width: '20%' }}><span>GAS 20%</span></div>
          <div className="bar-segment solar" style={{ width: '15%' }}><span>OFFSET</span></div>
        </div>
      </div>
      <div className="preview-status-strip">
        <span>STATE LEVEL PARTICIPATION 2024</span>
        <span>ACTIONABLE OFFSET MODEL</span>
      </div>
    </div>
  );
}

export function ProjectGallery() {
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards');

  return (
    <section id="projects" className="gallery-section-wrapper" aria-labelledby="gallery-title-h">
      <div className="container gallery-container">
        {/* Section Heading & View Toggle */}
        <div className="gallery-header-row">
          <div>
            <div className="section-kicker-tag" data-reveal>
              <span className="accent-index">03</span>
              <span className="kicker-sep">—</span>
              <span className="kicker-title">SELECTED WORK &amp; EXPERIMENTS</span>
            </div>
            <h2 id="gallery-title-h" className="gallery-title-large" data-reveal>
              Ideas engineered into <span className="serif-highlight">systems.</span>
            </h2>
          </div>

          {/* Real accessible Card / List View Toggle */}
          <div className="view-toggle-control" role="group" aria-label="Project layout switch" data-reveal>
            <span className="toggle-label">LAYOUT:</span>
            <div className="toggle-pill">
              <button
                type="button"
                className={`toggle-btn ${viewMode === 'cards' ? 'is-active' : ''}`}
                aria-pressed={viewMode === 'cards'}
                onClick={() => setViewMode('cards')}
              >
                <LayoutGrid size={14} aria-hidden="true" />
                <span>Cards</span>
              </button>
              <button
                type="button"
                className={`toggle-btn ${viewMode === 'list' ? 'is-active' : ''}`}
                aria-pressed={viewMode === 'list'}
                onClick={() => setViewMode('list')}
              >
                <List size={14} aria-hidden="true" />
                <span>List</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Project Stream: Cards View vs List View */}
        <div className={`projects-collection-wrapper mode-${viewMode}`}>
          {OTHER_PROJECTS.map((project) => (
            <article key={project.id} className="project-display-card" data-reveal>
              {/* Bespoke Interactive Preview Visual */}
              <div className="project-preview-wrapper">
                <ProjectBespokePreview item={project} />
              </div>

              {/* Text Meta Content */}
              <div className="project-content-block">
                <div className="project-header-meta">
                  <span className="project-cat-tag">{project.category}</span>
                  <span className="project-badge-tag">{project.badge}</span>
                </div>

                <h3 className="project-card-title">
                  {project.href ? (
                    <a href={project.href} target="_blank" rel="noopener noreferrer" className="title-link">
                      <span>{project.title}</span>
                      <ArrowUpRight size={18} className="link-arrow" aria-hidden="true" />
                    </a>
                  ) : (
                    <span>{project.title}</span>
                  )}
                </h3>

                <p className="project-overview-text">{project.description}</p>

                <div className="project-key-contributions">
                  <span className="contrib-label">KEY CONTRIBUTIONS:</span>
                  <ul className="contrib-list">
                    {project.contributions.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </div>

                <div className="project-tech-stack">
                  <span className="tech-label">TECHNOLOGIES:</span>
                  <ul className="project-chips">
                    {project.technologies.map((t) => (
                      <li key={t} className="tech-pill">{t}</li>
                    ))}
                  </ul>
                </div>

                <div className="project-recognition-box">
                  <span className="recog-star">✦</span>
                  <ul className="recog-items">
                    {project.recognition.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </div>

                {project.href && (
                  <div className="project-direct-action">
                    <a href={project.href} target="_blank" rel="noopener noreferrer" className="btn-open-live">
                      <span>{project.liveLabel || 'Open Live Project'}</span>
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
