import { profile } from "@/data/portfolio";

const CIRCUMFERENCE = 2 * Math.PI * 42; // r = 42

type GitHubStatsProps = {
  totalContributions?: number;
  currentStreak?: number;
  longestStreak?: number;
  contributionsPeriod?: string;
  streakPeriod?: string;
};

export function GitHubStats({
  totalContributions = 445,
  currentStreak = 12,
  longestStreak = 12,
  contributionsPeriod = "Jul 24 – Present",
  streakPeriod = "Jul 24 – Aug 4",
}: GitHubStatsProps) {
  // Full ring when streak is active; scale if you later pass a max value
  const progress = 1;
  const offset = CIRCUMFERENCE * (1 - progress);

  return (
    <section className="mx-auto max-w-6xl px-5 pb-24" aria-labelledby="github-stats-heading">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Activity</p>
          <h2 id="github-stats-heading" className="mt-3 text-3xl font-bold sm:text-4xl">
            GitHub Stats
          </h2>
        </div>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          View profile →
        </a>
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-border/60 shadow-[var(--shadow-lift)]">
        <div className="grid grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {/* Total Contributions */}
          <div className="flex flex-col items-center justify-center gap-1.5 bg-card/90 px-6 py-10 text-center backdrop-blur-sm">
            <span className="font-display text-4xl font-bold tracking-tight text-gradient-ember sm:text-5xl">
              {totalContributions}
            </span>
            <span className="text-sm font-medium text-foreground">Total Contributions</span>
            <span className="font-mono text-xs tracking-wide text-muted-foreground">
              {contributionsPeriod}
            </span>
          </div>

          {/* Current Streak */}
          <div className="flex flex-col items-center justify-center gap-2 bg-card/90 px-6 py-10 text-center backdrop-blur-sm">
            <div
              className="relative h-[92px] w-[92px]"
              role="img"
              aria-label={`Current streak of ${currentStreak} days`}
            >
              <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="oklch(0.22 0.012 55)"
                  strokeWidth="6"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="var(--ember)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={offset}
                  className="transition-[stroke-dashoffset] duration-700 ease-out"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center font-display text-3xl font-bold text-primary">
                {currentStreak}
              </span>
            </div>
            <span className="text-sm font-medium text-primary">Current Streak</span>
            <span className="font-mono text-xs tracking-wide text-muted-foreground">
              {streakPeriod}
            </span>
          </div>

          {/* Longest Streak */}
          <div className="flex flex-col items-center justify-center gap-1.5 bg-card/90 px-6 py-10 text-center backdrop-blur-sm">
            <span className="font-display text-4xl font-bold tracking-tight text-gradient-ember sm:text-5xl">
              {longestStreak}
            </span>
            <span className="text-sm font-medium text-foreground">Longest Streak</span>
            <span className="font-mono text-xs tracking-wide text-muted-foreground">
              {streakPeriod}
            </span>
          </div>
        </div>
      </div>

      <p className="mt-4 text-center font-mono text-xs text-muted-foreground">
        Stats update with your GitHub activity · account since Jul 2026
      </p>
    </section>
  );
}
