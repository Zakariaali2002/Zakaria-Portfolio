import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Palette } from "lucide-react";
import Logo from "./Logo";
import { useTheme } from "../hooks/useTheme";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [showAccents, setShowAccents] = useState(false);
  const { theme, toggleTheme, accent, setAccent, accentOptions } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b border-line py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5">
        <a href="#home" className="flex items-center gap-2.5 font-display text-xl font-bold tracking-tight">
          <Logo />
          <span>
            Zakaria<span className="text-gradient">.</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l, i) => (
            <motion.a
              key={l.href}
              href={l.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="rounded-full px-4 py-2 text-sm font-medium text-white/70 transition hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </motion.a>
          ))}

          {/* Theme toggle */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="ml-2 flex h-9 w-9 items-center justify-center rounded-full border border-line text-white/60 transition hover:border-brand/50 hover:text-white"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </motion.button>

          {/* Accent color picker */}
          <div className="relative">
            <motion.button
              onClick={() => setShowAccents(!showAccents)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="ml-1 flex h-9 w-9 items-center justify-center rounded-full border border-line text-white/60 transition hover:border-brand/50 hover:text-white"
              aria-label="Accent color"
            >
              <Palette className="h-4 w-4" />
            </motion.button>
            <AnimatePresence>
              {showAccents && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-full mt-2 flex gap-1.5 rounded-xl border border-line bg-card p-3 shadow-2xl"
                >
                  {accentOptions.map((a) => (
                    <button
                      key={a}
                      onClick={() => {
                        setAccent(a);
                        setShowAccents(false);
                      }}
                      className={`h-6 w-6 rounded-full transition hover:scale-125 ${
                        accent === a ? "ring-2 ring-white ring-offset-1 ring-offset-card" : ""
                      }`}
                      style={{
                        background:
                          a === "purple"
                            ? "linear-gradient(135deg, #8b5cf6, #d946ef)"
                            : a === "blue"
                              ? "linear-gradient(135deg, #3b82f6, #06b6d4)"
                              : a === "green"
                                ? "linear-gradient(135deg, #10b981, #34d399)"
                                : a === "pink"
                                  ? "linear-gradient(135deg, #ec4899, #f43f5e)"
                                  : "linear-gradient(135deg, #f59e0b, #ef4444)",
                      }}
                      aria-label={a}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.a
            href="#contact"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="btn-shine ml-3 rounded-full bg-gradient-to-r from-brand to-brand-2 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand/30 transition hover:shadow-brand/50 hover:brightness-110"
          >
            Hire Me
          </motion.a>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          {/* Mobile theme toggle */}
          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-line text-white/60"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-line text-white"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="glass overflow-hidden border-b border-line md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-white/5 hover:text-white"
                >
                  {l.label}
                </a>
              ))}
              {/* Mobile accent colors */}
              <div className="mt-3 flex items-center gap-2 px-4">
                <Palette className="h-4 w-4 text-white/40" />
                {accentOptions.map((a) => (
                  <button
                    key={a}
                    onClick={() => {
                      setAccent(a);
                      setOpen(false);
                    }}
                    className={`h-5 w-5 rounded-full transition hover:scale-125 ${
                      accent === a ? "ring-2 ring-white/60" : ""
                    }`}
                    style={{
                      background:
                        a === "purple"
                          ? "linear-gradient(135deg, #8b5cf6, #d946ef)"
                          : a === "blue"
                            ? "linear-gradient(135deg, #3b82f6, #06b6d4)"
                            : a === "green"
                              ? "linear-gradient(135deg, #10b981, #34d399)"
                              : a === "pink"
                                ? "linear-gradient(135deg, #ec4899, #f43f5e)"
                                : "linear-gradient(135deg, #f59e0b, #ef4444)",
                    }}
                    aria-label={a}
                  />
                ))}
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
