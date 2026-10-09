export const site = {
  name: 'Tania Ortiz',
  role: 'Security Engineer',
  tagline: 'The mindset of an analyst, the abilities of an engineer.',
  email: 'taniaiortiz@protonmail.com',
  location: 'San Antonio, TX',
  resumeUrl: '/Tania-Ortiz-Resume.pdf', // drop the PDF in /public
  socials: {
    github: 'https://github.com/by-tayo',
    linkedin: 'https://www.linkedin.com/in/tania--ortiz/',
    medium: 'https://medium.com/@bytayo',
    substack: 'https://tayeotan.substack.com/',
    mintlify: 'https://bytayo.mintlify.site/introduction',
    layerd: 'https://lay-erd.vercel.app',
  },
} as const

/** Original music — files live in /public/music. */
export const tracks = [
  { title: 'Stargaze', src: '/music/stargaze.mp3' },
  { title: 'Clear My Mistakes', src: '/music/clear-my-mistakes.mp3' },
] as const

/** Featured projects / works. */
export type Project = {
  title: string
  summary: string
  stack: string[]
  links: { label: string; href: string }[]
}
export const projects: Project[] = [
  {
    title: 'System Information Exporter',
    summary:
      'Host-level metrics exporter (FastAPI + Prometheus client) exposing CPU, memory, disk, network, process, and GPU stats — scrape-ready for Prometheus/Grafana, with Alertmanager rules and an IsolationForest anomaly detector. Runs per-device across a Tailscale VPN.',
    stack: ['FastAPI', 'Prometheus', 'Grafana', 'psutil', 'scikit-learn', 'Docker', 'Tailscale'],
    links: [{ label: 'GitHub', href: 'https://github.com/by-tayo/sys-exp' }],
  },
  {
    title: 'Docker Exporter',
    summary:
      "Prometheus exporter for Docker image / container / volume / build-cache resource usage. Pairs with the System Information Exporter's Prometheus + Grafana stack.",
    stack: ['Python', 'Prometheus', 'Docker', 'Grafana'],
    links: [{ label: 'GitHub', href: 'https://github.com/by-tayo/docker-exp' }],
  },
  {
    title: 'AI-Powered Phishing Detector',
    summary:
      'Full-stack phishing detection for URLs and emails: TF-IDF + Logistic Regression / Random Forest / XGBoost and a fine-tuned DistilBERT transformer, plus email header/content heuristics and OpenPhish live lookups. FastAPI API, Plotly Dash UI, AWS infrastructure via Terraform.',
    stack: ['Python', 'scikit-learn', 'XGBoost', 'DistilBERT', 'FastAPI', 'Plotly Dash', 'Terraform', 'AWS'],
    links: [{ label: 'GitHub', href: 'https://github.com/by-tayo/ai-phishing-detector' }],
  },
  {
    title: 'CloudHUB',
    summary:
      'Self-hosted private productivity workspace powered by Nextcloud on AWS EC2, reachable only over a Tailscale VPN with zero inbound ports. Bulk files live on a home TrueNAS SCALE server (ZFS, running as a Hyper-V VM) whose SMB share is mounted into Nextcloud over the same tailnet, so no ports are opened on the home network. The server is rebuildable from Terraform, a Nextcloud Assistant backed by a local Ollama model adds private AI chat and summaries, and a Python Discord bot handles file uploads, document summaries, status checks, and storage alerts.',
    stack: ['Nextcloud', 'AWS EC2', 'Tailscale', 'Docker', 'TrueNAS SCALE', 'ZFS', 'Terraform', 'Ollama', 'Python', 'Discord'],
    links: [
      { label: 'GitHub', href: 'https://github.com/by-tayo/CloudHUB' },
      { label: 'Build report', href: 'https://github.com/by-tayo/CloudHUB/blob/main/report/CloudHUB-Build-Report.pdf' },
    ],
  },
  {
    title: 'Azure SOC HomeLab',
    summary:
      'SIEM simulation on Microsoft Azure — a deliberately exposed honeypot VM streaming attack telemetry into a cloud SIEM, with KQL detections and geo-mapped intrusion attempts.',
    stack: ['Microsoft Azure', 'Microsoft Sentinel', 'Log Analytics', 'KQL'],
    links: [{ label: 'GitHub', href: 'https://github.com/by-tayo/azure-soclab' }],
  },
  {
    title: 'AD HomeLab',
    summary:
      'Active Directory home lab: a Windows Server 2022 domain controller running AD DS, DNS, DHCP, and RAS/NAT, a Windows 11 domain client, and 1,000+ users provisioned via PowerShell — a base for corporate-network security simulation.',
    stack: ['Windows Server 2022', 'Active Directory', 'PowerShell', 'VMware Workstation'],
    links: [{ label: 'GitHub', href: 'https://github.com/by-tayo/ad-homelab' }],
  },
  {
    title: 'Centralized Logging & Monitoring System',
    summary:
      'End-to-end containerized logging pipeline — Filebeat → Kafka → Logstash → Elasticsearch → Kibana — with Nagios health monitoring, an Elasticsearch Watcher for error-rate alerting, importable Kibana dashboards, and a CI smoke test that stands the whole stack up and asserts a parsed log document.',
    stack: ['Elasticsearch', 'Logstash', 'Kibana', 'Filebeat', 'Kafka', 'Nagios', 'Docker Compose', 'GitHub Actions'],
    links: [{ label: 'GitHub', href: 'https://github.com/by-tayo/elk_stack' }],
  },
]

