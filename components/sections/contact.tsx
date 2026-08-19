import { profile } from '@/lib/data';

const links = [
  { label: 'LinkedIn', href: profile.linkedin },
  { label: 'GitHub', href: profile.github },
  { label: 'LeetCode', href: profile.leetcode },
];

export function Contact() {
  return (
    <footer id="contact">
      <div className="mx-auto max-w-site px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-10 border-t border-line pt-16 md:grid-cols-[minmax(0,180px)_1fr] md:gap-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
            Nº007 / Contact
          </p>
          <div>
            <h2 className="font-display text-display-md text-paper">Open to SDE roles</h2>
            <p className="mt-3 max-w-md text-[15px] leading-[1.7] text-muted">
              {profile.openTo}. Email is the fastest path.
            </p>

            <a
              href={`mailto:${profile.email}`}
              className="link-quiet mt-10 inline-block font-display text-2xl font-medium tracking-tight md:text-3xl"
            >
              {profile.email}
            </a>

            <ul className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-quiet font-display text-lg font-medium tracking-tight md:text-xl"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-24 font-mono text-[10px] leading-relaxed tracking-wide text-muted/70">
              © {new Date().getFullYear()} {profile.name}
              <span className="mx-2 text-line">·</span>
              <span className="text-muted/55">{profile.education}</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
