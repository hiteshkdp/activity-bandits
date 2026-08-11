import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Quiz } from "@/components/games/Quiz";

export const metadata: Metadata = {
  title: "Kids Quiz — Free Trivia Game",
  description: "Fun multiple-choice trivia for kids. How many can you get right?",
};

export default function QuizPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-[40rem] flex-1 px-5 py-10">
        <Link href="/play" className="text-body-sm font-semibold text-muted hover:text-primary">
          ← All games
        </Link>
        <h1 className="mt-4 text-title-lg font-semibold text-ink">Kids Quiz</h1>
        <p className="mb-6 mt-1 text-body-md text-body">
          Pick the right answer for each question. How many can you get?
        </p>
        <Quiz />
      </main>
      <SiteFooter />
    </>
  );
}
