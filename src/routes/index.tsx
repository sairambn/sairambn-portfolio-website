import { createFileRoute, Link } from "@tanstack/react-router";
import { profile, projects, skills, stats, impact } from "@/data/portfolio";
import { ProjectCard } from "@/components/project-card";

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
      { property: "og:image", content: "https://bnsairam.vercel.app/content.png" },
      { name: "twitter:image", content: "https://bnsairam.vercel.app/content.png" },
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
        <div className="relative mx-auto max-w-6xl px-5 pt-16 pb-20 sm:pt-24 sm:pb-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>
              <p className="eyebrow">
                {profile.role} · {profile.location}
              </p>
              <h1 className="mt-5 max-w-3xl text-4xl leading-[1.05] font-bold sm:text-6xl lg:text-6xl">
                Dashboards teams
                <span className="text-gradient-ember"> actually open every morning.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                {profile.tagline}
              </p>
              <p className="mt-4 font-mono text-xs tracking-wider text-muted-foreground">
                {profile.education} · {profile.openTo}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
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
                  className="rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:border-primary/30 hover:bg-secondary"
                >
                  LinkedIn
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:border-primary/30 hover:bg-secondary"
                >
                  GitHub
                </a>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/20 via-transparent to-primary/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-border/60 shadow-[var(--shadow-glow)]">
                <img
                  src={profile.avatar}
                  alt={`${profile.name} at College of Engineering Guindy`}
                  width={640}
                  height={800}
                  className="aspect-[4/5] w-full object-cover object-top"
                  fetchPriority="high"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent px-5 pb-5 pt-16">
                  <p className="font-display text-lg font-semibold">{profile.name}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{profile.headline}</p>
                </div>
              </div>
            </div>
          </div>

          <dl className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border/80 shadow-[var(--shadow-lift)] sm:grid-cols-3">
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

      {/* Impact */}
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

      {/* Selected work */}
      <section className="mx-auto max-w-6xl px-5 pb-24">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Things I've shipped</h2>
          </div>
          <Link
            to="/projects"
            className="shrink-0 text-sm text-muted-foreground transition-colors hover:text-primary"
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

      {/* Toolkit */}
      <section className="mx-auto max-w-6xl px-5 pb-20">
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

      {/* Closing CTA */}
      <section className="mx-auto max-w-6xl px-5 pb-28">
        <div className="surface-card overflow-hidden rounded-3xl p-8 sm:p-12">
          <p className="eyebrow">Next step</p>
          <h2 className="mt-3 max-w-xl text-3xl font-bold sm:text-4xl">
            Looking for a data analyst who ships complete?
          </h2>
          <p className="mt-4 max-w-lg text-muted-foreground">
            Open to full-time roles in Bangalore, Hyderabad or remote. LinkedIn or email is the
            fastest way to reach me.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_8px_30px_-8px_color-mix(in_oklab,var(--ember)_50%,transparent)] transition-all hover:-translate-y-0.5"
            >
              Connect on LinkedIn
            </a>
            <Link
              to="/contact"
              className="rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:border-primary/30 hover:bg-secondary"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
