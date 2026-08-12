/**
 * Word search generator — pure, no React, so it's easy to reason about and
 * runs the same on server or client (we call it client-side to avoid hydration
 * mismatches from the randomness).
 */

export type Cell = { r: number; c: number };
export type Placement = { word: string; cells: Cell[] };
export type WordSearch = { grid: string[][]; placements: Placement[]; size: number };

// Forward-ish directions only (E, S, SE, NE) → words never read right-to-left,
// which keeps it kid-friendly. The player can still drag either way to select.
const DIRS: Cell[] = [
  { r: 0, c: 1 },
  { r: 1, c: 0 },
  { r: 1, c: 1 },
  { r: -1, c: 1 },
];
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const rand = (n: number) => Math.floor(Math.random() * n);

export function generateWordSearch(rawWords: string[], size: number): WordSearch {
  const words = rawWords
    .map((w) => w.toUpperCase().replace(/[^A-Z]/g, ""))
    .filter((w) => w.length > 0 && w.length <= size);

  const grid: (string | null)[][] = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => null),
  );
  const placements: Placement[] = [];

  for (const word of words) {
    for (let attempt = 0; attempt < 250; attempt++) {
      const dir = DIRS[rand(DIRS.length)];
      const r0 = rand(size);
      const c0 = rand(size);
      const cells: Cell[] = [];
      let ok = true;
      for (let i = 0; i < word.length; i++) {
        const r = r0 + dir.r * i;
        const c = c0 + dir.c * i;
        if (r < 0 || r >= size || c < 0 || c >= size) {
          ok = false;
          break;
        }
        const existing = grid[r][c];
        if (existing !== null && existing !== word[i]) {
          ok = false;
          break;
        }
        cells.push({ r, c });
      }
      if (!ok) continue;
      cells.forEach((cell, i) => (grid[cell.r][cell.c] = word[i]));
      placements.push({ word, cells });
      break;
    }
  }

  const filled = grid.map((row) => row.map((ch) => ch ?? LETTERS[rand(26)]));
  return { grid: filled, placements, size };
}
