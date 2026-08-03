import type { Project } from "@/data/portfolio";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noreferrer"
      className="surface-card group flex flex-col rounded-2xl p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="min-w-0 text-lg font-semibold">{project.title}</h3>
        <span className="shrink-0 font-mono text-xs text-muted-foreground transition-colors group-hover:text-primary">
          ↗
        </span>
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {project.description}
      </p>
      <div className="mt-6 flex items-center gap-3 font-mono text-xs text-muted-foreground">
        <span className="rounded-full border border-border px-2.5 py-1">{project.language}</span>
        {project.stars > 0 && <span>★ {project.stars}</span>}
      </div>
    </a>
  );
}
