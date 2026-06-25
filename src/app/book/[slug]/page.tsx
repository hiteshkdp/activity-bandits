import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BOOKS, getBook } from "@/data/books";
import { coverUrl } from "@/lib/amazon";
import { Stars } from "@/components/Stars";
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

  return (
    <>
      <SiteHeader />

      <main className="mx-auto w-full max-w-4xl flex-1 px-5 py-8">
        <Link
          href="/"
          className="text-body-sm text-muted hover:text-primary"
        >
          ← All books
        </Link>

        <div className="mt-6 grid gap-8 sm:grid-cols-[minmax(0,16rem)_1fr] sm:items-start">
          {/* Cover */}
          <div className="relative aspect-[2/3] w-full max-w-[16rem] overflow-hidden rounded-lg border border-hairline-on-dark bg-surface-elevated-dark">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={coverUrl(book)}
              alt={`${book.title} cover`}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-title-lg font-bold text-on-dark">
                {book.title}
              </h1>
              {book.subtitle && (
                <p className="mt-1 text-body-md text-muted-strong">
                  {book.subtitle}
                </p>
              )}
              <p className="mt-1 text-body-sm text-muted">by {book.author}</p>
            </div>

            {book.rating ? <Stars rating={book.rating} /> : null}

            <p className="text-body-md leading-relaxed text-body">
              {book.blurb}
            </p>

            {/* Geo-aware buy button → /go/<slug> route handler */}
            <div className="mt-2">
              <a
                href={goHref}
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-button font-bold text-on-primary transition-colors hover:bg-primary-active"
              >
                Buy on Amazon
              </a>
              <p className="mt-2 text-caption text-muted">
                You&apos;ll be sent to your local Amazon store automatically.
              </p>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
