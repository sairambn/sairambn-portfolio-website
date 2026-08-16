'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface VoxelTopographyGridProps {
  tileSize?: number;
  maxHeight?: number;
  /** Hex color, e.g. #c4a574 */
  primaryColor?: string;
  wireColor?: string;
  speed?: number;
  className?: string;
  /** Clear color behind voxels (site canvas) */
  backgroundColor?: string;
}

/**
 * Isometric voxel topography for full-bleed backgrounds.
 * 3-face cubes + mouse influence, with off-screen pause and mobile density cuts.
 */
export function VoxelTopographyGrid({
  tileSize = 32,
  maxHeight = 56,
  primaryColor = '#c4a574',
  wireColor = 'rgba(196, 165, 116, 0.22)',
  speed = 0.012,
  className,
  backgroundColor = '#0a0a0a',
}: VoxelTopographyGridProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({
    x: -1000,
    y: -1000,
    targetX: -1000,
    targetY: -1000,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId = 0;
    let width = 0;
    let height = 0;
    let time = 0;
    let visible = true;
    let running = true;
    let frameSkip = 0;
    let effectiveTile = tileSize;

    const hexToRgb = (hex: string) => {
      const clean = hex.replace('#', '');
      const full =
        clean.length === 3
          ? clean
              .split('')
              .map((c) => c + c)
              .join('')
          : clean;
      const n = parseInt(full, 16);
      return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
    };

    const baseRgb = hexToRgb(primaryColor);
    const leftFaceColor = `rgba(${Math.floor(baseRgb.r * 0.4)}, ${Math.floor(baseRgb.g * 0.4)}, ${Math.floor(baseRgb.b * 0.4)}, 0.9)`;
    const rightFaceColor = `rgba(${Math.floor(baseRgb.r * 0.62)}, ${Math.floor(baseRgb.g * 0.62)}, ${Math.floor(baseRgb.b * 0.62)}, 0.9)`;

    const topColorLUT: string[] = new Array(101);
    for (let i = 0; i <= 100; i++) {
      const ratio = i / 100;
      const r = Math.floor(baseRgb.r * (0.5 + ratio * 0.5));
      const g = Math.floor(baseRgb.g * (0.5 + ratio * 0.5));
      const b = Math.floor(baseRgb.b * (0.5 + ratio * 0.5));
      topColorLUT[i] = `rgb(${r},${g},${b})`;
    }

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      width = container.clientWidth;
      height = container.clientHeight;
      effectiveTile =
        width < 640 ? Math.max(tileSize * 1.45, 40) : Math.max(tileSize, 28);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    handleResize();

    const updatePointerPos = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.targetX = clientX - rect.left;
      mouseRef.current.targetY = clientY - rect.top;
    };

    const handlePointerMove = (e: PointerEvent) => {
      updatePointerPos(e.clientX, e.clientY);
    };

    const handlePointerLeave = () => {
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    // Window-level tracking so the grid reacts even under content overlays
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave, { passive: true });

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.02 }
    );
    io.observe(container);

    const tileW = () => effectiveTile * 0.866025;
    const tileH = () => effectiveTile * 0.5;
    const maxRadius = 200;
    const maxRadiusSq = maxRadius * maxRadius;

    const draw = () => {
      if (!running) return;

      if (!visible || prefersReduced) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }

      const tw = tileW();
      const th = tileH();
      const gridCols = Math.ceil(width / tw) + 4;
      const gridRows = Math.ceil(height / th) + 8;
      const cellCount = gridCols * gridRows;

      // Half-rate when dense
      frameSkip = (frameSkip + 1) % 2;
      if (frameSkip === 1 && cellCount > 450) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }

      time += speed;

      mouseRef.current.x +=
        (mouseRef.current.targetX - mouseRef.current.x) * 0.28;
      mouseRef.current.y +=
        (mouseRef.current.targetY - mouseRef.current.y) * 0.28;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);

      const originX = width * 0.5;
      const originY = height / 3.2;
      const startR = -Math.floor(gridRows / 2);
      const endR = Math.ceil(gridRows / 2);
      const startC = -Math.floor(gridCols / 2);
      const endC = Math.ceil(gridCols / 2);
      const invMaxHeight = 1 / (maxHeight + 50);

      for (let r = startR; r < endR; r++) {
        for (let c = startC; c < endC; c++) {
          const isoX = originX + (c - r) * tw;
          const isoY = originY + (c + r) * th;

          const dx = isoX - mx;
          const dy = isoY - my;
          const distSq = dx * dx + dy * dy;

          const wave1 = Math.sin(time * 2 + c * 0.25 + r * 0.25);
          const wave2 = Math.cos(time * 1.5 + c * 0.15 - r * 0.3);
          let h = (wave1 + wave2 + 2) * 0.25 * maxHeight;

          if (distSq < maxRadiusSq) {
            const dist = Math.sqrt(distSq);
            const influence = 1 - dist / maxRadius;
            h += influence * influence * 48;
          }

          const py = isoY - h;

          if (
            isoX + tw < 0 ||
            isoX - tw > width ||
            py + h + 12 < 0 ||
            py - th > height
          ) {
            continue;
          }

          const topP1Y = py - th;
          const topP2X = isoX + tw;
          const topP3Y = py + th;
          const topP4X = isoX - tw;
          const sideBottomShift = h + 12;

          // Left face
          ctx.beginPath();
          ctx.moveTo(topP4X, py);
          ctx.lineTo(isoX, topP3Y);
          ctx.lineTo(isoX, topP3Y + sideBottomShift);
          ctx.lineTo(topP4X, py + sideBottomShift);
          ctx.closePath();
          ctx.fillStyle = leftFaceColor;
          ctx.fill();

          // Right face
          ctx.beginPath();
          ctx.moveTo(isoX, topP3Y);
          ctx.lineTo(topP2X, py);
          ctx.lineTo(topP2X, py + sideBottomShift);
          ctx.lineTo(isoX, topP3Y + sideBottomShift);
          ctx.closePath();
          ctx.fillStyle = rightFaceColor;
          ctx.fill();

          // Top face
          ctx.beginPath();
          ctx.moveTo(isoX, topP1Y);
          ctx.lineTo(topP2X, py);
          ctx.lineTo(isoX, topP3Y);
          ctx.lineTo(topP4X, py);
          ctx.closePath();

          const rawLight = h * invMaxHeight;
          const lightRatio =
            rawLight > 1 ? 1 : rawLight < 0.1 ? 0.1 : rawLight;
          const lutIdx = (lightRatio * 100) | 0;
          ctx.fillStyle = topColorLUT[lutIdx];
          ctx.fill();

          ctx.strokeStyle = wireColor;
          ctx.lineWidth = 0.55;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      running = false;
      resizeObserver.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [tileSize, maxHeight, primaryColor, wireColor, speed, backgroundColor]);

  return (
    <div
      ref={containerRef}
      className={cn('absolute inset-0 overflow-hidden', className)}
      aria-hidden
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}

export default VoxelTopographyGrid;
