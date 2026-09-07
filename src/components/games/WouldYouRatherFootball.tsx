"use client";

import { useState } from "react";
import { CrossSell } from "@/components/games/GameShell";
import { WYR_FOOTBALL_QUESTIONS, WYR_FOOTBALL_BOOK } from "@/data/games";

/** The one transition used across the design system. */
const TRANSITION =
  "transition-[background-color,color,border-color,transform] duration-[140ms] ease-[ease]";

const PANEL =
  `flex cursor-pointer items-center rounded-ui border px-6 py-8 text-left text-cardlg font-semibold ${TRANSITION} hover:-translate-y-0.5`;

/**
 * Five football "would you rather" pairs. Tapping a panel advances straight to
 * the next question; after the fifth pick the run is replayed as a recap list
 * above the book cross-sell.
 */
export function WouldYouRatherFootball() {
  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState<string[]>([]);

  const total = WYR_FOOTBALL_QUESTIONS.length;
  const done = idx >= total;
  const question = WYR_FOOTBALL_QUESTIONS[done ? total - 1 : idx];

  const choose = (key: "a" | "b") => {
    setChosen((list) => [...list, WYR_FOOTBALL_QUESTIONS[idx][key]]);
    setIdx((n) => n + 1);
  };

  const restart = () => {
    setIdx(0);
    setChosen([]);
  };

  if (done) {
    return (
      <div className="flex flex-col gap-5">
        <h2 className="text-h2 font-semibold">Your picks</h2>
        <div className="flex flex-col gap-2.5">
          {chosen.map((choice, i) => (
            <div
              key={`${i}-${choice}`}
              className="flex items-baseline gap-3 rounded-ui bg-canvas-soft px-5 py-4"
            >
              <span className="flex-none text-label font-medium uppercase text-body-mid">
                {i + 1}
              </span>
              <span className="text-copy font-semibold text-ink">{choice}</span>
            </div>
          ))}
        </div>
        <CrossSell
          heading="200 more choices in the book."
          blurb="Would You Rather — Football Edition, ages 6–12."
          slug={WYR_FOOTBALL_BOOK}
          onRestart={restart}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <span className="text-label font-medium uppercase text-body-mid">
        Question {idx + 1} of {total}
      </span>

      <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
        <button
          type="button"
          onClick={() => choose("a")}
          className={`${PANEL} min-h-[180px] border-mute bg-canvas-soft text-ink hover:border-ink`}
        >
          {question.a}
        </button>
        <button
          type="button"
          onClick={() => choose("b")}
          className={`${PANEL} min-h-[180px] border-ink bg-ink text-on-primary`}
        >
          {question.b}
        </button>
      </div>

      <p className="text-nav text-body-mid">Tap the one you&apos;d choose.</p>
    </div>
  );
}
