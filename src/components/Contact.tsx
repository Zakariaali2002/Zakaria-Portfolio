import { useState, useRef } from "react";
import type { FormEvent } from "react";
import { Mail, MapPin, Phone, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import Reveal from "./Reveal";

const API_URL = "https://zakaria-portfolio-backend-58qz.vercel.app/api/contact";

const info = [
  { icon: Mail, label: "Email", value: "zakriaali452@gmail.com" },
  { icon: Phone, label: "Phone / WhatsApp", value: "+92 318 2705359" },
  { icon: MapPin, label: "Location", value: "Karachi, Pakistan" },
];

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      setSent(true);
      form.reset();
      setTimeout(() => setSent(false), 4000);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to send message. Please try again.";
      setError(msg);
      console.error("Contact form error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-brand/10 blur-[160px]" />

      <div className="relative mx-auto max-w-6xl px-5">
        <Reveal className="text-center">
          <p className="mb-3 text-sm font-semibold tracking-[0.25em] text-brand uppercase">Contact</p>
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Let's build something <span className="text-gradient">amazing together</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/60">
            Have a project in mind? Drop me a message and I'll get back to you within 24 hours.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <Reveal delay={0.1} direction="left">
            <div className="flex h-full flex-col gap-4">
              {info.map((i) => (
                <div
                  key={i.label}
                  className="flex items-center gap-4 rounded-2xl border border-line bg-card p-5 transition hover:border-brand/40"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand/25 to-brand-2/25 text-brand">
                    <i.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50">{i.label}</p>
                    <p className="font-medium text-white">{i.value}</p>
                  </div>
                </div>
              ))}

              <div className="relative mt-2 flex-1 overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-brand/20 via-card to-brand-2/15 p-6">
                <p className="font-display text-xl font-semibold text-white">
                  Prefer a quick chat? <span className="text-gradient">Let's hop on a call.</span>
                </p>
                <p className="mt-2 text-sm text-white/60">
                  Free 15-minute discovery call to discuss your project — no strings attached.
                </p>
                <span className="animate-spin-slow absolute -right-8 -bottom-8 text-7xl opacity-20">✦</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2} direction="right">
            <form ref={formRef} onSubmit={handleSubmit} className="rounded-3xl border border-line bg-card p-7 sm:p-9">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-white/70">
                    Your Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    placeholder="John Doe"
                    className="w-full rounded-xl border border-line bg-white/5 px-4 py-3 text-white placeholder-white/30 transition outline-none focus:border-brand/60 focus:bg-white/8"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-white/70">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="w-full rounded-xl border border-line bg-white/5 px-4 py-3 text-white placeholder-white/30 transition outline-none focus:border-brand/60 focus:bg-white/8"
                  />
                </div>
              </div>
              <div className="mt-5">
                <label htmlFor="subject" className="mb-2 block text-sm font-medium text-white/70">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  required
                  placeholder="Project inquiry"
                  className="w-full rounded-xl border border-line bg-white/5 px-4 py-3 text-white placeholder-white/30 transition outline-none focus:border-brand/60 focus:bg-white/8"
                />
              </div>
              <div className="mt-5">
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-white/70">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="w-full resize-none rounded-xl border border-line bg-white/5 px-4 py-3 text-white placeholder-white/30 transition outline-none focus:border-brand/60 focus:bg-white/8"
                />
              </div>

              {error && (
                <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  <AlertCircle className="h-4.5 w-4.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-shine mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand to-brand-2 px-7 py-4 font-semibold text-white shadow-xl shadow-brand/30 transition hover:shadow-brand/50 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" /> Sending...
                  </>
                ) : sent ? (
                  <>
                    <CheckCircle2 className="h-5 w-5" /> Message Sent!
                  </>
                ) : (
                  <>
                    <Send className="h-4.5 w-4.5" /> Send Message
                  </>
                )}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}