"use client";

import Link from "next/link";
import { industries, company } from "@/lib/data";
import {
  ArrowRight,
  ChevronRight,
  Car,
  Plane,
  Box,
  HeartPulse,
  Zap,
  Target,
  Cpu,
  Wrench,
  MessageCircle,
  Phone,
  MapPin,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Car,
  Plane,
  Box,
  HeartPulse,
  Zap,
  Target,
  Cpu,
  Wrench,
};

export default function IndustriesPage() {
  return (
    <div className="relative">
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 blueprint-grid opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--muted)] px-4 py-2 shadow-[var(--shadow-card)]">
              <div className="led led-green animate-pulse-glow" />
              <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--text-muted)]">
                Industries We Serve
              </span>
            </div>
            <h1 className="mb-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl">
              Precision Tooling for{" "}
              <span className="text-[var(--accent)]">Every Sector</span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-[var(--text-muted)]">
              From automotive and aerospace to medical devices and general
              engineering, our tooling solutions are trusted across the
              manufacturing spectrum.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════ INDUSTRY CARDS ═══════════════ */}
      <section className="relative py-8 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {industries.map((ind, index) => {
              const Icon = iconMap[ind.icon] || Wrench;
              const isEven = index % 2 === 0;
              return (
                <div
                  key={ind.id}
                  id={ind.id}
                  className="relative scroll-mt-32 rounded-2xl bg-[var(--background)] p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:shadow-[var(--shadow-floating)] md:p-8"
                >
                  {/* Corner Screws */}
                  <div className="absolute left-3 top-3 h-2 w-2 rounded-full bg-[var(--muted)] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.15),inset_-1px_-1px_1px_rgba(255,255,255,0.3)]" />
                  <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-[var(--muted)] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.15),inset_-1px_-1px_1px_rgba(255,255,255,0.3)]" />

                  <div className={`relative grid gap-8 md:grid-cols-2 md:items-center ${isEven ? "" : "md:[direction:rtl]"}`}>
                    {/* Content */}
                    <div className={isEven ? "" : "md:[direction:ltr]"}>
                      <div className="mb-4 flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[var(--accent)] shadow-[3px_3px_8px_rgba(255,71,87,0.3)]">
                          <Icon size={28} className="text-white" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-extrabold text-[var(--foreground)]">
                            {ind.title}
                          </h2>
                        </div>
                      </div>

                      <p className="mb-6 max-w-lg text-base leading-relaxed text-[var(--text-muted)]">
                        {ind.description}
                      </p>

                      <Link
                        href="/contact#rfq"
                        className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-[3px_3px_8px_rgba(255,71,87,0.3)] transition-all duration-150 hover:translate-y-[2px] hover:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2)]"
                      >
                        Discuss Your Needs
                        <ArrowRight size={14} />
                      </Link>
                    </div>

                    {/* Applications Grid */}
                    <div className={`${isEven ? "" : "md:[direction:ltr]"}`}>
                      <h4 className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                        Key Applications
                      </h4>
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {ind.applications.map((app) => (
                          <div
                            key={app}
                            className="flex items-center gap-2 rounded-lg bg-[var(--muted)] px-3 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]"
                          >
                            <ChevronRight
                              size={12}
                              className="shrink-0 text-[var(--accent)]"
                            />
                            <span className="text-xs font-medium text-[var(--foreground)]">
                              {app}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ INDUSTRIES QUICK GRID ═══════════════ */}
      <section className="relative py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-[var(--dark-bg)] p-8 md:p-12 shadow-[var(--shadow-card)] carbon-fiber relative overflow-hidden">
            <div className="absolute inset-0 scanlines opacity-20" />
            <div className="relative text-center">
              <h2 className="mb-8 text-2xl font-extrabold text-white md:text-3xl">
                Cross-Industry Expertise
              </h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {industries.map((ind) => {
                  const Icon = iconMap[ind.icon] || Wrench;
                  return (
                    <div
                      key={ind.id}
                      className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-3"
                    >
                      <Icon size={16} className="text-[var(--accent)]" />
                      <span className="text-xs font-medium text-gray-300">
                        {ind.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="relative py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-[var(--background)] p-8 md:p-16 shadow-[var(--shadow-card)] relative">
            <div className="absolute left-3 top-3 h-2 w-2 rounded-full bg-[var(--muted)] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.15),inset_-1px_-1px_1px_rgba(255,255,255,0.3)]" />
            <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-[var(--muted)] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.15),inset_-1px_-1px_1px_rgba(255,255,255,0.3)]" />

            <div className="grid items-center gap-8 md:grid-cols-2">
              <div>
                <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-[var(--foreground)] md:text-4xl">
                  Your Industry.{" "}
                  <span className="text-[var(--accent)]">Our Expertise.</span>
                </h2>
                <p className="mb-6 text-[var(--text-muted)]">
                  Every industry has unique machining challenges. Our team has
                  the experience and product range to match the right tooling
                  solution to your specific application.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/contact#rfq"
                    className="flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-[4px_4px_12px_rgba(255,71,87,0.35)] transition-all duration-150 hover:translate-y-[2px] hover:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.2)]"
                  >
                    Request a Quote
                    <ArrowRight size={16} />
                  </Link>
                  <a
                    href={`https://wa.me/${company.whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all duration-150 hover:translate-y-[2px]"
                  >
                    <MessageCircle size={16} />
                    WhatsApp Us
                  </a>
                </div>
              </div>

              <div className="rounded-xl bg-[var(--dark-bg)] p-6 shadow-[var(--shadow-card)] carbon-fiber relative overflow-hidden">
                <div className="absolute inset-0 scanlines opacity-20" />
                <div className="relative space-y-4">
                  <h3 className="mb-2 font-mono text-xs uppercase tracking-widest text-white/60">
                    Contact Info
                  </h3>
                  <a
                    href={`tel:${company.phone}`}
                    className="flex items-center gap-3 text-sm text-gray-300 transition-colors hover:text-white"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5">
                      <Phone size={14} className="text-[var(--accent)]" />
                    </div>
                    {company.phone}
                  </a>
                  <a
                    href={`mailto:${company.email}`}
                    className="flex items-center gap-3 text-sm text-gray-300 transition-colors hover:text-white"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5">
                      <MessageCircle size={14} className="text-[var(--accent)]" />
                    </div>
                    {company.email}
                  </a>
                  <div className="flex items-start gap-3 text-sm text-gray-300">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5">
                      <MapPin size={14} className="text-[var(--accent)]" />
                    </div>
                    <span className="leading-relaxed">{company.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
