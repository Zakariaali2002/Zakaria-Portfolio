import { useEffect, useRef, useCallback } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const posRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });
  const isHoveringRef = useRef(false);
  const isClickingRef = useRef(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    targetRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseDown = useCallback(() => {
    isClickingRef.current = true;
    if (followerRef.current) {
      followerRef.current.style.transform = "translate(-50%, -50%) scale(0.7)";
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    isClickingRef.current = false;
    if (followerRef.current) {
      followerRef.current.style.transform = "translate(-50%, -50%) scale(1)";
    }
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    // Add hover targets
    const hoverElements = document.querySelectorAll<HTMLElement>(
      'a, button, [role="button"], input, textarea, select, img, [data-cursor-hover]'
    );

    const addHover = () => {
      isHoveringRef.current = true;
      cursor.classList.add("scale-150", "opacity-60");
      follower.classList.add("scale-[1.8]", "opacity-30");
    };
    const removeHover = () => {
      isHoveringRef.current = false;
      cursor.classList.remove("scale-150", "opacity-60");
      follower.classList.remove("scale-[1.8]", "opacity-30");
    };

    for (const el of hoverElements) {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    }

    const animate = () => {
      const { x, y } = targetRef.current;
      posRef.current.x += (x - posRef.current.x) * 0.15;
      posRef.current.y += (y - posRef.current.y) * 0.15;
      cursor.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      follower.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px) translate(-50%, -50%)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      cancelAnimationFrame(rafRef.current);
      for (const el of hoverElements) {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      }
    };
  }, [handleMouseMove, handleMouseDown, handleMouseUp]);

  // Ripple click effect
  const handleClickRipple = useCallback((e: MouseEvent) => {
    const ripple = document.createElement("span");
    const size = Math.random() * 20 + 10;
    ripple.style.cssText = `
      position: fixed;
      left: ${e.clientX - size / 2}px;
      top: ${e.clientY - size / 2}px;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(139,92,246,0.4), transparent);
      pointer-events: none;
      z-index: 9998;
      animation: ripple-fade 0.6s ease-out forwards;
    `;
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  }, []);

  useEffect(() => {
    window.addEventListener("click", handleClickRipple);
    return () => window.removeEventListener("click", handleClickRipple);
  }, [handleClickRipple]);

  return (
    <>
      <style>{`
        @keyframes ripple-fade {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(3); opacity: 0; }
        }
      `}</style>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden h-4 w-4 rounded-full bg-brand shadow-lg shadow-brand/50 will-change-transform md:block"
        style={{ transition: "width 0.2s, height 0.2s, opacity 0.2s" }}
      />
      <div
        ref={followerRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] hidden h-8 w-8 rounded-full border border-brand/40 will-change-transform md:block"
        style={{ transition: "transform 0.15s ease-out" }}
      />
    </>
  );
}