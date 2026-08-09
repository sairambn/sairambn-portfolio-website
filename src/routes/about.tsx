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
    <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-20">
      <p className="eyebrow">About</p>

      <div className="relative mt-8">
        <div className="hero-frame relative overflow-hidden rounded-2xl border border-border/50">
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

      <div className="mt-8 max-w-2xl">
        <h1 className="font-script text-[2.6rem] leading-[1.05] tracking-normal sm:text-[3.25rem]">
          {profile.name}
        </h1>
        <p className="mt-2.5 font-mono text-[11px] tracking-[0.14em] text-muted-foreground">
          {profile.headline}
        </p>
        <p className="mt-5 whitespace-pre-line text-[15.5px] leading-[1.7] text-muted-foreground">
          {profile.bio}
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        <div className="surface-card rounded-xl p-6">
          <h2 className="text-[15px] font-semibold tracking-tight">Based in</h2>
          <p className="mt-2.5 text-[14px] text-muted-foreground">{profile.location}</p>
          <p className="mt-1 text-[14px] text-muted-foreground">{profile.openTo}</p>
        </div>
        <div className="surface-card rounded-xl p-6">
          <h2 className="text-[15px] font-semibold tracking-tight">Education</h2>
          <p className="mt-2.5 text-[14px] text-muted-foreground">{profile.education}</p>
          <p className="mt-1 text-[14px] text-muted-foreground">
            Daily algorithm practice + systems shipped on GitHub.
          </p>
        </div>
      </div>

      <h2 className="mt-16 text-[1.85rem] font-semibold tracking-tight sm:text-[2.25rem]">How I work</h2>
      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        {principles.map((p) => (
          <div key={p.title} className="surface-card rounded-xl p-6">
            <h3 className="text-[15px] font-semibold tracking-tight">{p.title}</h3>
            <p className="mt-2.5 text-[14px] leading-relaxed text-muted-foreground">{p.body}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-16 text-[1.85rem] font-semibold tracking-tight sm:text-[2.25rem]">What I've built</h2>
      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        {impact.slice(0, 4).map((item) => (
          <div key={item.title} className="surface-card rounded-xl p-6">
            <h3 className="text-[15px] font-semibold tracking-tight">{item.title}</h3>
            <p className="mt-2 text-[14px] text-primary">{item.result}</p>
            <p className="mt-2 text-[13.5px] text-muted-foreground">{item.detail}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-16 text-[1.85rem] font-semibold tracking-tight sm:text-[2.25rem]">Skills</h2>
      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <div key={group.title} className="surface-card rounded-xl p-6">
            <h3 className="text-[14px] font-semibold tracking-tight text-primary">{group.title}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border/60 bg-secondary/25 px-3 py-1 text-[12.5px] text-muted-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap gap-2.5">
        <Link
          to="/projects"
          className="rounded-full bg-primary px-7 py-3 text-[13.5px] font-semibold text-primary-foreground transition-all duration-250 hover:-translate-y-0.5"
        >
          See the work
        </Link>
        <Link
          to="/contact"
          className="rounded-full border border-border/70 px-6 py-3 text-[13.5px] font-medium transition-all duration-250 hover:border-primary/30 hover:bg-secondary/50"
        >
          Get in touch
        </Link>
        <a
          href={profile.leetcode}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-border/70 px-6 py-3 text-[13.5px] font-medium transition-all duration-250 hover:border-primary/30 hover:bg-secondary/50"
        >
          LeetCode
        </a>
      </div>
    </div>
  );
}
