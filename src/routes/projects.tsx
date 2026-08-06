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
  return (
    <div className="mx-auto max-w-6xl px-5 py-20 sm:px-6">
      <p className="eyebrow">Work</p>
      <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
        Systems I've shipped.
      </h1>
      <p className="mt-5 max-w-2xl text-[17px] leading-[1.65] text-muted-foreground">
        Constraint engines, analysis pipelines, production client sites, and daily algorithm
        practice — all open on GitHub with live demos where available.
      </p>

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.name} project={p} />
        ))}
      </div>

      <div className="mt-16 text-center">
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border/80 px-7 py-3 text-[14px] font-medium transition-all duration-300 hover:border-primary/30 hover:bg-secondary/60"
        >
          See everything on GitHub
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );
}
