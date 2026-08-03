import { createFileRoute } from "@tanstack/react-router";
import { projects } from "@/data/portfolio";
import { ProjectCard } from "@/components/project-card";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Sairam BN" },
      {
        name: "description",
        content:
          "Open-source projects by Sairam BN: a master timetable generator, an AI/ML stats portal, daily NeetCode 250 solutions and more.",
      },
      { property: "og:title", content: "Projects — Sairam BN" },
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
      <p className="mt-5 max-w-2xl text-muted-foreground">
        Each of these lives on GitHub — code, commits and all. Click through to read the source.
      </p>
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.name} project={p} />
        ))}
      </div>
    </div>
  );
}
