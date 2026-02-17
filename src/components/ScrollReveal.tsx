"use client";

import { useScrollAnimation, type ScrollAnimationOptions } from "@/hooks/useScrollAnimation";

interface ScrollRevealProps extends ScrollAnimationOptions {
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

export default function ScrollReveal({
  children,
  className = "",
  as: Tag = "div",
  ...animationOptions
}: ScrollRevealProps) {
  const { ref } = useScrollAnimation<HTMLElement>(animationOptions);

  return (
    // @ts-expect-error -- dynamic tag with ref
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
