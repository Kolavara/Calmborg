"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  company,
  companyProfile,
  whyChooseUs,
  stats,
  productCategories,
  industries,
} from "@/lib/data";
import { ArrowRight,
  CheckCircle,
  Headphones,
  IndianRupee,
  Truck,
  Shield,
  Users,
  HeartHandshake,
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
  Settings,
  Gauge,
  Award,
  Clock,
  Star,
  CircleDot } from "lucide-react";

/* ─── Animated Counter ─── */
function AnimatedStat({
  value,
  label,
  description,
}: {
  value: string;
  label: string;
  description: string;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const numericPart = parseInt(value.replace(/[^0-9]/g, ""));
  const suffix = value.replace(/[0-9]/g, "");
  const [count, setCount] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const end = numericPart;
    const duration = 1500;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [visible, numericPart]);

  return (
    <div ref={ref} className="text-center">
      <div className="mb-2 font-mono text-4xl font-bold text-[var(--accent)] md:text-5xl">
        {count}
        {suffix}
      </div>
      <div className="mb-1 text-sm font-bold uppercase tracking-wider text-[var(--foreground)]">
        {label}
      </div>
      <div className="text-[13px] text-[var(--dark-text-muted)]">{description}</div>
    </div>
  );
}

/* ─── Icon Map ─── */
const iconMap: Record<string, React.ElementType> = {
  CheckCircle,
  Headphones,
  IndianRupee,
  Truck,
  Shield,
  Users,
  HeartHandshake,
  Car,
  Plane,
  Box,
  HeartPulse,
  Zap,
  Target,
  Cpu,
  Wrench,
};

/* ─── Hero Slides (module scope) ─── */
const heroSlides = [
  "Precision Cutting Tools",
  "Tool Holding Systems",
  "CNC Accessories",
  "Indexable Inserts",
];

