import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { MemoryMatch } from "@/components/games/MemoryMatch";

export const metadata: Metadata = {
  title: "Memory Match — Free Kids Game",
  description: "Flip the cards and match the pairs. A free memory game for kids.",
};

export default function MemoryPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-[40rem] flex-1 px-5 py-10">
        <Link href="/play" className="text-body-sm font-semibold text-muted hover:text-primary">
          ← All games
        </Link>
        <h1 className="mt-4 text-title-lg font-semibold text-ink">Memory Match</h1>
        <p className="mb-6 mt-1 text-body-md text-body">
          Flip two cards at a time and find all the matching pairs.
        </p>
        <MemoryMatch />
      </main>
      <SiteFooter />
    </>
  );
}
