import Image from 'next/image'
import Link from 'next/link'

export interface Product {
  id: string
  name: string
  price: string
  image: string
  badge?: string
  materials?: string[]
  swatches?: { name: string; color: string }[]
  quickLookImages?: string[]
  dimensions?: string
}

interface ProductCardProps {
  product: Product
  onQuickLook?: (product: Product) => void
}

export function ProductCard({ product, onQuickLook }: ProductCardProps) {
  return (
    <div className="group relative">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-square w-full overflow-hidden bg-neutral-100">
          {product.badge && (
            <div className="absolute left-4 top-4 z-10">
              <span className="inline-block bg-white px-3 py-1 text-xs font-medium uppercase tracking-wider text-neutral-900">
                {product.badge}
              </span>
            </div>
          )}
          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={600}
            className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
          {onQuickLook && (
            <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <button
                onClick={(e) => {
                  e.preventDefault()
                  onQuickLook(product)
                }}
                className="w-full bg-white py-3 text-sm font-medium text-neutral-900 shadow-sm hover:bg-neutral-50"
              >
                Quick Look
              </button>
            </div>
          )}
        </div>
        <div className="mt-4 flex items-start justify-between">
          <div>
            <h3 className="text-lg font-medium text-neutral-900">{product.name}</h3>
            {product.materials && (
              <p className="mt-1 text-sm text-neutral-500">{product.materials.join(", ")}</p>
            )}
          </div>
          <p className="text-lg font-medium text-neutral-900">{product.price}</p>
        </div>
      </Link>
    </div>
  )
}
