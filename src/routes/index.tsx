import { createFileRoute, Link } from "@tanstack/react-router";
import {
  profile,
  projects,
  skillGroups,
  stats,
  impact,
  principles,
} from "@/data/portfolio";
import { ProjectCard } from "@/components/project-card";
import { GitHubStats } from "@/components/github-stats";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sairam Nagarajan — Software Engineer | DSA, Python, Java" },
      {
        name: "description",
        content:
          "Software engineer from CEG Chennai. Strong in data structures, algorithms, Python and Java. Building clean, reliable software. Open to SDE roles in Bangalore, Hyderabad or remote.",
      },
      {
        property: "og:title",
        content: "Sairam Nagarajan — Software Engineer | DSA, Python, Java",
      },
      {
        property: "og:description",
        content:
          "I build clean, reliable software that solves real problems. Strong DSA foundations. Preparing for Software Development Engineer roles.",
      },
      { property: "og:image", content: "https://bnsairam.vercel.app/content.png" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://bnsairam.vercel.app" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://bnsairam.vercel.app/content.png" },
      { name: "theme-color", content: "#1a1410" },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="grid-backdrop pointer-events-none absolute inset-0" />

        <div className="relative mx-auto max-w-7xl px-4 pt-10 sm:px-6 sm:pt-14 lg:pt-16">
          <div className="relative">
            <div className="pointer-events-none absolute -inset-10 -z-10 rounded-[2.5rem] bg-gradient-to-br from-primary/30 via-primary/8 to-transparent blur-3xl" />
            <div className="hero-frame relative overflow-hidden rounded-2xl border border-border/40 sm:rounded-[1.75rem]">
              <img
                src={profile.avatar}
                alt={`${profile.name} at College of Engineering Guindy`}
                width={1551}
                height={798}
                className="h-auto w-full object-contain object-center"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-1.5 sm:mt-8 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-5">
              <p className="font-script text-[2.4rem] leading-none text-foreground sm:text-[3rem] lg:text-[3.25rem]">
                {profile.name}
              </p>
              <p className="text-[13.5px] tracking-wide text-muted-foreground sm:text-[15px]">
                {profile.headline}
              </p>
            </div>
            <p className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground/70">
              {profile.education}
            </p>
          </div>
        </div>

        <div className="relative mx-auto max-w-7xl px-5 pt-12 pb-20 sm:px-6 sm:pt-16 sm:pb-28">
          <p className="eyebrow">
            {profile.role} · {profile.location}
          </p>
          <h1 className="mt-5 max-w-4xl text-[2.5rem] leading-[1.05] font-semibold tracking-tight sm:text-[3.5rem] lg:text-[4.25rem]">
            I build clean, reliable software
            <br className="hidden sm:block" />
            <span className="text-gradient-ember"> that solves real problems.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[16.5px] leading-[1.75] text-muted-foreground sm:text-[18px]">
            {profile.tagline}
          </p>
          <p className="mt-4 font-mono text-[11px] tracking-[0.16em] text-muted-foreground/70">
            {profile.openTo}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/projects"
              className="rounded-full bg-primary px-8 py-3.5 text-[14px] font-semibold text-primary-foreground shadow-[0_10px_40px_-8px_color-mix(in_oklab,var(--ember)_60%,transparent)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_48px_-8px_color-mix(in_oklab,var(--ember)_70%,transparent)]"
            >
              View selected work
            </Link>
            <a
              href={`mailto:${profile.email}`}
              className="rounded-full border border-primary/40 bg-primary/10 px-6 py-3.5 text-[14px] font-medium text-primary transition-all duration-300 hover:border-primary/60 hover:bg-primary/15"
            >
              Email me
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border/80 px-6 py-3.5 text-[14px] font-medium transition-all duration-300 hover:border-primary/35 hover:bg-secondary/60"
            >
              LinkedIn
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border/80 px-6 py-3.5 text-[14px] font-medium transition-all duration-300 hover:border-primary/35 hover:bg-secondary/60"
            >
              GitHub
            </a>
            <a
              href={profile.leetcode}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border/80 px-6 py-3.5 text-[14px] font-medium transition-all duration-300 hover:border-primary/35 hover:bg-secondary/60"
            >
              LeetCode
            </a>
          </div>

          <dl className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border/50 bg-border/30 shadow-[var(--shadow-lift)] sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="bg-card/90 px-6 py-8 backdrop-blur-sm sm:px-8 sm:py-10">
                <dt className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground uppercase">
                  {s.label}
                </dt>
                <dd className="mt-3 font-display text-[1.75rem] font-semibold tracking-tight text-gradient-ember sm:text-[2rem]">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-6 sm:pb-28">
        <div className="max-w-3xl">
          <p className="eyebrow">Signal</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.75rem]">
            What I've actually built
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">
            Constraint engines, data pipelines, production sites, and daily algorithm practice.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {impact.map((item) => (
            <div key={item.title} className="surface-card rounded-2xl p-7">
              <h3 className="text-[16px] font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-3 text-[15px] font-medium text-primary">{item.result}</p>
              <p className="mt-2.5 text-[14px] leading-relaxed text-muted-foreground">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-6 sm:pb-28">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.75rem]">
              Things I've shipped
            </h2>
          </div>
          <Link
            to="/projects"
            className="shrink-0 text-[14px] text-muted-foreground transition-colors hover:text-primary"
          >
            All projects →
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {featured.map((p) => (
            <ProjectCard key={p.name} project={p} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-6 sm:pb-28">
        <div>
          <p className="eyebrow">Approach</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.75rem]">
            How I work
          </h2>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {principles.map((p) => (
            <div key={p.title} className="surface-card rounded-2xl p-7">
              <h3 className="text-[16px] font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-6 sm:pb-28">
        <p className="eyebrow">Skills</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">What I bring</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group) => (
            <div key={group.title} className="surface-card rounded-2xl p-7">
              <h3 className="text-[15px] font-semibold tracking-tight text-primary">{group.title}</h3>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border/70 bg-secondary/30 px-3.5 py-1.5 text-[13px] text-muted-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-7xl">
        <GitHubStats />
      </div>

      <section className="mx-auto max-w-7xl px-5 pb-32 sm:px-6">
        <div className="surface-card relative overflow-hidden rounded-[2rem] p-10 sm:p-14 lg:p-16">
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-primary/8 blur-3xl" />
          <p className="eyebrow">Next step</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.75rem]">
            Looking for an SDE who writes clean, reliable code?
          </h2>
          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-muted-foreground">
            Open to full-time Software Development Engineer roles in Bangalore, Hyderabad or remote.
            High-bar product teams preferred. LinkedIn or email is the fastest way to reach me.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-primary px-8 py-3.5 text-[14px] font-semibold text-primary-foreground shadow-[0_10px_40px_-8px_color-mix(in_oklab,var(--ember)_60%,transparent)] transition-all duration-300 hover:-translate-y-0.5"
            >
              Connect on LinkedIn
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="rounded-full border border-primary/40 bg-primary/10 px-7 py-3.5 text-[14px] font-medium text-primary transition-all duration-300 hover:border-primary/60 hover:bg-primary/15"
            >
              Email me
            </a>
            <Link
              to="/contact"
              className="rounded-full border border-border/80 px-7 py-3.5 text-[14px] font-medium transition-all duration-300 hover:border-primary/35 hover:bg-secondary/60"
            >
              Contact
            </Link>
            <a
              href={profile.leetcode}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border/80 px-7 py-3.5 text-[14px] font-medium transition-all duration-300 hover:border-primary/35 hover:bg-secondary/60"
            >
              LeetCode
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
