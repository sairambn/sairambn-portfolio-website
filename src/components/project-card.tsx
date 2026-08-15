import type { Project } from "@/data/portfolio";

export function ProjectCard({ project }: { project: Project }) {
  const href = project.live || project.url;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex flex-col border-t border-border py-6 transition-colors first:border-t-0 sm:first:border-t"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          {project.outcome && (
            <p className="font-mono text-[11px] text-muted-foreground">{project.outcome}</p>
          )}
          <h3 className="mt-1 text-[16px] font-semibold tracking-tight group-hover:underline group-hover:underline-offset-4">
            {project.title}
          </h3>
        </div>
        <span className="shrink-0 text-muted-foreground" aria-hidden>
          ↗
        </span>
      </div>
      <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-muted-foreground">
        {project.description}
      </p>
      <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] text-muted-foreground">
        <span>{project.language}</span>
        {project.live && <span>Live</span>}
        {project.stars > 0 && <span>★ {project.stars}</span>}
      </div>
    </a>
  );
}
