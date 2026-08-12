import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WordSearch } from "@/components/games/WordSearch";
import { FOOTBALL_WORDS, FOOTBALL_WORDSEARCH_BOOK } from "@/data/games";

export const metadata: Metadata = {
  title: "Football Word Search — Free Kids Game",
  description:
    "A free football word search for kids — find the hidden words, then grab the full book of puzzles.",
};

export default function WordSearchPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-[40rem] flex-1 px-5 py-10">
        <Link
          href="/play"
          className="text-body-sm font-semibold text-muted hover:text-primary"
        >
          ← All games
        </Link>
        <h1 className="mt-4 text-title-lg font-semibold text-ink">
          Football Word Search
        </h1>
        <p className="mb-6 mt-1 text-body-md text-body">
          Drag across the letters to find all the hidden football words!
        </p>
        <WordSearch
          words={FOOTBALL_WORDS}
          size={10}
          bookSlug={FOOTBALL_WORDSEARCH_BOOK}
        />
      </main>
      <SiteFooter />
    </>
  );
}
