export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  badge: string;
  description: string;
  contributions: string[];
  technologies: string[];
  recognition: string[];
  href?: string;
  liveLabel?: string;
  kind: 'voltvision' | 'file2base' | 'smartfarm' | 'carbon' | 'doomsday';
  architecture?: string[];
}

export interface ServiceItem {
  id: string;
  number: string;
  discipline: string;
  title: string;
  description: string;
  skills: string[];
  theme: 'dark' | 'light' | 'graphite' | 'warm';
  coordinates: string;
  metrics: { label: string; value: string }[];
}

export interface LeadershipItem {
  role: string;
  organization: string;
  period: string;
  highlights: string[];
}

export interface MilestoneItem {
  period: string;
  title: string;
  organization: string;
  description: string;
  badge?: string;
}

export const PERSONAL_INFO = {
  name: 'Akshat Ambasta',
  role: 'AI, Embedded Systems & Software Builder',
  status: 'B.Sc. Artificial Intelligence · Symbiosis SAII, Pune',
  location: 'Pune, Maharashtra, India',
  email: 'akshatambast2007@gmail.com',
  phone: '+91 8817334513',
  github: 'https://github.com/akshatambasta-dev',
  linkedin: 'https://www.linkedin.com/in/akshat-ambasta-3aaaab41b',
  livePortfolio: 'https://akshat-ambasta-portfolio-preview.onrender.com',
  voltvisionUrl: 'https://voltvixion-site.onrender.com',
  file2baseUrl: 'https://file2base-evaluator-demo.onrender.com',
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'frontend',
    number: '01',
    discipline: 'FRONTEND DESIGN & INTERFACES',
    title: 'Interfaces with a point of view.',
    description: 'Translating complex system telemetry and workflows into clear, deliberate digital layouts. Focusing on structural hierarchy, intentional motion, fluid responsive behavior, and robust usability.',
    skills: ['HTML5 & Modern CSS', 'TypeScript', 'React & Vite', 'Motion Architecture', 'Design Systems', 'Responsive UI'],
    theme: 'dark',
    coordinates: 'LAT 18.5204° N · LON 73.8567° E',
    metrics: [
      { label: 'RESPONSIVENESS', value: '320px — 4K' },
      { label: 'MOTION SPEC', value: 'RAF / CSS Springs' },
    ],
  },
  {
    id: 'backend',
    number: '02',
    discipline: 'BACKEND, APIS & LOCAL SERVERS',
    title: 'The logic behind the screen.',
    description: 'Constructing pragmatic server architectures, RESTful endpoints, and database models. Experience includes Flask servers, SQLite/PostgreSQL schemas, Render cloud deployments, and multi-PC LAN synchronization.',
    skills: ['Python & Flask', 'REST APIs', 'SQLite & PostgreSQL', 'LAN Multi-Client Sync', 'Render Cloud Deployment', 'Git & GitHub'],
    theme: 'light',
    coordinates: 'PORT 5000 · TCP/IP LAN · HTTP/1.1',
    metrics: [
      { label: 'DATA PERSISTENCE', value: 'SQLite / Postgres' },
      { label: 'DEPLOYMENT', value: 'Render Static / Web' },
    ],
  },
  {
    id: 'intelligence',
    number: '03',
    discipline: 'AI, DATA & AUTOMATION',
    title: 'From raw information to useful insight.',
    description: 'Applying data profiling, feature extraction, and AI/ML foundations to practical use cases. Projects explore automatic file-to-database schema structuring (File2Base) and Non-Intrusive Load Monitoring (NILM) energy insights.',
    skills: ['AI/ML Fundamentals', 'Data Profiling & Schemas', 'Feature Extraction', 'NILM Experimentation', 'Energy Analytics', 'Workflow Automation'],
    theme: 'graphite',
    coordinates: 'DATASETS: TIME-SERIES · CSV/XLSX',
    metrics: [
      { label: 'ANALYSIS', value: 'Appliance NILM' },
      { label: 'SCHEMA INFERENCE', value: 'File2Base Engine' },
    ],
  },
  {
    id: 'embedded',
    number: '04',
    discipline: 'EMBEDDED HARDWARE & IOT',
    title: 'Bridging physical and digital.',
    description: 'Designing and testing physical computing setups with microcontrollers and electrical sensors. Bridging measured physical reality (voltage, current, temperature, moisture) with software APIs and dashboards.',
    skills: ['ESP32 Microcontroller', 'Arduino IDE & C++', 'PZEM-004T v3.0 Sensor', 'Environmental Sensors', 'Serial & UART Protocol', 'Hardware Integration'],
    theme: 'warm',
    coordinates: 'MICRO: ESP-WROOM-32 · 3.3V / 5V',
    metrics: [
      { label: 'SAMPLING', value: 'AC Real-Time RMS' },
      { label: 'SENSING', value: 'PZEM / Soil / DHT' },
    ],
  },
];

