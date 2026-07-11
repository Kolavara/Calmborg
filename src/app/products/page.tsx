"use client";

import { useState } from "react";
import Link from "next/link";
import {
  productCategories,
  company,
  ProductCategory,
} from "@/lib/data";
import {
  Search,
  ArrowRight,
  CircleDot,
  Check,
  ChevronDown,
  MessageCircle,
  Phone,
  Filter,
  Image,
  Download,
} from "lucide-react";

export default function ProductsPage() {
  const [activeMainCategory, setActiveMainCategory] = useState<string>("All");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = productCategories.filter((cat) => {
    const matchesSearch =
      searchQuery === "" ||
      cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.products.some((p) =>
        p.toLowerCase().includes(searchQuery.toLowerCase())
      );
    
    const matchesMainCategory = true;
    const matchesCategory =
      activeCategory === null || cat.id === activeCategory;
    return matchesSearch && matchesMainCategory && matchesCategory;
  });
  
  // @ts-ignore
  const visibleSubCategories = activeMainCategory === "All" ? productCategories : productCategories.filter(cat => cat.mainCategory === activeMainCategory);
  const mainCategories = ["All", "Cutting Tools", "Tool Holders", "Work Holding System", "Accessories", "Measuring Touch Probes"];

  return (
    <div className="relative">
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 blueprint-grid opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--muted)] px-4 py-2 shadow-[var(--shadow-card)]">
              <div className="led led-green animate-pulse-glow" />
              <span className="font-mono text-[13px] uppercase tracking-widest text-[var(--text-muted)]">
                Product Catalogue
              </span>
            </div>
            <h1 className="mb-4 sm:mb-6 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-[1.1] tracking-tight text-[var(--foreground)]">
              Complete Tooling Solutions for{" "}
              <span className="text-[var(--accent)]">CNC Manufacturing</span>
            </h1>
            <p className="max-w-2xl text-sm sm:text-lg leading-relaxed text-[var(--text-muted)]">
              We offer a comprehensive portfolio of cutting tools and accessories
              designed to improve machining performance, productivity, and tool
              life.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════ SEARCH & FILTERS ═══════════════ */}
      <section className="relative pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-background p-4 sm:p-6 shadow-[var(--shadow-card)]">
            <div className="flex flex-col gap-4 sm:gap-6">
              {/* Search */}
              <div className="relative w-full">
                <Search
                  size={16}
                  className="sm:size-[18px] absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                />
                <input
                  type="text"
                  placeholder="Search tools, products, or categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl bg-background py-3 sm:py-4 pl-10 sm:pl-12 pr-3 sm:pr-4 font-mono text-sm sm:text-base text-foreground shadow-[var(--shadow-recessed)] placeholder:text-[var(--text-muted)]/60 focus:shadow-[var(--shadow-recessed),0_0_0_2px_var(--accent)] focus:outline-none"
                />
              </div>

              {/* Mega Menu Grid */}
              <div className="pt-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-sans text-lg font-extrabold text-[var(--foreground)] tracking-tight">Categories</h3>
                  {activeCategory && (
                    <button
                      onClick={() => setActiveCategory(null)}
                      className="text-[13px] font-bold text-[var(--accent)] hover:underline uppercase tracking-wider"
                    >
                      Clear Filter
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-6 sm:gap-y-8">
                  {mainCategories.filter(cat => cat !== "All").map(mainCat => (
                    <div key={mainCat} className="flex flex-col gap-2 sm:gap-3">
                      <h4 className="font-sans text-[13px] sm:text-[15px] font-bold uppercase tracking-widest text-[var(--foreground)] pb-1.5 sm:pb-2 border-b border-[var(--border-shadow)]/20">
                        {mainCat}
                      </h4>
                      <ul className="flex flex-col gap-1.5 sm:gap-2">
                        {productCategories.filter(c => c.mainCategory === mainCat).map((cat) => (
                          <li key={cat.id}>
                            <button
                              onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                              className={`text-left text-xs sm:text-sm transition-all ${
                                activeCategory === cat.id
                                  ? "text-[var(--accent)] font-bold translate-x-1"
                                  : "text-[var(--text-muted)] hover:text-[var(--accent)] hover:translate-x-1"
                              }`}
                            >
                              {cat.title}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ PRODUCT CATEGORIES ═══════════════ */}
      <section className="relative py-8 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {filteredCategories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>

          {filteredCategories.length === 0 && (
            <div className="py-16 text-center">
              <div className="mb-4 text-6xl">🔍</div>
              <h3 className="mb-2 text-xl font-bold text-[var(--foreground)]">
                No products found
              </h3>
              <p className="text-[var(--text-muted)]">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
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
                  Need Help <span className="text-[var(--accent)]">Selecting</span> the Right Tool?
                </h2>
                <p className="mb-6 text-[var(--text-muted)]">
                  Send your component drawing, material details, and machine
                  information to receive expert tooling recommendations.
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
                  <h3 className="mb-2 font-mono text-[13px] uppercase tracking-widest text-white/60">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── Category Card Component ─── */
function CategoryCard({ category }: { category: ProductCategory }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      id={category.id}
      className="relative scroll-mt-32 rounded-2xl bg-[var(--background)] p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:shadow-[var(--shadow-floating)] md:p-8"
    >
      {/* Corner Screws */}
      <div className="absolute left-3 top-3 h-2 w-2 rounded-full bg-[var(--muted)] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.15),inset_-1px_-1px_1px_rgba(255,255,255,0.3)]" />
      <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-[var(--muted)] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.15),inset_-1px_-1px_1px_rgba(255,255,255,0.3)]" />

      <div className="relative">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          {/* Category Thumbnail */}
          {category.image && (
            <div className="shrink-0 lg:w-56">
              <div className="overflow-hidden rounded-xl bg-white shadow-[var(--shadow-recessed)]">
                <img
                  src={category.image}
                  alt={category.title}
                  className="h-44 w-full object-cover transition-transform duration-500 hover:scale-105 lg:h-52"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.parentElement!.style.display = "none";
                  }}
                />
              </div>
            </div>
          )}

          {/* Right: Info */}
          <div className="flex-1 min-w-0">
            <div className="mb-4 flex flex-wrap items-start gap-3 sm:items-center">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)] shadow-[3px_3px_8px_rgba(255,71,87,0.3)]">
                <CircleDot size={22} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-extrabold text-[var(--foreground)]">
                  {category.title}
                </h3>
                <p className="font-mono text-[13px] uppercase tracking-wider text-[var(--accent)] truncate">
                  {category.subtitle}
                </p>
              </div>
            </div>

            <p className="mb-6 max-w-2xl text-sm leading-relaxed text-[var(--text-muted)]">
              {category.description}
            </p>

            {/* Products Grid with Images */}
            <div className="mb-4">
              <h4 className="mb-3 font-mono text-[12px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                Products
              </h4>
              {category.productItems && category.productItems.length > 0 ? (
                <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {category.productItems.map((item) => (
                    <Link
                      href={`/products/${item.slug}`}
                      key={item.name}
                      className="group relative overflow-hidden rounded-xl bg-[var(--muted)] shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card)]"
                    >
                      {/* Product Image */}
                      {item.image ? (
                        <div className="relative h-32 sm:h-40 overflow-hidden bg-white">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = "none";
                              target.nextElementSibling?.classList.remove("hidden");
                            }}
                          />
                          <div className="hidden absolute inset-0 flex items-center justify-center bg-[var(--muted)]">
                            <Image size={24} className="sm:size-[32px] text-[var(--text-muted)]" />
                          </div>
                        </div>
                      ) : (
                        <div className="flex h-32 sm:h-40 items-center justify-center bg-[var(--muted)]">
                          <Image size={24} className="sm:size-[32px] text-[var(--text-muted)]" />
                        </div>
                      )}
                      {/* Product Info */}
                      <div className="p-2.5 sm:p-3">
                        <h5 className="text-xs sm:text-sm font-bold text-[var(--foreground)] leading-tight group-hover:text-[var(--accent)] transition-colors">
                          {item.name}
                        </h5>
                        {item.shortDescription && (
                          <p className="mt-1 text-xs sm:text-sm text-[var(--text-muted)] leading-snug line-clamp-2">
                            {item.shortDescription}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                  {category.products.map((product) => (
                    <div
                      key={product}
                      className="flex items-center gap-2 rounded-lg bg-[var(--muted)] px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]"
                    >
                      <Check size={12} className="shrink-0 text-[var(--accent)]" />
                      <span className="text-[13px] font-medium text-[var(--foreground)]">
                        {product}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Applications / Benefits / Materials */}
            {(category.applications || category.benefits || category.materials) && (
              <div className="mt-4">
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="flex items-center gap-2 font-mono text-[13px] font-bold uppercase tracking-wider text-[var(--accent)] transition-colors hover:text-[var(--accent-dark)]"
                >
                  <Filter size={12} />
                  {expanded ? "Hide" : "Show"} Details
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    expanded ? "mt-4 max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="grid gap-4 sm:grid-cols-3">
                    {category.applications && (
                      <div>
                        <h5 className="mb-2 font-mono text-[12px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                          Applications
                        </h5>
                        <div className="flex flex-wrap gap-1.5">
                          {category.applications.map((a) => (
                            <span
                              key={a}
                              className="rounded-md bg-[var(--muted)] px-2 py-1 font-mono text-[12px] text-[var(--text-muted)]"
                            >
                              {a}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {category.benefits && (
                      <div>
                        <h5 className="mb-2 font-mono text-[12px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                          Benefits
                        </h5>
                        <div className="flex flex-wrap gap-1.5">
                          {category.benefits.map((b) => (
                            <span
                              key={b}
                              className="rounded-md bg-green-50 px-2 py-1 font-mono text-[12px] text-green-700"
                            >
                              {b}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {category.materials && (
                      <div>
                        <h5 className="mb-2 font-mono text-[12px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                          Materials
                        </h5>
                        <div className="flex flex-wrap gap-1.5">
                          {category.materials.map((m) => (
                            <span
                              key={m}
                              className="rounded-md bg-blue-50 px-2 py-1 font-mono text-[12px] text-blue-700"
                            >
                              {m}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
