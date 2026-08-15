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
          "Software engineer from CEG Chennai. Python, Java, daily DSA. Open to SDE roles in Bangalore, Hyderabad or remote.",
      },
      {
        property: "og:title",
        content: "Sairam Nagarajan — Software Engineer | DSA, Python, Java",
      },
      {
        property: "og:description",
        content: "Python, Java, daily DSA. Ships systems people use. Looking for an SDE role.",
      },
      { property: "og:image", content: "https://bnsairam.vercel.app/content.png" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://bnsairam.vercel.app" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://bnsairam.vercel.app/content.png" },
      { name: "theme-color", content: "#ffffff" },
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

        <div className="relative mx-auto max-w-5xl px-5 pt-6 sm:px-6 sm:pt-10 lg:pt-12">
          <div className="hero-frame relative overflow-hidden">
            <img
              src={profile.avatar}
              alt={`${profile.name} at College of Engineering Guindy`}
              width={1551}
              height={798}
              className="aspect-[16/9] h-auto w-full object-cover object-[center_28%] sm:aspect-[2/1] sm:object-[center_30%]"
              fetchPriority="high"
              decoding="async"
            />
          </div>

          <div className="mt-5 flex flex-col gap-1 sm:mt-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
            <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3">
              <p className="text-[1.65rem] font-semibold leading-none tracking-tight text-foreground sm:text-[1.9rem]">
                {profile.name}
              </p>
              <p className="text-[13px] text-muted-foreground sm:text-[14px]">
                {profile.headline}
              </p>
            </div>
            <p className="font-mono text-[10.5px] tracking-[0.1em] text-muted-foreground/70 sm:text-[11px]">
              {profile.education}
            </p>
          </div>
        </div>

        <div className="relative mx-auto max-w-5xl px-5 pt-9 pb-14 sm:px-6 sm:pt-12 sm:pb-18">
          <p className="eyebrow">
            {profile.role} · {profile.location}
          </p>
          <h1 className="mt-3 max-w-2xl text-[2.1rem] leading-[1.08] font-semibold tracking-tight sm:text-[2.85rem] lg:text-[3.25rem]">
            Code that works.
            <br className="hidden sm:block" />
            <span className="text-gradient-ember">Systems people use.</span>
          </h1>
          <p className="mt-4 max-w-lg text-[15px] leading-[1.7] text-muted-foreground sm:text-[16px]">
            {profile.tagline}
          </p>
          <p className="mt-2.5 font-mono text-[10.5px] tracking-[0.12em] text-muted-foreground/65">
            {profile.openTo}
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            <Link
              to="/projects"
              className="rounded-full bg-primary px-6 py-2.5 text-[13.5px] font-semibold text-primary-foreground shadow-sm transition-all duration-250 hover:-translate-y-0.5 hover:shadow-md"
            >
              View work
            </Link>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border/80 bg-white/50 px-5 py-2.5 text-[13.5px] font-medium transition-all duration-250 hover:border-primary/30 hover:bg-secondary/60"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="rounded-full border border-primary/30 bg-primary/8 px-5 py-2.5 text-[13.5px] font-medium text-primary transition-all duration-250 hover:border-primary/50 hover:bg-primary/12"
            >
              Email
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border/80 bg-white/50 px-5 py-2.5 text-[13.5px] font-medium transition-all duration-250 hover:border-primary/30 hover:bg-secondary/60"
            >
              GitHub
            </a>
          </div>

          <dl className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border/50 bg-border/20 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="bg-white/80 px-5 py-5 backdrop-blur-sm sm:px-6 sm:py-7">
                <dt className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                  {s.label}
                </dt>
                <dd className="mt-1.5 text-[1.35rem] font-semibold tracking-tight text-gradient-ember sm:text-[1.55rem]">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-18 sm:px-6 sm:pb-22">
        <div className="max-w-2xl">
          <p className="eyebrow">Built</p>
          <h2 className="mt-2.5 text-[1.7rem] font-semibold tracking-tight sm:text-[2.1rem]">
            What is live
          </h2>
        </div>
        <div className="mt-8 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {impact.map((item) => (
            <div key={item.title} className="surface-card rounded-2xl p-5 sm:p-6">
              <h3 className="text-[15px] font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-2 text-[13.5px] font-medium text-primary">{item.result}</p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-18 sm:px-6 sm:pb-22">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Projects</p>
            <h2 className="mt-2.5 text-[1.7rem] font-semibold tracking-tight sm:text-[2.1rem]">
              Selected work
            </h2>
          </div>
          <Link
            to="/projects"
            className="shrink-0 text-[13px] font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            All projects →
          </Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {featured.map((p) => (
            <ProjectCard key={p.name} project={p} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-18 sm:px-6 sm:pb-22">
        <div>
          <p className="eyebrow">Approach</p>
          <h2 className="mt-2.5 text-[1.7rem] font-semibold tracking-tight sm:text-[2.1rem]">
            How I work
          </h2>
        </div>
        <div className="mt-8 grid gap-3.5 sm:grid-cols-2">
          {principles.map((p) => (
            <div key={p.title} className="surface-card rounded-2xl p-5 sm:p-6">
              <h3 className="text-[15px] font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-18 sm:px-6 sm:pb-22">
        <p className="eyebrow">Skills</p>
        <h2 className="mt-2.5 text-[1.7rem] font-semibold tracking-tight sm:text-[2rem]">Stack</h2>
        <div className="mt-7 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group) => (
            <div key={group.title} className="surface-card rounded-2xl p-5">
              <h3 className="text-[13.5px] font-semibold tracking-tight text-primary">{group.title}</h3>
              <div className="mt-3.5 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border/60 bg-secondary/30 px-2.5 py-1 text-[12px] text-muted-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-5xl">
        <GitHubStats />
      </div>

      <section className="mx-auto max-w-5xl px-5 pb-24 sm:px-6 sm:pb-28">
        <div className="surface-card relative overflow-hidden rounded-3xl p-7 sm:p-11">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
          <p className="eyebrow">Contact</p>
          <h2 className="mt-2.5 max-w-xl text-[1.7rem] font-semibold tracking-tight sm:text-[2.15rem]">
            Open to SDE roles
          </h2>
          <p className="mt-3.5 max-w-md text-[15px] leading-relaxed text-muted-foreground">
            Bangalore, Hyderabad, or remote. LinkedIn or email works best.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-primary px-6 py-2.5 text-[13.5px] font-semibold text-primary-foreground shadow-sm transition-all duration-250 hover:-translate-y-0.5"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="rounded-full border border-primary/30 bg-primary/8 px-5 py-2.5 text-[13.5px] font-medium text-primary transition-all duration-250 hover:border-primary/50 hover:bg-primary/12"
            >
              Email
            </a>
            <Link
              to="/contact"
              className="rounded-full border border-border/80 px-5 py-2.5 text-[13.5px] font-medium transition-all duration-250 hover:border-primary/30 hover:bg-secondary/50"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
