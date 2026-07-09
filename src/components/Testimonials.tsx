import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import Reveal from "./Reveal";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Founder, Luxe Fashion",
    text: "Zakaria completely transformed our online store. Sales went up 40% within two months of the redesign. His eye for detail is unmatched — every screen felt premium.",
    initials: "SM",
    gradient: "from-violet-500 to-fuchsia-500",
    rating: 5,
  },
  {
    name: "Ahmed Raza",
    role: "CEO, FitTrack",
    text: "Working with Zakaria was effortless. He understood our vision instantly and delivered an app design our users genuinely love. Highly recommended for any startup.",
    initials: "AR",
    gradient: "from-cyan-400 to-blue-500",
    rating: 5,
  },
  {
    name: "Elena Kovač",
    role: "Marketing Lead, Nova",
    text: "The dashboard he designed made our complex data feel simple. Our customers constantly compliment the interface. Fast, professional and incredibly creative.",
    initials: "EK",
    gradient: "from-amber-400 to-orange-500",
    rating: 5,
  },
  {
    name: "James Carter",
    role: "CTO, GrowthEngine",
    text: "Exceptional designer who truly understands product thinking. He didn't just make things look good — he improved our entire user flow and conversion rates.",
    initials: "JC",
    gradient: "from-emerald-400 to-teal-500",
    rating: 5,
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [autoPlay, setAutoPlay] = useState(true);

  const go = useCallback((d: number) => {
    setDir(d);
    setIndex((i) => (i + d + testimonials.length) % testimonials.length);
    setAutoPlay(false);
  }, []);

  // Auto-slide
  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setDir(1);
      setIndex((i) => (i + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [autoPlay]);

  const t = testimonials[index];

  return (
    <section id="testimonials" className="relative py-24">
      <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[500px] rounded-full bg-brand/8 blur-[140px]" />

      <div className="mx-auto max-w-4xl px-5">
        <Reveal className="text-center">
          <p className="mb-3 text-sm font-semibold tracking-[0.25em] text-brand uppercase">Testimonials</p>
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            What clients <span className="text-gradient">say about me</span>
          </h2>
        </Reveal>

        <Reveal delay={0.15} className="mt-14">
          <div className="relative overflow-hidden rounded-3xl border border-line bg-card p-8 sm:p-12">
            <Quote className="absolute top-8 right-8 h-16 w-16 text-brand/15" />
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={index}
                initial={{ opacity: 0, x: dir * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -60 }}
                transition={{ duration: 0.4 }}
              >
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4.5 w-4.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="mt-6 text-lg leading-relaxed text-white/80 sm:text-xl">"{t.text}"</p>

                <div className="mt-8 flex items-center gap-4">
                  <div
                    className={`flex h-13 w-13 items-center justify-center rounded-full bg-gradient-to-br ${t.gradient} font-display font-bold text-white shadow-lg`}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-display font-semibold text-white">{t.name}</p>
                    <p className="text-sm text-white/50">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex items-center justify-between">
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDir(i > index ? 1 : -1);
                      setIndex(i);
                      setAutoPlay(false);
                    }}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      i === index ? "w-8 bg-gradient-to-r from-brand to-brand-2" : "w-2 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => go(-1)}
                  aria-label="Previous testimonial"
                  className="group flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white/5 text-white/70 transition hover:border-brand/50 hover:text-white hover:shadow-lg hover:shadow-brand/20"
                >
                  <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
                </button>
                <button
                  onClick={() => go(1)}
                  aria-label="Next testimonial"
                  className="group flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white/5 text-white/70 transition hover:border-brand/50 hover:text-white hover:shadow-lg hover:shadow-brand/20"
                >
                  <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}