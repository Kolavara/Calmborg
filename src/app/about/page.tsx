"use client";

import Link from "next/link";
import {
  company,
  companyProfile,
  founder,
  whyChooseUs,
  stats,
  industries,
} from "@/lib/data";
import { ArrowRight,
  CheckCircle,
  Target,
  Eye,
  Heart,
  Shield,
  Award,
  Users,
  TrendingUp,
  HeartHandshake,
  ChevronRight,
  Car,
  Plane,
  Box,
  HeartPulse,
  Zap,
  Cpu,
  Wrench,
  Quote, Download } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  CheckCircle,
  Headphones: Shield,
  IndianRupee: TrendingUp,
  Truck: Award,
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

const valueIcons = [Heart, Target, TrendingUp, Shield, Award, HeartHandshake];

export default function AboutPage() {
  return (
    <div className="relative">
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 blueprint-grid opacity-30" />
        <div
          className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(255,71,255,0.3) 0%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--muted)] px-4 py-2 shadow-[var(--shadow-card)]">
              <div className="led led-green animate-pulse-glow" />
              <span className="font-mono text-[13px] uppercase tracking-widest text-[var(--text-muted)]">
                About Calm Borg
              </span>
            </div>
            <h1 className="mb-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl">
              Building the Future of{" "}
              <span className="text-[var(--accent)]">Precision</span>{" "}
              Manufacturing
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-[var(--text-muted)]">
              {companyProfile.description.split("\n")[0]}
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════ COMPANY STORY ═══════════════ */}
      <section className="relative py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: Story */}
            <div className="space-y-6">
              <span className="mb-3 inline-block rounded-full bg-[var(--muted)] px-4 py-1.5 font-mono text-[12px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] shadow-[var(--shadow-card)]">
                Our Story
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)] md:text-4xl">
                {company.yearsExperience}+ Years of{" "}
                <span className="text-[var(--accent)]">Excellence</span>
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-[var(--text-muted)]">
                {companyProfile.description.split("\n\n").map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Right: Founder Card */}
            <div className="space-y-6">
              {/* Founder Card */}
              <div className="relative rounded-2xl bg-[var(--background)] p-8 shadow-[var(--shadow-card)]">
                <div className="absolute left-3 top-3 h-2 w-2 rounded-full bg-[var(--muted)] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.15),inset_-1px_-1px_1px_rgba(255,255,255,0.3)]" />
                <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-[var(--muted)] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.15),inset_-1px_-1px_1px_rgba(255,255,255,0.3)]" />

                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--dark-bg)] shadow-[var(--shadow-floating)]">
                    <Users size={28} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--foreground)]">
                      {founder.name}
                    </h3>

                  </div>
                </div>

                <div className="relative rounded-xl bg-[var(--dark-bg)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] carbon-fiber">
                  <Quote size={24} className="mb-3 text-[var(--accent)] opacity-60" />
                  <p className="text-sm leading-relaxed text-gray-300">
                    {founder.bio}
                  </p>
                </div>
              </div>

              {/* Stats Mini */}
              <div className="grid grid-cols-2 gap-4">
                {stats.slice(0, 2).map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl bg-[var(--background)] p-6 text-center shadow-[var(--shadow-card)]"
                  >
                    <div className="mb-1 font-mono text-3xl font-bold text-[var(--accent)]">
                      {stat.value}
                    </div>
                    <div className="text-sm font-bold text-[var(--foreground)]">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ MISSION / VISION ═══════════════ */}
      <section className="relative py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Mission */}
            <div className="relative rounded-2xl bg-[var(--background)] p-8 shadow-[var(--shadow-card)]">
              <div className="absolute left-3 top-3 h-2 w-2 rounded-full bg-[var(--muted)] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.15),inset_-1px_-1px_1px_rgba(255,255,255,0.3)]" />
              <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-[var(--muted)] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.15),inset_-1px_-1px_1px_rgba(255,255,255,0.3)]" />

              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--background)] shadow-[var(--shadow-floating)]">
                <Target size={28} className="text-[var(--accent)]" />
              </div>
              <h3 className="mb-4 text-2xl font-extrabold text-[var(--foreground)]">
                Our Mission
              </h3>
              <p className="text-base leading-relaxed text-[var(--text-muted)]">
                {companyProfile.mission}
              </p>
            </div>

            {/* Vision */}
            <div className="relative rounded-2xl bg-[var(--background)] p-8 shadow-[var(--shadow-card)]">
              <div className="absolute left-3 top-3 h-2 w-2 rounded-full bg-[var(--muted)] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.15),inset_-1px_-1px_1px_rgba(255,255,255,0.3)]" />
              <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-[var(--muted)] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.15),inset_-1px_-1px_1px_rgba(255,255,255,0.3)]" />

              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--background)] shadow-[var(--shadow-floating)]">
                <Eye size={28} className="text-[var(--accent)]" />
              </div>
              <h3 className="mb-4 text-2xl font-extrabold text-[var(--foreground)]">
                Our Vision
              </h3>
              <p className="text-base leading-relaxed text-[var(--text-muted)]">
                {companyProfile.vision}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ CORE VALUES ═══════════════ */}
      <section className="relative py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full bg-[var(--muted)] px-4 py-1.5 font-mono text-2xl font-extrabold uppercase tracking-[0.2em] text-[var(--text-muted)] shadow-[var(--shadow-card)]">
              Core Values
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)] md:text-4xl">
              What Drives Us Forward
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {companyProfile.values.map((value, i) => {
              const Icon = valueIcons[i % valueIcons.length];
              return (
                <div
                  key={value}
                  className="group relative rounded-2xl bg-[var(--background)] p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-floating)]"
                >
                  <div className="absolute left-3 top-3 h-2 w-2 rounded-full bg-[var(--muted)] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.15),inset_-1px_-1px_1px_rgba(255,255,255,0.3)]" />
                  <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-[var(--muted)] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.15),inset_-1px_-1px_1px_rgba(255,255,255,0.3)]" />

                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--background)] shadow-[var(--shadow-floating)] transition-all duration-300 group-hover:shadow-[var(--shadow-glow)]">
                    <Icon
                      size={26}
                      className="text-[var(--accent)] transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-[var(--foreground)]">
                    {value}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)]">
                    A foundational principle that guides every decision we make.
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ WHY CHOOSE US ═══════════════ */}
      <section className="relative py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full bg-[var(--muted)] px-4 py-1.5 font-mono text-2xl font-extrabold uppercase tracking-[0.2em] text-[var(--text-muted)] shadow-[var(--shadow-card)]">
              Why Choose Us
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)] md:text-4xl">
              The Calm Borg <span className="text-[var(--accent)]">Advantage</span>
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((feature) => {
              const Icon = iconMap[feature.icon] || CheckCircle;
              return (
                <div
                  key={feature.title}
                  className="group relative rounded-2xl bg-[var(--background)] p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-floating)]"
                >
                  <div className="absolute left-3 top-3 h-2 w-2 rounded-full bg-[var(--muted)] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.15),inset_-1px_-1px_1px_rgba(255,255,255,0.3)]" />
                  <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-[var(--muted)] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.15),inset_-1px_-1px_1px_rgba(255,255,255,0.3)]" />

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

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="relative py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-[var(--dark-bg)] p-8 md:p-16 shadow-[var(--shadow-card)] carbon-fiber relative overflow-hidden text-center">
            <div className="absolute inset-0 scanlines opacity-20" />
            <div className="relative">
              <h2 className="mb-4 text-3xl font-extrabold text-white md:text-4xl">
                Partner With <span className="text-[var(--accent)]">{company.name}</span>
              </h2>
              <p className="mx-auto mb-8 max-w-xl text-gray-300">
                Experience the difference that 30+ years of expertise makes.
                Let us help you optimize your machining operations.
              </p>
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/contact#rfq"
                  className="flex items-center gap-2 rounded-xl bg-[var(--accent)] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-[4px_4px_12px_rgba(255,71,87,0.35)] transition-all duration-150 hover:translate-y-[2px]"
                >
                  Get in Touch
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/products"
                  className="flex items-center gap-2 rounded-xl bg-white/10 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all duration-150 hover:bg-white/20"
                >
                  View Products
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
