'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
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
      <div className="pointer-events-none absolute inset-0 opacity-50 md:opacity-60">
        <VoxelTopographyGrid
          primaryColor="#c4a574"
          wireColor="rgba(196, 165, 116, 0.2)"
          tileSize={30}
          maxHeight={64}
          speed={0.012}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-canvas via-canvas/50 to-canvas/20" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-canvas via-canvas/70 to-transparent md:via-canvas/40" />

      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-site grid-cols-1 items-end gap-8 px-5 pb-14 pt-24 md:grid-cols-12 md:gap-10 md:px-8 md:pb-20 md:pt-28">
        {/* Copy column */}
        <div className="md:col-span-7 lg:col-span-7">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            Nº001 / Intro
          </p>

          <h1 className="font-display text-display-xl font-semibold text-paper">
            {profile.shortName}
          </h1>

          <p className="mt-4 max-w-xl text-lg text-paper/85 md:text-xl">
            {profile.headline}
          </p>

          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted md:text-base">
            {profile.tagline}
          </p>

          <p className="mt-5 font-mono text-xs uppercase tracking-[0.16em] text-accent">
            {profile.openTo}
          </p>

          <div className="mt-8 flex flex-wrap gap-8 border-t border-line/80 pt-7 md:gap-10">
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

          <div className="mt-8 flex flex-wrap gap-3">
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

        {/* Portrait column — editorial crop, not a circle avatar */}
        <div className="relative md:col-span-5 lg:col-span-5">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-[320px] overflow-hidden border border-line bg-line/40 md:ml-auto md:max-w-none md:aspect-[4/5]">
            <Image
              src="/content.png"
              alt={`${profile.name} at College of Engineering Guindy`}
              fill
              priority
              sizes="(max-width: 768px) 320px, 40vw"
              className="object-cover object-[center_15%] contrast-[1.02] saturate-[0.92]"
            />
            {/* Subtle edge fade into canvas */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-canvas/80 via-transparent to-transparent" />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-paper/5" />
          </div>
          <p className="mt-3 text-right font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
            CEG · Anna University
          </p>
        </div>
      </div>
    </section>
  );
}
