import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { GameShell } from "@/components/games/GameShell";
import { Quiz } from "@/components/games/Quiz";

export const metadata: Metadata = {
  title: "Kids Quiz — Free Trivia Game",
  description:
    "Ten multiple-choice trivia questions for kids — football, animals, space and more. Free to play in the browser, no downloads and no sign-up.",
};

export default function QuizPage() {
  return (
    <>
      <SiteHeader />
      <GameShell
        kicker="Trivia · Free game"
        title="Kids Quiz"
        lead="Ten quick questions — pick an answer and see how many you get right."
        width="narrow"
      >
        <Quiz />
      </GameShell>
      <SiteFooter variant="compact" />
    </>
  );
}
