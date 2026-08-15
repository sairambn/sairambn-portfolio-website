export function Marquee({ text }: { text: string }) {
  const phrase = `${text}  ·  `;
  return (
    <div className="overflow-hidden border-b border-line py-3.5" aria-hidden>
      <div className="marquee-track font-display text-xl font-semibold uppercase tracking-tight text-paper/12 md:text-3xl">
        <span className="inline-block whitespace-nowrap">{phrase.repeat(10)}</span>
        <span className="inline-block whitespace-nowrap">{phrase.repeat(10)}</span>
      </div>
    </div>
  );
}
