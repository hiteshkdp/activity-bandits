import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SlidingPuzzle } from "@/components/games/SlidingPuzzle";

export const metadata: Metadata = {
  title: "Sliding Puzzle — Free Kids Game",
  description: "Slide the tiles to unscramble the picture. A free sliding puzzle for kids.",
};

export default function SlidingPuzzlePage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-[40rem] flex-1 px-5 py-10">
        <Link href="/play" className="text-body-sm font-semibold text-muted hover:text-primary">
          ← All games
        </Link>
        <h1 className="mt-4 text-title-lg font-semibold text-ink">Sliding Puzzle</h1>
        <p className="mb-6 mt-1 text-body-md text-body">
          Tap a tile next to the empty space to slide it. Put the picture back
          together!
        </p>
        <SlidingPuzzle />
      </main>
      <SiteFooter />
    </>
  );
}
