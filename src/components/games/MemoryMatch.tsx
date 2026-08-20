"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { getBook } from "@/data/books";
import { MEMORY_SLUGS } from "@/data/games";
import { coverUrl } from "@/lib/amazon";

type Card = { id: number; slug: string };

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildDeck(slugs: string[]): Card[] {
  const pairs = slugs.flatMap((slug) => [slug, slug]);
  return shuffle(pairs).map((slug, id) => ({ id, slug }));
}

export function MemoryMatch() {
  const slugs = useMemo(
    () => MEMORY_SLUGS.filter((s) => getBook(s)),
    [],
  );
  const [deck, setDeck] = useState<Card[]>([]);
  // Shuffle on the client only (avoids a server/client hydration mismatch).
  useEffect(() => setDeck(buildDeck(slugs)), [slugs]);
  const [open, setOpen] = useState<number[]>([]); // ids face-up this turn (0–2)
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [moves, setMoves] = useState(0);
  const [locked, setLocked] = useState(false);

  const won = matched.size === slugs.length && slugs.length > 0;

  const reset = useCallback(() => {
    setDeck(buildDeck(slugs));
    setOpen([]);
    setMatched(new Set());
    setMoves(0);
    setLocked(false);
  }, [slugs]);

  const flip = useCallback(
    (card: Card) => {
      if (locked || matched.has(card.slug) || open.includes(card.id)) return;
      const next = [...open, card.id];
      setOpen(next);
      if (next.length === 2) {
        setMoves((m) => m + 1);
        const [a, b] = next.map((id) => deck.find((c) => c.id === id)!);
        if (a.slug === b.slug) {
          setMatched((prev) => new Set(prev).add(a.slug));
          setOpen([]);
        } else {
          setLocked(true);
          setTimeout(() => {
            setOpen([]);
            setLocked(false);
          }, 800);
        }
      }
    },
    [deck, open, matched, locked],
  );

  return (
    <div className="mx-auto max-w-[34rem]">
      {/* Scoreboard */}
      <div className="mb-4 flex items-center justify-between">
        <span className="text-body-sm font-semibold text-muted">
          Moves: <span className="text-ink">{moves}</span> · Pairs:{" "}
          <span className="text-ink">
            {matched.size}/{slugs.length}
          </span>
        </span>
        <button
          onClick={reset}
          className="rounded-lg border border-hairline bg-surface px-4 py-2 text-button font-bold text-ink hover:border-primary"
        >
          New game
        </button>
      </div>

      {/* Board */}
      <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4">
        {deck.map((card) => {
          const book = getBook(card.slug)!;
          const isUp = open.includes(card.id) || matched.has(card.slug);
          return (
            <button
              key={card.id}
              onClick={() => flip(card)}
              aria-label={isUp ? book.title : "Hidden card"}
              className="relative aspect-[3/4] overflow-hidden rounded-lg border border-hairline shadow-sm transition-transform active:scale-95"
            >
              {isUp ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={coverUrl(book)}
                  alt={book.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center bg-primary text-2xl font-bold text-on-primary">
                  ?
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Win message */}
      {won && (
        <div className="mt-6 rounded-xl border border-hairline bg-surface-soft p-5 text-center">
          <p className="text-title-sm font-bold text-ink">
            🎉 You found all the pairs in {moves} moves!
          </p>
          <button
            onClick={reset}
            className="mt-3 rounded-pill bg-primary px-6 py-2.5 text-button font-bold text-on-primary hover:bg-primary-strong"
          >
            Play again
          </button>
        </div>
      )}
    </div>
  );
}
