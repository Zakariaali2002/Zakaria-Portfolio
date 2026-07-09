import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { Heart, Mail, Phone, MapPin, ArrowRight, ArrowUp, Send, CheckCircle2, Clock } from "lucide-react";
import { GithubIcon, LinkedinIcon, DribbbleIcon, InstagramIcon } from "./BrandIcons";
import Logo from "./Logo";
import { motion } from "framer-motion";

const socials = [
  { icon: GithubIcon, href: "#", label: "GitHub" },
  { icon: LinkedinIcon, href: "#", label: "LinkedIn" },
  { icon: DribbbleIcon, href: "#", label: "Dribbble" },
  { icon: InstagramIcon, href: "#", label: "Instagram" },
];

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About Me", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const services = [
  { label: "UI/UX Design", href: "#services" },
  { label: "Web Development", href: "#services" },
  { label: "App Design", href: "#services" },
  { label: "Brand Identity", href: "#services" },
  { label: "SEO & Marketing", href: "#services" },
];

const contactInfo = [
  { icon: Mail, value: "zakriaali452@gmail.com", href: "mailto:zakriaali452@gmail.com" },
  { icon: Phone, value: "+92 318 2705359", href: "tel:+923182705359" },
  { icon: MapPin, value: "Karachi, Pakistan", href: "#contact" },
];

function CurrentTime() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return <span suppressHydrationWarning>{time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>;
}

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 4000);
  };

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative overflow-hidden border-t border-line">
      {/* Animated wave SVG */}
      <div className="pointer-events-none absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 100"
          className="relative h-[60px] w-[calc(100%+1.3px)] opacity-20"
          preserveAspectRatio="none"
        >
          <path
            fill="url(#wave-gradient)"
            d="M0,50 C240,100 480,0 720,50 C960,100 1200,0 1440,50 L1440,100 L0,100 Z"
          >
            <animate
              attributeName="d"
              dur="8s"
              repeatCount="indefinite"
              values="
                M0,50 C240,100 480,0 720,50 C960,100 1200,0 1440,50 L1440,100 L0,100 Z;
                M0,65 C240,0 480,100 720,65 C960,0 1200,100 1440,65 L1440,100 L0,100 Z;
                M0,50 C240,100 480,0 720,50 C960,100 1200,0 1440,50 L1440,100 L0,100 Z
              "
            />
          </path>
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="50%" stopColor="#d946ef" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* background glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-brand/10 blur-[140px]" />

      {/* CTA strip */}
      <div className="relative mx-auto max-w-6xl px-5 pt-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="btn-shine relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-brand/25 via-card to-brand-2/20 px-8 py-10 sm:px-12"
        >
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h3 className="font-display text-2xl font-bold sm:text-3xl">
                Have a project in mind? <span className="text-gradient">Let's make it real.</span>
              </h3>
              <p className="mt-2 text-white/60">Free consultation — response within 24 hours.</p>
            </div>
            <a
              href="#contact"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-brand to-brand-2 px-7 py-3.5 font-semibold text-white shadow-xl shadow-brand/30 transition hover:shadow-brand/50 hover:brightness-110"
            >
              Start a Project
              <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Main footer columns */}
      <div className="relative mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          {/* Brand column */}
          <div>
            <a href="#home" className="flex items-center gap-2.5 font-display text-xl font-bold">
              <Logo />
              Zakaria<span className="text-gradient">.</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
              Creative designer & developer blending design with engineering — crafting websites, apps and brands that
              drive real growth for businesses worldwide.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  whileHover={{ y: -4, scale: 1.1 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white/5 text-white/60 transition hover:border-brand/60 hover:bg-brand/20 hover:text-white hover:shadow-lg hover:shadow-brand/20"
                >
                  <s.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display mb-5 font-semibold text-white">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="group inline-flex items-center gap-2 text-sm text-white/55 transition hover:text-white"
                  >
                    <span className="h-px w-0 bg-gradient-to-r from-brand to-brand-2 transition-all duration-300 group-hover:w-4" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display mb-5 font-semibold text-white">Services</h4>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="group inline-flex items-center gap-2 text-sm text-white/55 transition hover:text-white"
                  >
                    <span className="h-px w-0 bg-gradient-to-r from-brand to-brand-2 transition-all duration-300 group-hover:w-4" />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + newsletter */}
          <div>
            <h4 className="font-display mb-5 font-semibold text-white">Get In Touch</h4>
            <ul className="space-y-3.5">
              {contactInfo.map((c) => (
                <li key={c.value}>
                  <a href={c.href} className="group flex items-center gap-3 text-sm text-white/55 transition hover:text-white">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-brand transition group-hover:bg-gradient-to-br group-hover:from-brand group-hover:to-brand-2 group-hover:text-white">
                      <c.icon className="h-4 w-4" />
                    </span>
                    {c.value}
                  </a>
                </li>
              ))}
            </ul>

            <form onSubmit={handleSubscribe} className="mt-6">
              <p className="mb-2.5 text-sm font-medium text-white/70">Subscribe to my newsletter</p>
              <div className="flex overflow-hidden rounded-xl border border-line bg-white/5 focus-within:border-brand/60">
                <input
                  type="email"
                  required
                  placeholder="Your email"
                  className="w-full bg-transparent px-4 py-3 text-sm text-white placeholder-white/30 outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="flex shrink-0 items-center justify-center bg-gradient-to-r from-brand to-brand-2 px-4 text-white transition hover:brightness-110"
                >
                  {subscribed ? <CheckCircle2 className="h-4.5 w-4.5" /> : <Send className="h-4.5 w-4.5" />}
                </button>
              </div>
              {subscribed && <p className="mt-2 text-xs text-emerald-400">Subscribed! Thank you 🎉</p>}
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-6 sm:flex-row">
          <motion.p
            className="flex items-center gap-1.5 text-sm text-white/50"
            whileHover={{ scale: 1.02 }}
          >
            © {new Date().getFullYear()} Zakaria. All rights reserved. Made with
            <Heart className="h-4 w-4 animate-pulse fill-rose-500 text-rose-500" />
            in Pakistan
            <span className="hidden items-center gap-1.5 sm:flex">
              <span className="ml-2 h-1 w-1 rounded-full bg-white/30" />
              <Clock className="h-3.5 w-3.5" />
              <CurrentTime />
            </span>
          </motion.p>

          <div className="flex items-center gap-6">
            <a href="#home" className="text-sm text-white/50 transition hover:text-white">
              Privacy Policy
            </a>
            <a href="#home" className="text-sm text-white/50 transition hover:text-white">
              Terms of Service
            </a>
            <motion.button
              onClick={scrollTop}
              aria-label="Back to top"
              whileHover={{ y: -4, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-brand to-brand-2 text-white shadow-lg shadow-brand/30 transition hover:shadow-brand/50"
            >
              <ArrowUp className="h-4.5 w-4.5" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}