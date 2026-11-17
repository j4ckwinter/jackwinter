import { displayHost } from "./format";

export const helloHref = (email: string, site: URL) => `mailto:${email}?subject=${encodeURIComponent(`hello from ${displayHost(site)}`)}`;
