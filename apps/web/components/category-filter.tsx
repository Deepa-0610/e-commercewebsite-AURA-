"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

const categories = [
  { name: "All", value: undefined },
  // Skincare
  { name: "Cleansers", value: "Cleansers" },
  { name: "Serums", value: "Serums" },
  { name: "Moisturizers", value: "Moisturizers" },
  { name: "Masks", value: "Masks" },
  { name: "Eye Care", value: "Eye Care" },
  { name: "Oils", value: "Oils" },
  // Makeup
  { name: "Foundation", value: "Foundation" },
  { name: "Concealer", value: "Concealer" },
  { name: "Blush", value: "Blush" },
  { name: "Highlighter", value: "Highlighter" },
  { name: "Eye Shadow", value: "Eye Shadow" },
  { name: "Mascara", value: "Mascara" },
  { name: "Eyeliner", value: "Eyeliner" },
  { name: "Eye Primer", value: "Eye Primer" },
  { name: "Lipstick", value: "Lipstick" },
  { name: "Lip Balm", value: "Lip Balm" },
  { name: "Lip Liner", value: "Lip Liner" },
  // Haircare
  { name: "Shampoo", value: "Shampoo" },
  { name: "Conditioner", value: "Conditioner" },
  { name: "Hair Treatments", value: "Hair Treatments" },
  { name: "Hair Styling", value: "Hair Styling" },
  // Fragrance & Bath
  { name: "Eau de Parfum", value: "Eau de Parfum" },
  { name: "Eau de Toilette", value: "Eau de Toilette" },
  { name: "Body Mists", value: "Body Mists" },
  { name: "Body Wash", value: "Body Wash" },
  { name: "Body Scrubs", value: "Body Scrubs" },
  { name: "Body Lotions", value: "Body Lotions" },
]

export function CategoryFilter({ currentCategory }: { currentCategory?: string }) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {categories.map((category) => {
        const isActive = currentCategory === category.value || (!currentCategory && !category.value)
        return (
          <Link
            key={category.name}
            href={category.value ? `/products?category=${category.value}` : "/products"}
            className={cn(
              "px-6 py-2 rounded-full text-sm font-light tracking-wide transition-all duration-200",
              isActive
                ? "bg-foreground text-background"
                : "bg-background border border-border/50 text-foreground/70 hover:text-foreground hover:border-foreground/30",
            )}
          >
            {category.name}
          </Link>
        )
      })}
    </div>
  )
}
