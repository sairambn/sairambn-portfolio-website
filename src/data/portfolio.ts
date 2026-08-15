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
    "I write code that works, practice DSA every day, and ship systems people actually use. Preparing for SDE roles.",
  bio: "Software engineer from CEG Chennai.\n\nI work in Python and Java, practice DSA daily, and build full systems when I need them: scheduling engines, exam pipelines, event platforms, client sites.\n\nLooking for an SDE role where the work is real and the bar is high.",
  github: "https://github.com/sairambn",
  linkedin: "https://www.linkedin.com/in/sairambn/",
  portfolio: "https://bnsairam.vercel.app",
  leetcode: "https://leetcode.com/u/sairambn/",
};

export const stats = [
  { label: "Daily DSA", value: "NeetCode 250" },
  { label: "Languages", value: "Python · Java · TS" },
  { label: "Systems shipped", value: "6+ live" },
];

export const impact = [
  {
    title: "College hackathon platform",
    result: "Used on event day",
    detail:
      "Registration, team-size problem assignment, and solution collection for a department AI Problem Solve-a-Thon. Ran live during the event.",
  },
  {
    title: "Timetable generator",
    result: "No conflicts",
    detail:
      "Browser constraint solver for teachers, classes, and rooms. Outputs class and teacher views plus CSV export.",
  },
  {
    title: "Result analysis tool",
    result: "One-pass Excel for exam cells",
    detail:
      "Upload mark sheets, get subject stats, toppers, arrear groups, and FRONT + MARK Excel exports.",
  },
  {
    title: "Client websites",
    result: "2 live businesses",
    detail:
      "SSR sites with local SEO, Maps setup, and call/WhatsApp CTAs. Still running in production.",
  },
  {
    title: "NeetCode 250",
    result: "One problem a day",
    detail:
      "Python, Java, and C++ solutions. Same habit as shipping: show up, handle edge cases, move on.",
  },
];

export const skillGroups = [
  {
    title: "Core",
    items: ["Data Structures & Algorithms", "Python", "Java", "Problem Solving", "OOP"],
  },
  {
    title: "Tools",
    items: ["Git", "SQL", "TypeScript", "System Design basics"],
  },
  {
    title: "Working on",
    items: ["Advanced DSA", "System Design", "Backend"],
  },
  {
    title: "Also use",
    items: ["React", "Python (pandas)", "Vite", "Vercel"],
  },
];

export const principles = [
  {
    title: "Readable code",
    body: "Write it so the next person (or future me) can understand it without a walkthrough.",
  },
  {
    title: "Correct first",
    body: "Handle the edge cases. Clever code that breaks under load is not clever.",
  },
  {
    title: "Daily practice",
    body: "DSA every day. Same discipline as shipping: consistent work, no drama.",
  },
  {
    title: "Finish the job",
    body: "If it is not used by real people, it is not done.",
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
      "Event platform for a department hackathon. Team registration, problem assignment by size, solution collection via GitHub PRs. Used on the day of the event.",
    language: "TypeScript",
    stars: 0,
    url: "https://github.com/sairambn/AI-Competition",
    live: "https://ai-thon-one.vercel.app",
    featured: true,
    tags: ["TypeScript", "Event", "Live"],
    outcome: "Ran live",
  },
  {
    name: "master-timetable-generator",
    title: "Master Timetable Generator",
    description:
      "Constraint solver in the browser. Models teachers, classes, and rooms. Outputs conflict-free timetables with class/teacher views and CSV export.",
    language: "JavaScript",
    stars: 0,
    url: "https://github.com/sairambn/master-timetable-generator",
    live: "https://master-timetable-generator.vercel.app",
    featured: true,
    tags: ["Algorithms", "Constraints", "Scheduling"],
    outcome: "No conflicts",
  },
  {
    name: "aiml-stats-portal",
    title: "Result Analysis Portal",
    description:
      "Exam-cell tool: upload mark sheets, get subject stats, toppers, arrear groups, and FRONT + MARK Excel reports.",
    language: "TypeScript",
    stars: 0,
    url: "https://github.com/sairambn/aiml-stats-portal",
    live: "https://aiml-stats-portal.vercel.app",
    featured: true,
    tags: ["TypeScript", "Pipelines", "Excel"],
    outcome: "One-pass export",
  },
  {
    name: "neetcode-250-daily",
    title: "NeetCode 250 Daily",
    description:
      "One problem a day through the NeetCode 250 list. Solutions in Python, Java, and C++.",
    language: "Python",
    stars: 5,
    url: "https://github.com/sairambn/neetcode-250-daily",
    featured: true,
    tags: ["DSA", "Python", "Java"],
    outcome: "Daily practice",
  },
  {
    name: "TotalFitnessStudio",
    title: "Total Fitness Studio",
    description:
      "Client site for a 4.9 star gym. SSR, local SEO, Maps, tel and WhatsApp CTAs. Live in production.",
    language: "TypeScript",
    stars: 0,
    url: "https://github.com/sairambn/TotalFitnessStudio",
    live: "https://total-fitness-studio-livid.vercel.app",
    tags: ["SSR", "TypeScript", "Production"],
    outcome: "Live client site",
  },
  {
    name: "naiyapudai-growth-studio",
    title: "Naiyapudai Growth Studio",
    description:
      "Site and local SEO setup for a growth studio serving Tamil Nadu brands. Live.",
    language: "TypeScript",
    stars: 0,
    url: "https://github.com/sairambn/naiyapudai-growth-studio",
    live: "https://naiyapudai.vercel.app",
    tags: ["TypeScript", "SSR", "SEO"],
    outcome: "Live",
  },
];
