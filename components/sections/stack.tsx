import { skillGroups } from '@/lib/data';

export function Stack() {
  return (
    <section id="stack" className="border-b border-line">
      <div className="mx-auto max-w-site px-5 py-20 md:px-8 md:py-28">
        <div className="mb-14 grid gap-6 md:grid-cols-[minmax(0,200px)_1fr]">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            Nº004 / Stack
          </p>
          <h2 className="font-display text-display-md font-semibold text-paper">
            Languages & tools
          </h2>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((g) => (
            <div key={g.title}>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                {g.title}
              </p>
              <ul className="mt-4 space-y-2">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="font-display text-base text-paper/90 md:text-lg"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
