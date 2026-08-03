export const profile = {
  name: "Sairam BN",
  handle: "sairambn",
  role: "Software Engineer",
  tagline: "I build clean, useful software — from scheduling engines to AI-driven dashboards.",
  bio: "Engineer focused on full-stack product work and applied AI/ML. I like problems where a good interface hides a hard algorithm: timetable scheduling, analytics portals, growth tooling. Currently solving one NeetCode problem a day and shipping side projects that people actually use.",
  github: "https://github.com/sairambn",
  avatar: "https://avatars.githubusercontent.com/u/308968341?v=4",
};

export const stats = [
  { label: "Public repos", value: "6" },
  { label: "Daily DSA streak", value: "250" },
  { label: "Core stacks", value: "TS · Py · JS" },
];

export const skills = [
  "TypeScript",
  "React",
  "Python",
  "JavaScript",
  "Node.js",
  "Tailwind CSS",
  "Data Structures & Algorithms",
  "AI / ML",
  "PostgreSQL",
  "Git & CI",
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
    name: "aiml-stats-portal",
    title: "AIML Stats Portal",
    description:
      "A TypeScript portal for surfacing AI/ML department statistics — dashboards, records, and readable data views.",
    language: "TypeScript",
    stars: 0,
    url: "https://github.com/sairambn/aiml-stats-portal",
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
