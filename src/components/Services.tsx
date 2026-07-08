import Reveal from "./Reveal";
import { Layout, Smartphone, PenTool, Globe, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Layout,
    title: "UI/UX Design",
    desc: "User-centered interfaces that are beautiful, intuitive and built to convert — from wireframes to polished prototypes.",
    perks: ["Wireframing", "Prototyping", "Design Systems"],
  },
  {
    icon: Globe,
    title: "Web Development",
    desc: "Fast, responsive and modern websites built with React, Tailwind and the latest web technologies.",
    perks: ["React / Next.js", "Responsive", "SEO Ready"],
  },
  {
    icon: Smartphone,
    title: "App Design",
    desc: "Mobile app experiences that feel native, delightful and effortless — designed for iOS and Android.",
    perks: ["iOS & Android", "User Flows", "Micro-interactions"],
  },
  {
    icon: PenTool,
    title: "Brand Identity",
    desc: "Memorable brands from scratch — logo, colors, typography and complete brand guidelines.",
    perks: ["Logo Design", "Guidelines", "Stationery"],
  },
];

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute -top-32 right-0 h-[400px] w-[500px] rounded-full bg-brand-2/10 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl px-5">
        <Reveal className="text-center">
          <p className="mb-3 text-sm font-semibold tracking-[0.25em] text-brand uppercase">Services</p>
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            How I can <span className="text-gradient">help you</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-line bg-card p-7 transition duration-300 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-2xl hover:shadow-brand/15">
                <div className="absolute -top-16 -right-16 h-32 w-32 rounded-full bg-brand/10 blur-2xl transition duration-500 group-hover:bg-brand/25" />
                <div className="relative">
                  <div className="mb-5 flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br from-brand/25 to-brand-2/25 text-brand transition duration-300 group-hover:from-brand group-hover:to-brand-2 group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand/40">
                    <s.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-white">{s.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-white/55">{s.desc}</p>
                  <ul className="mt-5 space-y-2">
                    {s.perks.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-xs text-white/60">
                        <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-brand to-brand-2" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition group-hover:gap-2.5 group-hover:text-white"
                  >
                    Get Started <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
