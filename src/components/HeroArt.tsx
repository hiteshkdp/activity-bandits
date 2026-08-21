/**
 * Decorative hero artwork. Swap the image below (files live in /public/decor).
 */
export function HeroArt() {
  return (
    <div className="flex justify-center" aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/decor/would-you-rather-interior.svg"
        alt=""
        className="w-52 max-w-full rounded-lg border border-hairline bg-white shadow-md sm:w-64 lg:w-72"
      />
    </div>
  );
}
