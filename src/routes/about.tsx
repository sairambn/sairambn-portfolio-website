import { createFileRoute, Link } from "@tanstack/react-router";
import { profile, skillGroups, impact, principles } from "@/data/portfolio";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Sairam Nagarajan — Software Engineer in Chennai" },
      {
        name: "description",
        content:
          "About Sairam Nagarajan: Chennai-based software engineer (M.E. CEG '25) focused on clean code, DSA, and preparing for SDE roles at high-bar companies.",
      },
      { property: "og:title", content: "About Sairam Nagarajan" },
      {
        property: "og:description",
        content:
          "Software engineer focused on clean, efficient code and solving problems at scale. Preparing for SDE roles.",
      },
      { property: "og:image", content: "https://bnsairam.vercel.app/content.png" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-24">
      <p className="eyebrow">About</p>

      <div className="relative mt-10">
        <div className="pointer-events-none absolute -inset-8 -z-10 rounded-[2.5rem] bg-gradient-to-br from-primary/25 via-primary/5 to-transparent blur-3xl" />
        <div className="hero-frame relative overflow-hidden rounded-2xl border border-border/40 sm:rounded-[1.75rem]">
          <img
            src={profile.avatar}
            alt={`Portrait of ${profile.name}`}
            loading="lazy"
            width={1551}
            height={798}
            className="h-auto w-full object-contain object-center"
          />
        </div>
      </div>

      <div className="mt-10 max-w-3xl">
        <h1 className="font-script text-[3rem] leading-[1.05] tracking-normal sm:text-[3.75rem]">
          {profile.name}
        </h1>
        <p className="mt-3 font-mono text-[11px] tracking-[0.16em] text-muted-foreground">
          {profile.headline}
        </p>
        <p className="mt-6 whitespace-pre-line text-[16.5px] leading-[1.75] text-muted-foreground">
          {profile.bio}
        </p>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2">
        <div className="surface-card rounded-2xl p-7">
          <h2 className="text-[16px] font-semibold tracking-tight">Based in</h2>
          <p className="mt-3 text-[14.5px] text-muted-foreground">{profile.location}</p>
          <p className="mt-1 text-[14.5px] text-muted-foreground">{profile.openTo}</p>
        </div>
        <div className="surface-card rounded-2xl p-7">
          <h2 className="text-[16px] font-semibold tracking-tight">Education</h2>
          <p className="mt-3 text-[14.5px] text-muted-foreground">{profile.education}</p>
          <p className="mt-1 text-[14.5px] text-muted-foreground">
            Daily algorithm practice + systems shipped on GitHub.
          </p>
        </div>
      </div>

      <h2 className="mt-20 text-3xl font-semibold tracking-tight sm:text-4xl">How I work</h2>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {principles.map((p) => (
          <div key={p.title} className="surface-card rounded-2xl p-7">
            <h3 className="text-[16px] font-semibold tracking-tight">{p.title}</h3>
            <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">{p.body}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-20 text-3xl font-semibold tracking-tight sm:text-4xl">What I've built</h2>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {impact.slice(0, 4).map((item) => (
          <div key={item.title} className="surface-card rounded-2xl p-7">
            <h3 className="text-[16px] font-semibold tracking-tight">{item.title}</h3>
            <p className="mt-2 text-[15px] text-primary">{item.result}</p>
            <p className="mt-2 text-[14px] text-muted-foreground">{item.detail}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-20 text-3xl font-semibold tracking-tight sm:text-4xl">Skills</h2>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <div key={group.title} className="surface-card rounded-2xl p-7">
            <h3 className="text-[15px] font-semibold tracking-tight text-primary">{group.title}</h3>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border/70 bg-secondary/30 px-4 py-1.5 text-[13.5px] text-muted-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 flex flex-wrap gap-3">
        <Link
          to="/projects"
          className="rounded-full bg-primary px-8 py-3.5 text-[14px] font-semibold text-primary-foreground shadow-[0_10px_40px_-8px_color-mix(in_oklab,var(--ember)_60%,transparent)] transition-all duration-300 hover:-translate-y-0.5"
        >
          See the work
        </Link>
        <Link
          to="/contact"
          className="rounded-full border border-border/80 px-7 py-3.5 text-[14px] font-medium transition-all duration-300 hover:border-primary/35 hover:bg-secondary/60"
        >
          Get in touch
        </Link>
        <a
          href={profile.leetcode}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-border/80 px-7 py-3.5 text-[14px] font-medium transition-all duration-300 hover:border-primary/35 hover:bg-secondary/60"
        >
          LeetCode
        </a>
      </div>
    </div>
  );
}
