export function Marquee({ text }: { text: string }) {
  const phrase = `${text}  ·  `;
  return (
    <div className="overflow-hidden border-y border-line bg-canvas py-4">
      <div className="marquee-track font-display text-2xl font-medium uppercase tracking-tight text-paper/15 md:text-4xl">
        <span className="inline-block whitespace-nowrap">{phrase.repeat(8)}</span>
        <span className="inline-block whitespace-nowrap" aria-hidden>
          {phrase.repeat(8)}
        </span>
      </div>
    </div>
  );
}
