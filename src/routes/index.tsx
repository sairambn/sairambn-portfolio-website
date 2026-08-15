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
      { title: "Sairam Nagarajan — Software Engineer" },
      {
        name: "description",
        content:
          "Software engineer from CEG Chennai. Python, Java, daily DSA. Open to SDE roles in Bangalore, Hyderabad or remote.",
      },
      { property: "og:title", content: "Sairam Nagarajan — Software Engineer" },
      {
        property: "og:description",
        content: "Python, Java, daily DSA. Ships systems people use.",
      },
      { property: "og:image", content: "https://bnsairam.vercel.app/content.png" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://bnsairam.vercel.app" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://bnsairam.vercel.app/content.png" },
      { name: "theme-color", content: "#f7f6f3" },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-5 pt-12 sm:px-6 sm:pt-16 lg:pt-20">
        <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div>
            <p className="font-mono text-[12px] text-muted-foreground">
              {profile.education}
            </p>
            <h1 className="mt-4 text-[2.4rem] font-semibold tracking-tight sm:text-[3rem] lg:text-[3.25rem]">
              {profile.name}
            </h1>
            <p className="mt-3 text-[17px] text-muted-foreground sm:text-[18px]">
              {profile.headline}
            </p>
            <p className="mt-6 max-w-md text-[15.5px] leading-relaxed text-muted-foreground">
              {profile.tagline}
            </p>
            <p className="mt-3 font-mono text-[12px] text-muted-foreground/80">
              {profile.openTo}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/projects"
                className="rounded-md bg-foreground px-4 py-2.5 text-[13.5px] font-medium text-background transition-opacity hover:opacity-85"
              >
                View work
              </Link>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-border bg-card px-4 py-2.5 text-[13.5px] font-medium transition-colors hover:border-[#c9c7c0]"
              >
                LinkedIn
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="rounded-md border border-border bg-card px-4 py-2.5 text-[13.5px] font-medium transition-colors hover:border-[#c9c7c0]"
              >
                Email
              </a>
            </div>

            <dl className="mt-12 grid grid-cols-3 gap-4 border-t border-border pt-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="font-mono text-[11px] text-muted-foreground">{s.label}</dt>
                  <dd className="mt-1 text-[14px] font-semibold tracking-tight sm:text-[15px]">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="hero-frame">
            <img
              src={profile.avatar}
              alt={`${profile.name} at College of Engineering Guindy`}
              width={800}
              height={1000}
              className="aspect-[4/5] w-full object-cover object-[center_20%]"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* Live systems */}
      <section className="mx-auto max-w-5xl px-5 pt-20 sm:px-6 sm:pt-28">
        <p className="eyebrow">Built</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-[1.85rem]">
          What is live
        </h2>
        <div className="mt-10 divide-y divide-border border-t border-border">
          {impact.map((item) => (
            <div key={item.title} className="grid gap-2 py-6 sm:grid-cols-[200px_1fr] sm:gap-8">
              <div>
                <h3 className="text-[15px] font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-1 font-mono text-[12px] text-muted-foreground">{item.result}</p>
              </div>
              <p className="text-[14.5px] leading-relaxed text-muted-foreground">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="mx-auto max-w-5xl px-5 pt-16 sm:px-6 sm:pt-24">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Projects</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-[1.85rem]">
              Selected work
            </h2>
          </div>
          <Link to="/projects" className="text-[13px] text-muted-foreground hover:text-foreground">
            All →
          </Link>
        </div>
        <div className="mt-6 border-t border-border">
          {featured.map((p) => (
            <ProjectCard key={p.name} project={p} />
          ))}
        </div>
      </section>

      {/* Approach */}
      <section className="mx-auto max-w-5xl px-5 pt-16 sm:px-6 sm:pt-24">
        <p className="eyebrow">Approach</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-[1.85rem]">
          How I work
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {principles.map((p, i) => (
            <div key={p.title} className="border-t border-border pt-5">
              <p className="font-mono text-[12px] text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-[16px] font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mx-auto max-w-5xl px-5 pt-16 sm:px-6 sm:pt-24">
        <p className="eyebrow">Skills</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-[1.85rem]">Stack</h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-[13px] font-semibold tracking-tight">{group.title}</h3>
              <ul className="mt-3 space-y-1.5">
                {group.items.map((item) => (
                  <li key={item} className="text-[14px] text-muted-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <div className="pt-16 sm:pt-24">
        <GitHubStats />
      </div>

      {/* Contact */}
      <section className="mx-auto max-w-5xl px-5 pb-24 sm:px-6 sm:pb-32">
        <div className="border-t border-border pt-12">
          <p className="eyebrow">Contact</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-[1.85rem]">
            Open to SDE roles
          </h2>
          <p className="mt-3 max-w-md text-[15px] text-muted-foreground">
            Bangalore, Hyderabad, or remote. LinkedIn or email works best.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-md bg-foreground px-4 py-2.5 text-[13.5px] font-medium text-background transition-opacity hover:opacity-85"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="rounded-md border border-border bg-card px-4 py-2.5 text-[13.5px] font-medium transition-colors hover:border-[#c9c7c0]"
            >
              Email
            </a>
            <Link
              to="/contact"
              className="rounded-md border border-border bg-card px-4 py-2.5 text-[13.5px] font-medium transition-colors hover:border-[#c9c7c0]"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
