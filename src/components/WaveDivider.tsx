/**
 * A wavy section divider. `bg` is the colour of the section above; `fill` is the
 * colour of the section below (it "rises" into the section above as a wave).
 */
export function WaveDivider({ bg, fill }: { bg: string; fill: string }) {
  return (
    <div style={{ background: bg, lineHeight: 0 }} aria-hidden>
      <svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        className="block h-6 w-full sm:h-9"
      >
        <path
          d="M0 26c140 30 290 30 440 8s300-36 450-12 310 30 310 30V60H0z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
