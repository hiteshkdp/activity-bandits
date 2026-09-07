import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { GuessTheFootballer } from "@/components/games/GuessTheFootballer";

export const metadata: Metadata = {
  title: "Guess the Footballer — Free Kids Game",
  description:
    "Three clues, one famous footballer. Can you guess all 10? A free football guessing game for kids.",
};

export default function GuessTheFootballerPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-[40rem] flex-1 px-5 py-10">
        <Link href="/play" className="text-body-sm font-semibold text-muted hover:text-primary">
          ← All games
        </Link>
        <h1 className="mt-4 text-title-lg font-semibold text-ink">
          Guess the Footballer
        </h1>
        <p className="mb-6 mt-1 text-body-md text-body">
          Read the clues, then pick the famous player. Stuck? Reveal another
          clue. Can you name all 10?
        </p>
        <GuessTheFootballer />
      </main>
      <SiteFooter />
    </>
  );
}
