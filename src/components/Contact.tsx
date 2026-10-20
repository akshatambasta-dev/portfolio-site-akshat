import { Phone, MapPin, Linkedin, Github, ArrowUpRight, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export function Contact() {
  return (
    <section id="contact" className="contact-section-wrapper" aria-labelledby="contact-title-h">
      <div className="container contact-container">
        <div className="section-kicker-tag" data-reveal>
          <span className="accent-index">07</span>
          <span className="kicker-sep">—</span>
          <span className="kicker-title">DIRECT COMMUNICATION</span>
        </div>

        <div className="contact-main-grid">
          <div className="contact-prompt-col" data-reveal>
            <h2 id="contact-title-h" className="contact-title-large">
              Let’s make something <span className="serif-highlight">useful.</span>
            </h2>

            <p className="contact-intro-body">
              Whether you are looking to collaborate on hardware/software prototypes, discuss AI and sensor intelligence, or explore student innovation opportunities, my inbox is always open.
            </p>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="primary-email-anchor"
              aria-label={`Send email to ${PERSONAL_INFO.email}`}
            >
              <Mail size={22} className="email-icon" aria-hidden="true" />
              <span className="email-text">{PERSONAL_INFO.email}</span>
              <ArrowUpRight size={22} className="email-arrow" aria-hidden="true" />
            </a>

            <div className="contact-availability-tag">
              <span className="status-dot-active" aria-hidden="true" />
              <span>CURRENTLY BASED IN PUNE · AVAILABLE FOR REMOTE &amp; IN-PERSON COLLABORATION</span>
            </div>
          </div>

          <div className="contact-channels-col" data-reveal>
            <dl className="channels-definition-list">
              <div className="channel-row">
                <dt>
                  <Phone size={14} className="ch-icon" aria-hidden="true" />
                  <span>PHONE / WHATSAPP</span>
                </dt>
                <dd>
                  <a href={`tel:${PERSONAL_INFO.phone}`} className="channel-link">
                    {PERSONAL_INFO.phone}
                  </a>
                </dd>
              </div>

              <div className="channel-row">
                <dt>
                  <MapPin size={14} className="ch-icon" aria-hidden="true" />
                  <span>LOCATION</span>
                </dt>
                <dd>
                  <span>{PERSONAL_INFO.location}</span>
                </dd>
              </div>

              <div className="channel-row">
                <dt>
                  <Linkedin size={14} className="ch-icon" aria-hidden="true" />
                  <span>LINKEDIN</span>
                </dt>
                <dd>
                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="channel-link ext"
                  >
                    <span>linkedin.com/in/akshat-ambasta-3aaaab41b</span>
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                </dd>
              </div>

              <div className="channel-row">
                <dt>
                  <Github size={14} className="ch-icon" aria-hidden="true" />
                  <span>GITHUB</span>
                </dt>
                <dd>
                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="channel-link ext"
                  >
                    <span>github.com/akshatambasta-dev</span>
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                </dd>
              </div>

              <div className="channel-row">
                <dt>
                  <ArrowUpRight size={14} className="ch-icon" aria-hidden="true" />
                  <span>VOLTVISION SITE</span>
                </dt>
                <dd>
                  <a
                    href={PERSONAL_INFO.voltvisionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="channel-link ext"
                  >
                    <span>voltvixion-site.onrender.com</span>
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                </dd>
              </div>

              <div className="channel-row">
                <dt>
                  <ArrowUpRight size={14} className="ch-icon" aria-hidden="true" />
                  <span>FILE2BASE DEMO</span>
                </dt>
                <dd>
                  <a
                    href={PERSONAL_INFO.file2baseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="channel-link ext"
                  >
                    <span>file2base-evaluator-demo.onrender.com</span>
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <footer className="site-colophon-footer">
        <div className="container footer-content-row">
          <div className="footer-left">
            <span className="footer-brand">AKSHAT AMBASTA</span>
            <span className="footer-copy">
              © {new Date().getFullYear()} · HAND-CRAFTED DIGITAL EXPERIENCE
            </span>
          </div>

          <div className="footer-middle">
            <span className="footer-tech-stack">REACT ✦ TYPESCRIPT ✦ THREE.JS ✦ VITE</span>
          </div>

          <div className="footer-right">
            <a href="#top" className="back-to-top-anchor">
              <span>BACK TO TOP</span>
              <span className="arrow-up" aria-hidden="true">↑</span>
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
}
