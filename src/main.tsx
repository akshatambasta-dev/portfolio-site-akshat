import React, { useEffect, useRef, useState, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDown, ArrowUpRight, Menu, X, Github, Linkedin, MapPin, Phone } from 'lucide-react';
import './styles.css';

const EMAIL = 'akshatambast2007@gmail.com';
const PHONE = '+91 8817334513';
const LINKEDIN = 'https://www.linkedin.com/in/akshat-ambasta-3aaaab41b';
const GITHUB = 'https://github.com/akshatambasta-dev';
const VOLT = 'https://voltvixion-site.onrender.com';
const NAV = [['About','about'],['Projects','projects'],['Experience','experience'],['Achievements','achievements'],['Contact','contact']] as const;

function useMotionEffects() {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      targets.forEach(el => el.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    targets.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function Ext({ href, children, className = '' }: {href:string; children:ReactNode; className?:string}) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={`ext-link ${className}`}>{children}<ArrowUpRight size={14} aria-hidden="true"/><span className="sr-only">(opens in a new tab)</span></a>;
}

function Header() {
  const [open,setOpen] = useState(false);
  useEffect(() => {
    const onKey = (e:KeyboardEvent) => { if(e.key==='Escape') setOpen(false); };
    window.addEventListener('keydown',onKey); return () => window.removeEventListener('keydown',onKey);
  },[]);
  return <header className="site-header"><div className="nav-wrap container">
    <a href="#top" className="wordmark" onClick={()=>setOpen(false)}>AKSHAT AMBASTA<span className="red-dot">.</span></a>
    <nav className="desktop-nav" aria-label="Primary"><ul>{NAV.map(([label,id])=><li key={id}><a href={`#${id}`}>{label}</a></li>)}<li className="nav-divider"/><li><Ext href={LINKEDIN}>LinkedIn</Ext></li><li><Ext href={GITHUB}>GitHub</Ext></li></ul></nav>
    <button type="button" className="menu-toggle" aria-label={open?'Close menu':'Open menu'} aria-expanded={open} aria-controls="mobile-nav" onClick={()=>setOpen(v=>!v)}>{open?<X size={21}/>:<Menu size={21}/>}</button>
  </div>{open && <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile"><ul>{NAV.map(([label,id])=><li key={id}><a href={`#${id}`} onClick={()=>setOpen(false)}>{label}</a></li>)}</ul><div className="mobile-social"><Ext href={LINKEDIN}>LinkedIn</Ext><Ext href={GITHUB}>GitHub</Ext></div></nav>}</header>;
}

function OrbitBadge() {
 return <div className="orbit-badge" aria-label="AI builder, hardware and IoT"><svg viewBox="0 0 180 180" className="orbit-type" aria-hidden="true"><defs><path id="orbitPath" d="M90,90 m-63,0 a63,63 0 1,1 126,0 a63,63 0 1,1 -126,0"/></defs><text><textPath href="#orbitPath">AI BUILDER · HARDWARE · IOT · BUILD FOR IMPACT · </textPath></text></svg><div className="orbit-center" aria-hidden="true"><svg viewBox="0 0 40 40"><path d="M20 2 23.7 16.3 38 20 23.7 23.7 20 38 16.3 23.7 2 20 16.3 16.3Z" fill="currentColor"/><circle cx="20" cy="20" r="4" fill="#A11212"/></svg></div></div>;
}

function HeroDiagram() {
 return <div className="hero-art" aria-hidden="true"><div className="art-grid"/><svg viewBox="0 0 320 320" className="node-art"><g fill="none" stroke="currentColor" strokeWidth="1"><circle cx="160" cy="160" r="120" strokeOpacity=".18"/><circle cx="160" cy="160" r="70" strokeOpacity=".3"/><path d="M40 160H120 M200 160H280 M160 40V120 M160 200V280"/><rect x="120" y="120" width="80" height="80" rx="4"/><rect x="140" y="140" width="40" height="40" rx="2" strokeOpacity=".45"/></g>{[[40,160],[280,160],[160,40],[160,280]].map(([x,y])=><circle key={`${x}-${y}`} cx={x} cy={y} r="4" fill="#fff" stroke="currentColor"/>)}<circle cx="160" cy="160" r="5" fill="#A11212"/></svg><OrbitBadge/><span className="art-coord coord-a">AI / IOT</span><span className="art-coord coord-b">HARDWARE / SOFTWARE</span></div>;
}

function Section({id,num,label,children}:{id:string;num:string;label:string;children:ReactNode}) {return <section id={id} aria-labelledby={`${id}-h`} className="section"><div className="container section-grid"><div className="section-kicker" data-reveal><span>{num}</span><i>—</i>{label}</div><div className="section-content">{children}</div></div></section>}
function H2({id,children}:{id:string;children:ReactNode}) {return <h2 id={`${id}-h`} className="section-title" data-reveal>{children}</h2>}
function Chips({items}:{items:string[]}) {return <ul className="chips">{items.map(t=><li key={t}>{t}</li>)}</ul>}
function Bullets({items}:{items:string[]}) {return <ul className="bullets">{items.map(t=><li key={t}><span className="bullet-mark" aria-hidden="true"/>{t}</li>)}</ul>}

function TiltSchematic() {
 const ref = useRef<HTMLElement|null>(null);
 const reduced = useRef(false);
 useEffect(()=>{reduced.current=window.matchMedia('(prefers-reduced-motion: reduce)').matches;},[]);
 const move=(e:React.PointerEvent<HTMLElement>)=>{
   if(reduced.current || e.pointerType!=='mouse' || !ref.current) return;
   const r=ref.current.getBoundingClientRect(); const x=(e.clientX-r.left)/r.width; const y=(e.clientY-r.top)/r.height;
   ref.current.style.setProperty('--rx',`${(0.5-y)*4}deg`); ref.current.style.setProperty('--ry',`${(x-0.5)*5}deg`); ref.current.style.setProperty('--mx',`${x*100}%`); ref.current.style.setProperty('--my',`${y*100}%`);
 };
 const reset=()=>{if(!ref.current)return;ref.current.style.setProperty('--rx','0deg');ref.current.style.setProperty('--ry','0deg');ref.current.style.setProperty('--mx','50%');ref.current.style.setProperty('--my','50%');};
 const desktop = typeof window !== 'undefined' && window.matchMedia('(min-width: 760px)').matches;
 const nodes=[['Electrical load','AC appliance'],['PZEM-004T','V · I · P · kWh'],['ESP32','Microcontroller'],['Flask / SQLite','Server & storage'],['Energy insights','Dashboard']];
 return <figure ref={ref as React.RefObject<HTMLElement>} className="schematic tilt-card" onPointerMove={move} onPointerLeave={reset} onPointerCancel={reset} data-reveal>
  <figcaption className="label-meta">FIG. 01 — SYSTEM DATA FLOW <span>(EXPLANATORY DIAGRAM)</span></figcaption>
  <ol className="flow-nodes">{nodes.map(([title,sub],i)=><li key={title}><div className={`flow-box ${i===2?'flow-accent':''}`}><span className="flow-num">0{i+1}</span><strong>{title}</strong><small>{sub}</small></div>{i<nodes.length-1&&<span className="flow-arrow" aria-hidden="true">{desktop?'→':'↓'}</span>}</li>)}</ol>
  <span className="scan-line" aria-hidden="true"/>
 </figure>;
}

function ProjectCard(p:{title:string;meta:string;overview:string;tech:string[];contributions:string[];recognition:string[]}) {return <article className="project-card" data-reveal><div><p className="label-meta">{p.meta}</p><h4>{p.title}</h4></div><p className="muted project-summary">{p.overview}</p><div><p className="label-meta sub-label">CONTRIBUTIONS</p><Bullets items={p.contributions}/></div><div><p className="label-meta sub-label">TECHNOLOGY</p><Chips items={p.tech}/></div><div className="recognition"><p className="label-meta">RECOGNITION</p><Bullets items={p.recognition}/></div></article>}
function Role(p:{title:string;org:string;dates:string;items:string[]}) {return <article className="role-row" data-reveal><p className="label-meta role-date">{p.dates}</p><div><h3>{p.title}</h3><p className="muted role-org">{p.org}</p><Bullets items={p.items}/></div></article>}

function Marquee() {return <div className="marquee" aria-label="Learn by building. Build for impact."><div className="marquee-track" aria-hidden="true">{[0,1,2,3].map(i=><span key={i}>LEARN BY BUILDING <b>✳</b> BUILD FOR IMPACT <b>✳</b> THINK IN SYSTEMS <b>✳</b>&nbsp;</span>)}</div></div>}
function EnergyOrb() {return <div className="orb-scene" aria-hidden="true"><div className="orb-orbit orbit-one"/><div className="orb-orbit orbit-two"/><div className="energy-orb"><div className="orb-core"/><div className="orb-shimmer"/></div><span className="orb-cross cross-a"/><span className="orb-cross cross-b"/></div>}

function App() {
 useMotionEffects();
 return <div id="top" className="page-shell"><a className="skip-link" href="#main">Skip to content</a><Header/><main id="main">
  <section className="hero container" aria-labelledby="hero-h"><div className="hero-meta" data-reveal><p>AI BUILDER <span>·</span> STUDENT LEADER <span>·</span> EDUCATOR</p><p className="location"><MapPin size={13} aria-hidden="true"/> PUNE, MAHARASHTRA, INDIA</p></div>
   <div className="hero-main"><h1 id="hero-h" className="hero-title"><span className="title-line">BUILDING</span><span className="title-line">INTELLIGENT</span><span className="title-line">TECHNOLOGY<span className="red-dot">.</span></span><span className="title-line title-last">FOR REAL-WORLD IMPACT</span></h1><HeroDiagram/></div>
   <div className="hero-bottom" data-reveal><p className="hero-copy">I turn ideas into practical systems across AI, software, embedded hardware and IoT.</p><div className="hero-actions"><a className="pill pill-dark" href="#projects">Explore projects <ArrowDown size={15}/></a><a className="pill pill-light" href={`mailto:${EMAIL}`}>Get in touch <ArrowUpRight size={15}/></a></div></div>
   <div className="hero-foot"><span>BASED IN INDIA · OPEN TO IDEAS</span><span>SCROLL TO EXPLORE ↓</span></div>
  </section>
  <Marquee/>
  <Section id="about" num="01" label="ABOUT"><H2 id="about">Learning by <em>building.</em></H2><div className="about-grid"><div className="about-copy" data-reveal><p>I am a first-year Artificial Intelligence student who enjoys turning ideas into things that can actually be built. My work spans Python, IoT, embedded systems, data analysis and hardware-software prototyping.</p><p>I enjoy exploring real-world problems, developing practical solutions and learning through experimentation. My experience includes building functional hardware/software prototypes, independently developing projects, teaching younger students technical skills and leading student activities.</p></div><dl className="about-facts" data-reveal><div><dt>EDUCATION</dt><dd>B.Sc. Artificial Intelligence</dd></div><div><dt>INSTITUTION</dt><dd>Symbiosis Centre for Applied Artificial Intelligence (SAII), Symbiosis International University</dd></div><div><dt>LOCATION</dt><dd>Pune, India</dd></div></dl></div></Section>
  <Section id="projects" num="02" label="SELECTED WORK"><H2 id="projects">Ideas into <em>systems.</em></H2>
   <article className="featured-project"><div className="project-topline"><div><p className="label-meta"><span className="accent-word">FEATURED PROJECT</span> · SMART ENERGY INTELLIGENCE</p><h3 className="featured-title">VoltVision<span className="red-dot">.</span></h3></div><Ext href={VOLT} className="project-visit">Explore project</Ext></div>
    <div className="award-line" data-reveal><span className="award-star">✳</span><p><strong>1st Place</strong> — IEEE Maharashtra Section Entrepreneurship &amp; Innovation Group (EIG) Business Pitch Competition, 2026.</p></div>
    <p className="featured-intro" data-reveal>VoltVision is a functional hardware-and-software energy intelligence system designed to turn electricity measurements into actionable insights.</p>
    <TiltSchematic/>
    <div className="project-detail-grid"><div className="detail-stack" data-reveal><div className="detail-block"><p className="label-meta">ROLE</p><p>Team Lead / Core Developer</p></div><div className="detail-block"><p className="label-meta">OBJECTIVE</p><p className="muted">Make electricity consumption easier to understand, identify unusual usage patterns and help users make better energy decisions.</p></div><div className="detail-block"><p className="label-meta">CAPABILITIES</p><Bullets items={['Real-time voltage, current, power and energy monitoring','Electricity-consumption insights','Appliance-level usage analysis','Identification of unusual energy usage','Actionable energy intelligence']}/></div></div><div className="detail-stack" data-reveal><div className="detail-block"><p className="label-meta">CONTRIBUTIONS</p><Bullets items={['Hardware development and integration','Software development','Research and technical problem-solving','Website and application development','Project planning and presentation','Energy-monitoring and appliance-level insight research']}/></div><div className="detail-block"><p className="label-meta">TECH STACK</p><Chips items={['ESP32','PZEM-004T','Python','Flask','SQLite','HTML','CSS','JavaScript','NILM research']}/></div><a className="inline-cta" href={VOLT} target="_blank" rel="noopener noreferrer">Visit VoltVision website <ArrowUpRight size={16}/></a></div></div>
   </article>
   <div className="other-projects-head" data-reveal><p className="label-meta">MORE EXPERIMENTS</p><span>02 / 03</span></div><div className="project-cards">
    <ProjectCard title="Smart Plant Monitoring & AI-Based Farming System" meta="INDEPENDENT · ARDUINO / IOT / AUTOMATED FARMING" overview="An independently designed and built farming-monitoring system using environmental sensors to study plant-growing conditions and support automated farming decisions." contributions={['Independently designed and built the system','Developed the hardware setup','Programmed using Arduino IDE','Integrated environmental sensing','Explored automated farming and crop-monitoring applications']} tech={['Arduino','Arduino IDE','Temperature sensing','Humidity sensing','Soil-moisture sensing','Hardware/software integration']} recognition={['2nd Place, state-level KVS Bal Vaigyanik Pradarshani','Advanced to national level','Newspaper coverage in Raipur']}/>
    <ProjectCard title="Carbon Emissions Calculator" meta="INDEPENDENT · PYTHON · 2024" overview="A Python-based household carbon-emissions calculator estimating emissions from electricity and gas use while accounting for renewable energy." contributions={['Independently developed the calculator','Implemented calculations and user inputs','Incorporated state-specific electricity emission factors','Designed output to help users understand estimated emissions']} tech={['Python','Electricity calculations','Gas-related emissions','Renewable energy adjustment','State-specific emission factors','Monthly emissions thresholds','Configurable carbon tax']} recognition={['School-level winner','Represented the project at state level, 2024']}/>
   </div>
  </Section>
  <Marquee/>
  <Section id="experience" num="03" label="EXPERIENCE"><H2 id="experience">Leadership &amp; <em>teaching.</em></H2><div className="roles"><Role title="Head of Student Council" org="Kendriya Vidyalaya" dates="JUNE 2024 — MARCH 2025" items={['Represented approximately 1,000 students','Led 40–50 council members','Organized school competitions and major events','Helped coordinate Annual Day and Sports Day','Coordinated with school administration','Improved communication between students and administration']}/><Role title="Student Instructor — Atal Tinkering Lab" org="Kendriya Vidyalaya" dates="SEPTEMBER 2023 — FEBRUARY 2025" items={['Taught students in Grades 9–12','Led hands-on workshops in Arduino, IoT, robotics and 3D design','Designed practical projects and workshop activities','Mentored students preparing for science and innovation competitions','Supported four students who progressed to state-level competitions']}/></div></Section>
  <Section id="achievements" num="04" label="RECOGNITION"><H2 id="achievements">Milestones, <em>earned.</em></H2><ol className="achievement-list">{[['2026','1st Place — IEEE Maharashtra Section EIG Business Pitch Competition','VoltVision'],['STATE','2nd Place — KVS Bal Vaigyanik Pradarshani','Advanced to national level'],['2024','Carbon Emissions Calculator','School-level winner and state-level participant'],['CLASS 10','Published author — “A Thousand Broken Pieces”','Poetry collection, available on Amazon']].map(([year,title,detail])=><li key={title} data-reveal><span className="achievement-year">{year}</span><div><h3>{title}</h3><p>{detail}</p></div><span className="achievement-mark" aria-hidden="true">↗</span></li>)}</ol>
   <div className="skills-heading" data-reveal><p className="label-meta">TOOLS OF THE TRADE</p><span>Technical skills</span></div><dl className="skills-grid">{[['Programming','Python, Arduino IDE, HTML, CSS, JavaScript'],['Hardware & embedded','ESP32, Arduino, IoT, Embedded Systems, PZEM-004T'],['Software & development','Flask, SQLite, Git, GitHub'],['AI & data','AI/ML fundamentals, Data Analysis, Hardware-software prototyping, NILM research'],['Other skills','Technical presentations, Project leadership, Teaching and mentoring, Event coordination, Problem-solving']].map(([k,v])=><div key={k} data-reveal><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
  </Section>
  <section className="philosophy" aria-label="Personal philosophy"><div className="philosophy-grain" aria-hidden="true"/><div className="philosophy-inner container"><div className="philosophy-copy" data-reveal><p className="label-meta">A WORKING PRINCIPLE</p><blockquote>“Technology becomes meaningful when it solves problems that <em>matter.</em>”</blockquote><p className="philosophy-note">Practical experimentation. Learning by building. Solving real-world problems. Helping others develop technical confidence.</p></div><EnergyOrb/></div><span className="philosophy-index">AK / 2026 — END NOTE</span></section>
  <Section id="contact" num="05" label="CONTACT"><H2 id="contact">Let’s make something <em>useful.</em></H2><div className="contact-layout"><div data-reveal><p className="contact-intro">Have an idea, a problem worth exploring, or simply want to talk about building things? Reach out.</p><a className="email-link" href={`mailto:${EMAIL}`}>{EMAIL}<ArrowUpRight size={22}/></a></div><dl className="contact-details" data-reveal><div><dt><Phone size={14}/> PHONE</dt><dd><a href="tel:+918817334513">{PHONE}</a></dd></div><div><dt><MapPin size={14}/> LOCATION</dt><dd>Pune, Maharashtra, India</dd></div><div><dt><Linkedin size={14}/> LINKEDIN</dt><dd><Ext href={LINKEDIN}>Akshat Ambasta</Ext></dd></div><div><dt><Github size={14}/> GITHUB</dt><dd><Ext href={GITHUB}>akshatambasta-dev</Ext></dd></div><div><dt><ArrowUpRight size={14}/> FEATURED PROJECT</dt><dd><Ext href={VOLT}>VoltVision website</Ext></dd></div></dl></div></Section>
 </main><footer className="footer"><div className="container footer-inner"><a href="#top" className="footer-mark">AK<span className="red-dot">.</span></a><p>© {new Date().getFullYear()} AKSHAT AMBASTA</p><a href="#top" className="back-top">BACK TO TOP ↑</a></div></footer></div>;
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