/** Events — conferences, hackathons, etc. Click opens a detail modal. */
export type EventItem = {
  name: string
  org: string
  date: string
  location?: string
  description: string
  highlights: string[]
  results: string[]
  images?: string[] // files in /public/events
}
export const events: EventItem[] = [
  {
    name: 'SAS Hackathon 2026',
    org: 'SAS',
    date: 'Oct 2026',
    description:
      "Back for another round of SAS's global hackathon — competing in the 2026 edition, which kicked off in October 2026.",
    highlights: ['In progress — results to come'],
    results: [],
  },
  {
    name: 'Rowdy CyberCon',
    org: 'UTSA',
    date: 'May 2026',
    location: 'San Antonio, TX',
    description:
      "UTSA's cybersecurity conference and full-day team competition, bringing together students from across the region.",
    highlights: [
      'Full-day competition, played as a team',
    ],
    results: [
      'Placed 10th as a team',
      'Roughly 300 total participants',
    ],
  },
  {
    name: 'NCAE Cyber Games',
    org: 'National Centers of Academic Excellence in Cybersecurity',
    date: 'Spring 2025',
    location: 'Southwest 1',
    description:
      'A national collegiate competition built specifically for defensive play — teams keep live services running and hardened against an active red team while working CTF challenges on the side.',
    highlights: [
      'Blue-team format: defend and harden, rather than attack',
      'Competed in the Southwest 1 region with a team of six',
      'Top service was SSH logins, held at 73% uptime under active attack',
    ],
    results: [
      'Placed 5th in the Southwest 1 region',
      'Final score 3,318',
      'Service points 1,983 · CTF points 1,275 · bonus 60',
      'Captured 20 of 30 flags',
    ],
  },
  {
    name: 'SAS Innovate',
    org: 'SAS',
    date: 'Apr 2026',
    location: 'Grapevine, TX',
    description:
      "SAS's annual analytics and AI conference at the Gaylord Texan in Grapevine, Texas — keynotes, hands-on labs, and community events across data, DevOps, and risk.",
    highlights: [
      'Hands-on workshops in anti-money-laundering, DevOps, and risk analytics',
      'Competed in a 3-hour on-site hackathon',
      'Present for a new Guinness World Record — most people performing a double high five simultaneously',
    ],
    results: [],
    images: [
      'events/sas-innovate-1.jpg',
      'events/sas-innovate-2.jpg',
      'events/sas-innovate-3.jpg',
      'events/sas-innovate-4.jpg',
    ],
  },
  {
    name: 'National Cyber League',
    org: 'NCL · Individual Game',
    date: 'Fall 2025',
    location: 'Virtual',
    description:
      'A national, performance-based cybersecurity competition for students, with challenges across areas such as cryptography, forensics, log analysis, network traffic analysis, password cracking, OSINT, and web exploitation.',
    highlights: [
      'Competed in NCL for 3+ years',
    ],
    results: [
      'Top 12% nationally',
      'Ranked 928 of 7,876 competitors',
      'Scored 1,580 of 3,000 points',
      'Earned the Platinum badge',
    ],
  },
  {
    name: 'SAS Hackathon 2025',
    org: 'SAS',
    date: 'Sept–Oct 2025',
    location: 'Virtual',
    description:
      "SAS's month-long global hackathon (September–October 2025) — teams build an analytics or AI solution to a real-world problem on SAS Viya.",
    highlights: [
      'Solved a business case study analyzing donation-driven (nonprofit) organizations',
      'Worked through the full build on SAS Viya over the month-long competition window',
    ],
    results: ['Ranked 24 / 157 participants', 'Earned the SAS Hackathon 2025 Participant badge'],
    images: ['events/sas-hackathon-badge.png'],
  },
]

