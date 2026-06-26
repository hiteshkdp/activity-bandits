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
          <p>
            {/* TODO: Replace with your real brand story. */}
            {SITE.authorName} makes fun, screen-free activity books that keep kids
            busy, curious and entertained — at home, on holiday, and everywhere in
            between. From football and travel to puzzles and animals, every book is
            packed with mazes, word searches, colouring and games kids actually want
            to do.
          </p>
          <p>
            This is placeholder copy — tell me your story (how the brand started,
            who&apos;s behind it, what you care about) and I&apos;ll drop it in.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
