"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  generateWordSearch,
  type Cell,
  type WordSearch as WS,
} from "@/lib/wordsearch";
import { getBook } from "@/data/books";

const key = (c: Cell) => `${c.r},${c.c}`;
const sign = (n: number) => (n > 0 ? 1 : n < 0 ? -1 : 0);

/** Straight-line cells from a→b, or null if not a valid line (row/col/diagonal). */
function lineCells(a: Cell, b: Cell): Cell[] | null {
  const dr = b.r - a.r;
  const dc = b.c - a.c;
  if (dr !== 0 && dc !== 0 && Math.abs(dr) !== Math.abs(dc)) return null;
  const len = Math.max(Math.abs(dr), Math.abs(dc)) + 1;
  const sr = sign(dr);
  const sc = sign(dc);
  return Array.from({ length: len }, (_, i) => ({ r: a.r + sr * i, c: a.c + sc * i }));
}

export function WordSearch({
  words,
  size = 10,
  bookSlug,
}: {
  words: string[];
  size?: number;
  bookSlug: string;
}) {
  const [ws, setWs] = useState<WS | null>(null);
  const [found, setFound] = useState<Set<string>>(new Set());
  const [foundCells, setFoundCells] = useState<Set<string>>(new Set());
  const [sel, setSel] = useState<Cell[]>([]);
  const startRef = useRef<Cell | null>(null);
  const book = getBook(bookSlug);

  const newPuzzle = useCallback(() => {
    setWs(generateWordSearch(words, size));
    setFound(new Set());
    setFoundCells(new Set());
    setSel([]);
    startRef.current = null;
  }, [words, size]);

  // Generate on the client only (avoids a hydration mismatch).
  useEffect(() => newPuzzle(), [newPuzzle]);

  const cellFromPoint = (x: number, y: number): Cell | null => {
    const el = document.elementFromPoint(x, y) as HTMLElement | null;
    if (el && el.dataset.r !== undefined && el.dataset.c !== undefined) {
      return { r: Number(el.dataset.r), c: Number(el.dataset.c) };
    }
    return null;
  };

  const onDown = (e: React.PointerEvent) => {
    const c = cellFromPoint(e.clientX, e.clientY);
    if (!c) return;
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    startRef.current = c;
    setSel([c]);
  };

  const onMove = (e: React.PointerEvent) => {
    if (!startRef.current) return;
    const c = cellFromPoint(e.clientX, e.clientY);
    if (!c) return;
    const line = lineCells(startRef.current, c);
    if (line) setSel(line);
  };

  const onUp = () => {
    if (ws && sel.length >= 2) {
      const letters = sel.map((c) => ws.grid[c.r][c.c]).join("");
      const rev = [...letters].reverse().join("");
      const match = ws.placements.find(
        (p) =>
          !found.has(p.word) &&
          p.cells.length === sel.length &&
          (p.word === letters || p.word === rev),
      );
      if (match) {
        setFound((prev) => new Set(prev).add(match.word));
        setFoundCells((prev) => {
          const n = new Set(prev);
          match.cells.forEach((cell) => n.add(key(cell)));
          return n;
        });
      }
    }
    setSel([]);
    startRef.current = null;
  };

  const won = ws !== null && found.size === ws.placements.length && ws.placements.length > 0;
  const selSet = new Set(sel.map(key));

  return (
    <div className="mx-auto max-w-[30rem]">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-body-sm font-semibold text-muted">
          Found: <span className="text-ink">{found.size}/{words.length}</span>
        </span>
        <button
          onClick={newPuzzle}
          className="rounded-lg border border-hairline bg-surface px-4 py-2 text-button font-bold text-ink hover:border-primary"
        >
          New puzzle
        </button>
      </div>

      {/* Grid */}
      <div
        className="grid touch-none select-none rounded-xl border border-hairline bg-surface p-1.5 shadow-sm"
        style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        {ws?.grid.map((row, r) =>
          row.map((ch, c) => {
            const k = `${r},${c}`;
            const isFound = foundCells.has(k);
            const isSel = selSet.has(k);
            return (
              <div
                key={k}
                data-r={r}
                data-c={c}
                className={`flex aspect-square items-center justify-center rounded text-[3.2vw] font-bold uppercase sm:text-body-md ${
                  isFound
                    ? "bg-primary text-on-primary"
                    : isSel
                      ? "bg-accent text-ink"
                      : "text-ink"
                }`}
              >
                {ch}
              </div>
            );
          }),
        )}
      </div>

      {/* Words to find */}
      <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1.5">
        {words.map((w) => (
          <span
            key={w}
            className={`text-body-sm font-bold uppercase tracking-wide ${
              found.has(w.toUpperCase().replace(/[^A-Z]/g, ""))
                ? "text-muted line-through"
                : "text-ink"
            }`}
          >
            {w}
          </span>
        ))}
      </div>

      {/* Teaser → buy CTA */}
      <div className="mt-8 rounded-xl border border-hairline bg-surface-soft p-6 text-center">
        {won ? (
          <p className="text-title-sm font-bold text-ink">
            🏆 You found them all! Nice one.
          </p>
        ) : (
          <p className="text-title-sm font-bold text-ink">
            Enjoying this? It&apos;s just a taster!
          </p>
        )}
        <p className="mx-auto mt-2 max-w-[26rem] text-body-md text-body">
          Our <strong className="text-ink">Football Word Search Book</strong> is
          packed with dozens more puzzles to keep footie-mad kids busy for hours.
        </p>
        {book && (
          <a
            href={`/go/${book.slug}`}
            className="mt-4 inline-block rounded-pill bg-primary px-7 py-3 text-button font-bold text-on-primary shadow-sm transition-colors hover:bg-primary-strong"
          >
            Get the book on Amazon →
          </a>
        )}
      </div>
    </div>
  );
}