/** Certifications. */
export const certifications = [
  { short: 'CYSA+', name: 'CompTIA CySA+', issuer: 'CompTIA', date: 'Mar 2025' },
  { short: 'SEC+', name: 'CompTIA Security+', issuer: 'CompTIA', date: 'Nov 2024' },
] as const

/** Work experience — newest first. `short` is the badge label. Empty `end` = incoming. */
export const experience = [
  { short: 'TXDOT', company: 'Texas Department of Transportation', title: 'Cybersecurity Analyst Intern', start: 'Sept 2026', end: 'Present' },
  { short: 'PYPL', company: 'PayPal', title: 'Cybersecurity Engineer Intern', start: 'Jun 2026', end: 'Sept 2026' },
  { short: 'CPSE', company: 'CPS Energy', title: 'IT Technician Intern', start: 'Jan 2026', end: 'May 2026' },
  { short: 'HEB', company: 'H-E-B, Inc.', title: 'Network Engineering Intern', start: 'May 2025', end: 'Aug 2025' },
  { short: 'IBC', company: 'IBC Bank', title: 'AML Analyst', start: 'Mar 2024', end: 'Aug 2024' },
  { short: 'UT', company: 'University of Texas at Austin', title: 'Geospatial Data Analyst Intern', start: 'Jun 2023', end: 'Aug 2023' },
  { short: 'LC', company: 'Laredo College', title: 'Information Technology Help Desk', start: 'Jan 2023', end: 'May 2023' },
  { short: 'TAMUK', company: 'Texas A&M University–Kingsville', title: 'Aerospace Engineer Intern', start: 'May 2022', end: 'Aug 2022' },
  { short: 'TAMUK', company: 'Texas A&M University–Kingsville', title: 'Data Analyst Intern', start: 'May 2022', end: 'Aug 2022' },
  { short: 'LC', company: 'Laredo College', title: 'LEAPS Student Undergraduate Researcher', start: 'Jan 2021', end: 'May 2022' },
] as const

/** Leadership & student organizations — newest first. `short` is the badge label. */
export type LeadershipRole = {
  short: string
  org: string
  title: string
  start: string
  end: string
  points: string[]
}
export const leadership: LeadershipRole[] = [
  {
    short: 'UTSA',
    org: 'UTSA Cyber Jedis',
    title: 'Marketing Officer',
    start: 'Aug 2025',
    end: 'May 2026',
    points: [
      'Ran the club’s presence on Instagram, LinkedIn, YouTube, and Twitch — setting up channels, photographing events, and creating content to raise awareness (579 Instagram followers).',
      'Posted announcements for upcoming events and collaborations to the club’s 1,078-member Discord server, and shared the club’s activities and research groups with students.',
      'Collaborated with other departments and student organizations to increase the club’s visibility.',
      'Led 5 workshops for club members.',
    ],
  },
  {
    short: 'LC',
    org: 'Laredo College Ethical Hackers',
    title: 'Marketer & Treasurer',
    start: 'Aug 2021',
    end: 'May 2023',
    points: [
      'Led 5 hands-on workshops: Wi-Fi Pineapple, Flipper Zero, Raspberry Pi, Wireshark, and software development (Python, Git, and full-stack fundamentals).',
      'Showed members how to build a XAMPP server for web development and web security practice.',
      'Deployed images to 30+ college workstations over the network in preparation for incoming students.',
      'Conducted meetings and coordinated study sessions with club members to keep engagement up.',
      'Directed the club’s promotional video, increasing club visibility, and managed the LC Ethical Hackers Instagram (59 followers).',
      'Provided library books to students and supported the club’s weekly podcast and Cybersecurity Awareness Month activities.',
    ],
  },
]

