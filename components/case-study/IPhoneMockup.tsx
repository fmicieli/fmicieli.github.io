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
 */
export function IPhoneMockup({ screenSrc, screenAlt }: { screenSrc: string; screenAlt: string }) {
  return (
    <div className="relative mx-auto w-full max-w-[300px]" style={{ aspectRatio: "1530 / 3036" }}>
      <div
        className="absolute overflow-hidden"
        style={{ left: "7.84%", top: "3.95%", width: "84.31%", height: "92.09%" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={screenSrc} alt={screenAlt} className="h-full w-full object-cover" />
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
