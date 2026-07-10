"use client";

import { Box } from "lucide-react";
import { ProductItem } from "@/lib/data";

export function ProductImage({ product }: { product: ProductItem }) {
  return (
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
      <div
        className={`${
          product.image ? "hidden" : ""
        } flex h-80 items-center justify-center bg-[var(--muted)] lg:h-[400px]`}
      >
        <Box size={64} className="text-[var(--text-muted)]" />
      </div>
    </div>
  );
}
