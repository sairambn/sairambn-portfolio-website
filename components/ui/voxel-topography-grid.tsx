'use client';

import React, { useEffect, useRef } from 'react';

export interface VoxelTopographyGridProps {
  tileSize?: number;
  maxHeight?: number;
  primaryColor?: string;
  wireColor?: string;
  speed?: number;
  className?: string;
}

/**
 * Isometric voxel terrain. Pauses when off-screen, lowers density on small
 * viewports, caps DPR, and skips side faces to keep the hero smooth.
 */
export function VoxelTopographyGrid({
  tileSize = 36,
  maxHeight = 48,
  primaryColor = '#c4a574',
  wireColor = 'rgba(196, 165, 116, 0.14)',
  speed = 0.008,
  className,
}: VoxelTopographyGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationId = 0;
    let running = true;
    let visible = true;
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let heights: Float32Array = new Float32Array(0);
    let targetHeights: Float32Array = new Float32Array(0);
    let pointerX = -9999;
    let pointerY = -9999;
    let time = 0;
    let effectiveTile = tileSize;
    let frameSkip = 0;

    const rC = parseInt(primaryColor.slice(1, 3), 16);
    const gC = parseInt(primaryColor.slice(3, 5), 16);
    const bC = parseInt(primaryColor.slice(5, 7), 16);

    const iso = (x: number, y: number, z: number, t: number) => {
      const ix = (x - y) * (t * 0.5);
      const iy = (x + y) * (t * 0.25) - z;
      return { x: ix, y: iy };
    };

    const noise = (x: number, y: number, t: number) => {
      const n =
        Math.sin(x * 0.35 + t) * 0.5 +
        Math.sin(y * 0.4 + t * 0.7) * 0.35 +
        Math.sin((x + y) * 0.2 + t * 0.4) * 0.25;
      return (n + 1) * 0.5;
    };

    const rebuild = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      effectiveTile =
        width < 640 ? Math.max(tileSize * 1.6, 44) : Math.max(tileSize, 34);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(width / (effectiveTile * 0.55)) + 4;
      rows = Math.ceil(height / (effectiveTile * 0.3)) + 5;
      const count = cols * rows;
      heights = new Float32Array(count);
      targetHeights = new Float32Array(count);
    };

    const onPointer = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointerX = e.clientX - rect.left;
      pointerY = e.clientY - rect.top;
    };

    const onLeave = () => {
      pointerX = -9999;
      pointerY = -9999;
    };

    const draw = () => {
      if (!running) return;

      if (!visible || prefersReduced) {
        animationId = requestAnimationFrame(draw);
        return;
      }

      // Run at ~30fps equivalent work on dense grids
      frameSkip = (frameSkip + 1) % 2;
      if (frameSkip === 1 && cols * rows > 400) {
        animationId = requestAnimationFrame(draw);
        return;
      }

      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, width, height);

      time += speed;

      const originX = width * 0.5;
      const originY = height * 0.28;
      const t = effectiveTile;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          const base = noise(c, r, time) * maxHeight * 0.55;

          const p = iso(c - cols * 0.5, r - rows * 0.3, 0, t);
          const sx = originX + p.x;
          const sy = originY + p.y;
          const dx = sx - pointerX;
          const dy = sy - pointerY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const influence = Math.max(0, 1 - dist / 150);
          const boost = influence * influence * maxHeight * 0.85;

          targetHeights[i] = base + boost;
          heights[i] += (targetHeights[i] - heights[i]) * 0.14;
        }
      }

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          const h = heights[i];
          const gx = c - cols * 0.5;
          const gy = r - rows * 0.3;

          const top = iso(gx, gy, h, t);
          const tr = iso(gx + 1, gy, h, t);
          const br = iso(gx + 1, gy + 1, h, t);
          const bl = iso(gx, gy + 1, h, t);

          const light = 0.35 + (h / maxHeight) * 0.55;

          ctx.beginPath();
          ctx.moveTo(originX + top.x, originY + top.y);
          ctx.lineTo(originX + tr.x, originY + tr.y);
          ctx.lineTo(originX + br.x, originY + br.y);
          ctx.lineTo(originX + bl.x, originY + bl.y);
          ctx.closePath();

          ctx.fillStyle = `rgba(${(rC * light) | 0}, ${(gC * light) | 0}, ${(bC * light) | 0}, 0.5)`;
          ctx.fill();

          ctx.strokeStyle = wireColor;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    rebuild();
    draw();

    const ro = new ResizeObserver(() => rebuild());
    ro.observe(container);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    io.observe(container);

    container.addEventListener('pointermove', onPointer, { passive: true });
    container.addEventListener('pointerleave', onLeave);

    return () => {
      running = false;
      cancelAnimationFrame(animationId);
      ro.disconnect();
      io.disconnect();
      container.removeEventListener('pointermove', onPointer);
      container.removeEventListener('pointerleave', onLeave);
    };
  }, [tileSize, maxHeight, primaryColor, wireColor, speed]);

  return (
    <div ref={containerRef} className={className ?? 'absolute inset-0'}>
      <canvas ref={canvasRef} className="block h-full w-full" aria-hidden />
    </div>
  );
}

export default VoxelTopographyGrid;
