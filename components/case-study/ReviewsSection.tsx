"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/case-study/SectionHeading";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" className={`h-3.5 w-3.5 ${i < rating ? "fill-accent" : "fill-white/15"}`}>
          <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6L1.3 7.7l6.1-.6L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

// Real app-store reviews, laid out as a CSS-columns masonry (cards of
// varying height settle into the shortest column instead of a fixed grid
// row) — closest match to how the source material presented this same set
// of reviews as loose, unevenly-sized note cards.
export function ReviewsSection({
  heading,
  subheading,
  reviews,
}: {
  heading: string;
  subheading?: string;
  reviews: { title: string; rating: number; date: string; author: string; body: string }[];
}) {
  return (
    <div className="flex h-full flex-1 flex-col">
      <SectionHeading heading={heading} subheading={subheading} />
      <div className="mt-title-to-content columns-1 gap-4 sm:columns-2 lg:columns-3">
        {reviews.map((review, i) => (
          <motion.div
            key={review.title + review.author}
            className="mb-4 break-inside-avoid rounded-card border border-border border-t-[var(--color-border-top-highlight)] bg-surface p-4 shadow-card backdrop-blur-card"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-40px" }}
            transition={{ duration: 0.4, delay: (i % 6) * 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-display text-body font-bold text-text-primary">{review.title}</p>
            <div className="mt-1.5 flex items-center gap-2">
              <Stars rating={review.rating} />
              <span className="text-label text-text-muted">
                {review.date} · {review.author}
              </span>
            </div>
            <p className="mt-2 text-body leading-relaxed text-text-secondary">{review.body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
