import { profile } from '@/lib/data';

export function Activity() {
  return (
    <section id="activity" className="border-b border-line">
      <div className="mx-auto max-w-site px-5 py-20 md:px-8 md:py-28">
        <div className="mb-12 grid gap-4 md:grid-cols-[minmax(0,180px)_1fr] md:gap-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
            Nº005 / Activity
          </p>
          <div>
            <h2 className="font-display text-display-md font-semibold text-paper">
              GitHub
            </h2>
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
      </div>
    </section>
  );
}
