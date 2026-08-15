import { skillGroups } from '@/lib/data';

export function Stack() {
  return (
    <section id="stack" className="border-b border-line">
      <div className="mx-auto max-w-site px-5 py-20 md:px-8 md:py-28">
        <div className="mb-14 grid gap-4 md:grid-cols-[minmax(0,180px)_1fr] md:gap-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
            Nº004 / Stack
          </p>
          <h2 className="font-display text-display-md font-semibold text-paper">
            Languages & tools
          </h2>
        </div>

        <div className="grid gap-12 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {skillGroups.map((g) => (
            <div key={g.title}>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                {g.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="font-display text-[15px] text-paper md:text-base"
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
