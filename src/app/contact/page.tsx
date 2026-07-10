"use client";

import { useState } from "react";
import { company } from "@/lib/data";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  Clock,
  CheckCircle,
  ArrowRight,
  Building,
  Globe,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    product: "",
    material: "",
    quantity: "",
    machine: "",
    drawing: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
                Contact Us
              </span>
            </div>
            <h1 className="mb-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl">
              Let&apos;s Discuss Your{" "}
              <span className="text-[var(--accent)]">Tooling Needs</span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-[var(--text-muted)]">
              Send us your component drawing, material details, and machine
              information to receive expert tooling recommendations.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════ CONTACT INFO CARDS ═══════════════ */}
      <section className="relative pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Phone,
                label: "Call Us",
                value: company.phone,
                href: `tel:${company.phone}`,
              },
              {
                icon: Mail,
                label: "Email",
                value: company.email,
                href: `mailto:${company.email}`,
              },
              {
                icon: MessageCircle,
                label: "WhatsApp",
                value: "Chat Now",
                href: `https://wa.me/${company.whatsapp.replace(/[^0-9]/g, "")}`,
              },
              {
                icon: Clock,
                label: "Working Hours",
                value: "Mon–Sat, 9AM–6PM",
                href: "#",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="group flex items-center gap-4 rounded-2xl bg-[var(--background)] p-5 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-floating)]"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)] shadow-[3px_3px_8px_rgba(255,71,87,0.3)]">
                    <Icon size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                      {item.label}
                    </div>
                    <div className="text-sm font-bold text-[var(--foreground)]">
                      {item.value}
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ RFQ FORM + INFO ═══════════════ */}
      <section id="rfq" className="relative py-8 md:py-16 scroll-mt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-5">
            {/* RFQ Form */}
            <div className="lg:col-span-3">
              <div className="relative rounded-2xl bg-[var(--background)] p-6 shadow-[var(--shadow-card)] md:p-8">
                {/* Corner Screws */}
                <div className="absolute left-3 top-3 h-2 w-2 rounded-full bg-[var(--muted)] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.15),inset_-1px_-1px_1px_rgba(255,255,255,0.3)]" />
                <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-[var(--muted)] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.15),inset_-1px_-1px_1px_rgba(255,255,255,0.3)]" />

                <div className="mb-6">
                  <h2 className="text-2xl font-extrabold text-[var(--foreground)]">
                    Request for Quote (RFQ)
                  </h2>
                  <p className="mt-1 font-mono text-xs uppercase tracking-wider text-[var(--accent)]">
                    Fill in your requirements below
                  </p>
                </div>

                {submitted ? (
                  <div className="rounded-xl bg-green-50 p-8 text-center">
                    <CheckCircle
                      size={48}
                      className="mx-auto mb-4 text-green-500"
                    />
                    <h3 className="mb-2 text-xl font-bold text-green-800">
                      Thank You!
                    </h3>
                    <p className="mb-4 text-green-700">
                      Your RFQ has been submitted successfully. Our team will
                      review your requirements and get back to you within 24
                      hours.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: "",
                          company: "",
                          email: "",
                          phone: "",
                          product: "",
                          material: "",
                          quantity: "",
                          machine: "",
                          drawing: "",
                          message: "",
                        });
                      }}
                      className="rounded-xl bg-green-600 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-green-700"
                    >
                      Submit Another RFQ
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Info */}
                    <div>
                      <h4 className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                        Contact Information
                      </h4>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <input
                          type="text"
                          name="name"
                          placeholder="Your Name *"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="rounded-xl bg-[var(--background)] px-4 py-3.5 font-mono text-sm text-[var(--foreground)] shadow-[var(--shadow-recessed)] placeholder:text-[var(--text-muted)]/50 focus:shadow-[var(--shadow-recessed),0_0_0_2px_var(--accent)] focus:outline-none"
                        />
                        <input
                          type="text"
                          name="company"
                          placeholder="Company Name"
                          value={formData.company}
                          onChange={handleChange}
                          className="rounded-xl bg-[var(--background)] px-4 py-3.5 font-mono text-sm text-[var(--foreground)] shadow-[var(--shadow-recessed)] placeholder:text-[var(--text-muted)]/50 focus:shadow-[var(--shadow-recessed),0_0_0_2px_var(--accent)] focus:outline-none"
                        />
                        <input
                          type="email"
                          name="email"
                          placeholder="Email Address *"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="rounded-xl bg-[var(--background)] px-4 py-3.5 font-mono text-sm text-[var(--foreground)] shadow-[var(--shadow-recessed)] placeholder:text-[var(--text-muted)]/50 focus:shadow-[var(--shadow-recessed),0_0_0_2px_var(--accent)] focus:outline-none"
                        />
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Phone Number *"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="rounded-xl bg-[var(--background)] px-4 py-3.5 font-mono text-sm text-[var(--foreground)] shadow-[var(--shadow-recessed)] placeholder:text-[var(--text-muted)]/50 focus:shadow-[var(--shadow-recessed),0_0_0_2px_var(--accent)] focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Product Requirements */}
                    <div>
                      <h4 className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                        Product Requirements
                      </h4>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <select
                          name="product"
                          value={formData.product}
                          onChange={handleChange}
                          className="rounded-xl bg-[var(--background)] px-4 py-3.5 font-mono text-sm text-[var(--foreground)] shadow-[var(--shadow-recessed)] focus:shadow-[var(--shadow-recessed),0_0_0_2px_var(--accent)] focus:outline-none"
                        >
                          <option value="">Product Category</option>
                          <option value="solid-carbide">
                            Solid Carbide Tools
                          </option>
                          <option value="indexable">Indexable Milling</option>
                          <option value="turning">Turning Tools</option>
                          <option value="holders">Tool Holders</option>
                          <option value="accessories">CNC Accessories</option>
                          <option value="inserts">Cutting Inserts</option>
                          <option value="other">Other</option>
                        </select>
                        <input
                          type="text"
                          name="material"
                          placeholder="Workpiece Material"
                          value={formData.material}
                          onChange={handleChange}
                          className="rounded-xl bg-[var(--background)] px-4 py-3.5 font-mono text-sm text-[var(--foreground)] shadow-[var(--shadow-recessed)] placeholder:text-[var(--text-muted)]/50 focus:shadow-[var(--shadow-recessed),0_0_0_2px_var(--accent)] focus:outline-none"
                        />
                        <input
                          type="text"
                          name="quantity"
                          placeholder="Required Quantity"
                          value={formData.quantity}
                          onChange={handleChange}
                          className="rounded-xl bg-[var(--background)] px-4 py-3.5 font-mono text-sm text-[var(--foreground)] shadow-[var(--shadow-recessed)] placeholder:text-[var(--text-muted)]/50 focus:shadow-[var(--shadow-recessed),0_0_0_2px_var(--accent)] focus:outline-none"
                        />
                        <input
                          type="text"
                          name="machine"
                          placeholder="Machine Type / Model"
                          value={formData.machine}
                          onChange={handleChange}
                          className="rounded-xl bg-[var(--background)] px-4 py-3.5 font-mono text-sm text-[var(--foreground)] shadow-[var(--shadow-recessed)] placeholder:text-[var(--text-muted)]/50 focus:shadow-[var(--shadow-recessed),0_0_0_2px_var(--accent)] focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Additional Details */}
                    <div>
                      <h4 className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                        Additional Details
                      </h4>
                      <textarea
                        name="message"
                        rows={4}
                        placeholder="Describe your requirements, tolerances, surface finish requirements, or any special instructions..."
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-[var(--background)] px-4 py-3.5 font-mono text-sm text-[var(--foreground)] shadow-[var(--shadow-recessed)] placeholder:text-[var(--text-muted)]/50 focus:shadow-[var(--shadow-recessed),0_0_0_2px_var(--accent)] focus:outline-none resize-none"
                      />
                    </div>

                    {/* Submit */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      <button
                        type="submit"
                        className="flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-[4px_4px_12px_rgba(255,71,87,0.35)] transition-all duration-150 hover:translate-y-[2px] hover:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.2)]"
                      >
                        <Send size={16} />
                        Submit RFQ
                      </button>
                      <span className="text-xs text-[var(--text-muted)]">
                        We typically respond within 24 hours
                      </span>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Sidebar Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Company Info */}
              <div className="rounded-2xl bg-[var(--dark-bg)] p-6 shadow-[var(--shadow-card)] carbon-fiber relative overflow-hidden">
                <div className="absolute inset-0 scanlines opacity-20" />
                <div className="relative space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="led led-green" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-green-400">
                      Office Location
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5">
                      <Building size={16} className="text-[var(--accent)]" />
                    </div>
                    <div>
                      <h4 className="mb-1 text-sm font-bold text-white">
                        {company.name} Office
                      </h4>
                      <p className="text-xs leading-relaxed text-gray-400">
                        {company.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5">
                      <Phone size={16} className="text-[var(--accent)]" />
                    </div>
                    <div>
                      <a
                        href={`tel:${company.phone}`}
                        className="text-sm font-bold text-white hover:text-[var(--accent)] transition-colors"
                      >
                        {company.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5">
                      <Mail size={16} className="text-[var(--accent)]" />
                    </div>
                    <div>
                      <a
                        href={`mailto:${company.email}`}
                        className="text-sm font-bold text-white hover:text-[var(--accent)] transition-colors"
                      >
                        {company.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5">
                      <Globe size={16} className="text-[var(--accent)]" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-white">
                        {company.website}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href={`https://wa.me/${company.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl bg-[#25D366] p-6 shadow-[3px_3px_8px_rgba(37,211,102,0.3)] transition-all duration-150 hover:-translate-y-1 hover:shadow-[0_0_24px_rgba(37,211,102,0.4)]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
                  <MessageCircle size={28} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Chat on WhatsApp
                  </h3>
                  <p className="text-sm text-white/80">
                    Instant responses for urgent requirements
                  </p>
                </div>
              </a>

              {/* Quick Response */}
              <div className="relative rounded-2xl bg-[var(--background)] p-6 shadow-[var(--shadow-card)]">
                <div className="absolute left-3 top-3 h-2 w-2 rounded-full bg-[var(--muted)] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.15),inset_-1px_-1px_1px_rgba(255,255,255,0.3)]" />
                <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-[var(--muted)] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.15),inset_-1px_-1px_1px_rgba(255,255,255,0.3)]" />

                <h4 className="mb-4 text-lg font-bold text-[var(--foreground)]">
                  What to Include in Your RFQ
                </h4>
                <ul className="space-y-3">
                  {[
                    "Component drawing or 3D model",
                    "Workpiece material and hardness",
                    "Machine make, model, and specifications",
                    "Required quantity and delivery timeline",
                    "Surface finish and tolerance requirements",
                    "Any special instructions or challenges",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle
                        size={14}
                        className="mt-0.5 shrink-0 text-[var(--accent)]"
                      />
                      <span className="text-sm text-[var(--text-muted)]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>


            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