export const VOLTVISION_DATA: ProjectItem = {
  id: 'voltvision',
  kind: 'voltvision',
  title: 'VoltVision',
  category: 'FEATURED CASE STUDY — SMART ENERGY INTELLIGENCE',
  badge: '1ST PLACE — IEEE MAHARASHTRA SECTION EIG PITCH COMPETITION 2026',
  description: 'VoltVision is a comprehensive hardware-and-software energy monitoring system built to convert high-frequency electrical measurements into intuitive, appliance-level consumption insights and conservation intelligence.',
  contributions: [
    'Hardware integration of ESP32 with PZEM-004T v3.0 AC energy measurement module',
    'ESP32 firmware development using Arduino IDE for continuous serial telemetry',
    'Server backend in Python and Flask managing data persistence with SQLite',
    'Responsive web dashboard displaying real-time V, I, P, and accumulated kWh',
    'Exploratory research into Non-Intrusive Load Monitoring (NILM) algorithms for appliance disaggregation',
    'Project architecture, technical presentation, and competitive pitch defense',
  ],
  technologies: [
    'ESP32',
    'PZEM-004T v3.0',
    'Python',
    'Flask',
    'SQLite',
    'HTML5 / CSS3',
    'JavaScript',
    'UART Telemetry',
    'NILM Research',
  ],
  recognition: [
    '1st Place — IEEE Maharashtra Section Entrepreneurship & Innovation Group (EIG) Business Pitch Competition, 2026',
    'Fully functional hardware-software prototype validated under domestic AC loads',
  ],
  href: PERSONAL_INFO.voltvisionUrl,
  liveLabel: 'Explore VoltVision Live Site',
  architecture: [
    'Electrical Load (Domestic AC 230V / 50Hz)',
    'PZEM-004T v3.0 (Optocoupled CT & Voltage Sensing)',
    'ESP32 Microcontroller (UART Serial Ingestion & JSON Packaging)',
    'Flask API & SQLite (Local Logging, Aggregation & Storage)',
    'Analytics & NILM Layer (Consumption Signatures & Anomaly Detection)',
    'User Interface Dashboard (Real-time Readings & Appliance Insights)',
  ],
};

