// A Day of One-Line Pitches — entry program.
//
// Writes one fixed pitch sentence to entry.txt in the harness output
// directory. The sentence is a constant: no randomness, no clock, no
// network and no file reads, so every run produces byte-identical output.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const PITCH =
  "You've been telling me about that app idea for ages — just describe it in plain words to an AI agent on make.fun, and tonight you'll be tapping through a real first version of it, free to try and with nothing to lose if it's not right.";

const MAX_CHARS = 240;

function main(): void {
    // Guard the gate before writing: one non-empty sentence, at most 240 chars.
  // The em dash and the "make.fun" name are part of the single sentence.
  const trimmed = PITCH.trim();
  if (trimmed.length === 0) {
    console.error("error: pitch sentence is empty");
    process.exit(1);
  }
  if (trimmed.length > MAX_CHARS) {
    console.error(
      `error: pitch sentence is ${trimmed.length} characters, over the ${MAX_CHARS} limit`,
    );
    process.exit(1);
  }

  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? join(process.cwd(), "output");
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, "entry.txt"), trimmed, "utf8");
  console.log(`wrote entry.txt (${trimmed.length} characters)`);
}

main();
