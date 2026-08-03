import { createFileRoute } from "@tanstack/react-router";
import { profile } from "@/data/portfolio";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Sairam BN" },
      {
        name: "description",
        content:
          "Get in touch with Sairam BN about engineering roles, freelance builds or collaborations on open-source projects.",
      },
      { property: "og:title", content: "Contact Sairam BN" },
      {
        property: "og:description",
        content: "Open to roles, freelance builds and open-source collaborations.",
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
        Got something worth <span className="text-gradient-ember">building?</span>
      </h1>
      <p className="mt-6 text-lg text-muted-foreground">
        I'm open to engineering roles, freelance builds and collaborations on open-source. The
        fastest way to reach me is GitHub.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
        >
          Message me on GitHub
        </a>
        <a
          href={`${profile.github}?tab=repositories`}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
        >
          Browse repositories
        </a>
      </div>
    </div>
  );
}
