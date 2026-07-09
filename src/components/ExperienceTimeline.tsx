import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import Reveal from "./Reveal";

const experiences = [
  {
    type: "work",
    role: "Senior UI/UX Designer",
    company: "Vornox Lab",
    period: "2023 — Present",
    desc: "Leading design for multiple client projects. Building design systems, creating high-fidelity prototypes, and managing a team of junior designers.",
    icon: Briefcase,
    gradient: "from-violet-500 to-fuchsia-500",
  },
  {
    type: "work",
    role: "Creative Designer & Developer",
    company: "Freelance",
    period: "2021 — Present",
    desc: "Delivering 50+ projects worldwide — from brand identities to full-stack web applications for startups and established businesses.",
    icon: Briefcase,
    gradient: "from-cyan-400 to-blue-500",
  },
  {
    type: "education",
    role: "BS Computer Science",
    company: "University of Karachi",
    period: "2020 — 2024",
    desc: "Focused on software engineering, human-computer interaction, and visual design principles. Graduated with distinction.",
    icon: GraduationCap,
    gradient: "from-amber-400 to-orange-500",
  },
  {
    type: "work",
    role: "Junior Web Designer",
    company: "TechFlow Agency",
    period: "2020 — 2021",
    desc: "Designed and developed responsive websites for small businesses. Collaborated with marketing teams on conversion optimization.",
    icon: Briefcase,
    gradient: "from-emerald-400 to-teal-500",
  },
];

export default function ExperienceTimeline() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute top-1/3 right-0 h-[400px] w-[400px] rounded-full bg-brand-2/10 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-5">
        <Reveal className="text-center">
          <p className="mb-3 text-sm font-semibold tracking-[0.25em] text-brand uppercase">Experience</p>
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            My professional <span className="text-gradient">journey</span>
          </h2>
        </Reveal>

        <div className="relative mt-14">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-brand via-brand-2 to-accent/40 hidden md:block" />

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <Reveal key={i} delay={i * 0.1} direction={i % 2 === 0 ? "left" : "right"}>
                <div className="relative md:flex md:gap-10">
                  {/* Icon on timeline */}
                  <div className="absolute left-8 -translate-x-1/2 z-10 hidden md:block">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${exp.gradient} shadow-lg shadow-brand/20`}>
                      <exp.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`md:w-[calc(50%-3rem)] ${i % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"}`}>
                    <div className="relative overflow-hidden rounded-2xl border border-line bg-card p-6 transition hover:border-brand/40 hover:shadow-xl hover:shadow-brand/10">
                      {/* Mobile icon */}
                      <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${exp.gradient} text-white shadow-md md:hidden`}>
                        <exp.icon className="h-5 w-5" />
                      </div>
                      <span className="mb-2 inline-block rounded-full bg-brand/15 px-3 py-1 text-xs font-medium text-brand">
                        {exp.period}
                      </span>
                      <h3 className="font-display text-xl font-semibold text-fg">{exp.role}</h3>
                      <p className="mt-1 text-sm text-brand/80 font-medium">{exp.company}</p>
                      <p className="mt-3 text-sm leading-relaxed text-fg/55">{exp.desc}</p>

                      {/* Timeline dot for mobile */}
                      <div className={`absolute top-6 right-6 h-3 w-3 rounded-full bg-gradient-to-br ${exp.gradient} hidden md:block`} />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}