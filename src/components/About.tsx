import Reveal from "./Reveal";
import { Palette, Code2, Rocket, Award } from "lucide-react";

const highlights = [
  {
    icon: Palette,
    title: "Design First",
    desc: "Every pixel matters. I obsess over details until it feels just right.",
  },
  {
    icon: Code2,
    title: "Clean Code",
    desc: "Modern, maintainable code with the latest technologies and best practices.",
  },
  {
    icon: Rocket,
    title: "Fast Delivery",
    desc: "Quick turnarounds without ever compromising on quality.",
  },
  {
    icon: Award,
    title: "Proven Results",
    desc: "50+ successful projects delivered for clients around the globe.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <p className="mb-3 text-sm font-semibold tracking-[0.25em] text-brand uppercase">About Me</p>
          <h2 className="font-display max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
            Turning ideas into <span className="text-gradient">digital reality</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <Reveal delay={0.1}>
            <div className="space-y-5 text-lg leading-relaxed text-fg/65">
              <p>
                Hello! I'm <span className="font-semibold text-fg">Zakaria</span> — a passionate creative designer
                and developer who loves building meaningful digital experiences. My journey started with a simple
                curiosity for design, and today it has grown into a full-fledged craft.
              </p>
              <p>
                I specialize in <span className="text-fg">UI/UX design</span>,{" "}
                <span className="text-fg">web development</span> and{" "}
                <span className="text-fg">brand identity</span>. Whether it's a startup landing page, a full product
                dashboard, or a complete rebrand — I bring strategy, creativity and code together to deliver work that
                stands out.
              </p>
              <p>
                When I'm not designing, you'll find me exploring new design trends, learning new tools, or sketching
                out the next big idea over a cup of chai. ☕
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {["Figma", "React", "Tailwind CSS", "TypeScript", "Adobe CC", "Framer"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-line bg-white/5 px-4 py-1.5 text-sm text-fg/75 transition hover:border-brand/50 hover:text-fg"
                >
                  {t}
                </span>
              ))}
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {highlights.map((h, i) => (
              <Reveal key={h.title} delay={0.1 + i * 0.08}>
                <div className="group h-full rounded-2xl border border-line bg-card p-6 transition duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/10">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand/25 to-brand-2/25 text-brand transition group-hover:from-brand group-hover:to-brand-2 group-hover:text-white">
                    <h.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display mb-1.5 font-semibold text-fg">{h.title}</h3>
                  <p className="text-sm leading-relaxed text-fg/55">{h.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}