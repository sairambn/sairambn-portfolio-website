import { profile } from '@/lib/data';

const links = [
  { label: 'LinkedIn', href: profile.linkedin },
  { label: 'GitHub', href: profile.github },
  { label: 'LeetCode', href: profile.leetcode },
  { label: 'Email', href: `mailto:${profile.email}` },
];

export function Contact() {
  return (
    <footer id="contact" className="border-t border-line">
      <div className="mx-auto max-w-site px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-10 md:grid-cols-[minmax(0,200px)_1fr]">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            Nº006 / Contact
          </p>
          <div>
            <h2 className="font-display text-display-md font-semibold text-paper">
              Open to SDE roles
            </h2>
            <p className="mt-3 text-sm text-muted">{profile.openTo}</p>

            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
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
                    className="font-display text-lg text-paper transition-colors hover:text-accent md:text-xl"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-16 font-mono text-[11px] text-muted">
              © {new Date().getFullYear()} {profile.name} · {profile.education}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
