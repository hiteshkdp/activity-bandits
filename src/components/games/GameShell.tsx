import type { ReactNode } from "react";
import Link from "next/link";
import { getBook } from "@/data/books";
import { coverUrl } from "@/lib/amazon";
import { BTN_PRIMARY } from "@/components/ui";

const WIDTHS = {
  narrow: "max-w-[760px]",
  mid: "max-w-[860px]",
  wide: "max-w-[1100px]",
} as const;

/**
 * Shared chrome for every game page: back link, uppercase kicker, h1, lead,
 * then the game surface. Nav/footer come from the route.
 */
export function GameShell({
  kicker,
  title,
  lead,
  width = "mid",
  children,
}: {
  kicker: string;
  title: string;
  lead: string;
  width?: keyof typeof WIDTHS;
  children: ReactNode;
}) {
  return (
    <section className="flex-auto px-6 pb-16 pt-12">
      <div className={`mx-auto flex flex-col gap-6 ${WIDTHS[width]}`}>
        <Link href="/play" className="text-nav text-body hover:underline">
          ← Free fun
        </Link>
        <p className="text-label font-medium uppercase text-ink">{kicker}</p>
        <h1 className="text-gameh1">{title}</h1>
        <p className="text-lead text-body">{lead}</p>
        {children}
      </div>
    </section>
  );
}

/**
 * End-of-game ink card: the pitch for the matching book, a Buy button that goes
 * through /go/<slug>, and a "Play again" outline button.
 */
export function CrossSell({
  heading,
  blurb,
  slug,
  showCover = false,
  onRestart,
}: {
  heading: string;
  blurb: string;
  slug: string;
  showCover?: boolean;
  onRestart: () => void;
}) {
  const book = getBook(slug);

  return (
    <div className="flex flex-col items-start gap-5 rounded-ui bg-ink p-8 text-on-primary sm:flex-row sm:items-center">
      {showCover && book && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={coverUrl(book)}
          alt={`${book.title} cover`}
          loading="lazy"
          className="h-[200px] w-auto flex-none rounded-img object-contain"
        />
      )}
      <div className="flex flex-col items-start gap-5">
        <h3 className="text-cardlg font-semibold text-on-primary">{heading}</h3>
        <p className="text-copy text-canvas-soft">{blurb}</p>
        <div className="flex flex-wrap gap-3">
          <a href={`/go/${slug}`} className={BTN_PRIMARY}>
            Buy on Amazon
          </a>
          <button
            type="button"
            onClick={onRestart}
            className="inline-flex cursor-pointer items-center justify-center rounded-ui border border-canvas-soft bg-transparent px-6 py-3 text-btn font-semibold text-on-primary transition-[background-color,color,border-color,transform] duration-[140ms] ease-[ease] hover:bg-ink-soft"
          >
            Play again
          </button>
        </div>
      </div>
    </div>
  );
}
