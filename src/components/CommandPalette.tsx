import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, Code2, Briefcase, Mail, FileDown, ExternalLink, Command } from "lucide-react";

interface CommandItem {
  id: string;
  label: string;
  icon: typeof Home;
  action: () => void;
  shortcut?: string;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setOpen(false);
    }
  };

  const commands: CommandItem[] = [
    { id: "home", label: "Home", icon: Home, action: () => scrollToSection("home") },
    { id: "about", label: "About", icon: User, action: () => scrollToSection("about") },
    { id: "skills", label: "Skills", icon: Code2, action: () => scrollToSection("skills") },
    { id: "projects", label: "Projects", icon: Briefcase, action: () => scrollToSection("projects") },
    { id: "contact", label: "Contact", icon: Mail, action: () => scrollToSection("contact") },
    { id: "resume", label: "Download Resume", icon: FileDown, action: () => window.open("#", "_blank") },
    { id: "github", label: "Open GitHub", icon: ExternalLink, action: () => window.open("https://github.com/Zakariaali2002", "_blank"), shortcut: "G" },
  ];

  const filtered = query.trim()
    ? commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()))
    : commands;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
        setQuery("");
        setSelectedIndex(0);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    },
    []
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const handleSubmit = (item: CommandItem) => {
    item.action();
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => (i + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => (i - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[selectedIndex]) handleSubmit(filtered[selectedIndex]);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9997] bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-[15%] z-[9998] w-full max-w-lg -translate-x-1/2"
          >
            <div className="overflow-hidden rounded-2xl border border-line bg-card shadow-2xl shadow-brand/10">
              <div className="flex items-center gap-3 border-b border-line px-5 py-3.5">
                <Command className="h-5 w-5 text-fg/40" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  onKeyDown={onKeyDown}
                  placeholder="Search commands..."
                  className="w-full bg-transparent text-base text-fg outline-none placeholder:text-fg/30"
                />
                <kbd className="hidden rounded-md border border-line bg-white/5 px-2 py-0.5 text-xs text-fg/40 sm:inline-block">
                  ESC
                </kbd>
              </div>
              <div className="max-h-72 overflow-y-auto py-2">
                {filtered.map((item, i) => (
                  <button
                    key={item.id}
                    onClick={() => handleSubmit(item)}
                    onMouseEnter={() => setSelectedIndex(i)}
                    className={`flex w-full items-center gap-3 px-5 py-3 text-left text-sm transition ${
                      i === selectedIndex
                        ? "bg-brand/20 text-fg"
                        : "text-fg/60 hover:bg-white/5 hover:text-fg"
                    }`}
                  >
                    <item.icon className="h-4.5 w-4.5" />
                    <span className="flex-1">{item.label}</span>
                    <ExternalLink className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100" />
                  </button>
                ))}
                {filtered.length === 0 && (
                  <div className="px-5 py-8 text-center text-sm text-fg/40">No results found</div>
                )}
              </div>
              <div className="border-t border-line px-5 py-2.5 text-[11px] text-fg/30">
                Navigate with ↑↓ • Enter to select • Esc to close
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}