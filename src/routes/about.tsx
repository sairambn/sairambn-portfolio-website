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
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-6 sm:py-20">
      <p className="eyebrow">About</p>

      {/* Full-width uncropped photo */}
      <div className="relative mt-8">
        <div className="absolute -inset-4 rounded-[1.75rem] bg-gradient-to-br from-primary/20 via-transparent to-primary/8 blur-2xl" />
        <div className="relative overflow-hidden rounded-[1.5rem] border border-border/50 shadow-[var(--shadow-lift)]">
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

      <div className="mt-10">
        <h1 className="font-script text-[2.85rem] leading-[1.05] tracking-normal sm:text-[3.4rem]">
          {profile.name}
        </h1>
        <p className="mt-3 font-mono text-[11px] tracking-[0.16em] text-muted-foreground">
          {profile.headline}
        </p>
        <p className="mt-5 whitespace-pre-line text-[15.5px] leading-[1.7] text-muted-foreground">
          {profile.bio}
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        <div className="surface-card rounded-2xl p-6">
          <h2 className="text-[15px] font-semibold tracking-tight">Based in</h2>
          <p className="mt-2 text-[13.5px] text-muted-foreground">{profile.location}</p>
          <p className="mt-1 text-[13.5px] text-muted-foreground">{profile.openTo}</p>
        </div>
        <div className="surface-card rounded-2xl p-6">
          <h2 className="text-[15px] font-semibold tracking-tight">Education</h2>
          <p className="mt-2 text-[13.5px] text-muted-foreground">{profile.education}</p>
          <p className="mt-1 text-[13.5px] text-muted-foreground">
            Daily algorithm practice + systems shipped on GitHub.
          </p>
        </div>
      </div>

      <h2 className="mt-16 text-2xl font-semibold tracking-tight">How I work</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {principles.map((p) => (
          <div key={p.title} className="surface-card rounded-2xl p-5">
            <h3 className="text-[14px] font-semibold tracking-tight">{p.title}</h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">{p.body}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-16 text-2xl font-semibold tracking-tight">What I've built</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {impact.slice(0, 4).map((item) => (
          <div key={item.title} className="surface-card rounded-2xl p-5">
            <h3 className="text-[14px] font-semibold tracking-tight">{item.title}</h3>
            <p className="mt-1.5 text-[13.5px] text-primary">{item.result}</p>
            <p className="mt-1.5 text-[13px] text-muted-foreground">{item.detail}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-16 text-2xl font-semibold tracking-tight">Skills</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <div key={group.title} className="surface-card rounded-2xl p-5">
            <h3 className="text-[13px] font-semibold tracking-tight text-primary">{group.title}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border/70 bg-secondary/30 px-3 py-1.5 text-[12.5px] text-muted-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-14 flex flex-wrap gap-3">
        <Link
          to="/projects"
          className="rounded-full bg-primary px-7 py-3 text-[14px] font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5"
        >
          See the work
        </Link>
        <Link
          to="/contact"
          className="rounded-full border border-border/80 px-6 py-3 text-[14px] font-medium transition-all duration-300 hover:border-primary/30 hover:bg-secondary/60"
        >
          Get in touch
        </Link>
        <a
          href={profile.leetcode}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-border/80 px-6 py-3 text-[14px] font-medium transition-all duration-300 hover:border-primary/30 hover:bg-secondary/60"
        >
          LeetCode
        </a>
      </div>
    </div>
  );
}
