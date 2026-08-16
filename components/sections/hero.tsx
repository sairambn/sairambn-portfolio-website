'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { profile, stats } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { LiquidButton } from '@/components/ui/liquid-glass-button';
import { InteractivePortrait } from '@/components/ui/interactive-portrait';

const VoxelTopographyGrid = dynamic(
  () =>
    import('@/components/ui/voxel-topography-grid').then((m) => m.VoxelTopographyGrid),
  { ssr: false, loading: () => null }
);

export function Hero() {
  const [written, setWritten] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setWritten(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="intro"
      className="relative min-h-[100svh] overflow-hidden border-b border-line"
    >
      <div className="pointer-events-none absolute inset-0 opacity-25 md:opacity-30">
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
          <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
            Nº001 / Intro
          </p>

          <h1 className="relative overflow-hidden">
            <span
              className={`inline-block font-script text-script-xl text-paper transition-all duration-[1.6s] ease-out ${
                written
                  ? 'translate-x-0 opacity-100'
                  : '-translate-x-4 opacity-0'
              }`}
              style={{
                clipPath: written
                  ? 'inset(0 0 0 0)'
                  : 'inset(0 100% 0 0)',
                transition:
                  'clip-path 1.8s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.6s ease, transform 0.8s ease',
              }}
            >
              {profile.shortName}
            </span>
          </h1>

          <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
            {profile.education}
          </p>

          <p className="mt-7 max-w-xl font-display text-lg font-medium tracking-tight text-paper md:text-xl">
            {profile.headline}
          </p>

          <p className="mt-4 max-w-md text-[15px] leading-[1.65] text-muted md:text-base">
            {profile.tagline}
          </p>

          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
            {profile.openTo}
          </p>

          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-6 border-t border-line pt-8">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  {s.label}
                </dt>
                <dd className="mt-1.5 font-display text-lg font-medium tracking-tight text-paper md:text-xl">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <LiquidButton
              href="#work"
              size="lg"
              className="font-mono text-[11px] uppercase tracking-[0.14em]"
            >
              View work
            </LiquidButton>
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
          <figure className="mx-auto w-full max-w-[280px] sm:max-w-[320px] md:ml-auto md:mr-0 md:max-w-[400px]">
            <InteractivePortrait
              src="/content.png"
              alt={`${profile.name} at College of Engineering Guindy`}
              objectPosition="20% 38%"
            />
            <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted md:text-right">
              CEG · Anna University · class of '25
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
