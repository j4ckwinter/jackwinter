import type { APIRoute } from "astro";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { CARD_HEIGHT, CARD_WIDTH, socialCard } from "../social/card";
import { page } from "../content/page";
import { githubDataForBuild } from "../github/build-data";

const require = createRequire(import.meta.url);
const font = (weight: 400 | 500) => readFile(require.resolve(`@fontsource/geist/files/geist-latin-${weight}-normal.woff`));

export const GET: APIRoute = async ({ site }) => {
  const github = await githubDataForBuild();
  const card = socialCard({ name: page.profile.name, title: page.profile.title, host: site!.host.replace(/^www\./, ""), grid: github.activity });
  const svg = await satori(card as Parameters<typeof satori>[0], {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    fonts: [
      { name: "Geist", data: await font(400), weight: 400, style: "normal" },
      { name: "Geist", data: await font(500), weight: 500, style: "normal" },
    ],
  });
  const png = new Resvg(svg, { fitTo: { mode: "width", value: CARD_WIDTH } }).render().asPng();
  return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } });
};
