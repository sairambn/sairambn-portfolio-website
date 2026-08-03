export const profile = {
  name: "BN Sairam",
  handle: "sairambn",
  role: "Data Analyst",
  headline: "Data Analyst · Power BI • SQL • Python",
  location: "Chennai, Tamil Nadu, India",
  openTo: "Open to opportunities in Bangalore / Hyderabad / Remote",
  education: "M.E., College of Engineering Guindy (CEG) '25",
  tagline:
    "I build Power BI dashboards that teams actually use every day — clean, fast, and built on solid SQL and Python.",
  bio: "Data Analyst working across Power BI, SQL and Python. I turn messy operational data into dashboards people open every morning: tight data models, fast queries, and visuals that answer the question without a manual. Alongside analytics, I build full-stack side projects and solve one algorithm problem a day.",
  github: "https://github.com/sairambn",
  linkedin: "https://www.linkedin.com/in/sairambn/",
  avatar: "https://avatars.githubusercontent.com/u/308968341?v=4",
};

export const stats = [
  { label: "End-to-end Power BI builds", value: "5+" },
  { label: "LinkedIn followers", value: "3.1K" },
  { label: "Core stack", value: "Power BI · SQL · Python" },
];

export const skills = [
  "Power BI",
  "DAX",
  "SQL",
  "Python",
  "Pandas",
  "Data Modeling",
  "ETL & Data Cleaning",
  "Excel",
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
  featured?: boolean;
};

export const projects: Project[] = [
  {
    name: "aiml-stats-portal",
    title: "AIML Stats Portal",
    description:
      "Analytics portal surfacing AI/ML department statistics — structured data models, dashboards and readable records for non-technical staff.",
    language: "TypeScript",
    stars: 0,
    url: "https://github.com/sairambn/aiml-stats-portal",
    featured: true,
  },
  {
    name: "master-timetable-generator",
    title: "Master Timetable Generator",
    description:
      "Intelligent scheduling engine for schools and colleges. Constraint-aware class and teacher views, conflict detection, and CSV export behind a clean UI.",
    language: "JavaScript",
    stars: 0,
    url: "https://github.com/sairambn/master-timetable-generator",
    featured: true,
  },
  {
    name: "neetcode-250-daily",
    title: "NeetCode 250 Daily",
    description:
      "One problem a day, every day. A tracked run through the complete NeetCode 250 list with clean, commented Python solutions.",
    language: "Python",
    stars: 5,
    url: "https://github.com/sairambn/neetcode-250-daily",
    featured: true,
  },
  {
    name: "naiyapudai-growth-studio",
    title: "Naiyapudai Growth Studio",
    description:
      "Marketing and growth studio site built with a modern TypeScript stack and a strong visual identity.",
    language: "TypeScript",
    stars: 0,
    url: "https://github.com/sairambn/naiyapudai-growth-studio",
  },
  {
    name: "TotalFitnessStudio",
    title: "Total Fitness Studio",
    description:
      "Fitness studio web experience with class listings, schedules, and a conversion-focused landing flow.",
    language: "TypeScript",
    stars: 0,
    url: "https://github.com/sairambn/TotalFitnessStudio",
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
