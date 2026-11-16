# Contributor instructions

This repository is Jack Winter's minimal one-page portfolio. It is meant to replace [Winterbot](https://github.com/j4ckwinter/winterbot) as his main site.

## Commands

Use Node 22.23.4+ on 22.x, 24.16.0+ on 24.x, or 26.3.0 and newer.

- `npm ci` installs.
- `npm run dev` serves the site locally.
- `npm run check` type-checks with `astro check`.
- `npm run build` writes the static site to `dist`.

Run `check` and `build` before committing.

## Owners

| Decision | Owner |
| --- | --- |
| What the page says: name, title, links | `src/content/profile.ts` |
| Page shell, column width, colours, dark mode | `src/layouts/Page.astro` |
| Which sections appear and in what order | `src/pages/index.astro` |
| Tailwind setup | `src/styles/global.css`, `astro.config.mjs` |

## Standards

- Keep the page fast and plain: static output, no client JavaScript a section does not need.
- Keep content (bio, roles, projects, links) as data in one place, separate from the components that render it.
- Write no comments unless one stops a plausible wrong fix.
- Test behaviour through what a visitor sees.
- Write the README in the casual, lowercase voice of the [Pancake Stack README](https://github.com/j4ckwinter/pancake-stack/blob/main/README.md).

## Commits

Commit only when the task asks. Use Conventional Commits with an imperative summary under 72 characters. Add no lines crediting an AI tool. Creating a GitHub repository, pushing, and deploying need Jack's request.
