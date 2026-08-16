import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/lib/data';

export function Work() {
  return (
    <section id="work" className="border-b border-line">
      <div className="mx-auto max-w-site px-5 py-20 md:px-8 md:py-28">
        <div className="mb-16 grid gap-4 md:grid-cols-[minmax(0,180px)_1fr] md:gap-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
            Nº002 / Work
          </p>
          <div>
            <h2 className="font-display text-display-md text-paper">Systems shipped</h2>
            <p className="mt-4 max-w-xl text-[15px] leading-[1.7] text-muted">
              Event platforms, constraint solvers, exam pipelines, client sites.
              Built for real use, not demos.
            </p>
          </div>
        </div>

        <ul className="border-t border-line">
          {projects.map((p, i) => (
            <li
              key={p.title}
              className="group grid gap-5 border-b border-line px-0 py-10 transition-colors duration-200 md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:gap-12 md:px-4 md:hover:bg-paper/[0.025]"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1.5">
                  <span className="font-mono text-[10px] tabular-nums text-paper/28">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-display-sm text-paper transition-colors duration-200 md:group-hover:text-accent">
                    {p.title}
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                    {p.outcome}
                  </span>
                </div>
                <p className="mt-3.5 max-w-2xl text-sm leading-[1.7] text-muted md:text-[15px]">
                  {p.description}
                </p>
                <p className="mt-3.5 font-mono text-[10px] uppercase tracking-[0.14em] text-paper/32">
                  {p.stack}
                </p>
              </div>

              <div className="flex shrink-0 flex-wrap gap-x-6 gap-y-2 md:pt-1">
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.16em] text-paper transition-colors duration-200 hover:text-accent"
                  >
                    Live
                    <ArrowUpRight size={12} strokeWidth={1.5} aria-hidden className="opacity-70" />
                    <span className="sr-only">(opens in new tab)</span>
                  </a>
                )}
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted transition-colors duration-200 hover:text-paper"
                  >
                    Source
                    <ArrowUpRight size={12} strokeWidth={1.5} aria-hidden className="opacity-70" />
                    <span className="sr-only">(opens in new tab)</span>
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
