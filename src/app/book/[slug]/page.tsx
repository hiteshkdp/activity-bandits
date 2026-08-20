import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BOOKS, getBook } from "@/data/books";
import { coverUrl } from "@/lib/amazon";
import { Stars } from "@/components/Stars";
import { BookCard } from "@/components/BookCard";
import { AplusGallery } from "@/components/AplusGallery";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

/** Pre-render a static page for every book at build time. */
export function generateStaticParams() {
  return BOOKS.map((book) => ({ slug: book.slug }));
}

/** Per-book SEO + Open Graph so shared links unfurl with the cover. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) return {};

  const title = book.subtitle ? `${book.title}: ${book.subtitle}` : book.title;
  const cover = coverUrl(book);

  return {
    title: book.title,
    description: book.blurb,
    openGraph: {
      type: "book",
      title,
      description: book.blurb,
      images: [{ url: cover, alt: `${book.title} cover` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: book.blurb,
      images: [cover],
    },
  };
}

export default async function BookPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) notFound();

  // Forward TikTok UTM params (utm_source/utm_content/...) onto the buy link so
  // the redirect can attribute the conversion to the video that drove it.
  const sp = await searchParams;
  const forwarded = new URLSearchParams();
  for (const [key, value] of Object.entries(sp)) {
    if (key.startsWith("utm_") && typeof value === "string") {
      forwarded.set(key, value);
    }
  }
  const goHref = forwarded.toString()
    ? `/go/${book.slug}?${forwarded.toString()}`
    : `/go/${book.slug}`;

  const related = BOOKS.filter(
    (b) => b.category === book.category && b.slug !== book.slug,
  ).slice(0, 4);

  return (
    <>
      <SiteHeader />

      <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-8">
        <Link href="/" className="text-body-sm font-semibold text-muted hover:text-primary">
          ← All books
        </Link>

        <div className="mt-6 grid gap-8 sm:grid-cols-[minmax(0,18rem)_1fr] sm:items-start">
          {/* Cover */}
          <div className="flex aspect-[4/5] w-full max-w-[18rem] items-center justify-center overflow-hidden rounded-xl border border-hairline bg-surface-soft p-3 shadow-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={coverUrl(book)}
              alt={`${book.title} cover`}
              className="max-h-full max-w-full rounded object-contain shadow-sm"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-md bg-accent-soft px-2.5 py-1 text-caption font-bold text-ink">
                {book.category}
              </span>
              <span className="rounded-md border border-hairline px-2.5 py-1 text-caption font-bold text-muted">
                {book.ages}
              </span>
              <span className="rounded-md border border-hairline px-2.5 py-1 text-caption font-bold text-muted">
                Paperback
              </span>
            </div>

            <div>
              <h1 className="text-title-lg font-bold text-ink">{book.title}</h1>
              <p className="mt-1 text-body-sm text-muted">by {book.author}</p>
            </div>

            {book.rating ? <Stars rating={book.rating} /> : null}

            <p className="text-body-md leading-relaxed text-body">{book.blurb}</p>

            {/* Geo-aware buy button → /go/<slug> route handler */}
            <div className="mt-2">
              <a
                href={goHref}
                className="inline-flex items-center justify-center rounded-pill bg-primary px-7 py-3.5 text-button font-bold text-on-primary shadow-sm transition-colors hover:bg-primary-strong"
              >
                Buy on Amazon →
              </a>
              <p className="mt-2 text-caption text-muted">
                You&apos;ll be sent to your local Amazon store automatically.
              </p>
            </div>
          </div>
        </div>

        {/* A+ content from Amazon (the book's own brand content) */}
        <AplusGallery slug={book.slug} />

        {/* Related books */}
        {related.length > 0 && (
          <section className="mt-14">
            <h2 className="mb-4 text-title-md font-bold text-ink">
              More {book.category} books
            </h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-4">
              {related.map((b) => (
                <BookCard key={b.slug} book={b} />
              ))}
            </div>
          </section>
        )}
      </main>

      <SiteFooter />
    </>
  );
}
