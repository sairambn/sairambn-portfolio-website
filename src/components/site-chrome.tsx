import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { profile } from "@/data/portfolio";

const nav = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-[#f7f6f3]/92 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5 sm:px-6">
        <Link
          to="/"
          className="text-[15px] font-semibold tracking-tight"
          onClick={() => setOpen(false)}
        >
          {profile.shortName}
        </Link>

        <nav className="hidden items-center gap-6 text-[13.5px] sm:flex" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{
                className: "text-foreground font-medium",
              }}
            >
              {item.label}
            </Link>
          ))}
          <a
            href="/resume.pdf"
            download="Sairam_BN_Resume.pdf"
            className="rounded-md bg-foreground px-3 py-1.5 text-[13px] font-medium text-background transition-opacity hover:opacity-85"
          >
            Resume
          </a>
        </nav>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center text-muted-foreground sm:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
            {open ? (
              <path
                d="M4 4l10 10M14 4L4 14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M3 5h12M3 9h12M3 13h12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-border px-5 py-3 sm:hidden" aria-label="Mobile">
          <div className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2.5 text-[15px] text-muted-foreground hover:text-foreground"
                activeProps={{ className: "text-foreground font-medium" }}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="/resume.pdf"
              download="Sairam_BN_Resume.pdf"
              onClick={() => setOpen(false)}
              className="mt-1 rounded-md bg-foreground px-3 py-2.5 text-center text-[14px] font-medium text-background"
            >
              Resume
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-5 text-[13px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          {profile.shortName}
          <span className="mx-2 opacity-40">·</span>
          Open to SDE roles
        </p>
        <div className="flex flex-wrap gap-5">
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-foreground">
            LinkedIn
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-foreground">
            GitHub
          </a>
          <a href={profile.leetcode} target="_blank" rel="noreferrer" className="hover:text-foreground">
            LeetCode
          </a>
          <a href={`mailto:${profile.email}`} className="hover:text-foreground">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
