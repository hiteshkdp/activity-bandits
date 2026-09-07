"use client";

import { useState } from "react";
import { QUIZ_QUESTIONS, QUIZ_CROSS_SELL_SLUG } from "@/data/games";
import { BTN_DARK } from "@/components/ui";
import { CrossSell } from "@/components/games/GameShell";

const TOTAL = QUIZ_QUESTIONS.length;

export function Quiz() {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = QUIZ_QUESTIONS[idx];
  const answered = picked !== null;
  const last = idx >= TOTAL - 1;

  const choose = (i: number) => {
    if (answered) return;
    setPicked(i);
    if (i === q.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (last) {
      setFinished(true);
      return;
    }
    setIdx((n) => n + 1);
    setPicked(null);
  };

  const restart = () => {
    setIdx(0);
    setPicked(null);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    const verdict =
      score === TOTAL
        ? "A perfect round — not a single one missed."
        : score >= TOTAL / 2
          ? "Nice work. Have another go and beat that score."
          : "Good try — the answers stick the second time round.";

    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-start gap-4 rounded-ui bg-canvas-soft p-8">
          <p className="text-label font-medium uppercase text-body-mid">
            All done
          </p>
          <h2 className="text-h2">
            You got {score} out of {TOTAL}.
          </h2>
          <p className="text-copy text-body">{verdict}</p>
        </div>

        <CrossSell
          heading="200 more amazing facts."
          blurb="Outrageous stats, legendary players and record-breakers — the whole book is facts kids actually want to repeat."
          slug={QUIZ_CROSS_SELL_SLUG}
          showCover
          onRestart={restart}
        />
      </div>
    );
  }

  const progress = ((idx + 1) / TOTAL) * 100;

  return (
    <div className="flex flex-col gap-5 rounded-ui bg-canvas-soft p-6">
      {/* Progress + score */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <span className="text-label font-medium uppercase text-body-mid">
          Question {idx + 1} of {TOTAL}
        </span>
        <span className="text-nav font-semibold text-ink">{score} correct</span>
      </div>

      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={TOTAL}
        aria-valuenow={idx + 1}
        aria-label="Quiz progress"
        className="h-[6px] w-full overflow-hidden rounded-pill bg-progress-track"
      >
        <div
          className="h-full rounded-pill bg-primary transition-[width] duration-[140ms] ease-[ease]"
          style={{ width: `${progress}%` }}
        />
      </div>

      <h2 className="text-cardlg font-semibold text-ink">{q.q}</h2>

      {/* Options */}
      <div className="flex flex-col gap-[10px]">
        {q.options.map((opt, i) => {
          const isAnswer = i === q.answer;
          let state =
            "border-ink bg-canvas text-ink hover:bg-ink hover:text-on-primary";
          if (answered) {
            state = isAnswer
              ? "border-ink bg-ink text-on-primary"
              : "border-mute bg-canvas text-body-mid";
          }

          return (
            <button
              key={opt}
              type="button"
              onClick={() => choose(i)}
              disabled={answered}
              className={`w-full cursor-pointer rounded-ui border px-[18px] py-[14px] text-left text-btn font-semibold transition-[background-color,color,border-color,transform] duration-[140ms] ease-[ease] disabled:cursor-default ${state}`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {/* Feedback + next */}
      {answered && (
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="text-btn font-semibold text-ink">
            {picked === q.answer
              ? "Correct!"
              : `The answer was ${q.options[q.answer]}.`}
          </span>
          <button
            type="button"
            onClick={next}
            className={`${BTN_DARK} cursor-pointer`}
          >
            {last ? "See my score" : "Next question"}
          </button>
        </div>
      )}
    </div>
  );
}
