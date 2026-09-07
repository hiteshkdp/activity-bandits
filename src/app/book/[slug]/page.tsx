import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BOOKS, getBook } from "@/data/books";
import { coverUrl } from "@/lib/amazon";
import { BookCard } from "@/components/BookCard";
import { AplusGallery } from "@/components/AplusGallery";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Badge, BTN_PRIMARY } from "@/components/ui";

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

/** "More puzzle books" / "More travel books" — matches the design's wording. */
function relatedHeading(category: string): string {
  const word =
    category === "Puzzles and Words" ? "puzzle" : category.toLowerCase();
  return `More ${word} books`;
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

  // Forward TikTok UTM params onto the buy link so the redirect can attribute
  // the conversion to the video that drove it.
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

      <main className="flex-auto">
        <section className="bg-canvas px-6 pb-16 pt-12">
          <div className="mx-auto max-w-[1280px]">
            <Link
              href="/#browse"
              className="text-nav text-body hover:underline"
            >
              ← All books
            </Link>

            <div className="mt-6 grid items-start gap-12 [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]">
              {/* Cover panel */}
              <div className="flex justify-center rounded-ui bg-canvas-soft p-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={coverUrl(book)}
                  alt={`${book.title} cover`}
                  loading="eager"
                  className="aspect-[3/4] w-[min(360px,100%)] rounded-img object-contain"
                />
              </div>

              {/* Details */}
              <div className="flex flex-col items-start gap-5">
                <div className="flex flex-wrap gap-2">
                  <Badge>{book.category}</Badge>
                  <Badge>{book.ages}</Badge>
                  <Badge>Paperback</Badge>
                </div>

                <h1 className="text-h2 text-pretty">{book.title}</h1>
                <p className="text-nav text-body-mid">by {book.author}</p>
                <p className="max-w-[48ch] text-lead text-pretty text-body">
                  {book.blurb}
                </p>

                <a href={goHref} className={BTN_PRIMARY}>
                  Buy on Amazon
                </a>
                <p className="text-caption text-body-mid">
                  You&apos;ll be sent to your local Amazon store automatically.
                </p>

                {book.features && book.features.length > 0 && (
                  <div className="flex w-full flex-col gap-3 border-t border-mute pt-5">
                    <span className="text-label font-medium uppercase text-ink">
                      What&apos;s inside
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {book.features.map((f) => (
                        <span
                          key={f}
                          className="rounded-pill border border-mute bg-canvas px-3 py-1 text-nav text-body"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* The book's own Amazon A+ brand content, when we have it */}
            <AplusGallery slug={book.slug} />
          </div>
        </section>

        {/* More like this */}
        {related.length > 0 && (
          <section className="bg-canvas-soft px-6 py-16">
            <div className="mx-auto max-w-[1280px]">
              <p className="mb-3 text-label font-medium uppercase text-ink">
                More like this
              </p>
              <h2 className="mb-8 text-h2">{relatedHeading(book.category)}</h2>
              <div className="grid items-stretch gap-4 [grid-template-columns:repeat(auto-fill,minmax(240px,1fr))]">
                {related.map((b) => (
                  <BookCard key={b.slug} book={b} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <SiteFooter variant="compact" />
    </>
  );
}
