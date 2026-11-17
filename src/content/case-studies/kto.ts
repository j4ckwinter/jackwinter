import type { CaseStudy } from "./types";

export const kto: CaseStudy = {
  slug: "kto",
  company: "KTO Group",
  title: "Rebuilding KTO’s sportsbook frontend",
  published: "2026-11-05",
  updated: "2026-11-17",
  summary:
    "From a third-party hosted sportsbook to a custom React and TypeScript platform, with ownership of frontend architecture and core customer journeys.",
  overview: [
    { term: "Problem", text: "Replace a hosted sportsbook with a custom frontend that loads quickly and handles live data." },
    { term: "My role", text: "Senior Front-End Developer, owning frontend architecture and core customer journeys." },
    { term: "Result", text: "Faster initial loading and return visits in performance testing, with checks to protect bundle size." },
  ],
  qualification: "Results from performance testing, as reported in my CV.",
  metrics: [
    { value: "40%", label: "faster first contentful paint" },
    { value: "25%", label: "faster largest contentful paint" },
    { value: "20%", label: "lower blocking time" },
    { value: "9.3%", label: "less transferred data" },
    { value: "11×", label: "faster return navigation" },
  ],
  sections: [
    {
      heading: "The work",
      label: "The work",
      blocks: [
        { kind: "paragraph", text: "KTO operates a sportsbook and online casino in the Brazilian market. I led the frontend transformation from a third-party hosted product to a custom platform, within a business serving 1.4M active users and 5B bets placed." },
        { kind: "paragraph", text: "I owned the frontend architecture and core customer journeys. The performance work covered rendering, bundles, service loading and real-time data processing." },
      ],
    },
    {
      heading: "Getting the first view on screen",
      label: "Loading",
      blocks: [
        { kind: "paragraph", text: "I changed the loading sequence to fetch and render the initial events, main markets and odds before setting up live updates and progressively subscribing the markets. This reduced the work that had to finish before the first view could appear." },
        {
          kind: "flow",
          title: "Loading sequence",
          steps: [
            { title: "Initial snapshot", detail: "Fetch events, markets and current odds" },
            { title: "First view", detail: "Render the initial market data" },
            { title: "Live updates", detail: "Set up and progressively subscribe" },
          ],
          caption: "Before: live setup was part of the work preceding the first view. After: render the snapshot first. This shows ordering, not measured durations.",
        },
        { kind: "paragraph", text: "Alongside that, I split code, lazy-loaded non-critical services, removed unused translations and used lighter dependency builds. Deferring work can make a feature’s first use slower, and the initial market snapshot still needs to transition correctly into live state." },
      ],
    },
    {
      heading: "Avoiding repeated setup on return visits",
      label: "Return visits",
      blocks: [
        { kind: "paragraph", text: "Returning to the sportsbook could repeat expensive Kambi client initialisation. Keeping the initialised client alive for reuse avoided that bootstrap work and made the tested return journey around 11 times faster. This result applies to leaving the sportsbook and coming back, rather than a first visit." },
        { kind: "paragraph", text: "Reuse retains state and memory, so session validity, the client’s container, subscriptions and listeners all matter to a usable return." },
      ],
    },
    {
      heading: "Making consumers pay for one icon",
      label: "Bundle size",
      blocks: [
        { kind: "paragraph", text: "Importing one icon from our shared package’s root entry retained roughly 65 KB gzip. Inspecting the built output showed that generated icon components were flattened into the root module; marking the package side-effect-free had not achieved the expected isolation." },
        { kind: "paragraph", text: "I changed the package API to generate isolated per-icon entry points. A representative single-icon import then retained roughly 0.3–0.4 KB gzip. I added a bundle budget and structural tests to protect that behaviour. This was a separate package measurement, not the overall sportsbook’s transferred-data result." },
      ],
    },
    {
      heading: "Separating responsibilities",
      label: "Architecture",
      blocks: [
        { kind: "paragraph", text: "I designed a modular sportsbook architecture across a pnpm/Turborepo monorepo spanning 27 packages and 22 modules, separating reusable UI, domain logic, data providers and third-party integrations." },
        { kind: "list", items: ["Reusable UI", "Domain logic", "Data providers", "Third-party integrations"] },
        { kind: "subheading", text: "Keeping high-frequency processing off the main thread" },
        { kind: "paragraph", text: "The real-time pipeline used browser Web Workers, Socket.IO and Zustand. Heavier normalisation, filtering and sorting ran in a worker, with batched snapshots containing the fields each subscriber needed sent back to main-thread stores for React to consume." },
        {
          kind: "flow",
          title: "From live data to the interface",
          steps: [
            { title: "Live feed", detail: "Socket and subscription updates" },
            { title: "Web Worker", detail: "Process data and batch subscriber snapshots" },
            { title: "Stores → React", detail: "Publish state and render on the main thread" },
          ],
          caption: "Processing moves off the main thread; rendering stays on it. Batching trades fewer updates for some display latency.",
        },
        { kind: "paragraph", text: "Workers add messaging overhead and another lifecycle boundary; batching can add display latency. Rendering still happens on the main thread, so focused UI updates remain important. The loading-time blocking result does not isolate the worker’s effect on live interactions." },
      ],
    },
    {
      heading: "How I measured the work",
      label: "Measurement",
      blocks: [
        { kind: "paragraph", text: "I used Lighthouse, network profiling and browser performance marks around bootstrap stages, including route loading, session availability, hydration and client initialisation. Testing included slow-4G conditions." },
        { kind: "paragraph", text: "The paint, blocking-time and transferred-data figures are combined results across the wider loading work. They do not isolate any single optimisation. Return navigation and the icon-package comparison are separate measurements." },
      ],
    },
  ],
};
