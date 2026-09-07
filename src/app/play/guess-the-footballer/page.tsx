import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { GameShell } from "@/components/games/GameShell";
import { GuessTheFootballer } from "@/components/games/GuessTheFootballer";

export const metadata: Metadata = {
  title: "Guess the Footballer — Free Kids Game",
  description:
    "Three clues, one famous player — can you name them all? A free football guessing game for kids, right in your browser.",
};

export default function GuessTheFootballerPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-auto flex-col">
        <GameShell
          kicker="Guessing game · Free game"
          title="Guess the Footballer"
          lead="Three clues, one famous player — can you name them all?"
          width="narrow"
        >
          <GuessTheFootballer />
        </GameShell>
      </main>
      <SiteFooter variant="compact" />
    </>
  );
}
