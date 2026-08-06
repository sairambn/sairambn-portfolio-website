import { createFileRoute } from "@tanstack/react-router";
import { profile } from "@/data/portfolio";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Sairam Nagarajan — Software Engineer" },
      {
        name: "description",
        content:
          "Get in touch with Sairam Nagarajan about Software Development Engineer roles in Bangalore, Hyderabad or remote, collaborations and opportunities.",
      },
      { property: "og:title", content: "Contact Sairam Nagarajan" },
      {
        property: "og:description",
        content: "Open to SDE roles in Bangalore, Hyderabad or remote. Preference for Google and high-bar teams.",
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
        Looking for clean, reliable <span className="text-gradient-ember">software?</span>
      </h1>
      <p className="mt-6 text-[17px] leading-[1.65] text-muted-foreground">
        {profile.openTo}. Available for full-time Software Development Engineer roles, with a
        preference for Google and high-bar product teams. LinkedIn or email is the fastest way to
        reach me.
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
          <dd className="mt-1 text-[13.5px] text-muted-foreground">
            Preparing for full-time SDE roles
          </dd>
        </div>
      </dl>

      <div className="surface-card mt-6 rounded-2xl p-6 sm:p-8">
        <h2 className="text-[16px] font-semibold tracking-tight">What I can help with</h2>
        <ul className="mt-5 space-y-3 text-[14px] text-muted-foreground">
          <li className="flex gap-2.5">
            <span className="text-primary">→</span>
            Writing clean, production-quality code in Python and Java
          </li>
          <li className="flex gap-2.5">
            <span className="text-primary">→</span>
            Strong data structures, algorithms, and problem-solving foundations
          </li>
          <li className="flex gap-2.5">
            <span className="text-primary">→</span>
            Shipping complete products end-to-end (web + tooling)
          </li>
          <li className="flex gap-2.5">
            <span className="text-primary">→</span>
            Full-time Software Development Engineer roles on high-bar teams
          </li>
        </ul>
      </div>
    </div>
  );
}
