import { motion } from "framer-motion";

export default function Logo() {
  return (
    <motion.div
      className="relative flex h-10 w-10 items-center justify-center"
      whileHover={{ scale: 1.1, rotate: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      {/* Glow ring */}
      <motion.span
        className="absolute inset-0 rounded-xl bg-gradient-to-br from-brand via-brand-2 to-accent opacity-60 blur-md"
        animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Background panel */}
      <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-2 text-white shadow-lg shadow-brand/30">
        <motion.span
          className="text-base font-black"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          Z
        </motion.span>
      </span>

      {/* Sparkle dot */}
      <motion.span
        className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-accent"
        animate={{ scale: [0, 1.3, 0], opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      />
    </motion.div>
  );
}