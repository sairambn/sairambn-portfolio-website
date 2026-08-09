import type { Project } from "@/data/portfolio";

export function ProjectCard({ project }: { project: Project }) {
  const href = project.live || project.url;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="surface-card group flex flex-col rounded-xl p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          {project.outcome && (
            <p className="font-mono text-[10px] tracking-[0.14em] text-primary uppercase">
              {project.outcome}
            </p>
          )}
          <h3 className="mt-2 text-[16px] font-semibold tracking-tight transition-colors duration-200 group-hover:text-primary">
            {project.title}
          </h3>
        </div>
        <span
          className="shrink-0 text-[15px] text-muted-foreground transition-all duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
          aria-hidden="true"
        >
          ↗
        </span>
      </div>

      <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-muted-foreground">
        {project.description}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-1.5">
        <span className="rounded-full border border-border/60 px-2.5 py-0.5 font-mono text-[10.5px] text-muted-foreground">
          {project.language}
        </span>
        {project.tags?.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border/50 px-2.5 py-0.5 font-mono text-[10.5px] text-muted-foreground"
          >
            {tag}
          </span>
        ))}
        {project.stars > 0 && (
          <span className="font-mono text-[10.5px] text-muted-foreground">★ {project.stars}</span>
        )}
        {project.live && (
          <span className="ml-auto rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 font-mono text-[10.5px] text-primary">
            Live
          </span>
        )}
      </div>
    </a>
  );
}
