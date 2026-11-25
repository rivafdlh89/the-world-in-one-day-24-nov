// the-world-in-one-day-24-nov — entry program (v4, round 3).
//
// v4 keeps the round-3 program exactly: the front page itself is the entry,
// so this program places the bundled entry.png into the output directory
// and proves the copy is intact before it exits. Nothing is drawn, fetched,
// or generated here, so two runs always produce the same bytes.
//
// What changed in v4 is the image, not the program: the beat-top-50
// revision of the portrait poster — 23 stories instead of 20, still on
// the 768x1024 (3:4) canvas inside the 1024x1024 / 1 MiB gate, type
// sizes unchanged (card headlines 14px, summaries/bullets 10.5px,
// "MORE STORIES" lines 11px) so it still reads. Card 10 swaps the
// Abu Dhabi stalemate (a non-event, the weakest card) for the UN
// femicide report — 47,000 women and girls killed by partners or
// family in 2025, 5 every hour (2026 Femicide Brief, UNODC + UN Women,
// published Tuesday 24 November, verified via UN News / UN Women) —
// a new society/global field no other top-50 entry carries; Abu Dhabi
// is demoted to a MORE line and Tehran is cut. Three more verified
// second-layer stories join as MORE lines: Senegal's AFCON title
// restored by CAS (Reuters, 24 Nov), NATO to defend space after
// reports of a Russian nuclear satellite (Rutte in Berlin, reported
// 24 Nov — the line claims no day), and Malaysia sending 6,803 Myanmar
// nationals home in December (AP, Kuala Lumpur, 24 Nov). Card 06 art
// is fixed to a real quadcopter drone (v3 drew a propeller plane).
// Ribbon "23 GLOBAL STORIES"; regions EU 8 / AP 6 / ME 4 / AM 1 /
// AF 3 / GLOBAL 1 = 23 stories across 6 regions. The image was
// rebuilt from scratch in code (build_ref23.py) and verified
// byte-identical across runs before it was bundled here.
//
// Node 22, standard library only. No network, no clock, no randomness.
// v3 build record — how the portrait poster was made and checked:
//   * The poster was redrawn from scratch in code: build_ref20_portrait.py
//     renders it with PIL, deterministic, no network, no clock. It reflows
//     the ref-a-20 layout onto the wider 768x1024 canvas — cards 274px
//     wide become 369px, masthead 170px becomes 150px — and spends the
//     extra width on bigger type, not on stretching: masthead headline
//     36px -> 44px (+22%), card headlines 12px -> 14px (+17%), card
//     summaries and bullets 8.5px -> 10.5px (+24%), "10 MORE STORIES"
//     lines 9px -> 11px (+22%), footers 8px -> 9px (+13%). Those are the
//     largest sizes that fit the full structure (masthead + 10 cards +
//     10 more lines + footer) in 768x1024 with healthy gaps; at 11px the
//     summaries need 3 lines on 4 cards and the page overflows by ~90px,
//     measured with PIL wraps at every candidate width.
//   * The generator was run twice; both runs produced the same bytes, so
//     the bundled image is reproducible, not a one-off.
//   * The entry program was run twice against the bundled image; both
//     runs printed the same hash and the same byte count.
//   * Assertions in the generator enforce: card headlines at most 2 lines,
//     summaries at most 2 lines, bullets fit on one line, card content
//     never overflows its card, "10 MORE STORIES" lines fit the panel,
//     footer lines fit the band — all passed.
//   * Two build bugs were found and fixed before delivery: grid geometry
//     not passed through the scale function (the 2K render used scale-1
//     coordinates), and PIL glyph advances not scaling exactly 2x (card 1
//     summary fit 2 lines at scale 1 but needed 3 at scale 2) — fixed by
//     narrowing card art 100px -> 96px so summaries wrap to at most 2
//     lines at both scales.
//   * Known minor issues, reported not hidden: the globe top is cropped
//     (reads as an intentional bleed; landmarks still peek below the
//     scrim), card 06 art is a propeller plane rather than a drone (text
//     is correct), and there is no DATE CHECK box (the reference layout
//     has none either).
//   * Revision after kit check (thinking_revised): the entry self-check
//     was hardened — verifyEntry now also verifies the PNG trailer and
//     the IHDR checksum. The last 12 bytes must be a valid IEND chunk
//     (length 0, type "IEND", fixed CRC 0xAE426082), and the stored IHDR
//     CRC must match a CRC-32 computed over "IHDR" plus its 13 data
//     bytes (standard table, no dependency). The image is untouched —
//     the program still writes the same bytes, so its output hash is
//     unchanged; the stronger check only makes a truncated or corrupted
//     copy fail loudly instead of passing.
// v4 build record — how the 23-story revision was made and checked:
//   * Beat-top-50 analysis (Role 01): the density trap — more stories
//     rank lower (#35 "46 stories" rank 35; the top 2 do not flaunt a
//     story count) — so the revision targets the proven top-50 floor of
//     23 stories, not 35. The winning gap is the thin second layer:
//     Senegal AFCON + UN femicide carried only by #7, NATO-space +
//     Malaysia-Myanmar only by #27. All four new stories were verified
//     from named wires before use (UN News / UN Women 24 Nov for the
//     femicide brief; Reuters 24 Nov for CAS/Senegal; Reuters coverage
//     of the Berlin press conference, reported 24 Nov, for NATO-space —
//     the line claims no day; AP Kuala Lumpur 24 Nov for Malaysia).
//   * Layout fit without shrinking type: masthead 150 -> 140px, grid
//     start 190 -> 180, card gap 6 -> 4px, MORE leading 12.5 -> 11.5px,
//     footer band starts 996. One layout bug found and fixed before
//     delivery: ribbon/tagline only 2px apart (tagline looked glued to
//     the ribbon) — ribbon moved up (130/162 -> 126/158), tagline at
//     164px, gap now 6px; rebuilt and re-verified (final hash below).
//   * P1 items deliberately NOT done: a 24th MORE line (Libya corvette,
//     verified by Reuters 24 Nov) does not fit neatly — it needs ~11.5px
//     more and only fits with a 132px masthead + 3px gaps, which breaks
//     "natural and neat"; dual-sourcing the top 3 cards was skipped
//     (single-source already matches 49/50 of the field); the footer
//     is full with 11 sources, no room for an extra factual line.
//   * Verification run (25 Nov 2026, finalizer): the v4 entry program
//     was run twice against the bundled image — both runs printed
//     "v4 entry.png OK: 768x1024, 451248 bytes, sha256
//     2a3dcf9b603394d2562c036ef7fd1104fa459483a0cd0ac6af314375d2279119",
//     cmp confirmed the two outputs byte-identical and identical to the
//     bundled entry.png. A third run after this comment was added
//     printed the same hash, proving the comment change did not alter
//     the output. The bundled image is 451,248 bytes, under the 1 MiB
//     cap, at exactly 768x1024.
//   * Known minor issues, reported not hidden: the globe top is cropped
//     (same intentional bleed as v3); MORE leading is 11.5px (from
//     12.5px) — tight but verified readable at full size and 2K zoom,
//     no lines touch; card gap 4px and masthead 140px make the page
//     slightly denser than v3, still neat and natural; no DATE CHECK
//     box (the reference layout has none, and apparatus proved not
//     to be a differentiator).
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ONE_MIB = 1024 * 1024;
const EXPECTED_WIDTH = 768;
const EXPECTED_HEIGHT = 1024;

