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
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-5 sm:pt-5">
      <div className="mx-auto max-w-4xl">
        <div className="glass flex items-center justify-between rounded-[22px] px-4 py-2.5 sm:rounded-full sm:px-5">
          <Link
            to="/"
            className="group flex items-center gap-2.5"
            onClick={() => setOpen(false)}
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-[11px] font-bold tracking-tight text-primary-foreground shadow-sm transition-transform duration-200 group-hover:scale-105">
              SN
            </span>
            <span className="text-[15px] font-semibold tracking-tight">
              {profile.shortName}
            </span>
          </Link>

          <nav
            className="hidden items-center gap-0.5 text-[13px] font-medium sm:flex"
            aria-label="Main"
          >
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className="rounded-full px-3.5 py-1.5 text-muted-foreground transition-colors duration-200 hover:text-foreground"
                activeProps={{
                  className: "bg-primary/15 text-primary font-semibold",
                }}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={`mailto:${profile.email}`}
              className="ml-1.5 rounded-full bg-primary px-4 py-1.5 text-[13px] font-semibold text-primary-foreground shadow-sm transition-opacity duration-200 hover:opacity-90"
            >
              Email
            </a>
          </nav>

          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-black/5 hover:text-foreground sm:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close" : "Menu"}</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 18 18"
              fill="none"
              aria-hidden="true"
            >
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
            className="glass mt-2 overflow-hidden rounded-[20px] px-2 py-2 sm:hidden"
            aria-label="Mobile"
          >
            <div className="flex flex-col gap-0.5">
              {nav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" }}
                  onClick={() => setOpen(false)}
                  className="rounded-[14px] px-4 py-3 text-[15px] font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground"
                  activeProps={{
                    className: "bg-primary/12 text-primary font-semibold",
                  }}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={`mailto:${profile.email}`}
                onClick={() => setOpen(false)}
                className="rounded-[14px] px-4 py-3 text-[15px] font-semibold text-primary transition-colors hover:bg-primary/10"
              >
                Email
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="py-16">
      <div className="mx-auto flex max-w-4xl flex-col items-start gap-5 px-5 text-[13px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="tracking-tight">
            Designed & built by{" "}
            <a
              href={profile.portfolio}
              className="text-foreground transition-colors hover:text-primary"
            >
              {profile.shortName}
            </a>
            <span className="mx-1.5 opacity-30">·</span>
            <span className="text-[11px]">Software Engineer</span>
          </p>
          <p className="mt-1 text-[11px] text-muted-foreground/70">
            Open to SDE · Bangalore · Hyderabad · Remote
          </p>
        </div>
        <div className="flex flex-wrap gap-5">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            LinkedIn
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href={profile.leetcode}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            LeetCode
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="transition-colors hover:text-foreground"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
