const STYLE = "font: 13px/1.6 ui-sans-serif, system-ui, sans-serif; color: #737373";

export function consoleNote(source: string): [string, string] {
  return [`%chey, you're looking under the hood. this site is open source: ${source}`, STYLE];
}

export function greetDevelopers(log: (...lines: string[]) => void, source: string): void {
  log(...consoleNote(source));
}
