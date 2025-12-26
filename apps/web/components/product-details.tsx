"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Heart, ShoppingBag, Check, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  brand: string
  ingredients: string
  image_url: string
  image_urls: string[]
  stock: number
}

export function ProductDetails({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false)
  const [cartAdded, setCartAdded] = useState(false)
  const [wishlistAdded, setWishlistAdded] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const images = product.image_urls || [product.image_url]

  const handleAddToCart = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      router.push("/auth/login")
      return
    }

    setIsAddingToCart(true)
    try {
      const { data: existing } = await supabase
        .from("cart_items")
        .select("*")
        .eq("user_id", user.id)
        .eq("product_id", product.id)
        .single()

      if (existing) {
        await supabase
          .from("cart_items")
          .update({ quantity: existing.quantity + quantity, updated_at: new Date().toISOString() })
          .eq("id", existing.id)
      } else {
        await supabase.from("cart_items").insert({
          user_id: user.id,
          product_id: product.id,
          quantity,
        })
      }

      setCartAdded(true)
      setTimeout(() => setCartAdded(false), 2000)
      router.refresh()
    } catch (error) {
      console.error("Error adding to cart:", error)
    } finally {
      setIsAddingToCart(false)
    }
  }

  const handleBuyNow = async () => {
    await handleAddToCart()
    router.push("/checkout")
  }

  const handleAddToWishlist = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      router.push("/auth/login")
      return
    }

    setIsAddingToWishlist(true)
    try {
      const { error } = await supabase.from("wishlist").insert({
        user_id: user.id,
        product_id: product.id,
      })

      if (!error) {
        setWishlistAdded(true)
        setTimeout(() => setWishlistAdded(false), 2000)
        router.refresh()
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error)
    } finally {
      setIsAddingToWishlist(false)
    }
  }

  return (
    <div className="container mx-auto px-4 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Images */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-square overflow-hidden rounded-2xl bg-muted"
          >
            <Image src={images[selectedImage] || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          </motion.div>

          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    "relative aspect-square overflow-hidden rounded-lg bg-muted transition-all",
                    selectedImage === index ? "ring-2 ring-foreground" : "hover:ring-2 hover:ring-foreground/30",
                  )}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          <div>
            <p className="text-sm text-muted-foreground font-light tracking-wide mb-2">{product.brand} • {product.category}</p>
            <h1 className="text-4xl lg:text-5xl font-light tracking-tight mb-4">{product.name}</h1>
            <p className="text-3xl font-medium">${product.price.toFixed(2)}</p>
          </div>

          <p className="text-lg text-muted-foreground font-light leading-relaxed">{product.description}</p>

          {product.ingredients && (
            <div>
              <h3 className="text-sm font-medium tracking-wide mb-2">Key Ingredients</h3>
              <p className="text-sm text-muted-foreground">{product.ingredients}</p>
            </div>
          )}

          <div className="flex items-center gap-4 pt-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity === 1}
                className="h-10 w-10"
              >
                -
              </Button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                disabled={quantity >= product.stock}
                className="h-10 w-10"
              >
                +
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">{product.stock} in stock</p>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              onClick={handleAddToCart}
              disabled={isAddingToCart || product.stock === 0 || cartAdded}
              className="flex-1 h-12 text-base"
            >
              {cartAdded ? (
                <>
                  <Check className="mr-2 h-5 w-5" />
                  Added to Cart
                </>
              ) : (
                <>
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  {isAddingToCart ? "Adding..." : "Add to Cart"}
                </>
              )}
            </Button>
            <Button
              onClick={handleBuyNow}
              disabled={isAddingToCart || product.stock === 0}
              className="flex-1 h-12 text-base"
            >
              <CreditCard className="mr-2 h-5 w-5" />
              Buy Now
            </Button>
            <Button
              onClick={handleAddToWishlist}
              disabled={isAddingToWishlist || wishlistAdded}
              variant="outline"
              size="icon"
              className="h-12 w-12 bg-transparent"
            >
              <Heart className={cn("h-5 w-5", wishlistAdded && "fill-current")} />
            </Button>
          </div>

          {product.stock === 0 && <p className="text-sm text-destructive">This item is currently out of stock</p>}
        </motion.div>
      </div>
    </div>
  )
}
