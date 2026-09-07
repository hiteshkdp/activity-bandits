import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BTN_PRIMARY } from "@/components/ui";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "Free Fun — Games & Puzzles",
  description: `Free browser games and printable puzzles for kids from ${SITE.authorName}. No downloads, no sign-up.`,
};

const GAMES = [
  {
    kind: "Word game",
    title: "Football Word Search",
    blurb: "Find the hidden football words in the grid.",
    href: "/play/word-search",
  },
  {
    kind: "Memory game",
    title: "Memory Match",
    blurb: "Flip the cards and match the pairs of book covers.",
    href: "/play/memory",
  },
  {
    kind: "Guessing game",
    title: "Guess the Footballer",
    blurb: "Three clues, one famous player — can you name them all?",
    href: "/play/guess-the-footballer",
  },
  {
    kind: "Choices",
    title: "Would You Rather? Football",
    blurb: "Five tricky football choices — which would you pick?",
    href: "/play/would-you-rather-football",
  },
  {
    kind: "Trivia",
    title: "Kids Quiz",
    blurb: "Fun trivia — how many can you get right?",
    href: "/play/quiz",
  },
];

export default function PlayPage() {
  return (
    <>
      <SiteHeader />

      <main className="flex-auto">
        {/* Hero */}
        <section className="bg-canvas px-6 pb-8 pt-16">
          <div className="mx-auto flex max-w-[1280px] flex-col items-start gap-6">
            <p className="text-label font-medium uppercase text-ink">
              Free fun
            </p>
            <h1 className="text-hero">Free Fun</h1>
            <p className="max-w-[52ch] text-lead text-pretty text-body">
              Play free games right in your browser — no downloads, no sign-up,
              just fun. Printable puzzles are on the way too!
            </p>
            <p className="max-w-[52ch] text-copy text-pretty text-body-mid">
              Well — it&apos;s mostly for adults to get a taster of what their
              kids could be potentially doing. Why not let your kids have a go.
            </p>
          </div>
        </section>

        {/* Games */}
        <section className="bg-canvas px-6 pb-16 pt-8">
          <div className="mx-auto grid max-w-[1280px] items-start gap-6 [grid-template-columns:repeat(auto-fill,minmax(280px,1fr))]">
            {GAMES.map((g) => (
              <div
                key={g.href}
                className="flex min-h-[208px] flex-col gap-3 rounded-ui bg-canvas-soft p-6 transition-transform duration-[140ms] ease-[ease] hover:-translate-y-0.5"
              >
                <span className="text-label font-medium uppercase text-body-mid">
                  {g.kind}
                </span>
                <span className="text-cardlg font-semibold text-ink">
                  {g.title}
                </span>
                <span className="text-copy text-pretty text-body">
                  {g.blurb}
                </span>
                <Link href={g.href} className={`${BTN_PRIMARY} mt-auto`}>
                  Play
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Printables — coming soon */}
        <section className="bg-canvas-soft px-6 py-16">
          <div className="mx-auto flex max-w-[1280px] flex-col items-start gap-4">
            <span className="rounded-pill bg-canvas px-3 py-1 text-nav text-ink">
              Coming soon
            </span>
            <h2 className="text-h2">Printable puzzles</h2>
            <p className="max-w-[48ch] text-lead text-body">
              Free word searches, mazes and colouring pages to print at home.
            </p>
          </div>
        </section>

        {/* Books CTA */}
        <section className="bg-ink px-6 py-16 text-on-primary">
          <div className="mx-auto flex max-w-[1280px] flex-col items-start gap-6">
            <h2 className="max-w-[30ch] text-h2 text-pretty text-on-primary">
              Liked the game? The books have hundreds more.
            </h2>
            <Link href="/#browse" className={BTN_PRIMARY}>
              Browse all books
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter variant="compact" />
    </>
  );
}
