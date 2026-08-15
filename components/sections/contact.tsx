import { profile } from '@/lib/data';

const links = [
  { label: 'LinkedIn', href: profile.linkedin },
  { label: 'GitHub', href: profile.github },
  { label: 'LeetCode', href: profile.leetcode },
  { label: 'Email', href: `mailto:${profile.email}` },
];

export function Contact() {
  return (
    <footer id="contact">
      <div className="mx-auto max-w-site px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-10 border-t border-line pt-16 md:grid-cols-[minmax(0,180px)_1fr] md:gap-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
            Nº006 / Contact
          </p>
          <div>
            <h2 className="font-display text-display-md font-semibold text-paper">
              Open to SDE roles
            </h2>
            <p className="mt-3 max-w-md text-[15px] text-muted">
              {profile.openTo}. LinkedIn or email works best.
            </p>

            <ul className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.href.startsWith('mailto') ? undefined : '_blank'}
                    rel={
                      l.href.startsWith('mailto')
                        ? undefined
                        : 'noopener noreferrer'
                    }
                    className="font-display text-xl text-paper transition-colors hover:text-accent md:text-2xl"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-20 font-mono text-[11px] leading-relaxed text-muted">
              © {new Date().getFullYear()} {profile.name}
              <br className="md:hidden" />
              <span className="hidden md:inline"> · </span>
              {profile.education}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
