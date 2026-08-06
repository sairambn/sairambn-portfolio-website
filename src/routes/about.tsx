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
    <div className="mx-auto max-w-4xl px-5 py-20 sm:px-6">
      <p className="eyebrow">About</p>
      <div className="mt-10 grid gap-12 sm:grid-cols-[240px_minmax(0,1fr)] sm:items-start">
        <div className="relative">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-primary/8 blur-2xl" />
          <img
            src={profile.avatar}
            alt={`Portrait of ${profile.name}`}
            loading="lazy"
            width={240}
            height={320}
            className="relative aspect-[3/4] w-full rounded-2xl border border-border/50 object-cover object-[center_12%] shadow-[var(--shadow-lift)]"
          />
        </div>
        <div className="min-w-0">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{profile.name}</h1>
          <p className="mt-2.5 font-mono text-[11px] tracking-[0.16em] text-muted-foreground">
            {profile.headline}
          </p>
          <p className="mt-6 text-[16px] leading-[1.7] text-muted-foreground">{profile.bio}</p>
        </div>
      </div>

      <div className="mt-16 grid gap-4 sm:grid-cols-2">
        <div className="surface-card rounded-2xl p-6">
          <h2 className="text-[15px] font-semibold tracking-tight">Based in</h2>
          <p className="mt-2 text-[13.5px] text-muted-foreground">{profile.location}</p>
          <p className="mt-1 text-[13.5px] text-muted-foreground">{profile.openTo}</p>
        </div>
        <div className="surface-card rounded-2xl p-6">
          <h2 className="text-[15px] font-semibold tracking-tight">Education</h2>
          <p className="mt-2 text-[13.5px] text-muted-foreground">{profile.education}</p>
          <p className="mt-1 text-[13.5px] text-muted-foreground">
            Daily algorithm practice + full-stack side projects on GitHub.
          </p>
        </div>
      </div>

      <h2 className="mt-16 text-2xl font-semibold tracking-tight">How I work</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {principles.map((p) => (
          <div key={p.title} className="surface-card rounded-2xl p-5">
            <h3 className="text-[14px] font-semibold tracking-tight">{p.title}</h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">{p.body}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-16 text-2xl font-semibold tracking-tight">Impact highlights</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {impact.slice(0, 4).map((item) => (
          <div key={item.title} className="surface-card rounded-2xl p-5">
            <h3 className="text-[14px] font-semibold tracking-tight">{item.title}</h3>
            <p className="mt-1.5 text-[13.5px] text-primary">{item.result}</p>
            <p className="mt-1.5 text-[13px] text-muted-foreground">{item.detail}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-16 text-2xl font-semibold tracking-tight">Skills</h2>
      <div className="mt-6 flex flex-wrap gap-2.5">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-border/70 bg-secondary/40 px-4 py-2 text-[13px] text-muted-foreground"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-16 flex flex-wrap gap-3">
        <Link
          to="/projects"
          className="rounded-full bg-primary px-7 py-3 text-[14px] font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5"
        >
          See the work
        </Link>
        <Link
          to="/contact"
          className="rounded-full border border-border/80 px-6 py-3 text-[14px] font-medium transition-all duration-300 hover:border-primary/30 hover:bg-secondary/60"
        >
          Get in touch
        </Link>
      </div>
    </div>
  );
}
