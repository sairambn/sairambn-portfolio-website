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
    "I build Power BI dashboards that teams actually open every morning — clean models, fast queries, and visuals that answer the question without a manual.",
  bio: "Data Analyst focused on Power BI, SQL and Python. I turn messy operational data into dashboards people trust: tight data models, reliable measures, and clear storytelling. Alongside analytics I ship full-stack side projects and solve one algorithm problem a day (NeetCode 250). Currently looking for full-time Data Analyst / BI Analyst roles, with strong interest in high-bar product teams.",
  github: "https://github.com/sairambn",
  linkedin: "https://www.linkedin.com/in/sairambn/",
  portfolio: "https://sairambn.vercel.app",
  leetcode: "https://leetcode.com/u/sairambn/",
  avatar: "https://avatars.githubusercontent.com/u/308968341?v=4",
};

export const stats = [
  { label: "End-to-end Power BI builds", value: "5+" },
  { label: "Live client sites shipped", value: "2" },
  { label: "Core stack", value: "Power BI · SQL · Python" },
];

export const impact = [
  {
    title: "Hospitality Revenue Dashboard",
    result: "Recovered up to 20% lost revenue the next month",
    detail: "Identified low-performing cities and pricing gaps that leadership could act on immediately.",
  },
  {
    title: "Supply Chain Analytics (FMCG)",
    result: "~20% savings targeted on expansion costs",
    detail: "OTIF% and route efficiency insights now drive weekly decisions.",
  },
  {
    title: "Sales Analytics Dashboard",
    result: "+7% projected revenue lift",
    detail: "Category-wise trends and forecasting used for next-quarter planning.",
  },
  {
    title: "HR Analytics Dashboard",
    result: "3–4 hours saved every day",
    detail: "Automated attendance and performance tracking for the HR team.",
  },
  {
    title: "T20 Cricket World Cup Analytics",
    result: "90% projected win probability Dream XI",
    detail: "Scraped ESPNcricinfo → cleaned in Python → interactive Power BI report.",
  },
];

export const skills = [
  "Power BI",
  "DAX",
  "Power Query",
  "SQL",
  "Python",
  "Pandas",
  "Data Modeling",
  "ETL & Data Cleaning",
  "Excel",
  "Tableau",
  "Data Visualization",
  "TypeScript",
  "React",
  "Data Structures & Algorithms",
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
  },
  {
    name: "neetcode-250-daily",
    title: "NeetCode 250 Daily",
    description:
      "One problem a day until the full NeetCode 250 list is done. Structured practice with Python, Java and C++ solutions.",
    language: "Python",
    stars: 5,
    url: "https://github.com/sairambn/neetcode-250-daily",
  },
  {
    name: "sairambn",
    title: "Profile README",
    description: "The GitHub profile README — a living index of what I'm building and learning.",
    language: "Markdown",
    stars: 0,
    url: "https://github.com/sairambn/sairambn",
  },
];
