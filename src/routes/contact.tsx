import { createFileRoute } from "@tanstack/react-router";
import { profile } from "@/data/portfolio";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact BN Sairam — Data Analyst" },
      {
        name: "description",
        content:
          "Get in touch with BN Sairam about data analyst roles in Bangalore, Hyderabad or remote, freelance Power BI work and collaborations.",
      },
      { property: "og:title", content: "Contact BN Sairam" },
      {
        property: "og:description",
        content: "Open to data analyst roles in Bangalore, Hyderabad or remote.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-24">
      <p className="eyebrow">Contact</p>
      <h1 className="mt-4 text-4xl font-bold sm:text-6xl">
        Got data that needs <span className="text-gradient-ember">answers?</span>
      </h1>
      <p className="mt-6 text-lg text-muted-foreground">
        {profile.openTo}. I'm available for data analyst roles, freelance Power BI and SQL work, and
        dashboard rescues. LinkedIn is the fastest way to reach me.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
        >
          Connect on LinkedIn
        </a>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
        >
          Browse GitHub
        </a>
      </div>
      <dl className="mt-16 grid gap-5 sm:grid-cols-2">
        <div className="surface-card rounded-2xl p-6">
          <dt className="eyebrow">Based in</dt>
          <dd className="mt-2 text-lg font-semibold">{profile.location}</dd>
        </div>
        <div className="surface-card rounded-2xl p-6">
          <dt className="eyebrow">Education</dt>
          <dd className="mt-2 text-lg font-semibold">{profile.education}</dd>
        </div>
      </dl>
    </div>
  );
}
