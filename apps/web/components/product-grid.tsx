"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingCart, CreditCard } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  brand?: string
  image_url: string
  stock: number
}

function ProductGridItem({ product, index }: { product: Product; index: number }) {
  const [liked, setLiked] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleToggleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setLiked((s) => !s)
    toast({ title: liked ? "Removed from wishlist" : "Added to wishlist" })
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      const raw = localStorage.getItem("cart")
      const cart = raw ? JSON.parse(raw) : []
      const existing = cart.find((i: any) => i.id === product.id)
      if (existing) existing.quantity = (existing.quantity || 1) + 1
      else cart.push({ id: product.id, name: product.name, price: product.price, quantity: 1 })
      localStorage.setItem("cart", JSON.stringify(cart))
      toast({ title: "Added to cart" })
    } catch (e) {
      console.error(e)
      toast({ title: "Could not add to cart" })
    }
  }

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    handleAddToCart(e)
    router.push('/checkout')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link href={`/products/${product.id}`} className="group block relative">
        <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-muted">
          <Image
            src={product.image_url || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <span className="text-sm font-medium tracking-wide">OUT OF STOCK</span>
            </div>
          )}
           <div className="absolute right-4 top-4 z-30 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button onClick={handleToggleLike} aria-label="like" className={cn("h-9 w-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-neutral-900 hover:bg-white shadow-sm", liked && "text-red-500") }>
              <Heart className={cn("h-4 w-4", liked && "fill-current")} />
            </button>
            <button onClick={handleAddToCart} aria-label="add to cart" className="h-9 w-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-neutral-900 hover:bg-white shadow-sm">
              <ShoppingCart className="h-4 w-4" />
            </button>
            <button onClick={handleBuyNow} aria-label="buy now" className="h-9 w-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-neutral-900 hover:bg-white shadow-sm">
              <CreditCard className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="space-y-2">
          {product.brand && (
            <p className="text-xs text-muted-foreground font-medium tracking-wider uppercase">{product.brand}</p>
          )}
          <h3 className="text-lg font-light tracking-tight group-hover:text-foreground/70 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
          <p className="text-lg font-medium">${product.price.toFixed(2)}</p>
        </div>
      </Link>
    </motion.div>
  )
}

function ProductListItem({ product, index }: { product: Product; index: number }) {
    const [liked, setLiked] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleToggleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setLiked((s) => !s)
    toast({ title: liked ? "Removed from wishlist" : "Added to wishlist" })
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      const raw = localStorage.getItem("cart")
      const cart = raw ? JSON.parse(raw) : []
      const existing = cart.find((i: any) => i.id === product.id)
      if (existing) existing.quantity = (existing.quantity || 1) + 1
      else cart.push({ id: product.id, name: product.name, price: product.price, quantity: 1 })
      localStorage.setItem("cart", JSON.stringify(cart))
      toast({ title: "Added to cart" })
    } catch (e) {
      console.error(e)
      toast({ title: "Could not add to cart" })
    }
  }

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    handleAddToCart(e)
    router.push('/checkout')
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.03 }}
    >
      <Link href={`/products/${product.id}`} className="md:col-span-1 block relative">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-muted">
          <Image src={product.image_url || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
           <div className="absolute right-4 top-4 z-30 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button onClick={handleToggleLike} aria-label="like" className={cn("h-9 w-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-neutral-900 hover:bg-white shadow-sm", liked && "text-red-500") }>
              <Heart className={cn("h-4 w-4", liked && "fill-current")} />
            </button>
            <button onClick={handleAddToCart} aria-label="add to cart" className="h-9 w-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-neutral-900 hover:bg-white shadow-sm">
              <ShoppingCart className="h-4 w-4" />
            </button>
            <button onClick={handleBuyNow} aria-label="buy now" className="h-9 w-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-neutral-900 hover:bg-white shadow-sm">
              <CreditCard className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Link>
      <div className="md:col-span-3">
        <Link href={`/products/${product.id}`} className="group block">
          {product.brand && (
            <p className="text-xs text-muted-foreground font-medium tracking-wider uppercase mb-1">{product.brand}</p>
          )}
          <h3 className="text-xl font-medium group-hover:text-foreground/80">{product.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-3 mt-2">{product.description}</p>
          <p className="text-lg font-semibold mt-3">${product.price.toFixed(2)}</p>
        </Link>
      </div>
    </motion.div>
  )
}

export function ProductGrid({ products, layout = 'grid' }: { products: Product[]; layout?: 'grid' | 'list' }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-muted-foreground font-light">No products found</p>
      </div>
    )
  }

  if (layout === 'list') {
    return (
      <div className="space-y-6">
        {products.map((product, index) => (
          <ProductListItem key={product.id} product={product} index={index} />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map((product, index) => (
        <ProductGridItem key={product.id} product={product} index={index} />
      ))}
    </div>
  )
}
