"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BOOKS, getBook, type Book } from "@/data/books";
import {
  FEATURED_SLUG,
  TOP_SELLER_SLUGS,
  SERIES_SLUGS,
  HERO_COVER_SLUGS,
  CATEGORY_TILES,
  FILTERS,
  PARENTS_LOVE_IT,
  matchesFilter,
} from "@/data/featured";
import { coverUrl } from "@/lib/amazon";
import { bookMeta, categoryLabel } from "@/lib/format";
import { BookCard } from "@/components/BookCard";
import { HeroCanvas } from "@/components/home/HeroCanvas";
import {
  Eyebrow,
  Badge,
  Label,
  BTN_PRIMARY,
  BTN_PRIMARY_TIGHT,
  BTN_OUTLINE_TIGHT,
  BTN_OUTLINE_ON_INK_TIGHT,
  COVER_BOX,
} from "@/components/ui";

const byTitle = (a: Book, b: Book) => a.title.localeCompare(b.title);
const pick = (slugs: string[]) =>
  slugs.map(getBook).filter((b): b is Book => Boolean(b));

/**
 * Clears the sticky nav (67px on mobile, 76px on desktop) so an anchored
 * section lands just below it instead of under it. Respected by both native
 * hash jumps and scrollIntoView.
 */
const ANCHOR_OFFSET = "scroll-mt-[68px] sm:scroll-mt-[78px]";

/** Explicit column per hero cover, so captions can be paired to them. */
const COVER_COL = ["col-start-1", "col-start-2", "col-start-3"];

/** Hero caption text: small and centred under its cover on mobile, the
 *  design's 15px fixed-width label from `sm`. */
const CAP_TEXT =
  "w-full flex-none text-center text-[13px] font-semibold leading-[1.25] text-pretty text-ink sm:text-[15px] sm:leading-[1.3] sm:tracking-[-0.374px]";

/** The hand-drawn arrows only make sense in the diagonal `sm` layout. */
const CAP_ARROW = "hidden w-10 flex-none sm:block";

