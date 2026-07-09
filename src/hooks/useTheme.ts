import { useEffect, useState, useCallback } from "react";

type Theme = "dark" | "light";
type AccentColor = "purple" | "blue" | "green" | "pink" | "amber";

const accentMap: Record<AccentColor, Record<string, string>> = {
  purple: { brand: "#8b5cf6", brand2: "#d946ef" },
  blue: { brand: "#3b82f6", brand2: "#06b6d4" },
  green: { brand: "#10b981", brand2: "#34d399" },
  pink: { brand: "#ec4899", brand2: "#f43f5e" },
  amber: { brand: "#f59e0b", brand2: "#ef4444" },
};

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
    return "dark";
  });

  const [accent, setAccentState] = useState<AccentColor>(() => {
    const stored = localStorage.getItem("accent") as AccentColor;
    return stored && accentMap[stored] ? stored : "purple";
  });

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    localStorage.setItem("theme", t);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  const setAccent = useCallback((a: AccentColor) => {
    setAccentState(a);
    localStorage.setItem("accent", a);
  }, []);

  const accentColors = accentMap[accent];

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.style.setProperty("--color-ink", "#f5f5f7");
      root.style.setProperty("--color-panel", "#ffffff");
      root.style.setProperty("--color-card", "#ffffff");
      root.style.setProperty("--color-line", "rgba(0,0,0,0.08)");
      root.style.setProperty("--color-text", "#1a1a2e");
      root.style.setProperty("--color-text-secondary", "rgba(0,0,0,0.55)");
      root.classList.add("light");
      root.classList.remove("dark");
    } else {
      root.style.setProperty("--color-ink", "#07070d");
      root.style.setProperty("--color-panel", "#0d0d17");
      root.style.setProperty("--color-card", "#12121f");
      root.style.setProperty("--color-line", "rgba(255,255,255,0.08)");
      root.style.setProperty("--color-text", "#e8e8f0");
      root.style.setProperty("--color-text-secondary", "rgba(255,255,255,0.55)");
      root.classList.remove("light");
      root.classList.add("dark");
    }
    document.body.style.background = root.style.getPropertyValue("--color-ink");
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--color-brand", accentColors.brand);
    root.style.setProperty("--color-brand-2", accentColors.brand2);
  }, [accent, accentColors]);

  const accentOptions = Object.keys(accentMap) as AccentColor[];

  return { theme, accent, setTheme, toggleTheme, setAccent, accentOptions, accentColors };
}

export type { Theme, AccentColor };