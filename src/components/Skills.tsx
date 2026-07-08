import { motion } from "framer-motion";
import Reveal from "./Reveal";

const skills = [
  { name: "UI/UX Design", level: 95, color: "from-violet-500 to-fuchsia-500" },
  { name: "Web Design", level: 92, color: "from-fuchsia-500 to-pink-500" },
  { name: "React / Frontend", level: 88, color: "from-cyan-400 to-blue-500" },
  { name: "Brand Identity", level: 90, color: "from-amber-400 to-orange-500" },
  { name: "Figma / Prototyping", level: 96, color: "from-emerald-400 to-teal-500" },
  { name: "Motion / Animation", level: 82, color: "from-rose-400 to-red-500" },
];

const tools = [
  "Figma", "Photoshop", "Illustrator", "After Effects", "React", "Next.js",
  "Tailwind", "TypeScript", "Framer", "Webflow", "WordPress", "Blender",
];

export default function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/10 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl px-5">
        <Reveal className="text-center">
          <p className="mb-3 text-sm font-semibold tracking-[0.25em] text-brand uppercase">My Skills</p>
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            What I bring to <span className="text-gradient">the table</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-x-14 gap-y-8 md:grid-cols-2">
          {skills.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.06}>
              <div>
                <div className="mb-2.5 flex items-center justify-between">
                  <span className="font-medium text-white/85">{s.name}</span>
                  <span className="font-display text-sm font-semibold text-white/50">{s.level}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-white/8">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${s.color}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.2 + i * 0.08, ease: [0.21, 0.65, 0.36, 1] }}
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Marquee */}
        <Reveal delay={0.2} className="mt-20">
          <div className="relative overflow-hidden rounded-2xl border border-line bg-card/60 py-5 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
            <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
              {[...tools, ...tools].map((t, i) => (
                <span key={i} className="flex items-center gap-10 font-display text-lg font-semibold text-white/40">
                  {t}
                  <span className="text-gradient text-xl">✦</span>
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
