export const profile = {
  name: "Sairam Nagarajan",
  shortName: "Sairam BN",
  handle: "sairambn",
  role: "Software Engineer",
  headline: "Software Engineer · DSA · Python · Java",
  location: "Chennai, Tamil Nadu, India",
  openTo: "Open to Bangalore · Hyderabad · Remote",
  education: "M.E., College of Engineering Guindy (CEG) '25",
  email: "bnsairam14@gmail.com",
  tagline:
    "Strong focus on data structures, algorithms, and writing production-quality code. Currently preparing for Software Development Engineer roles with a preference for Google.",
  bio: "I'm a software engineer focused on writing clean, efficient code and solving problems at scale. I have a strong foundation in Python and SQL, and I'm actively deepening my expertise in data structures, algorithms, and system design to prepare for Software Development Engineer roles at top companies, including Google.\n\nI care about clarity, correctness, and building things that last.",
  github: "https://github.com/sairambn",
  linkedin: "https://www.linkedin.com/in/sairambn/",
  portfolio: "https://bnsairam.vercel.app",
  leetcode: "https://leetcode.com/u/sairambn/",
  avatar: "/content.png",
};

export const stats = [
  { label: "Daily DSA practice", value: "NeetCode" },
  { label: "Live products shipped", value: "5+" },
  { label: "Core stack", value: "Python · Java · TypeScript" },
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
    title: "Core Skills",
    items: [
      "Data Structures & Algorithms",
      "Python",
      "Java",
      "Problem Solving",
      "Object-Oriented Programming",
    ],
  },
  {
    title: "Tools & Practices",
    items: ["Git", "SQL", "Clean Code", "System Design Basics"],
  },
  {
    title: "Currently Strengthening",
    items: ["Advanced DSA", "System Design", "Backend Development"],
  },
  {
    title: "Also comfortable with",
    items: ["TypeScript", "React", "Python (pandas)", "Excel"],
  },
];

export const skills = skillGroups.flatMap((g) => g.items);

export const principles = [
  {
    title: "Clarity first",
    body: "Code should be readable by the next person who touches it — including future me. Prefer simple solutions that are correct.",
  },
  {
    title: "Correctness over cleverness",
    body: "Edge cases, invariants, and clear contracts matter more than short-term clever tricks.",
  },
  {
    title: "Practice compounds",
    body: "Daily structured DSA practice builds the same muscle as writing production code under constraints.",
  },
  {
    title: "Ship complete",
    body: "From idea to working product. Half-finished work doesn't count.",
  },
];

export const dailyIdeas = [
  {
    id: 1,
    title: "Clarity first",
    body: "Readable, correct code beats clever one-liners. The next person reading it might be you in six months.",
  },
  {
    id: 2,
    title: "Practice compounds",
    body: "One solid problem a day. Consistency on NeetCode builds the same discipline as shipping features.",
  },
  {
    id: 3,
    title: "Model before you code",
    body: "Get the data structures and invariants right first. Most bugs start as modeling mistakes.",
  },
  {
    id: 4,
    title: "Ship complete or don't ship",
    body: "Idea → working product → real users. Half-finished work doesn't count as delivery.",
  },
  {
    id: 5,
    title: "Measure what moved",
    body: "Hours saved, revenue recovered, decisions made. If the number didn't move, the work isn't done.",
  },
  {
    id: 6,
    title: "Build for the long run",
    body: "Clean interfaces, clear ownership, and tests where they matter. Things that last require care up front.",
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
