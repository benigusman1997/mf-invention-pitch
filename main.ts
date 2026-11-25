// One-Sentence Absurd Invention Pitch — make.fun bounty
// u-suroso-69-one-sentence-absurd-invention-pitch-5326c34a.
//
// Writes one pitch to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt).
// Standard library only: no network, no clock, no randomness, so every run
// writes the same bytes. No trailing newline is written.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const MAX_CHARS = 220;

// v2: the annoyance (snoozing), the invention, and a mechanism that escalates, in one sentence.
const ENTRY =
  "For people who say 'five more minutes': the Honest Snooze, an alarm clock that " +
  "grants the five minutes, then quietly emails your boss a 40-slide deck titled " +
  "'Where He Actually Is'.";

function fail(message: string): never {
  console.error("entry.txt rejected: " + message);
  process.exit(1);
}

// The gate: UTF-8 text of 1 to MAX_CHARS characters, not only white space.
const chars = Array.from(ENTRY).length;
if (chars < 1 || chars > MAX_CHARS) fail(`${chars} characters, limit is 1 to ${MAX_CHARS}`);
if (ENTRY.trim().length === 0) fail("only white space");
if (/[\r\n\t]/.test(ENTRY)) fail("holds a line break or a tab, the entry must be one line");
if (ENTRY !== ENTRY.trim()) fail("starts or ends with white space");
// The pitch must be ONE sentence: exactly one full stop, and it is the last character.
const stops = (ENTRY.match(/[.!?]/g) || []).length;
if (stops !== 1 || !ENTRY.endsWith(".")) fail(`${stops} sentence endings, the pitch must be one sentence`);

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(join(OUT_DIR, "entry.txt"), ENTRY, "utf8");
console.log(`entry.txt written: ${chars} characters, ${Buffer.byteLength(ENTRY, "utf8")} bytes`);
