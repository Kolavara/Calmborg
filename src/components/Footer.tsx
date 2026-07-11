import Link from "next/link";
import { company, navLinks } from "@/lib/data";
import {
  Phone,
  Mail,
  MessageCircle,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";

const productLinks = [
  { label: "Solid Carbide Tools", href: "/products#solid-carbide" },
  { label: "Indexable Milling", href: "/products#indexable-milling" },
  { label: "Turning Tools", href: "/products#turning" },
  { label: "Tool Holding Systems", href: "/products#tool-holding" },
  { label: "CNC Accessories", href: "/products#cnc-accessories" },
  { label: "Cutting Inserts", href: "/products#cutting-inserts" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-24">
      {/* Connector Pipe */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="hidden h-1 w-full rounded-full bg-[var(--muted)] shadow-[inset_0_1px_3px_rgba(0,0,0,0.15)] md:block" />
      </div>

      {/* Main Footer */}
      <div className="bg-[var(--dark-bg)] relative overflow-hidden">
        {/* Carbon fiber overlay */}
        <div className="absolute inset-0 carbon-fiber opacity-30" />
        
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white p-1">
                  <img src="/logo.png" alt="Calm Borg Logo" className="h-full w-full object-contain" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{company.name}</h3>
                  <p className="font-mono text-[12px] uppercase tracking-widest text-[var(--dark-text-muted)]">
                    Est. 2026
                  </p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-[var(--dark-text-muted)] mb-6">
                {company.tagline}. Serving the manufacturing industry with premium cutting tools and expert technical support for over {company.yearsExperience} years.
              </p>
              <div className="space-y-3">
                <a
                  href={`tel:${company.phone}`}
                  className="flex items-center gap-3 text-sm text-[var(--dark-text-muted)] transition-colors hover:text-white"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5">
                    <Phone size={14} className="text-[var(--accent)]" />
                  </div>
                  {company.phone}
                </a>
                <a
                  href={`mailto:${company.email}`}
                  className="flex items-center gap-3 text-sm text-[var(--dark-text-muted)] transition-colors hover:text-white"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5">
                    <Mail size={14} className="text-[var(--accent)]" />
                  </div>
                  {company.email}
                </a>

              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="mb-6 font-mono text-[13px] font-bold uppercase tracking-widest text-white">
                Navigation
              </h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 text-sm text-[var(--dark-text-muted)] transition-colors hover:text-white"
                    >
                      <ChevronRight
                        size={12}
                        className="transition-transform group-hover:translate-x-1 text-[var(--accent)]"
                      />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="mb-6 font-mono text-[13px] font-bold uppercase tracking-widest text-white">
                Products
              </h4>
              <ul className="space-y-3">
                {productLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 text-sm text-[var(--dark-text-muted)] transition-colors hover:text-white"
                    >
                      <ChevronRight
                        size={12}
                        className="transition-transform group-hover:translate-x-1 text-[var(--accent)]"
                      />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & CTA */}
            <div>
              <h4 className="mb-6 font-mono text-[13px] font-bold uppercase tracking-widest text-white">
                Contact
              </h4>

              {/* WhatsApp CTA */}
              <a
                href={`https://wa.me/${company.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-bold text-white transition-all hover:bg-[#128C7E] hover:shadow-[0_0_20px_rgba(37,211,102,0.3)]"
              >
                <MessageCircle size={16} />
                Chat on WhatsApp
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
            <p className="text-[13px] text-[var(--dark-text-muted)]">
              &copy; {currentYear} {company.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <div className="led led-green animate-pulse-glow" />
              <span className="font-mono text-[12px] uppercase tracking-widest text-[var(--dark-text-muted)]">
                All Systems Operational
              </span>
            </div>
            <p className="font-mono text-[12px] text-[var(--dark-text-muted)]">
              GST: {company.gst}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
