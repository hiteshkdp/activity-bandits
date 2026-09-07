import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BTN_PRIMARY } from "@/components/ui";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "We make books with one simple mission: fun. Colourful activity and puzzle books for kids, plus the Harry Kicker football story series.",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />

      <main className="flex-auto">
        {/* Hero */}
        <section className="bg-canvas px-6 pb-8 pt-16">
          <div className="mx-auto flex max-w-[760px] flex-col items-start gap-6">
            <p className="text-label font-medium uppercase text-ink">
              About us
            </p>
            <h1 className="max-w-[24ch] text-hero text-pretty">
              About Activity Bandits
            </h1>
            <p className="max-w-[34ch] text-[32px] font-normal leading-10 text-pretty text-ink">
              We make books with one simple mission: fun.
            </p>
          </div>
        </section>

        {/* Copy */}
        <section className="bg-canvas px-6 pb-16 pt-8">
          <div className="mx-auto flex max-w-[760px] flex-col gap-6 text-lead text-pretty text-body">
            <p>
              We reckon the best kids&apos; books are the ones children actually{" "}
              <em className="text-ink">want</em> to pick up — not because they
              have to, but because they can&apos;t help it. So that&apos;s what
              we make: colourful, endlessly interesting activity and puzzle
              books packed with mazes, word searches, colouring, games and
              stories to get stuck into.
            </p>
            <p>
              And for the football-mad ones, there&apos;s our{" "}
              <strong className="font-semibold text-ink">Harry Kicker</strong>{" "}
              series — fun little football stories for early readers, where
              every match sneaks in something worth knowing (teamwork, courage,
              a bit of honesty) without ever feeling like a lesson.
            </p>
            <p>
              No screens, no pressure, no “educational” small print that sucks
              the joy out of it. Just brilliant, down-to-earth fun that keeps
              kids busy and smiling — on road trips, rainy days, long flights,
              or any afternoon that needs saving.
            </p>
            <p>
              Because when a book is genuinely fun, everything else — the focus,
              the creativity, the quiet ten minutes for mum and dad — comes
              along for the ride.
            </p>
          </div>
        </section>

        {/* Series card */}
        <section className="bg-canvas-soft px-6 py-16">
          <div className="mx-auto grid max-w-[1280px] items-center gap-12 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
            <div className="flex flex-col items-start gap-6">
              <p className="text-label font-medium uppercase text-ink">
                4 books · Ages 5–7
              </p>
              <h2 className="text-h2 text-pretty">
                Harry Kicker — Football Story Series
              </h2>
              <p className="max-w-[44ch] text-lead text-body">
                A read-along football adventure series for ages 5–7 — teamwork,
                courage and honesty, one match at a time.
              </p>
              <Link href="/#series" className={BTN_PRIMARY}>
                See the series
              </Link>
            </div>
            <div className="flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/covers/bravery-in-the-big-game.jpg"
                alt="Bravery In The Big Game cover"
                loading="lazy"
                className="w-[min(300px,100%)] rounded-ui"
              />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter variant="compact" />
    </>
  );
}