export const OTHER_PROJECTS: ProjectItem[] = [
  {
    id: 'file2base',
    kind: 'file2base',
    title: 'File2Base',
    category: 'STARTUP CONCEPT & EVALUATOR PROTOTYPE',
    badge: 'STARTUP PROTOTYPE IN ACTIVE DEVELOPMENT',
    description: 'An AI-assisted data workflow platform designed to help small businesses transition smoothly from scattered spreadsheets, CSVs, and documents into structured, queryable relational databases.',
    contributions: [
      'Researched pain points of spreadsheet sprawl across emerging small businesses',
      'Engineered an interactive web evaluator prototype demonstrating the file-to-schema path',
      'Designed sample database table proposals with relational keys and suggested types',
      'Structured the user onboarding flow from raw file drop to database export readiness',
    ],
    technologies: [
      'Data Profiling',
      'Relational Schema Design',
      'Web Prototype',
      'File Parsing',
      'AI-Assisted Workflows',
      'TypeScript / React',
    ],
    recognition: [
      'Live interactive prototype deployed and running on Render',
      'Actively iterating on data structure recommendations',
    ],
    href: PERSONAL_INFO.file2baseUrl,
    liveLabel: 'Launch File2Base Demo',
  },
  {
    id: 'smartfarm',
    kind: 'smartfarm',
    title: 'Smart Plant Monitoring & AI Farming',
    category: 'INDEPENDENT HARDWARE & IOT SYSTEM',
    badge: '2ND PLACE STATE LEVEL · BAL VAIGYANIK PRADARSHINI',
    description: 'An independently designed IoT agricultural monitoring prototype that gathers live environmental soil metrics to optimize crop hydration and automate micro-farming interventions.',
    contributions: [
      'Independently wired and calibrated soil moisture, temperature, and atmospheric sensors',
      'Programmed micro-controller routines in Arduino C++ for threshold-based irrigation triggering',
      'Synthesized collected field readings into clear diagnostic feedback for plant care',
      'Defended the working prototype before state-level scientific evaluation panels',
    ],
    technologies: [
      'Arduino Microcontroller',
      'Arduino IDE (C++)',
      'Soil Moisture Sensor',
      'DHT Environmental Sensing',
      'Relay Actuation',
      'Hardware Prototyping',
    ],
    recognition: [
      '2nd Place at State-Level KVS Bal Vaigyanik Pradarshini',
      'Advanced to National-Level Science Exhibition',
      'Featured in local press coverage (Raipur)',
    ],
    liveLabel: 'Hardware Case Study',
  },
  {
    id: 'carbon',
    kind: 'carbon',
    title: 'Household Carbon Emissions Calculator',
    category: 'INDEPENDENT COMPUTATIONAL TOOL',
    badge: 'STATE-LEVEL PARTICIPATION & SCHOOL WINNER',
    description: 'A Python computational tool calculating household carbon footprints by analyzing electricity consumption, natural gas usage, renewable energy offsets, and state-specific grid emissions factors.',
    contributions: [
      'Developed standalone Python computation engine with interactive CLI and structured reporting',
      'Integrated verified Indian regional electricity emissions factors to reflect grid realities',
      'Modeled rooftop solar renewable offsets and configurable carbon pricing scenarios',
      'Formatted output metrics into digestible kilograms of CO₂ equivalent with actionable reduction advice',
    ],
    technologies: [
      'Python 3',
      'Emissions Factor Modeling',
      'Regional Grid Adjustments',
      'Renewable Energy Offsets',
      'Data Visualization',
    ],
    recognition: [
      'School-Level Winner',
      'Selected and presented at State-Level Science Exhibition, 2024',
    ],
    liveLabel: 'Computational Model',
  },
  {
    id: 'doomsday',
    kind: 'doomsday',
    title: 'DOOMSDAY PROTOCOL',
    category: 'MULTI-CLIENT LAN ESCAPE SYSTEM',
    badge: 'COLLEGE LABORATORY DEPLOYMENT',
    description: 'A synchronized multi-terminal puzzle and escape room game engine designed for college lab LANs, coordinating countdown timers, puzzle phases, and station progress across multiple PCs simultaneously.',
    contributions: [
      'Architected centralized Flask server to arbitrate synchronized game phases and timers',
      'Built immersive terminal-styled client interfaces with real-time clue reveals',
      'Implemented admin supervisor dashboard to monitor workstation state, trigger events, and override timers',
      'Resolved multi-PC network latency, state divergence, and station concurrency on laboratory LAN',
    ],
    technologies: [
      'Python & Flask',
      'Multi-Client LAN Sync',
      'HTML5 / CSS / Vanilla JS',
      'State Machine Architecture',
      'Terminal UI Design',
      'Lab Network Debugging',
    ],
    recognition: [
      'Successfully deployed and executed across multiple PCs in college laboratory event',
      'Zero downtime across sequential student game cohorts',
    ],
    liveLabel: 'Network Case Study',
  },
];

export const LEADERSHIP: LeadershipItem[] = [
  {
    role: 'Head of Student Council',
    organization: 'Kendriya Vidyalaya',
    period: 'JUNE 2024 — MARCH 2025',
    highlights: [
      'Elected representative for a student body of approximately 1,000 students',
      'Directed and coordinated an executive council of 40–50 student leaders across committees',
      'Led planning and execution for major institutional milestones including Annual Day and Sports Day',
      'Acted as chief liaison between students, faculty, and administration to resolve campus issues',
      'Organized inter-house academic, cultural, and innovation competitions fostering student participation',
    ],
  },
  {
    role: 'Student Instructor — Atal Tinkering Lab',
    organization: 'Kendriya Vidyalaya',
    period: 'SEPTEMBER 2023 — FEBRUARY 2025',
    highlights: [
      'Delivered practical laboratory workshops for students across Grades 9–12',
      'Taught foundational and intermediate modules in Arduino, sensor interfacing, IoT, and 3D modeling',
      'Designed step-by-step experiment curriculum demystifying electronics and microcontroller programming',
      'Directly mentored student project teams for science competitions; 4 students qualified for state-level contests',
      'Maintained lab equipment, component inventories, and encouraged an open culture of rapid prototyping',
    ],
  },
];

