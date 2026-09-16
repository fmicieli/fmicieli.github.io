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
 * which has no real screenshot to show).
 *
 * `insetColors`: our screenshots weren't designed with a real dynamic-island
 * exclusion zone, so laid edge-to-edge in the cutout, the frame's dynamic
 * island silhouette and home-indicator curve sit right on top of real
 * content (a greeting, a nav label). Passing this adds a solid-color strip
 * above and below the screen instead — matching the screenshot's own top/
 * bottom background — so the whole screenshot shows uncropped, shifted
 * clear of both, like a real device screenshot's safe-area padding.
 */
export function IPhoneMockup({
  screenSrc,
  screenAlt,
  children,
  insetColors,
}: {
  screenSrc?: string;
  screenAlt?: string;
  children?: ReactNode;
  insetColors?: { top: string; bottom: string };
}) {
  return (
    <div className="relative mx-auto w-full max-w-[300px]" style={{ aspectRatio: "1530 / 3036" }}>
      <div
        className="absolute overflow-hidden"
        style={{ left: "7.84%", top: "3.95%", width: "84.31%", height: "92.09%" }}
      >
        {insetColors ? (
          <div className="flex h-full w-full flex-col">
            {/* Clears the dynamic island */}
            <div className="shrink-0" style={{ height: "6%", backgroundColor: insetColors.top }} />
            <div className="min-h-0 flex-1" style={{ backgroundColor: insetColors.top }}>
              {screenSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={screenSrc} alt={screenAlt ?? ""} className="h-full w-full object-contain" />
              ) : (
                children
              )}
            </div>
            {/* Clears the home-indicator curve */}
            <div className="shrink-0" style={{ height: "4%", backgroundColor: insetColors.bottom }} />
          </div>
        ) : screenSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={screenSrc} alt={screenAlt ?? ""} className="h-full w-full object-cover" />
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
