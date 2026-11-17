# Contributor instructions

This repository is Jack Winter's minimal one-page portfolio. It is meant to replace [Winterbot](https://github.com/j4ckwinter/winterbot) as his main site.

## Commands

Use Node 22.23.4+ on 22.x, 24.16.0+ on 24.x, or 26.3.0 and newer.

- `npm ci` installs.
- `npm run dev` serves the site locally.
- `npm run check` type-checks with `astro check`.
- `npm test` runs the Vitest suite in `tests`.
- `npm run build` writes the static site to `dist`.

Run `check`, `test` and `build` before committing. GitHub Actions runs the same three on every push and pull request.

The build reads GitHub star counts without a token. The activity strip needs `GITHUB_TOKEN`; locally, `GITHUB_TOKEN=$(gh auth token) npm run build`. Without it, or when GitHub fails, the build leaves that data out and prints a warning instead of failing.

## Owners

| Decision | Owner |
| --- | --- |
| Name, title, bio, contact links and their icons | `src/content/profile.ts` |
| Roles, their icons and highlights | `src/content/experience.ts` |
| Which projects appear, their icons and links | `src/content/projects.ts` |
| Skill groups, their tools, and how many show before "See more" | `src/content/skills.ts` |
| Qualifications | `src/content/education.ts` |
| Case studies and which role each belongs to | `src/content/case-studies/`, rendered by `src/pages/work/[slug].astro` and `src/components/CaseStudyBody.astro` |
| Which content makes up the page, for both the HTML and the markdown | `src/content/page.ts` |
| The site's address | `astro.config.mjs` (`site`) |
| What agents read: `/index.md` and `/llms.txt` | `src/agents/markdown.ts`, served by `src/pages/index.md.ts` and `src/pages/llms.txt.ts` |
| What search engines read: structured data, `robots.txt`, `sitemap.xml` | `src/agents/structured-data.ts`, `src/pages/robots.txt.ts`, `src/pages/sitemap.xml.ts` |
| The share card shown when the link is posted | `src/social/card.ts`, rendered by `src/pages/og.png.ts` |
| Page metadata: title, canonical, share tags, theme colour, font preload | `src/layouts/Page.astro` |
| Fetching GitHub data once per build for the page and the card | `src/github/build-data.ts` |
| Which commit counts as a project's latest (no merges; chore, docs and CI commits only as a fallback) | `src/github/client.ts` |
| Which projects appear in Activity | `inActivity` in `src/content/projects.ts` |
| Starting the grid at the latest weeks and hiding clipped month labels | `src/scripts/contribution-scroll.ts` |
| Copying the email from "say hello" | `src/scripts/copy-email.ts` |
| Instant tooltips on contribution tiles | `src/scripts/tile-tooltips.ts` |
| Where each project's version comes from (npm or GitHub releases) | `release` in `src/content/projects.ts`, fetched by `src/github/npm.ts` and `src/github/client.ts` |
| Opening the experience list at a role from the timeline | `data-reveal` in `src/scripts/disclosure.ts` |
| Rebuilding the site every morning | `.github/workflows/rebuild.yml` |
| Checking every outbound link each Monday | `.github/workflows/links.yml` |
| Redirects from Winter Town's old paths | `vercel.json` |
| How long each role lasted and the bio's years of experience | `src/tenure.ts`, written by `formatTenure` in `src/format.ts` |
| The streak and busiest day under the grid | `contributionHighlights` in `src/github/activity.ts` |
| Commit dates as "2 days ago" | `src/scripts/relative-time.ts` |
| Light and dark: the saved choice, the toggle and its circular reveal | `src/scripts/theme.ts`, colours in `src/styles/global.css` |
| Vercel Web Analytics, loaded only on Vercel builds | `src/layouts/Page.astro` |
| Which icons exist and where each comes from (Tabler or Simple Icons) | `src/icons.ts` |
| Talking to the GitHub API and translating its contribution levels | `src/github/client.ts` |
| Laying out the contribution grid and its month labels | `src/github/activity.ts` |
| What happens when GitHub data is missing or fails | `src/github/load.ts` |
| How counts, dates and contribution tooltips are written | `src/format.ts` |
| How "See more" and per-role toggles open, close and animate | `src/scripts/disclosure.ts`, `src/components/SeeMore.astro` |
| Colour palette for light and dark, motion timing, reveal fades, the view-transition easing and the no-JS variants | `src/styles/global.css` |
| Page shell, column width and font | `src/layouts/Page.astro`, `src/styles/global.css` |
| How text becomes ids and view-transition names | `src/slug.ts` |
| The 570px breakpoint where Experience switches to a timeline | `src/styles/global.css` (`--breakpoint-xp`) |
| How each section looks, including when star counts show and that the most starred projects come first | `src/components/*.astro` |
| Which sections appear and in what order: who you are, experience, projects, activity, skills, education | `src/pages/index.astro` |

## Standards

- Keep the page fast and plain: static output, with client JavaScript only for the expand and collapse behaviour in `src/scripts/disclosure.ts` and for starting the activity strip at the latest week.
- Every colour is a `light-dark()` pair in `global.css`, so `color-scheme` picks the theme: the system by default, `data-theme` when a visitor chooses, and always light in print.
- `theme-color` in `Page.astro` repeats `--palette-surface` from `global.css` as hex, because the meta tag can't read CSS variables. Change both together.
- Everything must be readable without JavaScript, and print as a CV. `Page.astro` adds a `js` class to the root; the `opened`, `in-opened` and `no-js` variants in `global.css` show collapsed content and hide toggles when that class is missing, and always in print. Mark anything that makes no sense on paper with `print:hidden`.
- Animate layout changes with the browser's View Transitions: give an element the same `view-transition-name` in both layouts and let the browser morph it. Browsers without them, and people who prefer reduced motion, get the change instantly.
- Keep content (bio, roles, projects, links) as data in one place, separate from the components that render it.
- Write no comments unless one stops a plausible wrong fix.
- Test behaviour through what a visitor sees: render components with the Astro container in `tests`, and pass fake `fetch` functions to the GitHub code. Tests never call the network.
- Write the README in the casual, lowercase voice of the [Pancake Stack README](https://github.com/j4ckwinter/pancake-stack/blob/main/README.md).

## Commits

Commit only when the task asks. Use Conventional Commits with an imperative summary under 72 characters. Add no lines crediting an AI tool. Creating a GitHub repository, pushing, and deploying need Jack's request.
