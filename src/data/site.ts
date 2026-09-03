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
      'Self-hosted private productivity workspace powered by Nextcloud, deployed on AWS EC2 and secured with a Tailscale VPN.',
    stack: ['Nextcloud', 'AWS EC2', 'Tailscale', 'Docker'],
    links: [{ label: 'GitHub', href: 'https://github.com/by-tayo/CloudHUB' }],
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
    name: 'SAS Hackathon',
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
