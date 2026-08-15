'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { href: '#intro', label: 'Home' },
  { href: '#work', label: 'Work' },
  { href: '#approach', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-line bg-canvas">
      <div className="mx-auto flex h-14 max-w-site items-center justify-between px-5 md:px-8">
        <Link
          href="#intro"
          className="flex items-center gap-2.5 text-paper"
          onClick={() => setOpen(false)}
        >
          <span className="relative h-7 w-7 shrink-0 overflow-hidden border border-line">
            <Image
              src="/content.png"
              alt=""
              fill
              sizes="28px"
              className="object-cover object-[18%_38%]"
              priority
            />
          </span>
          <span className="font-script text-[1.65rem] leading-none tracking-wide">
            Sairam BN
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted transition-colors hover:text-paper"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://github.com/sairambn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-medium uppercase tracking-[0.16em] text-accent transition-colors hover:text-paper"
          >
            Resume
          </a>
        </nav>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center text-paper md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-canvas md:hidden">
          <nav className="flex flex-col px-5 py-3" aria-label="Mobile">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm uppercase tracking-[0.12em] text-muted hover:text-paper"
              >
                {l.label}
              </a>
            ))}
            <a
              href="https://github.com/sairambn"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="py-3 text-sm uppercase tracking-[0.12em] text-accent"
            >
              Resume
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
