'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

type InteractivePortraitProps = {
  src: string;
  alt: string;
  className?: string;
  objectPosition?: string;
};

/**
 * Portrait that tilts and shifts toward the pointer.
 * Imperative transforms only — no React re-renders on move.
 */
export function InteractivePortrait({
  src,
  alt,
  className,
  objectPosition = '20% 38%',
}: InteractivePortraitProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const activeRef = useRef(false);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  function tick() {
    const frame = frameRef.current;
    const img = imgRef.current;
    const glare = glareRef.current;
    if (!frame || !img || !glare) return;

    if (reducedRef.current) {
      frame.style.transform = 'none';
      img.style.transform = 'none';
      glare.style.opacity = '0';
      rafRef.current = 0;
      return;
    }

    const cur = currentRef.current;
    const tgt = targetRef.current;
    // Snappier follow
    cur.x += (tgt.x - cur.x) * 0.22;
    cur.y += (tgt.y - cur.y) * 0.22;

    // Stronger tilt + parallax shift
    const rx = (-cur.y * 12).toFixed(2);
    const ry = (cur.x * 14).toFixed(2);
    const tz = (activeRef.current ? 18 : 0).toFixed(1);
    const tx = (cur.x * 10).toFixed(2);
    const ty = (cur.y * 7).toFixed(2);
    const scale = activeRef.current ? 1.045 : 1;
    const gx = ((cur.x + 0.5) * 100).toFixed(1);
    const gy = ((cur.y + 0.5) * 100).toFixed(1);

    frame.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(${tz}px)`;
    img.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${scale})`;
    glare.style.background = `radial-gradient(420px circle at ${gx}% ${gy}%, rgba(247,246,243,0.22), transparent 58%)`;
    glare.style.opacity = activeRef.current ? '1' : '0';

    const settled =
      Math.abs(tgt.x - cur.x) < 0.0008 && Math.abs(tgt.y - cur.y) < 0.0008;

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

  function updateFromEvent(clientX: number, clientY: number) {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    // Normalize to -0.5 … 0.5, clamp so edges stay stable
    const nx = Math.max(-0.5, Math.min(0.5, (clientX - rect.left) / rect.width - 0.5));
    const ny = Math.max(-0.5, Math.min(0.5, (clientY - rect.top) / rect.height - 0.5));

    targetRef.current = { x: nx, y: ny };
    activeRef.current = true;
    ensureTick();
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    updateFromEvent(e.clientX, e.clientY);
  }

  function handlePointerEnter(e: React.PointerEvent<HTMLDivElement>) {
    activeRef.current = true;
    updateFromEvent(e.clientX, e.clientY);
  }

  function handlePointerLeave() {
    activeRef.current = false;
    targetRef.current = { x: 0, y: 0 };
    ensureTick();
  }

  return (
    <div
      ref={rootRef}
      className={cn('relative cursor-crosshair', className)}
      style={{ perspective: '900px' }}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      {/* Extra invisible hit padding so tracking starts before the frame edge */}
      <div className="absolute -inset-6 z-10" aria-hidden />

      <div
        ref={frameRef}
        className="relative aspect-[4/5] w-full overflow-hidden border border-line bg-line will-change-transform"
        style={{
          transformStyle: 'preserve-3d',
          transition: 'box-shadow 0.3s ease',
        }}
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
          className="absolute inset-[-6%] h-[112%] w-[112%] max-w-none select-none object-cover will-change-transform"
          style={{ objectPosition }}
        />

        <div
          ref={glareRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-soft-light transition-opacity duration-150"
          style={{ opacity: 0 }}
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(10,10,10,0.38) 0%, transparent 30%), linear-gradient(to bottom, rgba(10,10,10,0.14) 0%, transparent 22%)',
          }}
        />
      </div>
    </div>
  );
}
