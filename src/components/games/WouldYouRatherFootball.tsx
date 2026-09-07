"use client";

import { useState } from "react";
import Link from "next/link";
import { getBook } from "@/data/books";
import { coverUrl } from "@/lib/amazon";
import { WYR_FOOTBALL_QUESTIONS, WYR_FOOTBALL_BOOK } from "@/data/games";

export function WouldYouRatherFootball() {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<"a" | "b" | null>(null);
  const [finished, setFinished] = useState(false);

  const total = WYR_FOOTBALL_QUESTIONS.length;
  const q = WYR_FOOTBALL_QUESTIONS[idx];
  const book = getBook(WYR_FOOTBALL_BOOK);

  const pick = (choice: "a" | "b") => {
    if (picked !== null) return;
    setPicked(choice);
  };

  const next = () => {
    if (idx + 1 >= total) {
      setFinished(true);
    } else {
      setIdx((n) => n + 1);
      setPicked(null);
    }
  };

  const restart = () => {
    setIdx(0);
    setPicked(null);
    setFinished(false);
  };

  if (finished) {
    return (
      <div className="mx-auto max-w-[32rem] rounded-xl border border-hairline bg-surface-soft p-6 text-center">
        <p className="text-5xl" aria-hidden>
          ⚽
        </p>
        <p className="mt-2 text-title-lg font-bold text-ink">
          Tough choices!
        </p>
        <p className="mt-1 text-body-md text-body">
          Want hundreds more football would-you-rathers?
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
              <p className="text-title-sm font-bold text-ink">{book.title}</p>
              <p className="mt-1 text-body-sm text-body">
                Packed with hilarious football would-you-rather questions for
                kids.
              </p>
              <a
                href={`/go/${book.slug}`}
                className="mt-3 inline-block rounded-pill bg-action px-6 py-2.5 text-button font-bold text-on-action shadow-sm hover:bg-action-strong"
              >
                Buy on Amazon →
              </a>
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
      <div className="mb-2 text-body-sm font-semibold text-muted">
        Question {idx + 1} of {total}
      </div>

      <p className="text-center text-title-md font-bold text-ink">
        Would you rather…
      </p>

      <div className="mt-4 flex flex-col items-stretch gap-3">
        {(["a", "b"] as const).map((choice) => {
          const isPicked = picked === choice;
          let cls =
            "border-hairline bg-surface text-ink hover:border-primary hover:-translate-y-0.5";
          if (picked !== null) {
            cls = isPicked
              ? "border-primary bg-accent-soft text-ink"
              : "border-hairline bg-surface text-muted";
          }
          return (
            <button
              key={choice}
              onClick={() => pick(choice)}
              disabled={picked !== null}
              className={`rounded-xl border px-5 py-5 text-center text-body-md font-semibold shadow-sm transition-all ${cls}`}
            >
              {q[choice]}
              {isPicked && <span className="ml-2">✓</span>}
            </button>
          );
        })}

        {picked === null && (
          <p className="text-center text-caption font-semibold text-muted">
            There are no wrong answers — just pick your favourite!
          </p>
        )}
      </div>

      {picked !== null && (
        <button
          onClick={next}
          className="mt-4 w-full rounded-pill bg-primary px-6 py-3 text-button font-bold text-on-primary hover:bg-primary-strong"
        >
          {idx + 1 >= total ? "Finish" : "Next question"}
        </button>
      )}
    </div>
  );
}
