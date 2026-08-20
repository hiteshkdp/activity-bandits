const PROPS = [
  {
    emoji: "🎨",
    title: "Screen-free fun",
    desc: "Mazes, puzzles and colouring — not another screen.",
    color: "#14b3c2",
  },
  {
    emoji: "🌍",
    title: "Your local Amazon",
    desc: "Tap buy and you're sent to your country's store.",
    color: "#f97316",
  },
  {
    emoji: "⭐",
    title: "Loved by families",
    desc: "Fun, affordable activity books for ages 3–12.",
    color: "#fbc02d",
  },
];

/** A LEGO-style trust/feature strip: 3 icon + text value props. */
export function ValueProps() {
  return (
    <section className="border-b border-hairline bg-canvas">
      <div className="mx-auto grid max-w-[88rem] gap-6 px-5 py-8 sm:grid-cols-3">
        {PROPS.map((p) => (
          <div key={p.title} className="flex items-center gap-3.5">
            <span
              className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-pill text-2xl"
              style={{ backgroundColor: `${p.color}22` }}
              aria-hidden
            >
              {p.emoji}
            </span>
            <div>
              <p className="text-title-sm font-bold text-ink">{p.title}</p>
              <p className="text-body-sm text-body">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
