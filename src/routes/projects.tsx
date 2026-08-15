import { createFileRoute } from "@tanstack/react-router";
import { projects, profile } from "@/data/portfolio";
import { ProjectCard } from "@/components/project-card";
import { ConnoisseurStackInteractor } from "@/components/ui/connoisseur-stack-interactor";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Sairam Nagarajan" },
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
    <div className="mx-auto max-w-5xl px-5 py-14 sm:px-6 sm:py-20">
      <p className="eyebrow">Work</p>
      <h1 className="mt-2 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
        Systems I've shipped
      </h1>
      <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-muted-foreground">
        Constraint engines, analysis pipelines, production client sites, and daily algorithm
        practice.
      </p>

      <div className="mt-10">
        <ConnoisseurStackInteractor />
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {["Algorithms", "TypeScript", "DSA", "Production", "Python"].map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border bg-card px-3 py-1 font-mono text-[11.5px] text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      <h2 className="mt-16 text-lg font-semibold tracking-tight">Featured</h2>
      <div className="mt-4 border-t border-border">
        {featured.map((p) => (
          <ProjectCard key={p.name} project={p} />
        ))}
      </div>

      {rest.length > 0 && (
        <>
          <h2 className="mt-14 text-lg font-semibold tracking-tight">Also shipped</h2>
          <div className="mt-4 border-t border-border">
            {rest.map((p) => (
              <ProjectCard key={p.name} project={p} />
            ))}
          </div>
        </>
      )}

      <div className="mt-16 flex flex-col gap-3 border-t border-border pt-10 sm:flex-row sm:items-center sm:justify-between">
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="text-[14px] font-medium hover:underline hover:underline-offset-4"
        >
          Everything on GitHub →
        </a>
        <a
          href={profile.leetcode}
          target="_blank"
          rel="noreferrer"
          className="text-[13px] text-muted-foreground hover:text-foreground"
        >
          Daily practice on LeetCode →
        </a>
      </div>
    </div>
  );
}
