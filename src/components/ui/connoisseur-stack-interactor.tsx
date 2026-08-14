import { cn } from "@/lib/utils";
import { useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";

interface MenuItem {
  num: string;
  name: string;
  clipId: string;
  image: string;
  href?: string;
}

const defaultItems: MenuItem[] = [
  {
    num: "01",
    name: "AI Thon",
    clipId: "clip-original",
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1000&q=80",
    href: "https://ai-thon-one.vercel.app",
  },
  {
    num: "02",
    name: "Timetable",
    clipId: "clip-hexagons",
    image:
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1000&q=80",
    href: "https://master-timetable-generator.vercel.app",
  },
  {
    num: "03",
    name: "Exam Stats",
    clipId: "clip-pixels",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
    href: "https://aiml-stats-portal.vercel.app",
  },
];

export function ConnoisseurStackInteractor({
  items = defaultItems,
  className,
}: {
  items?: MenuItem[];
  className?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<SVGImageElement>(null);
  const mainGroupRef = useRef<SVGGElement>(null);
  const masterTl = useRef<gsap.core.Timeline | null>(null);

  const createLoop = (index: number) => {
    const item = items[index];
    if (!item) return;
    const selector = `#${item.clipId} .path`;

    if (masterTl.current) masterTl.current.kill();
    if (imageRef.current) imageRef.current.setAttribute("href", item.image);
    if (mainGroupRef.current)
      mainGroupRef.current.setAttribute("clip-path", `url(#${item.clipId})`);

    gsap.set(selector, { scale: 0, transformOrigin: "50% 50%" });

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    tl.to(selector, {
      scale: 1,
      duration: 0.8,
      stagger: { amount: 0.4, from: "random" },
      ease: "expo.out",
    })
      .to(selector, {
        scale: 1.05,
        duration: 1.5,
        yoyo: true,
        repeat: 1,
        ease: "sine.inOut",
        stagger: { amount: 0.2, from: "center" },
      })
      .to(selector, {
        scale: 0,
        duration: 0.6,
        stagger: { amount: 0.3, from: "edges" },
        ease: "expo.in",
      });

    masterTl.current = tl;
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      createLoop(0);
    }, containerRef);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleItemHover = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
    createLoop(index);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex w-full flex-col items-center justify-between overflow-hidden rounded-[1.75rem] p-8 transition-colors duration-500 md:flex-row md:p-12",
        "bg-white/70 dark:bg-[#050505]/70",
        "border border-white/50 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.08)] backdrop-blur-xl",
        className,
      )}
    >
      <div className="z-20 w-full md:w-1/2">
        <p className="mb-8 text-[13px] font-medium tracking-wide text-muted-foreground">
          Hover to explore
        </p>
        <nav>
          <ul className="flex flex-col gap-10 md:gap-12">
            {items.map((item, index) => (
              <li
                key={item.num}
                onMouseEnter={() => handleItemHover(index)}
                className="group cursor-pointer"
              >
                <a
                  href={item.href}
                  target={item.href ? "_blank" : undefined}
                  rel={item.href ? "noreferrer" : undefined}
                  className="flex items-start gap-5"
                  onClick={(e) => {
                    if (!item.href) e.preventDefault();
                  }}
                >
                  <span
                    className={cn(
                      "mt-1 text-2xl font-bold transition-all duration-500",
                      activeIndex === index
                        ? "scale-110 text-primary"
                        : "text-zinc-400 dark:text-zinc-600",
                    )}
                  >
                    {item.num}
                  </span>

                  <h2
                    className={cn(
                      "text-4xl font-black uppercase leading-[0.9] tracking-tighter transition-all duration-700 md:text-5xl",
                      activeIndex === index
                        ? "translate-x-3 text-zinc-950 opacity-100 dark:text-white"
                        : "translate-x-0 text-zinc-500 opacity-40 dark:text-transparent dark:[-webkit-text-stroke:1.5px_#52525b]",
                    )}
                  >
                    {item.name}
                  </h2>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="relative mt-12 flex w-full items-center justify-center md:mt-0 md:w-1/2">
        <div className="absolute h-[120%] w-[120%] rounded-full bg-primary/10 blur-[100px] transition-opacity duration-1000 dark:bg-primary/5" />

        <svg
          viewBox="0 0 500 500"
          className="z-10 h-auto w-full max-w-[420px] drop-shadow-xl dark:drop-shadow-[0_0_60px_rgba(0,0,0,0.8)]"
        >
          <defs>
            <clipPath id="clip-original">
              <path
                className="path"
                d="M480.6,235H19.4c-6,0-10.8-4.9-10.8-10.8v-9.5c0-6,4.9-10.8,10.8-10.8h461.1c6,0,10.8,4.9,10.8,10.8v9.5C491.4,230.2,486.6,235,480.6,235z"
              />
              <path
                className="path"
                d="M483.1,362.4H16.9c-4.6,0-8.3-3.7-8.3-8.3v-1.8c0-4.6,3.7-8.3,8.3-8.3h466.1c4.6,0,8.3,3.7,8.3,8.3v1.8C491.4,358.7,487.7,362.4,483.1,362.4z"
              />
              <path
                className="path"
                d="M460.3,336.3H39.7c-17.2,0-31.1-13.9-31.1-31.1v-31.5c0-17.2,13.9-31.1,31.1-31.1h420.7c17.2,0,31.1,13.9,31.1,31.1v31.5C491.4,322.4,477.5,336.3,460.3,336.3z"
              />
              <path
                className="path"
                d="M459.2,196.2H40.8v-35c0-47.5,38.5-86,86-86h246.5c47.5,0,86,38.5,86,86V196.2z"
              />
              <path
                className="path"
                d="M441.9,424.9H58.1c-9.6,0-17.3-7.8-17.3-17.3v-37.4h418.5v37.4C459.2,417.1,451.5,424.9,441.9,424.9z"
              />
            </clipPath>
            <clipPath id="clip-hexagons">
              <rect className="path" x="20" y="20" width="200" height="280" rx="12" />
              <rect className="path" x="20" y="320" width="200" height="160" rx="12" />
              <rect className="path" x="240" y="20" width="240" height="140" rx="12" />
              <rect className="path" x="240" y="180" width="110" height="160" rx="12" />
              <rect className="path" x="370" y="180" width="110" height="160" rx="12" />
              <rect className="path" x="240" y="360" width="240" height="120" rx="12" />
            </clipPath>
            <clipPath id="clip-pixels">
              {Array.from({ length: 9 }).map((_, i) => (
                <rect
                  key={i}
                  className="path"
                  x={(i % 3) * 160 + 20}
                  y={Math.floor(i / 3) * 160 + 20}
                  width="140"
                  height="140"
                  rx="4"
                />
              ))}
            </clipPath>
          </defs>
          <g ref={mainGroupRef} clipPath={`url(#${items[0]?.clipId ?? "clip-original"})`}>
            <image
              ref={imageRef}
              href={items[0]?.image}
              width="500"
              height="500"
              preserveAspectRatio="xMidYMid slice"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

export const Component = ConnoisseurStackInteractor;
