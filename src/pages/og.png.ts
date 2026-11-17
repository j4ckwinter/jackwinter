import type { APIRoute } from "astro";
import { socialCard } from "../social/card";
import { cardResponse } from "../social/render";
import { page } from "../content/page";
import { githubDataForBuild } from "../github/build-data";

export const GET: APIRoute = async ({ site }) => {
  const github = await githubDataForBuild();
  return cardResponse(socialCard({ name: page.profile.name, title: page.profile.title, host: site!.host.replace(/^www\./, ""), grid: github.activity }));
};
