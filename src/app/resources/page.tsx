"use client";

import { useState } from "react";
import Link from "next/link";
import { resources, company } from "@/lib/data";
import {
  BookOpen,
  Calculator,
  FileText,
  Download,
  Library,
  Layers,
  ArrowRight,
  Search,
  ChevronRight,
  MessageCircle,
  Phone,
  Mail,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  BookOpen,
  Calculator,
  FileText,
  Download,
  Library,
  Layers,
};

export default function ResourcesPage() {
  const [filter, setFilter] = useState<string>("all");

  const filteredResources =
    filter === "all"
      ? resources
      : resources.filter((r) => r.type.toLowerCase() === filter.toLowerCase());

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
                Technical Resources
              </span>
            </div>
            <h1 className="mb-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl">
              Knowledge Base &{" "}
              <span className="text-[var(--accent)]">Tools</span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-[var(--text-muted)]">
              Access our collection of technical guides, calculators, and
              reference materials to optimize your machining operations.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════ FILTER TABS ═══════════════ */}
      <section className="relative pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            {["all", "guide", "calculator", "reference", "download"].map(
              (type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`rounded-xl px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                    filter === type
                      ? "bg-[var(--accent)] text-white shadow-[3px_3px_8px_rgba(255,71,87,0.3)]"
                      : "bg-[var(--muted)] text-[var(--text-muted)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-pressed)]"
                  }`}
                >
                  {type === "all" ? "All Resources" : type}
                </button>
              )
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════ RESOURCES GRID ═══════════════ */}
      <section className="relative py-8 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredResources.map((resource) => {
              const Icon = iconMap[resource.icon] || FileText;
              return (
                <div
                  key={resource.id}
                  className="group relative rounded-2xl bg-[var(--background)] p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-floating)]"
                >
                  {/* Corner Screws */}
                  <div className="absolute left-3 top-3 h-2 w-2 rounded-full bg-[var(--muted)] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.15),inset_-1px_-1px_1px_rgba(255,255,255,0.3)]" />
                  <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-[var(--muted)] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.15),inset_-1px_-1px_1px_rgba(255,255,255,0.3)]" />

                  {/* Type Badge */}
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--background)] shadow-[var(--shadow-floating)] transition-all duration-300 group-hover:shadow-[var(--shadow-glow)]">
                      <Icon
                        size={26}
                        className="text-[var(--accent)] transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <span className="rounded-full bg-[var(--muted)] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                      {resource.type}
                    </span>
                  </div>

                  <h3 className="mb-2 text-lg font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                    {resource.title}
                  </h3>
                  <p className="mb-6 text-sm leading-relaxed text-[var(--text-muted)]">
                    {resource.description}
                  </p>

                  {/* Action Button */}
                  <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--muted)] px-5 py-3 text-sm font-bold uppercase tracking-wider text-[var(--foreground)] shadow-[var(--shadow-card)] transition-all duration-150 hover:translate-y-[1px] hover:shadow-[var(--shadow-pressed)] hover:text-[var(--accent)]">
                    {resource.type === "Download" ? (
                      <>
                        <Download size={14} />
                        Download
                      </>
                    ) : resource.type === "Calculator" ? (
                      <>
                        <Calculator size={14} />
                        Open Calculator
                      </>
                    ) : (
                      <>
                        <BookOpen size={14} />
                        View Guide
                      </>
                    )}
                    <ChevronRight size={14} />
                  </button>
                </div>
              );
            })}
          </div>

          {filteredResources.length === 0 && (
            <div className="py-16 text-center">
              <div className="mb-4 text-6xl">📚</div>
              <h3 className="mb-2 text-xl font-bold text-[var(--foreground)]">
                No resources found
              </h3>
              <p className="text-[var(--text-muted)]">
                Try selecting a different category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════ SPEED & FEED CALCULATOR ═══════════════ */}
      <section className="relative py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl bg-[var(--background)] p-6 shadow-[var(--shadow-card)] md:p-8">
            {/* Corner Screws */}
            <div className="absolute left-3 top-3 h-2 w-2 rounded-full bg-[var(--muted)] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.15),inset_-1px_-1px_1px_rgba(255,255,255,0.3)]" />
            <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-[var(--muted)] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.15),inset_-1px_-1px_1px_rgba(255,255,255,0.3)]" />

            <div className="mb-8 text-center">
              <span className="mb-3 inline-block rounded-full bg-[var(--muted)] px-4 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] shadow-[var(--shadow-card)]">
                Quick Reference
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)] md:text-4xl">
                Speed & Feed{" "}
                <span className="text-[var(--accent)]">Calculator</span>
              </h2>
            </div>

            <div className="mx-auto max-w-2xl">
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                    Material
                  </label>
                  <select className="w-full rounded-xl bg-[var(--background)] px-4 py-3.5 font-mono text-sm text-[var(--foreground)] shadow-[var(--shadow-recessed)] focus:shadow-[var(--shadow-recessed),0_0_0_2px_var(--accent)] focus:outline-none">
                    <option>Steel (P)</option>
                    <option>Stainless Steel (M)</option>
                    <option>Cast Iron (K)</option>
                    <option>Aluminum (N)</option>
                    <option>Titanium (S)</option>
                    <option>Hardened (H)</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                    Operation
                  </label>
                  <select className="w-full rounded-xl bg-[var(--background)] px-4 py-3.5 font-mono text-sm text-[var(--foreground)] shadow-[var(--shadow-recessed)] focus:shadow-[var(--shadow-recessed),0_0_0_2px_var(--accent)] focus:outline-none">
                    <option>Roughing</option>
                    <option>Semi-Finishing</option>
                    <option>Finishing</option>
                    <option>High-Speed</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                    Tool Diameter
                  </label>
                  <input
                    type="number"
                    placeholder="mm"
                    className="w-full rounded-xl bg-[var(--background)] px-4 py-3.5 font-mono text-sm text-[var(--foreground)] shadow-[var(--shadow-recessed)] placeholder:text-[var(--text-muted)]/50 focus:shadow-[var(--shadow-recessed),0_0_0_2px_var(--accent)] focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-xl bg-[var(--dark-bg)] p-4 text-center">
                  <div className="font-mono text-lg font-bold text-[var(--accent)]">
                    250
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-wider text-gray-400">
                    RPM
                  </div>
                </div>
                <div className="rounded-xl bg-[var(--dark-bg)] p-4 text-center">
                  <div className="font-mono text-lg font-bold text-[var(--accent)]">
                    0.15
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-wider text-gray-400">
                    Feed/Tooth
                  </div>
                </div>
                <div className="rounded-xl bg-[var(--dark-bg)] p-4 text-center">
                  <div className="font-mono text-lg font-bold text-[var(--accent)]">
                    118
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-wider text-gray-400">
                    mm/min
                  </div>
                </div>
                <div className="rounded-xl bg-[var(--dark-bg)] p-4 text-center">
                  <div className="font-mono text-lg font-bold text-green-500">
                    Optimal
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-wider text-gray-400">
                    Status
                  </div>
                </div>
              </div>

              <p className="mt-4 text-center text-xs text-[var(--text-muted)]">
                * These are general guidelines. Contact our team for
                application-specific recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ NEED HELP ═══════════════ */}
      <section className="relative py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-[var(--dark-bg)] p-8 md:p-16 shadow-[var(--shadow-card)] carbon-fiber relative overflow-hidden text-center">
            <div className="absolute inset-0 scanlines opacity-20" />
            <div className="relative">
              <h2 className="mb-4 text-3xl font-extrabold text-white md:text-4xl">
                Need <span className="text-[var(--accent)]">Expert</span> Guidance?
              </h2>
              <p className="mx-auto mb-8 max-w-xl text-gray-300">
                Our technical team is ready to help you select the right tools,
                optimize cutting parameters, and solve machining challenges.
              </p>
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/contact#rfq"
                  className="flex items-center gap-2 rounded-xl bg-[var(--accent)] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-[4px_4px_12px_rgba(255,71,87,0.35)] transition-all duration-150 hover:translate-y-[2px]"
                >
                  Contact Our Team
                  <ArrowRight size={16} />
                </Link>
                <a
                  href={`https://wa.me/${company.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl bg-[#25D366] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all duration-150 hover:translate-y-[2px]"
                >
                  <MessageCircle size={16} />
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
