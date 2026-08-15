'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

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
          className="flex items-center gap-2.5 font-display text-sm font-semibold tracking-tight text-paper"
        >
          <span className="relative h-7 w-7 overflow-hidden border border-line">
            <Image
              src="/content.png"
              alt=""
              fill
              sizes="28px"
              className="object-cover object-[18%_38%]"
              priority
            />
          </span>
          Sairam BN
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs font-medium uppercase tracking-[0.14em] text-muted transition-colors hover:text-paper"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://github.com/sairambn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium uppercase tracking-[0.14em] text-accent transition-colors hover:text-paper"
          >
            Resume
          </a>
        </nav>

        <button
          type="button"
          className="md:hidden text-paper"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-canvas md:hidden">
          <div className="flex flex-col gap-1 px-5 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-2 text-sm uppercase tracking-[0.12em] text-muted hover:text-paper"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