/* ─── Page ─── */
export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative">
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative overflow-hidden py-16 md:py-24 lg:py-32">
        {/* Blueprint grid background */}
        <div className="absolute inset-0 blueprint-grid opacity-40" />
        
        {/* Radial lighting hotspot */}
        <div
          className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: Text Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-[var(--muted)] px-4 py-2 shadow-[var(--shadow-card)]">
                <div className="led led-green animate-pulse-glow" />
                <span className="font-mono text-[13px] uppercase tracking-widest text-[var(--text-muted)]">
                  Trusted by 200+ manufacturers across India
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl">
                Precision Tooling{" "}
                <span className="text-[var(--accent)]">Solutions</span> for
                Modern{" "}
                <span className="relative inline-block">
                  Manufacturing
                </span>
                <span className="animate-blink-cursor ml-2 inline-block h-[0.85em] w-[5px] translate-y-[0.08em]" />
              </h1>

              {/* Rotating subtitle */}
              <div className="h-8 overflow-hidden">
                <div className="flex items-center gap-2 text-lg text-[var(--text-muted)]">
                  <Settings size={18} className="text-[var(--accent)]" />
                  <span className="font-mono text-sm uppercase tracking-wider">
                    Specializing in
                  </span>
                  <span className="font-semibold text-[var(--foreground)] transition-all">
                    {heroSlides[currentSlide]}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="max-w-lg text-base leading-relaxed text-[var(--text-muted)] lg:text-lg">
                {companyProfile.description.split("\n")[0]}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/products"
                  className="group flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-[4px_4px_12px_rgba(255,71,87,0.35),-4px_-4px_12px_rgba(255,100,110,0.35)] transition-all duration-150 hover:translate-y-[2px] hover:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.2)]"
                >
                  Explore Products
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
                <Link
                  href="/contact#rfq"
                  className="flex items-center justify-center gap-2 rounded-xl bg-[var(--muted)] px-8 py-4 text-sm font-bold uppercase tracking-wider text-[var(--foreground)] shadow-[var(--shadow-card)] transition-all duration-150 hover:translate-y-[2px] hover:shadow-[var(--shadow-pressed)]"
                >
                  Request a Quote
                  <ChevronRight size={16} />
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 text-[13px] text-[var(--text-muted)]">
                <div className="flex items-center gap-2">
                  <Award size={14} className="text-[var(--accent)]" />
                  <span className="font-mono uppercase tracking-wider">
                    30+ Years
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield size={14} className="text-[var(--accent)]" />
                  <span className="font-mono uppercase tracking-wider">
                    Genuine Products
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-[var(--accent)]" />
                  <span className="font-mono uppercase tracking-wider">
                    Quick Delivery
                  </span>
                </div>
              </div>
            </div>

            {/* Right: 3D Device Mockup */}
            <div className="relative hidden lg:flex items-center justify-center">
              <div className="relative">
                {/* Outer Bezel */}
                <div className="relative w-[380px] rounded-2xl bg-[var(--dark-bg)] p-3 shadow-[16px_16px_32px_rgba(0,0,0,0.2),-8px_-8px_24px_rgba(255,255,255,0.05)] carbon-fiber">
                  {/* Vent Slots */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <div className="vent-slots">
                      <div />
                      <div />
                      <div />
                    </div>
                  </div>

                  {/* Screen */}
                  <div className="relative overflow-hidden rounded-xl bg-[#1a1a2e] p-6">
                    {/* Scanlines */}
                    <div className="absolute inset-0 scanlines opacity-30" />

                    {/* Screen Content */}
                    <div className="relative space-y-4">
                      {/* Status Bar */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="led led-green" />
                          <span className="font-mono text-[12px] uppercase tracking-widest text-green-400">
                            Online
                          </span>
                        </div>
                        <span className="font-mono text-[12px] text-gray-500">
                          SYS v3.0
                        </span>
                      </div>

                      {/* Dashboard Panel */}
                      <div className="rounded-lg bg-white/5 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                        <div className="mb-3 font-mono text-[12px] uppercase tracking-widest text-gray-400">
                          Tool Inventory Status
                        </div>
                        <div className="space-y-2">
                          {[
                            { label: "End Mills", pct: 92, color: "#22c55e" },
                            { label: "Inserts", pct: 87, color: "#3b82f6" },
                            { label: "Tool Holders", pct: 78, color: "#f59e0b" },
                            { label: "Accessories", pct: 95, color: "#22c55e" },
                          ].map((item) => (
                            <div key={item.label}>
                              <div className="mb-1 flex justify-between">
                                <span className="font-mono text-[12px] text-gray-300">
                                  {item.label}
                                </span>
                                <span className="font-mono text-[12px] text-white">
                                  {item.pct}%
                                </span>
                              </div>
                              <div className="h-1.5 rounded-full bg-white/10">
                                <div
                                  className="h-full rounded-full transition-all duration-1000"
                                  style={{
                                    width: `${item.pct}%`,
                                    backgroundColor: item.color,
                                    boxShadow: `0 0 8px ${item.color}80`,
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Metrics Row */}
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { label: "Products", val: "500+" },
                          { label: "Clients", val: "200+" },
                          { label: "Brands", val: "15+" },
                        ].map((m) => (
                          <div
                            key={m.label}
                            className="rounded-lg bg-white/5 p-2 text-center"
                          >
                            <div className="font-mono text-sm font-bold text-[var(--accent)]">
                              {m.val}
                            </div>
                            <div className="font-mono text-[8px] uppercase tracking-wider text-gray-500">
                              {m.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Hardware Details: Power LED + Screw */}
                  <div className="absolute bottom-5 left-4 flex items-center gap-2">
                    <div className="led led-green" />
                    <span className="font-mono text-[8px] uppercase tracking-wider text-gray-500">
                      PWR
                    </span>
                  </div>
                </div>

                {/* Floating Badge */}
                <div className="absolute -right-6 -top-6 rounded-xl bg-[var(--accent)] px-4 py-3 shadow-[4px_4px_12px_rgba(255,71,87,0.4)]">
                  <div className="flex items-center gap-2">
                    <Star size={14} className="text-white" />
                    <div>
                      <div className="font-mono text-[13px] font-bold text-white">
                        30+ Years
                      </div>
                      <div className="font-mono text-[8px] uppercase tracking-wider text-white/70">
                        Experience
                      </div>
                    </div>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ STATS BAR ═══════════════ */}
      <section className="relative py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-[var(--dark-bg)] p-8 md:p-12 shadow-[var(--shadow-card)] carbon-fiber relative overflow-hidden">
            {/* Scanline overlay */}
            <div className="absolute inset-0 scanlines opacity-20" />
            
            <div className="relative grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat) => (
                <AnimatedStat
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  description={stat.description}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ WHY CHOOSE US ═══════════════ */}
      <section className="relative py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full bg-[var(--muted)] px-4 py-1.5 font-mono text-[12px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] shadow-[var(--shadow-card)]">
              Why Calm Borg
            </span>
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-[var(--foreground)] md:text-4xl">
              Trusted by{" "}
              <span className="text-[var(--accent)]">200+</span> Manufacturers
            </h2>
            <p className="mx-auto max-w-2xl text-base text-[var(--text-muted)]">
              {companyProfile.mission}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((feature) => {
              const Icon = iconMap[feature.icon] || CheckCircle;
              return (
                <div
                  key={feature.title}
                  className="group relative rounded-2xl bg-[var(--background)] p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-floating)]"
                >
                  {/* Corner Screws */}
                  <div className="absolute left-3 top-3 h-2 w-2 rounded-full bg-[var(--muted)] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.15),inset_-1px_-1px_1px_rgba(255,255,255,0.3)]" />
                  <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-[var(--muted)] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.15),inset_-1px_-1px_1px_rgba(255,255,255,0.3)]" />

                  {/* Icon */}
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--background)] shadow-[var(--shadow-floating)] transition-all duration-300 group-hover:shadow-[var(--shadow-glow)]">
                    <Icon
                      size={26}
                      className="text-[var(--accent)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
                    />
                  </div>

                  <h3 className="mb-2 text-base font-bold text-[var(--foreground)]">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ PRODUCT CATEGORIES ═══════════════ */}
      <section className="relative py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full bg-[var(--muted)] px-4 py-1.5 font-mono text-[12px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] shadow-[var(--shadow-card)]">
              Our Products
            </span>
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-[var(--foreground)] md:text-4xl">
              Complete Tooling Solutions
            </h2>
            <p className="mx-auto max-w-2xl text-base text-[var(--text-muted)]">
              Comprehensive portfolio of cutting tools and accessories designed
              to improve machining performance, productivity, and tool life.
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {productCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/products#${cat.id}`}
                className="group relative rounded-2xl bg-[var(--background)] p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-floating)]"
              >
                {/* Vent Slots */}
                <div className="absolute right-3 top-3">
                  <div className="vent-slots">
                    <div />
                    <div />
                  </div>
                </div>

                {/* Category Icon */}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)] shadow-[3px_3px_8px_rgba(255,71,87,0.3)]">
                  <CircleDot size={20} className="text-white" />
                </div>

                <h3 className="mb-2 text-lg font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                  {cat.title}
                </h3>
                <p className="mb-4 text-sm text-[var(--text-muted)]">
                  {cat.subtitle}
                </p>

                {/* Product Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {cat.products.slice(0, 4).map((p) => (
                    <span
                      key={p}
                      className="rounded-md bg-[var(--muted)] px-2 py-1 font-mono text-[12px] text-[var(--text-muted)]"
                    >
                      {p}
                    </span>
                  ))}
                  {cat.products.length > 4 && (
                    <span className="rounded-md bg-[var(--accent)]/10 px-2 py-1 font-mono text-[12px] text-[var(--accent)]">
                      +{cat.products.length - 4} more
                    </span>
                  )}
                </div>

                {/* Hover Arrow */}
                <div className="absolute bottom-6 right-6 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
                  <ArrowRight size={18} className="text-[var(--accent)]" />
                </div>
              </Link>
            ))}
          </div>

          {/* View All CTA */}
          <div className="mt-10 text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--muted)] px-8 py-4 text-sm font-bold uppercase tracking-wider text-[var(--foreground)] shadow-[var(--shadow-card)] transition-all duration-150 hover:translate-y-[2px] hover:shadow-[var(--shadow-pressed)]"
            >
              View All Products
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ INDUSTRIES ═══════════════ */}
      <section className="relative py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full bg-[var(--muted)] px-4 py-1.5 font-mono text-[12px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] shadow-[var(--shadow-card)]">
              Industries We Serve
            </span>
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-[var(--foreground)] md:text-4xl">
              Serving Key Manufacturing Sectors
            </h2>
          </div>

          {/* Industries Grid */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {industries.map((ind, index) => {
              const Icon = iconMap[ind.icon] || Wrench;
              const isOrphan = index === 8;
              
              return (
                <div key={ind.id} className={isOrphan ? "col-span-2 flex justify-center sm:col-span-1 sm:block lg:col-span-4 lg:flex lg:justify-center" : "h-full"}>
                  <Link
                    href={`/industries#${ind.id}`}
                    className={`group flex h-full flex-col items-center rounded-2xl bg-[var(--background)] p-6 text-center shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-floating)] ${isOrphan ? "w-full sm:max-w-none lg:max-w-[280px]" : "w-full"}`}
                  >
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--muted)] shadow-[var(--shadow-card)] transition-all duration-300 group-hover:bg-[var(--accent)] group-hover:shadow-[var(--shadow-glow)]">
                      <Icon
                        size={22}
                        className="text-[var(--text-muted)] transition-colors group-hover:text-white"
                      />
                    </div>
                    <h3 className="text-sm font-bold text-[var(--foreground)]">
                      {ind.title}
                    </h3>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="relative py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-[var(--background)] p-8 md:p-16 shadow-[var(--shadow-card)]">
            {/* Corner Screws */}
            <div className="absolute left-4 top-4 h-2.5 w-2.5 rounded-full bg-[var(--muted)] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.15),inset_-1px_-1px_1px_rgba(255,255,255,0.3)]" />
            <div className="absolute right-4 top-4 h-2.5 w-2.5 rounded-full bg-[var(--muted)] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.15),inset_-1px_-1px_1px_rgba(255,255,255,0.3)]" />
            <div className="absolute bottom-4 left-4 h-2.5 w-2.5 rounded-full bg-[var(--muted)] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.15),inset_-1px_-1px_1px_rgba(255,255,255,0.3)]" />
            <div className="absolute bottom-4 right-4 h-2.5 w-2.5 rounded-full bg-[var(--muted)] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.15),inset_-1px_-1px_1px_rgba(255,255,255,0.3)]" />

            <div className="relative grid items-center gap-8 md:grid-cols-2">
              <div>
                <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-[var(--foreground)] md:text-4xl">
                  Ready to Optimize Your{" "}
                  <span className="text-[var(--accent)]">Machining</span>?
                </h2>
                <p className="mb-6 max-w-lg text-base text-[var(--text-muted)]">
                  Send us your component drawing, material details, and machine
                  information to receive expert tooling recommendations.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/contact#rfq"
                    className="flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-[4px_4px_12px_rgba(255,71,87,0.35),-4px_-4px_12px_rgba(255,100,110,0.35)] transition-all duration-150 hover:translate-y-[2px] hover:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.2)]"
                  >
                    Request a Quote
                    <ArrowRight size={16} />
                  </Link>
                  <a
                    href={`https://wa.me/${company.whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-[3px_3px_8px_rgba(37,211,102,0.3)] transition-all duration-150 hover:translate-y-[2px]"
                  >
                    <MessageCircle size={16} />
                    WhatsApp Us
                  </a>
                </div>
              </div>

              {/* Contact Info Panel */}
              <div className="rounded-xl bg-[var(--dark-bg)] p-6 shadow-[var(--shadow-card)] carbon-fiber relative overflow-hidden">
                <div className="absolute inset-0 scanlines opacity-20" />
                <div className="relative space-y-4">
                  <h3 className="mb-4 font-mono text-[13px] uppercase tracking-widest text-white/60">
                    Get In Touch
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
                      <Gauge size={14} className="text-[var(--accent)]" />
                    </div>
                    {company.email}
                  </a>
                  <div className="flex items-start gap-3 text-sm text-gray-300">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5">
                      <MessageCircle size={14} className="text-[var(--accent)]" />
                    </div>
                    WhatsApp for instant responses
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
