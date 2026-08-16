'use client';

import { cn } from '@/lib/utils';

type SpotlightProps = {
  className?: string;
  size?: number;
};

/** Lightweight static glow (no animation libs). */
export function Spotlight({ className, size = 220 }: SpotlightProps) {
  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute rounded-full bg-[radial-gradient(circle_at_center,rgba(196,165,116,0.35),transparent_70%)] blur-2xl opacity-40',
        className
      )}
      style={{ width: size, height: size }}
    />
  );
}
