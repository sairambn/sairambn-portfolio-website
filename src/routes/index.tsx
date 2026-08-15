import { createFileRoute } from "@tanstack/react-router";
import { Desktop } from "@/components/mac/desktop";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sairam Nagarajan — Software Engineer Portfolio" },
      {
        name: "description",
        content:
          "macOS-style portfolio of Sairam Nagarajan: software engineer from CEG Chennai shipping scheduling engines, exam pipelines and live client sites.",
      },
      { property: "og:title", content: "Sairam Nagarajan — Software Engineer Portfolio" },
      {
        property: "og:description",
        content:
          "Explore projects, skills and contact details in an interactive macOS desktop portfolio.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <Desktop />;
}
