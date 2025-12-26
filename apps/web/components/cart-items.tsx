"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Trash2, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

interface CartItem {
  id: string
  quantity: number
  products: {
    id: string
    name: string
    price: number
    image_url: string
    stock: number
  }
}

export function CartItems({ items }: { items: CartItem[] }) {
  const [isUpdating, setIsUpdating] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return
    setIsUpdating(itemId)
    try {
      await supabase
        .from("cart_items")
        .update({ quantity: newQuantity, updated_at: new Date().toISOString() })
        .eq("id", itemId)
      router.refresh()
    } catch (error) {
      console.error("Error updating quantity:", error)
    } finally {
      setIsUpdating(null)
    }
  }

  const removeItem = async (itemId: string) => {
    setIsUpdating(itemId)
    try {
      await supabase.from("cart_items").delete().eq("id", itemId)
      router.refresh()
    } catch (error) {
      console.error("Error removing item:", error)
    } finally {
      setIsUpdating(null)
    }
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-muted-foreground font-light mb-6">Your cart is empty</p>
        <Link href="/products">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    )
  }

  const subtotal = items.reduce((sum, item) => sum + item.products.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 10
  const total = subtotal + shipping

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      {/* Cart Items */}
      <div className="lg:col-span-2 space-y-6">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="flex gap-6 p-6 bg-card rounded-lg border border-border/50"
          >
            <Link href={`/products/${item.products.id}`} className="flex-shrink-0">
              <div className="relative h-32 w-32 overflow-hidden rounded-lg bg-muted">
                <Image
                  src={item.products.image_url || "/placeholder.svg"}
                  alt={item.products.name}
                  fill
                  className="object-cover"
                />
              </div>
            </Link>

            <div className="flex-1 flex flex-col justify-between">
              <div>
                <Link href={`/products/${item.products.id}`}>
                  <h3 className="text-lg font-light tracking-tight hover:text-foreground/70 transition-colors">
                    {item.products.name}
                  </h3>
                </Link>
                <p className="text-lg font-medium mt-2">${item.products.price.toFixed(2)}</p>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity === 1 || isUpdating === item.id}
                    className="h-8 w-8"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    disabled={item.quantity >= item.products.stock || isUpdating === item.id}
                    className="h-8 w-8"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item.id)}
                  disabled={isUpdating === item.id}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Order Summary */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="lg:col-span-1"
      >
        <div className="sticky top-24 p-6 bg-card rounded-lg border border-border/50 space-y-6">
          <h2 className="text-2xl font-light tracking-tight">Order Summary</h2>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="font-medium">{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
            </div>
            {shipping > 0 && <p className="text-xs text-muted-foreground">Free shipping on orders over $100</p>}
            <div className="border-t border-border/50 pt-3 flex justify-between">
              <span className="font-medium">Total</span>
              <span className="text-xl font-medium">${total.toFixed(2)}</span>
            </div>
          </div>

          <Link href="/checkout" className="block">
            <Button className="w-full h-12 text-base">Proceed to Checkout</Button>
          </Link>

          <Link href="/products" className="block">
            <Button variant="outline" className="w-full bg-transparent">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
