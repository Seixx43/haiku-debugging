// Entry for the make.fun bounty "Seventeen Syllables of Debugging":
// reads ENTRY.md and writes it to $MAKEFUN_OUTPUT_DIR/entry.txt.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const entry = readFileSync(join(here, "ENTRY.md"), "utf8");
// The bounty wants a 5-7-5 haiku: exactly three non-empty lines. Fail loudly
// instead of writing an entry that does not fit the form.
const lines = entry.split("\n").filter((l) => l.trim().length > 0);
if (lines.length !== 3) {
  process.stderr.write(`haiku must have exactly 3 lines, got ${lines.length}\n`);
  process.exit(1);
}
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
process.stdout.write(entry);
