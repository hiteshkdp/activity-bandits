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
  BTN_OUTLINE,
  BTN_OUTLINE_ON_INK,
  COVER_BOX,
} from "@/components/ui";

const byTitle = (a: Book, b: Book) => a.title.localeCompare(b.title);
const pick = (slugs: string[]) =>
  slugs.map(getBook).filter((b): b is Book => Boolean(b));

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
            <div className="flex flex-wrap gap-3">
              <a href="#browse" className={BTN_PRIMARY}>
                Browse all books
              </a>
              <Link href="/play" className={BTN_OUTLINE}>
                Play a free game
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge>Ages 3–12</Badge>
              <Badge>Ships from your local Amazon</Badge>
            </div>
          </div>

          {/* Covers with hand-drawn arrow captions.
              The captions use the design's fixed widths (84/165/140px + a 40px
              arrow), which are wider than a grid column below ~640px — they'd
              bleed across neighbouring covers and point at the wrong book. So
              they only appear from `sm` up, where the columns are wide enough. */}
          <div className="grid items-end gap-x-4 gap-y-2 [grid-template-columns:repeat(3,minmax(0,1fr))]">
            <div className="col-start-1 hidden w-max items-end gap-0.5 justify-self-start sm:flex">
              <span className="w-[84px] flex-none text-[15px] font-semibold leading-[1.3] tracking-[-0.374px] text-pretty text-ink">
                Perfect for travel.
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/art/arrow.png"
                alt=""
                className="-mb-2 w-10 flex-none [transform:scale(-1,-1)]"
              />
            </div>
            <div className="col-start-3 hidden w-max items-end justify-end gap-0.5 justify-self-end sm:flex">
              <span className="w-[165px] flex-none text-right text-[15px] font-semibold leading-[1.3] tracking-[-0.374px] text-pretty text-ink">
                Sparks great discussion and laughter.
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/art/arrow-up.png"
                alt=""
                className="-mb-2 w-10 flex-none [transform:scale(-1,-1)]"
              />
            </div>

            {heroCovers.map((b) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={b.slug}
                src={coverUrl(b)}
                alt={`${b.title} cover`}
                loading="eager"
                className="h-[170px] w-full rounded-img object-contain sm:h-[320px]"
              />
            ))}

            <div className="col-start-2 hidden w-max items-start gap-0.5 justify-self-start sm:flex">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/art/arrow-up.png"
                alt=""
                className="-mt-1.5 w-10 flex-none"
              />
              <span className="w-[140px] flex-none text-[15px] font-semibold leading-[1.3] tracking-[-0.374px] text-pretty text-ink">
                Perfect for football mad kids
              </span>
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
                className="w-[min(340px,100%)] rounded-ui"
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
              <div className="flex flex-wrap gap-3">
                <a href={`/go/${featured.slug}`} className={BTN_PRIMARY}>
                  Buy on Amazon
                </a>
                <button
                  type="button"
                  onClick={() => applyFilter("Travel")}
                  className={BTN_OUTLINE_ON_INK}
                >
                  See all travel books
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3 — Popular categories */}
      <section id="categories" className="bg-canvas-soft px-6 py-16">
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
      <section id="top-sellers" className="bg-canvas px-6 py-16">
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
      <section id="series" className="bg-canvas-soft px-6 py-16">
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
                className="w-[min(300px,100%)] rounded-ui"
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
        className="scroll-mt-20 bg-canvas-soft px-6 py-16"
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
