import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `About ${SITE.authorName}.`,
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-[44rem] flex-1 px-5 py-12">
        <h1 className="text-display-sm font-bold text-ink sm:text-display-md">
          About {SITE.authorName}
        </h1>
        <div className="mt-6 space-y-4 text-body-md leading-relaxed text-body">
          <p className="text-title-sm font-semibold text-ink">
            We make books with one simple mission: fun.
          </p>
          <p>
            We reckon the best kids&apos; books are the ones children actually{" "}
            <em>want</em> to pick up — not because they have to, but because they
            can&apos;t help it. So that&apos;s what we make: colourful, endlessly
            interesting activity and puzzle books packed with mazes, word searches,
            colouring, games and stories to get stuck into.
          </p>
          <p>
            And for the football-mad ones, there&apos;s our{" "}
            <strong className="font-semibold text-ink">Harry Kicker</strong> series
            — fun little football stories for early readers, where every match sneaks
            in something worth knowing (teamwork, courage, a bit of honesty) without
            ever feeling like a lesson.
          </p>
          <p>
            No screens, no pressure, no &ldquo;educational&rdquo; small print that
            sucks the joy out of it. Just brilliant, down-to-earth fun that keeps
            kids busy and smiling — on road trips, rainy days, long flights, or any
            afternoon that needs saving.
          </p>
          <p>
            Because when a book is genuinely fun, everything else — the focus, the
            creativity, the quiet ten minutes for mum and dad — comes along for the
            ride.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
