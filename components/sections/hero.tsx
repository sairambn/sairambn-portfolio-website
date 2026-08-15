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
      <div className="pointer-events-none absolute inset-0 opacity-35">
        <VoxelTopographyGrid
          primaryColor="#c4a574"
          wireColor="rgba(196, 165, 116, 0.16)"
          tileSize={30}
          maxHeight={64}
          speed={0.012}
        />
      </div>
      {/* Solid scrim — no soft multi-stop gradients */}
      <div className="pointer-events-none absolute inset-0 bg-canvas/75" />

      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-site grid-cols-1 items-end gap-10 px-5 pb-14 pt-24 md:grid-cols-12 md:items-center md:gap-12 md:px-8 md:pb-16 md:pt-20">
        <div className="order-2 md:order-1 md:col-span-6 lg:col-span-7">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            Nº001 / Intro
          </p>

          <h1 className="font-display text-display-xl font-semibold text-paper">
            {profile.shortName}
          </h1>

          <p className="mt-4 max-w-xl text-lg text-paper md:text-xl">
            {profile.headline}
          </p>

          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted md:text-base">
            {profile.tagline}
          </p>

          <p className="mt-5 font-mono text-xs uppercase tracking-[0.16em] text-accent">
            {profile.openTo}
          </p>

          <div className="mt-8 flex flex-wrap gap-8 border-t border-line pt-7 md:gap-10">
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

        <div className="order-1 md:order-2 md:col-span-6 lg:col-span-5">
          <figure className="relative mx-auto w-full max-w-[280px] md:ml-auto md:mr-0 md:max-w-[380px]">
            <div className="relative aspect-[3/4] overflow-hidden border border-line">
              <Image
                src="/content.png"
                alt={`${profile.name} at College of Engineering Guindy`}
                fill
                priority
                sizes="(max-width: 768px) 280px, 380px"
                className="object-cover object-[18%_42%]"
              />
            </div>
            <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted md:text-right">
              CEG · Anna University
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
