import { createFileRoute, Link } from "@tanstack/react-router";
import { profile, projects, skillGroups, stats, impact } from "@/data/portfolio";
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
        <div className="relative mx-auto max-w-6xl px-5 pt-20 pb-24 sm:px-6 sm:pt-28 sm:pb-32">
          <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <div>
              <p className="eyebrow">
                {profile.role} · {profile.location}
              </p>
              <h1 className="mt-6 max-w-2xl text-[2.75rem] leading-[1.08] font-semibold tracking-tight sm:text-6xl lg:text-[3.75rem]">
                Dashboards teams
                <span className="text-gradient-ember"> actually open every morning.</span>
              </h1>
              <p className="mt-7 max-w-lg text-[17px] leading-[1.65] text-muted-foreground">
                {profile.tagline}
              </p>
              <p className="mt-5 font-mono text-[11px] tracking-[0.18em] text-muted-foreground/80">
                {profile.education} · {profile.openTo}
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  to="/projects"
                  className="rounded-full bg-primary px-7 py-3 text-[14px] font-semibold text-primary-foreground shadow-[0_8px_32px_-8px_color-mix(in_oklab,var(--ember)_55%,transparent)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-8px_color-mix(in_oklab,var(--ember)_65%,transparent)]"
                >
                  View selected work
                </Link>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-border/80 px-6 py-3 text-[14px] font-medium transition-all duration-300 hover:border-primary/30 hover:bg-secondary/60"
                >
                  LinkedIn
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-border/80 px-6 py-3 text-[14px] font-medium transition-all duration-300 hover:border-primary/30 hover:bg-secondary/60"
                >
                  GitHub
                </a>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[340px] lg:max-w-none">
              <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-primary/20 via-transparent to-primary/8 blur-3xl" />
              <div className="relative overflow-hidden rounded-[1.5rem] border border-border/50 shadow-[var(--shadow-glow)]">
                <img
                  src={profile.avatar}
                  alt={`${profile.name} at College of Engineering Guindy`}
                  width={640}
                  height={800}
                  className="aspect-[3/4] w-full object-cover object-[center_28%]"
                  fetchPriority="high"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/70 to-transparent px-5 pb-5 pt-24">
                  <p className="font-display text-[17px] font-semibold tracking-tight">{profile.name}</p>
                  <p className="mt-0.5 text-[13px] text-muted-foreground">{profile.headline}</p>
                </div>
              </div>
            </div>
          </div>

          <dl className="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/40 shadow-[var(--shadow-lift)] sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="bg-card/95 px-6 py-8 backdrop-blur-sm">
                <dt className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                  {s.label}
                </dt>
                <dd className="mt-2.5 font-display text-[1.75rem] font-semibold tracking-tight text-gradient-ember">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Impact */}
      <section className="mx-auto max-w-6xl px-5 pb-28 sm:px-6">
        <div>
          <p className="eyebrow">Impact</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Outcomes that matter</h2>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {impact.map((item) => (
            <div key={item.title} className="surface-card rounded-2xl p-6">
              <h3 className="text-[15px] font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-2.5 text-[14px] font-medium text-primary">{item.result}</p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Selected work */}
      <section className="mx-auto max-w-6xl px-5 pb-28 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Things I've shipped</h2>
          </div>
          <Link
            to="/projects"
            className="shrink-0 text-[13px] text-muted-foreground transition-colors hover:text-primary"
          >
            All projects →
          </Link>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {featured.map((p) => (
            <ProjectCard key={p.name} project={p} />
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-6">
        <p className="eyebrow">Skills</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">What I bring</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
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

      {/* Closing CTA */}
      <section className="mx-auto max-w-6xl px-5 pb-32 sm:px-6">
        <div className="surface-card overflow-hidden rounded-[1.75rem] p-8 sm:p-12">
          <p className="eyebrow">Next step</p>
          <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Looking for a data analyst who ships complete?
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground">
            Open to full-time roles in Bangalore, Hyderabad or remote. LinkedIn or email is the
            fastest way to reach me.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
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
          </div>
        </div>
      </section>
    </div>
  );
}
