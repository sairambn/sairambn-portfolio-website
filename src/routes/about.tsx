import { createFileRoute, Link } from "@tanstack/react-router";
import { profile, skills, impact, principles } from "@/data/portfolio";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Sairam Nagarajan — Data Analyst in Chennai" },
      {
        name: "description",
        content:
          "About Sairam Nagarajan: Chennai-based data analyst (M.E. CEG '25) working in Power BI, SQL and Python to ship dashboards teams use daily.",
      },
      { property: "og:title", content: "About Sairam Nagarajan" },
      {
        property: "og:description",
        content: "Data analyst in Power BI, SQL and Python. M.E. CEG '25, based in Chennai.",
      },
      { property: "og:image", content: "https://bnsairam.vercel.app/content.png" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-20">
      <p className="eyebrow">About</p>
      <div className="mt-8 grid gap-10 sm:grid-cols-[260px_minmax(0,1fr)] sm:items-start">
        <div className="relative">
          <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-primary/25 via-transparent to-primary/10 blur-xl" />
          <img
            src={profile.avatar}
            alt={`Portrait of ${profile.name}`}
            loading="lazy"
            width={260}
            height={340}
            className="relative aspect-[3/4] w-full rounded-2xl border border-border object-cover object-[center_15%] shadow-[var(--shadow-lift)]"
          />
        </div>
        <div className="min-w-0">
          <h1 className="text-4xl font-bold sm:text-5xl">{profile.name}</h1>
          <p className="mt-2 font-mono text-xs tracking-wider text-muted-foreground">
            {profile.headline}
          </p>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{profile.bio}</p>
        </div>
      </div>

      <div className="mt-16 grid gap-5 sm:grid-cols-2">
        <div className="surface-card rounded-2xl p-6">
          <h2 className="text-lg font-semibold">Based in</h2>
          <p className="mt-2 text-sm text-muted-foreground">{profile.location}</p>
          <p className="mt-1 text-sm text-muted-foreground">{profile.openTo}</p>
        </div>
        <div className="surface-card rounded-2xl p-6">
          <h2 className="text-lg font-semibold">Education</h2>
          <p className="mt-2 text-sm text-muted-foreground">{profile.education}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Daily algorithm practice + full-stack side projects on GitHub.
          </p>
        </div>
      </div>

      <h2 className="mt-16 text-2xl font-bold">How I work</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {principles.map((p) => (
          <div key={p.title} className="surface-card rounded-2xl p-5">
            <h3 className="text-sm font-semibold">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-16 text-2xl font-bold">Impact highlights</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {impact.slice(0, 4).map((item) => (
          <div key={item.title} className="surface-card rounded-2xl p-5">
            <h3 className="text-sm font-semibold">{item.title}</h3>
            <p className="mt-1.5 text-sm text-primary">{item.result}</p>
            <p className="mt-1.5 text-sm text-muted-foreground">{item.detail}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-16 text-2xl font-bold">Skills</h2>
      <div className="mt-5 flex flex-wrap gap-2.5">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-border bg-secondary/40 px-4 py-2 text-sm text-muted-foreground"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-16 flex flex-wrap gap-3">
        <Link
          to="/projects"
          className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5"
        >
          See the work
        </Link>
        <Link
          to="/contact"
          className="rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:border-primary/30 hover:bg-secondary"
        >
          Get in touch
        </Link>
      </div>
    </div>
  );
}
