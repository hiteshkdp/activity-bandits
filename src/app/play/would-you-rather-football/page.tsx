import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WouldYouRatherFootball } from "@/components/games/WouldYouRatherFootball";

export const metadata: Metadata = {
  title: "Would You Rather? Football — Free Kids Game",
  description:
    "Fun football would-you-rather questions for kids. Pick A or B — there are no wrong answers!",
};

export default function WouldYouRatherFootballPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-[40rem] flex-1 px-5 py-10">
        <Link href="/play" className="text-body-sm font-semibold text-muted hover:text-primary">
          ← All games
        </Link>
        <h1 className="mt-4 text-title-lg font-semibold text-ink">
          Would You Rather? Football
        </h1>
        <p className="mb-6 mt-1 text-body-md text-body">
          Five tricky football choices — pick your favourite. There are no wrong
          answers, just fun!
        </p>
        <WouldYouRatherFootball />
      </main>
      <SiteFooter />
    </>
  );
}