// The eight magic bytes every PNG starts with.
const PNG_MAGIC = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

function die(message: string): never {
  throw new Error(`entry check failed: ${message}`);
}

function sha256Hex(bytes: Buffer): string {
  return createHash("sha256").update(bytes).digest("hex");
}

// CRC-32 (ISO 3309, the checksum PNG uses for every chunk): polynomial
// 0xEDB88320, reflected. Standard table, computed once at load; no
// dependency, so the program stays standard-library-only.
const CRC32_TABLE: number[] = (() => {
  const table: number[] = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(bytes: Buffer): number {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc = CRC32_TABLE[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
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
    `v4 entry.png OK: ${EXPECTED_WIDTH}x${EXPECTED_HEIGHT}, ${written.length} bytes, sha256 ${sha256Hex(written)}`,
  );
}

// Every check the entry must pass before the program reports success:
// byte-identical to the bundled image, inside the size cap, a real PNG
// with an IHDR chunk, and exactly 768x1024 — plus a verified IHDR
// checksum and a valid IEND trailer, so a truncated or corrupted copy
// fails here instead of being submitted.
//
// The v4 image this program carries: 768x1024, 451,248 bytes (under the
// 1 MiB cap), sha256 2a3dcf9b603394d2562c036ef7fd1104fa459483a0cd0ac6af314375d2279119,
// rendered twice from build_ref23.py with byte-identical output.
// If any of those facts ever stops being true, the program fails loudly
// instead of submitting a stale or truncated page.
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
    die(`entry.png is ${width}x${height}, expected 768x1024`);
  }
  // The IHDR chunk's stored CRC (bytes 29-32) must match a CRC-32
  // computed over the chunk type "IHDR" plus its 13 data bytes
  // (bytes 12-28). A mismatch means the header was corrupted.
  const ihdrStoredCrc = written.readUInt32BE(29);
  const ihdrComputedCrc = crc32(written.subarray(12, 29));
  if (ihdrStoredCrc !== ihdrComputedCrc) {
    die("IHDR chunk CRC mismatch — entry.png header is corrupted");
  }
  // The file must end with a valid IEND chunk: length 0, type "IEND",
  // and the fixed CRC 0xAE426082 for the four type bytes alone.
  // A missing or damaged trailer means the image was truncated.
  const end = written.length;
  if (
    written.readUInt32BE(end - 12) !== 0 ||
    written.toString("ascii", end - 8, end - 4) !== "IEND" ||
    written.readUInt32BE(end - 4) !== 0xae426082
  ) {
    die("entry.png has no valid IEND trailer — image may be truncated");
  }
}

main();
