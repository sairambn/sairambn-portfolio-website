import { createFileRoute } from "@tanstack/react-router";
import { projects, profile } from "@/data/portfolio";
import { ProjectCard } from "@/components/project-card";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Sairam Nagarajan" },
      {
        name: "description",
        content:
          "Open-source projects by Sairam Nagarajan: a master timetable generator, an AI/ML stats portal, daily NeetCode 250 solutions and more.",
      },
      { property: "og:title", content: "Projects — Sairam Nagarajan" },
      {
        property: "og:description",
        content: "Scheduling engines, dashboards, growth sites and daily algorithm practice.",
      },
    ],
  }),
  component: Projects,
});

function Projects() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-20">
      <p className="eyebrow">Work</p>
      <h1 className="mt-4 text-4xl font-bold sm:text-6xl">Every project, in the open.</h1>
      <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
        Client sites, internal tools, and daily practice — all on GitHub. Live demos where available.
      </p>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.name} project={p} />
        ))}
      </div>

      <div className="mt-16 text-center">
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:border-primary/30 hover:bg-secondary"
        >
          See everything on GitHub
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );
}
