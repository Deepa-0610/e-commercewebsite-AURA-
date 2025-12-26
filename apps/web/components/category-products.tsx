"use client"

import { useState } from "react"
import { ProductGrid } from "./product-grid"
import { Button } from "./ui/button"
import Link from "next/link"

export function CategoryProducts({ products }: { products: any[] }) {
  const [layout, setLayout] = useState<'grid' | 'list'>('grid')

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button variant={layout === 'grid' ? undefined : 'ghost'} size="sm" onClick={() => setLayout('grid')}>
            Grid
          </Button>
          <Button variant={layout === 'list' ? undefined : 'ghost'} size="sm" onClick={() => setLayout('list')}>
            Rows
          </Button>
        </div>

        <Link href="/products" className="text-sm font-medium underline">
          View all products
        </Link>
      </div>

      <ProductGrid products={products} layout={layout} />
    </div>
  )
}
