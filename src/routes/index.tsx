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
      {/* Cinematic hero — full-bleed photo */}
      <section className="relative flex min-h-[min(92svh,920px)] flex-col justify-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={profile.avatar}
            alt={`${profile.name} at College of Engineering Guindy`}
            className="h-full w-full object-cover object-center"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-background/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-12 pt-28 sm:px-6 sm:pb-16 sm:pt-32">
          <p className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground">
            {profile.education}
          </p>

          <h1 className="mt-4 max-w-3xl text-[2.35rem] leading-[1.05] font-semibold tracking-tight sm:text-[3.25rem] lg:text-[3.75rem]">
            Code that works.
            <br />
            <span className="text-gradient-ember">Systems people use.</span>
          </h1>

          <p className="mt-5 max-w-xl text-[15.5px] leading-[1.7] text-muted-foreground sm:text-[16.5px]">
            {profile.tagline}
          </p>

          <p className="mt-2 font-mono text-[11px] tracking-[0.12em] text-muted-foreground/80">
            {profile.openTo}
          </p>

          <div className="mt-8 flex flex-wrap gap-2.5">
            <Link
              to="/projects"
              className="rounded-full bg-primary px-7 py-3 text-[13.5px] font-semibold text-primary-foreground transition-all duration-250 hover:-translate-y-0.5"
            >
              View work
            </Link>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border/70 bg-background/50 px-5 py-3 text-[13.5px] font-medium backdrop-blur-sm transition-all duration-250 hover:border-primary/30 hover:bg-secondary/50"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="rounded-full border border-primary/35 bg-primary/8 px-5 py-3 text-[13.5px] font-medium text-primary transition-all duration-250 hover:border-primary/55 hover:bg-primary/12"
            >
              Email
            </a>
          </div>

          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-border/40 pt-8">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                  {s.label}
                </dt>
                <dd className="mt-1.5 text-[14px] font-semibold tracking-tight sm:text-[15px]">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-24">
        <div className="max-w-2xl">
          <p className="eyebrow">Built</p>
          <h2 className="mt-3 text-[1.85rem] font-semibold tracking-tight sm:text-[2.35rem]">
            What is live
          </h2>
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

      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-6 sm:pb-24">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Projects</p>
            <h2 className="mt-3 text-[1.85rem] font-semibold tracking-tight sm:text-[2.35rem]">
              Selected work
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

      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-6 sm:pb-24">
        <p className="eyebrow">Skills</p>
        <h2 className="mt-3 text-[1.85rem] font-semibold tracking-tight sm:text-[2.25rem]">Stack</h2>
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

      <section className="mx-auto max-w-6xl px-5 pb-28 sm:px-6">
        <div className="surface-card relative overflow-hidden rounded-2xl p-8 sm:p-12">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <p className="eyebrow">Contact</p>
          <h2 className="mt-3 max-w-xl text-[1.85rem] font-semibold tracking-tight sm:text-[2.35rem]">
            Open to SDE roles
          </h2>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
            Bangalore, Hyderabad, or remote. LinkedIn or email works best.
          </p>
          <div className="mt-8 flex flex-wrap gap-2.5">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-primary px-7 py-3 text-[13.5px] font-semibold text-primary-foreground transition-all duration-250 hover:-translate-y-0.5"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="rounded-full border border-primary/35 bg-primary/8 px-6 py-3 text-[13.5px] font-medium text-primary transition-all duration-250 hover:border-primary/55 hover:bg-primary/12"
            >
              Email
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
