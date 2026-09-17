import type { ReactNode } from "react";

/**
 * Composites a real iPhone 15 Pro Max frame PNG (transparent screen cutout)
 * over a screenshot, same technique as PhoneScrollDemo — just static, no
 * auto-scroll. The screenshot sits in its own layer *behind* the frame, so
 * the frame's bezel, dynamic island, and side buttons always render on top
 * of it, not the other way around.
 *
 * Cutout position/size (as % of the frame image's own 1530x3036 box) was
 * measured directly from the exported PNG's alpha channel: the screen hole
 * is an enclosed transparent region distinct from the transparent
 * background outside the phone body, isolated via flood-fill from a corner.
 * left=7.84% top=3.95% width=84.31% height=92.09%.
 *
 * Pass either `screenSrc` (a real screenshot) or `children` (a coded, fake
 * screen — e.g. StrideProblemSection's grayscale "generic app" mockup,
 * which has no real screenshot to show). By default the screen fills the
 * cutout edge-to-edge via `object-cover`, the same way every other phone
 * mockup on the site handles a screenshot that wasn't designed with a
 * device's exact safe-area padding baked in.
 *
 * `fit="contain"` is for a screenshot with real content close enough to its
 * own top/bottom edge that `cover` would sit the frame's dynamic island or
 * home-indicator curve right on top of it — it scales the screenshot to the
 * cutout's full width (never cropping or letterboxing left/right) and lets
 * height fall where it does, cropped by the cutout if it runs long.
 */
export function IPhoneMockup({
  screenSrc,
  screenAlt,
  children,
  fit = "cover",
  maxWidthPx = 300,
}: {
  screenSrc?: string;
  screenAlt?: string;
  children?: ReactNode;
  fit?: "cover" | "contain";
  /** Caps how wide the frame itself ever renders, independent of its
   * parent's width — was hardcoded to 300px (still the default here), which
   * silently capped DevelopmentSection's mockup at 300px however wide its
   * own wrapper grew. A plain Tailwind max-w-[Npx] class can't take this as
   * a prop (arbitrary values need to be static strings for Tailwind's JIT
   * scan), hence the inline style instead. */
  maxWidthPx?: number;
}) {
  return (
    <div className="relative mx-auto w-full" style={{ aspectRatio: "1530 / 3036", maxWidth: maxWidthPx }}>
      <div
        className={`absolute overflow-hidden ${fit === "contain" ? "bg-black" : ""}`}
        style={{ left: "7.84%", top: "3.95%", width: "84.31%", height: "92.09%" }}
      >
        {screenSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={screenSrc}
            alt={screenAlt ?? ""}
            className={fit === "contain" ? "h-auto w-full" : "h-full w-full object-cover"}
          />
        ) : (
          children
        )}
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/projects/stride/iphone-frame.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
      />
    </div>
  );
}
