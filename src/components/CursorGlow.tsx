import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf: number;
    let mx = -400, my = -400;

    const move = (e: MouseEvent) => {
      mx = e.clientX - 200;
      my = e.clientY - 200;
      if (!ref.current) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (ref.current) {
          ref.current.style.transform = `translate(${mx}px, ${my}px)`;
        }
      });
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-0 hidden h-[400px] w-[400px] rounded-full will-change-transform md:block"
      style={{
        background: "radial-gradient(circle, rgba(139,92,246,0.14) 0%, rgba(217,70,239,0.07) 40%, transparent 70%)",
      }}
    />
  );
}
