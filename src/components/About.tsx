import { PERSONAL_INFO } from '../data/portfolioData';
import { OrbitBadge } from './Hero';

export function About() {
  return (
    <section id="about" className="about-section-wrapper" aria-labelledby="about-title-h">
      <div className="container about-container">
        <div className="section-kicker-tag" data-reveal>
          <span className="accent-index">01</span>
          <span className="kicker-sep">—</span>
          <span className="kicker-title">FOUNDATIONS &amp; APPROACH</span>
        </div>

        <div className="about-grid-layout">
          <div className="about-narrative-col" data-reveal>
            <h2 id="about-title-h" className="about-title-large">
              Learning by <span className="serif-highlight">building.</span>
            </h2>

            <div className="about-body-paragraphs">
              <p>
                I am a first-year Artificial Intelligence undergraduate who believes true engineering understanding comes from turning abstract ideas into tangible, running systems. My work spans microcontroller firmware, sensor networks, server backends, web frontends, and practical data intelligence.
              </p>
              <p>
                Rather than treating software and hardware as isolated disciplines, I explore where they converge — measuring AC electrical current with an ESP32 for VoltVision, inferring database schemas from messy CSVs for File2Base, or synchronizing multi-terminal escape puzzles on a campus LAN.
              </p>
              <p>
                Alongside engineering prototypes, I lead and teach: having served as Head of Student Council representing 1,000 students and as a Student Instructor at the Atal Tinkering Lab demystifying robotics and electronics for younger students.
              </p>
            </div>

            <div className="about-quote-box">
              <blockquote className="editorial-quote">
                “Technology becomes meaningful when it solves problems that matter.”
              </blockquote>
              <span className="quote-attribution">— Working Builder Principle</span>
            </div>
          </div>

          <div className="about-facts-col" data-reveal>
            <div className="facts-card">
              <div className="facts-card-header">
                <span className="facts-eyebrow">VERIFIED INSTITUTIONAL RECORD</span>
                <span className="facts-year">2026</span>
              </div>

              <dl className="facts-definition-list">
                <div className="fact-item">
                  <dt>ACADEMIC PROGRAM</dt>
                  <dd>B.Sc. in Artificial Intelligence</dd>
                </div>
                <div className="fact-item">
                  <dt>INSTITUTION</dt>
                  <dd>Symbiosis Centre for Applied Artificial Intelligence (SAII), Symbiosis International University</dd>
                </div>
                <div className="fact-item">
                  <dt>CAMPUS LOCATION</dt>
                  <dd>{PERSONAL_INFO.location}</dd>
                </div>
                <div className="fact-item">
                  <dt>CORE TECHNICAL FOCUS</dt>
                  <dd>Embedded Systems (ESP32 / Arduino), IoT Telemetry, Python/Flask Web Services, Practical AI/ML</dd>
                </div>
                <div className="fact-item">
                  <dt>PUBLISHED WRITING</dt>
                  <dd>“A Thousand Broken Pieces” (Poetry Collection, Amazon)</dd>
                </div>
              </dl>

              <div className="facts-badge-corner" aria-hidden="true">
                <OrbitBadge />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
