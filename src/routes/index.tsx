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
      {/* ── Hero — full-width photo, no crop ───────────────── */}
      <section className="relative overflow-hidden">
        <div className="grid-backdrop pointer-events-none absolute inset-0" />

        {/* Full-bleed photo — native landscape, entire image visible */}
        <div className="relative mx-auto max-w-6xl px-4 pt-8 sm:px-6 sm:pt-10 lg:pt-12">
          <div className="relative overflow-hidden rounded-2xl border border-border/50 shadow-[var(--shadow-glow)] sm:rounded-[1.5rem]">
            {/* Soft glow behind */}
            <div className="pointer-events-none absolute -inset-8 -z-10 rounded-[2rem] bg-gradient-to-br from-primary/20 via-primary/5 to-transparent blur-3xl" />

            <img
              src={profile.avatar}
              alt={`${profile.name} at College of Engineering Guindy`}
              width={1551}
              height={798}
              className="h-auto w-full object-contain object-center"
              fetchPriority="high"
            />

            {/* Name bar over the bottom of the photo */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/80 to-transparent px-5 pb-5 pt-20 sm:px-8 sm:pb-7 sm:pt-28">
              <p className="font-script text-[2rem] leading-none text-foreground sm:text-[2.5rem] lg:text-[2.75rem]">
                {profile.name}
              </p>
              <p className="mt-1.5 text-[13px] text-muted-foreground sm:text-[14px]">
                {profile.headline}
              </p>
            </div>
          </div>
        </div>

        {/* Copy + CTAs under the full photo */}
        <div className="relative mx-auto max-w-6xl px-5 pt-10 pb-16 sm:px-6 sm:pt-12 sm:pb-20 lg:pb-24">
          <p className="eyebrow">
            {profile.role} · {profile.location}
          </p>
          <h1 className="mt-4 max-w-3xl text-[2.25rem] leading-[1.08] font-semibold tracking-tight sm:text-[3rem] lg:text-[3.4rem]">
            I build clean, reliable software
            <span className="text-gradient-ember"> that solves real problems.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] leading-[1.7] text-muted-foreground sm:text-[16.5px]">
            {profile.tagline}
          </p>
          <p className="mt-4 font-mono text-[11px] tracking-[0.14em] text-muted-foreground/75">
            {profile.education} · {profile.openTo}
          </p>

          <div className="mt-8 flex flex-wrap gap-2.5 sm:gap-3">
            <Link
              to="/projects"
              className="rounded-full bg-primary px-6 py-2.5 text-[13.5px] font-semibold text-primary-foreground shadow-[0_8px_32px_-8px_color-mix(in_oklab,var(--ember)_55%,transparent)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-8px_color-mix(in_oklab,var(--ember)_65%,transparent)] sm:px-7 sm:py-3 sm:text-[14px]"
            >
              View selected work
            </Link>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border/80 px-5 py-2.5 text-[13.5px] font-medium transition-all duration-300 hover:border-primary/30 hover:bg-secondary/60 sm:px-6 sm:py-3 sm:text-[14px]"
            >
              LinkedIn
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border/80 px-5 py-2.5 text-[13.5px] font-medium transition-all duration-300 hover:border-primary/30 hover:bg-secondary/60 sm:px-6 sm:py-3 sm:text-[14px]"
            >
              GitHub
            </a>
            <a
              href={profile.leetcode}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border/80 px-5 py-2.5 text-[13.5px] font-medium transition-all duration-300 hover:border-primary/30 hover:bg-secondary/60 sm:px-6 sm:py-3 sm:text-[14px]"
            >
              LeetCode
            </a>
          </div>

          {/* Stats strip */}
          <dl className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/40 shadow-[var(--shadow-lift)] sm:mt-14 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="bg-card/95 px-5 py-6 backdrop-blur-sm sm:px-6 sm:py-7">
                <dt className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                  {s.label}
                </dt>
                <dd className="mt-2 font-display text-[1.45rem] font-semibold tracking-tight text-gradient-ember sm:text-[1.6rem]">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Signal ───────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-6 sm:pb-24">
        <div>
          <p className="eyebrow">Signal</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            What I've actually built
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            Real systems — constraint engines, data pipelines, production sites, and daily
            algorithm practice.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {impact.map((item) => (
            <div key={item.title} className="surface-card rounded-2xl p-6">
              <h3 className="text-[15px] font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-2.5 text-[14px] font-medium text-primary">{item.result}</p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Selected work ────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-6 sm:pb-24">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Things I've shipped
            </h2>
          </div>
          <Link
            to="/projects"
            className="shrink-0 text-[13px] text-muted-foreground transition-colors hover:text-primary"
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

      {/* ── How I work ───────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-6 sm:pb-24">
        <div>
          <p className="eyebrow">Approach</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">How I work</h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {principles.map((p) => (
            <div key={p.title} className="surface-card rounded-2xl p-6">
              <h3 className="text-[15px] font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Skills ───────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-6 sm:pb-24">
        <p className="eyebrow">Skills</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">What I bring</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.title} className="surface-card rounded-2xl p-6">
              <h3 className="text-[14px] font-semibold tracking-tight text-primary">{group.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
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

      {/* ── GitHub activity ──────────────────────────────────── */}
      <GitHubStats />

      {/* ── Closing CTA ──────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-5 pb-28 sm:px-6">
        <div className="surface-card relative overflow-hidden rounded-[1.75rem] p-8 sm:p-12">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <p className="eyebrow">Next step</p>
          <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Looking for an SDE who writes clean, reliable code?
          </h2>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
            Open to full-time Software Development Engineer roles in Bangalore, Hyderabad or remote.
            High-bar product teams preferred. LinkedIn or email is the fastest way to reach me.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-primary px-7 py-3 text-[14px] font-semibold text-primary-foreground shadow-[0_8px_32px_-8px_color-mix(in_oklab,var(--ember)_55%,transparent)] transition-all duration-300 hover:-translate-y-0.5"
            >
              Connect on LinkedIn
            </a>
            <Link
              to="/contact"
              className="rounded-full border border-border/80 px-6 py-3 text-[14px] font-medium transition-all duration-300 hover:border-primary/30 hover:bg-secondary/60"
            >
              Contact
            </Link>
            <a
              href={profile.leetcode}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border/80 px-6 py-3 text-[14px] font-medium transition-all duration-300 hover:border-primary/30 hover:bg-secondary/60"
            >
              LeetCode
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
