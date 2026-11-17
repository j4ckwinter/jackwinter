import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { Window } from "happy-dom";

const container = await AstroContainer.create({ astroConfig: { site: "https://example.com" } });

export async function render(component: Parameters<typeof container.renderToString>[0], props: Record<string, unknown>, slots?: Record<string, string>): Promise<Document> {
  const html = await container.renderToString(component, { props, slots });
  const { document } = new Window();
  document.body.innerHTML = html;
  return document as unknown as Document;
}
