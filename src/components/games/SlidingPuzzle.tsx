"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getBook } from "@/data/books";
import { PUZZLE_SLUGS } from "@/data/games";
import { coverUrl } from "@/lib/amazon";

const N = 3; // 3×3 grid → 8 tiles + 1 blank
const BLANK = N * N - 1;

const rc = (p: number) => [Math.floor(p / N), p % N];
const adjacent = (a: number, b: number) => {
  const [ra, ca] = rc(a);
  const [rb, cb] = rc(b);
  return Math.abs(ra - rb) + Math.abs(ca - cb) === 1;
};

function shuffled(): number[] {
  const board = Array.from({ length: N * N }, (_, i) => i);
  let blank = BLANK;
  for (let k = 0; k < 200; k++) {
    const neighbours = board
      .map((_, p) => p)
      .filter((p) => adjacent(p, blank));
    const pick = neighbours[Math.floor(Math.random() * neighbours.length)];
    [board[blank], board[pick]] = [board[pick], board[blank]];
    blank = pick;
  }
  if (board.every((v, i) => v === i)) return shuffled();
  return board;
}

export function SlidingPuzzle() {
  const slugs = useMemo(() => PUZZLE_SLUGS.filter((s) => getBook(s)), []);
  const [picIdx, setPicIdx] = useState(0);
  const [board, setBoard] = useState<number[]>([]);
  // Shuffle on the client only (avoids a server/client hydration mismatch).
  useEffect(() => setBoard(shuffled()), []);
  const [moves, setMoves] = useState(0);

  const book = getBook(slugs[picIdx % slugs.length])!;
  const cover = coverUrl(book);
  const solved = board.length > 0 && board.every((v, i) => v === i);

  const move = useCallback(
    (pos: number) => {
      if (solved) return;
      const blank = board.indexOf(BLANK);
      if (!adjacent(pos, blank)) return;
      const next = [...board];
      [next[blank], next[pos]] = [next[pos], next[blank]];
      setBoard(next);
      setMoves((m) => m + 1);
    },
    [board, solved],
  );

  const restart = useCallback(() => {
    setBoard(shuffled());
    setMoves(0);
  }, []);

  const newPicture = useCallback(() => {
    setPicIdx((i) => i + 1);
    setBoard(shuffled());
    setMoves(0);
  }, []);

  return (
    <div className="mx-auto max-w-[22rem]">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-body-sm font-semibold text-muted">
          Moves: <span className="text-ink">{moves}</span>
        </span>
        <div className="flex gap-2">
          <button
            onClick={newPicture}
            className="rounded-lg border border-hairline bg-surface px-3.5 py-2 text-button font-bold text-ink hover:border-primary"
          >
            New picture
          </button>
          <button
            onClick={restart}
            className="rounded-lg border border-hairline bg-surface px-3.5 py-2 text-button font-bold text-ink hover:border-primary"
          >
            Shuffle
          </button>
        </div>
      </div>

      <div className="grid aspect-square w-full grid-cols-3 gap-1 rounded-xl bg-surface-soft p-1">
        {board.map((tile, pos) => {
          const showImg = tile !== BLANK || solved;
          const [r, c] = rc(tile);
          return (
            <button
              key={pos}
              onClick={() => move(pos)}
              aria-label={showImg ? "Tile" : "Empty space"}
              className="overflow-hidden rounded-md transition-transform active:scale-95"
              style={
                showImg
                  ? {
                      backgroundImage: `url(${cover})`,
                      backgroundSize: `${N * 100}% ${N * 100}%`,
                      backgroundPosition: `${(c / (N - 1)) * 100}% ${(r / (N - 1)) * 100}%`,
                    }
                  : { background: "transparent" }
              }
            />
          );
        })}
      </div>

      {solved && (
        <div className="mt-5 rounded-xl border border-hairline bg-surface-soft p-5 text-center">
          <p className="text-title-sm font-bold text-ink">
            🎉 Solved in {moves} moves!
          </p>
          <p className="mt-1 text-body-sm text-muted">
            That&apos;s the cover of <em>{book.title}</em>.
          </p>
          <Link
            href={`/book/${book.slug}`}
            className="mt-3 inline-block rounded-lg bg-primary px-6 py-2.5 text-button font-bold text-on-primary hover:bg-primary-strong"
          >
            See the book →
          </Link>
        </div>
      )}
    </div>
  );
}
