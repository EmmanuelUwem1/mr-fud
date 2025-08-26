import { useCallback } from "react";

export function useRipple() {
  return useCallback((e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget;

    // Create ripple element
    const ripple = document.createElement("span");
    ripple.className =
      "absolute rounded-full bg-white/40 pointer-events-none transition-opacity duration-300 ease-out z-[20000]";

    // Size and position
    const rect = target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;

    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    // Initial styles
    ripple.style.position = "absolute";
    ripple.style.transform = "scale(0)";
    ripple.style.opacity = "0.6";
    ripple.style.transition =
      "transform 600ms ease-out, opacity 300ms ease-out";

    // Append and trigger animation
    target.appendChild(ripple);
    requestAnimationFrame(() => {
      ripple.style.transform = "scale(4)";
      ripple.style.opacity = "0";
    });

    // Remove after animation
    setTimeout(() => {
      ripple.remove();
    }, 700); // slightly longer than animation duration
  }, []);
}
