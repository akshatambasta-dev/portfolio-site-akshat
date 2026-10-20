import { Award, ArrowUpRight } from 'lucide-react';
import { ACHIEVEMENTS } from '../data/portfolioData';

export function Achievements() {
  return (
    <section id="achievements" className="achievements-section-wrapper" aria-labelledby="achievements-title-h">
      <div className="container achievements-container">
        <div className="achievements-header">
          <div className="section-kicker-tag" data-reveal>
            <span className="accent-index">05</span>
            <span className="kicker-sep">—</span>
            <span className="kicker-title">RECOGNITION &amp; MILESTONES</span>
          </div>
          <h2 id="achievements-title-h" className="achievements-title-large" data-reveal>
            Milestones, <span className="serif-highlight">earned.</span>
          </h2>
        </div>

        <ol className="milestones-table-list">
          {ACHIEVEMENTS.map((item) => (
            <li key={item.title} className="milestone-row-item" data-reveal>
              <div className="milestone-year-col">
                <span className="year-pill">{item.period}</span>
                {item.badge && <span className="milestone-badge">{item.badge}</span>}
              </div>

              <div className="milestone-main-col">
                <h3 className="milestone-item-title">
                  <Award size={16} className="award-mini-icon" aria-hidden="true" />
                  <span>{item.title}</span>
                </h3>
                <p className="milestone-org-label">{item.organization}</p>
                <p className="milestone-desc-text">{item.description}</p>
              </div>

              <div className="milestone-arrow-col" aria-hidden="true">
                <span className="milestone-arrow-icon">
                  <ArrowUpRight size={18} />
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
