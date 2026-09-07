"use client";

import { useState } from "react";
import Link from "next/link";
import { getBook } from "@/data/books";
import { coverUrl } from "@/lib/amazon";
import { FOOTBALLER_ROUNDS, FOOTBALLER_CROSS_SELL_SLUG } from "@/data/games";

export function GuessTheFootballer() {
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(1); // how many clues are shown
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const total = FOOTBALLER_ROUNDS.length;
  const round = FOOTBALLER_ROUNDS[idx];
  const book = getBook(FOOTBALLER_CROSS_SELL_SLUG);

  const choose = (name: string) => {
    if (selected !== null) return;
    setSelected(name);
    if (name === round.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (idx + 1 >= total) {
      setFinished(true);
    } else {
      setIdx((n) => n + 1);
      setRevealed(1);
      setSelected(null);
    }
  };

  const restart = () => {
    setIdx(0);
    setRevealed(1);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    const perfect = score === total;
    return (
      <div className="mx-auto max-w-[32rem] rounded-xl border border-hairline bg-surface-soft p-6 text-center">
        <p className="text-5xl" aria-hidden>
          {perfect ? "🏆" : score >= total / 2 ? "⚽" : "👏"}
        </p>
        <p className="mt-2 text-display-sm font-bold text-ink">
          {score}/{total}
        </p>
        <p className="mt-1 text-title-sm font-semibold text-ink">
          {perfect
            ? "Perfect! You're a football genius!"
            : score >= total / 2
              ? "Great guessing!"
              : "Good try — play again!"}
        </p>

        {book && (
          <div className="mt-5 rounded-xl border border-hairline bg-surface p-4 text-left shadow-sm sm:flex sm:items-center sm:gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={coverUrl(book)}
              alt={`${book.title} cover`}
              className="mx-auto h-28 w-auto rounded object-contain shadow-sm sm:mx-0"
            />
            <div className="mt-3 sm:mt-0">
              <p className="text-title-sm font-bold text-ink">
                Loved this? Guess 100 more!
              </p>
              <p className="mt-1 text-body-sm text-body">
                {book.title} is packed with clues and famous players to guess.
              </p>
              <Link
                href={`/book/${book.slug}`}
                className="mt-3 inline-block rounded-pill bg-action px-6 py-2.5 text-button font-bold text-on-action shadow-sm hover:bg-action-strong"
              >
                Get the book →
              </Link>
            </div>
          </div>
        )}

        <button
          onClick={restart}
          className="mt-5 rounded-pill bg-primary px-6 py-2.5 text-button font-bold text-on-primary hover:bg-primary-strong"
        >
          Play again
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[32rem]">
      <div className="mb-2 flex items-center justify-between text-body-sm font-semibold text-muted">
        <span>
          Player {idx + 1} of {total}
        </span>
        <span>Score: {score}</span>
      </div>

      <div className="rounded-xl border border-hairline bg-surface p-5 shadow-sm">
        <p className="text-caption font-bold uppercase tracking-[0.14em] text-primary">
          Who am I?
        </p>

        {/* Clues, revealed one at a time */}
        <ul className="mt-3 flex flex-col gap-2">
          {round.clues.slice(0, revealed).map((clue, i) => (
            <li
              key={i}
              className="flex items-start gap-2 rounded-lg bg-surface-soft px-3 py-2 text-body-md text-ink"
            >
              <span aria-hidden>💡</span>
              <span>{clue}</span>
            </li>
          ))}
        </ul>

        {selected === null && revealed < round.clues.length && (
          <button
            onClick={() => setRevealed((r) => r + 1)}
            className="mt-3 text-button font-bold text-primary hover:text-primary-strong"
          >
            Show another clue ({revealed}/{round.clues.length})
          </button>
        )}

        {/* Answer options */}
        <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {round.options.map((name) => {
            const isAnswer = name === round.answer;
            const isChosen = selected === name;
            let cls = "border-hairline bg-surface text-ink hover:border-primary";
            if (selected !== null) {
              if (isAnswer) cls = "border-correct bg-correct-soft text-correct";
              else if (isChosen) cls = "border-wrong bg-wrong-soft text-wrong";
              else cls = "border-hairline bg-surface text-muted";
            }
            return (
              <button
                key={name}
                onClick={() => choose(name)}
                disabled={selected !== null}
                className={`flex items-center justify-between rounded-lg border px-4 py-3 text-left text-body-md font-semibold transition-colors ${cls}`}
              >
                {name}
                {selected !== null && isAnswer && <span>✓</span>}
                {selected !== null && isChosen && !isAnswer && <span>✗</span>}
              </button>
            );
          })}
        </div>
      </div>

      {selected !== null && (
        <button
          onClick={next}
          className="mt-4 w-full rounded-pill bg-primary px-6 py-3 text-button font-bold text-on-primary hover:bg-primary-strong"
        >
          {idx + 1 >= total ? "See my score" : "Next player"}
        </button>
      )}
    </div>
  );
}
