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
    <header className="sticky top-0 z-50 border-b border-border/25 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-6">
        <Link to="/" className="group flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-primary font-display text-[12px] font-bold text-primary-foreground transition-transform duration-200 group-hover:scale-105">
            SN
          </span>
          <span className="font-display text-[14.5px] font-semibold tracking-tight">
            {profile.shortName}
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 text-[13px] font-medium sm:flex" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="rounded-full px-3.5 py-1.5 text-muted-foreground transition-colors duration-200 hover:text-foreground"
              activeProps={{ className: "bg-secondary/70 text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={`mailto:${profile.email}`}
            className="ml-2 rounded-full bg-primary/12 px-3.5 py-1.5 text-[13px] font-semibold text-primary transition-colors duration-200 hover:bg-primary/20"
          >
            Email
          </a>
        </nav>

        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-border/50 text-muted-foreground transition-colors hover:text-foreground sm:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close" : "Menu"}</span>
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
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
          className="border-t border-border/25 bg-background/95 px-5 py-2.5 backdrop-blur-xl sm:hidden"
          aria-label="Mobile"
        >
          <div className="flex flex-col gap-0.5">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3.5 py-2.5 text-[14px] font-medium text-muted-foreground transition-colors hover:bg-secondary/40 hover:text-foreground"
                activeProps={{ className: "bg-secondary/70 text-foreground" }}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={`mailto:${profile.email}`}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3.5 py-2.5 text-[14px] font-semibold text-primary transition-colors hover:bg-primary/8"
            >
              Email
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/25 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-5 px-5 text-[13px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="tracking-tight">
            Designed & built by{" "}
            <a href={profile.portfolio} className="text-foreground/90 transition-colors hover:text-primary">
              {profile.shortName}
            </a>
            <span className="mx-1.5 text-border">·</span>
            <span className="font-mono text-[11px]">Software Engineer</span>
          </p>
          <p className="mt-1 font-mono text-[11px] text-muted-foreground/65">
            Open to SDE · Bangalore · Hyderabad · Remote
          </p>
        </div>
        <div className="flex flex-wrap gap-5">
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
