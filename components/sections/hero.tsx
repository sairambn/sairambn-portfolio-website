'use client';

import dynamic from 'next/dynamic';
import { profile, stats } from '@/lib/data';
import { Button } from '@/components/ui/button';

const VoxelTopographyGrid = dynamic(
  () => import('@/components/ui/voxel-topography-grid').then((m) => m.VoxelTopographyGrid),
  { ssr: false }
);

export function Hero() {
  return (
    <section
      id="intro"
      className="relative min-h-[100svh] overflow-hidden border-b border-line"
    >
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <VoxelTopographyGrid
          primaryColor="#c4a574"
          wireColor="rgba(196, 165, 116, 0.22)"
          tileSize={30}
          maxHeight={64}
          speed={0.012}
        />
      </div>
      {/* Soft vignette so type stays legible */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-canvas via-canvas/40 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-canvas/80 via-transparent to-canvas/60" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-site flex-col justify-end px-5 pb-16 pt-28 md:px-8 md:pb-24">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
          Nº001 / Intro
        </p>

        <h1 className="font-display text-display-xl font-semibold text-paper">
          {profile.shortName}
        </h1>

        <p className="mt-4 max-w-xl text-lg text-paper/80 md:text-xl">
          {profile.headline}
        </p>

        <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted md:text-base">
          {profile.tagline}
        </p>

        <p className="mt-6 font-mono text-xs uppercase tracking-[0.16em] text-accent">
          {profile.openTo}
        </p>

        <div className="mt-10 flex flex-wrap gap-10 border-t border-line/80 pt-8">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                {s.label}
              </p>
              <p className="mt-1 font-display text-lg font-medium text-paper md:text-xl">
                {s.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild>
            <a href="#work">View work</a>
          </Button>
          <Button variant="outline" asChild>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </Button>
          <Button variant="ghost" asChild>
            <a href={`mailto:${profile.email}`}>Email</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
