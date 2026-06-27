import { getBook } from "@/data/books";
import { HERO_COVER_SLUGS } from "@/data/featured";
import { coverUrl } from "@/lib/amazon";

/**
 * A fanned, overlapping collage of book covers for the hero. Covers rotate out
 * from the centre like a spread of books. Driven by HERO_COVER_SLUGS.
 */
export function HeroCovers() {
  const books = HERO_COVER_SLUGS.map(getBook).filter(
    (b): b is NonNullable<typeof b> => Boolean(b),
  );
  if (books.length === 0) return null;

  const mid = (books.length - 1) / 2;

  return (
    <div className="flex items-center justify-center py-4" aria-hidden>
      {books.map((b, i) => {
        const offset = i - mid;
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={b.slug}
            src={coverUrl(b)}
            alt=""
            loading="eager"
            className="h-44 w-auto rounded-lg object-contain shadow-[0_10px_30px_rgba(20,30,50,0.22)] transition-transform duration-300 hover:!rotate-0 hover:!translate-y-[-6px] sm:h-52 lg:h-60 -ml-8 first:ml-0 sm:-ml-10"
            style={{
              transform: `rotate(${offset * 7}deg) translateY(${Math.abs(offset) * 10}px)`,
              zIndex: 10 - Math.abs(offset),
            }}
          />
        );
      })}
    </div>
  );
}
