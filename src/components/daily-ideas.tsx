import { useEffect, useState } from "react";
import { dailyIdeas } from "@/data/portfolio";

function isPastNoonIST() {
  const now = new Date();
  const istOffset = 5.5 * 60;
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const ist = new Date(utc + istOffset * 60000);
  return ist.getHours() >= 12;
}

export function DailyIdeas() {
  const [unlocked, setUnlocked] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setUnlocked(isPastNoonIST());
    setReady(true);

    const id = setInterval(() => {
      setUnlocked(isPastNoonIST());
    }, 60_000);

    return () => clearInterval(id);
  }, []);

  if (!ready) {
    return null;
  }

  return (
    <section className="mx-auto max-w-6xl px-5 pb-28 sm:px-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Daily ideas</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Thinking out loud
          </h2>
        </div>
        <p className="shrink-0 font-mono text-[11px] tracking-wider text-muted-foreground">
          Unlocks at 12:00 IST
        </p>
      </div>

      {!unlocked ? (
        <div className="surface-card mt-10 rounded-2xl p-10 text-center">
          <p className="font-script text-3xl text-primary">Coming at noon</p>
          <p className="mt-3 text-[14px] text-muted-foreground">
            Today's ideas unlock after 12:00 PM IST. Check back then.
          </p>
        </div>
      ) : (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {dailyIdeas.map((idea) => (
            <div key={idea.id} className="surface-card rounded-2xl p-6">
              <p className="font-mono text-[10px] tracking-[0.16em] text-primary uppercase">
                Idea {String(idea.id).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-[15px] font-semibold tracking-tight">{idea.title}</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">{idea.body}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