export const ACHIEVEMENTS: MilestoneItem[] = [
  {
    period: '2026',
    title: '1st Place — IEEE Maharashtra Section EIG Business Pitch Competition',
    organization: 'IEEE Maharashtra Section Entrepreneurship & Innovation Group',
    description: 'Awarded first place for VoltVision — pitching the technical architecture, domestic energy conservation value, and NILM hardware-to-cloud prototype before a jury of engineers and entrepreneurs.',
    badge: '1ST PLACE',
  },
  {
    period: 'STATE',
    title: '2nd Place — KVS Bal Vaigyanik Pradarshani (Advanced to Nationals)',
    organization: 'Kendriya Vidyalaya Sangathan Science Exhibition',
    description: 'Recognized at the state level and selected for national representation for the independently developed Smart Plant Monitoring & AI-Based Farming System.',
    badge: 'STATE WINNER',
  },
  {
    period: '2024',
    title: 'School Winner & State Participant — Carbon Emissions Calculator',
    organization: 'Science & Environmental Technology Exhibition',
    description: 'Won school-level honors and presented the regional-factor Python household emissions calculator at the state-level exhibition.',
    badge: 'HONORS',
  },
  {
    period: 'AUTHOR',
    title: 'Published Author — “A Thousand Broken Pieces”',
    organization: 'Independent Publishing (Amazon)',
    description: 'Authored and published an original poetry collection titled “A Thousand Broken Pieces”, exploring themes of introspection, human connection, and artistic expression.',
    badge: 'BOOK',
  },
];

export const SKILL_CATEGORIES = [
  {
    title: 'Hardware & Embedded Systems',
    status: 'Hands-on Prototyping',
    skills: [
      'ESP32 Microcontroller',
      'Arduino & Arduino IDE',
      'PZEM-004T v3.0 Sensor',
      'Environmental & Soil Sensors',
      'UART / Serial Communication',
      'Hardware-Software Integration',
      'Circuit Breadboarding & Wiring',
    ],
  },
  {
    title: 'Frontend & Creative Development',
    status: 'Core Building Experience',
    skills: [
      'HTML5 & Modern CSS',
      'Responsive Architectural Layouts',
      'UI / Component Prototyping',
      'React & TypeScript',
      'Vite Build Tooling',
      'CSS Transforms & Shaders',
      'Accessible Semantics & A11y',
    ],
  },
  {
    title: 'Backend & Server Systems',
    status: 'Practical Project Deployments',
    skills: [
      'Python Programming',
      'Flask Server Setup (Developing)',
      'REST API Integration',
      'SQLite (Developing)',
      'PostgreSQL Integration',
      'LAN Multi-PC Synchronized Networks',
      'Render Cloud Hosting',
    ],
  },
  {
    title: 'AI, Data & Analytics',
    status: 'Foundational & Research Focus',
    skills: [
      'AI/ML Foundations',
      'Data Profiling & Relational Structuring',
      'Time-Series Electrical Telemetry',
      'NILM (Non-Intrusive Load Monitoring) Research',
      'Feature Analysis & Heuristics',
      'Scientific Experimentation',
    ],
  },
  {
    title: 'Tools & Workflow',
    status: 'Daily Workflow',
    skills: [
      'Git & GitHub Version Control',
      'VS Code & Terminal Environments',
      'Arduino CLI & Serial Monitors',
      'Linux / Windows Dual Environments',
      'Render Deployment Pipelines',
    ],
  },
  {
    title: 'Leadership & Collaboration',
    status: 'Proven Track Record',
    skills: [
      'Student Council Governance (1000+ Students)',
      'Technical Mentorship & Teaching (Grades 9–12)',
      'Engineering Presentations & Pitch Defense',
      'Cross-Functional Event Coordination',
      'Iterative Debugging & Problem Solving',
    ],
  },
];
