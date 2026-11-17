import { describe, expect, it, vi } from "vitest";
import { greetDevelopers } from "../src/scripts/console-note";

describe("console note", () => {
  it("tells developers where the source lives, in one styled line", () => {
    const log = vi.fn();
    greetDevelopers(log, "https://github.com/me/site");
    expect(log).toHaveBeenCalledOnce();
    const [message, style] = log.mock.calls[0];
    expect(message).toBe("%chey, you're looking under the hood. this site is open source: https://github.com/me/site");
    expect(style).toContain("color");
  });
});
