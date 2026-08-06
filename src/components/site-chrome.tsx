import { Link } from "@tanstack/react-router";
import { profile } from "@/data/portfolio";

const nav = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-6">
        <Link to="/" className="group flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-primary font-display text-[13px] font-bold text-primary-foreground shadow-[0_0_24px_-4px_color-mix(in_oklab,var(--ember)_55%,transparent)] transition-transform duration-300 group-hover:scale-105">
            SN
          </span>
          <span className="font-display text-[15px] font-semibold tracking-tight">{profile.shortName}</span>
        </Link>
        <nav className="flex items-center gap-0.5 text-[13px] font-medium" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="rounded-full px-3.5 py-1.5 text-muted-foreground transition-all duration-200 hover:text-foreground"
              activeProps={{ className: "bg-secondary/80 text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-5 text-[13px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="tracking-tight">
          Designed & built by{" "}
          <a
            href={profile.portfolio}
            target="_blank"
            rel="noreferrer"
            className="text-foreground/90 transition-colors hover:text-primary"
          >
            {profile.shortName}
          </a>
        </p>
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
