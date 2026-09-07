import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { GameShell } from "@/components/games/GameShell";
import { WouldYouRatherFootball } from "@/components/games/WouldYouRatherFootball";

export const metadata: Metadata = {
  title: "Would You Rather? Football — Free Kids Game",
  description:
    "Five tricky football choices — which would you pick? A free would-you-rather game for kids, with no wrong answers.",
};

export default function WouldYouRatherFootballPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-auto flex-col">
        <GameShell
          kicker="Choices · Free game"
          title="Would You Rather? Football"
          lead="Five tricky football choices — which would you pick? No wrong answers."
          width="mid"
        >
          <WouldYouRatherFootball />
        </GameShell>
      </main>
      <SiteFooter variant="compact" />
    </>
  );
}
