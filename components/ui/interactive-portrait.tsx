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
  objectPosition = '28% 42%',
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
    cur.x += (tgt.x - cur.x) * 0.2;
    cur.y += (tgt.y - cur.y) * 0.2;

    const rx = (-cur.y * 9).toFixed(2);
    const ry = (cur.x * 11).toFixed(2);
    const tz = (activeRef.current ? 14 : 0).toFixed(1);
    const tx = (cur.x * 7).toFixed(2);
    const ty = (cur.y * 5).toFixed(2);
    const scale = activeRef.current ? 1.03 : 1;
    const gx = ((cur.x + 0.5) * 100).toFixed(1);
    const gy = ((cur.y + 0.5) * 100).toFixed(1);

    frame.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(${tz}px)`;
    img.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${scale})`;
    glare.style.background = `radial-gradient(380px circle at ${gx}% ${gy}%, rgba(247,246,243,0.18), transparent 55%)`;
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
      style={{ perspective: '1100px' }}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <div className="absolute -inset-8 z-10" aria-hidden />

      <div
        ref={frameRef}
        className="relative aspect-[4/5] w-full overflow-hidden will-change-transform"
        style={{
          transformStyle: 'preserve-3d',
          border: '1px solid rgba(196, 165, 116, 0.22)',
          boxShadow:
            '0 0 0 1px rgba(10,10,10,0.6), 0 18px 40px -12px rgba(0,0,0,0.65), 0 8px 16px -8px rgba(0,0,0,0.4)',
          background: '#121212',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          width={1551}
          height={798}
          decoding="async"
          fetchPriority="high"
          draggable={false}
          className="absolute inset-[-8%] h-[116%] w-[116%] max-w-none select-none object-cover will-change-transform"
          style={{ objectPosition }}
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
              'linear-gradient(to top, rgba(10,10,10,0.38) 0%, transparent 26%), linear-gradient(to bottom, rgba(10,10,10,0.1) 0%, transparent 16%), linear-gradient(135deg, rgba(196,165,116,0.05) 0%, transparent 40%)',
          }}
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.04)',
          }}
        />
      </div>
    </div>
  );
}
