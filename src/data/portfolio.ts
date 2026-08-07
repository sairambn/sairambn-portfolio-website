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
  bio: "I'm a software engineer focused on writing clean, efficient code and solving problems at scale.\n\nI have a strong foundation in Python and SQL, and I'm actively deepening my expertise in data structures, algorithms, and system design to prepare for Software Development Engineer roles at top companies, including Google.\n\nI care about clarity, correctness, and building things that last.",
  github: "https://github.com/sairambn",
  linkedin: "https://www.linkedin.com/in/sairambn/",
  portfolio: "https://bnsairam.vercel.app",
  leetcode: "https://leetcode.com/u/sairambn/",
  avatar: "/content.png",
};

export const stats = [
  { label: "Daily DSA", value: "NeetCode 250" },
  { label: "Languages", value: "Python · Java · TS" },
  { label: "Systems shipped", value: "6+ live" },
];

export const impact = [
  {
    title: "Live event platform",
    result: "College hackathon running today",
    detail:
      "Full registration, problem assignment by team size, and solution submission flow for a department AI Problem Solve-a-Thon. Live and used by teams in real time.",
  },
  {
    title: "Constraint scheduling engine",
    result: "Zero-conflict timetables",
    detail:
      "Browser-side constraint solver: models teachers, classes, and rooms; generates conflict-free school & college timetables with class/teacher views and CSV export.",
  },
  {
    title: "Result analysis pipeline",
    result: "Exam-cell ready in one pass",
    detail:
      "TypeScript system: mark-sheet upload → subject stats, toppers, arrear groups → professional FRONT + MARK Excel export for exam cells.",
  },
  {
    title: "Production SSR products",
    result: "2 live client businesses",
    detail:
      "Full TypeScript/React SSR sites with Schema.org SEO, Maps alignment, and conversion CTAs — shipped and maintained in production.",
  },
  {
    title: "Structured interview practice",
    result: "Daily NeetCode 250",
    detail:
      "One problem a day in Python, Java, and C++. Same discipline as shipping under constraints — clarity, edge cases, and consistent progress.",
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
    items: ["Git", "SQL", "Clean Code", "System Design Basics", "TypeScript"],
  },
  {
    title: "Currently Strengthening",
    items: ["Advanced DSA", "System Design", "Backend Development"],
  },
  {
    title: "Also ship with",
    items: ["React", "Python (pandas)", "Vite", "Vercel"],
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
    body: "From idea to working product used by real people. Half-finished work doesn't count.",
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
    name: "AI-Competition",
    title: "AI Problem Solve-a-Thon",
    description:
      "Live event platform for a department hackathon. Team registration, problem assignment by size, solution collection via GitHub PRs, and organizer tools. Used on the day of the event.",
    language: "TypeScript",
    stars: 0,
    url: "https://github.com/sairambn/AI-Competition",
    live: "https://ai-thon-one.vercel.app",
    featured: true,
    tags: ["TypeScript", "Event", "Live"],
    outcome: "Running live event",
  },
  {
    name: "master-timetable-generator",
    title: "Master Timetable Generator",
    description:
      "Constraint-based scheduling engine in the browser. Models teacher, class, and room constraints to produce conflict-free school & college timetables with class/teacher views and CSV export.",
    language: "JavaScript",
    stars: 0,
    url: "https://github.com/sairambn/master-timetable-generator",
    live: "https://master-timetable-generator.vercel.app",
    featured: true,
    tags: ["Algorithms", "Constraints", "Scheduling"],
    outcome: "Zero-conflict schedules",
  },
  {
    name: "aiml-stats-portal",
    title: "Result Analysis Portal",
    description:
      "End-to-end TypeScript system for exam cells: upload mark sheets → compute subject stats, toppers, arrear groups → export professional FRONT + MARK Excel reports in one pass.",
    language: "TypeScript",
    stars: 0,
    url: "https://github.com/sairambn/aiml-stats-portal",
    live: "https://aiml-stats-portal.vercel.app",
    featured: true,
    tags: ["TypeScript", "Pipelines", "Excel"],
    outcome: "Exam-cell ready in one pass",
  },
  {
    name: "neetcode-250-daily",
    title: "NeetCode 250 Daily",
    description:
      "One problem a day until the full NeetCode 250 list is done. Structured solutions in Python, Java, and C++ with consistent practice discipline.",
    language: "Python",
    stars: 5,
    url: "https://github.com/sairambn/neetcode-250-daily",
    featured: true,
    tags: ["DSA", "Python", "Java"],
    outcome: "Daily structured practice",
  },
  {
    name: "TotalFitnessStudio",
    title: "Total Fitness Studio",
    description:
      "Production client website for a 4.9★ gym. SSR architecture, Schema.org local SEO, Google Maps alignment, and high-intent tel/WhatsApp CTAs — live and serving customers.",
    language: "TypeScript",
    stars: 0,
    url: "https://github.com/sairambn/TotalFitnessStudio",
    live: "https://total-fitness-studio-livid.vercel.app",
    tags: ["SSR", "TypeScript", "Production"],
    outcome: "Production client site",
  },
  {
    name: "naiyapudai-growth-studio",
    title: "Naiyapudai Growth Studio",
    description:
      "Full web product for a growth studio: site architecture, local SEO systems, Maps ranking, and conversion flows for Tamil Nadu brands.",
    language: "TypeScript",
    stars: 0,
    url: "https://github.com/sairambn/naiyapudai-growth-studio",
    live: "https://naiyapudai.vercel.app",
    tags: ["TypeScript", "SSR", "SEO"],
    outcome: "Live growth product",
  },
];
