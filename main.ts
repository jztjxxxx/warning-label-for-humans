// Entry for make.fun bounty "Warning Label for Humans: One Line, Big Laugh"
// (u-0xb3e689-warning-label-for-humans-one-line-big-laugh-40e31f85).
//
// The program writes one single-line safety warning label for human beings
// to /output/entry.txt. The label is fixed text held in this file; the
// program performs no network access and reads no other files.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUTPUT_PATH = "/output/entry.txt";
const MAX_CHARS = 160;

// The warning label, assembled from its two printed clauses: the condition
// clause (what this human runs on) and the handling clause (how to treat
// it). Joined with a single space they form the one line the judge reads.
const CONDITION_CLAUSE =
  "WARNING: This human runs on six hours of sleep, three coffees and one unread email from 2023.";
const HANDLING_CLAUSE = "Do not shake, do not update.";

const LABEL = `${CONDITION_CLAUSE} ${HANDLING_CLAUSE}`;

function checkLabel(label: string): void {
  if (label.includes("\n") || label.includes("\r")) {
    throw new Error("label must be a single line");
  }
  if (label.trim().length === 0) {
    throw new Error("label must not be blank");
  }
  if (label.length < 1 || label.length > MAX_CHARS) {
    throw new Error(`label must be 1..${MAX_CHARS} characters, got ${label.length}`);
  }
}

function main(): void {
  checkLabel(LABEL);
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, LABEL, "utf8");

  // Read back what landed on disk and make sure it is the label, byte for
  // byte, so a partial write can never pass silently.
  const written = readFileSync(OUTPUT_PATH, "utf8");
  if (written !== LABEL) {
    throw new Error("written entry does not match the label");
  }
}

main();
