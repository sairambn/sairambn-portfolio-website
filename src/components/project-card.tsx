import type { Project } from "@/data/portfolio";

export function ProjectCard({ project }: { project: Project }) {
  const href = project.live || project.url;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="surface-card group flex flex-col rounded-2xl p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          {project.outcome && (
            <p className="font-mono text-[11px] tracking-wider text-primary uppercase">
              {project.outcome}
            </p>
          )}
          <h3 className="mt-1.5 text-lg font-semibold transition-colors group-hover:text-primary">
            {project.title}
          </h3>
        </div>
        <span
          className="shrink-0 font-mono text-sm text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
          aria-hidden="true"
        >
          ↗
        </span>
      </div>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {project.description}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-border px-2.5 py-1 font-mono text-xs text-muted-foreground">
          {project.language}
        </span>
        {project.tags?.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border/80 px-2.5 py-1 font-mono text-xs text-muted-foreground"
          >
            {tag}
          </span>
        ))}
        {project.stars > 0 && (
          <span className="font-mono text-xs text-muted-foreground">★ {project.stars}</span>
        )}
        {project.live && (
          <span className="ml-auto rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 font-mono text-xs text-primary">
            Live
          </span>
        )}
      </div>
    </a>
  );
}
