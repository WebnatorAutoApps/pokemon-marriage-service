"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export type AnimationDirection = "up" | "down" | "left" | "right" | "none";
export type AnimationEasing =
  | "ease"
  | "ease-in"
  | "ease-out"
  | "ease-in-out"
  | "linear";

export interface ScrollAnimationOptions {
  /** How far the element travels during animation (px). Default: 30 */
  distance?: number;
  /** Animation duration in ms. Default: 600 */
  duration?: number;
  /** Direction the element slides in from. Default: "up" */
  direction?: AnimationDirection;
  /** CSS easing function. Default: "ease-out" */
  easing?: AnimationEasing;
  /** IntersectionObserver threshold (0-1). Default: 0.1 */
  threshold?: number;
  /** Delay before animation starts (ms). Default: 0 */
  delay?: number;
  /** Whether to animate only once. Default: true */
  once?: boolean;
}

const defaultOptions: Required<ScrollAnimationOptions> = {
  distance: 30,
  duration: 600,
  direction: "up",
  easing: "ease-out",
  threshold: 0.1,
  delay: 0,
  once: true,
};

function getTranslate(
  direction: AnimationDirection,
  distance: number
): string {
  switch (direction) {
    case "up":
      return `translateY(${distance}px)`;
    case "down":
      return `translateY(-${distance}px)`;
    case "left":
      return `translateX(${distance}px)`;
    case "right":
      return `translateX(-${distance}px)`;
    case "none":
      return "translate(0, 0)";
  }
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: ScrollAnimationOptions = {}
) {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);
  const hasAnimated = useRef(false);

  const merged = { ...defaultOptions, ...options };

  const applyStyles = useCallback(
    (el: T, visible: boolean) => {
      if (prefersReducedMotion()) {
        el.style.opacity = "1";
        el.style.transform = "none";
        return;
      }

      if (visible) {
        el.style.transition = `opacity ${merged.duration}ms ${merged.easing} ${merged.delay}ms, transform ${merged.duration}ms ${merged.easing} ${merged.delay}ms`;
        el.style.opacity = "1";
        el.style.transform = "translate(0, 0)";
      } else {
        el.style.transition = "none";
        el.style.opacity = "0";
        el.style.transform = getTranslate(merged.direction, merged.distance);
      }
    },
    [merged.duration, merged.easing, merged.delay, merged.direction, merged.distance]
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Set initial hidden state
    if (!prefersReducedMotion() && !hasAnimated.current) {
      applyStyles(el, false);
    } else if (prefersReducedMotion()) {
      applyStyles(el, true);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (merged.once && hasAnimated.current) return;
            hasAnimated.current = true;
            setIsVisible(true);
            applyStyles(entry.target as T, true);

            if (merged.once) {
              observer.unobserve(entry.target);
            }
          } else if (!merged.once) {
            setIsVisible(false);
            applyStyles(entry.target as T, false);
          }
        });
      },
      { threshold: merged.threshold }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [merged.threshold, merged.once, applyStyles]);

  return { ref, isVisible };
}
