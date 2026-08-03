import { createFileRoute } from "@tanstack/react-router";
import { profile, skills } from "@/data/portfolio";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Sairam BN — Engineer & Problem Solver" },
      {
        name: "description",
        content:
          "About Sairam BN: full-stack engineer with a focus on applied AI/ML, algorithms and interfaces that hide hard problems.",
      },
      { property: "og:title", content: "About Sairam BN" },
      {
        property: "og:description",
        content: "Full-stack engineer focused on applied AI/ML, algorithms and clean interfaces.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-20">
      <p className="eyebrow">About</p>
      <div className="mt-6 grid gap-10 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-start">
        <img
          src={profile.avatar}
          alt={`Portrait of ${profile.name}`}
          loading="lazy"
          className="h-28 w-28 shrink-0 rounded-2xl border border-border object-cover"
        />
        <div className="min-w-0">
          <h1 className="text-4xl font-bold sm:text-5xl">{profile.name}</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{profile.bio}</p>
        </div>
      </div>

      <div className="mt-16 grid gap-5 sm:grid-cols-2">
        <div className="surface-card rounded-2xl p-6">
          <h2 className="text-lg font-semibold">How I work</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Start with the constraint, not the framework. Ship something small that works, then make
            it fast, then make it look inevitable.
          </p>
        </div>
        <div className="surface-card rounded-2xl p-6">
          <h2 className="text-lg font-semibold">What I'm into</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Scheduling and optimisation problems, applied machine learning, and building products
            end-to-end — from schema to the last pixel.
          </p>
        </div>
      </div>

      <h2 className="mt-16 text-2xl font-bold">Skills</h2>
      <div className="mt-5 flex flex-wrap gap-2.5">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-border bg-secondary/40 px-4 py-2 text-sm text-muted-foreground"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
