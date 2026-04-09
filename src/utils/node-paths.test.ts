import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  displayPath,
  displayString,
  getConfigDir,
  resolveConfigDir,
  resolveUserPath,
  shortenHomeInString,
  shortenHomePath,
} from "./node-paths.js";

describe("node path utils", () => {
  const originalOpenClawHome = process.env.OPENCLAW_HOME;
  afterEach(() => {
    if (originalOpenClawHome === undefined) {
      delete process.env.OPENCLAW_HOME;
      return;
    }
    process.env.OPENCLAW_HOME = originalOpenClawHome;
  });

  it("prefers OPENCLAW_STATE_DIR for config dir", () => {
    const env = { OPENCLAW_STATE_DIR: "~/state" } as NodeJS.ProcessEnv;
    expect(resolveConfigDir(env, () => "/tmp/home")).toBe(path.resolve("/tmp/home/state"));
    expect(getConfigDir(env, () => "/tmp/home")).toBe(path.resolve("/tmp/home/state"));
  });

  it("resolves user paths against home", () => {
    expect(resolveUserPath("~/workspace", { HOME: "/tmp/home" } as NodeJS.ProcessEnv)).toBe(
      path.resolve("/tmp/home/workspace"),
    );
  });

  it("shortens home path and display helpers", () => {
    delete process.env.OPENCLAW_HOME;
    const home = os.homedir();
    const target = path.join(home, "workspace");
    const shortened = shortenHomePath(target);
    expect(shortened === `~${path.sep}workspace` || shortened === target).toBe(true);
    const shortenedInString = shortenHomeInString(`path=${target}`);
    expect(shortenedInString === `path=${target}` || shortenedInString.includes("~")).toBe(true);
    expect(displayPath(target)).toBe(shortenHomePath(target));
    expect(displayString(`path=${target}`)).toBe(shortenHomeInString(`path=${target}`));
  });
});
