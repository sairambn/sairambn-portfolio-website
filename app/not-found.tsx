import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-canvas px-5 text-center">
      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
        404
      </p>
      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-paper md:text-4xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-sm text-sm text-muted">
        This route does not exist. Head back to the portfolio.
      </p>
      <Link
        href="/"
        className="mt-10 font-mono text-[11px] uppercase tracking-[0.16em] text-paper underline-offset-4 hover:text-accent hover:underline"
      >
        ← Home
      </Link>
    </main>
  );
}
