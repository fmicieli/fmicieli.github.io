/**
 * Decorative accent-colored outline that traces the card's own border on
 * hover — starts fully hidden and draws itself in one continuous stroke
 * (clockwise from the rect's top-left corner) rather than just fading in.
 * `pathLength="1"` (a native SVG attribute, not a Tailwind/framer thing)
 * normalizes the rect's total perimeter to 1 unit regardless of its actual
 * pixel size, so `stroke-dasharray`/`stroke-dashoffset` can work in a plain
 * 0-1 range instead of needing the perimeter measured in JS. Driven by the
 * parent's Tailwind `group` class (CSS `:hover`, not framer's `whileHover`)
 * because this SVG sits `pointer-events-none` on top of the real card, so
 * it can never receive hover events itself — the ancestor has to.
 * Requires the parent to have both `group` and `relative` in its className.
 */
export function HoverBorderTrace() {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        rx="12"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="2.5"
        pathLength="1"
        strokeDasharray="1"
        className="opacity-0 [stroke-dashoffset:1] transition-[stroke-dashoffset,opacity] duration-700 ease-out group-hover:opacity-100 group-hover:[stroke-dashoffset:0]"
      />
    </svg>
  );
}
