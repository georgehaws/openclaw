import { describe, expect, it, vi } from "vitest";
import {
  escapeRegExp,
  isRecord,
  normalizeE164,
  safeParseJson,
  sleep,
  sliceUtf16Safe,
  truncateUtf16Safe,
} from "./browser-safe.js";

describe("browser-safe utils", () => {
  it("escapes regex characters", () => {
    expect(escapeRegExp("a+b*c?")).toBe("a\\+b\\*c\\?");
  });

  it("parses JSON safely", () => {
    expect(safeParseJson<{ ok: boolean }>('{"ok":true}')).toEqual({ ok: true });
    expect(safeParseJson("{bad")).toBeNull();
  });

  it("detects plain record-like values", () => {
    expect(isRecord({ a: 1 })).toBe(true);
    expect(isRecord(null)).toBe(false);
    expect(isRecord([])).toBe(false);
  });

  it("normalizes e164 strings", () => {
    expect(normalizeE164("whatsapp:+1 (555) 000-1234")).toBe("+15550001234");
  });

  it("slices and truncates utf16 safely", () => {
    const text = "A🙂B";
    expect(sliceUtf16Safe(text, 0, 2)).toBe("A");
    expect(truncateUtf16Safe(text, 2)).toBe("A");
  });

  it("sleeps for at least one timer tick", async () => {
    vi.useFakeTimers();
    const pending = sleep(10);
    await vi.advanceTimersByTimeAsync(10);
    await expect(pending).resolves.toBeUndefined();
    vi.useRealTimers();
  });
});
