'use client';

/**
 * Placeholder for optional 3D scenes.
 * Install @splinetool/react-spline when you want live Spline embeds.
 */
export function SplineScene({
  className,
}: {
  scene?: string;
  className?: string;
}) {
  return (
    <div
      className={className}
      role="img"
      aria-label="3D scene placeholder"
    />
  );
}
