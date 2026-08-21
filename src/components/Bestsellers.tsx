import { getBook } from "@/data/books";
import { TOP_SELLER_SLUGS } from "@/data/featured";
import { BookCard } from "@/components/BookCard";

/** Flat illustration of a girl reading, for the bestsellers band. */
function GirlReading() {
  return (
    <svg viewBox="0 0 150 170" className="w-32 lg:w-44" role="img" aria-label="A girl reading a book">
      <path d="M42 130c0-22 15-34 33-34s33 12 33 34v30H42z" fill="#3f7fc4" />
      <circle cx="75" cy="66" r="29" fill="#e8b48c" />
      <path d="M46 62c0-19 13-31 29-31s29 12 29 31c0 0-8-10-29-10s-29 10-29 10z" fill="#e0742f" />
      <path d="M104 50c10 4 15 15 11 26-3 9-10 10-13 6" fill="#e0742f" />
      <circle cx="65" cy="68" r="3" fill="#2e2019" />
      <circle cx="85" cy="68" r="3" fill="#2e2019" />
      <circle cx="58" cy="78" r="5" fill="#e8785f" opacity=".45" />
      <circle cx="92" cy="78" r="5" fill="#e8785f" opacity=".45" />
      <path d="M67 80q8 6 16 0" stroke="#2e2019" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M30 124c14-6 30-6 45 3 15-9 31-9 45-3v34c-14-6-30-6-45 3-15-9-31-9-45-3z" fill="#3f9e6a" />
      <path d="M75 127v34" stroke="#2b7a50" strokeWidth="3.5" />
    </svg>
  );
}

export function Bestsellers() {
  const books = TOP_SELLER_SLUGS.map(getBook).filter(
    (b): b is NonNullable<typeof b> => Boolean(b),
  );
  if (books.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-[#d9f2f5]">
      <div className="mx-auto max-w-[80rem] px-5 pb-12 pt-6">
        <h2 className="mb-6 text-center text-title-lg font-bold text-ink">
          Bestsellers
        </h2>
        <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:max-w-[68%]">
          {books.map((b) => (
            <BookCard key={b.slug} book={b} />
          ))}
        </div>
      </div>
      {/* Reader illustration (desktop only) */}
      <div className="pointer-events-none absolute bottom-0 right-6 hidden lg:block">
        <GirlReading />
      </div>
    </section>
  );
}
