import type { APIRoute } from "astro";
import { llmsText } from "../agents/markdown";
import { page } from "../content/page";

export const GET: APIRoute = ({ site }) =>
  new Response(llmsText(page, site!), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
