"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  generateWordSearch,
  type Cell,
  type WordSearch as WS,
} from "@/lib/wordsearch";
import { CrossSell } from "@/components/games/GameShell";

const key = (r: number, c: number) => `${r}:${c}`;
const sign = (n: number) => (n > 0 ? 1 : n < 0 ? -1 : 0);

const CELL_BASE =
  "flex aspect-square cursor-pointer items-center justify-center rounded-img border-0 p-0 text-[15px] font-semibold leading-none transition-[background-color,color,border-color,transform] duration-[140ms] ease-[ease]";

/**
 * Tap the first letter, then the last. Selections that aren't a straight line
 * (row, column or true diagonal) just move the anchor to the newly tapped cell;
 * a straight selection that isn't a hidden word flashes for 320ms.
 */
export function WordSearch({
  words,
  size = 12,
  bookSlug,
}: {
  words: string[];
  size?: number;
  bookSlug: string;
}) {
  const [ws, setWs] = useState<WS | null>(null);
  const [start, setStart] = useState<Cell | null>(null);
  const [found, setFound] = useState<string[]>([]);
  const [flash, setFlash] = useState<Cell[]>([]);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearFlashTimer = () => {
    if (flashTimer.current !== null) {
      clearTimeout(flashTimer.current);
      flashTimer.current = null;
    }
  };

  const newPuzzle = useCallback(() => {
    clearFlashTimer();
    setWs(generateWordSearch(words, size));
    setStart(null);
    setFound([]);
    setFlash([]);
  }, [words, size]);

  // Generated on the client only — generating during render (or in a useState
  // initializer) would put a different grid in the SSR HTML and break hydration.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    newPuzzle();
  }, [newPuzzle]);

  useEffect(() => clearFlashTimer, []);

  const tap = (r: number, c: number) => {
    if (!ws) return;

    if (!start) {
      setStart({ r, c });
      return;
    }
    if (start.r === r && start.c === c) {
      setStart(null);
      return;
    }

    const dr = r - start.r;
    const dc = c - start.c;
    const straight = dr === 0 || dc === 0 || Math.abs(dr) === Math.abs(dc);
    if (!straight) {
      // Not a line — treat the tap as a fresh anchor.
      setStart({ r, c });
      return;
    }

    const len = Math.max(Math.abs(dr), Math.abs(dc)) + 1;
    const stepR = sign(dr);
    const stepC = sign(dc);
    const cells: Cell[] = Array.from({ length: len }, (_, i) => ({
      r: start.r + stepR * i,
      c: start.c + stepC * i,
    }));

    const letters = cells.map((cell) => ws.grid[cell.r][cell.c]).join("");
    const reversed = [...letters].reverse().join("");
    const hit = ws.placements.find(
      (p) =>
        !found.includes(p.word) && (p.word === letters || p.word === reversed),
    );

    setStart(null);
    if (hit) {
      clearFlashTimer();
      setFound((prev) => [...prev, hit.word]);
      setFlash([]);
      return;
    }

    clearFlashTimer();
    setFlash(cells);
    flashTimer.current = setTimeout(() => {
      setFlash([]);
      flashTimer.current = null;
    }, 320);
  };

  const placedWords = ws ? ws.placements.map((p) => p.word) : [];
  const foundCells = new Set<string>();
  ws?.placements
    .filter((p) => found.includes(p.word))
    .forEach((p) => p.cells.forEach((cell) => foundCells.add(key(cell.r, cell.c))));
  const flashCells = new Set(flash.map((cell) => key(cell.r, cell.c)));
  const won = placedWords.length > 0 && found.length === placedWords.length;

  return (
    <div className="grid items-start gap-8 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
      {/* Board */}
      <div
        className="grid select-none gap-[3px] rounded-ui bg-canvas-soft p-3"
        style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
      >
        {ws
          ? ws.grid.map((row, r) =>
              row.map((letter, c) => {
                const k = key(r, c);
                const isFound = foundCells.has(k);
                const isStart = start?.r === r && start?.c === c;
                const tone = isFound
                  ? "bg-primary text-on-primary"
                  : isStart
                    ? "bg-ink text-on-primary"
                    : flashCells.has(k)
                      ? "bg-progress-track text-ink"
                      : "bg-canvas text-ink";
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() => tap(r, c)}
                    aria-label={`${letter}, row ${r + 1}, column ${c + 1}`}
                    className={`${CELL_BASE} ${tone}`}
                  >
                    {letter}
                  </button>
                );
              }),
            )
          : // Placeholder board so the layout doesn't jump before generation.
            Array.from({ length: size * size }, (_, i) => (
              <div
                key={i}
                aria-hidden
                className="aspect-square rounded-img bg-canvas"
              />
            ))}
      </div>

      {/* Word list + status */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-label font-medium uppercase text-body-mid">
            {found.length} of {placedWords.length} found
          </span>
          <button
            type="button"
            onClick={newPuzzle}
            className="cursor-pointer rounded-ui border border-ink bg-transparent px-4 py-2 text-nav font-semibold text-ink transition-[background-color,color,border-color,transform] duration-[140ms] ease-[ease] hover:bg-ink hover:text-on-primary"
          >
            New grid
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {placedWords.map((word) => {
            const done = found.includes(word);
            return (
              <span
                key={word}
                className={`rounded-pill border px-[14px] py-1.5 text-nav font-semibold ${
                  done
                    ? "border-ink bg-ink text-on-primary line-through"
                    : "border-mute bg-canvas text-ink"
                }`}
              >
                {word}
              </span>
            );
          })}
        </div>

        <p className="text-nav text-body-mid">
          {start
            ? "Now tap the last letter of the word."
            : "Tap the first letter of a word."}
        </p>

        {won && (
          <CrossSell
            heading="All ten found."
            blurb="The book has dozens more — players, stadiums, leagues and stats."
            slug={bookSlug}
            onRestart={newPuzzle}
          />
        )}
      </div>
    </div>
  );
}
