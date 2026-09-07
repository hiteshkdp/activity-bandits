import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { GameShell } from "@/components/games/GameShell";
import { WordSearch } from "@/components/games/WordSearch";
import { FOOTBALL_WORDS, FOOTBALL_WORDSEARCH_BOOK } from "@/data/games";

export const metadata: Metadata = {
  title: "Football Word Search — Free Kids Game",
  description:
    "A free football word search for kids — tap the first letter, then the last, and find all ten hidden words.",
};

export default function WordSearchPage() {
  return (
    <>
      <SiteHeader />
      <GameShell
        kicker="Word game · Free game"
        title="Football Word Search"
        lead="Find the hidden football words. Tap the first letter, then the last."
        width="wide"
      >
        <WordSearch
          words={FOOTBALL_WORDS}
          size={12}
          bookSlug={FOOTBALL_WORDSEARCH_BOOK}
        />
      </GameShell>
      <SiteFooter variant="compact" />
    </>
  );
}
