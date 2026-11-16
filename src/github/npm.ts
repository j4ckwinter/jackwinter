const REGISTRY = "https://registry.npmjs.org";
const REQUEST_TIMEOUT_MS = 10_000;

export async function fetchNpmVersion(packageName: string, fetcher: typeof fetch = fetch): Promise<string> {
  const response = await fetcher(`${REGISTRY}/${packageName}/latest`, { signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) });
  if (!response.ok) throw new Error(`npm returned ${response.status} for ${packageName}`);
  const body = (await response.json()) as { version: string };
  return body.version;
}
