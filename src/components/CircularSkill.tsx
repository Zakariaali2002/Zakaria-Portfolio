import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface CircularSkillProps {
  name: string;
  level: number;
  color: string;
  icon?: string;
  delay?: number;
}

export default function CircularSkill({ name, level, color, icon, delay = 0 }: CircularSkillProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [animatedLevel, setAnimatedLevel] = useState(0);
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedLevel / 100) * circumference;

  useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(() => {
      const duration = 1500;
      const start = performance.now();
      const animate = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setAnimatedLevel(Math.round(eased * level));
        if (p < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [inView, level, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col items-center gap-3"
    >
      <div className="relative flex h-36 w-36 items-center justify-center">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 140 140">
          {/* Background circle */}
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <motion.circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke={`url(#grad-${name.replace(/\s+/g, "")})`}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay, ease: [0.21, 0.65, 0.36, 1] }}
          />
          <defs>
            <linearGradient id={`grad-${name.replace(/\s+/g, "")}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={color.split(" ")[0]?.replace("from-", "") || "#8b5cf6"} />
              <stop offset="100%" stopColor={color.split(" ")[1]?.replace("to-", "") || "#d946ef"} />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {icon && <span className="mb-1 text-xl">{icon}</span>}
          <span className="font-display text-2xl font-bold text-white">{animatedLevel}%</span>
        </div>
      </div>
      <p className="text-sm font-medium text-white/70">{name}</p>
    </motion.div>
  );
}