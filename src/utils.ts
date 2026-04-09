import fs from "node:fs";
import { isPlainObject } from "./infra/plain-object.js";
import { formatTerminalLink } from "./terminal/terminal-link.js";
export {
  displayPath,
  displayString,
  getConfigDir,
  resolveConfigDir,
  resolveHomeDir,
  resolveUserPath,
  shortenHomeInString,
  shortenHomePath,
} from "./utils/node-paths.js";
export {
  escapeRegExp,
  isRecord,
  normalizeE164,
  safeParseJson,
  sleep,
  sliceUtf16Safe,
  truncateUtf16Safe,
} from "./utils/browser-safe.js";

export async function ensureDir(dir: string) {
  await fs.promises.mkdir(dir, { recursive: true });
}

/**
 * Check if a file or directory exists at the given path.
 */
export async function pathExists(targetPath: string): Promise<boolean> {
  try {
    await fs.promises.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

export function clampNumber(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function clampInt(value: number, min: number, max: number): number {
  return clampNumber(Math.floor(value), min, max);
}

/** Alias for clampNumber (shorter, more common name) */
export const clamp = clampNumber;

export { formatTerminalLink, isPlainObject };
