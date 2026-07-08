import { useEffect, useState, useRef } from "react";
import type { MouseEvent } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, ChevronDown } from "lucide-react";
import { GithubIcon, LinkedinIcon, DribbbleIcon, InstagramIcon } from "./BrandIcons";
import CountUp from "./CountUp";

const roles = ["Creative Designer", "UI/UX Designer", "Web Developer", "Brand Strategist"];

function useTypewriter() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[index % roles.length];
    const speed = deleting ? 40 : 90;
    const timer = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) setTimeout(() => setDeleting(true), 1400);
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDeleting(false);
          setIndex((i) => i + 1);
        }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [text, deleting, index]);

  return text;
}

const socials = [
  { icon: GithubIcon, href: "#", label: "GitHub" },
  { icon: LinkedinIcon, href: "#", label: "LinkedIn" },
  { icon: DribbbleIcon, href: "#", label: "Dribbble" },
  { icon: InstagramIcon, href: "#", label: "Instagram" },
];

const stats = [
  { value: 3, suffix: "+", label: "Years Experience" },
  { value: 50, suffix: "+", label: "Projects Done" },
  { value: 30, suffix: "+", label: "Happy Clients" },
];

const name = "Zakaria";

export default function Hero() {
  const typed = useTypewriter();
  const portraitRef = useRef<HTMLDivElement>(null);

  // mouse parallax for portrait — lightweight CSS transform approach
  const onMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!portraitRef.current) return;
    const { innerWidth, innerHeight } = window;
    const rx = ((e.clientY / innerHeight) * 2 - 1) * 8;
    const ry = ((e.clientX / innerWidth) * 2 - 1) * -8;
    portraitRef.current.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
  };

  const onMouseLeave = () => {
    if (!portraitRef.current) return;
    portraitRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";
  };

  return (
    <section
      id="home"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="noise-bg relative flex min-h-screen items-center overflow-hidden pt-28 pb-16"
    >
      {/* animated gradient blobs */}
      <div className="animate-blob pointer-events-none absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full bg-brand/20 blur-[120px]" />
      <div
        className="animate-blob pointer-events-none absolute top-1/3 -right-32 h-[380px] w-[380px] rounded-full bg-brand-2/15 blur-[120px]"
        style={{ animationDelay: "-6s" }}
      />
      <div
        className="animate-blob pointer-events-none absolute bottom-0 left-1/3 h-[320px] w-[320px] rounded-full bg-accent/10 blur-[120px]"
        style={{ animationDelay: "-11s" }}
      />

      {/* decorative grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
        }}
      />

      {/* floating particles */}
      {[
        { left: "12%", top: "22%", d: 0 },
        { left: "85%", top: "18%", d: 1.2 },
        { left: "70%", top: "70%", d: 2.1 },
        { left: "20%", top: "75%", d: 0.6 },
        { left: "50%", top: "12%", d: 1.7 },
      ].map((p, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-gradient-to-r from-brand to-brand-2"
          style={{ left: p.left, top: p.top }}
          animate={{ y: [0, -22, 0], opacity: [0.25, 0.9, 0.25] }}
          transition={{ duration: 4.5, repeat: Infinity, delay: p.d, ease: "easeInOut" }}
        />
      ))}

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-5 lg:grid-cols-2">
        {/* Left */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-4 py-2 text-sm text-white/80"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            Available for freelance work
          </motion.div>

          <h1 className="font-display text-5xl leading-[1.05] font-bold tracking-tight sm:text-6xl lg:text-7xl">
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="block"
            >
              Hi, I'm{" "}
              <span className="text-gradient-animated inline-block">
                {name.split("").map((ch, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ opacity: 0, y: 30, rotate: 8 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    transition={{ duration: 0.5, delay: 0.25 + i * 0.06, ease: [0.21, 0.65, 0.36, 1] }}
                  >
                    {ch}
                  </motion.span>
                ))}
              </span>
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="block text-white/90"
            >
              {typed}
              <span
                className="ml-1 inline-block w-[3px] animate-pulse bg-brand-2 align-middle"
                style={{ height: "0.9em" }}
              />
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-6 max-w-lg text-lg leading-relaxed text-white/60"
          >
            I craft beautiful digital experiences — from stunning brands to pixel-perfect websites and apps that people
            love to use.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              href="#projects"
              className="btn-shine group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand to-brand-2 px-7 py-3.5 font-semibold text-white shadow-xl shadow-brand/30 transition hover:shadow-brand/50"
            >
              View My Work
              <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-7 py-3.5 font-semibold text-white transition hover:border-brand/50 hover:bg-white/10"
            >
              <Download className="h-4.5 w-4.5" />
              Download CV
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-10 flex items-center gap-3"
          >
            {socials.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 + i * 0.08 }}
                whileHover={{ y: -5, scale: 1.1 }}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white/5 text-white/70 transition hover:border-brand/60 hover:text-white hover:shadow-lg hover:shadow-brand/20"
              >
                <s.icon className="h-4.5 w-4.5" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Right */}
        <motion.div
          ref={portraitRef}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ transformStyle: "preserve-3d", perspective: 1000 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-brand/30 via-brand-2/20 to-accent/20 blur-3xl" />
          <div className="animate-pulse-glow relative overflow-hidden rounded-[2.5rem] border border-white/10">
            <img src="/images/zakaria.png" alt="Zakaria portrait" className="w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink/80 to-transparent" />
          </div>

          <motion.div
            style={{ translateZ: 60 }}
            className="animate-float absolute -left-6 top-10 hidden rounded-2xl border border-line bg-card/90 px-4 py-3 shadow-2xl backdrop-blur sm:block"
          >
            <p className="font-display text-2xl font-bold text-gradient">
              <CountUp end={50} suffix="+" />
            </p>
            <p className="text-xs text-white/60">Projects Completed</p>
          </motion.div>
          <motion.div
            style={{ translateZ: 60, animationDelay: "1.2s" }}
            className="animate-float absolute -right-6 bottom-16 hidden rounded-2xl border border-line bg-card/90 px-4 py-3 shadow-2xl backdrop-blur sm:block"
          >
            <p className="font-display text-2xl font-bold text-gradient">5.0 ★</p>
            <p className="text-xs text-white/60">Client Rating</p>
          </motion.div>

          {/* orbiting sparkle */}
          <div className="absolute -top-3 -right-3 hidden sm:block">
            <span className="animate-orbit block text-2xl">✦</span>
          </div>
        </motion.div>
      </div>

      {/* Stats strip */}
      <div className="absolute inset-x-0 bottom-16 hidden justify-center lg:flex">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="glass flex gap-10 rounded-2xl border border-line px-10 py-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-2xl font-bold text-gradient">
                <CountUp end={s.value} suffix={s.suffix} />
              </p>
              <p className="text-xs text-white/55">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* scroll indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-white/40 transition hover:text-white lg:flex"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <ChevronDown className="animate-bounce-slow h-5 w-5" />
      </motion.a>
    </section>
  );
}
