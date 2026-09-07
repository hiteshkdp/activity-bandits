"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getBook } from "@/data/books";
import { MEMORY_SLUGS } from "@/data/games";
import { coverUrl } from "@/lib/amazon";
import { Badge, BTN_OUTLINE } from "@/components/ui";
import { CrossSell } from "@/components/games/GameShell";

/** How long the two open cards stay up before the turn resolves. */
const MATCH_MS = 420;
const MISS_MS = 780;

/** The board is built from real covers, so it cross-sells the first of them. */
const CROSS_SELL_SLUG = MEMORY_SLUGS[0];

type Card = { id: number; slug: string };

/** Deterministic deck — every slug twice, in order. Safe for the first paint. */
function orderedDeck(slugs: string[]): Card[] {
  return slugs.flatMap((slug) => [slug, slug]).map((slug, id) => ({ id, slug }));
}

/** Fisher–Yates. Card ids travel with their card, so keys stay stable. */
function shuffled(deck: Card[]): Card[] {
  const a = [...deck];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function MemoryMatch() {
  const slugs = useMemo(() => MEMORY_SLUGS.filter((s) => getBook(s)), []);

  const [deck, setDeck] = useState<Card[]>(() => orderedDeck(slugs));
  const [flipped, setFlipped] = useState<number[]>([]); // face-up this turn (0–2)
  const [matched, setMatched] = useState<number[]>([]); // stay face-up
  const [moves, setMoves] = useState(0);
  const [locked, setLocked] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Shuffle on the client only: the server renders the ordered deck, but every
  // card starts face-down so the two paints are identical — no hydration gap.
  // The deal itself runs in a microtask so it stays off React's synchronous
  // render path (a face-down board looks the same either way).
  useEffect(() => {
    queueMicrotask(() => setDeck((d) => shuffled(d)));
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const restart = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setDeck((d) => shuffled(d));
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setLocked(false);
  }, []);

  const flip = useCallback(
    (card: Card) => {
      if (locked || flipped.includes(card.id) || matched.includes(card.id)) {
        return;
      }

      const next = [...flipped, card.id];
      if (next.length < 2) {
        setFlipped(next);
        return;
      }

      // Second card: show both, count the move, then lock until it resolves.
      const [a, b] = next;
      const same =
        deck.find((c) => c.id === a)?.slug === deck.find((c) => c.id === b)?.slug;

      setFlipped(next);
      setMoves((m) => m + 1);
      setLocked(true);
      timer.current = setTimeout(
        () => {
          if (same) setMatched((prev) => [...prev, a, b]);
          setFlipped([]);
          setLocked(false);
        },
        same ? MATCH_MS : MISS_MS,
      );
    },
    [deck, flipped, matched, locked],
  );

  const totalPairs = deck.length / 2;
  const pairs = matched.length / 2;
  const won = deck.length > 0 && matched.length === deck.length;

  return (
    <div className="flex flex-col gap-6">
      {/* Scoreboard + reshuffle */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <Badge>
            {moves} {moves === 1 ? "move" : "moves"}
          </Badge>
          <Badge>
            {pairs} of {totalPairs} pairs
          </Badge>
        </div>
        <button
          type="button"
          onClick={restart}
          className={`${BTN_OUTLINE} cursor-pointer`}
        >
          Shuffle again
        </button>
      </div>

      {/* Board */}
      <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(120px,1fr))]">
        {deck.map((card) => {
          const book = getBook(card.slug);
          if (!book) return null;
          const isMatched = matched.includes(card.id);
          const open = isMatched || flipped.includes(card.id);

          return (
            <button
              key={card.id}
              type="button"
              onClick={() => flip(card)}
              aria-label={open ? book.title : "Face-down card"}
              className={`relative aspect-[2/3] cursor-pointer overflow-hidden rounded-ui border p-0 transition-[background-color,color,border-color,transform,opacity] duration-[140ms] ease-[ease] ${
                open ? "bg-canvas" : "bg-canvas-soft"
              } ${isMatched ? "border-primary opacity-[0.55]" : "border-mute"}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={coverUrl(book)}
                alt=""
                loading="lazy"
                className={`h-full w-full object-cover ${open ? "block" : "hidden"}`}
              />
              {!open && (
                <span
                  aria-hidden
                  className="absolute inset-0 flex items-center justify-center text-[28px] font-bold text-mute"
                >
                  ?
                </span>
              )}
            </button>
          );
        })}
      </div>

      {won && (
        <CrossSell
          heading={`Done in ${moves} moves.`}
          blurb="Every cover here is a real book — packed with mazes, colouring, puzzles and more."
          slug={CROSS_SELL_SLUG}
          showCover
          onRestart={restart}
        />
      )}
    </div>
  );
}
