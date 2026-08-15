export function Marquee({ text }: { text: string }) {
  const phrase = `${text}  ·  `;
  return (
    <div className="overflow-hidden border-y border-line py-3">
      <div className="marquee-track font-display text-xl font-medium uppercase tracking-tight text-paper/20 md:text-3xl">
        <span className="inline-block whitespace-nowrap">{phrase.repeat(8)}</span>
        <span className="inline-block whitespace-nowrap" aria-hidden>
          {phrase.repeat(8)}
        </span>
      </div>
    </div>
  );
}
