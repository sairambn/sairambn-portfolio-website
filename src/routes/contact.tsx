import { createFileRoute } from "@tanstack/react-router";
import { profile } from "@/data/portfolio";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Sairam Nagarajan — Software Engineer" },
      {
        name: "description",
        content:
          "Contact Sairam Nagarajan about Software Development Engineer roles in Bangalore, Hyderabad or remote.",
      },
      { property: "og:title", content: "Contact Sairam Nagarajan" },
      {
        property: "og:description",
        content: "Open to SDE roles in Bangalore, Hyderabad or remote. High-bar product teams preferred.",
      },
      { property: "og:image", content: "https://bnsairam.vercel.app/content.png" },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-28">
      <div className="max-w-3xl">
        <p className="eyebrow">Contact</p>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-[3.5rem]">
          Looking for clean, reliable{" "}
          <span className="text-gradient-ember">software?</span>
        </h1>
        <p className="mt-6 text-[17px] leading-[1.75] text-muted-foreground">
          {profile.openTo}. Available for full-time Software Development Engineer roles on high-bar
          product teams — including Google. LinkedIn or email is the fastest way to reach me.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-primary px-8 py-3.5 text-[14px] font-semibold text-primary-foreground shadow-[0_10px_40px_-8px_color-mix(in_oklab,var(--ember)_60%,transparent)] transition-all duration-300 hover:-translate-y-0.5"
          >
            Connect on LinkedIn
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full border border-border/80 px-6 py-3.5 text-[14px] font-medium transition-all duration-300 hover:border-primary/35 hover:bg-secondary/60"
          >
            {profile.email}
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-border/80 px-6 py-3.5 text-[14px] font-medium transition-all duration-300 hover:border-primary/35 hover:bg-secondary/60"
          >
            GitHub
          </a>
          <a
            href={profile.leetcode}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-border/80 px-6 py-3.5 text-[14px] font-medium transition-all duration-300 hover:border-primary/35 hover:bg-secondary/60"
          >
            LeetCode
          </a>
        </div>
      </div>

      <dl className="mt-16 grid max-w-4xl gap-5 sm:grid-cols-2">
        <div className="surface-card rounded-2xl p-7">
          <dt className="eyebrow">Based in</dt>
          <dd className="mt-4 text-[18px] font-semibold tracking-tight">{profile.location}</dd>
          <dd className="mt-1.5 text-[14px] text-muted-foreground">{profile.openTo}</dd>
        </div>
        <div className="surface-card rounded-2xl p-7">
          <dt className="eyebrow">Education</dt>
          <dd className="mt-4 text-[18px] font-semibold tracking-tight">{profile.education}</dd>
          <dd className="mt-1.5 text-[14px] text-muted-foreground">Preparing for full-time SDE roles</dd>
        </div>
      </dl>

      <div className="surface-card mt-6 max-w-4xl rounded-2xl p-8 sm:p-10">
        <h2 className="text-[17px] font-semibold tracking-tight">What I bring</h2>
        <ul className="mt-6 space-y-4 text-[15px] text-muted-foreground">
          <li className="flex gap-3">
            <span className="text-primary">→</span>
            Clean, production-quality code in Python and Java
          </li>
          <li className="flex gap-3">
            <span className="text-primary">→</span>
            Strong data structures, algorithms, and problem-solving foundations
          </li>
          <li className="flex gap-3">
            <span className="text-primary">→</span>
            End-to-end ownership — constraint engines, data systems, live products
          </li>
          <li className="flex gap-3">
            <span className="text-primary">→</span>
            Full-time Software Development Engineer roles on high-bar teams
          </li>
        </ul>
      </div>
    </div>
  );
}
