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
    <div className="mx-auto flex min-h-[60vh] max-w-5xl flex-col items-start justify-center px-5 py-24 sm:px-6">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-3 max-w-md text-[15px] text-muted-foreground">
        This route doesn't exist.
      </p>
      <div className="mt-8 flex gap-3">
        <Link
          to="/"
          className="rounded-md bg-foreground px-4 py-2 text-[13.5px] font-medium text-background"
        >
          Home
        </Link>
        <Link
          to="/projects"
          className="rounded-md border border-border px-4 py-2 text-[13.5px] font-medium"
        >
          Work
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-5xl flex-col items-start justify-center px-5 py-24 sm:px-6">
      <p className="eyebrow">Error</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">Something went wrong</h1>
      <div className="mt-8 flex gap-3">
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="rounded-md bg-foreground px-4 py-2 text-[13.5px] font-medium text-background"
        >
          Try again
        </button>
        <a href="/" className="rounded-md border border-border px-4 py-2 text-[13.5px] font-medium">
          Home
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
      { title: "Sairam Nagarajan — Software Engineer" },
      {
        name: "description",
        content:
          "Software engineer from CEG Chennai. Python, Java, daily DSA. Open to SDE roles in Bangalore, Hyderabad or remote.",
      },
      { name: "author", content: "Sairam Nagarajan" },
      { name: "theme-color", content: "#f7f6f3" },
      { property: "og:title", content: "Sairam Nagarajan — Software Engineer" },
      {
        property: "og:description",
        content: "Python, Java, daily DSA. Ships systems people use.",
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
        href: "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@500;600;700&display=swap",
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
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <SiteHeader />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}
