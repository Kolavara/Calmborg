"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, company } from "@/lib/data";
import { Menu,
  X,
  Phone,
  Mail,
  MessageCircle,
  ChevronRight } from "lucide-react";
import AIChat from "@/components/AIChat";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Top Info Bar */}
      <div className="relative z-50 bg-[var(--dark-bg)] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-1.5 text-[12px] sm:px-6 sm:py-2 sm:text-[13px]">
          <div className="flex items-center gap-2 sm:gap-6">
            <a
              href={`tel:${company.phone}`}
              className="flex items-center gap-1.5 transition-colors hover:text-[var(--accent)]"
            >
              <Phone size={11} className="sm:size-[12px]" />
              <span className="hidden sm:inline font-mono tracking-wider">{company.phone}</span>
              <span className="sm:hidden font-mono">Call Us</span>
            </a>
            <a
              href={`mailto:${company.email}`}
              className="hidden items-center gap-1.5 transition-colors hover:text-[var(--accent)] md:flex"
            >
              <Mail size={12} />
              <span className="font-mono tracking-wider">{company.email}</span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <div className="led led-green animate-pulse-glow" />
            <span className="hidden sm:inline font-mono text-[12px] uppercase tracking-widest text-[var(--dark-text-muted)]">
              System Operational
            </span>
            <a
              href={`https://wa.me/${company.whatsapp.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full bg-[#25D366] px-3 py-1 text-[13px] font-semibold text-white transition-all hover:bg-[#128C7E] hover:shadow-[0_0_12px_rgba(37,211,102,0.5)]"
            >
              <MessageCircle size={12} />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "shadow-[0_4px_20px_rgba(0,0,0,0.1)]"
            : ""
        }`}
        style={{ background: "var(--background)" }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-3 sm:px-6 sm:py-4 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3.5 group shrink-0">
            <div className="flex h-12 w-12 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-white border-2 border-[var(--dark-bg)] shadow-[4px_4px_12px_rgba(0,0,0,0.2),-2px_-2px_8px_rgba(255,255,255,0.08)] transition-all duration-300 group-hover:shadow-[6px_6px_16px_rgba(0,0,0,0.25),-3px_-3px_10px_rgba(255,255,255,0.1)] p-1">
              <img src="/logo.png" alt="Calm Borg Logo" className="h-full w-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-2xl font-extrabold leading-tight tracking-tight text-[var(--foreground)] whitespace-nowrap">
                {company.name}
              </span>
              <span className="hidden sm:block font-mono text-[10px] sm:text-[13px] uppercase tracking-[0.15em] text-[var(--text-muted)] leading-tight mt-0.5">
                {company.shortTagline.split('\n').map((line, i) => (
                  <span key={i} className="whitespace-nowrap">
                    {i > 0 && <br />}{line}
                  </span>
                ))}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex lg:ml-auto lg:mr-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative whitespace-nowrap rounded-lg px-4 py-2 text-sm xl:text-base font-semibold transition-all duration-200 ${
                    isActive
                      ? "text-[var(--accent)] bg-[var(--muted)] shadow-[var(--shadow-pressed)]"
                      : "text-[var(--text-muted)] hover:bg-[var(--muted)] hover:text-[var(--foreground)] hover:shadow-[var(--shadow-card)]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA + Mobile Menu Button */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact#rfq"
              className="hidden items-center gap-2 whitespace-nowrap rounded-xl bg-[var(--accent)] px-6 py-3 text-base font-bold uppercase tracking-wider text-white shadow-[3px_3px_8px_rgba(255,71,87,0.35),-3px_-3px_8px_rgba(255,100,110,0.35)] transition-all duration-150 hover:translate-y-[1px] hover:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2)] sm:flex"
            >
              Get Quote
              <ChevronRight size={14} />
            </Link>

            {/* AI Assistant Button (to the right of Get Quote) */}
            <AIChat />

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--muted)] shadow-[var(--shadow-card)] transition-all duration-150 active:translate-y-[1px] active:shadow-[var(--shadow-pressed)] lg:hidden"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X size={20} className="text-[var(--foreground)]" />
              ) : (
                <Menu size={20} className="text-[var(--foreground)]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`overflow-hidden transition-all duration-300 lg:hidden ${
            isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col gap-1 border-t border-[var(--border-dark)]/10 px-4 pb-4 pt-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-4 py-3 text-base font-medium transition-all ${
                    isActive
                      ? "bg-[var(--accent)] text-white"
                      : "text-[var(--text-muted)] hover:bg-[var(--muted)]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/contact#rfq"
              className="mt-2 rounded-xl bg-[var(--accent)] px-5 py-3 text-center text-base font-bold uppercase tracking-wider text-white"
            >
              Request a Quote
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
