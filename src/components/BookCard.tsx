import Link from "next/link";
import type { Book } from "@/data/books";
import { coverUrl } from "@/lib/amazon";
import { bookMeta } from "@/lib/format";
import { BTN_PRIMARY, COVER_BOX, ParentsLoveFlag } from "@/components/ui";

/**
 * Catalogue tile: bordered cream-white card, contained cover, meta caption,
 * title, and a Buy button pinned to the bottom so every card in a row lines up.
 * The cover and the button both go straight to /go/<slug> (the marketplace
 * redirect) — the fewest taps from "saw it in a video" to "on Amazon". The
 * title links to the detail page for anyone who wants the full description.
 */
export function BookCard({ book }: { book: Book }) {
  const buyHref = `/go/${book.slug}`;

  return (
    <div className="flex flex-col gap-3 rounded-ui border border-mute bg-canvas p-6 transition-[background-color,color,border-color,transform] duration-[140ms] ease-[ease] hover:border-ink">
      <ParentsLoveFlag slug={book.slug} />
      <a href={buyHref} className="block" rel="nofollow">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={coverUrl(book)}
          alt={`${book.title} cover`}
          loading="lazy"
          className={COVER_BOX}
        />
      </a>
      <span className="text-caption text-body-mid">
        {bookMeta(book.category, book.ages)}
      </span>
      <Link
        href={`/book/${book.slug}`}
        className="text-cardsm font-bold text-ink text-pretty hover:underline"
      >
        {book.title}
      </Link>
      <a href={buyHref} className={`${BTN_PRIMARY} mt-auto`} rel="nofollow">
        Buy on Amazon
      </a>
    </div>
  );
}
