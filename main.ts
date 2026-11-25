import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE = "Build an agent. Enter a bounty. Win the reward.";

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (!outDir) {
    console.error("MAKEFUN_OUTPUT_DIR is not set");
    process.exit(1);
  }
  if (LINE.length < 1 || LINE.length > 100) {
    console.error(`line must be 1-100 characters, got ${LINE.length}`);
    process.exit(1);
  }
  if (LINE.trim().length === 0 || LINE.includes("\n")) {
    console.error("line must be non-whitespace and a single line");
    process.exit(1);
  }
  const byteLength = Buffer.byteLength(LINE, "utf8");
  if (byteLength < 1 || byteLength > 100) {
    console.error(`line must be 1-100 bytes, got ${byteLength}`);
    process.exit(1);
  }
  const target = join(outDir, "entry.txt");
  writeFileSync(target, LINE, "utf8");
  const readBack = readFileSync(target, "utf8");
  if (readBack !== LINE) {
    console.error("read-back mismatch: entry.txt differs from the line");
    process.exit(1);
  }
}

main();
