import { useEffect, useState } from "react";
import { profile } from "@/data/portfolio";
import wallpaper from "@/assets/wallpaper.jpg";
import avatar from "@/assets/avatar-head.jpg";

export function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  const [now, setNow] = useState<Date | null>(null);
  const [pw, setPw] = useState("");
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 20000);
    return () => clearInterval(t);
  }, []);

  const unlock = () => {
    if (leaving) return;
    setLeaving(true);
    setTimeout(onUnlock, 620);
  };

  return (
    <div
      className={`fixed inset-0 z-[5000] transition-all duration-[600ms] ease-out ${
        leaving ? "pointer-events-none scale-[1.06] opacity-0 blur-md" : "opacity-100"
      }`}
    >
      <img src={wallpaper} alt="" aria-hidden className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-[oklch(0.1_0.03_265/0.45)] backdrop-blur-2xl" />

      <div className="relative flex h-full flex-col items-center justify-between py-10">
        <div className="mt-6 text-center text-foreground drop-shadow-lg">
          <p className="text-[15px] font-medium tracking-wide text-foreground/80">
            {now?.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" }) ?? ""}
          </p>
          <p className="text-[86px] font-semibold leading-none tracking-tight sm:text-[110px]">
            {now?.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", hour12: false }) ?? "--:--"}
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            unlock();
          }}
          className="flex flex-col items-center gap-3"
        >
          <img
            src={avatar}
            alt={`${profile.name} portrait`}
            width={112}
            height={112}
            className="size-[104px] rounded-full object-cover shadow-[0_18px_50px_oklch(0_0_0/0.5)] ring-2 ring-[oklch(1_0_0/0.35)]"
          />
          <p className="text-[17px] font-medium text-foreground drop-shadow">{profile.shortName}</p>
          <div className="flex items-center gap-2 rounded-full border border-[oklch(1_0_0/0.25)] bg-[oklch(1_0_0/0.14)] px-3 py-1.5 backdrop-blur-xl">
            <input
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="Click or press Enter"
              aria-label="Enter password"
              className="w-40 bg-transparent text-center text-[13px] text-foreground outline-none placeholder:text-foreground/55"
            />
            <button
              type="submit"
              aria-label="Log in"
              className="grid size-6 shrink-0 place-items-center rounded-full bg-[oklch(1_0_0/0.25)] text-[13px] text-foreground transition hover:bg-[oklch(1_0_0/0.4)]"
            >
              →
            </button>
          </div>
          <button
            type="button"
            onClick={unlock}
            className="text-[12px] text-foreground/70 underline-offset-4 transition hover:text-foreground hover:underline"
          >
            Touch ID or click to log in
          </button>
        </form>

        <p className="text-[12px] text-foreground/70">{profile.headline}</p>
      </div>
    </div>
  );
}
