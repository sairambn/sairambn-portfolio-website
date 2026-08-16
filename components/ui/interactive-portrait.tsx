'use client';

import { useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { Spotlight } from '@/components/ui/spotlight';
import { cn } from '@/lib/utils';

type InteractivePortraitProps = {
  src: string;
  alt: string;
  className?: string;
  objectPosition?: string;
};

export function InteractivePortrait({
  src,
  alt,
  className,
  objectPosition = '20% 38%',
}: InteractivePortraitProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 180, damping: 22, mass: 0.4 });
  const mouseY = useSpring(y, { stiffness: 180, damping: 22, mass: 0.4 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [9, -9]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-9, 9]);
  const imgX = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);
  const imgY = useTransform(mouseY, [-0.5, 0.5], [-6, 6]);
  const glareX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  }

  function handleLeave() {
    setHovered(false);
    x.set(0);
    y.set(0);
  }

  return (
    <div
      className={cn('perspective-[1200px]', className)}
      style={{ perspective: '1200px' }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative aspect-[4/5] w-full overflow-hidden border border-line bg-line will-change-transform"
      >
        <Spotlight size={260} className="from-accent/40 via-accent/15 to-transparent" />

        <motion.img
          src={src}
          alt={alt}
          width={1551}
          height={798}
          decoding="async"
          fetchPriority="high"
          draggable={false}
          className="absolute inset-0 h-full w-full select-none object-cover"
          style={{
            objectPosition,
            x: imgX,
            y: imgY,
            scale: hovered ? 1.04 : 1,
            transition: 'scale 0.35s ease',
          }}
        />

        {/* Soft light that follows the cursor */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-soft-light"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) =>
                `radial-gradient(420px circle at ${gx} ${gy}, rgba(247,246,243,0.22), transparent 55%)`
            ),
            opacity: hovered ? 1 : 0,
          }}
        />

        {/* Edge vignette so the tilt feels grounded */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(10,10,10,0.35) 0%, transparent 28%), linear-gradient(to bottom, rgba(10,10,10,0.12) 0%, transparent 20%)',
          }}
        />
      </motion.div>
    </div>
  );
}
