export function Marquee({ text }: { text: string }) {
  const phrase = `${text}  ·  `;
  return (
    <div
      className="overflow-hidden border-b border-line py-4"
      aria-hidden
    >
      <div className="marquee-track font-display text-xl font-semibold uppercase tracking-[-0.02em] text-paper/[0.09] md:text-[1.85rem]">
        <span className="inline-block whitespace-nowrap pr-2">{phrase.repeat(12)}</span>
        <span className="inline-block whitespace-nowrap pr-2">{phrase.repeat(12)}</span>
      </div>
    </div>
  );
}
