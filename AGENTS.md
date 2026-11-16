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
| Name, title, bio, contact links | `src/content/profile.ts` |
| Roles and their highlights | `src/content/experience.ts` |
| Which projects appear and where they link | `src/content/projects.ts` |
| Skill groups and education | `src/content/skills.ts` |
| Talking to the GitHub API | `src/github/client.ts` |
| Turning contribution days into the twelve-month strip | `src/github/activity.ts` |
| What happens when GitHub data is missing or fails | `src/github/load.ts` |
| How counts are written (locale, separators) | `src/format.ts` |
| Page shell, column width, font, colours, dark mode | `src/layouts/Page.astro`, `src/styles/global.css` |
| How each section looks, including when star counts show | `src/components/*.astro` |
| Which sections appear and in what order | `src/pages/index.astro` |

## Standards

- Keep the page fast and plain: static output, no client JavaScript a section does not need.
- Keep content (bio, roles, projects, links) as data in one place, separate from the components that render it.
- Write no comments unless one stops a plausible wrong fix.
- Test behaviour through what a visitor sees: render components with the Astro container in `tests`, and pass fake `fetch` functions to the GitHub code. Tests never call the network.
- Write the README in the casual, lowercase voice of the [Pancake Stack README](https://github.com/j4ckwinter/pancake-stack/blob/main/README.md).

## Commits

Commit only when the task asks. Use Conventional Commits with an imperative summary under 72 characters. Add no lines crediting an AI tool. Creating a GitHub repository, pushing, and deploying need Jack's request.
