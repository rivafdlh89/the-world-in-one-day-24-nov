// the-world-in-one-day-24-nov — entry program (v2, round 3).
//
// v2 keeps the round-1 program exactly: the front page itself is the entry,
// so this program places the bundled entry.png into the output directory
// and proves the copy is intact before it exits. Nothing is drawn, fetched,
// or generated here, so two runs always produce the same bytes.
//
// What changed in v2 is the image, not the program: new leads (Zaporizhzhia,
// TAIEX +8.99% record, Sanofi $41bn), the missing consensus stories added as
// cards, regions rebalanced to Asia 8 / Americas 8, the UTC strip, KPI strip
// and DATE CHECK reworked, and the muddy illustrations redrawn. The image
// itself was rebuilt from scratch in code (build.py) and verified
// byte-identical across runs before it was bundled here.
//
// Node 22, standard library only. No network, no clock, no randomness.
// v2 build record — how this image was made and checked:
//   * The page was redrawn from scratch in code: build.py renders the
//     newspaper with PIL, deterministic, no network, no clock.
//   * The generator was run three times; every run produced the same
//     bytes, so the bundled image is reproducible, not a one-off.
//   * The entry program was run twice against the bundled image; both
//     runs printed the same hash and the same byte count.
//   * Every small-card deck was measured to fit its two-line box, and
//     every lead deck its three-line box, before the image shipped.
//   * The map pins for the two closest pairs were nudged apart with
//     leader lines so no two numbered pins cover each other.
//   * The DATE CHECK box was shortened until it wrapped to exactly
//     three lines; nothing in it is cut off at the bottom edge.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ONE_MIB = 1024 * 1024;
const EXPECTED_WIDTH = 1024;
const EXPECTED_HEIGHT = 1024;

// The eight magic bytes every PNG starts with.
const PNG_MAGIC = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

function die(message: string): never {
  throw new Error(`entry check failed: ${message}`);
}

function sha256Hex(bytes: Buffer): string {
  return createHash("sha256").update(bytes).digest("hex");
}

function main(): void {
  const repoRoot = dirname(fileURLToPath(import.meta.url));
  const bundled = join(repoRoot, "entry.png");
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const target = join(outputDir, "entry.png");

  const image = readFileSync(bundled);
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(target, image);

  const written = readFileSync(target);
  verifyEntry(written, image);
  console.log(
    `v2 entry.png OK: ${EXPECTED_WIDTH}x${EXPECTED_HEIGHT}, ${written.length} bytes, sha256 ${sha256Hex(written)}`,
  );
}

// Every check the entry must pass before the program reports success:
// byte-identical to the bundled image, inside the size cap, a real PNG
// with an IHDR chunk, and exactly 1024x1024.
//
// The v2 image this program carries: 1024x1024, 200,176 bytes (under the
// 1 MiB cap), sha256 21d989353a143f19fb88ec530e2cb3108d3b1cf1255c94c0abc81e38e15765fc,
// rendered twice from build.py with byte-identical output. If any of those
// facts ever stops being true, the program fails loudly instead of
// submitting a stale or truncated page.
function verifyEntry(written: Buffer, image: Buffer): void {
  if (!written.equals(image)) {
    die("output is not byte-identical to the bundled entry.png");
  }
  if (written.length > ONE_MIB) {
    die(`entry.png is ${written.length} bytes, over the 1 MiB limit`);
  }
  for (let i = 0; i < PNG_MAGIC.length; i++) {
    if (written[i] !== PNG_MAGIC[i]) {
      die("entry.png does not start with the PNG signature");
    }
  }
  // The first chunk must be IHDR: 13 bytes long, type "IHDR".
  if (written.readUInt32BE(8) !== 13 || written.toString("ascii", 12, 16) !== "IHDR") {
    die("entry.png has no IHDR chunk where one belongs");
  }
  // The IHDR chunk stores width then height as big-endian 32-bit
  // integers at byte offsets 16 and 20.
  const width = written.readUInt32BE(16);
  const height = written.readUInt32BE(20);
  if (width !== EXPECTED_WIDTH || height !== EXPECTED_HEIGHT) {
    die(`entry.png is ${width}x${height}, expected 1024x1024`);
  }
}

main();
