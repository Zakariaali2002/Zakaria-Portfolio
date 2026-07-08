import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";

type Category = "All" | "Web Design" | "Web Apps" | "App Design" | "Branding" | "Marketing";

const projects = [
  {
    title: "Vornox Lab — Agency Website",
    category: "Web Design" as const,
    tags: ["Agency", "React", "Full Website"],
    image: "/images/project-agency.png",
    desc: "Complete software agency website with 9 service pages, blog, portfolio and a modern dark design that converts visitors into clients.",
    featured: true,
  },
  {
    title: "Client Portal & Admin Panel",
    category: "Web Apps" as const,
    tags: ["SaaS", "Dashboard", "Real-time Chat"],
    image: "/images/project-portal.png",
    desc: "Full client management system — service requests, project milestones, progress tracking, file uploads and real-time client-admin messaging.",
    featured: true,
  },
  {
    title: "Growth Engine — SEO & Marketing",
    category: "Marketing" as const,
    tags: ["SEO", "Analytics", "300% Growth"],
    image: "/images/project-seo.png",
    desc: "Digital marketing campaign & analytics dashboard that boosted a client's online sales by 300% in just 6 months.",
    featured: true,
  },
  {
    title: "TalentHive Recruitment Portal",
    category: "Web Apps" as const,
    tags: ["Job Portal", "Search", "Profiles"],
    image: "/images/project-recruitment.png",
    desc: "Modern recruitment platform with smart job matching, candidate profiles and powerful search filters for hiring teams.",
    featured: false,
  },
  {
    title: "Luxe Fashion Store",
    category: "Web Design" as const,
    tags: ["E-Commerce", "UI/UX", "React"],
    image: "/images/project-ecommerce.png",
    desc: "A premium fashion e-commerce experience with a conversion-focused design.",
    featured: false,
  },
  {
    title: "FitTrack Mobile App",
    category: "App Design" as const,
    tags: ["Mobile", "Fitness", "Dark UI"],
    image: "/images/project-app.png",
    desc: "Fitness tracking app with smart analytics and a bold, energetic interface.",
    featured: false,
  },
  {
    title: "Aurum Brand Identity",
    category: "Branding" as const,
    tags: ["Logo", "Identity", "Print"],
    image: "/images/project-brand.png",
    desc: "Complete luxury brand identity — logo, stationery and brand guidelines.",
    featured: false,
  },
  {
    title: "Nova SaaS Dashboard",
    category: "Web Design" as const,
    tags: ["SaaS", "Dashboard", "Data Viz"],
    image: "/images/project-dashboard.png",
    desc: "Analytics dashboard for a SaaS platform with rich data visualisation.",
    featured: false,
  },
];

const categories: Category[] = ["All", "Web Design", "Web Apps", "App Design", "Branding", "Marketing"];

export default function Projects() {
  const [active, setActive] = useState<Category>("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="relative py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-sm font-semibold tracking-[0.25em] text-brand uppercase">Portfolio</p>
            <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Featured <span className="text-gradient">projects</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  active === c
                    ? "bg-gradient-to-r from-brand to-brand-2 text-white shadow-lg shadow-brand/30"
                    : "border border-line bg-white/5 text-white/60 hover:text-white"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="mt-12 grid gap-7 sm:grid-cols-2">
          <AnimatePresence mode="sync" initial={false}>
            {filtered.map((p) => (
              <motion.article
                layout
                key={p.title}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.4 }}
              >
                <TiltCard className="group relative h-full overflow-hidden rounded-3xl border border-line bg-card transition-colors duration-300 hover:border-brand/40">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent opacity-80" />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs font-medium text-white/85 backdrop-blur">
                      {p.category}
                    </span>
                    {p.featured && (
                      <span className="btn-shine rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-3 py-1 text-xs font-bold text-black shadow-lg shadow-amber-500/30">
                        ★ Featured
                      </span>
                    )}
                  </div>
                  <span className="absolute top-4 right-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-gradient-to-r from-brand to-brand-2 text-white opacity-0 shadow-lg transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight className="h-4.5 w-4.5" />
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-white transition group-hover:text-gradient">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{p.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-full bg-white/6 px-3 py-1 text-xs text-white/60">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                </TiltCard>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        <Reveal delay={0.15} className="mt-12 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-7 py-3.5 font-semibold text-white transition hover:border-brand/50 hover:bg-white/10"
          >
            Want something like this? Let's talk
            <ArrowUpRight className="h-4.5 w-4.5" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
