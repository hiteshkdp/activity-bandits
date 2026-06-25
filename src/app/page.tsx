import { BOOKS } from "@/data/books";
import { BookCard } from "@/components/BookCard";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SITE } from "@/config/site";

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main className="mx-auto w-full max-w-4xl flex-1 px-5">
        {/* Hero */}
        <section className="py-10 sm:py-14">
          <h1 className="text-display-sm font-bold tracking-tight text-on-dark sm:text-display-md">
            {SITE.authorName}
          </h1>
          <p className="mt-3 max-w-[34rem] text-body-md text-muted">
            {SITE.tagline}
          </p>
        </section>

        {/* Book grid */}
        <section className="pb-12">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {BOOKS.map((book) => (
              <BookCard key={book.slug} book={book} />
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
