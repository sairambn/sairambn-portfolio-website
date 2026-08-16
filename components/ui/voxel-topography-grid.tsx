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
  backgroundColor?: string;
  /** Cursor influence radius in px */
  influenceRadius?: number;
  /** Extra height under the cursor */
  influenceBoost?: number;
}

type Pulse = { x: number; y: number; born: number; strength: number };

/**
 * Grand isometric voxel terrain for full-bleed backgrounds.
 * Cursor mound + click pulses, ambient drift, off-screen pause.
 */
export function VoxelTopographyGrid({
  tileSize = 28,
  maxHeight = 72,
  primaryColor = '#c4a574',
  wireColor = 'rgba(196, 165, 116, 0.28)',
  speed = 0.014,
  className,
  backgroundColor = '#0a0a0a',
  influenceRadius = 280,
  influenceBoost = 78,
}: VoxelTopographyGridProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({
    x: -1000,
    y: -1000,
    targetX: -1000,
    targetY: -1000,
    active: false,
  });
  const pulsesRef = useRef<Pulse[]>([]);

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
    let ambientPhase = 0;

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
    const leftFaceColor = `rgba(${Math.floor(baseRgb.r * 0.38)}, ${Math.floor(baseRgb.g * 0.38)}, ${Math.floor(baseRgb.b * 0.38)}, 0.92)`;
    const rightFaceColor = `rgba(${Math.floor(baseRgb.r * 0.58)}, ${Math.floor(baseRgb.g * 0.58)}, ${Math.floor(baseRgb.b * 0.58)}, 0.92)`;

    // Base top LUT
    const topColorLUT: string[] = new Array(101);
    for (let i = 0; i <= 100; i++) {
      const ratio = i / 100;
      const r = Math.floor(baseRgb.r * (0.42 + ratio * 0.58));
      const g = Math.floor(baseRgb.g * (0.42 + ratio * 0.58));
      const b = Math.floor(baseRgb.b * (0.42 + ratio * 0.58));
      topColorLUT[i] = `rgb(${r},${g},${b})`;
    }

    // Hot top LUT (near cursor / pulses) — brighter gold
    const hotColorLUT: string[] = new Array(101);
    for (let i = 0; i <= 100; i++) {
      const ratio = i / 100;
      const r = Math.min(255, Math.floor(baseRgb.r * (0.55 + ratio * 0.7) + 18));
      const g = Math.min(255, Math.floor(baseRgb.g * (0.55 + ratio * 0.65) + 12));
      const b = Math.min(255, Math.floor(baseRgb.b * (0.55 + ratio * 0.55) + 6));
      hotColorLUT[i] = `rgb(${r},${g},${b})`;
    }

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      width = container.clientWidth;
      height = container.clientHeight;
      effectiveTile =
        width < 640 ? Math.max(tileSize * 1.5, 38) : Math.max(tileSize, 26);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    handleResize();

    const toLocal = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      return { x: clientX - rect.left, y: clientY - rect.top };
    };

    const handlePointerMove = (e: PointerEvent) => {
      const p = toLocal(e.clientX, e.clientY);
      mouseRef.current.targetX = p.x;
      mouseRef.current.targetY = p.y;
      mouseRef.current.active = true;
    };

    const handlePointerDown = (e: PointerEvent) => {
      const p = toLocal(e.clientX, e.clientY);
      mouseRef.current.targetX = p.x;
      mouseRef.current.targetY = p.y;
      mouseRef.current.active = true;
      // Expanding shockwave under click / tap
      pulsesRef.current.push({
        x: p.x,
        y: p.y,
        born: time,
        strength: 1,
      });
      if (pulsesRef.current.length > 5) pulsesRef.current.shift();
    };

    const handlePointerLeave = () => {
      mouseRef.current.active = false;
      // Soft park — keep last position briefly via lerp, then idle ambient
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
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
    const maxRadiusSq = influenceRadius * influenceRadius;

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

      frameSkip = (frameSkip + 1) % 2;
      if (frameSkip === 1 && cellCount > 500) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }

      time += speed;
      ambientPhase += speed * 0.35;

      // Ambient orbit when idle so the field still feels alive
      if (!mouseRef.current.active) {
        const ax = width * (0.5 + Math.sin(ambientPhase * 0.7) * 0.22);
        const ay = height * (0.38 + Math.cos(ambientPhase * 0.55) * 0.12);
        mouseRef.current.targetX = ax;
        mouseRef.current.targetY = ay;
      }

      mouseRef.current.x +=
        (mouseRef.current.targetX - mouseRef.current.x) * 0.18;
      mouseRef.current.y +=
        (mouseRef.current.targetY - mouseRef.current.y) * 0.18;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Prune dead pulses
      pulsesRef.current = pulsesRef.current.filter((p) => time - p.born < 2.8);

      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);

      // Soft radial glow under cursor
      if (mx > -500 && my > -500) {
        const g = ctx.createRadialGradient(mx, my, 0, mx, my, influenceRadius * 1.1);
        g.addColorStop(0, `rgba(${baseRgb.r},${baseRgb.g},${baseRgb.b},0.14)`);
        g.addColorStop(0.45, `rgba(${baseRgb.r},${baseRgb.g},${baseRgb.b},0.05)`);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, width, height);
      }

      const originX = width * 0.5;
      const originY = height / 3.05;
      const startR = -Math.floor(gridRows / 2);
      const endR = Math.ceil(gridRows / 2);
      const startC = -Math.floor(gridCols / 2);
      const endC = Math.ceil(gridCols / 2);
      const invMaxHeight = 1 / (maxHeight + influenceBoost);

      for (let r = startR; r < endR; r++) {
        for (let c = startC; c < endC; c++) {
          const isoX = originX + (c - r) * tw;
          const isoY = originY + (c + r) * th;

          const dx = isoX - mx;
          const dy = isoY - my;
          const distSq = dx * dx + dy * dy;

          // Multi-octave terrain
          const wave1 = Math.sin(time * 1.8 + c * 0.22 + r * 0.22);
          const wave2 = Math.cos(time * 1.25 + c * 0.14 - r * 0.28);
          const wave3 = Math.sin(time * 0.7 + (c + r) * 0.11);
          let h =
            (wave1 * 0.45 + wave2 * 0.35 + wave3 * 0.2 + 1) * 0.5 * maxHeight;

          // Cursor mound
          let heat = 0;
          if (distSq < maxRadiusSq) {
            const dist = Math.sqrt(distSq);
            const t = 1 - dist / influenceRadius;
            const influence = t * t * (3 - 2 * t); // smoothstep
            h += influence * influenceBoost;
            heat = influence;
          }

          // Expanding click pulses
          for (let i = 0; i < pulsesRef.current.length; i++) {
            const pulse = pulsesRef.current[i];
            const age = time - pulse.born;
            const ring = age * 140;
            const pdx = isoX - pulse.x;
            const pdy = isoY - pulse.y;
            const pd = Math.sqrt(pdx * pdx + pdy * pdy);
            const band = Math.abs(pd - ring);
            if (band < 55) {
              const fall = 1 - band / 55;
              const fade = 1 - age / 2.8;
              const bump = fall * fall * fade * pulse.strength * 42;
              h += bump;
              heat = Math.max(heat, fall * fade);
            }
          }

          const py = isoY - h;

          if (
            isoX + tw < 0 ||
            isoX - tw > width ||
            py + h + 14 < 0 ||
            py - th > height
          ) {
            continue;
          }

          const topP1Y = py - th;
          const topP2X = isoX + tw;
          const topP3Y = py + th;
          const topP4X = isoX - tw;
          const sideBottomShift = h + 14;

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
            rawLight > 1 ? 1 : rawLight < 0.08 ? 0.08 : rawLight;
          const lutIdx = (lightRatio * 100) | 0;
          ctx.fillStyle =
            heat > 0.35 ? hotColorLUT[lutIdx] : topColorLUT[lutIdx];
          ctx.fill();

          // Brighter wire near heat
          ctx.strokeStyle =
            heat > 0.4
              ? `rgba(${baseRgb.r},${baseRgb.g},${baseRgb.b},${0.35 + heat * 0.4})`
              : wireColor;
          ctx.lineWidth = heat > 0.5 ? 0.85 : 0.55;
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
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerleave', handlePointerLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [
    tileSize,
    maxHeight,
    primaryColor,
    wireColor,
    speed,
    backgroundColor,
    influenceRadius,
    influenceBoost,
  ]);

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
