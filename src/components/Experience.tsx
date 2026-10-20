import { Users, GraduationCap, Calendar, CheckCircle2 } from 'lucide-react';
import { LEADERSHIP } from '../data/portfolioData';

export function Experience() {
  return (
    <section id="experience" className="experience-section-wrapper" aria-labelledby="experience-title-h">
      <div className="container experience-container">
        <div className="experience-header">
          <div className="section-kicker-tag" data-reveal>
            <span className="accent-index">04</span>
            <span className="kicker-sep">—</span>
            <span className="kicker-title">LEADERSHIP &amp; TEACHING</span>
          </div>
          <h2 id="experience-title-h" className="experience-title-large" data-reveal>
            Organizing, mentoring &amp; <span className="serif-highlight">guiding.</span>
          </h2>
          <p className="experience-intro-text" data-reveal>
            Technical building doesn't exist in a vacuum. My background includes student governance, classroom instruction, and mentoring younger students in engineering and rapid prototyping.
          </p>
        </div>

        <div className="roles-timeline-grid">
          {LEADERSHIP.map((role, idx) => (
            <article key={role.role} className="leadership-card" data-reveal>
              <div className="role-top-meta">
                <span className="role-period">
                  <Calendar size={13} aria-hidden="true" />
                  {role.period}
                </span>
                <span className="role-badge">
                  {idx === 0 ? <Users size={13} aria-hidden="true" /> : <GraduationCap size={13} aria-hidden="true" />}
                  {idx === 0 ? 'GOVERNANCE' : 'STEM INSTRUCTOR'}
                </span>
              </div>

              <h3 className="role-title">{role.role}</h3>
              <p className="role-org-name">{role.organization}</p>

              <ul className="role-highlights-list">
                {role.highlights.map((h) => (
                  <li key={h}>
                    <CheckCircle2 size={14} className="role-bullet-check" aria-hidden="true" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
