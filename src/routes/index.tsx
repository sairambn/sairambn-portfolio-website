import { createFileRoute, Link } from "@tanstack/react-router";
import { profile, projects, skills, stats, impact } from "@/data/portfolio";
import { ProjectCard } from "@/components/project-card";
import { GitHubStats } from "@/components/github-stats";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sairam Nagarajan — Data Analyst | Power BI, SQL, Python" },
      {
        name: "description",
        content:
          "Portfolio of Sairam Nagarajan (Sairam BN), a Chennai-based data analyst building Power BI dashboards on solid SQL and Python. Open to roles in Bangalore, Hyderabad or remote.",
      },
      { property: "og:title", content: "Sairam Nagarajan — Data Analyst | Power BI, SQL, Python" },
      {
        property: "og:description",
        content: "Power BI dashboards teams actually use, built on solid SQL and Python.",
      },
      { property: "og:image", content: profile.avatar },
      { name: "twitter:image", content: profile.avatar },
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
        <div className="relative mx-auto max-w-6xl px-5 pt-20 pb-24 sm:pt-28 sm:pb-32">
          <p className="eyebrow">
            {profile.role} · {profile.location}
          </p>
          <h1 className="mt-6 max-w-4xl text-5xl leading-[0.95] font-bold sm:text-7xl">
            Dashboards teams
            <span className="text-gradient-ember"> actually open every morning.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {profile.tagline}
          </p>
          <p className="mt-4 font-mono text-xs tracking-wider text-muted-foreground">
            {profile.education} · {profile.openTo}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/projects"
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_8px_30px_-8px_color-mix(in_oklab,var(--ember)_50%,transparent)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-8px_color-mix(in_oklab,var(--ember)_60%,transparent)]"
            >
              View selected work
            </Link>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-secondary hover:border-primary/30"
            >
              LinkedIn
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-secondary hover:border-primary/30"
            >
              GitHub
            </a>
          </div>

          <dl className="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border/80 sm:grid-cols-3 shadow-[var(--shadow-lift)]">
            {stats.map((s) => (
              <div key={s.label} className="bg-card/90 px-6 py-7 backdrop-blur-sm">
                <dt className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                  {s.label}
                </dt>
                <dd className="mt-2 font-display text-3xl font-bold text-gradient-ember">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-24">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Impact</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Outcomes that matter</h2>
          </div>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {impact.map((item) => (
            <div key={item.title} className="surface-card rounded-2xl p-6">
              <h3 className="text-base font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm font-medium text-primary">{item.result}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <GitHubStats />

      <section className="mx-auto max-w-6xl px-5 pb-24">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Things I've shipped</h2>
          </div>
          <Link to="/projects" className="shrink-0 text-sm text-muted-foreground hover:text-primary transition-colors">
            All projects →
          </Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {featured.map((p) => (
            <ProjectCard key={p.name} project={p} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-28">
        <p className="eyebrow">Toolkit</p>
        <h2 className="mt-3 text-2xl font-bold sm:text-3xl">What I work with</h2>
        <div className="mt-6 flex flex-wrap gap-2.5">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-border bg-secondary/50 px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
