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
      'Event platform for a department hackathon: team registration, problem assignment by team size, solution collection via GitHub PRs. Used on event day.',
    stack: 'TypeScript',
    live: 'https://ai-thon-one.vercel.app',
    github: 'https://github.com/sairambn/AI-Competition',
  },
  {
    title: 'Master Timetable Generator',
    outcome: 'No conflicts',
    description:
      'In-browser constraint solver for teachers, classes, and rooms. Outputs conflict-free timetables with class/teacher views and CSV export.',
    stack: 'JavaScript',
    live: 'https://master-timetable-generator.vercel.app',
    github: 'https://github.com/sairambn/master-timetable-generator',
  },
  {
    title: 'Result Analysis Portal',
    outcome: 'One-pass export',
    description:
      'Exam-cell tool: upload mark sheets, get subject stats, toppers, arrear groups, FRONT + MARK Excel exports.',
    stack: 'TypeScript',
    live: 'https://aiml-stats-portal.vercel.app',
    github: 'https://github.com/sairambn/aiml-stats-portal',
  },
  {
    title: 'NeetCode 250 Daily',
    outcome: 'One problem a day',
    description:
      'One DSA problem a day through the NeetCode 250 list. Solutions in Python, Java, and C++.',
    stack: 'Python · Java · C++',
    github: 'https://github.com/sairambn/neetcode-250-daily',
  },
  {
    title: 'Total Fitness Studio',
    outcome: 'Live client site',
    description:
      'SSR business site for a 4.9-star gym. Local SEO, Maps, tel and WhatsApp CTAs. In production.',
    stack: 'TypeScript · SSR',
    live: 'https://total-fitness-studio-livid.vercel.app',
    github: 'https://github.com/sairambn/TotalFitnessStudio',
  },
  {
    title: 'Naiyapudai Growth Studio',
    outcome: 'Live',
    description:
      'SSR site and local SEO setup for a growth studio serving Tamil Nadu brands.',
    stack: 'TypeScript · SSR',
    live: 'https://naiyapudai.vercel.app',
    github: 'https://github.com/sairambn/naiyapudai-growth-studio',
  },
];
