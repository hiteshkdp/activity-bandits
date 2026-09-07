"use client";

import { useState } from "react";
import { CrossSell } from "@/components/games/GameShell";
import { BTN_DARK } from "@/components/ui";
import { FOOTBALLER_ROUNDS, FOOTBALLER_CROSS_SELL_SLUG } from "@/data/games";

/** The one transition used across the design system. */
const TRANSITION =
  "transition-[background-color,color,border-color,transform] duration-[140ms] ease-[ease]";

/**
 * Three clues, one famous player. Clues reveal one at a time (answering reveals
 * the lot), four name options, running score, then the book cross-sell.
 */
export function GuessTheFootballer() {
  const [idx, setIdx] = useState(0);
  const [shown, setShown] = useState(1);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const total = FOOTBALLER_ROUNDS.length;
  const round = FOOTBALLER_ROUNDS[idx];
  const clueCount = round.clues.length;
  const answered = picked !== null;
  const last = idx >= total - 1;

  const pick = (name: string) => {
    if (picked !== null) return;
    setPicked(name);
    setShown(clueCount); // answering shows every clue
    if (name === round.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (last) {
      setDone(true);
      return;
    }
    setIdx((n) => n + 1);
    setShown(1);
    setPicked(null);
  };

  const restart = () => {
    setIdx(0);
    setShown(1);
    setPicked(null);
    setScore(0);
    setDone(false);
  };

  if (done) {
    return (
      <CrossSell
        heading={`You named ${score} of ${total}.`}
        blurb="100 players to guess in the book — clues, silhouettes and stats."
        slug={FOOTBALLER_CROSS_SELL_SLUG}
        showCover
        onRestart={restart}
      />
    );
  }

  return (
    <div className="flex flex-col gap-5 rounded-ui bg-canvas-soft p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <span className="text-label font-medium uppercase text-body-mid">
          Player {idx + 1} of {total}
        </span>
        <span className="text-nav font-semibold text-ink">{score} correct</span>
      </div>

      <div className="flex flex-col gap-2.5">
        {round.clues.slice(0, shown).map((clue, i) => (
          <div
            key={clue}
            className="flex items-baseline gap-3 rounded-ui border border-mute bg-canvas px-[18px] py-3.5"
          >
            <span className="flex-none text-label font-medium uppercase text-body-mid">
              Clue {i + 1}
            </span>
            <span className="text-copy text-ink">{clue}</span>
          </div>
        ))}
      </div>

      {!answered && shown < clueCount && (
        <button
          type="button"
          onClick={() => setShown((s) => Math.min(clueCount, s + 1))}
          className={`inline-flex cursor-pointer items-center justify-center self-start rounded-ui border border-ink bg-transparent px-5 py-2.5 text-btn font-semibold text-ink ${TRANSITION} hover:bg-ink hover:text-on-primary`}
        >
          Another clue
        </button>
      )}

      <div className="grid gap-2.5 [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]">
        {round.options.map((name) => {
          const isAnswer = name === round.answer;
          let tone = "border-ink bg-canvas text-ink";
          if (answered) {
            tone = isAnswer
              ? "border-ink bg-ink text-on-primary"
              : "border-mute bg-canvas text-body-mid";
          }
          return (
            <button
              key={name}
              type="button"
              onClick={() => pick(name)}
              disabled={answered}
              className={`rounded-ui border px-[18px] py-3.5 text-left text-btn font-semibold ${TRANSITION} ${
                answered ? "" : "cursor-pointer"
              } ${tone}`}
            >
              {name}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span aria-live="polite" className="text-btn font-semibold text-ink">
            {picked === round.answer
              ? `Correct — it's ${round.answer}!`
              : `It was ${round.answer}.`}
          </span>
          <button
            type="button"
            onClick={next}
            className={`${BTN_DARK} cursor-pointer`}
          >
            {last ? "See my score" : "Next player"}
          </button>
        </div>
      )}
    </div>
  );
}
