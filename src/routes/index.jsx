import { createFileRoute } from "@tanstack/react-router";
import App from "../app/App.jsx";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Smart Deadline Reminder — AI productivity companion" },
      {
        name: "description",
        content:
          "A premium AI-powered deadline reminder app with smart suggestions, focus analytics, and beautiful workflows.",
      },
      { property: "og:title", content: "Smart Deadline Reminder" },
      {
        property: "og:description",
        content: "AI-powered deadlines, focus analytics, and beautiful productivity workflows.",
      },
    ],
  }),
  component: App,
});
