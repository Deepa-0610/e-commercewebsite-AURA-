"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Trash2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

interface WishlistItem {
  id: string
  products: {
    id: string
    name: string
    description: string
    price: number
    image_url: string
    stock: number
  }
}

export function WishlistItems({ items }: { items: WishlistItem[] }) {
  const [isUpdating, setIsUpdating] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const removeItem = async (itemId: string) => {
    setIsUpdating(itemId)
    try {
      await supabase.from("wishlist").delete().eq("id", itemId)
      router.refresh()
    } catch (error) {
      console.error("Error removing item:", error)
    } finally {
      setIsUpdating(null)
    }
  }

  const moveToCart = async (item: WishlistItem) => {
    setIsUpdating(item.id)
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      // Check if already in cart
      const { data: existing } = await supabase
        .from("cart_items")
        .select("*")
        .eq("user_id", user.id)
        .eq("product_id", item.products.id)
        .single()

      if (existing) {
        await supabase
          .from("cart_items")
          .update({ quantity: existing.quantity + 1, updated_at: new Date().toISOString() })
          .eq("id", existing.id)
      } else {
        await supabase.from("cart_items").insert({
          user_id: user.id,
          product_id: item.products.id,
          quantity: 1,
        })
      }

      // Remove from wishlist
      await supabase.from("wishlist").delete().eq("id", item.id)
      router.refresh()
    } catch (error) {
      console.error("Error moving to cart:", error)
    } finally {
      setIsUpdating(null)
    }
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-muted-foreground font-light mb-6">Your wishlist is empty</p>
        <Link href="/products">
          <Button>Discover Products</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="group"
        >
          <Link href={`/products/${item.products.id}`} className="block">
            <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-muted">
              <Image
                src={item.products.image_url || "/placeholder.svg"}
                alt={item.products.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {item.products.stock === 0 && (
                <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                  <span className="text-sm font-medium tracking-wide">OUT OF STOCK</span>
                </div>
              )}
            </div>
          </Link>

          <div className="space-y-3">
            <Link href={`/products/${item.products.id}`}>
              <h3 className="text-lg font-light tracking-tight group-hover:text-foreground/70 transition-colors">
                {item.products.name}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground line-clamp-2">{item.products.description}</p>
            <p className="text-lg font-medium">${item.products.price.toFixed(2)}</p>

            <div className="flex gap-2 pt-2">
              <Button
                onClick={() => moveToCart(item)}
                disabled={isUpdating === item.id || item.products.stock === 0}
                className="flex-1 h-10"
                size="sm"
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => removeItem(item.id)}
                disabled={isUpdating === item.id}
                className="h-10 w-10 text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
