import { ArrowUpRight } from 'lucide-react';
import { activitySignal, profile } from '@/lib/data';

const levelClass = (level: number) => {
  if (level >= 3) return 'bg-accent';
  if (level === 2) return 'bg-accent/55';
  if (level === 1) return 'bg-accent/25';
  return 'bg-line';
};

export function Activity() {
  return (
    <section id="activity" className="border-b border-line">
      <div className="mx-auto max-w-site px-5 py-20 md:px-8 md:py-28">
        <div className="mb-16 grid gap-4 md:grid-cols-[minmax(0,180px)_1fr] md:gap-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
            Nº005 / Activity
          </p>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="font-display text-display-md text-paper">
                Practice & shipping
              </h2>
              <p className="mt-4 max-w-xl text-[15px] leading-[1.65] text-muted">
                {activitySignal.focus}
              </p>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                Active since {activitySignal.since}
                <span className="mx-2 text-line">·</span>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-paper transition-colors hover:text-accent"
                >
                  github.com/{profile.handle}
                </a>
              </p>
            </div>

            {/* Compact recent intensity — honest 4-week view */}
            <div className="flex flex-col items-end gap-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                Recent intensity
              </p>
              <div className="flex items-end gap-1.5" aria-hidden>
                {activitySignal.recentWeeks.map((w) => (
                  <div key={w.label} className="flex flex-col items-center gap-1.5">
                    <div
                      className={`h-8 w-3 rounded-sm md:h-10 md:w-3.5 ${levelClass(w.level)}`}
                      title={`${w.label}: level ${w.level}`}
                    />
                    <span className="font-mono text-[9px] text-muted/70">{w.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 border-t border-line pt-10 md:grid-cols-3 md:gap-10">
          {activitySignal.metrics.map((m) => (
            <div key={m.label}>
              <p className="font-display text-2xl font-medium tracking-tight text-paper md:text-3xl">
                {m.value}
              </p>
              <p className="mt-1.5 text-[13px] text-muted">{m.label}</p>
              <p className="mt-0.5 font-mono text-[11px] text-muted/70">{m.note}</p>
            </div>
          ))}
        </div>

        <ul className="mt-14 border-t border-line">
          {activitySignal.lanes.map((lane, i) => (
            <li
              key={lane.title}
              className="grid gap-3 border-b border-line py-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:gap-10"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-mono text-[10px] text-paper/30">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-display-sm text-paper">
                    {lane.title}
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                    {lane.tag}
                  </span>
                </div>
                <p className="mt-3 max-w-2xl text-sm leading-[1.65] text-muted md:text-[15px]">
                  {lane.body}
                </p>
              </div>
              <a
                href={lane.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-1 self-start font-mono text-[10px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-paper md:pt-1"
              >
                Open <ArrowUpRight size={13} strokeWidth={1.5} aria-hidden />
                <span className="sr-only">(opens in new tab)</span>
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-10 font-mono text-[10px] leading-relaxed tracking-wide text-muted/60">
          No year-long empty calendar. Signal is what ships and what is practiced daily.
        </p>
      </div>
    </section>
  );
}