export function Home() {
  const [filter, setFilter] = useState("All");

  const catalogue = useMemo(() => [...BOOKS].sort(byTitle), []);
  const visible = useMemo(
    () => catalogue.filter((b) => matchesFilter(b, filter)),
    [catalogue, filter],
  );

  const featured = getBook(FEATURED_SLUG);
  const topSellers = pick(TOP_SELLER_SLUGS);
  const series = pick(SERIES_SLUGS);
  const heroCovers = pick(HERO_COVER_SLUGS);

  /** Set the catalogue filter in place, then bring the grid into view. */
  const applyFilter = (next: string) => {
    setFilter(next);
    requestAnimationFrame(() => {
      document
        .getElementById("browse")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <main>
      {/* 1 — Hero */}
      <section
        id="top"
        className="relative overflow-hidden bg-hero-white px-6 py-16"
      >
        <HeroCanvas />
        <div className="relative z-[1] mx-auto grid max-w-[1280px] items-center gap-12 [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]">
          <div className="flex flex-col items-start gap-6">
            <Eyebrow>Activity books for kids</Eyebrow>
            <h1 className="text-hero text-pretty">
              Books that keep curious kids busy.
            </h1>
            <p className="max-w-[38ch] text-lead text-pretty text-body">
              Fun activity &amp; puzzle books for kids — tap any cover to grab
              it from your local Amazon store.
            </p>
            {/* Kept side by side on phones via the tight button variants. */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <a href="#browse" className={BTN_PRIMARY_TIGHT}>
                Browse all books
              </a>
              <Link href="/play" className={BTN_OUTLINE_TIGHT}>
                Play a free game
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge>Ages 3–12</Badge>
              <Badge>Ships from your local Amazon</Badge>
            </div>
          </div>

          {/* Covers with hand-drawn arrow captions.
              Placement is explicit per breakpoint. On mobile each caption sits
              directly under its own cover (row 2), centred and arrow-less — the
              design's fixed caption widths (84/165/140px plus a 40px arrow) are
              far wider than a ~103px phone column, so the diagonal layout bled
              across neighbours and labelled the wrong books. From `sm` the
              designed placement returns: captions above covers 1 and 3, below
              cover 2, with the arrows back. */}
          <div className="grid items-start gap-x-4 gap-y-2 [grid-template-columns:repeat(3,minmax(0,1fr))] sm:items-end">
            {heroCovers.map((b, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={b.slug}
                src={coverUrl(b)}
                alt={`${b.title} cover`}
                loading="eager"
                className={`${COVER_COL[i]} row-start-1 h-[170px] w-full rounded-img object-contain sm:row-start-2 sm:h-[320px]`}
              />
            ))}

            {/* Cover 1 — Airplane */}
            <div className="col-start-1 row-start-2 flex w-full items-end justify-center gap-0.5 sm:row-start-1 sm:w-max sm:justify-start sm:justify-self-start">
              <span className={`${CAP_TEXT} sm:w-[84px] sm:text-left`}>
                Perfect for travel.
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/art/arrow.png"
                alt=""
                className={`${CAP_ARROW} -mb-2 [transform:scale(-1,-1)]`}
              />
            </div>

            {/* Cover 2 — Football Word Search */}
            <div className="col-start-2 row-start-2 flex w-full items-start justify-center gap-0.5 sm:row-start-3 sm:w-max sm:justify-start sm:justify-self-start">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/art/arrow-up.png"
                alt=""
                className={`${CAP_ARROW} -mt-1.5`}
              />
              <span className={`${CAP_TEXT} sm:w-[140px] sm:text-left`}>
                Perfect for football mad kids
              </span>
            </div>

            {/* Cover 3 — Would You Rather */}
            <div className="col-start-3 row-start-2 flex w-full items-end justify-center gap-0.5 sm:row-start-1 sm:w-max sm:justify-end sm:justify-self-end">
              <span className={`${CAP_TEXT} sm:w-[165px] sm:text-right`}>
                Sparks great discussion and laughter.
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/art/arrow-up.png"
                alt=""
                className={`${CAP_ARROW} -mb-2 [transform:scale(-1,-1)]`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2 — Featured book */}
      {featured && (
        <section className="bg-ink px-6 py-16 text-on-primary">
          <div className="mx-auto grid max-w-[1280px] items-center gap-12 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
            <div className="flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={coverUrl(featured)}
                alt={`${featured.title} cover`}
                loading="lazy"
                className="aspect-[3/4] w-[min(340px,100%)] rounded-ui object-contain"
              />
            </div>
            <div className="flex flex-col items-start gap-6">
              <Eyebrow>Most popular · Ages 4–8</Eyebrow>
              <h2 className="text-h2 text-pretty text-on-primary">
                {featured.title}
              </h2>
              <p className="max-w-[44ch] text-lead text-pretty text-canvas-soft">
                {featured.blurb}
              </p>
              {/* Side by side on phones: tight variants, and flex-1 so the
                  pair splits the row evenly rather than wrapping. */}
              <div className="flex w-full flex-wrap gap-2 sm:gap-3">
                <a
                  href={`/go/${featured.slug}`}
                  className={`${BTN_PRIMARY_TIGHT} flex-1 sm:flex-none`}
                >
                  Buy on Amazon
                </a>
                <button
                  type="button"
                  onClick={() => applyFilter("Travel")}
                  className={`${BTN_OUTLINE_ON_INK_TIGHT} flex-1 cursor-pointer sm:flex-none`}
                >
                  See all travel books
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3 — Popular categories */}
      <section
        id="categories"
        className={`${ANCHOR_OFFSET} bg-canvas-soft px-6 py-16`}
      >
        <div className="mx-auto flex max-w-[1280px] flex-col gap-6">
          <Eyebrow>Popular categories</Eyebrow>
          <h2 className="text-h2">Pick a theme.</h2>
          <div className="grid items-end gap-4 [grid-template-columns:repeat(auto-fit,minmax(112px,1fr))]">
            {CATEGORY_TILES.map((tile) => (
              <div
                key={tile.label}
                className="flex flex-col items-stretch gap-2.5"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={tile.art}
                  alt={tile.alt}
                  loading="lazy"
                  className="h-24 w-full object-contain object-bottom"
                />
                <button
                  type="button"
                  onClick={() => applyFilter(tile.filter)}
                  className="flex min-h-9 items-center justify-center rounded-ui border border-ink bg-canvas px-4 py-[7px] text-nav font-semibold text-ink transition-[background-color,color,border-color,transform] duration-[140ms] ease-[ease] hover:bg-ink hover:text-on-primary"
                >
                  {tile.label}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — Top sellers */}
      <section
        id="top-sellers"
        className={`${ANCHOR_OFFSET} bg-canvas px-6 py-16`}
      >
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-8 flex flex-wrap items-baseline justify-between gap-6">
            <div className="flex flex-col gap-3">
              <Eyebrow>Top sellers</Eyebrow>
              <h2 className="text-h2">The ones everyone asks about.</h2>
            </div>
            <a
              href="#browse"
              className="text-btn font-semibold text-ink underline"
            >
              See all books
            </a>
          </div>
          <div className="grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(240px,1fr))]">
            {topSellers.map((b) => (
              <div
                key={b.slug}
                className="flex flex-col gap-4 rounded-ui bg-canvas-soft p-6 transition-transform duration-[140ms] ease-[ease] hover:-translate-y-0.5"
              >
                {PARENTS_LOVE_IT.includes(b.slug) && (
                  <span className="w-fit rounded-pill bg-accent-green px-3 py-1 text-eyebrow font-semibold uppercase text-white">
                    Parents love it
                  </span>
                )}
                <a href={`/go/${b.slug}`} className="block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={coverUrl(b)}
                    alt={`${b.title} cover`}
                    loading="lazy"
                    className={COVER_BOX}
                  />
                </a>
                <span className="text-caption text-body-mid">
                  {bookMeta(b.category, b.ages)}
                </span>
                <Link
                  href={`/book/${b.slug}`}
                  className="text-cardlg font-semibold text-pretty text-ink hover:underline"
                >
                  {b.title}
                </Link>
                <a
                  href={`/go/${b.slug}`}
                  className={`${BTN_PRIMARY} mt-auto`}
                >
                  Buy on Amazon
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — Harry Kicker series */}
      <section
        id="series"
        className={`${ANCHOR_OFFSET} bg-canvas-soft px-6 py-16`}
      >
        <div className="mx-auto flex max-w-[1280px] flex-col gap-8">
          <div className="grid items-center gap-12 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
            <div className="flex flex-col items-start gap-6">
              <Eyebrow>4 books · Ages 5–7</Eyebrow>
              <h2 className="text-h2 text-pretty">
                Harry Kicker — Football Story Series
              </h2>
              <p className="max-w-[44ch] text-lead text-pretty text-body">
                A read-along football adventure series for ages 5–7 — teamwork,
                courage and honesty, one match at a time.
              </p>
            </div>
            <div className="flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/covers/bravery-in-the-big-game.jpg"
                alt="Bravery In The Big Game cover"
                loading="lazy"
                className="aspect-[3/4] w-[min(300px,100%)] rounded-ui object-contain"
              />
            </div>
          </div>
          <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
            {series.map((b, i) => (
              <div
                key={b.slug}
                className="flex min-h-[200px] flex-col gap-4 rounded-ui bg-ink p-6 text-on-primary transition-transform duration-[140ms] ease-[ease] hover:-translate-y-0.5"
              >
                <a href={`/go/${b.slug}`} className="block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={coverUrl(b)}
                    alt={`${b.title} cover`}
                    loading="lazy"
                    className="h-[240px] w-full rounded-img object-contain object-center"
                  />
                </a>
                <Label className="!text-mute">Book {i + 1}</Label>
                <Link
                  href={`/book/${b.slug}`}
                  className="text-cardlg font-semibold text-pretty text-on-primary hover:underline"
                >
                  {b.title}
                </Link>
                <a
                  href={`/go/${b.slug}`}
                  className={`${BTN_PRIMARY} mt-auto`}
                >
                  Buy on Amazon
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — Why */}
      <section className="bg-canvas px-6 py-16">
        <div className="mx-auto grid max-w-[1280px] gap-6 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          {[
            {
              art: "/art/screen-free.png",
              alt: "",
              w: "w-[38px]",
              title: "Screen-free fun",
              copy: "Mazes, puzzles and colouring — not another screen.",
            },
            {
              art: "/art/amazon-mark.png",
              alt: "Amazon",
              w: "w-[34px] rounded-logo",
              title: "Your local Amazon",
              copy: "Tap buy and you're sent to your country's store.",
            },
            {
              art: "/art/families.png",
              alt: "",
              w: "w-[42px]",
              title: "Loved by families",
              copy: "Fun, affordable activity books for ages 3–12.",
            },
          ].map((p) => (
            <div
              key={p.title}
              className="flex flex-col gap-3 rounded-ui bg-canvas-soft p-6 transition-transform duration-[140ms] ease-[ease] hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-2.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.art}
                  alt={p.alt}
                  loading="lazy"
                  className={`h-[38px] flex-none object-contain ${p.w}`}
                />
                <h3 className="text-cardlg font-semibold">{p.title}</h3>
              </div>
              <p className="text-copy text-body">{p.copy}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7 — All books */}
      <section
        id="browse"
        className={`${ANCHOR_OFFSET} bg-canvas-soft px-6 py-16`}
      >
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-4">
            <Eyebrow>All books</Eyebrow>
          </div>
          <h2 className="mb-3 text-h2">Every book, right here.</h2>
          <p className="mb-2 text-copy text-body">
            Pick a theme, then tap to buy.
          </p>
          <p className="mb-6 text-nav text-body-mid">
            Authors: Activity Bandits · Harry Kicker · AT Publishing
          </p>

          <div className="mb-8 flex flex-wrap gap-2">
            {FILTERS.map((f) => {
              const active = f === filter;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  aria-pressed={active}
                  className={`min-h-12 cursor-pointer rounded-ui border border-ink px-4 py-3 text-chip font-bold transition-[background-color,color,border-color,transform] duration-[140ms] ease-[ease] ${
                    active
                      ? "bg-ink text-on-primary"
                      : "bg-canvas text-ink hover:bg-ink hover:text-on-primary"
                  }`}
                >
                  {categoryLabel(f)}
                </button>
              );
            })}
          </div>

          <div className="grid items-stretch gap-4 [grid-template-columns:repeat(auto-fill,minmax(240px,1fr))]">
            {visible.map((b) => (
              <BookCard key={b.slug} book={b} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
