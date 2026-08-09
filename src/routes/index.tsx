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
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="grid-backdrop pointer-events-none absolute inset-0" />

        <div className="relative mx-auto max-w-6xl px-5 pt-8 sm:px-6 sm:pt-12 lg:pt-14">
          <div className="relative">
            <div className="hero-frame relative overflow-hidden rounded-2xl border border-border/50">
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

          <div className="mt-6 flex flex-col gap-1 sm:mt-8 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
              <p className="font-script text-[2.2rem] leading-none text-foreground sm:text-[2.75rem]">
                {profile.name}
              </p>
              <p className="text-[13px] tracking-wide text-muted-foreground sm:text-[14.5px]">
                {profile.headline}
              </p>
            </div>
            <p className="font-mono text-[11px] tracking-[0.12em] text-muted-foreground/75">
              {profile.education}
            </p>
          </div>
        </div>

        <div className="relative mx-auto max-w-6xl px-5 pt-10 pb-16 sm:px-6 sm:pt-14 sm:pb-20">
          <p className="eyebrow">
            {profile.role} · {profile.location}
          </p>
          <h1 className="mt-4 max-w-3xl text-[2.25rem] leading-[1.08] font-semibold tracking-tight sm:text-[3.15rem] lg:text-[3.6rem]">
            I build clean, reliable software
            <br className="hidden sm:block" />
            <span className="text-gradient-ember"> that solves real problems.</span>
          </h1>
          <p className="mt-5 max-w-xl text-[15.5px] leading-[1.7] text-muted-foreground sm:text-[16.5px]">
            {profile.tagline}
          </p>
          <p className="mt-3 font-mono text-[11px] tracking-[0.14em] text-muted-foreground/70">
            {profile.openTo}
          </p>

          <div className="mt-8 flex flex-wrap gap-2.5">
            <Link
              to="/projects"
              className="rounded-full bg-primary px-7 py-3 text-[13.5px] font-semibold text-primary-foreground transition-all duration-250 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_-6px_color-mix(in_oklab,var(--ember)_55%,transparent)]"
            >
              View selected work
            </Link>
            <a
              href={`mailto:${profile.email}`}
              className="rounded-full border border-primary/35 bg-primary/8 px-5 py-3 text-[13.5px] font-medium text-primary transition-all duration-250 hover:border-primary/55 hover:bg-primary/12"
            >
              Email me
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border/70 px-5 py-3 text-[13.5px] font-medium transition-all duration-250 hover:border-primary/30 hover:bg-secondary/50"
            >
              LinkedIn
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border/70 px-5 py-3 text-[13.5px] font-medium transition-all duration-250 hover:border-primary/30 hover:bg-secondary/50"
            >
              GitHub
            </a>
            <a
              href={profile.leetcode}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border/70 px-5 py-3 text-[13.5px] font-medium transition-all duration-250 hover:border-primary/30 hover:bg-secondary/50"
            >
              LeetCode
            </a>
          </div>

          <dl className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border/40 bg-border/25 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="bg-card/95 px-5 py-6 sm:px-6 sm:py-8">
                <dt className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                  {s.label}
                </dt>
                <dd className="mt-2 font-display text-[1.55rem] font-semibold tracking-tight text-gradient-ember sm:text-[1.75rem]">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Signal / Impact */}
      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-6 sm:pb-24">
        <div className="max-w-2xl">
          <p className="eyebrow">Signal</p>
          <h2 className="mt-3 text-[1.85rem] font-semibold tracking-tight sm:text-[2.35rem]">
            What I've actually built
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            Constraint engines, data pipelines, production sites, and daily algorithm practice.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {impact.map((item) => (
            <div key={item.title} className="surface-card rounded-xl p-6">
              <h3 className="text-[15px] font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-2.5 text-[14px] font-medium text-primary">{item.result}</p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Selected work */}
      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-6 sm:pb-24">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 className="mt-3 text-[1.85rem] font-semibold tracking-tight sm:text-[2.35rem]">
              Things I've shipped
            </h2>
          </div>
          <Link
            to="/projects"
            className="shrink-0 text-[13.5px] text-muted-foreground transition-colors hover:text-primary"
          >
            All projects →
          </Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {featured.map((p) => (
            <ProjectCard key={p.name} project={p} />
          ))}
        </div>
      </section>

      {/* Approach */}
      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-6 sm:pb-24">
        <div>
          <p className="eyebrow">Approach</p>
          <h2 className="mt-3 text-[1.85rem] font-semibold tracking-tight sm:text-[2.35rem]">
            How I work
          </h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {principles.map((p) => (
            <div key={p.title} className="surface-card rounded-xl p-6">
              <h3 className="text-[15px] font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-6 sm:pb-24">
        <p className="eyebrow">Skills</p>
        <h2 className="mt-3 text-[1.85rem] font-semibold tracking-tight sm:text-[2.25rem]">What I bring</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group) => (
            <div key={group.title} className="surface-card rounded-xl p-6">
              <h3 className="text-[14px] font-semibold tracking-tight text-primary">{group.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border/60 bg-secondary/25 px-3 py-1 text-[12.5px] text-muted-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-6xl">
        <GitHubStats />
      </div>

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-5 pb-28 sm:px-6">
        <div className="surface-card relative overflow-hidden rounded-2xl p-8 sm:p-12">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <p className="eyebrow">Next step</p>
          <h2 className="mt-3 max-w-xl text-[1.85rem] font-semibold tracking-tight sm:text-[2.35rem]">
            Looking for an SDE who writes clean, reliable code?
          </h2>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
            Open to full-time Software Development Engineer roles in Bangalore, Hyderabad or remote.
            High-bar product teams preferred.
          </p>
          <div className="mt-8 flex flex-wrap gap-2.5">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-primary px-7 py-3 text-[13.5px] font-semibold text-primary-foreground transition-all duration-250 hover:-translate-y-0.5"
            >
              Connect on LinkedIn
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="rounded-full border border-primary/35 bg-primary/8 px-6 py-3 text-[13.5px] font-medium text-primary transition-all duration-250 hover:border-primary/55 hover:bg-primary/12"
            >
              Email me
            </a>
            <Link
              to="/contact"
              className="rounded-full border border-border/70 px-6 py-3 text-[13.5px] font-medium transition-all duration-250 hover:border-primary/30 hover:bg-secondary/50"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