/** Research groups — newest first. */
export type ResearchGroup = {
  name: string
  org: string
  role: string
  start: string
  end: string
  points: string[]
}
export const researchGroups: ResearchGroup[] = [
  {
    name: 'Cyber Warfare Research Group',
    org: 'UTSA Cyber Jedis',
    role: 'Member',
    start: 'Oct 2025',
    end: 'Present',
    points: [
      'Study nation-state advanced persistent threat (APT) tactics and the campaigns they run.',
      'Presented on APT groups to the research group.',
    ],
  },
  {
    name: 'Threat Hunting and Intelligence Research Group',
    org: 'UTSA Cyber Jedis',
    role: 'Member',
    start: 'Oct 2025',
    end: 'Present',
    points: [
      'Work through adversary tactics, techniques, and procedures (TTPs) and indicators of compromise (IOCs), mapped against MITRE ATT&CK.',
      'Run TryHackMe and Hack The Box labs with the group to practice hunting techniques hands-on.',
    ],
  },
]

/** Undergraduate research — newest first. */
export type ResearchItem = {
  title: string
  program: string
  date: string
  format: string
  summary: string
  method: string
  findings: string[]
  tags: string[]
}
export const research: ResearchItem[] = [
  {
    title: 'COVID-19 and Its Effects on Online Activity',
    program: 'Undergraduate Research Opportunities (URO), LEAPS · Laredo College',
    date: 'Fall 2021',
    format: 'Research paper & poster',
    summary:
      'Examined how the pandemic changed online activity, how aware the public was of the rise in cyber threats, and how the shift online affected markets — using Netflix as a case study.',
    method:
      '17-question SurveyMonkey survey (33 anonymous adult respondents), built from FBI IC3, Kaspersky, IBM X-Force, and NSA data; analyzed in Excel, including a one-way ANOVA.',
    findings: [
      'Respondents averaged 6.61 hours online per day; 63% increased their online shopping.',
      '82% had passwords that weren’t easily cracked, yet about 58% did not know how to protect themselves from cyberattacks.',
      'About 70% said Netflix gave them an escape during the pandemic, and most were aware of its revenue and profit growth.',
    ],
    tags: ['Survey research', 'Cybercrime', 'Security awareness', 'Stock market', 'Excel', 'ANOVA'],
  },
  {
    title: 'Effective Ways to Provide Password Security from Attacks',
    program: 'Undergraduate Research Opportunities (URO), LEAPS · Laredo College',
    date: 'Spring 2021',
    format: 'Research paper & poster',
    summary:
      'Explored how password managers, password assistance tools, and memory games can help people keep strong passwords without relying on memory or written notes.',
    method:
      'Online survey of 11 respondents covering password habits, perceived strength, daily password use, and awareness of protection techniques.',
    findings: [
      '73% said they change their passwords now and then; self-rated strength split evenly between “moderate” and “secure” (45.5% each).',
      'Many respondents were unaware of password managers, password assistance, and memory-game techniques that reduce the burden of strong passwords.',
    ],
    tags: ['Password security', 'Authentication', 'Password managers', 'Survey research'],
  },
]

/**
 * Tools marquee — two rows that scroll in opposite directions.
 * Keep each row roughly the same length so the loop reads evenly.
 */
export const toolRows = [
  [
    'Microsoft Sentinel',
    'Microsoft Defender XDR',
    'Defender for Endpoint',
    'Advanced Hunting',
    'Splunk',
    'KQL',
    'Abnormal Security',
    'Cisco Secure Endpoint',
    'Cisco Secure Malware Analytics',
    'VirusTotal',
    'Dell Absolute',
    'Nessus',
    'ServiceNow',
    'Microsoft Azure',
    'AWS',
  ],
  [
    'Python',
    'PowerShell',
    'Java',
    'JavaScript',
    'SQL',
    'Git',
    'GitLab',
    'Azure DevOps',
    'Docker',
    'Kubernetes',
    'Terraform',
    'Linux',
    'EJBCA',
    'OpenSSL',
    'Prometheus',
    'Grafana',
    'Elasticsearch',
    'Apache Kafka',
    'FastAPI',
  ],
] as const