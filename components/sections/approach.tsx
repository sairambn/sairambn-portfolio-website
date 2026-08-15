import { principles } from '@/lib/data';

export function Approach() {
  return (
    <section id="approach" className="border-b border-line">
      <div className="mx-auto max-w-site px-5 py-20 md:px-8 md:py-28">
        <div className="mb-16 grid gap-4 md:grid-cols-[minmax(0,180px)_1fr] md:gap-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
            Nº003 / Approach
          </p>
          <div>
            <h2 className="font-display text-display-md text-paper">How I work</h2>
            <p className="mt-4 max-w-lg text-[15px] leading-[1.65] text-muted">
              Four habits. Correct systems, finished work.
            </p>
          </div>
        </div>

        <ol className="grid border-t border-line md:grid-cols-2">
          {principles.map((p) => (
            <li
              key={p.title}
              className="border-b border-line py-8 md:odd:pr-10 md:even:border-l md:even:pl-10"
            >
              <p className="font-mono text-[10px] text-accent">Nº{p.index}</p>
              <h3 className="mt-2 font-display text-xl font-medium tracking-tight text-paper">
                {p.title}
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-[1.65] text-muted">{p.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
