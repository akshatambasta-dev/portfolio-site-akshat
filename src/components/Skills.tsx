import { SKILL_CATEGORIES } from '../data/portfolioData';

export function Skills() {
  return (
    <section id="skills" className="skills-section-wrapper" aria-labelledby="skills-title-h">
      <div className="container skills-container">
        <div className="skills-header">
          <div className="section-kicker-tag" data-reveal>
            <span className="accent-index">06</span>
            <span className="kicker-sep">—</span>
            <span className="kicker-title">TECHNICAL ARCHITECTURE &amp; TOOLS</span>
          </div>
          <div className="skills-heading-flex">
            <h2 id="skills-title-h" className="skills-title-large" data-reveal>
              Tools of the <span className="serif-highlight">craft.</span>
            </h2>
            <span className="skills-tagline" data-reveal>TRANSPARENT TAXONOMY // NO ARTIFICIAL PERCENTAGES</span>
          </div>
          <p className="skills-disclaimer" data-reveal>
            Grouped transparently by working experience, current prototyping, and active areas of development rather than exaggerated proficiency meters.
          </p>
        </div>

        <div className="skills-matrix-grid">
          {SKILL_CATEGORIES.map((category) => (
            <div key={category.title} className="skill-category-panel" data-reveal>
              <div className="panel-header-line">
                <h3 className="category-title">{category.title}</h3>
                <span className="category-status-pill">{category.status}</span>
              </div>
              <ul className="category-tags-list">
                {category.skills.map((skill) => (
                  <li key={skill} className="category-tag-item">
                    <span className="tag-dot" aria-hidden="true" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
