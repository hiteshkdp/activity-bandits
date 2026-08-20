"use client";

import { useState } from "react";
import Link from "next/link";
import { getBook } from "@/data/books";
import { QUIZ_QUESTIONS, QUIZ_CROSS_SELL_SLUG } from "@/data/games";

export function Quiz() {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const total = QUIZ_QUESTIONS.length;
  const q = QUIZ_QUESTIONS[idx];
  const book = getBook(QUIZ_CROSS_SELL_SLUG);

  const choose = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === q.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (idx + 1 >= total) {
      setFinished(true);
    } else {
      setIdx((n) => n + 1);
      setSelected(null);
    }
  };

  const restart = () => {
    setIdx(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    const perfect = score === total;
    return (
      <div className="mx-auto max-w-[32rem] rounded-xl border border-hairline bg-surface-soft p-6 text-center">
        <p className="text-display-sm font-bold text-ink">
          {score}/{total}
        </p>
        <p className="mt-1 text-title-sm font-semibold text-ink">
          {perfect ? "🏆 Perfect score!" : score >= total / 2 ? "🎉 Well done!" : "Good try!"}
        </p>
        <div className="mt-5 flex flex-col items-center gap-3">
          <button
            onClick={restart}
            className="rounded-pill bg-primary px-6 py-2.5 text-button font-bold text-on-primary hover:bg-primary-strong"
          >
            Play again
          </button>
          {book && (
            <Link
              href={`/book/${book.slug}`}
              className="text-button font-bold text-primary hover:text-primary-strong"
            >
              Love facts? Get {book.title} →
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[32rem]">
      <div className="mb-2 flex items-center justify-between text-body-sm font-semibold text-muted">
        <span>
          Question {idx + 1} of {total}
        </span>
        <span>Score: {score}</span>
      </div>

      <div className="rounded-xl border border-hairline bg-surface p-5 shadow-sm">
        <h2 className="text-title-md font-semibold text-ink">{q.q}</h2>
        <div className="mt-4 flex flex-col gap-2.5">
          {q.options.map((opt, i) => {
            const isAnswer = i === q.answer;
            const isChosen = selected === i;
            let cls =
              "border-hairline bg-surface text-ink hover:border-primary";
            if (selected !== null) {
              if (isAnswer) cls = "border-correct bg-correct-soft text-correct";
              else if (isChosen) cls = "border-wrong bg-wrong-soft text-wrong";
              else cls = "border-hairline bg-surface text-muted";
            }
            return (
              <button
                key={i}
                onClick={() => choose(i)}
                disabled={selected !== null}
                className={`flex items-center justify-between rounded-lg border px-4 py-3 text-left text-body-md font-semibold transition-colors ${cls}`}
              >
                {opt}
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
          {idx + 1 >= total ? "See my score" : "Next question"}
        </button>
      )}
    </div>
  );
}
