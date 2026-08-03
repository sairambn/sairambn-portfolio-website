import { createFileRoute } from "@tanstack/react-router";
import { profile, skills, impact } from "@/data/portfolio";

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
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-20">
      <p className="eyebrow">About</p>
      <div className="mt-6 grid gap-10 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-start">
        <img
          src={profile.avatar}
          alt={`Portrait of ${profile.name}`}
          loading="lazy"
          className="h-28 w-28 shrink-0 rounded-2xl border border-border object-cover shadow-[var(--shadow-lift)]"
        />
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
          <h2 className="text-lg font-semibold">How I work</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Start from the decision the dashboard has to support. Model the data properly, keep the
            SQL and DAX fast, then cut every visual that doesn't earn its space. Ship complete — from
            raw data to published report and real user adoption.
          </p>
        </div>
        <div className="surface-card rounded-2xl p-6">
          <h2 className="text-lg font-semibold">Right now</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {profile.education}. {profile.openTo} — plus daily algorithm practice and full-stack
            side projects on GitHub. Looking for Data Analyst / BI Analyst roles.
          </p>
        </div>
      </div>

      <h2 className="mt-16 text-2xl font-bold">Impact highlights</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {impact.slice(0, 4).map((item) => (
          <div key={item.title} className="surface-card rounded-2xl p-5">
            <h3 className="text-sm font-semibold">{item.title}</h3>
            <p className="mt-1.5 text-sm text-primary">{item.result}</p>
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
    </div>
  );
}
