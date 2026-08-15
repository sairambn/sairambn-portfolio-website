import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/lib/data';

export function Work() {
  return (
    <section id="work" className="border-b border-line">
      <div className="mx-auto max-w-site px-5 py-20 md:px-8 md:py-28">
        <div className="mb-16 grid gap-4 md:grid-cols-[minmax(0,180px)_1fr] md:gap-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
            Nº002 / Work
          </p>
          <div>
            <h2 className="font-display text-display-md font-semibold text-paper">
              Systems shipped
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
              Event platforms, constraint solvers, exam pipelines, client sites.
              Built for real use, not demos.
            </p>
          </div>
        </div>

        <ul className="divide-y divide-line border-t border-line">
          {projects.map((p, i) => (
            <li
              key={p.title}
              className="grid gap-5 py-9 md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:gap-12"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-mono text-[11px] text-paper/30">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-xl font-medium text-paper md:text-2xl">
                    {p.title}
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                    {p.outcome}
                  </span>
                </div>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted md:text-[15px]">
                  {p.description}
                </p>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-paper/35">
                  {p.stack}
                </p>
              </div>

              <div className="flex shrink-0 flex-wrap gap-x-5 gap-y-2 md:pt-1">
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.14em] text-paper transition-colors hover:text-accent"
                  >
                    Live <ArrowUpRight size={13} strokeWidth={1.5} />
                  </a>
                )}
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-paper"
                  >
                    Source <ArrowUpRight size={13} strokeWidth={1.5} />
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
