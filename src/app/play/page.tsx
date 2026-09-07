import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "Free Fun — Games & Puzzles",
  description: `Free browser games and printable puzzles for kids from ${SITE.authorName}. No downloads, no sign-up.`,
};

const GAMES = [
  { emoji: "⚽", title: "Football Word Search", desc: "Find the hidden football words in the grid.", href: "/play/word-search" },
  { emoji: "🃏", title: "Memory Match", desc: "Flip the cards and match the pairs of book covers.", href: "/play/memory" },
  { emoji: "🕵️", title: "Guess the Footballer", desc: "Three clues, one famous player — can you name them all?", href: "/play/guess-the-footballer" },
  { emoji: "🤔", title: "Would You Rather? Football", desc: "Five tricky football choices — which would you pick?", href: "/play/would-you-rather-football" },
  { emoji: "🧠", title: "Kids Quiz", desc: "Fun trivia — how many can you get right?", href: "/play/quiz" },
];

export default function PlayPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-[64rem] flex-1 px-5 py-12">
        <h1 className="text-display-sm font-semibold text-ink sm:text-display-md">
          Free Fun
        </h1>
        <p className="mt-3 max-w-[36rem] text-body-md text-body sm:text-title-sm">
          Play free games right in your browser — no downloads, no sign-up, just
          fun. Printable puzzles are on the way too!
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {GAMES.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className="group flex flex-col rounded-xl border border-hairline bg-surface p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <span className="text-4xl" aria-hidden>
                {g.emoji}
              </span>
              <h2 className="mt-4 text-title-md font-semibold text-ink">
                {g.title}
              </h2>
              <p className="mt-1 flex-1 text-body-sm text-body">{g.desc}</p>
              <span className="mt-4 text-button font-bold text-primary">
                Play →
              </span>
            </Link>
          ))}

          {/* Printables — coming soon */}
          <div className="flex flex-col rounded-xl border border-dashed border-hairline bg-surface-soft p-6">
            <span className="text-4xl" aria-hidden>
              🖨️
            </span>
            <h2 className="mt-4 text-title-md font-semibold text-ink">
              Printable puzzles
            </h2>
            <p className="mt-1 flex-1 text-body-sm text-body">
              Free word searches, mazes and colouring pages to print at home.
            </p>
            <span className="mt-4 inline-block w-fit rounded-pill bg-primary/15 px-3 py-1 text-caption font-bold uppercase tracking-wide text-primary">
              Coming soon
            </span>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
