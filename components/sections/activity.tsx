import { profile } from '@/lib/data';

export function Activity() {
  return (
    <section id="activity" className="border-b border-line">
      <div className="mx-auto max-w-site px-5 py-20 md:px-8 md:py-28">
        <div className="mb-12 grid gap-4 md:grid-cols-[minmax(0,180px)_1fr] md:gap-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
            Nº005 / Activity
          </p>
          <div>
            <h2 className="font-display text-display-md text-paper">GitHub</h2>
            <p className="mt-3 text-sm text-muted">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-paper underline-offset-4 hover:underline"
              >
                github.com/{profile.handle}
              </a>
            </p>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-3 gap-6 border-t border-line pt-8">
          <div>
            <p className="font-display text-2xl font-medium tracking-tight text-paper md:text-3xl">
              659
            </p>
            <p className="mt-1 text-[13px] text-muted">Contributions</p>
            <p className="mt-0.5 font-mono text-[11px] text-muted/70">
              Last 12 months
            </p>
          </div>
          <div>
            <p className="font-display text-2xl font-medium tracking-tight text-paper md:text-3xl">
              Active
            </p>
            <p className="mt-1 text-[13px] text-muted">Current streak</p>
            <p className="mt-0.5 font-mono text-[11px] text-muted/70">
              Daily since late July
            </p>
          </div>
          <div>
            <p className="font-display text-2xl font-medium tracking-tight text-paper md:text-3xl">
              15+
            </p>
            <p className="mt-1 text-[13px] text-muted">Repos
            </p>
            <p className="mt-0.5 font-mono text-[11px] text-muted/70">
              Public projects
            </p>
          </div>
        </div>

        <div className="border border-line p-3 md:p-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://ghchart.rshah.org/c4a574/${profile.handle}`}
            alt={`GitHub contribution activity for ${profile.handle}`}
            className="h-auto w-full"
            loading="lazy"
            width={663}
            height={104}
          />
        </div>

        <p className="mt-4 font-mono text-[10px] text-muted/60">
          Chart updates automatically from GitHub. Numbers above are current as of August 2026.
        </p>
      </div>
    </section>
  );
}
