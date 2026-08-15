import { profile } from "@/data/portfolio";

type GitHubStatsProps = {
  totalContributions?: number;
  currentStreak?: number;
  longestStreak?: number;
  contributionsPeriod?: string;
  streakPeriod?: string;
};

export function GitHubStats({
  totalContributions = 520,
  currentStreak = 15,
  longestStreak = 15,
  contributionsPeriod = "Jul 24 – Present",
  streakPeriod = "Jul 24 – Aug 7",
}: GitHubStatsProps) {
  return (
    <section className="mx-auto max-w-5xl px-5 pb-16 sm:px-6 sm:pb-20" aria-labelledby="github-stats-heading">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Activity</p>
          <h2 id="github-stats-heading" className="mt-2 text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
            GitHub
          </h2>
        </div>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="text-[13px] text-muted-foreground hover:text-foreground"
        >
          Profile →
        </a>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-6 border-t border-border pt-8">
        <div>
          <p className="text-2xl font-semibold tracking-tight sm:text-3xl">{totalContributions}</p>
          <p className="mt-1 text-[13px] text-muted-foreground">Contributions</p>
          <p className="mt-0.5 font-mono text-[11px] text-muted-foreground/70">{contributionsPeriod}</p>
        </div>
        <div>
          <p className="text-2xl font-semibold tracking-tight sm:text-3xl">{currentStreak}</p>
          <p className="mt-1 text-[13px] text-muted-foreground">Current streak</p>
          <p className="mt-0.5 font-mono text-[11px] text-muted-foreground/70">{streakPeriod}</p>
        </div>
        <div>
          <p className="text-2xl font-semibold tracking-tight sm:text-3xl">{longestStreak}</p>
          <p className="mt-1 text-[13px] text-muted-foreground">Longest streak</p>
          <p className="mt-0.5 font-mono text-[11px] text-muted-foreground/70">{streakPeriod}</p>
        </div>
      </div>
    </section>
  );
}
