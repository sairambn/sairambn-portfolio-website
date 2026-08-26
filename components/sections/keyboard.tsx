'use client';

import dynamic from 'next/dynamic';

const VintageKeyboard = dynamic(
  () =>
    import('@/components/ui/vintage-keyboard').then((m) => m.Component),
  {
    ssr: false,
    loading: () => (
      <div
        className="flex min-h-[320px] w-full items-center justify-center rounded-sm bg-[#FAFAFA]"
        aria-hidden
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400">
          Loading keyboard…
        </span>
      </div>
    ),
  }
);

export function Keyboard() {
  return (
    <section id="keyboard" className="border-b border-line">
      <div className="mx-auto max-w-site px-5 py-16 md:px-8 md:py-24">
        <div className="mb-10 grid gap-4 md:mb-14 md:grid-cols-[minmax(0,180px)_1fr] md:gap-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
            Nº003 / Feel
          </p>
          <div>
            <h2 className="font-display text-display-md text-paper">
              Type something real
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-[1.7] text-muted">
              Full mechanical keyboard with thock, wood grain, and press feedback.
              Click the keys or use your physical keyboard — it listens.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full overflow-x-auto overflow-y-hidden border-t border-line bg-[#FAFAFA]">
        <div className="min-w-[640px] md:min-w-0">
          <VintageKeyboard />
        </div>
      </div>
    </section>
  );
}
