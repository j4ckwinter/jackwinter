# jackwinter

my portfolio, minus the town. one page: who i am, what i've built, where i've worked, and how to reach me.

it will replace [winter town](https://github.com/j4ckwinter/winterbot) as the place people land when they look me up. winter town isn't going anywhere, it just won't be the front door.

there's a little bar chart of my github activity too. built with Astro and Tailwind, and it's all static html.

## run it locally

use Node.js 22.23.4+ on the 22.x line, 24.16.0+ on the 24.x line, or 26.3.0 and newer.

```sh
npm ci
npm run dev
```

`npm run check`, `npm test` and `npm run build` are the checks.

star counts come from github at build time. the activity chart needs a token, so locally i run:

```sh
GITHUB_TOKEN=$(gh auth token) npm run build
```

no token, no chart. the rest of the page doesn't care.

the github bits only change when the site rebuilds, so a github action asks vercel to rebuild every morning. it needs a vercel deploy hook for `main` saved as the `VERCEL_DEPLOY_HOOK` repository secret.

another action checks every link on the page each monday, so a dead linkedin or npm link doesn't sit there for months.

## for agents

agents get the same page as markdown at [/index.md](https://www.jackwinter.xyz/index.md), and [/llms.txt](https://www.jackwinter.xyz/llms.txt) points them there. both are built from the same content as the html, so they can't drift.

## change what it says

everything the page says lives in `src/content`. edit those files, not the components.
