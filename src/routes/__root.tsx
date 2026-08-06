import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import appCss from "../styles.css?url";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

function NotFoundComponent() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-7xl flex-col items-center justify-center px-5 py-24 text-center sm:px-6">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Page not found</h1>
      <p className="mt-4 max-w-md text-[15px] text-muted-foreground">
        This route doesn't exist. Head back home or open selected work.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="rounded-full bg-primary px-7 py-3 text-[14px] font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5"
        >
          Go home
        </Link>
        <Link
          to="/projects"
          className="rounded-full border border-border/80 px-6 py-3 text-[14px] font-medium transition-all duration-300 hover:border-primary/35 hover:bg-secondary/60"
        >
          View work
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-7xl flex-col items-center justify-center px-5 py-24 text-center sm:px-6">
      <p className="eyebrow">Error</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">This page didn't load</h1>
      <p className="mt-4 max-w-md text-[15px] text-muted-foreground">
        Something went wrong. Try again or go home.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="rounded-full bg-primary px-7 py-3 text-[14px] font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5"
        >
          Try again
        </button>
        <a
          href="/"
          className="rounded-full border border-border/80 px-6 py-3 text-[14px] font-medium transition-all duration-300 hover:border-primary/35 hover:bg-secondary/60"
        >
          Go home
        </a>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Sairam Nagarajan — Software Engineer | DSA, Python, Java" },
      {
        name: "description",
        content:
          "Software engineer from CEG Chennai. Strong in data structures, algorithms, Python and Java. Building clean, reliable software. Open to SDE roles in Bangalore, Hyderabad or remote.",
      },
      { name: "author", content: "Sairam Nagarajan" },
      { name: "theme-color", content: "#1a1410" },
      { property: "og:title", content: "Sairam Nagarajan — Software Engineer | DSA, Python, Java" },
      {
        property: "og:description",
        content:
          "I build clean, reliable software that solves real problems. Strong DSA foundations. Preparing for Software Development Engineer roles.",
      },
      { property: "og:image", content: "https://bnsairam.vercel.app/content.png" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://bnsairam.vercel.app" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://bnsairam.vercel.app/content.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Alex+Brush&family=DM+Sans:wght@400;500&family=Great+Vibes&family=Italianno&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@500;600;700&display=swap",
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "canonical", href: "https://bnsairam.vercel.app" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Sairam Nagarajan",
          alternateName: "Sairam BN",
          url: "https://bnsairam.vercel.app",
          image: "https://bnsairam.vercel.app/content.png",
          jobTitle: "Software Engineer",
          email: "mailto:bnsairam14@gmail.com",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Chennai",
            addressRegion: "Tamil Nadu",
            addressCountry: "IN",
          },
          alumniOf: {
            "@type": "CollegeOrUniversity",
            name: "College of Engineering Guindy",
          },
          sameAs: [
            "https://github.com/sairambn",
            "https://www.linkedin.com/in/sairambn/",
            "https://leetcode.com/u/sairambn/",
          ],
          knowsAbout: [
            "Data Structures",
            "Algorithms",
            "Python",
            "Java",
            "Software Engineering",
            "System Design",
          ],
        }),
      },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}
