"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Logo3D } from "@/components/Logo3D";
import { AboutCards } from "@/components/AboutCards";
import { heroScrollState, HERO_EXIT_MARGIN } from "@/components/heroScrollState";
import { useTranslation } from "@/lib/i18n/ui";

const TRANSITION_HEIGHT_VH = 220;

// The hero's zoom-through always takes this long, no matter how the user
// triggered it (a light wheel tick, a hard swipe, or the CTA button) — the
// transition's pace is fixed, never scrubbed by raw scroll speed.
const TRANSITION_DURATION = 1100;

// The pinned hero reserves this much space below the header (header height +
// a 24px gap) so its content never runs behind the header at any point in
// the scroll, not just at rest.
const HEADER_GAP = 24;


export function Hero() {
  const t = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsWrapperRef = useRef<HTMLDivElement>(null);

  // Manually measure how many pixels of scroll the pinned transition spans
  // (container height minus the sticky viewport) and drive progress from
  // plain window scrollY against that range. More robust than Framer's
  // target+offset intersection measurement, which can end up stale if the
  // section's height shifts after web fonts finish loading.
  const [scrollRange, setScrollRange] = useState(1);
  const [headerClearance, setHeaderClearance] = useState(0);
  // Null until first measured (client-only) — the sticky box falls back to
  // the plain `calc(100vh - headerClearance)` string below in that window,
  // identical to what it always rendered, so there's no hydration mismatch
  // or 0-height flash before this resolves.
  const [stickyHeight, setStickyHeight] = useState<number | null>(null);
  // The plain viewport-only height — unlike `stickyHeight` above, this never
  // grows to fit the (possibly much taller, stacked-column) cards content.
  // The hero's own screen (glow, logo, heading/button, scroll hint) is
  // pinned to this instead of the grown sticky box: those elements were
  // centering themselves inside the *entire* grown box when they shared its
  // height, landing far off the actual visible viewport once mobile's
  // single-column cards made that box much taller than one screen.
  const [viewportHeight, setViewportHeight] = useState<number | null>(null);
  useEffect(() => {
    function measure() {
      if (!containerRef.current) return;
      const headerHeight = document.querySelector("header")?.offsetHeight ?? 0;
      const clearance = headerHeight + HEADER_GAP;
      setHeaderClearance(clearance);
      const viewportStickyHeight = window.innerHeight - clearance;
      setViewportHeight(viewportStickyHeight);
      // On mobile the cards now stack in a single column instead of a 2x2
      // grid (see AboutCards' StackedGrid), often taller than one viewport
      // once the heading above them is included — scrollHeight reports
      // that true content height even while overflow-hidden is clipping it
      // down to the sticky box's own height, so this doesn't need to
      // temporarily lift the clip to get an honest measurement. Growing
      // the sticky box to match means the pinned zone's height actually
      // adjusts to fit its content instead of cutting off the last card.
      const contentHeight = cardsWrapperRef.current?.scrollHeight ?? 0;
      const nextStickyHeight = Math.max(viewportStickyHeight, contentHeight);
      setStickyHeight(nextStickyHeight);
      const range = Math.max(containerRef.current.offsetHeight - nextStickyHeight, 1);
      setScrollRange(range);
      // Published for HomeScrollSnap (app/page.tsx's section-snap system) —
      // see heroScrollState.ts for why this is shared instead of
      // re-derived.
      heroScrollState.range = range;
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollY } = useScroll();
  const scrollYProgress = useTransform(scrollY, [0, scrollRange], [0, 1]);

  // Shared auto-scroll machinery: window.scrollY is only ever moved by this
  // controlled, fixed-duration animation while inside the hero's pinned
  // zone — never scrubbed directly by the user's raw scroll/touch input —
  // so the visual transition always plays at the same pace.
  const scrollRangeRef = useRef(scrollRange);
  useEffect(() => {
    scrollRangeRef.current = scrollRange;
  }, [scrollRange]);

  const rafRef = useRef<number | undefined>(undefined);
  const isAutoScrollingRef = useRef(false);

  const animateScrollTo = useCallback((target: number, duration = TRANSITION_DURATION) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const start = window.scrollY;
    const distance = target - start;
    if (distance === 0) return;
    const startTime = performance.now();
    isAutoScrollingRef.current = true;

    function step(now: number) {
      const t = Math.min((now - startTime) / duration, 1);
      // ease-in-out: gentle start and finish, constant felt speed in the
      // middle — reads as one deliberate motion regardless of trigger.
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      window.scrollTo(0, start + distance * eased);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        isAutoScrollingRef.current = false;
      }
    }
    rafRef.current = requestAnimationFrame(step);
  }, []);

  // The pinned zone has two snap stops — top and the end (cards fully
  // settled under the text) — one scroll/touch gesture (or CTA click) goes
  // straight from top to fully revealed, no intermediate half-risen stop
  // along the way.
  const goToStop = useCallback(
    (direction: "down" | "up") => {
      const range = scrollRangeRef.current;
      const y = window.scrollY;
      // Once scroll has moved meaningfully past the pinned zone — e.g. the
      // page-level HomeScrollSnap system has taken over and animated past
      // it, or the user jumped there some other way (scrollbar, keyboard)
      // — this hero-local stepper must stay out of the way entirely. It
      // only ever owns scroll positions inside its own zone; anything past
      // `range` belongs to whatever comes after Hero.
      if (y > range + HERO_EXIT_MARGIN) return false;
      const stops = [0, range];
      if (direction === "down") {
        const next = stops.find((stop) => stop > y + 1);
        if (next === undefined) return false;
        animateScrollTo(next);
        return true;
      }
      const previousStops = stops.filter((stop) => stop < y - 1);
      if (previousStops.length === 0) return false;
      animateScrollTo(previousStops[previousStops.length - 1]);
      return true;
    },
    [animateScrollTo]
  );

  // Scrolling inside the hero's pinned zone always plays the *same*
  // fixed-duration transition, no matter how fast/slow/far the actual
  // gesture was: the very first wheel/touch tick decides a direction and
  // hands off entirely to the animation, and every further raw input is
  // swallowed until it finishes. Outside the zone (already past the hero,
  // or above the page top), input passes through untouched.
  useEffect(() => {
    function tryTrigger(direction: "down" | "up") {
      if (isAutoScrollingRef.current) return true;
      return goToStop(direction);
    }

    function handleWheel(event: WheelEvent) {
      if (tryTrigger(event.deltaY > 0 ? "down" : "up")) {
        event.preventDefault();
      }
    }

    let touchStartY = 0;
    function handleTouchStart(event: TouchEvent) {
      touchStartY = event.touches[0]?.clientY ?? 0;
    }
    function handleTouchMove(event: TouchEvent) {
      if (isAutoScrollingRef.current) {
        event.preventDefault();
        return;
      }
      const currentY = event.touches[0]?.clientY ?? touchStartY;
      const deltaY = touchStartY - currentY;
      if (Math.abs(deltaY) < 8) return;
      if (tryTrigger(deltaY > 0 ? "down" : "up")) {
        event.preventDefault();
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [goToStop]);

  // Fallback for input that doesn't fire wheel/touch events — keyboard
  // paging, scrollbar dragging: if one of those leaves scrollY between two
  // stops, snap to the nearer one in the direction of travel, at the same
  // fixed pace.
  useEffect(() => {
    let debounceId: ReturnType<typeof setTimeout> | undefined;
    let lastY = window.scrollY;
    let direction: "down" | "up" = "down";

    function settle() {
      if (isAutoScrollingRef.current) return;
      const y = window.scrollY;
      const range = scrollRangeRef.current;
      if (y <= 0 || y >= range) return;
      const stops = [0, range];
      if (stops.some((stop) => Math.abs(stop - y) < 1)) return;
      goToStop(direction);
    }

    function handleScroll() {
      if (isAutoScrollingRef.current) return;
      const y = window.scrollY;
      if (y > lastY) direction = "down";
      else if (y < lastY) direction = "up";
      lastY = y;
      clearTimeout(debounceId);
      debounceId = setTimeout(settle, 40);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(debounceId);
    };
  }, [goToStop]);

  // "View more" behaves exactly like one scroll gesture — advances to the
  // next stop, not straight to the end.
  function handleCtaClick() {
    goToStop("down");
  }

  // The glow itself no longer tracks the cursor (it used to, via a spring
  // eased template on these same values) — it reads as a fixed, static
  // bloom at this default position now. rawX/rawY and the spring stay,
  // since the 3D logo's cursor-driven tilt below still depends on them.
  const rawX = useMotionValue(75);
  const rawY = useMotionValue(30);
  const glowX = useSpring(rawX, { stiffness: 60, damping: 20 });
  const glowY = useSpring(rawY, { stiffness: 60, damping: 20 });
  // rgba(255,154,196,...) = --color-accent (#ff9ac4), matching the static
  // position rawX/rawY start at (75%, 30%).
  const glowBackground = "radial-gradient(circle at 75% 30%, rgba(255,154,196,0.35), transparent 55%)";

  // Cursor-driven tilt for the 3D logo: whichever side the pointer is nearer
  // to dips back slightly (like pressing down on that edge), on top of the
  // scroll-driven rotation — a subtle "it's a real object" cue.
  const logoTiltY = useTransform(glowX, [0, 100], [-8, 8]);
  const logoTiltX = useTransform(glowY, [0, 100], [8, -8]);

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    rawX.set(((event.clientX - rect.left) / rect.width) * 100);
    rawY.set(((event.clientY - rect.top) / rect.height) * 100);
  }

  // The shape swells toward the viewer (a "zoom through" pass), getting
  // bolder as it grows, then fading once it's "passed" — tumbling in 3D with
  // a light sweeping across its face along the way.
  const shapeScale = useTransform(scrollYProgress, [0, 0.7], [1, 18]);
  const shapeOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.45, 0.7],
    [0.5, 0.95, 0.95, 0]
  );
  const shapeRotateY = useTransform(scrollYProgress, [0, 0.35, 0.7], [0, -22, 34]);
  const shapeRotateX = useTransform(scrollYProgress, [0, 0.35, 0.7], [0, 12, -18]);
  const shapeShine = useTransform(scrollYProgress, [0.05, 0.55], [-20, 120]);

  // Hero copy fades out early...
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, -60]);

  // "Scroll to explore" is only useful before the user has actually
  // scrolled — gone as soon as the first scroll gesture starts moving
  // things, well before it reaches the mid checkpoint.
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  // ...then, once the shape has substantially passed through and faded, the
  // testimonials heading + cards take over the same pinned screen — cards
  // get their own 0-1 slice of this to drive their stack-to-row spread.
  const revealProgress = useTransform(scrollYProgress, [0.55, 1], [0, 1]);
  const headingOpacity = useTransform(revealProgress, [0, 0.25], [0, 1]);
  const headingY = useTransform(revealProgress, [0, 0.25], [30, 0]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative"
      style={{ height: `${TRANSITION_HEIGHT_VH}vh` }}
    >
      <div
        className="sticky overflow-hidden px-page-x"
        style={{ top: headerClearance, height: stickyHeight ?? `calc(100vh - ${headerClearance}px)` }}
        onMouseMove={handleMouseMove}
      >
        {/* Pinned to the plain viewport height (never the grown
            content-aware `stickyHeight` above) so the glow/logo/hero text
            stay centered on the actual visible screen regardless of how
            tall the cards below make the outer sticky box. */}
        <div
          className="absolute inset-x-0 top-0"
          style={{ height: viewportHeight ?? `calc(100vh - ${headerClearance}px)` }}
        >
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: glowBackground }}
          />

          <Logo3D
            scale={shapeScale}
            opacity={shapeOpacity}
            rotateX={shapeRotateX}
            rotateY={shapeRotateY}
            shine={shapeShine}
            tiltX={logoTiltX}
            tiltY={logoTiltY}
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center px-page-x text-center">
            <motion.div
              style={{ opacity: heroOpacity, y: heroY, willChange: "opacity, transform" }}
              className="relative max-w-3xl"
            >
              <p className="mb-2 text-sm uppercase tracking-[0.2em] text-text-secondary">
                Florencia Micieli
              </p>
              <h1 className="whitespace-nowrap font-display text-xl font-semibold leading-tight sm:text-4xl lg:text-6xl">
                {t.hero.role}
              </h1>
              <button
                type="button"
                onClick={handleCtaClick}
                className="mt-5 inline-flex h-9 items-center justify-center rounded-control bg-text-primary px-5 text-[14px] font-medium text-bg transition hover:scale-[1.03] hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
              >
                {t.hero.viewMore}
              </button>
            </motion.div>
          </div>

          <motion.p
            style={{ opacity: scrollHintOpacity }}
            className="pointer-events-none absolute bottom-4 left-3 text-sm text-text-secondary sm:left-4"
          >
            {t.hero.scrollHint}
          </motion.p>
        </div>

        {/* Heading sits directly above the cards with a fixed 48px gap, and
            the whole group is vertically centered as one block within the
            pinned viewport once settled — not bottom-anchored, which left
            all the leftover space stacked above it instead of split evenly.
            Ref used to measure this group's true content height (see the
            sticky box's own height above) so the pinned zone grows to fit
            it instead of clipping the last card via this same
            overflow-hidden once mobile's stack is taller than one screen. */}
        <div
          ref={cardsWrapperRef}
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-6 overflow-hidden px-page-x text-center"
        >
          <motion.div
            style={{ opacity: headingOpacity, y: headingY, willChange: "opacity, transform" }}
            className="relative mx-auto max-w-2xl"
          >
            <h2 className="font-display text-3xl font-semibold text-text-primary sm:text-4xl">{t.hero.aboutHeading}</h2>
            <p className="mt-2 leading-relaxed text-text-secondary">{t.hero.aboutText}</p>
          </motion.div>

          <div className="relative w-full">
            <AboutCards progress={revealProgress} />
          </div>
        </div>
      </div>
    </section>
  );
}
