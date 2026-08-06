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
    <header className="sticky top-0 z-50 border-b border-border/30 bg-background/65 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6">
        <Link to="/" className="group flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-primary font-display text-[13px] font-bold text-primary-foreground shadow-[0_0_28px_-4px_color-mix(in_oklab,var(--ember)_60%,transparent)] transition-transform duration-300 group-hover:scale-105">
            SN
          </span>
          <span className="font-display text-[15px] font-semibold tracking-tight">
            {profile.shortName}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 text-[13px] font-medium sm:flex" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="rounded-full px-4 py-2 text-muted-foreground transition-all duration-200 hover:text-foreground"
              activeProps={{ className: "bg-secondary/80 text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:text-foreground sm:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close" : "Menu"}</span>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            {open ? (
              <path
                d="M4 4l10 10M14 4L4 14"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M3 5.5h12M3 9h12M3 12.5h12"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav
          className="border-t border-border/30 bg-background/95 px-5 py-3 backdrop-blur-2xl sm:hidden"
          aria-label="Mobile"
        >
          <div className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-[14px] font-medium text-muted-foreground transition-colors hover:bg-secondary/50 hover:text-foreground"
                activeProps={{ className: "bg-secondary/80 text-foreground" }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/30 py-14">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-5 text-[13px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="tracking-tight">
          Designed & built by{" "}
          <a href={profile.portfolio} className="text-foreground/90 transition-colors hover:text-primary">
            {profile.shortName}
          </a>
          <span className="mx-1.5 text-border">·</span>
          <span className="font-mono text-[11px]">Software Engineer</span>
        </p>
        <div className="flex flex-wrap gap-6">
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="transition-colors hover:text-foreground">
            LinkedIn
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="transition-colors hover:text-foreground">
            GitHub
          </a>
          <a href={profile.leetcode} target="_blank" rel="noreferrer" className="transition-colors hover:text-foreground">
            LeetCode
          </a>
          <a href={`mailto:${profile.email}`} className="transition-colors hover:text-foreground">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
