"use client";

import { useEffect, useRef } from "react";
import { animate, type AnimationPlaybackControls } from "framer-motion";
import { heroScrollState, HERO_EXIT_MARGIN } from "@/components/heroScrollState";

/**
 * Section-to-section scroll snap for everything AFTER Hero's own pinned
 * zone — Projects and Contact. Renders nothing; it only attaches a window
 * `wheel` listener (desktop trackpad/mouse only — see the note on touch
 * below).
 *
 * This deliberately does NOT reuse case study's ScrollMain: that component
 * drives `scrollTop` on a custom `overflow-y-scroll` container, but Hero's
 * pinned-zone math (see Hero.tsx / heroScrollState.ts) is built entirely on
 * top of the plain document/window scroll — swapping the landing page to a
 * custom scroll container would break every one of those calculations.
 * Instead this operates on `window.scrollY` directly, the same axis Hero
 * already uses, and the two systems split ownership of it by scroll
 * position: Hero owns `[0, heroScrollState.range]`, this owns everything
 * past that (see the `isPastHero` check below — Hero has the mirror-image
 * guard in its own `goToStop`). Because both sides read the exact same
 * `heroScrollState.range` number, there's no risk of the two disagreeing
 * about where the handoff line is, regardless of which of their two
 * independent `wheel` listeners happens to run first on a given event.
 *
 * Touch is intentionally left alone (no touchmove interception), matching
 * ScrollMain's own choice for the case study pages: on touch devices,
 * scrolling past Hero is plain native scroll, no snap. Hero's own pinned
 * zone still has its own touch handling for the zoom-through effect —
 * unaffected, since that's scoped to its own zone by the same guard.
 */

// Same eased-jump feel as case study's ScrollMain, for visual consistency
// between the two snap systems on the site.
const SECTION_DURATION = 0.55;
const SECTION_EASE = [0.65, 0, 0.35, 1] as const;
// Same +0.5s buffer (not +0.3s) as ScrollMain, and for the same reason: a
// still-decelerating trackpad gesture's momentum tail needs room to fully
// die down before the lock lifts, or it immediately re-triggers a second,
// unintended jump right as the first one finishes.
const SECTION_LOCK_MS = (SECTION_DURATION + 0.5) * 1000;

// How close to a tall section's own top/bottom edge (in px) counts as
// "already there" for handing off to the next/previous stop, vs. still
// having native scroll room left inside it. Mirrors ScrollMain's constant.
const EDGE_TOLERANCE = 4;
// Mirrors ScrollMain's own threshold: a trackpad gesture *starts* with
// several small-but-not-tiny deltas before it ramps up, and those shouldn't
// each be capable of firing a full section jump on their own — only the
// deliberate part of the gesture should. Without this, the homepage felt
// noticeably twitchier than the case study pages for the same light flick.
const JUMP_THRESHOLD = 12;

function getSectionTops() {
  const ids = ["projects", "contact"];
  return ids
    .map((id) => document.getElementById(id))
    .filter((el): el is HTMLElement => el !== null)
    .map((el) => ({
      top: el.getBoundingClientRect().top + window.scrollY,
      height: el.offsetHeight,
    }));
}

export function HomeScrollSnap() {
  const lockedRef = useRef(false);
  const lockTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animRef = useRef<AnimationPlaybackControls | null>(null);

  useEffect(() => {
    function jumpTo(target: number) {
      const from = window.scrollY;
      if (Math.abs(target - from) < 1) return;

      lockedRef.current = true;
      animRef.current?.stop();
      animRef.current = animate(from, target, {
        duration: SECTION_DURATION,
        ease: SECTION_EASE,
        onUpdate: (v) => {
          window.scrollTo(0, v);
        },
      });

      if (lockTimeoutRef.current) clearTimeout(lockTimeoutRef.current);
      // A real timer, not requestAnimationFrame, so the lock still
      // releases (and lands exactly on target) even if the tab is
      // backgrounded and rAF gets paused mid-animation.
      lockTimeoutRef.current = setTimeout(() => {
        animRef.current?.stop();
        window.scrollTo(0, target);
        lockedRef.current = false;
      }, SECTION_LOCK_MS);
    }

    function handleWheel(event: WheelEvent) {
      const y = window.scrollY;
      const isPastHero = y > heroScrollState.range + HERO_EXIT_MARGIN;
      if (!isPastHero) {
        // Still inside (or right at the edge of) Hero's own pinned zone —
        // that system owns this event entirely; don't touch it, don't even
        // preventDefault.
        return;
      }

      // Trackpads fire many small-delta events per gesture; always swallow
      // these once we're the ones in control, regardless of lock state, so
      // their momentum tail never drifts scroll away from a snapped stop.
      if (Math.abs(event.deltaY) < 2) {
        event.preventDefault();
        return;
      }

      if (lockedRef.current) {
        event.preventDefault();
        return;
      }

      const sections = getSectionTops();
      if (sections.length === 0) return;

      // -1 means `y` is past Hero's own zone but hasn't reached the first
      // tracked section's top yet (Hero's tall box can taper off past
      // `range` before the next section's real DOM position — see
      // HomeScrollSnap's file comment). Treat that stretch as "no current
      // section" rather than defaulting to index 0, so the tall-section
      // edge math below never runs against a section we haven't reached.
      let currentIndex = -1;
      for (let i = 0; i < sections.length; i++) {
        if (sections[i].top <= y + 2) currentIndex = i;
      }
      const current = currentIndex >= 0 ? sections[currentIndex] : null;
      const viewportHeight = window.innerHeight;
      const isTall = current !== null && current.height > viewportHeight + EDGE_TOLERANCE;

      if (isTall && current) {
        // A section taller than one viewport: let native scroll handle its
        // interior, and only take over once the user has scrolled it all
        // the way to an edge (same pattern as ScrollMain's tall-section
        // handling for step-guide).
        const sectionBottom = current.top + current.height;
        const remainingDown = sectionBottom - viewportHeight - y;
        const remainingUp = y - current.top;
        if (event.deltaY > 0 && remainingDown > Math.max(EDGE_TOLERANCE, event.deltaY)) return;
        if (event.deltaY < 0 && remainingUp > Math.max(EDGE_TOLERANCE, -event.deltaY)) return;
      }

      // Past the interior-scroll cutout above, every remaining case is a
      // candidate section jump — gate it on real intent rather than firing
      // on the first non-trivial-but-still-small delta a trackpad gesture
      // happens to open with. Still prevents default so a sub-threshold
      // tick doesn't leak into native scroll and drift the page between
      // sections on its own.
      if (Math.abs(event.deltaY) < JUMP_THRESHOLD) {
        event.preventDefault();
        return;
      }

      if (event.deltaY > 0) {
        const next = sections.find((s) => s.top > y + 2);
        if (!next) {
          // Already at (or past) the last section — let scroll continue
          // natively into the footer rather than trapping it here.
          return;
        }
        event.preventDefault();
        jumpTo(next.top);
        return;
      }

      const previous = sections.filter((s) => s.top < y - 2);
      if (previous.length === 0) {
        // Back at the first snap section's own top — hand off to Hero,
        // whose own guard will pick this event up from here.
        return;
      }
      event.preventDefault();
      jumpTo(previous[previous.length - 1].top);
    }

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (lockTimeoutRef.current) clearTimeout(lockTimeoutRef.current);
      animRef.current?.stop();
    };
  }, []);

  return null;
}
