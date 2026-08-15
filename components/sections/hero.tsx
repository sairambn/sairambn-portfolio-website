'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { profile, stats } from '@/lib/data';
import { Button } from '@/components/ui/button';

const VoxelTopographyGrid = dynamic(
  () =>
    import('@/components/ui/voxel-topography-grid').then((m) => m.VoxelTopographyGrid),
  { ssr: false, loading: () => null }
);

export function Hero() {
  return (
    <section
      id="intro"
      className="relative min-h-[100svh] overflow-hidden border-b border-line"
    >
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <VoxelTopographyGrid
          primaryColor="#c4a574"
          wireColor="rgba(196, 165, 116, 0.14)"
          tileSize={32}
          maxHeight={56}
          speed={0.01}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-canvas/80" />

      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-site grid-cols-1 items-end gap-12 px-5 pb-16 pt-28 md:grid-cols-12 md:items-center md:gap-10 md:px-8 md:pb-20 md:pt-24">
        <div className="order-2 md:order-1 md:col-span-7">
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
            Nº001 / Intro
          </p>

          <h1 className="font-script text-script-xl text-paper">
            {profile.shortName}
          </h1>

          <p className="mt-7 max-w-xl font-display text-lg font-medium text-paper md:text-xl">
            {profile.headline}
          </p>

          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted md:text-base">
            {profile.tagline}
          </p>

          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
            {profile.openTo}
          </p>

          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-6 border-t border-line pt-8">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  {s.label}
                </dt>
                <dd className="mt-1.5 font-display text-lg font-medium text-paper md:text-xl">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>

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

        <div className="order-1 md:order-2 md:col-span-5">
          <figure className="mx-auto w-full max-w-[260px] sm:max-w-[300px] md:ml-auto md:mr-0 md:max-w-[360px]">
            <div className="relative aspect-[3/4] overflow-hidden border border-line">
              <Image
                src="/content.png"
                alt={`${profile.name} at College of Engineering Guindy`}
                fill
                priority
                sizes="(max-width: 768px) 300px, 360px"
                className="object-cover object-[18%_42%]"
              />
            </div>
            <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted md:text-right">
              CEG · Anna University · class of &apos;25
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
