export const profile = {
  name: 'Sairam Nagarajan',
  shortName: 'Sairam BN',
  handle: 'sairambn',
  role: 'Software Engineer',
  headline: 'Software Engineer · DSA · Python · Java',
  tagline:
    'I write code that works, practice DSA every day, and ship systems people actually use.',
  openTo: 'Open to Bangalore · Hyderabad · Remote',
  education: "M.E., College of Engineering Guindy (CEG), Anna University · class of '25",
  email: 'bnsairam14@gmail.com',
  github: 'https://github.com/sairambn',
  linkedin: 'https://www.linkedin.com/in/sairambn/',
  leetcode: 'https://leetcode.com/u/sairambn/',
  resume: 'https://github.com/sairambn',
};

export const stats = [
  { label: 'Daily DSA', value: 'NeetCode 250' },
  { label: 'Languages', value: 'Python · Java · TS' },
  { label: 'Systems shipped', value: '6+ live' },
];

export const principles = [
  {
    index: '01',
    title: 'Readable code',
    body: 'Write it so the next person (or future me) can understand it without a walkthrough.',
  },
  {
    index: '02',
    title: 'Correct first',
    body: 'Handle the edge cases. Clever code that breaks under load is not clever.',
  },
  {
    index: '03',
    title: 'Daily practice',
    body: 'DSA every day. Same discipline as shipping: consistent work, no drama.',
  },
  {
    index: '04',
    title: 'Finish the job',
    body: 'If it is not used by real people, it is not done.',
  },
];

export const skillGroups = [
  {
    title: 'Core',
    items: ['Data Structures & Algorithms', 'Python', 'Java', 'Problem Solving', 'OOP'],
  },
  {
    title: 'Tools',
    items: ['Git', 'SQL', 'TypeScript', 'System Design basics'],
  },
  {
    title: 'Working on',
    items: ['Advanced DSA', 'System Design', 'Backend'],
  },
  {
    title: 'Also use',
    items: ['React', 'Python / pandas', 'Vite', 'Vercel'],
  },
];

export type Project = {
  title: string;
  outcome: string;
  description: string;
  stack: string;
  live?: string;
  github?: string;
};

export const projects: Project[] = [
  {
    title: 'AI Problem Solve-a-Thon',
    outcome: 'Ran live',
    description:
      'Event platform for a department hackathon. Team registration, problem assignment by team size, solution collection via GitHub PRs. Used on the day of the event.',
    stack: 'TypeScript',
    live: 'https://ai-thon-one.vercel.app',
    github: 'https://github.com/sairambn/AI-Competition',
  },
  {
    title: 'Master Timetable Generator',
    outcome: 'No conflicts',
    description:
      'Browser constraint solver for teachers, classes and rooms. Outputs conflict-free timetables with class and teacher views plus CSV export.',
    stack: 'JavaScript',
    live: 'https://master-timetable-generator.vercel.app',
    github: 'https://github.com/sairambn/master-timetable-generator',
  },
  {
    title: 'Result Analysis Portal',
    outcome: 'One-pass export',
    description:
      'Exam-cell tool: upload mark sheets, get subject stats, toppers, arrear groups, and FRONT + MARK Excel reports.',
    stack: 'TypeScript',
    live: 'https://aiml-stats-portal.vercel.app',
    github: 'https://github.com/sairambn/aiml-stats-portal',
  },
  {
    title: 'NeetCode 250 Daily',
    outcome: 'One problem a day',
    description:
      'One DSA problem a day through the NeetCode 250 list. Solutions in Python, Java and C++.',
    stack: 'Python · Java · C++',
    github: 'https://github.com/sairambn/neetcode-250-daily',
  },
  {
    title: 'Total Fitness Studio',
    outcome: 'Live client site',
    description:
      'SSR business site for a 4.9-star gym. Local SEO, Maps, call and WhatsApp CTAs. Still running in production.',
    stack: 'TypeScript · SSR',
    live: 'https://total-fitness-studio-livid.vercel.app',
    github: 'https://github.com/sairambn/TotalFitnessStudio',
  },
  {
    title: 'Naiyapudai Growth Studio',
    outcome: 'Live',
    description:
      'SSR site and local SEO setup for a growth studio serving Tamil Nadu brands. In production.',
    stack: 'TypeScript · SSR',
    live: 'https://naiyapudai.vercel.app',
    github: 'https://github.com/sairambn/naiyapudai-growth-studio',
  },
];

/** Activity / practice signal — kept honest and recent. */
export const activitySignal = {
  since: 'July 2026',
  focus:
    'Daily DSA, live systems, and public work that stays usable — not a year of empty squares.',
  metrics: [
    {
      value: 'Daily',
      label: 'DSA practice',
      note: 'NeetCode 250 · Python · Java',
    },
    {
      value: '15',
      label: 'Public repos',
      note: 'Shipped and maintained',
    },
    {
      value: '6+',
      label: 'Live systems',
      note: 'Client + college tools',
    },
  ],
  lanes: [
    {
      title: 'Algorithms',
      body: 'One problem a day through NeetCode 250. Solutions in Python, Java, and C++ with clean explanations.',
      href: 'https://github.com/sairambn/neetcode-250-daily',
      tag: 'Python · Java',
    },
    {
      title: 'Product systems',
      body: 'Event platforms, timetable solvers, exam pipelines, and client sites that stay in production.',
      href: 'https://github.com/sairambn',
      tag: 'TypeScript',
    },
    {
      title: 'Portfolio craft',
      body: 'This site and related experiments — type, performance, and shipping discipline as practice.',
      href: 'https://github.com/sairambn/sairambn-portfolio-website',
      tag: 'Next.js',
    },
  ],
  /** Recent intensity marks for a compact 4-week strip (0–3 scale). */
  recentWeeks: [
    { label: 'W1', level: 2 },
    { label: 'W2', level: 3 },
    { label: 'W3', level: 3 },
    { label: 'W4', level: 3 },
  ],
};
