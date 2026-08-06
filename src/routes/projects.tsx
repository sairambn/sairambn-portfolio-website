import { createFileRoute } from "@tanstack/react-router";
import { projects, profile } from "@/data/portfolio";
import { ProjectCard } from "@/components/project-card";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Sairam Nagarajan | Software Engineer" },
      {
        name: "description",
        content:
          "Projects by Sairam Nagarajan: constraint scheduling engine, result analysis system, daily NeetCode 250, and production client sites.",
      },
      { property: "og:title", content: "Projects — Sairam Nagarajan" },
      {
        property: "og:description",
        content:
          "Constraint solvers, data systems, daily DSA practice, and production TypeScript products.",
      },
      { property: "og:image", content: "https://bnsairam.vercel.app/content.png" },
    ],
  }),
  component: Projects,
});

function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24">
      <p className="eyebrow">Work</p>
      <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-[3.5rem]">
        Systems I've shipped.
      </h1>
      <p className="mt-6 max-w-2xl text-[17px] leading-[1.7] text-muted-foreground">
        Constraint engines, analysis pipelines, production client sites, and daily algorithm
        practice — open on GitHub, with live demos where available.
      </p>

      <div className="mt-10 flex flex-wrap gap-2.5">
        {["Algorithms", "TypeScript", "DSA", "Production", "Python"].map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border/70 bg-secondary/30 px-3.5 py-1.5 font-mono text-[12px] text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      <h2 className="mt-16 text-xl font-semibold tracking-tight text-foreground/90">Featured</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((p) => (
          <ProjectCard key={p.name} project={p} />
        ))}
      </div>

      {rest.length > 0 && (
        <>
          <h2 className="mt-16 text-xl font-semibold tracking-tight text-foreground/90">
            Also shipped
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {rest.map((p) => (
              <ProjectCard key={p.name} project={p} />
            ))}
          </div>
        </>
      )}

      <div className="mt-20 flex flex-col items-center gap-4 text-center">
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border/80 px-8 py-3.5 text-[14px] font-medium transition-all duration-300 hover:border-primary/35 hover:bg-secondary/60"
        >
          See everything on GitHub
          <span aria-hidden="true">↗</span>
        </a>
        <a
          href={profile.leetcode}
          target="_blank"
          rel="noreferrer"
          className="text-[13px] text-muted-foreground transition-colors hover:text-primary"
        >
          Daily practice on LeetCode →
        </a>
      </div>
    </div>
  );
}
