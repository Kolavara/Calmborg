"use client";

import { use } from "react";
import Link from "next/link";
import { productCategories, company, ProductItem, ProductCategory } from "@/lib/data";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  MessageCircle,
  Phone,
  Tag,
  Box,
  Settings,
} from "lucide-react";

// Helper to find a product by slug across all categories
function findProduct(slug: string): { product: ProductItem; category: ProductCategory } | null {
  for (const cat of productCategories) {
    if (cat.productItems) {
      const product = cat.productItems.find((p) => p.slug === slug);
      if (product) return { product, category: cat };
    }
  }
  return null;
}

// Helper to get related products from the same category
function getRelatedProducts(category: ProductCategory, currentSlug: string): ProductItem[] {
  if (!category.productItems) return [];
  return category.productItems.filter((p) => p.slug !== currentSlug);
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const result = findProduct(slug);

  if (!result) {
    return (
      <div className="relative min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-6xl">🔍</div>
          <h1 className="mb-4 text-2xl font-bold text-[var(--foreground)]">
            Product Not Found
          </h1>
          <p className="mb-6 text-[var(--text-muted)]">
            The product you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all hover:translate-y-[1px]"
          >
            <ArrowLeft size={16} />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const { product, category } = result;
  const relatedProducts = getRelatedProducts(category, slug);

  return (
    <div className="relative">
      {/* ═══════════════ BREADCRUMB ═══════════════ */}
      <section className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 font-mono text-xs text-[var(--text-muted)]">
            <Link href="/" className="hover:text-[var(--accent)] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-[var(--accent)] transition-colors">
              Products
            </Link>
            <span>/</span>
            <Link
              href={`/products#${category.slug}`}
              className="hover:text-[var(--accent)] transition-colors"
            >
              {category.title}
            </Link>
            <span>/</span>
            <span className="text-[var(--foreground)]">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* ═══════════════ PRODUCT HERO ═══════════════ */}
      <section className="relative py-8 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left: Product Image */}
            <div className="relative">
              <div className="overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-card)]">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-80 w-full object-contain p-8 lg:h-[400px]"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      target.nextElementSibling?.classList.remove("hidden");
                    }}
                  />
                ) : null}
                <div className={`${product.image ? "hidden" : ""} flex h-80 items-center justify-center bg-[var(--muted)] lg:h-[400px]`}>
                  <Box size={64} className="text-[var(--text-muted)]" />
                </div>
              </div>
              {product.brand && (
                <div className="absolute right-4 top-4 rounded-lg bg-[var(--dark-bg)] px-3 py-1.5">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                    {product.brand}
                  </span>
                </div>
              )}
            </div>

            {/* Right: Product Info */}
            <div className="space-y-6">
              <div>
                <span className="mb-2 inline-block rounded-full bg-[var(--muted)] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  {category.title}
                </span>
                <h1 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)] md:text-4xl">
                  {product.name}
                </h1>
              </div>

              {product.shortDescription && (
                <p className="text-lg text-[var(--text-muted)]">
                  {product.shortDescription}
                </p>
              )}

              {/* Quick Actions */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact#rfq"
                  className="flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-[3px_3px_8px_rgba(255,71,87,0.35)] transition-all hover:translate-y-[1px] hover:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2)]"
                >
                  Request a Quote
                  <ArrowRight size={16} />
                </Link>
                <a
                  href={`https://wa.me/${company.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all hover:translate-y-[1px]"
                >
                  <MessageCircle size={16} />
                  WhatsApp Us
                </a>
              </div>

              {/* Contact Info */}
              <div className="rounded-xl bg-[var(--muted)] p-4">
                <div className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
                  <Phone size={14} className="text-[var(--accent)]" />
                  <span>Call us for immediate assistance:</span>
                  <a href={`tel:${company.phone}`} className="font-bold text-[var(--foreground)] hover:text-[var(--accent)]">
                    {company.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ PRODUCT DETAILS ═══════════════ */}
      <section className="relative py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Description */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl bg-[var(--background)] p-6 shadow-[var(--shadow-card)] md:p-8">
                <h2 className="mb-4 text-xl font-extrabold text-[var(--foreground)]">
                  Product Description
                </h2>
                <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                  {product.description}
                </p>

                {/* Features */}
                {product.features && product.features.length > 0 && (
                  <div className="mt-6">
                    <h3 className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                      Key Features
                    </h3>
                    <ul className="space-y-2">
                      {product.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <Check size={16} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                          <span className="text-sm text-[var(--foreground)]">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Specifications */}
            {product.specifications && product.specifications.length > 0 && (
              <div>
                <div className="rounded-2xl bg-[var(--dark-bg)] p-6 shadow-[var(--shadow-card)] carbon-fiber relative overflow-hidden">
                  <div className="absolute inset-0 scanlines opacity-20" />
                  <div className="relative">
                    <div className="mb-4 flex items-center gap-2">
                      <Settings size={18} className="text-[var(--accent)]" />
                      <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                        Specifications
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {product.specifications.map((spec) => (
                        <div key={spec.label} className="flex items-center justify-between border-b border-white/10 pb-2">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-gray-400">
                            {spec.label}
                          </span>
                          <span className="text-sm font-bold text-white">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Materials */}
                {product.materials && product.materials.length > 0 && (
                  <div className="mt-4 rounded-2xl bg-[var(--background)] p-6 shadow-[var(--shadow-card)]">
                    <div className="mb-3 flex items-center gap-2">
                      <Tag size={14} className="text-[var(--accent)]" />
                      <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                        Suitable Materials
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {product.materials.map((material) => (
                        <span
                          key={material}
                          className="rounded-md bg-[var(--muted)] px-2 py-1 font-mono text-[10px] text-[var(--text-muted)]"
                        >
                          {material}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════ APPLICATIONS ═══════════════ */}
      {product.applications && product.applications.length > 0 && (
        <section className="relative py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-[var(--background)] p-6 shadow-[var(--shadow-card)] md:p-8">
              <h3 className="mb-4 text-lg font-extrabold text-[var(--foreground)]">
                Applications
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.applications.map((app) => (
                  <span
                    key={app}
                    className="rounded-lg bg-[var(--muted)] px-4 py-2 text-sm font-medium text-[var(--foreground)] shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]"
                  >
                    {app}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════ RELATED PRODUCTS ═══════════════ */}
      {relatedProducts.length > 0 && (
        <section className="relative py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-6 text-2xl font-extrabold text-[var(--foreground)]">
              Related Products
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.slice(0, 3).map((related) => (
                <Link
                  key={related.slug}
                  href={`/products/${related.slug}`}
                  className="group rounded-2xl bg-[var(--background)] p-4 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-floating)]"
                >
                  <div className="mb-3 h-32 overflow-hidden rounded-xl bg-[var(--muted)]">
                    {related.image ? (
                      <img
                        src={related.image}
                        alt={related.name}
                        className="h-full w-full object-contain p-2"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Box size={32} className="text-[var(--text-muted)]" />
                      </div>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                    {related.name}
                  </h3>
                  {related.shortDescription && (
                    <p className="mt-1 text-xs text-[var(--text-muted)] line-clamp-2">
                      {related.shortDescription}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="relative py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-[var(--dark-bg)] p-8 md:p-12 shadow-[var(--shadow-card)] carbon-fiber relative overflow-hidden text-center">
            <div className="absolute inset-0 scanlines opacity-20" />
            <div className="relative">
              <h2 className="mb-4 text-2xl font-extrabold text-white md:text-3xl">
                Interested in <span className="text-[var(--accent)]">{product.name}</span>?
              </h2>
              <p className="mx-auto mb-6 max-w-xl text-gray-300">
                Contact us for pricing, technical support, or to request a sample.
                Our team is ready to help you find the perfect tooling solution.
              </p>
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/contact#rfq"
                  className="flex items-center gap-2 rounded-xl bg-[var(--accent)] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-[4px_4px_12px_rgba(255,71,87,0.35)] transition-all hover:translate-y-[2px]"
                >
                  Get a Quote
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/products"
                  className="flex items-center gap-2 rounded-xl bg-white/10 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-white/20"
                >
                  <ArrowLeft size={16} />
                  Back to Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
