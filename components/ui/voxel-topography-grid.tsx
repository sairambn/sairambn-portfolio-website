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
 * Isometric voxel terrain field on canvas with pointer-reactive elevation.
 * DPR-aware, ResizeObserver-driven, reduced density on small screens,
 * respects prefers-reduced-motion.
 */
export function VoxelTopographyGrid({
  tileSize = 28,
  maxHeight = 70,
  primaryColor = '#c4a574',
  wireColor = 'rgba(196, 165, 116, 0.28)',
  speed = 0.015,
  className,
}: VoxelTopographyGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationId = 0;
    let running = true;
    let dpr = 1;
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let heights: number[] = [];
    let targetHeights: number[] = [];
    let pointerX = -9999;
    let pointerY = -9999;
    let time = 0;
    let effectiveTile = tileSize;

    const iso = (x: number, y: number, z: number) => {
      const ix = (x - y) * (effectiveTile * 0.5);
      const iy = (x + y) * (effectiveTile * 0.25) - z;
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
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      // Reduce density on mobile
      effectiveTile = width < 640 ? Math.max(tileSize * 1.4, 36) : tileSize;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Grid large enough to cover viewport in isometric projection
      cols = Math.ceil(width / (effectiveTile * 0.5)) + 6;
      rows = Math.ceil(height / (effectiveTile * 0.25)) + 8;
      const count = cols * rows;
      heights = new Array(count).fill(0);
      targetHeights = new Array(count).fill(0);
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

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, width, height);

      time += prefersReduced ? 0 : speed;

      const originX = width * 0.5;
      const originY = height * 0.28;

      // Update heights (painter's algorithm needs far-to-near order)
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          const base = noise(c, r, time) * maxHeight * 0.55;

          // Pointer influence
          const p = iso(c - cols * 0.5, r - rows * 0.3, 0);
          const sx = originX + p.x;
          const sy = originY + p.y;
          const dx = sx - pointerX;
          const dy = sy - pointerY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const influence = Math.max(0, 1 - dist / 160);
          const boost = influence * influence * maxHeight * 0.9;

          targetHeights[i] = base + boost;
          heights[i] += (targetHeights[i] - heights[i]) * 0.12;
        }
      }

      // Draw back-to-front (increasing r then c works for this iso orientation)
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          const h = heights[i];
          const gx = c - cols * 0.5;
          const gy = r - rows * 0.3;

          const top = iso(gx, gy, h);
          const left = iso(gx, gy + 1, 0);
          const right = iso(gx + 1, gy, 0);
          const bottom = iso(gx + 1, gy + 1, 0);

          const tx = originX + top.x;
          const ty = originY + top.y;

          // Top face (lit by height)
          const light = 0.35 + (h / maxHeight) * 0.55;
          ctx.beginPath();
          ctx.moveTo(tx, ty);
          const tr = iso(gx + 1, gy, h);
          const br = iso(gx + 1, gy + 1, h);
          const bl = iso(gx, gy + 1, h);
          ctx.lineTo(originX + tr.x, originY + tr.y);
          ctx.lineTo(originX + br.x, originY + br.y);
          ctx.lineTo(originX + bl.x, originY + bl.y);
          ctx.closePath();

          // Parse accent into rgb for lighting
          const rC = parseInt(primaryColor.slice(1, 3), 16);
          const gC = parseInt(primaryColor.slice(3, 5), 16);
          const bC = parseInt(primaryColor.slice(5, 7), 16);
          ctx.fillStyle = `rgba(${Math.floor(rC * light)}, ${Math.floor(gC * light)}, ${Math.floor(bC * light)}, 0.55)`;
          ctx.fill();

          // Wire edge
          ctx.strokeStyle = wireColor;
          ctx.lineWidth = 0.6;
          ctx.stroke();

          // Left side face (darker)
          if (h > 2) {
            ctx.beginPath();
            ctx.moveTo(originX + bl.x, originY + bl.y);
            ctx.lineTo(originX + br.x, originY + br.y);
            ctx.lineTo(originX + bottom.x, originY + bottom.y);
            ctx.lineTo(originX + left.x, originY + left.y);
            ctx.closePath();
            ctx.fillStyle = `rgba(${Math.floor(rC * 0.2)}, ${Math.floor(gC * 0.2)}, ${Math.floor(bC * 0.2)}, 0.35)`;
            ctx.fill();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    rebuild();
    draw();

    const ro = new ResizeObserver(() => rebuild());
    ro.observe(container);

    container.addEventListener('pointermove', onPointer);
    container.addEventListener('pointerleave', onLeave);

    return () => {
      running = false;
      cancelAnimationFrame(animationId);
      ro.disconnect();
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
