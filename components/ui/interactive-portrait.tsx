'use client';

import { useRef } from 'react';
import { cn } from '@/lib/utils';

type InteractivePortraitProps = {
  src: string;
  alt: string;
  className?: string;
  objectPosition?: string;
};

/**
 * Lightweight cursor-reactive portrait.
 * Uses direct transform updates (no React re-renders, no spring stacks).
 */
export function InteractivePortrait({
  src,
  alt,
  className,
  objectPosition = '20% 38%',
}: InteractivePortraitProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const activeRef = useRef(false);

  function tick() {
    const frame = frameRef.current;
    const img = imgRef.current;
    const glare = glareRef.current;
    if (!frame || !img || !glare) return;

    const cur = currentRef.current;
    const tgt = targetRef.current;
    cur.x += (tgt.x - cur.x) * 0.14;
    cur.y += (tgt.y - cur.y) * 0.14;

    const rx = (-cur.y * 8).toFixed(2);
    const ry = (cur.x * 8).toFixed(2);
    const tx = (cur.x * 6).toFixed(2);
    const ty = (cur.y * 4).toFixed(2);
    const gx = ((cur.x + 0.5) * 100).toFixed(1);
    const gy = ((cur.y + 0.5) * 100).toFixed(1);

    frame.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    img.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${activeRef.current ? 1.03 : 1})`;
    glare.style.background = `radial-gradient(380px circle at ${gx}% ${gy}%, rgba(247,246,243,0.18), transparent 55%)`;
    glare.style.opacity = activeRef.current ? '1' : '0';

    const settled =
      Math.abs(tgt.x - cur.x) < 0.001 && Math.abs(tgt.y - cur.y) < 0.001;

    if (!settled || activeRef.current) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      rafRef.current = 0;
    }
  }

  function ensureTick() {
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(tick);
    }
  }

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    targetRef.current = {
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    };
    activeRef.current = true;
    ensureTick();
  }

  function handleEnter() {
    activeRef.current = true;
    ensureTick();
  }

  function handleLeave() {
    activeRef.current = false;
    targetRef.current = { x: 0, y: 0 };
    ensureTick();
  }

  return (
    <div
      className={cn(className)}
      style={{ perspective: '1000px' }}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div
        ref={frameRef}
        className="relative aspect-[4/5] w-full overflow-hidden border border-line bg-line will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          width={800}
          height={1000}
          decoding="async"
          fetchPriority="high"
          draggable={false}
          className="absolute inset-0 h-full w-full select-none object-cover will-change-transform"
          style={{
            objectPosition,
            transition: 'transform 0.2s ease-out',
          }}
        />

        <div
          ref={glareRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-soft-light transition-opacity duration-200"
          style={{ opacity: 0 }}
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(10,10,10,0.35) 0%, transparent 28%), linear-gradient(to bottom, rgba(10,10,10,0.12) 0%, transparent 20%)',
          }}
        />
      </div>
    </div>
  );
}
