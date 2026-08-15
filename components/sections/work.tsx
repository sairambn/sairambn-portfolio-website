import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/lib/data';

export function Work() {
  return (
    <section id="work" className="border-b border-line">
      <div className="mx-auto max-w-site px-5 py-20 md:px-8 md:py-28">
        <div className="mb-14 grid gap-6 md:grid-cols-[minmax(0,200px)_1fr]">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            Nº002 / Work
          </p>
          <div>
            <h2 className="font-display text-display-md font-semibold text-paper">
              Systems shipped
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
              Event platforms, constraint solvers, exam pipelines, client sites.
              Built for real use, not demos.
            </p>
          </div>
        </div>

        <ul className="divide-y divide-line">
          {projects.map((p, i) => (
            <li
              key={p.title}
              className="grid gap-4 py-8 md:grid-cols-[minmax(0,1fr)_140px_100px] md:items-start md:gap-8"
            >
              <div>
                <div className="flex flex-wrap items-baseline gap-3">
                  <h3 className="font-display text-xl font-medium text-paper md:text-2xl">
                    {p.title}
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                    {p.outcome}
                  </span>
                </div>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted md:text-[15px]">
                  {p.description}
                </p>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-paper/40">
                  {p.stack}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 md:justify-end">
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.14em] text-paper transition-colors hover:text-accent"
                  >
                    Live <ArrowUpRight size={14} />
                  </a>
                )}
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:text-paper"
                  >
                    Source <ArrowUpRight size={14} />
                  </a>
                )}
              </div>

              <p className="hidden font-mono text-[11px] text-paper/25 md:block md:text-right">
                {String(i + 1).padStart(2, '0')}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
