export type SitemapEntry = { path: string; updated: string };

export function sitemapXml(entries: SitemapEntry[], site: URL): string {
  const urls = entries.map((entry) => `  <url><loc>${new URL(entry.path, site).href}</loc><lastmod>${entry.updated}</lastmod></url>`);
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
}
