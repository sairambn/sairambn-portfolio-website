import { createFileRoute } from "@tanstack/react-router";
import { profile } from "@/data/portfolio";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Sairam Nagarajan — Data Analyst" },
      {
        name: "description",
        content:
          "Get in touch with Sairam Nagarajan about data analyst roles in Bangalore, Hyderabad or remote, freelance Power BI work and collaborations.",
      },
      { property: "og:title", content: "Contact Sairam Nagarajan" },
      {
        property: "og:description",
        content: "Open to data analyst roles in Bangalore, Hyderabad or remote.",
      },
      { property: "og:image", content: "https://bnsairam.vercel.app/content.png" },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-24 sm:px-6">
      <p className="eyebrow">Contact</p>
      <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
        Got data that needs <span className="text-gradient-ember">answers?</span>
      </h1>
      <p className="mt-6 text-[17px] leading-[1.65] text-muted-foreground">
        {profile.openTo}. Available for data analyst roles, freelance Power BI and SQL work, and
        dashboard rescues. LinkedIn or email is the fastest way to reach me.
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-primary px-7 py-3 text-[14px] font-semibold text-primary-foreground shadow-[0_8px_32px_-8px_color-mix(in_oklab,var(--ember)_55%,transparent)] transition-all duration-300 hover:-translate-y-0.5"
        >
          Connect on LinkedIn
        </a>
        <a
          href={`mailto:${profile.email}`}
          className="rounded-full border border-border/80 px-6 py-3 text-[14px] font-medium transition-all duration-300 hover:border-primary/30 hover:bg-secondary/60"
        >
          {profile.email}
        </a>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-border/80 px-6 py-3 text-[14px] font-medium transition-all duration-300 hover:border-primary/30 hover:bg-secondary/60"
        >
          Browse GitHub
        </a>
      </div>

      <dl className="mt-16 grid gap-4 sm:grid-cols-2">
        <div className="surface-card rounded-2xl p-6">
          <dt className="eyebrow">Based in</dt>
          <dd className="mt-3 text-[17px] font-semibold tracking-tight">{profile.location}</dd>
          <dd className="mt-1 text-[13.5px] text-muted-foreground">{profile.openTo}</dd>
        </div>
        <div className="surface-card rounded-2xl p-6">
          <dt className="eyebrow">Education</dt>
          <dd className="mt-3 text-[17px] font-semibold tracking-tight">{profile.education}</dd>
          <dd className="mt-1 text-[13.5px] text-muted-foreground">Looking for full-time Data Analyst roles</dd>
        </div>
      </dl>

      <div className="surface-card mt-6 rounded-2xl p-6 sm:p-8">
        <h2 className="text-[16px] font-semibold tracking-tight">What I can help with</h2>
        <ul className="mt-5 space-y-3 text-[14px] text-muted-foreground">
          <li className="flex gap-2.5">
            <span className="text-primary">→</span>
            End-to-end Power BI dashboards (model, DAX, publish, adoption)
          </li>
          <li className="flex gap-2.5">
            <span className="text-primary">→</span>
            SQL + Python pipelines that keep reports fast and trustworthy
          </li>
          <li className="flex gap-2.5">
            <span className="text-primary">→</span>
            Cleaning up existing dashboards that no one opens
          </li>
          <li className="flex gap-2.5">
            <span className="text-primary">→</span>
            Full-time Data Analyst / BI Analyst roles on product teams
          </li>
        </ul>
      </div>
    </div>
  );
}
