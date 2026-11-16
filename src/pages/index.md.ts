import type { APIRoute } from "astro";
import { pageMarkdown } from "../agents/markdown";
import { page } from "../content/page";

export const GET: APIRoute = ({ site }) =>
  new Response(pageMarkdown(page, site!), { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
