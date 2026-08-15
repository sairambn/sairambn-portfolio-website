import { principles } from '@/lib/data';

export function Approach() {
  return (
    <section id="approach" className="border-b border-line">
      <div className="mx-auto max-w-site px-5 py-20 md:px-8 md:py-28">
        <div className="mb-16 grid gap-6 md:grid-cols-[minmax(0,200px)_1fr]">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            Nº003 / Approach
          </p>
          <div>
            <h2 className="font-display text-display-md font-semibold text-paper">
              How I work
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
              Four habits. Correct systems, finished work.
            </p>
          </div>
        </div>

        <ol className="grid gap-0 md:grid-cols-2 md:gap-x-12">
          {principles.map((p) => (
            <li key={p.title} className="border-t border-line py-8">
              <p className="font-mono text-[11px] text-accent">Nº{p.index}</p>
              <h3 className="mt-2 font-display text-xl font-medium text-paper">
                {p.title}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
                {p.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
