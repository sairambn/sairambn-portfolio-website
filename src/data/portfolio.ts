export const profile = {
  name: "Sairam Nagarajan",
  shortName: "Sairam BN",
  handle: "sairambn",
  role: "Data Analyst",
  headline: "Data Analyst · Power BI · SQL · Python",
  location: "Chennai, Tamil Nadu, India",
  openTo: "Open to Bangalore · Hyderabad · Remote",
  education: "M.E., College of Engineering Guindy (CEG) '25",
  email: "bnsairam14@gmail.com",
  tagline:
    "I turn messy operational data into Power BI dashboards teams trust and open every morning — solid SQL, clean models, and clear decisions.",
  bio: "Data Analyst with strong foundations in SQL, Power BI and Python. I own the full loop: understand the business question, model the data, build reliable measures, and ship dashboards people actually use. Looking for full-time Data Analyst / BI Analyst roles on high-bar product and analytics teams.",
  github: "https://github.com/sairambn",
  linkedin: "https://www.linkedin.com/in/sairambn/",
  portfolio: "https://bnsairam.vercel.app",
  leetcode: "https://leetcode.com/u/sairambn/",
  avatar: "/content.png",
};

export const stats = [
  { label: "End-to-end Power BI builds", value: "5+" },
  { label: "Live client sites shipped", value: "2" },
  { label: "Core stack", value: "SQL · Power BI · Python" },
];

export const impact = [
  {
    title: "Hospitality Revenue",
    result: "Up to 20% lost revenue recovered",
    detail: "Surfaced pricing and city gaps leadership could act on the next month.",
  },
  {
    title: "Supply Chain (FMCG)",
    result: "~20% expansion savings targeted",
    detail: "OTIF% and route efficiency insights now drive weekly decisions.",
  },
  {
    title: "Sales Analytics",
    result: "+7% projected revenue lift",
    detail: "Category trends and forecasting used for next-quarter planning.",
  },
  {
    title: "HR Analytics",
    result: "3–4 hours saved every day",
    detail: "Automated attendance and performance tracking for the HR team.",
  },
  {
    title: "T20 Cricket Analytics",
    result: "90% projected win probability",
    detail: "Scraped → cleaned (Python) → Power BI → Dream XI selections.",
  },
];

export const skillGroups = [
  {
    title: "Data & Analytics",
    items: ["Advanced SQL", "Data Modeling", "ETL & Data Cleaning", "Power Query (M)", "Excel"],
  },
  {
    title: "BI & Visualization",
    items: ["Power BI (Desktop + Service)", "DAX", "Tableau", "KPI Design", "Dashboard Storytelling"],
  },
  {
    title: "Programming",
    items: ["Python (pandas)", "TypeScript", "React", "Data Structures & Algorithms"],
  },
  {
    title: "How I work",
    items: ["End-to-end ownership", "Stakeholder communication", "Adoption-focused delivery", "Daily problem solving"],
  },
];

export const skills = skillGroups.flatMap((g) => g.items);

export const principles = [
  {
    title: "Start with the decision",
    body: "What should this dashboard help someone do this week? Everything else follows from that.",
  },
  {
    title: "Build for trust",
    body: "Clean models, clear measures, no black-box numbers. People only use what they believe.",
  },
  {
    title: "Measure the outcome",
    body: "Hours saved, revenue recovered, decisions made. If it doesn't move a number, it doesn't ship.",
  },
  {
    title: "Ship complete",
    body: "Raw data → published report → real user adoption. Half-finished work doesn't count.",
  },
];

export const dailyIdeas = [
  {
    id: 1,
    title: "Decision-first dashboards",
    body: "Every visual should answer one decision someone has to make this week. If it doesn't, cut it.",
  },
  {
    id: 2,
    title: "Trust is the real KPI",
    body: "Teams only open reports they believe. Clean models and transparent measures beat fancy charts.",
  },
  {
    id: 3,
    title: "SQL before visuals",
    body: "Get the grain and joins right first. Most dashboard bugs are data model bugs in disguise.",
  },
  {
    id: 4,
    title: "Ship complete or don't ship",
    body: "Raw data → published report → real adoption. Half-finished work doesn't count as delivery.",
  },
  {
    id: 5,
    title: "Measure what moved",
    body: "Hours saved, revenue recovered, decisions made. If the number didn't move, the work isn't done.",
  },
  {
    id: 6,
    title: "One problem a day",
    body: "Structured practice compounds. NeetCode daily builds the same muscle as clean analytical thinking.",
  },
];

export type Project = {
  name: string;
  title: string;
  description: string;
  language: string;
  stars: number;
  url: string;
  live?: string;
  featured?: boolean;
  tags?: string[];
  outcome?: string;
};

export const projects: Project[] = [
  {
    name: "aiml-stats-portal",
    title: "Result Analysis Portal",
    description:
      "Exam-cell ready result analysis. Upload mark sheets → diagrams, subject-wise stats, toppers, arrear groups → professional FRONT + MARK Excel export.",
    language: "TypeScript",
    stars: 0,
    url: "https://github.com/sairambn/aiml-stats-portal",
    live: "https://aiml-stats-portal.vercel.app",
    featured: true,
    tags: ["Analytics", "Excel", "Education"],
    outcome: "Exam-cell ready in one pass",
  },
  {
    name: "master-timetable-generator",
    title: "Master Timetable Generator",
    description:
      "Conflict-free school & college timetable builder. Smart scheduling, class/teacher views, CSV export — runs fully in the browser.",
    language: "JavaScript",
    stars: 0,
    url: "https://github.com/sairambn/master-timetable-generator",
    live: "https://master-timetable-generator.vercel.app",
    featured: true,
    tags: ["Scheduling", "Education", "CSV"],
    outcome: "Zero-conflict schedules",
  },
  {
    name: "TotalFitnessStudio",
    title: "Total Fitness Studio",
    description:
      "Live client website for a 4.9★ Chromepet gym. SSR, Schema.org local SEO, Google Maps alignment, tel/WhatsApp CTAs.",
    language: "TypeScript",
    stars: 0,
    url: "https://github.com/sairambn/TotalFitnessStudio",
    live: "https://total-fitness-studio-livid.vercel.app",
    featured: true,
    tags: ["Client", "SSR", "Local SEO"],
    outcome: "Production client site",
  },
  {
    name: "naiyapudai-growth-studio",
    title: "Naiyapudai Growth Studio",
    description:
      "Digital growth studio for Tamil Nadu. Web, local SEO, Google Maps ranking and performance marketing for local brands.",
    language: "TypeScript",
    stars: 0,
    url: "https://github.com/sairambn/naiyapudai-growth-studio",
    live: "https://naiyapudai.vercel.app",
    tags: ["Growth", "Local SEO", "Marketing"],
    outcome: "Local brand growth system",
  },
  {
    name: "neetcode-250-daily",
    title: "NeetCode 250 Daily",
    description:
      "One problem a day until the full NeetCode 250 list is done. Structured practice with Python, Java and C++ solutions.",
    language: "Python",
    stars: 5,
    url: "https://github.com/sairambn/neetcode-250-daily",
    tags: ["DSA", "Python", "Daily"],
    outcome: "Daily structured practice",
  },
  {
    name: "sairambn",
    title: "Profile README",
    description: "The GitHub profile README — a living index of what I'm building and learning.",
    language: "Markdown",
    stars: 0,
    url: "https://github.com/sairambn/sairambn",
    tags: ["Profile", "Docs"],
  },
];
