import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { Window } from "happy-dom";

const container = await AstroContainer.create();

export async function render(component: Parameters<typeof container.renderToString>[0], props: Record<string, unknown>): Promise<Document> {
  const html = await container.renderToString(component, { props });
  const { document } = new Window();
  document.body.innerHTML = html;
  return document as unknown as Document;
}
