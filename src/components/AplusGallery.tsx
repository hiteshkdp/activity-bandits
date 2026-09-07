import { getAplus } from "@/data/aplus";

/**
 * "More about this book" — the book's Amazon A+ content images (the author's own
 * brand content), hotlinked from Amazon's CDN. Renders nothing if the book has
 * no A+ images on file.
 */
export function AplusGallery({ slug }: { slug: string }) {
  const images = getAplus(slug);
  if (images.length === 0) return null;

  return (
    <section className="mt-14 border-t border-mute pt-10">
      <h2 className="mb-6 text-center text-cardlg font-semibold text-ink">
        More about this book
      </h2>
      <div className="mx-auto flex max-w-[680px] flex-col items-center gap-4">
        {images.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={src}
            alt=""
            loading="lazy"
            className="max-w-full rounded-img border border-mute"
          />
        ))}
      </div>
    </section>
  );
}
