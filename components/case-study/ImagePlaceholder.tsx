"use client";

import type { CSSProperties } from "react";
import { useTranslation } from "@/lib/i18n/ui";

/**
 * Stand-in for a screenshot the user hasn't provided yet: a green box
 * (deliberately loud, not styled to blend in) with the exact spec of what
 * needs to go there, so it's unmissable in the rendered page and easy to
 * swap for the real asset later.
 */
export function ImagePlaceholder({
  spec,
  className,
  style,
}: {
  spec: string;
  className?: string;
  style?: CSSProperties;
}) {
  const t = useTranslation();
  return (
    <div
      className={`flex aspect-[231/471] items-center justify-center rounded-xl border-2 border-dashed border-green-400 bg-green-500/20 p-3 text-center text-sm leading-relaxed text-green-100 ${className ?? (style ? "" : "w-full max-w-[180px]")}`}
      style={style}
      role="img"
      aria-label={t.caseStudy.screenshotPendingAria(spec)}
    >
      {t.caseStudy.screenshotPending(spec)}
    </div>
  );
}
