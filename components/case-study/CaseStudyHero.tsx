"use client";

import { motion } from "framer-motion";
import type { CaseStudyImage, CaseStudyMeta } from "@/data/projects";
import { IPhoneMockup } from "@/components/case-study/IPhoneMockup";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, margin: "-40px" },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export function CaseStudyHero({
  title,
  subtitle,
  meta,
  tags,
  images,
  video,
  watermark,
  mockupRadius = "3.25rem",
  deviceFrame = false,
}: {
  title: string;
  subtitle: string;
  meta: CaseStudyMeta[];
  tags: string[];
  images?: CaseStudyImage[];
  video?: { src: string; alt: string };
  /** Decorative brand-mark background, per project — omitted entirely
   * (rather than defaulting to any one project's mark) when not passed. */
  watermark?: { src: string; alt: string };
  /** Corner radius of the video/image frame on the right. Defaults to a
   * radius tuned to match a real phone's own bezel curve (BBVA's video) —
   * override per project when the visual is a plain screenshot instead of a
   * phone mockup (e.g. Tribu Music's flat app screenshot wants a much
   * smaller, ordinary card radius, not a phone-shaped one). */
  mockupRadius?: string;
  /** Composites a single image behind a real iPhone frame PNG (see
   * IPhoneMockup) instead of just a rounded-corner crop — for a raw
   * screenshot that isn't already framed. Defaults to false so BBVA's video
   * and Tribu's flat screenshot render exactly as before; opt in per
   * project. Ignored for `video`, which already reads as device chrome on
   * its own. */
  deviceFrame?: boolean;
}) {
  const text = (
    <div className="text-left">
      <motion.ul {...fadeUp(0)} className="flex flex-wrap items-center gap-2">
        {tags.map((tag) => (
          <li key={tag} className="rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-text-primary">
            {tag}
          </li>
        ))}
      </motion.ul>
      {/* gap: 16px * 1.5. size: 30px * 1.15, 36px * 1.15 */}
      <motion.h1 {...fadeUp(0.1)} className="mt-6 font-display text-[35px] font-semibold sm:text-[41px]">
        {title}
      </motion.h1>
      {/* gap: 12px * 1.5. size: 16px * 1.15 */}
      <motion.p {...fadeUp(0.2)} className="mt-[18px] max-w-xl text-[18px] leading-relaxed text-text-secondary">
        {subtitle}
      </motion.p>

      {!video && images && images.length > 1 && (
        <div className="mt-12 flex items-end gap-3 sm:gap-4">
          {images.map((image, i) => {
            const isCenter = i === Math.floor((images.length - 1) / 2);
            return (
              <motion.img
                key={image.src}
                src={image.src}
                alt={image.alt}
                initial={{ opacity: 0, y: 24, scale: 0.95 }}
                whileInView={{ opacity: isCenter ? 1 : 0.9, y: 0, scale: 1 }}
                viewport={{ once: false, margin: "-40px" }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`w-24 rounded-2xl border border-border shadow-xl shadow-black/30 sm:w-36 ${
                  isCenter ? "z-10 w-28 sm:w-44" : "mb-3 sm:mb-4"
                }`}
              />
            );
          })}
        </div>
      )}

      <motion.div
        {...fadeUp(!video && images && images.length > 1 ? 0.3 + images.length * 0.1 : 0.3)}
        className="mt-8 flex flex-wrap gap-x-8 gap-y-3"
      >
        {meta.map((item) => (
          <div key={item.label} className="flex flex-col items-start gap-1">
            <p className="text-sm text-text-secondary">{item.label}</p>
            <p className="font-display text-lg font-semibold text-text-primary">{item.value}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );

  // A single hero image behaves exactly like the video case (BBVA's
  // treatment): a phone-framed visual to the right of the left-aligned
  // text, not the small stacked-mockups strip below the text used when
  // there's more than one image.
  const singleImage = !video && images && images.length === 1 ? images[0] : undefined;

  const useDeviceFrame = deviceFrame && singleImage && !video;

  const visual = video ? (
    <video
      src={video.src}
      aria-label={video.alt}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      className="h-auto w-full"
    />
  ) : singleImage && !useDeviceFrame ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={singleImage.src} alt={singleImage.alt} className="h-auto w-full" />
  ) : useDeviceFrame && singleImage ? (
    <IPhoneMockup screenSrc={singleImage.src} screenAlt={singleImage.alt} />
  ) : null;

  const mockup = useDeviceFrame ? (
    visual
  ) : (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, margin: "-40px" }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={{ borderRadius: mockupRadius }}
      className="mx-auto w-full max-w-[300px] overflow-hidden border border-border shadow-xl shadow-black/30"
    >
      {visual}
    </motion.div>
  );

  const content = visual ? (
    <div className="grid items-center gap-10 sm:grid-cols-2">
      {text}
      {useDeviceFrame ? (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {mockup}
        </motion.div>
      ) : (
        mockup
      )}
    </div>
  ) : (
    text
  );

  return (
    <div className="relative">
      {/* Brand watermark, sitting behind the title/copy/video — decorative
          only, so it's hidden from assistive tech and never intercepts
          clicks. Per-project (passed in via `watermark`), not hardcoded to
          any single case study's mark. */}
      {watermark && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={watermark.src}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 w-[60%] -translate-x-1/2 -translate-y-1/2 opacity-5"
        />
      )}
      <div className="relative">{content}</div>
    </div>
  );
}
