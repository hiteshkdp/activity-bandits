import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { GameShell } from "@/components/games/GameShell";
import { MemoryMatch } from "@/components/games/MemoryMatch";

export const metadata: Metadata = {
  title: "Memory Match — Free Kids Game",
  description:
    "Flip the cards and match the pairs of book covers. A free memory game for kids — plays in the browser, no downloads and no sign-up.",
};

export default function MemoryPage() {
  return (
    <>
      <SiteHeader />
      <GameShell
        kicker="Memory game · Free game"
        title="Memory Match"
        lead="Flip the cards and match the pairs of book covers."
        width="mid"
      >
        <MemoryMatch />
      </GameShell>
      <SiteFooter variant="compact" />
    </>
  );
}
