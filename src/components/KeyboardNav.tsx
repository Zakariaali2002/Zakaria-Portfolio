import { useEffect } from "react";

export default function KeyboardNav() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if the user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      )
        return;

      // Check for Ctrl/Cmd key
      if (e.ctrlKey || e.metaKey) return;

      const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: "smooth" });
        }
      };

      switch (e.key.toLowerCase()) {
        case "h":
          scrollTo("home");
          break;
        case "a":
          scrollTo("about");
          break;
        case "s":
          scrollTo("skills");
          break;
        case "p":
          scrollTo("projects");
          break;
        case "c":
          scrollTo("contact");
          break;
        case "r": {
          e.preventDefault();
          window.open("#", "_blank");
          break;
        }
        case "g": {
          e.preventDefault();
          window.open("https://github.com/Zakariaali2002", "_blank");
          break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return null;
}